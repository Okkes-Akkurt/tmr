"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { DEFAULT_SETTINGS, type Settings } from "@/lib/i18n";
import { SERVICES, defaultServiceImage, serviceById } from "@/lib/services";
import { revalidateSite, signOut } from "@/app/yonetim/actions";

type Lead = { id: string; created_at: string; name: string; phone: string; email: string | null; company: string | null; service: string | null; location: string | null; message: string | null; lang: string; status: "new" | "done" };
type Project = { id?: string; title: string; title_en: string | null; service_id: number | null; location: string | null; year: string | null; scope: string | null; scope_en: string | null; images: string[]; cover: string | null; published: boolean };
type Ref = { id: string; name: string; logo: string | null };
type Tab = "leads" | "projects" | "refs" | "media" | "settings";

const emptyProject: Project = { title: "", title_en: null, service_id: null, location: null, year: null, scope: null, scope_en: null, images: [], cover: null, published: true };

async function shrink(file: File, max = 1800): Promise<Blob> {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return file;
  try {
    const bmp = await createImageBitmap(file);
    const k = Math.min(1, max / Math.max(bmp.width, bmp.height));
    if (k === 1 && file.size < 900_000) return file;
    const c = document.createElement("canvas");
    c.width = Math.round(bmp.width * k);
    c.height = Math.round(bmp.height * k);
    c.getContext("2d")!.drawImage(bmp, 0, 0, c.width, c.height);
    return await new Promise((r) => c.toBlob((b) => r(b || file), "image/jpeg", 0.85));
  } catch {
    return file;
  }
}

export default function AdminApp({ supabaseUrl }: { supabaseUrl: string }) {
  const sb = useMemo(() => createClient(), []);
  const pub = useCallback((path: string) => `${supabaseUrl}/storage/v1/object/public/site/${path}`, [supabaseUrl]);

  const [tab, setTab] = useState<Tab>("leads");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadFilter, setLeadFilter] = useState<"new" | "all">("new");
  const [projects, setProjects] = useState<(Project & { id: string })[]>([]);
  const [refs, setRefs] = useState<Ref[]>([]);
  const [media, setMedia] = useState<Record<string, string>>({});
  const [settings, setSettings] = useState<Settings>({ ...DEFAULT_SETTINGS });
  const [editing, setEditing] = useState<Project | null>(null);
  const [busy, setBusy] = useState("");
  const [toast, setToast] = useState("");

  const say = (t: string) => { setToast(t); setTimeout(() => setToast(""), 2800); };

  const load = useCallback(async () => {
    const [l, p, r, m, s] = await Promise.all([
      sb.from("leads").select("*").order("created_at", { ascending: false }).limit(500),
      sb.from("projects").select("*").order("created_at", { ascending: false }),
      sb.from("client_references").select("*").order("created_at", { ascending: true }),
      sb.from("site_media").select("key,value"),
      sb.from("site_settings").select("data").eq("id", 1).maybeSingle(),
    ]);
    setLeads((l.data || []) as Lead[]);
    setProjects((p.data || []) as (Project & { id: string })[]);
    setRefs((r.data || []) as Ref[]);
    setMedia(Object.fromEntries((m.data || []).map((x: { key: string; value: string }) => [x.key, x.value])));
    setSettings({ ...DEFAULT_SETTINGS, ...((s.data?.data as Partial<Settings>) || {}) });
  }, [sb]);

  useEffect(() => { load(); }, [load]);

  const publish = async () => { await revalidateSite(); };

  async function upload(file: File, folder: string) {
    const blob = await shrink(file);
    const ext = blob.type === "image/png" ? "png" : blob.type === "image/webp" ? "webp" : blob.type === "image/svg+xml" ? "svg" : "jpg";
    const path = `${folder}/${crypto.randomUUID()}.${ext}`;
    const { error } = await sb.storage.from("site").upload(path, blob, { contentType: blob.type || "image/jpeg", cacheControl: "31536000", upsert: false });
    if (error) throw error;
    return path;
  }
  const removeFiles = async (paths: (string | null | undefined)[]) => {
    const list = paths.filter(Boolean) as string[];
    if (list.length) await sb.storage.from("site").remove(list);
  };

  /* ---------- leads ---------- */
  async function toggleLead(l: Lead) {
    const status = l.status === "new" ? "done" : "new";
    const { error } = await sb.from("leads").update({ status }).eq("id", l.id);
    if (error) return say("Durum kaydedilemedi.");
    setLeads((xs) => xs.map((x) => (x.id === l.id ? { ...x, status } : x)));
  }
  async function deleteLead(l: Lead) {
    if (!confirm(`${l.name} talebi kalıcı olarak silinsin mi?`)) return;
    const { error } = await sb.from("leads").delete().eq("id", l.id);
    if (error) return say("Silinemedi.");
    setLeads((xs) => xs.filter((x) => x.id !== l.id));
  }

  /* ---------- projects ---------- */
  const [removedImgs, setRemovedImgs] = useState<string[]>([]);
  async function saveProject() {
    if (!editing) return;
    if (!editing.title.trim()) return say("Proje adı gerekli.");
    setBusy("project");
    const { id, ...data } = editing;
    const row = { ...data, cover: data.cover || data.images[0] || null, updated_at: new Date().toISOString() };
    const res = id ? await sb.from("projects").update(row).eq("id", id) : await sb.from("projects").insert(row);
    setBusy("");
    if (res.error) return say("Proje kaydedilemedi.");
    await removeFiles(removedImgs).catch(() => {});
    setRemovedImgs([]);
    setEditing(null);
    await Promise.all([load(), publish()]);
    say("Proje kaydedildi");
  }
  async function deleteProject(p: Project & { id: string }) {
    if (!confirm(`"${p.title}" projesi ve fotoğrafları silinsin mi?`)) return;
    const { error } = await sb.from("projects").delete().eq("id", p.id);
    if (error) return say("Silinemedi.");
    await removeFiles(p.images).catch(() => {});
    await Promise.all([load(), publish()]);
    say("Proje silindi");
  }
  async function addProjectImages(files: FileList) {
    if (!editing) return;
    const list = Array.from(files);
    const added: string[] = [];
    for (let i = 0; i < list.length; i++) {
      setBusy(`Yükleniyor ${i + 1}/${list.length}…`);
      try { added.push(await upload(list[i], "projects")); } catch { say("Bir fotoğraf yüklenemedi."); }
    }
    setBusy("");
    setEditing((e) => (e ? { ...e, images: [...e.images, ...added], cover: e.cover || added[0] || null } : e));
  }

  /* ---------- references ---------- */
  const [refName, setRefName] = useState("");
  const [refFile, setRefFile] = useState<File | null>(null);
  async function addRef() {
    if (!refName.trim()) return say("Kurum adı gerekli.");
    setBusy("ref");
    try {
      const logo = refFile ? await upload(refFile, "references") : null;
      const { error } = await sb.from("client_references").insert({ name: refName.trim(), logo });
      if (error) throw error;
      setRefName(""); setRefFile(null);
      await Promise.all([load(), publish()]);
      say("Referans eklendi");
    } catch { say("Referans eklenemedi."); }
    setBusy("");
  }
  async function deleteRef(r: Ref) {
    if (!confirm(`"${r.name}" silinsin mi?`)) return;
    const { error } = await sb.from("client_references").delete().eq("id", r.id);
    if (error) return say("Silinemedi.");
    await removeFiles([r.logo]).catch(() => {});
    await Promise.all([load(), publish()]);
  }

  /* ---------- media ---------- */
  async function setMediaImage(key: string, file: File) {
    setBusy(key);
    try {
      const old = media[key];
      const path = await upload(file, "media");
      const { error } = await sb.from("site_media").upsert({ key, value: path, updated_at: new Date().toISOString() });
      if (error) throw error;
      await removeFiles([old]).catch(() => {});
      setMedia((m) => ({ ...m, [key]: path }));
      await publish();
      say("Fotoğraf güncellendi");
    } catch { say("Fotoğraf yüklenemedi."); }
    setBusy("");
  }
  async function resetMedia(key: string) {
    const old = media[key];
    const { error } = await sb.from("site_media").delete().eq("key", key);
    if (error) return say("Kaydedilemedi.");
    await removeFiles([old]).catch(() => {});
    setMedia((m) => { const n = { ...m }; delete n[key]; return n; });
    await publish();
    say("Temsili görsele dönüldü");
  }
  async function saveNote(key: string, value: string) {
    if ((media[key] || "") === value) return;
    const res = value
      ? await sb.from("site_media").upsert({ key, value, updated_at: new Date().toISOString() })
      : await sb.from("site_media").delete().eq("key", key);
    if (res.error) return say("Açıklama kaydedilemedi.");
    setMedia((m) => { const n = { ...m }; if (value) n[key] = value; else delete n[key]; return n; });
    await publish();
    say("Açıklama kaydedildi");
  }

  /* ---------- settings ---------- */
  async function saveSettings() {
    setBusy("settings");
    const { error } = await sb.from("site_settings").upsert({ id: 1, data: settings, updated_at: new Date().toISOString() });
    setBusy("");
    if (error) return say("Kaydedilemedi.");
    await publish();
    say("Kaydedildi");
  }

  const newCount = leads.filter((l) => l.status === "new").length;
  const tabs: [Tab, string, number?][] = [["leads", "Teklif talepleri", newCount], ["projects", "Projeler"], ["refs", "Referanslar"], ["media", "Görseller"], ["settings", "Site bilgileri"]];
  const fmtDate = (s: string) => new Date(s).toLocaleString("tr-TR", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
  const tel = (p: string) => p.replace(/\D/g, "").replace(/^0/, "90");

  const field = (k: keyof Settings, label: string, opts: { ta?: boolean; ph?: string } = {}) => (
    <div className={`f${opts.ta ? " full" : ""}`} key={k}>
      <label htmlFor={`set_${k}`}>{label}</label>
      {opts.ta
        ? <textarea id={`set_${k}`} value={settings[k]} placeholder={opts.ph} onChange={(e) => setSettings({ ...settings, [k]: e.target.value })} />
        : <input id={`set_${k}`} value={settings[k]} placeholder={opts.ph} onChange={(e) => setSettings({ ...settings, [k]: e.target.value })} />}
    </div>
  );

  return (
    <div className="admin">
      <aside className="a-side" role="tablist">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/logo.png" alt="TMR Engineering" />
        {tabs.map(([k, label, n]) => (
          <button key={k} role="tab" aria-selected={tab === k} onClick={() => { setTab(k); setEditing(null); }}>
            <span>{label}</span>{n ? <span className="badge">{n}</span> : null}
          </button>
        ))}
        <div className="foot">
          <a href="/tr" target="_blank" rel="noopener">Siteyi görüntüle</a>
          <form action={signOut} style={{ marginTop: 10 }}><button className="btn btn-sm btn-line" style={{ color: "var(--ink)" }}>Çıkış</button></form>
        </div>
      </aside>

      <div className="a-main">
        {tab === "leads" && (
          <>
            <h1>Teklif talepleri</h1>
            <p className="sub">Sitedeki formdan gelen talepler. <button className="btn btn-sm btn-line" onClick={load}>Yenile</button></p>
            <div className="chips">
              <button aria-pressed={leadFilter === "new"} onClick={() => setLeadFilter("new")}>Dönüş bekleyen ({newCount})</button>
              <button aria-pressed={leadFilter === "all"} onClick={() => setLeadFilter("all")}>Tümü ({leads.length})</button>
            </div>
            {leads.filter((l) => leadFilter === "all" || l.status === "new").map((l) => (
              <div key={l.id} className={`panel lead-card${l.status === "done" ? " done" : ""}`}>
                <strong style={{ fontSize: "1.1rem" }}>{l.name}</strong>{l.company && <span style={{ color: "var(--ink-2)" }}> | {l.company}</span>}
                <div className="lead-meta">
                  <span>{fmtDate(l.created_at)}</span><span>{l.service || "Hizmet belirtilmedi"}</span>
                  {l.location && <span>{l.location}</span>}{l.lang === "en" && <span>İngilizce sayfadan</span>}
                </div>
                {l.message && <p style={{ whiteSpace: "pre-line", margin: "0 0 12px" }}>{l.message}</p>}
                <div className="a-actions">
                  <a className="btn btn-sm btn-line" href={`tel:+${tel(l.phone)}`}>Ara: {l.phone}</a>
                  <a className="btn btn-sm btn-line" href={`https://wa.me/${tel(l.phone)}`} target="_blank" rel="noopener">WhatsApp</a>
                  {l.email && <a className="btn btn-sm btn-line" href={`mailto:${l.email}`}>E-posta</a>}
                  <button className={`btn btn-sm ${l.status === "new" ? "btn-o" : "btn-line"}`} onClick={() => toggleLead(l)}>{l.status === "new" ? "Dönüş yapıldı" : "Bekleyene geri al"}</button>
                  <button className="btn btn-sm btn-danger" onClick={() => deleteLead(l)}>Sil</button>
                </div>
              </div>
            ))}
            {leads.filter((l) => leadFilter === "all" || l.status === "new").length === 0 && (
              <div className="panel empty">{leadFilter === "new" ? "Dönüş bekleyen talep yok." : "Henüz talep gelmedi."}</div>
            )}
          </>
        )}

        {tab === "projects" && !editing && (
          <>
            <h1>Projeler</h1>
            <p className="sub">Yayındaki projeler sitede &quot;Projelerimiz&quot; bölümünde ve ilgili hizmet sayfasında görünür. Hiç proje yokken bölüm gizlenir.</p>
            <button className="btn btn-o" style={{ marginBottom: 18 }} onClick={() => { setRemovedImgs([]); setEditing({ ...emptyProject }); }}>Yeni proje ekle</button>
            <div className="panel">
              {projects.length === 0 && <p className="empty">Henüz proje eklenmedi. İlk projenizi gerçek şantiye fotoğraflarıyla ekleyin.</p>}
              {projects.map((p) => {
                const c = p.cover || p.images[0];
                return (
                  <div className="a-row" key={p.id}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {c ? <img src={pub(c)} alt="" /> : <img alt="" />}
                    <div className="grow">
                      <strong>{p.title}</strong>
                      <span>{[serviceById(p.service_id)?.tr.t, p.location, p.year].filter(Boolean).join(" | ")}{!p.published && " | Taslak"}{!p.title_en && " | İngilizce başlık yok"} | {p.images.length} fotoğraf</span>
                    </div>
                    <div className="a-actions">
                      <button className="btn btn-sm btn-line" onClick={() => { setRemovedImgs([]); setEditing({ ...p }); }}>Düzenle</button>
                      <button className="btn btn-sm btn-danger" onClick={() => deleteProject(p)}>Sil</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {tab === "projects" && editing && (
          <>
            <h1>{editing.id ? "Projeyi düzenle" : "Yeni proje"}</h1>
            <p className="sub">Fotoğraflar yüklenirken küçültülür; telefonla çekilmiş fotoğrafları doğrudan seçebilirsiniz.</p>
            <div className="panel"><div className="fgrid">
              <div className="f"><label htmlFor="p_title">Proje adı</label><input id="p_title" value={editing.title} placeholder="Ör. Tuzla lojistik deposu çelik çatı" onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></div>
              <div className="f"><label htmlFor="p_title_en">Proje adı (İngilizce)</label><input id="p_title_en" lang="en" value={editing.title_en || ""} placeholder="Boş kalırsa Türkçe ad gösterilir" onChange={(e) => setEditing({ ...editing, title_en: e.target.value || null })} /></div>
              <div className="f"><label htmlFor="p_svc">Hizmet</label>
                <select id="p_svc" value={editing.service_id ?? ""} onChange={(e) => setEditing({ ...editing, service_id: e.target.value ? Number(e.target.value) : null })}>
                  <option value="">Seçiniz</option>
                  {SERVICES.map((s) => <option key={s.id} value={s.id}>{s.tr.t}</option>)}
                </select></div>
              <div className="f"><label htmlFor="p_loc">Konum</label><input id="p_loc" value={editing.location || ""} placeholder="İlçe / il" onChange={(e) => setEditing({ ...editing, location: e.target.value || null })} /></div>
              <div className="f"><label htmlFor="p_year">Yıl</label><input id="p_year" inputMode="numeric" value={editing.year || ""} placeholder="2026" onChange={(e) => setEditing({ ...editing, year: e.target.value || null })} /></div>
              <div className="f"><label htmlFor="p_pub">Durum</label>
                <select id="p_pub" value={editing.published ? "1" : "0"} onChange={(e) => setEditing({ ...editing, published: e.target.value === "1" })}>
                  <option value="1">Sitede yayında</option><option value="0">Taslak (gizli)</option>
                </select></div>
              <div className="f full"><label htmlFor="p_scope">Kapsam ve açıklama</label><textarea id="p_scope" value={editing.scope || ""} placeholder="Yapılan işler, alan, süre, işveren türü…" onChange={(e) => setEditing({ ...editing, scope: e.target.value || null })} /></div>
              <div className="f full"><label htmlFor="p_scope_en">Kapsam ve açıklama (İngilizce)</label><textarea id="p_scope_en" lang="en" value={editing.scope_en || ""} placeholder="Boş kalırsa Türkçe metin gösterilir" onChange={(e) => setEditing({ ...editing, scope_en: e.target.value || null })} /></div>
            </div></div>
            <div className="panel">
              <strong>Fotoğraflar</strong> <span className="note">(turuncu çerçeveli olan kapak fotoğrafıdır)</span>
              <div className="imgs-edit">
                {editing.images.map((img) => (
                  <figure key={img}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={pub(img)} alt="" className={(editing.cover || editing.images[0]) === img ? "cover" : ""} />
                    <figcaption>
                      <button onClick={() => setEditing({ ...editing, cover: img })}>Kapak</button>
                      <button onClick={() => {
                        const images = editing.images.filter((x) => x !== img);
                        setRemovedImgs((r) => [...r, img]);
                        setEditing({ ...editing, images, cover: editing.cover === img ? images[0] || null : editing.cover });
                      }}>Kaldır</button>
                    </figcaption>
                  </figure>
                ))}
              </div>
              <label className="btn btn-line btn-sm" style={{ marginTop: 12 }}>Fotoğraf ekle
                <input type="file" accept="image/*" multiple hidden onChange={(e) => { if (e.target.files?.length) addProjectImages(e.target.files); e.target.value = ""; }} />
              </label>{" "}<span className="note">{busy.startsWith("Yükleniyor") ? busy : ""}</span>
            </div>
            <div className="a-actions">
              <button className="btn btn-o" disabled={!!busy} onClick={saveProject}>Projeyi kaydet</button>
              <button className="btn btn-line" onClick={() => setEditing(null)}>Vazgeç</button>
            </div>
          </>
        )}

        {tab === "refs" && (
          <>
            <h1>Referanslar</h1>
            <p className="sub">Birlikte çalıştığınız kurumların adı ve logosu.</p>
            <div className="panel">
              <div className="fgrid">
                <div className="f"><label htmlFor="r_name">Kurum adı</label><input id="r_name" value={refName} onChange={(e) => setRefName(e.target.value)} /></div>
                <div className="f"><label htmlFor="r_logo">Logo (isteğe bağlı)</label><input id="r_logo" type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" onChange={(e) => setRefFile(e.target.files?.[0] || null)} /></div>
              </div>
              <button className="btn btn-o" style={{ marginTop: 16 }} disabled={busy === "ref"} onClick={addRef}>Referans ekle</button>
            </div>
            <div className="panel">
              {refs.length === 0 && <p className="empty">Henüz referans eklenmedi.</p>}
              {refs.map((r) => (
                <div className="a-row" key={r.id}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {r.logo ? <img src={pub(r.logo)} alt="" style={{ objectFit: "contain", background: "#fff" }} /> : <img alt="" />}
                  <div className="grow"><strong>{r.name}</strong></div>
                  <button className="btn btn-sm btn-danger" onClick={() => deleteRef(r)}>Sil</button>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === "media" && (
          <>
            <h1>Görseller</h1>
            <p className="sub">Temsili görsellerin yerine kendi fotoğraflarınızı yükleyin. Gerçek fotoğraf yüklenen yerlerde &quot;Temsili görsel&quot; etiketi kalkar.</p>
            <div className="panel">
              <div className="a-row">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={media.hero ? pub(media.hero) : "/images/hero.jpg"} alt="" />
                <div className="grow"><strong>Ana sayfa büyük görsel</strong><span>{media.hero ? "Kendi fotoğrafınız" : "Temsili görsel"}</span></div>
                <div className="a-actions">
                  <label className="btn btn-sm btn-line">{busy === "hero" ? "Yükleniyor…" : "Fotoğraf yükle"}<input type="file" accept="image/*" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) setMediaImage("hero", f); e.target.value = ""; }} /></label>
                  {media.hero && <button className="btn btn-sm btn-line" onClick={() => resetMedia("hero")}>Temsili görsele dön</button>}
                </div>
              </div>
            </div>
            <div className="panel">
              {SERVICES.map((s) => {
                const k = `s${s.id}`;
                return (
                  <div className="a-row" key={s.id}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={media[k] ? pub(media[k]) : defaultServiceImage(s.id)} alt="" />
                    <div className="grow">
                      <strong>{s.tr.t}</strong><span>{media[k] ? "Kendi fotoğrafınız" : "Temsili görsel"}</span>
                      <div className="f" style={{ marginTop: 8 }}><label htmlFor={`n${s.id}`} style={{ fontWeight: 500, fontSize: ".85rem" }}>Ek açıklama (isteğe bağlı)</label>
                        <input id={`n${s.id}`} defaultValue={media[`n${s.id}`] || ""} placeholder="Ör. Yıllık 20.000 m² çatı kaplama kapasitesi" onBlur={(e) => saveNote(`n${s.id}`, e.target.value.trim())} /></div>
                      <div className="f" style={{ marginTop: 6 }}><label htmlFor={`e${s.id}`} style={{ fontWeight: 500, fontSize: ".85rem" }}>Ek açıklama (İngilizce)</label>
                        <input id={`e${s.id}`} lang="en" defaultValue={media[`e${s.id}`] || ""} onBlur={(e) => saveNote(`e${s.id}`, e.target.value.trim())} /></div>
                    </div>
                    <div className="a-actions">
                      <label className="btn btn-sm btn-line">{busy === k ? "Yükleniyor…" : "Fotoğraf yükle"}<input type="file" accept="image/*" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) setMediaImage(k, f); e.target.value = ""; }} /></label>
                      {media[k] && <button className="btn btn-sm btn-line" onClick={() => resetMedia(k)}>Temsili görsele dön</button>}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {tab === "settings" && (
          <>
            <h1>Site bilgileri</h1>
            <p className="sub">İletişim bilgileri ve ana sayfa metinleri. Kaydettiğinizde site hemen güncellenir.</p>
            <div className="panel"><h3 style={{ marginTop: 0 }}>İletişim</h3><div className="fgrid">
              {field("phone1", "Telefon 1")}{field("phone2", "Telefon 2")}{field("whatsapp", "WhatsApp numarası", { ph: "+90 5xx xxx xx xx" })}
              {field("email1", "E-posta 1")}{field("email2", "E-posta 2 (isteğe bağlı)")}{field("address", "Açık adres", { ta: true, ph: "Mahalle, cadde, no, ilçe / İstanbul" })}
            </div></div>
            <div className="panel"><h3 style={{ marginTop: 0 }}>Yasal bilgiler</h3><div className="fgrid">
              {field("legalName", "Ticari unvan")}{field("taxInfo", "Vergi dairesi / no")}{field("mersis", "MERSİS no")}
            </div></div>
            <div className="panel"><h3 style={{ marginTop: 0 }}>Metinler</h3><div className="fgrid">
              {field("heroSub", "Ana sayfa alt başlık", { ta: true })}{field("heroSubEn", "Ana sayfa alt başlık (İngilizce)", { ta: true })}
              {field("respNote", "İletişim bölümü açıklaması", { ta: true })}{field("respNoteEn", "İletişim bölümü açıklaması (İngilizce)", { ta: true })}
            </div></div>
            <button className="btn btn-o" disabled={busy === "settings"} onClick={saveSettings}>Değişiklikleri kaydet</button>
          </>
        )}
      </div>
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}
