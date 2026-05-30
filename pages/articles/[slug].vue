<template>
  <div class="article-detail-page container" v-if="article">
    
    <!-- 文章麵包屑與分類標籤 -->
    <div class="article-header">
      <div class="meta-info">
        <span class="tag">{{ article.category }}</span>
        <span class="date">{{ article.date }}</span>
      </div>
      <h1 class="article-title">{{ article.title }}</h1>
    </div>

    <!-- 專家與審閱資訊 (E-E-A-T 信號) -->
    <div class="eeat-box">
      <div class="author-info">
        <span class="author-role">📝 撰文整理: {{ article.author || '編輯部' }}</span>
        <span class="reviewer">👩‍⚖️ 專業審閱: 房貸金融分析師</span>
      </div>
    </div>

    <!-- 內文渲染 -->
    <article class="article-content" v-html="formattedContent"></article>

    <div class="article-footer">
      <NuxtLink to="/articles" class="btn-pill btn-outline">← 返回專欄列表</NuxtLink>
    </div>

  </div>
  <div class="container" v-else>
    <p>文章載入中或找不到該文章...</p>
    <NuxtLink to="/articles" class="btn-pill btn-outline">← 返回專欄列表</NuxtLink>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'nuxt/app'
import articlesData from '~/assets/articles-home-data.js'

const route = useRoute()
const slugParam = route.params.slug

// 從網址參數中找出對應的文章 (格式為: id-slug)
const article = computed(() => {
  if (!slugParam) return null
  const parts = slugParam.split('-')
  const id = parseInt(parts[0], 10)
  return articlesData.find(a => a.id === id)
})

// 將純文字內容或陣列轉換為有段落的 HTML (與之前 SPA 上的格式器相似)
const formattedContent = computed(() => {
  if (!article.value?.content) return ''
  const lines = Array.isArray(article.value.content)
    ? article.value.content
    : article.value.content.split('\n')
  return lines.map(line => {
    line = line.trim();
    if (!line) return '';
    if (line.match(/^第[一二三四五六七八九十]+[章節部分]/) || line.match(/^[一二三四五六七八九十]+、/) || line.match(/^[0-9]+\./) || line.match(/^Q[0-9]*：/) || line.match(/^【.*?】/)) {
      return `<h3>${line}</h3>`;
    }
    return `<p>${line}</p>`;
  }).join('');
})

// SEO Meta 設定
if (article.value) {
  const metaDesc = article.value.preview || 
    (Array.isArray(article.value.content)
      ? article.value.content.join(' ').substring(0, 150)
      : article.value.content.substring(0, 150));
  useHead({
    title: `${article.value.title} | 免費貸款計算機`,
    meta: [
      { name: 'description', content: metaDesc }
    ]
  })
}
</script>

<style scoped>
.article-detail-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 16px;
  background-color: var(--surface-color);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  margin-top: 24px;
  margin-bottom: 40px;
}

.article-header {
  margin-bottom: 24px;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 20px;
}

.meta-info {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 16px;
}

.date {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.article-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--text-main);
  line-height: 1.3;
}

.eeat-box {
  background-color: var(--secondary);
  border-radius: var(--radius-sm);
  padding: 16px;
  margin-bottom: 32px;
  border-left: 4px solid var(--primary);
  font-size: 0.9rem;
  color: var(--primary-dark);
}

.author-info {
  display: flex;
  gap: 20px;
}

.article-content {
  font-size: 1.05rem;
  line-height: 1.8;
  color: #374151;
}

:deep(.article-content h3) {
  margin-top: 32px;
  margin-bottom: 16px;
  color: var(--primary-dark);
  font-size: 1.4rem;
  font-weight: 700;
}

:deep(.article-content p) {
  margin-bottom: 16px;
}

.article-footer {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
  text-align: center;
}
</style>
