// Hizmet katalogu (TR/EN). Metinler PDF katalogdan alınmıştır.
import type { Locale } from "./i18n";

export type ServiceText = { t: string; d: string; la: string | null; lb: string | null; a: string[]; b: string[] };
export type Service = { id: number; slug: Record<Locale, string>; tr: ServiceText; en: ServiceText };
export type Group = { id: string; ids: number[]; extraIds: number[]; tr: { t: string; d: string; x: string | null }; en: { t: string; d: string; x: string | null } };

export const SERVICES: Service[] = [
 {
  "id": 1,
  "slug": {
   "tr": "muhendislik-ve-proje-yonetimi",
   "en": "engineering-and-project-management"
  },
  "tr": {
   "t": "Mühendislik ve proje yönetimi",
   "d": "Projenin ihtiyaçlarından saha organizasyonuna uzanan bütüncül yaklaşım.",
   "la": "Planlama ve mühendislik",
   "lb": "Yönetim ve koordinasyon",
   "a": [
    "Projelendirme ve teknik danışmanlık",
    "Keşif, metraj ve maliyet analizi",
    "İş programı ve bütçe planlaması",
    "Teknik şartname ve malzeme planlaması"
   ],
   "b": [
    "Proje ve şantiye yönetimi",
    "Teknik kontrol ve kalite takibi",
    "Tedarik ve saha koordinasyonu",
    "İş ilerleme ve teslim takibi"
   ]
  },
  "en": {
   "t": "Engineering and project management",
   "d": "An integrated approach from project needs to site organisation.",
   "la": "Planning and engineering",
   "lb": "Management and coordination",
   "a": [
    "Design and technical consultancy",
    "Site survey, quantity take-off and cost analysis",
    "Work schedule and budget planning",
    "Technical specifications and material planning"
   ],
   "b": [
    "Project and site management",
    "Technical inspection and quality control",
    "Procurement and site coordination",
    "Progress and handover tracking"
   ]
  }
 },
 {
  "id": 2,
  "slug": {
   "tr": "kaba-yapi-ve-betonarme",
   "en": "structural-works-and-reinforced-concrete"
  },
  "tr": {
   "t": "Kaba yapı ve betonarme",
   "d": "Yapının temelinden taşıyıcı sistemine.",
   "la": null,
   "lb": null,
   "a": [
    "Çimento, hazır beton ve kireç",
    "Kum, çakıl, mıcır ve agrega",
    "İnşaat demiri, çelik hasır ve bağ teli",
    "Tuğla, gazbeton, bims ve beton briket",
    "Hazır örgü harçları; prefabrik beton elemanlar"
   ],
   "b": [
    "Hafriyat, kazı, dolgu ve sıkıştırma",
    "Temel, grobeton, kalıp ve donatı işleri",
    "Beton dökümü, vibrasyon ve kür",
    "Kolon, kiriş, perde ve döşeme imalatları",
    "Duvar örme ve prefabrik eleman montajı"
   ]
  },
  "en": {
   "t": "Structural works and reinforced concrete",
   "d": "From the foundation to the load-bearing system.",
   "la": null,
   "lb": null,
   "a": [
    "Cement, ready-mix concrete and lime",
    "Sand, gravel, crushed stone and aggregate",
    "Rebar, steel mesh and tie wire",
    "Brick, aerated concrete, pumice and concrete block",
    "Ready-mixed masonry mortars; precast concrete elements"
   ],
   "b": [
    "Excavation, backfill and compaction",
    "Foundations, blinding concrete, formwork and reinforcement",
    "Concrete pouring, vibration and curing",
    "Columns, beams, shear walls and slabs",
    "Masonry and precast element installation"
   ]
  }
 },
 {
  "id": 3,
  "slug": {
   "tr": "celik-yapilar",
   "en": "steel-structures"
  },
  "tr": {
   "t": "Ağır ve hafif çelik yapılar",
   "d": "Depo, hangar, fabrika ve çelik yapı çözümleri.",
   "la": null,
   "lb": null,
   "a": [
    "Ağır ve hafif çelik konstrüksiyon malzemeleri",
    "Çelik kolon, kiriş; kutu ve boru profiller",
    "I, H, U ve L profiller",
    "Siyah ve galvanizli sac; çelik levhalar",
    "Izgara, platform, ankraj ve bulonlar",
    "Kaynak elektrotları ve bağlantı elemanları"
   ],
   "b": [
    "Çelik yapı imalatı ve montajı",
    "Depo, hangar ve fabrika inşaatı",
    "Çelik çatı ve asma kat yapımı",
    "Merdiven, platform ve korkuluk imalatı",
    "Kaynaklı ve cıvatalı birleşimler",
    "Korozyon ve yangın koruma kaplamaları"
   ]
  },
  "en": {
   "t": "Heavy and light steel structures",
   "d": "Warehouse, hangar, factory and steel building solutions.",
   "la": null,
   "lb": null,
   "a": [
    "Heavy and light steel construction materials",
    "Steel columns and beams; box and pipe sections",
    "I, H, U and L sections",
    "Black and galvanised sheet; steel plates",
    "Gratings, platforms, anchors and bolts",
    "Welding electrodes and fasteners"
   ],
   "b": [
    "Steel structure fabrication and erection",
    "Warehouse, hangar and factory construction",
    "Steel roofs and mezzanine floors",
    "Stairs, platforms and railings",
    "Welded and bolted connections",
    "Anti-corrosion and fire protection coatings"
   ]
  }
 },
 {
  "id": 4,
  "slug": {
   "tr": "prefabrik-ve-moduler-yapilar",
   "en": "prefabricated-and-modular-buildings"
  },
  "tr": {
   "t": "Prefabrik ve modüler yapılar",
   "d": "Yaşam ve çalışma alanları için sistemli üretim ve kurulum.",
   "la": null,
   "lb": null,
   "a": [
    "Prefabrik yapı sistemleri",
    "Konteyner ve modüler yapılar",
    "Duvar, döşeme ve çatı panelleri",
    "Yapı bağlantı ve montaj elemanları"
   ],
   "b": [
    "Konut, ofis ve şantiye yapılarının kurulumu",
    "Konteyner ve modüler yapı montajı",
    "Elektrik ve mekanik tesisat uygulamaları",
    "Söküm ve yeniden kurulum",
    "Anahtar teslim prefabrik yapı işleri"
   ]
  },
  "en": {
   "t": "Prefabricated and modular buildings",
   "d": "Systematic production and installation for living and working spaces.",
   "la": null,
   "lb": null,
   "a": [
    "Prefabricated building systems",
    "Container and modular units",
    "Wall, floor and roof panels",
    "Connection and assembly components"
   ],
   "b": [
    "Housing, office and site facility installation",
    "Container and modular unit assembly",
    "Electrical and mechanical installations",
    "Dismantling and re-installation",
    "Turnkey prefabricated projects"
   ]
  }
 },
 {
  "id": 5,
  "slug": {
   "tr": "kalip-ve-iskele-sistemleri",
   "en": "formwork-and-scaffolding"
  },
  "tr": {
   "t": "Kalıp ve iskele sistemleri",
   "d": "Betonarme ve cephe işlerinde uygulama altyapısı.",
   "la": null,
   "lb": null,
   "a": [
    "Kalıplık kontrplak ve kereste",
    "Ahşap, çelik ve alüminyum kalıplar",
    "Teleskopik dikme, iskele ve platformlar",
    "Kalıp bağlantıları ve ayırıcı yağlar",
    "Paspayı ve donatı mesafe tutucuları"
   ],
   "b": [
    "Kalıp kurulumu ve sökümü",
    "Döşeme altı taşıyıcı iskele kurulumu",
    "Cephe ve çalışma iskelesi kurulumu",
    "İskele söküm ve saha düzenleme işleri"
   ]
  },
  "en": {
   "t": "Formwork and scaffolding systems",
   "d": "The working infrastructure for concrete and facade works.",
   "la": null,
   "lb": null,
   "a": [
    "Formwork plywood and timber",
    "Timber, steel and aluminium formwork",
    "Telescopic props, scaffolding and platforms",
    "Formwork accessories and release agents",
    "Concrete spacers and rebar chairs"
   ],
   "b": [
    "Formwork erection and stripping",
    "Slab shoring installation",
    "Facade and working scaffolding",
    "Scaffold dismantling and site clean-up"
   ]
  }
 },
 {
  "id": 6,
  "slug": {
   "tr": "su-isi-ses-ve-yangin-yalitimi",
   "en": "waterproofing-and-insulation"
  },
  "tr": {
   "t": "Su, ısı, ses ve yangın yalıtımı",
   "d": "Yapı kabuğu ve tesisatlarda ihtiyaca uygun yalıtım.",
   "la": null,
   "lb": null,
   "a": [
    "Bitümlü, PVC, TPO ve EPDM örtüler",
    "Sürme yalıtım, buhar kesici ve su tutucu bantlar",
    "Taş yünü, cam yünü, EPS ve XPS",
    "Poliüretan, PIR; ses yalıtım panel ve şilteleri",
    "Yangın durdurucu mastik, harç ve manşetler",
    "Mantolama yapıştırıcısı, sıvası, filesi ve dübeli"
   ],
   "b": [
    "Temel, perde, çatı ve teras su yalıtımı",
    "Islak hacim, havuz ve su deposu yalıtımı",
    "Mantolama; duvar ve döşeme ısı yalıtımı",
    "Ses ve titreşim yalıtımı",
    "Boru ve kanal yalıtımı",
    "Yangın durdurucu geçiş ve derz uygulamaları"
   ]
  },
  "en": {
   "t": "Waterproofing, thermal, acoustic and fire insulation",
   "d": "Insulation suited to the building envelope and services.",
   "la": null,
   "lb": null,
   "a": [
    "Bituminous, PVC, TPO and EPDM membranes",
    "Liquid-applied waterproofing, vapour barriers and waterstops",
    "Stone wool, glass wool, EPS and XPS",
    "Polyurethane, PIR; acoustic panels and blankets",
    "Firestop sealants, mortars and collars",
    "ETICS adhesive, render, mesh and anchors"
   ],
   "b": [
    "Foundation, wall, roof and terrace waterproofing",
    "Wet area, pool and water tank waterproofing",
    "External insulation (ETICS); wall and floor insulation",
    "Sound and vibration insulation",
    "Pipe and duct insulation",
    "Firestopping of penetrations and joints"
   ]
  }
 },
 {
  "id": 7,
  "slug": {
   "tr": "cati-ve-cephe-sistemleri",
   "en": "roofing-and-facade-systems"
  },
  "tr": {
   "t": "Çatı ve cephe sistemleri",
   "d": "Yapının dış yüzeylerinde malzeme ve uygulama birlikteliği.",
   "la": null,
   "lb": null,
   "a": [
    "Kiremit, shingle, trapez sac ve metal kaplamalar",
    "Sandviç panel; oluk ve yağmur iniş boruları",
    "Mahya, dere ve saçak elemanları",
    "Alüminyum kompozit ve fibercement levhalar",
    "Doğal taş ve cephe kaplama tuğlaları",
    "Giydirme cephe profili, camı ve bağlantıları"
   ],
   "b": [
    "Çatı kaplama ve panel montajı",
    "Yağmur suyu tahliye sistemi kurulumu",
    "Kompozit, fibercement ve taş kaplama",
    "Cam ve alüminyum giydirme cephe",
    "Havalandırmalı cephe uygulamaları",
    "Cephe derz ve sızdırmazlık işleri"
   ]
  },
  "en": {
   "t": "Roofing and facade systems",
   "d": "Materials and installation working together on the building exterior.",
   "la": null,
   "lb": null,
   "a": [
    "Roof tiles, shingles, trapezoidal sheet and metal cladding",
    "Sandwich panels; gutters and downpipes",
    "Ridge, valley and eaves elements",
    "Aluminium composite and fibre cement panels",
    "Natural stone and facade bricks",
    "Curtain wall profiles, glazing and fixings"
   ],
   "b": [
    "Roof covering and panel installation",
    "Rainwater drainage systems",
    "Composite, fibre cement and stone cladding",
    "Glass and aluminium curtain walls",
    "Ventilated facade systems",
    "Facade joints and sealing"
   ]
  }
 },
 {
  "id": 8,
  "slug": {
   "tr": "alci-siva-ve-asma-tavan",
   "en": "plaster-drywall-and-ceilings"
  },
  "tr": {
   "t": "Alçı, sıva ve asma tavan",
   "d": "İç mekânların bölünmesi ve yüzeylerin tamamlanması.",
   "la": null,
   "lb": null,
   "a": [
    "Alçı, saten alçı ve çimento esaslı sıvalar",
    "Alçı ve çimento esaslı yapı levhaları",
    "Bölme duvar ve tavan profilleri",
    "Asma tavan panel ve taşıyıcı sistemleri",
    "Derz bantları, dolgular ve köşe profilleri"
   ],
   "b": [
    "İç ve dış cephe sıva işleri",
    "Alçı ve saten alçı uygulamaları",
    "Bölme duvar ve duvar giydirme",
    "Alçı levha, metal ve mineral lifli tavanlar",
    "Dekoratif tavan ve gizli aydınlatma detayları"
   ]
  },
  "en": {
   "t": "Plaster, drywall and suspended ceilings",
   "d": "Dividing interiors and finishing surfaces.",
   "la": null,
   "lb": null,
   "a": [
    "Gypsum, finishing plaster and cement-based renders",
    "Gypsum and cement boards",
    "Partition and ceiling profiles",
    "Suspended ceiling panels and grids",
    "Joint tapes, fillers and corner beads"
   ],
   "b": [
    "Interior and exterior plastering",
    "Gypsum and skim coat finishes",
    "Partition walls and wall linings",
    "Plasterboard, metal and mineral fibre ceilings",
    "Decorative ceilings and concealed lighting details"
   ]
  }
 },
 {
  "id": 9,
  "slug": {
   "tr": "zemin-ve-duvar-kaplamalari",
   "en": "floor-and-wall-finishes"
  },
  "tr": {
   "t": "Zemin ve duvar kaplamaları",
   "d": "Konut, ticari alan ve endüstriyel zemin seçenekleri.",
   "la": null,
   "lb": null,
   "a": [
    "Seramik, fayans ve porselen karolar",
    "Mermer, granit, traverten ve mozaik",
    "Laminat, lamine ve masif parke",
    "PVC, vinil, linolyum ve kauçuk kaplamalar",
    "Halı, karo halı; epoksi ve poliüretan ürünler",
    "Yükseltilmiş döşeme sistemleri",
    "Şap, tesviye harcı, sertleştirici ve süpürgelik"
   ],
   "b": [
    "Zemin hazırlığı, şap ve tesviye işleri",
    "Seramik ve doğal taş döşeme",
    "Parke, halı ve esnek zemin kaplama",
    "Epoksi ve poliüretan uygulamaları",
    "Endüstriyel beton zemin uygulamaları",
    "Yükseltilmiş döşeme ve profil montajı"
   ]
  },
  "en": {
   "t": "Floor and wall finishes",
   "d": "Flooring options for residential, commercial and industrial spaces.",
   "la": null,
   "lb": null,
   "a": [
    "Ceramic, wall and porcelain tiles",
    "Marble, granite, travertine and mosaic",
    "Laminate, engineered and solid wood flooring",
    "PVC, vinyl, linoleum and rubber flooring",
    "Carpet, carpet tiles; epoxy and polyurethane products",
    "Raised access floor systems",
    "Screed, levelling compound, hardener and skirting"
   ],
   "b": [
    "Subfloor preparation, screed and levelling",
    "Ceramic and natural stone laying",
    "Wood, carpet and resilient flooring",
    "Epoxy and polyurethane coatings",
    "Industrial concrete floors",
    "Raised floor and profile installation"
   ]
  }
 },
 {
  "id": 10,
  "slug": {
   "tr": "boya-ve-yapi-kimyasallari",
   "en": "paints-and-construction-chemicals"
  },
  "tr": {
   "t": "Boya ve yapı kimyasalları",
   "d": "Yüzey koruma, onarım ve tamamlayıcı uygulamalar.",
   "la": null,
   "lb": null,
   "a": [
    "İç ve dış cephe boyaları; astarlar",
    "Ahşap koruyucular ve vernikler",
    "Metal boyaları ve koruyucu kaplamalar",
    "Yangına dayanımlı kaplamalar",
    "Yapıştırıcı, derz dolgu, silikon ve mastikler",
    "Köpük, kimyasal ankraj, beton katkı ve kürleri",
    "Beton tamir ve büzülmez dolgu harçları"
   ],
   "b": [
    "İç, dış ve dekoratif yüzey boyama",
    "Ahşap ve metal yüzey koruma",
    "Beton tamiri ve çatlak enjeksiyonu",
    "Kimyasal ankraj uygulamaları",
    "Makine kaidesi ve plaka altı harç dolgusu",
    "Silikon, mastik ve dilatasyon derzi işleri"
   ]
  },
  "en": {
   "t": "Paints and construction chemicals",
   "d": "Surface protection, repair and finishing applications.",
   "la": null,
   "lb": null,
   "a": [
    "Interior and exterior paints; primers",
    "Wood preservatives and varnishes",
    "Metal paints and protective coatings",
    "Fire-resistant coatings",
    "Adhesives, grouts, silicones and sealants",
    "Foam, chemical anchors, admixtures and curing compounds",
    "Concrete repair and non-shrink grouts"
   ],
   "b": [
    "Interior, exterior and decorative painting",
    "Wood and metal surface protection",
    "Concrete repair and crack injection",
    "Chemical anchoring",
    "Machine base and baseplate grouting",
    "Silicone, sealant and expansion joint works"
   ]
  }
 },
 {
  "id": 11,
  "slug": {
   "tr": "kapi-pencere-ve-cam-sistemleri",
   "en": "doors-windows-and-glazing"
  },
  "tr": {
   "t": "Kapı, pencere ve cam sistemleri",
   "d": "Mimari açıklıklar için doğrama ve donanım çözümleri.",
   "la": null,
   "lb": null,
   "a": [
    "Çelik, ahşap ve kompozit kapılar",
    "Yangına dayanıklı kapılar",
    "PVC ve alüminyum kapı ve pencereler",
    "Endüstriyel, otomatik ve seksiyonel kapılar",
    "Panjur ve kepenk sistemleri",
    "Yalıtımlı, temperli ve lamine camlar",
    "Kilit, menteşe, kol, kapatıcı, conta ve fitiller"
   ],
   "b": [
    "Kapı ve pencere montajı",
    "Yangına dayanıklı kapı montajı",
    "Otomatik kapı, panjur ve kepenk kurulumu",
    "Cam bölme ve cam korkuluk montajı",
    "Cam değişimi ve sızdırmazlık işleri",
    "Kapı donanımı ve aksesuar montajı"
   ]
  },
  "en": {
   "t": "Doors, windows and glazing",
   "d": "Joinery and hardware for architectural openings.",
   "la": null,
   "lb": null,
   "a": [
    "Steel, timber and composite doors",
    "Fire-rated doors",
    "PVC and aluminium doors and windows",
    "Industrial, automatic and sectional doors",
    "Shutters and roller grilles",
    "Insulated, tempered and laminated glass",
    "Locks, hinges, handles, closers, gaskets and seals"
   ],
   "b": [
    "Door and window installation",
    "Fire-rated door installation",
    "Automatic door, shutter and roller grille installation",
    "Glass partitions and glass balustrades",
    "Glass replacement and sealing",
    "Door hardware and accessory fitting"
   ]
  }
 },
 {
  "id": 12,
  "slug": {
   "tr": "ahsap-ve-sabit-mobilya",
   "en": "joinery-and-fitted-furniture"
  },
  "tr": {
   "t": "Ahşap ve sabit mobilya",
   "d": "Mekâna özel üretim ve tamamlayıcı ahşap işleri.",
   "la": null,
   "lb": null,
   "a": [
    "Kereste, OSB ve kontrplak",
    "MDF ve sunta levhalar",
    "Ahşap kaplama ve laminatlar",
    "Mutfak ve banyo dolapları",
    "Tezgâh malzemeleri",
    "Ray, menteşe ve mobilya bağlantıları"
   ],
   "b": [
    "Mutfak ve banyo dolabı imalatı ve montajı",
    "Gömme dolap ve vestiyer uygulamaları",
    "Tezgâh montajı",
    "Ahşap duvar ve tavan kaplaması",
    "Ahşap deck ve pergola yapımı"
   ]
  },
  "en": {
   "t": "Joinery and fitted furniture",
   "d": "Bespoke production and complementary woodwork.",
   "la": null,
   "lb": null,
   "a": [
    "Timber, OSB and plywood",
    "MDF and particleboard",
    "Wood veneers and laminates",
    "Kitchen and bathroom cabinets",
    "Countertop materials",
    "Runners, hinges and furniture fittings"
   ],
   "b": [
    "Kitchen and bathroom cabinet production and fitting",
    "Built-in wardrobes and cloakrooms",
    "Countertop installation",
    "Timber wall and ceiling cladding",
    "Timber decking and pergolas"
   ]
  }
 },
 {
  "id": 13,
  "slug": {
   "tr": "sihhi-tesisat-ve-sanitasyon",
   "en": "plumbing-and-sanitation"
  },
  "tr": {
   "t": "Sıhhi tesisat ve sanitasyon",
   "d": "Su tesisatı, sağlık gereçleri ve hijyen ekipmanları.",
   "la": null,
   "lb": null,
   "a": [
    "Temiz, sıcak ve atık su boruları; ek parçalar",
    "Askı, kelepçe, vana, çekvalf, filtre ve kolektör",
    "Sayaç, su deposu, hidrofor ve pompalar",
    "Süzgeç, sifon ve yer giderleri",
    "Lavabo, klozet, pisuar ve rezervuarlar",
    "Duş, küvet, evye, batarya ve aksesuarlar",
    "Erişilebilir kullanıma uygun sağlık gereçleri"
   ],
   "b": [
    "Temiz su, atık su ve yağmur suyu tesisatı",
    "Su deposu, hidrofor ve pompa montajı",
    "Banyo ve mutfak tesisat uygulamaları",
    "Sağlık gereçleri ve aksesuar montajı",
    "Basınç ve sızdırmazlık testleri"
   ]
  },
  "en": {
   "t": "Plumbing and sanitation",
   "d": "Water installations, sanitary ware and hygiene equipment.",
   "la": null,
   "lb": null,
   "a": [
    "Cold, hot and waste water pipes; fittings",
    "Hangers, clamps, valves, check valves, filters and manifolds",
    "Meters, water tanks, booster sets and pumps",
    "Gullies, traps and floor drains",
    "Washbasins, WCs, urinals and cisterns",
    "Showers, bathtubs, sinks, taps and accessories",
    "Accessible sanitary ware"
   ],
   "b": [
    "Clean water, waste water and rainwater installations",
    "Water tank, booster set and pump installation",
    "Bathroom and kitchen plumbing",
    "Sanitary ware and accessory fitting",
    "Pressure and leak testing"
   ]
  }
 },
 {
  "id": 14,
  "slug": {
   "tr": "isitma-sogutma-ve-havalandirma",
   "en": "heating-cooling-and-ventilation"
  },
  "tr": {
   "t": "Isıtma, soğutma ve havalandırma",
   "d": "Bina kullanımına uygun mekanik sistemler.",
   "la": null,
   "lb": null,
   "a": [
    "Kazan, kombi ve ısı pompaları",
    "Radyatör, havlupan ve yerden ısıtma",
    "Klima, VRF, fan coil ve klima santralleri",
    "Havalandırma kanalları ve bağlantıları",
    "Fan, aspiratör, menfez ve difüzörler",
    "Hava ve yangın damperleri",
    "Genleşme tankı, termostat ve kontrol ekipmanı"
   ],
   "b": [
    "Isıtma ve soğutma sistemi kurulumu",
    "Yerden ısıtma uygulamaları",
    "Klima ve mekanik ekipman montajı",
    "Kanal imalatı ve montajı",
    "Otopark havalandırması ve duman tahliyesi",
    "Otomasyon, dengeleme ve devreye alma"
   ]
  },
  "en": {
   "t": "Heating, cooling and ventilation",
   "d": "Mechanical systems suited to how the building is used.",
   "la": null,
   "lb": null,
   "a": [
    "Boilers, combi boilers and heat pumps",
    "Radiators, towel rails and underfloor heating",
    "Air conditioners, VRF, fan coils and air handling units",
    "Ventilation ducts and connections",
    "Fans, extractors, grilles and diffusers",
    "Air and fire dampers",
    "Expansion tanks, thermostats and controls"
   ],
   "b": [
    "Heating and cooling system installation",
    "Underfloor heating",
    "Air conditioning and mechanical equipment installation",
    "Duct fabrication and installation",
    "Car park ventilation and smoke extraction",
    "Controls, balancing and commissioning"
   ]
  }
 },
 {
  "id": 15,
  "slug": {
   "tr": "yangin-koruma-sistemleri",
   "en": "fire-protection-systems"
  },
  "tr": {
   "t": "Yangın koruma sistemleri",
   "d": "Algılama ve söndürme sistemlerinin bütünleşik kurulumu.",
   "la": null,
   "lb": null,
   "a": [
    "Yangın boruları ve bağlantı elemanları",
    "Sprinkler, yangın dolabı ve hortumlar",
    "Hidrant, vana ve yangın pompa grupları",
    "Taşınabilir yangın söndürücüler",
    "Gazlı söndürme ekipmanları",
    "Algılama panelleri, dedektör ve alarm cihazları"
   ],
   "b": [
    "Yangın söndürme tesisatı kurulumu",
    "Sprinkler, hidrant ve dolap montajı",
    "Yangın pompa grubu kurulumu",
    "Gazlı söndürme sistemi kurulumu",
    "Yangın algılama ve alarm sistemi kurulumu",
    "Sistem testi ve devreye alma"
   ]
  },
  "en": {
   "t": "Fire protection systems",
   "d": "Integrated installation of detection and suppression systems.",
   "la": null,
   "lb": null,
   "a": [
    "Fire pipework and fittings",
    "Sprinklers, hose cabinets and hoses",
    "Hydrants, valves and fire pump sets",
    "Portable fire extinguishers",
    "Gas suppression equipment",
    "Detection panels, detectors and alarm devices"
   ],
   "b": [
    "Fire suppression pipework installation",
    "Sprinkler, hydrant and cabinet installation",
    "Fire pump set installation",
    "Gas suppression system installation",
    "Fire detection and alarm system installation",
    "System testing and commissioning"
   ]
  }
 },
 {
  "id": 16,
  "slug": {
   "tr": "elektrik-ve-aydinlatma",
   "en": "electrical-and-lighting"
  },
  "tr": {
   "t": "Elektrik ve aydınlatma",
   "d": "Enerji dağıtımı ve aydınlatma altyapısı.",
   "la": null,
   "lb": null,
   "a": [
    "Enerji ve kumanda kabloları",
    "Boru, kanal, kablo tavası ve merdivenleri",
    "Elektrik panoları ve devre kesiciler",
    "Sigorta ve kaçak akım koruma cihazları",
    "Priz, anahtar, buat ve klemensler",
    "Topraklama ve yıldırımdan korunma ürünleri",
    "İç, dış ve acil aydınlatma armatürleri",
    "Jeneratör ve kesintisiz güç kaynakları"
   ],
   "b": [
    "Elektrik altyapısı ve kablo çekimi",
    "Pano montajı ve bağlantıları",
    "Priz, anahtar ve armatür montajı",
    "Topraklama ve yıldırımdan korunma",
    "Jeneratör ve güç kaynağı kurulumu",
    "Ölçüm, test ve devreye alma"
   ]
  },
  "en": {
   "t": "Electrical and lighting",
   "d": "Power distribution and lighting infrastructure.",
   "la": null,
   "lb": null,
   "a": [
    "Power and control cables",
    "Conduits, trunking, cable trays and ladders",
    "Switchboards and circuit breakers",
    "Fuses and residual current devices",
    "Sockets, switches, junction boxes and terminals",
    "Earthing and lightning protection products",
    "Interior, exterior and emergency luminaires",
    "Generators and UPS systems"
   ],
   "b": [
    "Electrical infrastructure and cable pulling",
    "Switchboard installation and connections",
    "Socket, switch and luminaire installation",
    "Earthing and lightning protection",
    "Generator and power supply installation",
    "Measurement, testing and commissioning"
   ]
  }
 },
 {
  "id": 17,
  "slug": {
   "tr": "guvenlik-ve-zayif-akim",
   "en": "security-and-low-voltage"
  },
  "tr": {
   "t": "Güvenlik ve zayıf akım",
   "d": "İletişim, izleme ve bina kontrol altyapısı.",
   "la": null,
   "lb": null,
   "a": [
    "Güvenlik kamerası ve kayıt cihazları",
    "Hırsız alarmı ve geçiş kontrol ekipmanları",
    "İnterkom ve görüntülü diafonlar",
    "Data, telefon, koaksiyel ve fiber kablolar",
    "Ağ kabinleri ve bağlantı donanımları",
    "Merkezi TV ve uydu ekipmanları",
    "Seslendirme ve acil anons sistemleri"
   ],
   "b": [
    "Kamera, alarm ve geçiş kontrol kurulumu",
    "Data, telefon ve fiber optik altyapı",
    "Diafon ve merkezi uydu sistemi kurulumu",
    "Seslendirme ve acil anons kurulumu",
    "Bina otomasyon sistemlerinin kurulumu"
   ]
  },
  "en": {
   "t": "Security and low-voltage systems",
   "d": "Communication, monitoring and building control infrastructure.",
   "la": null,
   "lb": null,
   "a": [
    "Security cameras and recorders",
    "Intruder alarms and access control equipment",
    "Intercoms and video door phones",
    "Data, telephone, coaxial and fibre cables",
    "Network cabinets and connectivity hardware",
    "Central TV and satellite equipment",
    "Public address and voice alarm systems"
   ],
   "b": [
    "Camera, alarm and access control installation",
    "Data, telephone and fibre optic infrastructure",
    "Door phone and central satellite system installation",
    "Public address and voice alarm installation",
    "Building automation system installation"
   ]
  }
 },
 {
  "id": 18,
  "slug": {
   "tr": "altyapi-drenaj-ve-peyzaj",
   "en": "infrastructure-drainage-and-landscaping"
  },
  "tr": {
   "t": "Altyapı, drenaj ve peyzaj",
   "d": "Yapı çevresinden saha altyapısına.",
   "la": null,
   "lb": null,
   "a": [
    "Beton, betonarme, koruge ve HDPE borular",
    "Drenaj boruları ve levhaları",
    "Geotekstil ve geomembranlar",
    "Rögar, muayene bacası ve kapakları",
    "Izgara, drenaj kanalı, parke ve bordürler",
    "Beton plak, çim taşı ve gabion sepetleri",
    "Tel çit, panel çit ve sulama ekipmanları"
   ],
   "b": [
    "Kanalizasyon ve yağmur suyu hatları",
    "Drenaj ve rögar uygulamaları",
    "Geotekstil ve geomembran serimi",
    "Parke taşı ve bordür döşeme",
    "Çevre ve istinat duvarı yapımı",
    "Çit ve sulama sistemi kurulumu",
    "Çim, bitkilendirme ve çevre düzenlemesi"
   ]
  },
  "en": {
   "t": "Infrastructure, drainage and landscaping",
   "d": "From the building surroundings to site infrastructure.",
   "la": null,
   "lb": null,
   "a": [
    "Concrete, reinforced concrete, corrugated and HDPE pipes",
    "Drainage pipes and boards",
    "Geotextiles and geomembranes",
    "Manholes, inspection chambers and covers",
    "Gratings, drainage channels, pavers and kerbs",
    "Concrete slabs, grass pavers and gabion baskets",
    "Wire fencing, panel fencing and irrigation equipment"
   ],
   "b": [
    "Sewer and stormwater lines",
    "Drainage and manhole works",
    "Geotextile and geomembrane laying",
    "Paving and kerb laying",
    "Boundary and retaining walls",
    "Fencing and irrigation installation",
    "Turf, planting and landscaping"
   ]
  }
 },
 {
  "id": 19,
  "slug": {
   "tr": "endustriyel-mutfak-ve-soguk-depo",
   "en": "commercial-kitchens-and-cold-storage"
  },
  "tr": {
   "t": "Endüstriyel mutfak ve soğuk depo",
   "d": "Profesyonel gıda hazırlama ve muhafaza alanları.",
   "la": null,
   "lb": null,
   "a": [
    "Endüstriyel pişirme ve hazırlık ekipmanları",
    "Paslanmaz tezgâh, evye ve raflar",
    "Endüstriyel bulaşık makineleri",
    "Davlumbaz ve egzoz sistemleri",
    "Ticari buzdolapları ve dondurucular",
    "Soğuk oda paneli, kapısı ve soğutma ünitesi"
   ],
   "b": [
    "Endüstriyel mutfak kurulumu",
    "Ekipman montajı ve tesisat bağlantıları",
    "Davlumbaz ve egzoz sistemi montajı",
    "Soğuk oda ve soğuk depo kurulumu",
    "Test ve devreye alma"
   ]
  },
  "en": {
   "t": "Commercial kitchens and cold storage",
   "d": "Professional food preparation and storage areas.",
   "la": null,
   "lb": null,
   "a": [
    "Industrial cooking and preparation equipment",
    "Stainless steel counters, sinks and shelving",
    "Commercial dishwashers",
    "Hoods and exhaust systems",
    "Commercial refrigerators and freezers",
    "Cold room panels, doors and refrigeration units"
   ],
   "b": [
    "Commercial kitchen installation",
    "Equipment installation and service connections",
    "Hood and exhaust system installation",
    "Cold room and cold storage installation",
    "Testing and commissioning"
   ]
  }
 },
 {
  "id": 20,
  "slug": {
   "tr": "endustriyel-ekipman-ve-depolama",
   "en": "industrial-equipment-and-storage"
  },
  "tr": {
   "t": "Endüstriyel ekipman ve depolama",
   "d": "Üretim, paketleme ve lojistik alanları için ekipman.",
   "la": null,
   "lb": null,
   "a": [
    "Shrink ambalaj makineleri",
    "Paketleme ve ambalajlama ekipmanları",
    "Konveyör ve taşıma sistemleri",
    "Depo rafları ve depolama sistemleri",
    "Yükleme rampaları ve körükler",
    "Atölye ve üretim ekipmanları"
   ],
   "b": [
    "Ekipman yerleşimi ve montajı",
    "Shrink ve ambalaj makinesi kurulumu",
    "Depo rafı ve yükleme sistemi montajı",
    "Makine sabitleme ve tesisat bağlantıları",
    "Test ve devreye alma"
   ]
  },
  "en": {
   "t": "Industrial equipment and storage",
   "d": "Equipment for production, packaging and logistics areas.",
   "la": null,
   "lb": null,
   "a": [
    "Shrink wrapping machines",
    "Packaging and wrapping equipment",
    "Conveyor and handling systems",
    "Warehouse racking and storage systems",
    "Loading docks and dock shelters",
    "Workshop and production equipment"
   ],
   "b": [
    "Equipment layout and installation",
    "Shrink and packaging machine installation",
    "Racking and loading system installation",
    "Machine anchoring and service connections",
    "Testing and commissioning"
   ]
  }
 },
 {
  "id": 21,
  "slug": {
   "tr": "hirdavat-ve-is-guvenligi-urunleri",
   "en": "hardware-and-safety-products"
  },
  "tr": {
   "t": "Hırdavat ve iş güvenliği ürünleri",
   "d": "Saha, atölye ve bakım ekipleri için tamamlayıcı tedarik.",
   "la": "Hırdavat ve el aletleri",
   "lb": "İş güvenliği ürünleri",
   "a": [
    "Vida, çivi, dübel, cıvata ve somunlar",
    "Köşebent ve bağlantı plakaları",
    "El aletleri ve elektrikli el aletleri",
    "Ölçüm ve kontrol aletleri",
    "Disk, matkap ucu ve zımparalar",
    "Bant, fırça, rulo, örtü ve brandalar"
   ],
   "b": [
    "İş kıyafetleri ve üniformalar",
    "Reflektörlü yelek ve koruyucu giysiler",
    "Baret, iş ayakkabısı ve eldivenler",
    "Koruyucu gözlük, maske ve kulaklıklar",
    "Emniyet kemeri ve düşüş durdurma ekipmanı",
    "İş güvenliği levhaları ve bariyerler"
   ]
  },
  "en": {
   "t": "Hardware and safety products",
   "d": "Complementary supply for site, workshop and maintenance teams.",
   "la": "Hardware and tools",
   "lb": "Health and safety products",
   "a": [
    "Screws, nails, anchors, bolts and nuts",
    "Angle brackets and connector plates",
    "Hand tools and power tools",
    "Measuring and testing instruments",
    "Discs, drill bits and abrasives",
    "Tapes, brushes, rollers, sheets and tarpaulins"
   ],
   "b": [
    "Workwear and uniforms",
    "Hi-vis vests and protective clothing",
    "Hard hats, safety shoes and gloves",
    "Safety glasses, masks and ear protection",
    "Harnesses and fall arrest equipment",
    "Safety signs and barriers"
   ]
  }
 },
 {
  "id": 22,
  "slug": {
   "tr": "tekstil-ve-hali-urunleri",
   "en": "textiles-and-carpets"
  },
  "tr": {
   "t": "Tekstil ve halı ürünleri",
   "d": "Konut, otel ve kurumsal alanlar için tekstil tedariki.",
   "la": null,
   "lb": "Tedarik ve uygulama",
   "a": [
    "Ev, otel ve kurumsal tekstil ürünleri",
    "Nevresim ve çarşaflar",
    "Havlu ve bornozlar",
    "Perde ve döşemelik kumaşlar",
    "Halı, kilim ve karo halılar"
   ],
   "b": [
    "Proje ihtiyacına göre ürün seçimi",
    "Ölçü, renk ve malzeme eşleştirmesi",
    "Toplu tedarik ve teslimat planlaması",
    "Halı ve karo halı döşeme uygulamaları"
   ]
  },
  "en": {
   "t": "Textiles and carpets",
   "d": "Textile supply for homes, hotels and institutions.",
   "la": null,
   "lb": "Supply and installation",
   "a": [
    "Home, hotel and institutional textiles",
    "Bed linen and sheets",
    "Towels and bathrobes",
    "Curtain and upholstery fabrics",
    "Carpets, rugs and carpet tiles"
   ],
   "b": [
    "Product selection for project needs",
    "Size, colour and material matching",
    "Bulk supply and delivery planning",
    "Carpet and carpet tile installation"
   ]
  }
 },
 {
  "id": 23,
  "slug": {
   "tr": "gida-icecek-ve-hizli-tuketim",
   "en": "food-beverages-and-consumables"
  },
  "tr": {
   "t": "Gıda, içecek ve hızlı tüketim",
   "d": "İşletmelerin ve toplu tüketim alanlarının ürün ihtiyaçları.",
   "la": "Gıda ürünleri",
   "lb": "İçecek ve hızlı tüketim",
   "a": [
    "Her türlü taze sebze ve meyve",
    "Kuru gıda, bakliyat, un, yağ ve şeker",
    "Konserve ve paketli gıdalar",
    "Süt ve süt ürünleri",
    "Et, tavuk ve deniz ürünleri",
    "Dondurulmuş gıdalar",
    "Atıştırmalık ve şekerleme ürünleri"
   ],
   "b": [
    "Su ve diğer içecekler",
    "Çay ve kahve ürünleri",
    "Temizlik ve hijyen ürünleri",
    "Kişisel bakım ürünleri",
    "Kâğıt ürünleri",
    "Tek kullanımlık sarf malzemeleri"
   ]
  },
  "en": {
   "t": "Food, beverages and consumables",
   "d": "Product needs of businesses and catering facilities.",
   "la": "Food products",
   "lb": "Beverages and consumables",
   "a": [
    "Fresh fruit and vegetables",
    "Dry goods, pulses, flour, oil and sugar",
    "Canned and packaged food",
    "Milk and dairy products",
    "Meat, poultry and seafood",
    "Frozen food",
    "Snacks and confectionery"
   ],
   "b": [
    "Water and other beverages",
    "Tea and coffee",
    "Cleaning and hygiene products",
    "Personal care products",
    "Paper products",
    "Single-use consumables"
   ]
  }
 },
 {
  "id": 24,
  "slug": {
   "tr": "tadilat-ve-anahtar-teslim-taahhut",
   "en": "renovation-and-turnkey-contracting"
  },
  "tr": {
   "t": "Tadilat ve anahtar teslim taahhüt",
   "d": "Yapım, yenileme ve teslim süreçlerinin koordinasyonu.",
   "la": "Yapı ve kullanım alanları",
   "lb": null,
   "a": [
    "Konut ve villa",
    "Ofis, mağaza ve ticari alanlar",
    "Depo, hangar ve fabrikalar",
    "Otel ve restoranlar",
    "Prefabrik ve modüler yapılar"
   ],
   "b": [
    "Anahtar teslim inşaat ve tadilat",
    "İç mekân dekorasyon ve yenileme",
    "Kontrollü söküm ve yıkım",
    "Betonarme ve çelik yapı güçlendirme",
    "Çatı, cephe ve tesisat onarımları",
    "Uygulama ve teslim koordinasyonu"
   ]
  },
  "en": {
   "t": "Renovation and turnkey contracting",
   "d": "Coordination of construction, renovation and handover.",
   "la": "Building types",
   "lb": null,
   "a": [
    "Houses and villas",
    "Offices, shops and commercial spaces",
    "Warehouses, hangars and factories",
    "Hotels and restaurants",
    "Prefabricated and modular buildings"
   ],
   "b": [
    "Turnkey construction and renovation",
    "Interior fit-out and refurbishment",
    "Controlled demolition and strip-out",
    "Strengthening of concrete and steel structures",
    "Roof, facade and building services repairs",
    "Execution and handover coordination"
   ]
  }
 },
 {
  "id": 25,
  "slug": {
   "tr": "bina-ve-tasiyici-sistem-guclendirme",
   "en": "building-and-structural-strengthening"
  },
  "tr": {
   "t": "Bina ve taşıyıcı sistem güçlendirme",
   "d": "Mevcut yapılara yönelik projelendirme ve güçlendirme uygulamaları.",
   "la": null,
   "lb": null,
   "a": [
    "Güçlendirme donatıları ve çelik profiller",
    "Çelik levha, ankraj ve bağlantı elemanları",
    "Beton tamir ve yapısal onarım harçları",
    "Büzülmez grout ve epoksi enjeksiyon ürünleri",
    "Kimyasal ankraj ve bağlantı sistemleri"
   ],
   "b": [
    "Mevcut yapı incelemesi ve güçlendirme projelendirmesi",
    "Betonarme kolon ve kiriş mantolama",
    "Çelik mantolama ve taşıyıcı eleman takviyesi",
    "İlave betonarme perde uygulamaları",
    "Temel ve birleşim bölgesi güçlendirme",
    "Çatlak enjeksiyonu ve beton onarımı",
    "Onaylı projeye göre uygulama ve kalite kontrol"
   ]
  },
  "en": {
   "t": "Building and structural strengthening",
   "d": "Assessment, design and strengthening works for existing structures.",
   "la": null,
   "lb": null,
   "a": [
    "Strengthening reinforcement and steel sections",
    "Steel plates, anchors and fasteners",
    "Concrete repair and structural repair mortars",
    "Non-shrink grout and epoxy injection products",
    "Chemical anchors and connection systems"
   ],
   "b": [
    "Survey of the existing structure and strengthening design",
    "Concrete jacketing of columns and beams",
    "Steel jacketing and reinforcement of structural members",
    "Additional reinforced concrete shear walls",
    "Foundation and joint strengthening",
    "Crack injection and concrete repair",
    "Execution and quality control to the approved design"
   ]
  }
 },
 {
  "id": 26,
  "slug": {
   "tr": "karbon-fiber-guclendirme",
   "en": "carbon-fibre-strengthening"
  },
  "tr": {
   "t": "Karbon fiber güçlendirme uygulamaları",
   "d": "Projesine uygun CFRP sistemleriyle taşıyıcı elemanların güçlendirilmesi.",
   "la": null,
   "lb": null,
   "a": [
    "Karbon fiber kumaş ve şeritler",
    "CFRP lamine plakalar",
    "Sisteme uygun epoksi astar ve doyurma reçineleri",
    "Yapısal epoksi yapıştırıcı ve yüzey düzeltme ürünleri",
    "Projeye uygun fiber ankraj elemanları",
    "Koruyucu son kat ve kaplama ürünleri"
   ],
   "b": [
    "Yüzey hazırlığı, beton onarımı ve köşe düzenleme",
    "Kolonlarda karbon fiber sargılama",
    "Kiriş ve döşemelerde CFRP şerit ve plaka uygulamaları",
    "Proje detayına uygun ankraj ve birleşimler",
    "Epoksi yapıştırma ve lif doyurma uygulamaları",
    "Uygulama kontrolü ve koruyucu kaplama",
    "Sistem ve katmanların mühendislik projesine göre seçimi"
   ]
  },
  "en": {
   "t": "Carbon fibre (CFRP) strengthening",
   "d": "Strengthening of structural members with CFRP systems designed for the project.",
   "la": null,
   "lb": null,
   "a": [
    "Carbon fibre fabrics and strips",
    "CFRP laminate plates",
    "Epoxy primers and saturating resins for the system",
    "Structural epoxy adhesives and levelling products",
    "Fibre anchors specified in the design",
    "Protective top coats and finishes"
   ],
   "b": [
    "Surface preparation, concrete repair and corner rounding",
    "Carbon fibre wrapping of columns",
    "CFRP strip and plate application on beams and slabs",
    "Anchors and connections to the design details",
    "Epoxy bonding and fibre saturation",
    "Application control and protective coating",
    "Selection of system and layers according to the engineering design"
   ]
  }
 }
];

export const GROUPS: Group[] = [
 {
  "id": "g1",
  "ids": [
   1,
   2,
   3,
   4,
   5,
   6
  ],
  "extraIds": [],
  "tr": {
   "t": "Yapı ve taşıyıcı sistem",
   "d": "Mühendislikten kaba yapıya, çelikten yalıtıma.",
   "x": null
  },
  "en": {
   "t": "Structure and building systems",
   "d": "From engineering to structural works, steel and insulation.",
   "x": null
  }
 },
 {
  "id": "g2",
  "ids": [
   7,
   8,
   9,
   10,
   11,
   12
  ],
  "extraIds": [],
  "tr": {
   "t": "Cephe, iç mekân ve doğrama",
   "d": "Yapının dış kabuğu ve iç yüzeyleri.",
   "x": null
  },
  "en": {
   "t": "Facade, interiors and joinery",
   "d": "The building envelope and interior surfaces.",
   "x": null
  }
 },
 {
  "id": "g3",
  "ids": [
   13,
   14,
   15,
   16,
   17,
   18
  ],
  "extraIds": [],
  "tr": {
   "t": "Mekanik, elektrik ve altyapı",
   "d": "Tesisat, enerji, güvenlik ve saha altyapısı.",
   "x": null
  },
  "en": {
   "t": "MEP and infrastructure",
   "d": "Services, power, security and site infrastructure.",
   "x": null
  }
 },
 {
  "id": "g4",
  "ids": [
   24,
   19,
   20,
   21
  ],
  "extraIds": [
   22,
   23
  ],
  "tr": {
   "t": "Endüstriyel ve anahtar teslim",
   "d": "Ekipman, tadilat ve kurumsal tedarik.",
   "x": "Kurumsal tedarik"
  },
  "en": {
   "t": "Industrial and turnkey",
   "d": "Equipment, renovation and corporate supply.",
   "x": "Corporate supply"
  }
 },
 {
  "id": "g5",
  "ids": [
   25,
   26
  ],
  "extraIds": [],
  "tr": {
   "t": "Bina güçlendirme ve karbon fiber",
   "d": "Mevcut yapıların incelenmesi, güçlendirilmesi ve CFRP uygulamaları.",
   "x": null
  },
  "en": {
   "t": "Strengthening and CFRP",
   "d": "Assessment, strengthening and CFRP works for existing buildings.",
   "x": null
  }
 }
];

export const serviceById = (id: number | string | null | undefined) => SERVICES.find((s) => s.id === Number(id));
export const serviceBySlug = (locale: Locale, slug: string) => SERVICES.find((s) => s.slug[locale] === slug);
export const servicePath = (locale: Locale, s: Service) => (locale === "tr" ? `/tr/hizmetler/${s.slug.tr}` : `/en/services/${s.slug.en}`);
export const defaultServiceImage = (id: number) => `/images/services/s${id}.jpg`;
