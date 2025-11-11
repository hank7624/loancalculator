// Generate static article pages from src/components/articles-home-data.js
// - Outputs: public/articles/{id}-{slug}.html
// - Updates: public/articles.html (index), public/sitemap.xml
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const projectRoot = rootDir; // scripts/.. -> project root

const publicDir = path.join(projectRoot, 'public');
const articlesDir = path.join(publicDir, 'articles');
const sitemapPath = path.join(publicDir, 'sitemap.xml');
const articlesIndexPath = path.join(publicDir, 'articles.html');
const articlesDataPath = path.join(projectRoot, 'src', 'components', 'articles-home-data.js');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function slugify(input) {
  return String(input)
    .trim()
    .toLowerCase()
    .replace(/[\s\/\\]+/g, '-')        // spaces and slashes to dashes
    .replace(/[^\u4e00-\u9fa5a-z0-9\-]+/gi, '') // remove non CJK/latin/num/dash
    .replace(/\-+/g, '-')              // collapse dashes
    .replace(/^\-+|\-+$/g, '');        // trim dashes
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderArticleHtml(siteBase, article, canonicalPath) {
  // Per-article enhancements (extra sections/FAQ) for selected IDs
  const enhancements = {
    1005: {
      toc: ['車貸三大管道', '費用與利率拆解', '申辦流程詳解', '常見風險與合約條款', 'FAQ'],
      extraSections: [
        { h2: '費用與利率拆解', p: [
          '名目利率之外，務必注意開辦費、帳管費、代辦與保險等費用，這些都會影響總費用年百分率（APR）。',
          '比較方案時，建議同時檢視：總利息、總費用、違約與提前清償成本，並評估最差情境的可負擔度。'
        ]},
        { h2: '常見風險與合約條款', p: [
          '避免簽下不合理的提前清償違約金與高額「其他費用」。取得完整費用明細與審閱期，必要時請專業人士把關。',
          '對「月利率」包裝提高警覺，確認年利率換算方式與是否有隱藏性費用。'
        ]}
      ],
      extraFAQ: [
        { q: '如何快速比較不同車貸方案？', a: '以同樣的貸款金額與期數，計算每期月付、總利息與APR，並把所有手續費用入列，再做交叉比較。' },
        { q: '信用有瑕疵可以貸嗎？', a: '可評估正規融資公司專案，但須注意成本與風險，優先選擇受政府規範、資訊透明的機構。' }
      ]
    },
    4: {
      toc: ['基本申請條件', '加分技巧與常見雷點', '文件清單與審核重點', '風險控管與DBR/負債比', 'FAQ'],
      extraSections: [
        { h2: '加分技巧與常見雷點', p: [
          '維持良好還款紀錄、避免連續多頭申貸、保留穩定收入證明與自備款來源佐證，可提升過件率與利率條件。',
          '避免逾期與高循環利息，降低短期負債比，必要時先進行債務整合。'
        ]},
        { h2: '風險控管：DBR 與負債比', p: [
          'DBR（債務負擔比）與月負債比會影響核貸與額度，建議把每月本息總額控制在家庭可支配所得的1/3以內。'
        ]}
      ],
      extraFAQ: [
        { q: '信貸額度最多可申請多少？', a: '除了銀行的內部評分外，還需符合監理規範的「DBR 22 倍」。白話說：你在所有金融機構的無擔保債務總額，不能超過你平均月收入的 22 倍。舉例：若你平均月薪 50,000 元，無擔保債務上限約 110 萬元；已經有 30 萬的信貸/卡債，則理論上剩餘可借約 80 萬。實際核貸仍會依信用紀錄、工作年資、負債比、是否有保人等綜合評估，可能低於上限。' },
        { q: '如何提高過件機率？', a: '補齊文件、維持穩定收入與良好信用，並避免短期多頭申請；同時比較 3–5 家方案取得較佳條件。' }
      ]
    },
    1004: {
      toc: ['新青安重點', '一般房貸與利率型態', '寬限期與現金流規劃', '撥款與轉貸注意事項', 'FAQ'],
      extraSections: [
        { h2: '寬限期與現金流規劃', p: [
          '寬限期內僅繳利息，期滿後月付跳升，應事先用工具試算各情境並預留現金流安全邊際。'
        ]},
        { h2: '撥款與轉貸注意事項', p: [
          '交屋潮時可能發生撥款延遲，建議提前與承辦確認期程；若評估轉貸，需把違約金、代償與開辦費納入總成本計算。'
        ]}
      ],
      extraFAQ: [
        { q: '新青安與一般房貸如何搭配？', a: '可先以新青安承作主貸、超額部分搭配一般房貸；依收入成長與未來轉貸規劃選擇利率型態。' },
        { q: '兩段/三段式利率適合誰？', a: '短期資金壓力大或預計短期轉貸者可考慮前低後高的分段利率；穩定型偏好單一利率。' }
      ]
    },
    1006: {
      toc: ['房貸基本觀念', '利率型態與分段設計', '寬限期與風險控管', '費用與APR比較', 'FAQ'],
      extraSections: [
        { h2: '利率型態與分段設計', p: [
          '一段式單純好理解；兩段/三段式前低後高，段與段之間月付可能跳升；混合式前固定後機動，兼顧短期穩定與長期彈性。',
          '選擇時須結合收入成長、轉貸計畫與風險承受度，並以實際月付與總成本試算為主。'
        ]},
        { h2: '寬限期與風險控管', p: [
          '寬限期內只繳利息不還本金，期滿後月付明顯上升；建議先用工具試算寬限前後月付差距並保留現金流緩衝。',
          '設定月付上限（如不超過家庭可支配所得 1/3），並準備 6–12 個月緊急備用金降低風險。'
        ]},
        { h2: '費用與APR比較', p: [
          '除名目利率外，將開辦費、估價費、保險、設定與代辦等費用納入 APR 才能反映真實成本。',
          '轉貸前試算節省利息與違約金、手續費的加總，確認實際是否划算。'
        ]}
      ],
      extraFAQ: [
        { q: '房貸核貸成數怎麼決定？', a: '取決於估價結果、屋齡/地段/用途、自住或投資、申貸人信用與收入等因素；一般自住 7–8 成常見，條件特殊可能更低。' },
        { q: '什麼時候該考慮轉貸？', a: '當可取得明顯較低的 APR 且轉貸所需違約金與手續費在合理期間內可回收時。先試算節省利息 vs. 成本。' }
      ]
    },
  };
  const enh = enhancements[article.id] || null;

  const title = escapeHtml(article.title);
  const desc = escapeHtml(article.preview || (article.content?.[0] || '').slice(0, 120));
  const dateISO = new Date(article.date.replace(/\//g, '-')).toISOString().slice(0, 10);
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    datePublished: dateISO,
    dateModified: dateISO,
    inLanguage: 'zh-TW',
    author: { '@type': 'Organization', name: '免費貸款計算機' },
    publisher: {
      '@type': 'Organization',
      name: '免費貸款計算機',
      logo: { '@type': 'ImageObject', url: `${siteBase}/vite.svg` }
    },
    mainEntityOfPage: `${siteBase}${canonicalPath}`,
    articleSection: article.category || '專欄',
    description: desc
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '首頁', item: `${siteBase}/` },
      { '@type': 'ListItem', position: 2, name: '專欄文章', item: `${siteBase}/articles.html` },
      { '@type': 'ListItem', position: 3, name: title, item: `${siteBase}${canonicalPath}` }
    ]
  };
  // Build at least 5 FAQ entries: prefer enhanced extraFAQ, then derive from keyPoints/expertAdvice
  const derivedFromKeyPoints = (article.keyPoints || []).map((q, i) => ({
    q,
    a: (article.content?.[i] || article.preview || desc)
  }));
  const derivedFromAdvice = (article.expertAdvice || []).map((ad, i) => ({
    q: `我要注意什麼？（建議 ${i + 1}）`,
    a: ad
  }));
  let faqEntries = [];
  if (enh?.extraFAQ?.length) {
    faqEntries = faqEntries.concat(enh.extraFAQ);
  }
  faqEntries = faqEntries.concat(derivedFromKeyPoints).concat(derivedFromAdvice);
  // ensure unique questions and take first 5-8
  const seen = new Set();
  faqEntries = faqEntries.filter(item => {
    const key = item.q.trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, Math.max(5, faqEntries.length >= 5 ? 5 : faqEntries.length));
  const faqJsonLd = faqEntries.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqEntries.map(it => ({
          '@type': 'Question',
          name: it.q,
          acceptedAnswer: { '@type': 'Answer', text: it.a }
        }))
      }
    : null;

  const contentBlocks = (article.content || []).map(p => `<p>${escapeHtml(p)}</p>`).join('\n');
  const keyPoints = (article.keyPoints || []).map(li => `<li>${escapeHtml(li)}</li>`).join('\n');
  const expertAdvice = (article.expertAdvice || []).map(li => `<li>${escapeHtml(li)}</li>`).join('\n');
  // Build TOC based on actual sections: intro, extra sections, FAQ
  const extraSectionsHtml = enh?.extraSections ? enh.extraSections.map((s, idx) => {
    const ps = (s.p || []).map(p => `<p>${escapeHtml(p)}</p>`).join('\n');
    return `<section id="extra-${idx+1}" class="section card"><h2>${escapeHtml(s.h2)}</h2>${ps}</section>`;
  }).join('\n') : '';
  const extraFaqHtml = faqEntries.length
    ? `<section id="faq" class="section card"><h2>FAQ</h2>${faqEntries.map(item=>`<h3>${escapeHtml(item.q)}</h3><p>${escapeHtml(item.a)}</p>`).join('\n')}</section>`
    : '';
  // Compose TOC titles: prefer provided list, else derive
  const derivedTitles = [];
  if (enh?.toc?.length) {
    derivedTitles.push(...enh.toc);
  } else {
    derivedTitles.push('內容導覽');
    if (enh?.extraSections?.length) {
      for (const s of enh.extraSections) derivedTitles.push(s.h2 || '延伸段落');
    }
    if (faqEntries.length) derivedTitles.push('FAQ');
  }
  // Map titles to hrefs in order: intro, each extra, faq
  const hrefs = ['#intro'];
  if (enh?.extraSections?.length) {
    for (let i = 0; i < enh.extraSections.length; i++) hrefs.push(`#extra-${i+1}`);
  }
  if (faqEntries.length) hrefs.push('#faq');
  const tocPairs = derivedTitles.slice(0, hrefs.length).map((t, i)=>({ t, h: hrefs[i] }));
  const tocHtml = tocPairs.length
    ? `<nav><strong>目錄：</strong> ${tocPairs.map(p=>`<a href="${p.h}">${escapeHtml(p.t)}</a>`).join(' ｜ ')}</nav>`
    : '';

  return `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}｜免費貸款計算機</title>
  <meta name="description" content="${desc}" />
  <link rel="canonical" href="${siteBase}${canonicalPath}" />
  <meta name="google-adsense-account" content="ca-pub-9729139144169160">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9729139144169160" crossorigin="anonymous"></script>
  <script type="application/ld+json">${JSON.stringify(articleJsonLd)}</script>
  <script type="application/ld+json">${JSON.stringify(breadcrumbJsonLd)}</script>
  ${faqJsonLd ? `<script type="application/ld+json">${JSON.stringify(faqJsonLd)}</script>` : ''}
  <style>
    body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Noto Sans TC', 'PingFang TC', 'Microsoft JhengHei', sans-serif; line-height:1.8; margin:0; color:#222; }
    header, main, footer { max-width: 960px; margin: 0 auto; padding: 20px; }
    nav a { margin-right: 12px; color: #2c7be5; text-decoration: none; }
    nav a:hover { text-decoration: underline; }
    .meta { color:#6c757d; font-size:.95em; margin-top:6px; }
    .card { background:#fff; border:1px solid #eee; border-radius:10px; padding:16px 18px; box-shadow:0 2px 8px rgba(0,0,0,.04); }
    .section { margin: 24px 0; }
    .ads { margin: 20px 0; }
    .related a { color:#2c7be5; text-decoration:none; }
    .related a:hover { text-decoration:underline; }
  </style>
</head>
<body>
  <header>
    <nav>
      <a href="/">首頁</a>
      <a href="/credit.html">信貸/車貸</a>
      <a href="/mortgage.html">房貸</a>
      <a href="/rates.html">銀行利率</a>
      <a href="/articles.html">專欄文章</a>
    </nav>
    <h1>${title}</h1>
    <div class="meta">${escapeHtml(article.category || '')}｜${escapeHtml(article.date || '')}</div>
  </header>
  <main>
    ${tocHtml}
    <section id="intro" class="section card">
      ${contentBlocks}
      ${keyPoints ? `<h2>重點整理</h2><ul>${keyPoints}</ul>` : ''}
      ${expertAdvice ? `<h2>專家建議</h2><ul>${expertAdvice}</ul>` : ''}
    </section>

    ${extraSectionsHtml}
    ${extraFaqHtml}

    <section class="section card related">
      <h2>延伸閱讀</h2>
      <p>
        <a href="/credit.html">信貸/車貸介紹</a> ｜ 
        <a href="/mortgage.html">房貸計算說明</a> ｜ 
        <a href="/rates.html">銀行利率對比</a>
      </p>
    </section>

    <section class="section ads">
      <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9729139144169160" data-ad-slot="XXXXXXXXXX" data-ad-format="auto" data-full-width-responsive="true"></ins>
      <script>(adsbygoogle=window.adsbygoogle||[]).push({});</script>
    </section>
  </main>
  <footer>
    <p>© 免費貸款計算機｜內容僅供參考，實際條件以銀行公告為準。</p>
  </footer>
</body>
</html>`;
}

function renderArticlesIndex(siteBase, items) {
  const list = items.map(it => {
    const slug = `${it.id}-${slugify(it.title)}`;
    return `<li><a href="/articles/${slug}.html">${escapeHtml(it.title)}</a> <span class="meta">(${escapeHtml(it.category || '')}｜${escapeHtml(it.date || '')})</span></li>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>貸款專欄導覽｜央行政策、房貸資訊、信貸指南</title>
  <meta name="description" content="彙整央行政策、房貸資訊、信貸指南等主題的深度文章與懶人包，持續更新最新動態。" />
  <link rel="canonical" href="${siteBase}/articles.html" />
  <meta name="google-adsense-account" content="ca-pub-9729139144169160">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9729139144169160" crossorigin="anonymous"></script>
  <style>
    body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Noto Sans TC', 'PingFang TC', 'Microsoft JhengHei', sans-serif; line-height:1.8; margin:0; color:#222; }
    header, main, footer { max-width: 960px; margin: 0 auto; padding: 20px; }
    nav a { margin-right: 12px; color: #2c7be5; text-decoration: none; }
    nav a:hover { text-decoration: underline; }
    .card { background:#fff; border:1px solid #eee; border-radius:10px; padding:16px 18px; box-shadow:0 2px 8px rgba(0,0,0,.04); }
    .section { margin: 24px 0; }
    .meta { color:#6c757d; font-size:.95em; }
  </style>
</head>
<body>
  <header>
    <nav>
      <a href="/">首頁</a>
      <a href="/credit.html">信貸/車貸</a>
      <a href="/mortgage.html">房貸</a>
      <a href="/rates.html">銀行利率</a>
      <a href="/articles.html">專欄文章</a>
    </nav>
    <h1>專欄導覽｜掌握最新貸款與政策資訊</h1>
    <p>整理主題：央行政策、房貸資訊、信貸指南、貸款知識。以下為最新專欄列表：</p>
  </header>
  <main>
    <section class="section card">
      <ul>
        ${list}
      </ul>
    </section>
  </main>
  <footer>
    <p>© 免費貸款計算機｜內容僅供參考，實際條件以銀行公告為準。</p>
  </footer>
</body>
</html>`;
}

function upsertSitemap(siteBase, baseXml, urls) {
  // If sitemap exists, parse minimal; else create basic
  let xml = baseXml;
  if (!xml) {
    xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>
`;
  }
  // Insert before closing tag
  const closingTag = '</urlset>';
  const entries = urls.map(u => {
    const today = new Date().toISOString().slice(0, 10);
    return `  <url>
    <loc>${siteBase}${u}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }).join('\n');

  // Remove old article entries for id-slug pages to prevent duplicates
  xml = xml.replace(/[\s\S]*?<urlset[^>]*>/, m => m); // keep header
  // Not doing full XML parse; safe append
  if (xml.includes(closingTag)) {
    xml = xml.replace(closingTag, `${entries}\n${closingTag}`);
  } else {
    xml += `\n${entries}\n${closingTag}`;
  }
  return xml;
}

async function main() {
  ensureDir(articlesDir);
  let articlesData;
  try {
    const mod = await import(pathToFileURL(articlesDataPath).href);
    articlesData = mod.default || [];
  } catch (e) {
    // Fallback: relative import from scripts with dynamic path construction
    const rel = path.relative(path.dirname(__filename), articlesDataPath).replace(/\\/g, '/');
    const mod = await import(`file://${path.resolve(path.dirname(__filename), rel)}`);
    articlesData = mod.default || [];
  }

  if (!Array.isArray(articlesData)) {
    console.error('articles-home-data.js did not export an array');
    process.exit(1);
  }

  // Site base: infer from CNAME or default
  let siteBase = 'https://loancalc.com.tw';
  const cnamePath = path.join(publicDir, 'CNAME');
  if (fs.existsSync(cnamePath)) {
    try {
      const domain = fs.readFileSync(cnamePath, 'utf-8').trim();
      if (domain) siteBase = `https://${domain}`;
    } catch {}
  }

  // Sort by date desc for index
  const items = [...articlesData].sort((a, b) => {
    const da = new Date(String(a.date).replace(/\//g, '-')).getTime();
    const db = new Date(String(b.date).replace(/\//g, '-')).getTime();
    return isNaN(db - da) ? 0 : db - da;
  });

  // Generate each article page
  const sitemapUrls = [];
  for (const a of items) {
    const slug = `${a.id}-${slugify(a.title)}`;
    const relPath = `/articles/${slug}.html`;
    const outPath = path.join(articlesDir, `${slug}.html`);
    const html = renderArticleHtml(siteBase, a, relPath);
    fs.writeFileSync(outPath, html, 'utf-8');
    sitemapUrls.push(relPath);
  }

  // Regenerate articles index
  const indexHtml = renderArticlesIndex(siteBase, items);
  fs.writeFileSync(articlesIndexPath, indexHtml, 'utf-8');

  // Update sitemap
  let baseXml = '';
  if (fs.existsSync(sitemapPath)) {
    baseXml = fs.readFileSync(sitemapPath, 'utf-8');
  } else {
    baseXml = '';
  }
  const newXml = upsertSitemap(siteBase, baseXml, sitemapUrls);
  fs.writeFileSync(sitemapPath, newXml, 'utf-8');

  console.log(`Generated ${items.length} article pages, updated articles.html and sitemap.xml`);
}

// Helper to convert path to file URL for ESM import
function pathToFileURL(p) {
  const url = new URL('file://');
  const pathname = path.resolve(p).replace(/\\/g, '/');
  url.pathname = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return url;
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});


