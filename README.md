# Stem Regen Medical — Website & SEO Documentation

## 🏥 Project Overview
**Live Site:** https://www.atlantamedicalclinic.com/  
**Clinic:** Stem Regen Medical — Board-certified varicose vein & spider vein specialists  
**Address:** 7 West 45th Street, Floor 9, New York, NY 10036  
**Phone:** 877-744-0446  
**Email:** info@atlantamedicalclinic.com  
**Hours:** Mon–Fri 8:00am–5:00pm

---

## ✅ Completed Features

### Core Pages
| Page | URL | Status |
|------|-----|--------|
| Homepage | `index.html` | ✅ Complete |
| Blog & Resources | `blog.html` | ✅ Complete |
| Patient Testimonials | `testimonials.html` | ✅ 17 real YouTube videos + 9 written reviews |
| Our Team | `team-page.html` | ✅ (source from AMC) |
| Varicose Vein Treatment | `services/varicose-vein-treatment.html` | ✅ SEO-optimized |
| Spider Vein Treatment | `services/spider-vein-treatment.html` | ✅ SEO-optimized |
| VENCLOSE™ RFA | `services/venclose-rfa.html` | ✅ SEO-optimized |
| Varithena® Microfoam | `services/varithena.html` | ✅ SEO-optimized |
| Sclerotherapy & ClariVein® | `services/sclerotherapy.html` | ✅ SEO-optimized |

### Technical SEO Files
| File | Purpose |
|------|---------|
| `sitemap.xml` | XML sitemap with image extensions — submit to Google Search Console |
| `robots.txt` | Crawler instructions with sitemap pointer |
| `css/style.css` | Main stylesheet (98KB) |
| `js/main.js` | Main JavaScript (15KB) |

### All Assets Downloaded Locally
All images previously served from external CDN (`igoejeff.github.io`) have been downloaded and stored locally:

**images/**
- `amc-logo.png` — Clinic logo
- `hero-bg.jpg` — Hero background
- `leg-pain.jpg` — Symptoms section
- `ba-photo-1.jpg` — Before/after #1 (Sonya T.)
- `ba-photo-2.jpg` — Before/after #2 (Raymond M.)
- `ba-photo-3.jpg` — Before/after #3 (Leonida V.)
- `treatment-room.jpg` — Doctor treating patient
- `compassionate-care.jpg` — Doctor/nurse with patient
- `video-poster.jpg` — Video thumbnail

**images/blog/**
- `blog-diabetes.jpg`, `blog-knee-pain.jpg`, `blog-circulation.jpg`
- `blog-neuropathy.jpg`, `blog-knee-risks.jpg`, `blog-spider-veins.jpg`
- `blog-knee-nonsurgical.jpg`, `blog-venclose-rfa.jpg`, `blog-diabetes-screenings.jpg`

**images/insurance/**
- `bcbs.png`, `aetna.png`, `cigna.svg`, `unitedhealthcare.png`
- `humana.png`, `medicare.png`, `medicaid.svg`, `tricare.png`

**images/team/** (14 team member photos)
- `parrin-barton.png`, `timothy-dembowski.png`, `nathan-browne.png`
- `jeremias-duarte.png`, `aly-hashim.png`, `milton-reed.png`
- `daniel-suarez.png`, `greg-lott.png`, `ovi-cioloca.png`
- `leith-fitch.png`, `shalada-troup.png`, `kasi-brown.png`
- `cristina-curry.png`, `kay-layne.png`

---

## 🔍 SEO Implementation — Gold Standard

### 1. Primary Meta Tags (All Pages)
- ✅ Unique, keyword-rich `<title>` tags (50–60 chars)
- ✅ Unique `<meta name="description">` (140–160 chars with primary keywords)
- ✅ `<meta name="keywords">` with geo-targeted terms
- ✅ `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">`
- ✅ `<meta name="author">` set to Stem Regen Medical
- ✅ Geo meta tags: `geo.region`, `geo.placename`, `geo.position`, `ICBM` (homepage)
- ✅ `<link rel="canonical">` on every page

### 2. Open Graph (Facebook / LinkedIn)
- ✅ `og:type`, `og:locale`, `og:site_name`
- ✅ Unique `og:title`, `og:description`, `og:url` per page
- ✅ `og:image` with width/height/alt attributes
- ✅ Real clinic photography used for social sharing previews

### 3. Twitter Card
- ✅ `twitter:card` = `summary_large_image`
- ✅ `twitter:site` = `@ATLMedicalClinic`
- ✅ Unique `twitter:title`, `twitter:description`, `twitter:image` per page

### 4. JSON-LD Structured Data (Schema.org)
- ✅ **MedicalClinic / MedicalBusiness / LocalBusiness** — full NAP, geo, hours, services
- ✅ **WebSite** — with SearchAction sitelinks searchbox
- ✅ **WebPage** — with breadcrumb, speakable spec
- ✅ **FAQPage** — 7 questions answering top search queries
- ✅ **AggregateRating** — 4.7 stars, 5000 reviews
- ✅ **Blog** schema with BlogPosting entries on blog.html
- ✅ **MedicalWebPage** with MedicalProcedure/MedicalCondition on all service pages

### 5. Semantic HTML Structure
- ✅ `<html lang="en" itemscope itemtype="https://schema.org/MedicalClinic">`
- ✅ `<header role="banner">`, `<main id="main-content" role="main">`, `<footer role="contentinfo">`
- ✅ `<nav role="navigation" aria-label="Primary Navigation">`
- ✅ All sections have `aria-labelledby` pointing to unique heading IDs
- ✅ All images have descriptive `alt` text
- ✅ Heading hierarchy: H1 → H2 → H3 (no skips)

---

## 📁 File Structure

```
index.html                          ← Homepage (SEO priority 1.0)
blog.html                           ← Blog hub (with 8 full articles via JS)
blog-source.html                    ← Blog source/reference file
team-page.html                      ← Team page (from AMC WordPress source)
sitemap.xml                         ← XML sitemap — SUBMIT TO GOOGLE
robots.txt                          ← Crawler rules
README.md                           ← This file

services/
  varicose-vein-treatment.html      ← Target: "varicose vein treatment Atlanta"
  spider-vein-treatment.html        ← Target: "spider vein removal Atlanta"
  venclose-rfa.html                 ← Target: "VENCLOSE RFA Atlanta"
  varithena.html                    ← Target: "Varithena Atlanta"
  sclerotherapy.html                ← Target: "sclerotherapy Atlanta"

css/
  style.css                         ← Main stylesheet (98KB — full site)

js/
  main.js                           ← Main JavaScript (15KB)

images/
  amc-logo.png                      ← Clinic logo
  hero-bg.jpg                       ← Hero background
  leg-pain.jpg                      ← Symptoms section
  ba-photo-1.jpg                    ← Before/after #1
  ba-photo-2.jpg                    ← Before/after #2
  ba-photo-3.jpg                    ← Before/after #3
  treatment-room.jpg                ← Doctor treating patient
  compassionate-care.jpg            ← Doctor/nurse with patient
  video-poster.jpg                  ← Video thumbnail
  blog/                             ← Blog article images (9 files)
  insurance/                        ← Insurance logo images (8 files)
  team/                             ← Team member photos (14 files)
```

---

## 🚀 Deployment

To deploy this website and make it live, please go to the **Publish tab** where you can publish your project with one click.

### Post-Deployment Actions (Do Today)
1. **Submit sitemap to Google Search Console** at https://search.google.com/search-console
   - Go to Sitemaps → Enter: `https://www.atlantamedicalclinic.com/sitemap.xml`
2. **Claim Google Business Profile** at https://business.google.com
3. **Add Google Analytics 4** tracking code to `<head>` of all pages

---

## 🎯 Target Keywords by Page

| Page | Primary Keyword | Secondary Keywords |
|------|----------------|-------------------|
| index.html | varicose vein treatment Atlanta | spider vein Atlanta, vein clinic Atlanta GA |
| varicose-vein-treatment.html | varicose vein treatment Atlanta | varicose vein doctor Atlanta, insurance covered vein treatment |
| spider-vein-treatment.html | spider vein removal Atlanta | sclerotherapy Atlanta, spider vein specialist near me |
| venclose-rfa.html | VENCLOSE RFA Atlanta | radiofrequency ablation Atlanta, RFA vein treatment |
| varithena.html | Varithena Atlanta | polidocanol microfoam Atlanta, foam vein treatment |
| sclerotherapy.html | sclerotherapy Atlanta | ClariVein Atlanta, vein injections Atlanta |
| blog.html | vein health blog Atlanta | varicose vein articles, leg pain education |

---

## 📊 SEO Checklist

- [x] Title tags optimized (50–60 chars)
- [x] Meta descriptions (140–160 chars)
- [x] Canonical URLs on all pages
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] JSON-LD structured data (MedicalClinic, FAQPage, BreadcrumbList, Blog)
- [x] Geo meta tags
- [x] XML sitemap
- [x] robots.txt
- [x] Semantic HTML5 with ARIA roles
- [x] Breadcrumb navigation
- [x] Internal linking (every page links to related pages)
- [x] Alt text on all images
- [x] Preconnect/DNS-prefetch for performance
- [x] Mobile-responsive design
- [x] Footer with NAP schema markup
- [x] All images stored locally (no external CDN dependencies)
- [ ] Google Search Console setup
- [ ] Google Business Profile optimization
- [ ] Google Analytics 4 installed
- [ ] Core Web Vitals baseline measured
- [ ] Backlink acquisition started

---

*Last updated: March 2, 2026*
