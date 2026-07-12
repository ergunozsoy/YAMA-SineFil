# Sinefil — İçerik Ekleme Kılavuzu

Bu site bağımlılıksız (framework yok) düz HTML + CSS + küçük JS ile kuruludur.
Aşağıdaki şablonları kopyala-yapıştır yaparak yeni içerik ekleyebilirsin.

Dosya düzeni:

```
index.html            → ana sayfa (hero video, koleksiyonlar, yönetmen pencereleri, filmler, sahneler, hakkında)
style.css             → tüm stiller
script.js             → menü + ses düğmesi (yalnızca ana sayfada)
lang.js               → TR/EN/DE dil değiştirici (her sayfada)
collections/*.html    → koleksiyon detay sayfaları
directors/*.html      → yönetmen detay sayfaları
films/*.html          → film detay sayfaları
assets/images, assets/video → görsel ve videolar
```

---

## 1. Çeviri kuralı (TR / EN / DE)

Her görünür metin, üç kardeş öğe halinde yazılır. Türkçe görünür kalır; EN ve DE'ye `hidden` eklenir. `lang.js` seçili dile göre gösterir/gizler.

```html
<p data-lang="tr">Türkçe metin</p><p data-lang="en" hidden>English text</p><p data-lang="de" hidden>Deutscher Text</p>
```

Kurallar:
- `hidden` yalnızca EN ve DE'de olur, TR'de asla.
- Özel isimler, film adları, yıllar çevrilmez (tek sefer, sarmalanmadan yazılır).
- Bir öğenin içindeki metni sarmalarken `<span data-lang="...">` kullan.
- `[hidden]{display:none !important}` kuralı style.css'te tanımlı — silme.

---

## 2. Yeni yönetmen eklemek

**a) Ana sayfada pencere** — `index.html` içindeki `<div class="director-grid">` altına ekle:

```html
<a class="win" href="directors/SLUG.html">
  <span class="win-frame">
    <span class="win-glass">
      <span class="win-view view-SLUG"></span>
      <span class="win-grille"></span>
    </span>
    <span class="win-emblem" aria-hidden="true"><!-- SVG simge (bkz. bölüm 5) --></span>
    <span class="win-plate">
      <span class="director-year">DOĞUM–ÖLÜM</span>
      <strong>Ad Soyad</strong>
      <em data-lang="tr">TR alt metin</em><em data-lang="en" hidden>EN</em><em data-lang="de" hidden>DE</em>
    </span>
  </span>
</a>
```

**b) Manzara rengi** — `style.css` içine yeni bir satır ekle (mevcut `.view-kubrick` vb. yanına):

```css
.view-SLUG { background: radial-gradient(circle at 50% 50%, #AÇIK, #ORTA 46%, #KOYU 100%); }
```

**c) Detay sayfası** — `directors/SLUG.html` oluştur (bölüm 4'teki şablon).

**d) Gezinme** — yeni yönetmeni komşularının `.page-nav` önceki/sonraki bağlantılarına ekle (döngüsel).

---

## 3. Yeni film eklemek

**a) Ana sayfada kart** — `index.html` içindeki `<div class="film-grid">` altına:

```html
<a class="film-card" href="films/SLUG.html">
  <span class="film-index">05</span>
  <div class="film-title-block">
    <p>YIL · Yönetmen</p>
    <h3>Film Adı</h3>
  </div>
  <span class="film-arrow">↗</span>
</a>
```

**b) Detay sayfası** — `films/SLUG.html` oluştur (bölüm 4 şablonu, kicker "Film").

---

## 4. Detay sayfası şablonu (yönetmen / film / koleksiyon)

`directors/`, `films/` veya `collections/` içine kaydet. Yollar `../` ile bir üst klasöre gider.

```html
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BAŞLIK — Sinefil</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../style.css">
  <style>
    .detail-hero { min-height: 72vh; display:grid; align-items:end; padding:120px max(20px,8vw) 70px; background:linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.9)),url('../assets/images/cinema-red-01.png') center/cover; }
    .detail-hero h1 { margin:0; max-width:900px; font:700 clamp(3.6rem,9vw,9rem)/.82 'Cormorant Garamond',serif; }
    .detail-meta { margin-top:20px; text-transform:uppercase; letter-spacing:.16em; font-size:.75rem; }
    .detail-body { width:min(900px,calc(100% - 40px)); margin:auto; padding:80px 0 120px; }
    .detail-body h2 { font:600 2.4rem 'Cormorant Garamond',serif; }
    .back { display:inline-block; margin-bottom:35px; border-bottom:1px solid currentColor; }
    .lede{font-size:1.15rem;line-height:1.75;color:#e9e4d8;} .detail-body ul,.detail-body ol{line-height:1.8;} .notlar{opacity:.75;font-style:italic;border-left:2px solid #d0a047;padding-left:14px;}
  </style>
</head>
<body>
  <div class="lang-switch lang-switch--float" role="group" aria-label="Language">
    <button type="button" data-set-lang="tr">TR</button>
    <button type="button" data-set-lang="en">EN</button>
    <button type="button" data-set-lang="de">DE</button>
  </div>

  <section class="detail-hero">
    <div>
      <a class="back" href="../index.html" data-lang="tr">← Sinefil ana sayfa</a><a class="back" href="../index.html" data-lang="en" hidden>← Sinefil home</a><a class="back" href="../index.html" data-lang="de" hidden>← Zur Sinefil-Startseite</a>
      <p class="section-kicker" data-lang="tr">Yönetmen</p><p class="section-kicker" data-lang="en" hidden>Director</p><p class="section-kicker" data-lang="de" hidden>Regisseur</p>
      <h1>Ad Soyad</h1>
      <p class="detail-meta">DOĞUM–ÖLÜM</p>
    </div>
  </section>

  <main class="detail-body">
    <p class="lede" data-lang="tr">TR giriş…</p><p class="lede" data-lang="en" hidden>EN…</p><p class="lede" data-lang="de" hidden>DE…</p>
    <!-- h2 başlıkları ve listeleri de aynı üç dilli desenle ekle -->
  </main>

  <nav class="page-nav">
    <a class="pn-prev" href="ONCEKI.html"><span data-lang="tr">← Önceki</span><span data-lang="en" hidden>← Previous</span><span data-lang="de" hidden>← Zurück</span><strong>Önceki Ad</strong></a>
    <a class="pn-home" href="../index.html" data-lang="tr">Sinefil ana sayfa</a><a class="pn-home" href="../index.html" data-lang="en" hidden>Sinefil home</a><a class="pn-home" href="../index.html" data-lang="de" hidden>Sinefil-Startseite</a>
    <a class="pn-next" href="SONRAKI.html"><span data-lang="tr">Sonraki →</span><span data-lang="en" hidden>Next →</span><span data-lang="de" hidden>Weiter →</span><strong>Sonraki Ad</strong></a>
  </nav>

  <script src="../lang.js"></script>
</body>
</html>
```

Ortak başlık çevirileri: Neden önemli? = Why it matters / Warum es wichtig ist · İzlerken dikkat = What to watch for / Worauf man achten sollte · Sinema dili = Cinematic language / Filmsprache · Seçme filmografi = Selected filmography / Ausgewählte Filmografie · Nereden başlamalı? = Where to start? / Wo soll man anfangen? · Filin defteri = The elephant's notebook / Das Notizbuch des Elefanten.

---

## 5. Yeni yönetmen simgesi

`.win-emblem` içine 24×24 viewBox'lı, tek renk (#241403) bir SVG koy. Örnek (yalnız ağaç):

```html
<svg viewBox="0 0 24 24"><path d="M12 21v-6.5" stroke="#241403" stroke-width="1.7" stroke-linecap="round" fill="none"/><path d="M12 15c-3.2 0-5.3-2-5.3-4.8C6.7 6.8 9.2 4 12 4s5.3 2.8 5.3 6.2C17.3 13 15.2 15 12 15Z" fill="#241403"/><path d="M5.5 21h13" stroke="#241403" stroke-width="1.4" stroke-linecap="round" fill="none"/></svg>
```

---

## 6. Yeni bölüm (section) eklemek

`index.html` içinde mevcut `<section>` bloklarını örnek al. Genel iskelet:

```html
<section id="ID" class="section-shell">
  <div class="section-heading">
    <div>
      <p class="section-kicker" data-lang="tr">Üst başlık</p><p class="section-kicker" data-lang="en" hidden>…</p><p class="section-kicker" data-lang="de" hidden>…</p>
      <h2 data-lang="tr">Başlık</h2><h2 data-lang="en" hidden>…</h2><h2 data-lang="de" hidden>…</h2>
    </div>
  </div>
  <!-- içerik -->
</section>
```

Menüye bağlamak için `index.html` üstündeki `.main-nav` içine üç dilli bir `<a href="#ID">` ekle.
