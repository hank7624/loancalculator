<template>
  <div class="home-page container">
    
    <!-- 首頁英雄特區 (Hero Section) -->
    <section class="hero-section">
      <h1 class="hero-title">
        免費又專業的<br>
        <span class="text-primary">零門檻</span><br>
        貸款計算平台
      </h1>
      <p class="hero-subtitle">
        信貸車貸試算・房貸本息評估・銀行利率比較
      </p>

      <div class="hero-actions">
        <NuxtLink to="/credit" class="btn-pill btn-primary btn-large">
          💰 我要算信貸
        </NuxtLink>
        <NuxtLink to="/mortgage" class="btn-pill btn-outline btn-large">
          🏠 我要算房貸
        </NuxtLink>
      </div>

      <div class="hero-scroll-hint">
        <a href="#features" class="btn-pill btn-outline btn-scroll">
          <span>🏠 往下看更多貸款輔助工具</span>
          <span class="icon-down">↓</span>
        </a>
      </div>
    </section>

    <!-- 平台功能特色 (Features Grid) -->
    <section id="features" class="features-section">
      <h2 class="section-title">平台功能</h2>
      
      <div class="features-grid">
        <!-- 卡片 1 -->
        <NuxtLink to="/credit" class="feature-card card card-hoverable">
          <div class="card-header">
            <div class="icon-square">💰</div>
            <span class="tag">HOT</span>
          </div>
          <h3 class="card-title">信貸/車貸試算</h3>
          <p class="card-desc">輸入金額與利率，一鍵產出每期應繳金額與完整攤還表，快速掌握還款壓力。</p>
        </NuxtLink>

        <!-- 卡片 2 -->
        <NuxtLink to="/mortgage" class="feature-card card card-hoverable">
          <div class="card-header">
            <div class="icon-square">🏠</div>
            <span class="tag">HOT</span>
          </div>
          <h3 class="card-title">房貸深度評估</h3>
          <p class="card-desc">支援本息平均攤還、本金平均攤還與寬限期設定，助您規劃長達 30 年的買房大計。</p>
        </NuxtLink>

        <!-- 卡片 3 -->
        <NuxtLink to="/rates" class="feature-card card card-hoverable">
          <div class="card-header">
            <div class="icon-square">🏦</div>
          </div>
          <h3 class="card-title">銀行利率對比</h3>
          <p class="card-desc">即時更新各大銀行最新信貸與房貸專案利率，幫您找到利息最低的貸款方案。</p>
        </NuxtLink>

        <!-- 卡片 4 -->
        <NuxtLink to="/glossary" class="feature-card card card-hoverable">
          <div class="card-header">
            <div class="icon-square">📖</div>
            <span class="tag">NEW</span>
          </div>
          <h3 class="card-title">貸款名詞百科</h3>
          <p class="card-desc">超過 50 個專業金融名詞解析，從「本息攤還」到「違約金」，搞懂所有貸款陷阱。</p>
        </NuxtLink>
      </div>
    </section>

    <!-- 精選專欄文章 (Featured Articles) -->
    <section class="articles-section">
      <h2 class="section-title">精選專欄文章</h2>
      
      <div class="articles-grid">
        <NuxtLink 
          v-for="article in featuredArticles" 
          :key="article.id" 
          :to="getArticleUrl(article)"
          class="article-card card card-hoverable"
        >
          <div class="card-meta">
            <span class="category-tag">{{ article.category }}</span>
            <span class="date">📅 {{ article.date }}</span>
          </div>
          <h3 class="card-title">{{ article.title }}</h3>
          <p class="card-desc">{{ article.preview }}</p>
          <span class="read-more-link">閱讀全文 →</span>
        </NuxtLink>
      </div>

      <div class="section-actions">
        <NuxtLink to="/articles" class="btn-pill btn-outline">
          👉 瀏覽更多專欄文章
        </NuxtLink>
      </div>
    </section>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import rawArticlesData from '~/assets/articles-home-data.js'

// 首頁 SEO 設定
useHead({
  title: '免費貸款計算機 - 現代化專業信貸房貸試算平台',
  meta: [
    { name: 'description', content: '提供最精準的房屋貸款、個人信用貸款、汽車貸款利率試算，支援多段利率與寬限期設定，搭配完整還款明細與金融知識專欄。' }
  ]
})

// 精選前 3 篇專欄文章展示在首頁
const featuredArticles = computed(() => {
  return rawArticlesData.slice(0, 3)
})

// 生成符合 Nitro /articles/id-slug 的靜態預渲染路由網址
const getArticleUrl = (article) => {
  const slug = article.title.replace(/\s+/g, '-').replace(/[^\w\-\u4e00-\u9fa5]/g, '')
  return `/articles/${article.id}-${slug}`
}
</script>

<style scoped>
.hero-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 0 40px;
}

.text-primary {
  color: var(--primary);
}

.hero-actions {
  display: flex;
  gap: 16px;
  margin-bottom: 40px;
  width: 100%;
  max-width: 500px;
  justify-content: center;
}

.btn-large {
  flex: 1;
  padding: 16px 24px;
  font-size: 1.1rem;
}

.hero-scroll-hint {
  margin-top: 20px;
}

.btn-scroll {
  padding: 8px 24px;
  font-size: 0.9rem;
  color: var(--primary-dark);
  border-color: var(--primary-light);
  background-color: white;
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
}

.icon-down {
  font-weight: bold;
}

/* 平台功能區塊 */
.features-section {
  padding: 40px 0 60px;
}

.section-title {
  text-align: center;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-muted);
  margin-bottom: 24px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.feature-card {
  text-decoration: none;
  display: block;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.icon-square {
  width: 48px;
  height: 48px;
  background-color: var(--primary);
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.card-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 8px;
}

.card-desc {
  font-size: 0.95rem;
  color: var(--text-muted);
  line-height: 1.5;
}

/* 精選專欄文章區塊 */
.articles-section {
  padding: 60px 0 80px;
  border-top: 1px solid var(--border-color);
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.article-card {
  text-decoration: none;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 0.85rem;
}

.category-tag {
  background-color: var(--primary-light);
  color: var(--primary-dark);
  padding: 4px 10px;
  border-radius: var(--radius-pill);
  font-weight: 600;
}

.card-meta .date {
  color: var(--text-muted);
}

.article-card .card-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 8px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-card .card-desc {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.5;
  margin-bottom: 16px;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.read-more-link {
  color: var(--primary);
  font-size: 0.85rem;
  font-weight: 600;
}

.section-actions {
  text-align: center;
}

/* 響應式調整 */
@media (max-width: 600px) {
  .hero-actions {
    flex-direction: column;
  }
}
</style>
