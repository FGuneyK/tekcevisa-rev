# TEKCE Visa — Web Sitesi Prototipi

TEKCE Visa'nın tasarım revizyonu için hazırlanan Next.js prototipi. Vatandaşlık,
oturum izni ve global mobilite hizmetlerini tanıtan kurumsal site; içerik
katmanı şimdilik CMS yerine TypeScript dosyalarında tutuluyor.

> **Durum:** Prototip. Tasarım dilini ve sayfa yapılarını değerlendirmek için
> hazırlandı; içeriğin bir kısmı temsilîdir ve yayına çıkmadan önce gerçek
> verilerle değiştirilmelidir. Bkz. [Bilinen eksikler](#bilinen-eksikler).

## Başlarken

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) adresini açın.

| Komut | Açıklama |
| --- | --- |
| `npm run dev` | Geliştirme sunucusu |
| `npm run build` | Üretim derlemesi (tüm dinamik rotalar statik üretilir) |
| `npm run start` | Derlenmiş çıktıyı çalıştırır |
| `npm run lint` | ESLint |

## Teknoloji

- **Next.js 16.2.10** — App Router. **Bu sürüm eğitim verinizden farklı olabilir;
  kod yazmadan önce `node_modules/next/dist/docs/` altındaki ilgili rehberi
  okuyun.** (Detay: [AGENTS.md](AGENTS.md))
- **React 19.2** / **TypeScript 5**
- **Tailwind CSS v4** — yapılandırma `app/globals.css` içinde (`@theme inline`),
  ayrı `tailwind.config` dosyası yok
- **shadcn** (`base-nova` stili) + **@base-ui/react** — `components/ui/`
- **Recharts** — `/data` ve ülke sayfalarındaki grafikler
- **lucide-react** — ikonlar

## Rotalar

| Rota | Dosya | Tür |
| --- | --- | --- |
| `/` | `app/page.tsx` | Ana sayfa |
| `/residence` | `app/residence/page.tsx` | Oturum izni programları |
| `/residence/turkey`, `/residence/dubai` | `app/residence/*/page.tsx` | Ülke detayı |
| `/citizenship` | `app/citizenship/page.tsx` | Vatandaşlık programları |
| `/citizenship/turkey` | `app/citizenship/turkey/page.tsx` | Ülke detayı |
| `/cases` | `app/cases/page.tsx` | Case study listesi (kategori filtreli) |
| `/cases/[slug]` | `app/cases/[slug]/page.tsx` | Case study detayı (5 dosya) |
| `/blog` | `app/blog/page.tsx` | Blog listesi |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | Blog yazısı (6 yazı) |
| `/data` | `app/data/page.tsx` | TEKCE Data — interaktif grafikler |
| `/contact` | `app/contact/page.tsx` | İletişim ve ofisler |

Navbardaki `Visa`, `Relocation`, `Business`, `Legal`, `About` başlıkları henüz
sayfasız (`href="#"`).

## İçerik katmanı

Tüm içerik `lib/` altındaki tipli TypeScript dosyalarında. CMS yok; içerik
değişikliği kod değişikliğidir.

| Dosya | İçerik |
| --- | --- |
| `lib/teamData.ts` | 8 ekip üyesi. `getTeamMember(id)` ile çözülür; danışman fotoğrafları `public/` altında |
| `lib/blogData.ts` | 6 blog yazısı. `content` alanı HTML string, `prose` sınıflarıyla render edilir |
| `lib/casesData.ts` | 5 case study. Projedeki en zengin model: müşteri profili, değerlendirilen rotalar, hafta hafta timeline, kalem kalem maliyet, uzman notları, söyleşi transkripti, sonuç metrikleri, galeri, SSS |

Yazar ve danışman alanları `teamData`'ya `id` ile bağlanır, isim kopyalanmaz.

## Bileşenler

**Sayfa blokları** — `ConsultationCTA` (danışman seçilebilir), `PodcastCTA`,
`Process`, `Services`, `Testimonials`, `CountryCarousel` (sürüklenebilir),
`VideoSection`, `CaseFaq` (akordeon).

**Kabuk** — `components/header.tsx` (scroll'da beyaza dönen sabit header,
hover dropdown'lar, tam ekran mobil menü), `components/Footer.tsx`.

**UI** — `components/ui/` altında shadcn'den gelen `card`, `chart`, `select`.

## Tasarım dili

Yeni sayfa eklerken bu kalıplara uyun:

- **İçerik alanı:** `max-w-[1600px] mx-auto px-[5vw] lg:px-10`
- **Hero:** koyu zeminli, alta hizalı, `bg-gradient-to-t from-black/90` okunabilirlik katmanı
- **Başlıklar:** `font-serif`, gövde metni `font-light text-neutral-500`
- **Etiketler:** `text-[11px] uppercase tracking-[0.2em] text-neutral-400`
- **Accent:** `--accent` (`#00b7d0`) — Tailwind'de `text-accent` / `bg-accent`
- **Bölüm ritmi:** `py-20`, zeminler `bg-white` ↔ `bg-neutral-50` dönüşümlü
- **Kartlar:** `border border-neutral-200 rounded-2xl`, hover'da kenarlık koyulaşır
  (görsel yakınlaşması **kullanılmaz**)

## Bilinen eksikler

Prototip olarak bilinçli/bilinçsiz açık bırakılan noktalar:

- **Tipografi zinciri kopuk.** `globals.css` içindeki `--font-sans: var(--font-sans)`
  kendine referans veriyor; `layout.tsx`'te yüklenen Geist hiç uygulanmıyor ve
  `font-serif` işletim sisteminin varsayılan serif'ine düşüyor. Ayrıca font
  `subsets` listesinde `latin-ext` yok — Türkçe karakterler (ş, ğ, İ) fallback
  fontla çiziliyor.
- **Kırık linkler.** `app/page.tsx` ülke kartları `/residency/*` adresini
  kullanıyor, rotalar ise `/residence/*`. Nav ve footer'da henüz sayfası olmayan
  7 ülkeye link var; `not-found.tsx` de bulunmuyor.
- **Tek doğruluk kaynağı yok.** Ülke listesi header, footer ve ana sayfada ayrı
  ayrı tanımlı — `/residency` hatası bu yüzden oluştu.
- **Erişilebilirlik.** Nav dropdown'ları yalnızca hover ile açılıyor (klavye ve
  dokunmatikte erişilemez), mobil menü açıkken arka plan scroll'u kilitlenmiyor,
  `aria-*` kullanımı yok denecek kadar az.
- **Görseller.** 78 editoryal görsel ham `<img>` ile Unsplash'ten çekiliyor;
  `next/image` yalnızca logolarda kullanılıyor ve `next.config.ts` boş.
- **Metadata.** 12 sayfadan 5'inde `metadata` tanımlı; `sitemap.ts`, `robots.ts`
  ve JSON-LD yok.
- **`components/ui/button.tsx` silinmiş durumda** (hiçbir yerde kullanılmıyordu).
  Geri almak için: `git checkout components/ui/button.tsx`

## Dizin yapısı

```
app/                 App Router rotaları
  layout.tsx         Kök layout — fontlar, Header, Footer
  globals.css        Tailwind v4 teması ve CSS değişkenleri
components/          Sayfa blokları ve kabuk
  ui/                shadcn bileşenleri
lib/                 İçerik verisi ve yardımcılar
public/              Logolar ve ekip fotoğrafları
AGENTS.md            Bu repoda çalışan AI ajanları için talimatlar
```
