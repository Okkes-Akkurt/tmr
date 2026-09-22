# TMR Engineering web sitesi

Next.js 16 (App Router) + Supabase. Türkçe ve İngilizce, teklif formu, gizli adresli yönetim paneli.

## Yapı

| Adres | İçerik |
|---|---|
| `/` | Tarayıcı diline göre `/tr` veya `/en` adresine yönlendirir |
| `/tr`, `/en` | Ana sayfa |
| `/tr/hizmetler/<slug>`, `/en/services/<slug>` | 24 hizmetin her biri için ayrı sayfa (arama motorları için) |
| `/tr/kvkk`, `/en/kvkk` | Aydınlatma metni (taslak, hukukçuya kontrol ettirilmeli) |
| `/yonetim` | Yönetim paneli. Sitede link yok; e-posta + şifre ile giriş |

Güvenlik üç katmanlı: `proxy.ts` girişi olmayanı panelden uzak tutar, her sayfa ve işlem sunucuda yeniden kontrol edilir, veritabanında satır düzeyi güvenlik (RLS) yalnızca `admins` tablosundaki hesaplara yazma izni verir. Gizli adres tek başına güvenlik sağlamaz; asıl koruma şifreli giriş ve RLS'tir.

## 1. Supabase kurulumu

1. [supabase.com](https://supabase.com) üzerinde yeni proje açın. Bölge olarak size en yakın Avrupa bölgesini seçebilirsiniz.
2. **SQL Editor** içinde `supabase/schema.sql` dosyasının tamamını çalıştırın. Tablolar, güvenlik kuralları ve `site` adlı dosya deposu oluşur.
3. **Authentication > Sign In / Providers** altında yeni kullanıcı kaydını (signups) kapatın. Hesapları yalnızca siz oluşturacaksınız.
4. **Authentication > Users > Add user** ile yönetici e-posta ve şifresini oluşturun.
5. SQL Editor'da (e-postayı değiştirerek) yetki verin:
   ```sql
   insert into public.admins (user_id) select id from auth.users where email = 'okkesakkurt46@gmail.com';
   ```
6. **Project Settings > API Keys** bölümünden proje adresini, publishable key ve secret key değerlerini alın.

## 2. Yerelde çalıştırma

```bash
cp .env.example .env.local   # değerleri doldurun
npm install
npm run dev                  # http://localhost:3000
npm run build                # yayına almadan önce mutlaka deneyin
```

Node.js 20.9 veya üzeri gerekir.

## 3. Yayına alma (Vercel)

1. Projeyi GitHub'a yükleyin (`.env.local` dosyası `.gitignore` içinde, yüklenmez).
2. [vercel.com](https://vercel.com) üzerinde **Add New > Project** ile repoyu seçin.
3. **Environment Variables** kısmına `.env.example` içindeki değişkenleri girin. `NEXT_PUBLIC_SITE_URL` alanına `https://www.tmrengineering.com.tr` yazın.
4. Deploy edin.
5. **Settings > Domains** altından `tmrengineering.com.tr` ve `www.tmrengineering.com.tr` ekleyin. Vercel'in gösterdiği DNS kayıtlarını alan adını aldığınız firmanın panelinde tanımlayın.
6. Supabase'de **Authentication > URL Configuration** altında Site URL olarak alan adınızı girin.

## 4. İsteğe bağlı: yeni talepte e-posta bildirimi

[resend.com](https://resend.com) hesabı açıp alan adınızı doğrulayın, ardından `RESEND_API_KEY`, `LEAD_NOTIFY_TO` ve `LEAD_NOTIFY_FROM` değişkenlerini girin. Boş bırakırsanız talepler yine panele düşer, sadece e-posta gitmez.

## Yayın öncesi kontrol listesi

- [ ] `/tr/kvkk` metnini hukukçuya kontrol ettirip köşeli parantezli alanları doldurun (`src/app/[locale]/kvkk/page.tsx`).
- [ ] Panelde **Site bilgileri**: açık adres, ticari unvan, vergi ve MERSİS bilgileri.
- [ ] Panelde **Görseller**: mümkün olduğunca gerçek şantiye fotoğrafları. Katalogdaki görseller yapay zekâ üretimi ve sitede "Temsili görsel" etiketiyle gösteriliyor.
- [ ] En az birkaç gerçek proje ekleyin.
- [ ] Formdan deneme talebi gönderip panele düştüğünü görün.
- [ ] Google Search Console'a siteyi ve `https://www.tmrengineering.com.tr/sitemap.xml` adresini ekleyin.
- [ ] Google İşletme Profili açın; adres ve telefonun sitedekiyle birebir aynı olmasına dikkat edin.

## Bilinen sınırlar

- Teklif formunda dosya yükleme yok; ziyaretçi dosyayı e-postayla gönderiyor.
- Form koruması: görünmez tuzak alan, minimum doldurma süresi ve IP başına 15 dakikada 5 talep sınırı. Yoğun spam gelirse Cloudflare Turnstile eklenebilir.
- Görseller düz `<img>` ile gösteriliyor; yüklemeden önce tarayıcıda 1800 piksele küçültülüyor.
- Supabase'in ücretsiz planında uzun süre etkinlik olmayan projeler duraklatılabiliyor. Güncel plan koşullarını Supabase'in sitesinden kontrol edin.

## Dosya haritası

```
src/proxy.ts                     dil yönlendirmesi + panel oturumu
src/lib/services.ts              24 hizmetin TR/EN içeriği
src/lib/i18n.ts                  arayüz metinleri (TR/EN) ve varsayılan ayarlar
src/lib/site.ts                  herkese açık veri okuma, yardımcılar
src/app/actions.ts               teklif formu kaydı (sunucu)
src/app/[locale]/...             herkese açık sayfalar
src/app/yonetim/...              giriş ve yönetim paneli
src/components/admin/AdminApp.tsx panel arayüzü
supabase/schema.sql              veritabanı, güvenlik kuralları, depo
```
