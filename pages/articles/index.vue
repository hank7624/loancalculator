<template>
  <div class="articles-container">
    <div class="header">
      <h2>📰 專欄文章</h2>
      <p class="subtitle">最新金融政策解析與貸款知識分享</p>
    </div>

    <!-- 文章分類切換欄 -->
    <div class="article-tabs">
      <button 
        v-for="cat in categories" :key="cat.value"
        class="article-tab" :class="{ active: currentCategory === cat.value }"
        @click="currentCategory = cat.value"
      >
        {{ cat.label }}
      </button>
    </div>

    <!-- 文章列表 -->
    <div class="articles-list">
      <NuxtLink 
        v-for="article in filteredArticles" 
        :key="article.id" 
        :to="getArticleUrl(article)"
        class="article-item card card-hoverable"
      >
        <div class="article-header">
          <h3>{{ article.title }}</h3>
          <div class="article-meta">
            <span class="date">📅 {{ article.date }}</span>
            <span class="category-tag">{{ article.category }}</span>
          </div>
        </div>
        <div class="article-preview">
          <p>{{ article.preview }}</p>
        </div>
        <div class="read-more">
          <span class="read-more-text">閱讀全文 →</span>
        </div>
      </NuxtLink>
    </div>

    <div class="back-link">
      <NuxtLink to="/" class="btn-pill btn-outline">返回首頁</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import rawArticlesData from '~/assets/articles-home-data.js'

// 使用 Head 設定此頁面的 SEO Meta
useHead({
  title: '貸款專欄文章 - 聰明理財知識庫',
  meta: [
    { name: 'description', content: '提供最專業的房貸、信貸、車貸與信用管理知識專欄，幫助您做出最佳金融決策。' }
  ]
})

const articlesData = ref(rawArticlesData)
const currentCategory = ref('all')

const categories = [
  { label: '全部文章', value: 'all' },
  { label: '央行政策', value: '央行政策' },
  { label: '貸款知識', value: '貸款知識' },
  { label: '信貸指南', value: '信貸指南' },
  { label: '房貸資訊', value: '房貸資訊' },
  { label: '信用管理', value: '信用管理' },
  { label: '理財規劃', value: '理財規劃' },
  { label: '汽車貸款', value: '汽車貸款' }
]

const filteredArticles = computed(() => {
  if (currentCategory.value === 'all') return articlesData.value
  return articlesData.value.filter(a => a.category === currentCategory.value)
})

// 生成符合 Nitro /articles/id-slug 的靜態預渲染路由網址
const getArticleUrl = (article) => {
  const slug = article.title.replace(/\s+/g, '-').replace(/[^\w\-\u4e00-\u9fa5]/g, '')
  return `/articles/${article.id}-${slug}`
}
</script>

<style scoped>
.articles-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 16px;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h2 {
  font-size: 2.25rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 12px;
}

.subtitle {
  color: var(--text-muted);
  font-size: 1.1rem;
}

/* 分類導覽 Tabs */
.article-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-bottom: 32px;
}

.article-tab {
  border: 1px solid var(--border-color);
  outline: none;
  background-color: var(--surface-color);
  color: var(--text-muted);
  font-size: 0.95rem;
  font-weight: 600;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: var(--radius-pill);
  transition: all 0.2s ease;
}

.article-tab:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.article-tab.active {
  background-color: var(--primary);
  color: white;
  border-color: var(--primary);
  box-shadow: var(--shadow-sm);
}

/* 文章列表 */
.articles-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.article-item {
  text-decoration: none;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.article-header h3 {
  color: var(--text-main);
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 12px;
  line-height: 1.4;
  /* 限制兩行 */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  font-size: 0.85rem;
}

.date {
  color: var(--text-muted);
}

.category-tag {
  background-color: var(--primary-light);
  color: var(--primary-dark);
  padding: 4px 10px;
  border-radius: var(--radius-pill);
  font-weight: 600;
}

.article-preview {
  flex-grow: 1;
  margin-bottom: 20px;
}

.article-preview p {
  color: var(--text-muted);
  line-height: 1.6;
  font-size: 0.95rem;
  /* 限制三行 */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.read-more {
  text-align: right;
  border-top: 1px solid var(--border-color);
  padding-top: 12px;
}

.read-more-text {
  color: var(--primary);
  font-weight: 600;
  font-size: 0.9rem;
}

.back-link {
  text-align: center;
  margin-top: 48px;
}

/* 響應式調整 */
@media (max-width: 600px) {
  .articles-list {
    grid-template-columns: 1fr;
  }
  .header h2 {
    font-size: 1.8rem;
  }
}
</style>
