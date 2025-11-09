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
        class="article-tab" :class="{active:currentCategory===cat.value}"
        @click="currentCategory=cat.value"
      >
        {{cat.label}}
      </button>
    </div>
    <!-- 文章列表 -->
    <div class="articles-list">
      <div 
        v-for="article in filteredArticles" 
        :key="article.id" 
        class="article-item"
        @click="selectArticle(article)"
      >
        <div class="article-header">
          <h3>{{ article.title }}</h3>
          <div class="article-meta">
            <span class="date">{{ article.date }}</span>
            <span class="category">{{ article.category }}</span>
          </div>
        </div>
        <div class="article-preview">
          <p>{{ article.preview }}</p>
        </div>
        <div class="read-more">
          <span class="read-more-text">點擊閱讀全文 →</span>
        </div>
      </div>
    </div>
    <!-- 文章詳情彈出層 -->
    <div v-if="selectedArticle" class="article-modal-overlay" @click="closeArticle">
      <div class="article-modal-content" @click.stop>
        <button class="modal-close" @click="closeArticle">&times;</button>
        <div class="article-detail">
          <h2>{{ selectedArticle.title }}</h2>
          <div class="article-meta">
            <span class="source">{{ selectedArticle.source }}</span>
            <span class="date">{{ selectedArticle.date }}</span>
          </div>
          <div class="article-content">
            <div v-for="(paragraph, index) in selectedArticle.content" :key="index">
              <p>{{ paragraph }}</p>
            </div>
          </div>
          <div v-if="selectedArticle.keyPoints" class="key-points">
            <h4>📋 重點摘要</h4>
            <ul>
              <li v-for="(point, index) in selectedArticle.keyPoints" :key="index">
                {{ point }}
              </li>
            </ul>
          </div>
          <div v-if="selectedArticle.expertAdvice" class="expert-advice">
            <h4>💡 專家建議</h4>
            <ol>
              <li v-for="(advice, index) in selectedArticle.expertAdvice" :key="index">
                {{ advice }}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue'
export default {
  name: 'Articles',
  props: {
    selectedId: {
      type: [Number, String],
      default: null
    },
    articles: {
      type: Array,
      default: ()=>[]
    }
  },
  setup(props, { emit }) {
    const selectedArticle = ref(null)
    // 分類切換
    const categories = [
      { label:'全部文章', value:'all' },
      { label:'央行政策', value:'央行政策' },
      { label:'貸款知識', value:'貸款知識' },
      { label:'信貸指南', value:'信貸指南' },
      { label:'房貸資訊', value:'房貸資訊' }
    ]
    const currentCategory = ref('all')
    const filteredArticles = computed(()=>{
      if (currentCategory.value==='all') return props.articles
      return props.articles.filter(a=>a.category===currentCategory.value)
    })
    // 文章行為
    const selectArticle = (article) => {
      selectedArticle.value = article
      emit('article-selected', article.id)
    }
    const closeArticle = () => {
      selectedArticle.value = null
      emit('close')
    }
    // 若收到 selectedId props，自動彈窗該文章
    watch(
      () => props.selectedId,
      (id) => {
        if (id && props.articles && props.articles.length) {
          const found = props.articles.find(a=>a.id==id)
          if(found) selectedArticle.value = found
        }
      },
      {immediate:true}
    )
    // 首次 mount 若有 selectedId 直接展開
    onMounted(()=>{
      if(props.selectedId&&props.articles&&props.articles.length){
        const found=props.articles.find(a=>a.id==props.selectedId)
        if(found) selectedArticle.value=found
      }
    })
    return {
      articles: props.articles,
      selectedArticle,
      selectArticle,
      closeArticle,
      categories,
      currentCategory,
      filteredArticles
    }
  }
}
</script>

<style scoped>
.articles-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h2 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 2.2em;
}

.subtitle {
  color: white;
  font-size: 1.1em;
}

.articles-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.article-item {
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.article-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.15);
}

.article-header h3 {
  color: #2c3e50;
  font-size: 1.5em;
  margin-bottom: 10px;
  line-height: 1.4;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 0.9em;
  color: #666;
}

.date {
  font-style: italic;
}

.category {
  background: #3498db;
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
  font-weight: 500;
}

.article-preview p {
  color: #555;
  line-height: 1.7;
  margin-bottom: 15px;
  font-size: 1em;
}

.read-more {
  text-align: right;
}

.read-more-text {
  color: #3498db;
  font-weight: 500;
  font-size: 0.9em;
}

.article-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.article-modal-content {
  background: white;
  border-radius: 15px;
  padding: 30px;
  width: 90%;
  max-width: 800px;
  max-height: 90%;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 10px 40px rgba(0,0,0,0.3);
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5em;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  transition: background-color 0.2s ease;
}

.modal-close:hover {
  background: #c0392b;
}

.article-detail h2 {
  color: #2c3e50;
  font-size: 2em;
  margin-bottom: 15px;
  line-height: 1.3;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 0.9em;
  color: #666;
}

.source {
  font-style: italic;
}

.article-content p {
  color: #333;
  line-height: 1.8;
  margin-bottom: 20px;
  font-size: 1.1em;
}

.key-points, .expert-advice {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  margin: 20px 0;
  border-left: 4px solid #3498db;
}

.key-points h4, .expert-advice h4 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.1em;
}

.key-points ul, .expert-advice ol {
  color: #555;
  line-height: 1.8;
  padding-left: 20px;
}

.key-points li, .expert-advice li {
  margin-bottom: 8px;
}

.article-tabs {
  text-align: center;
  margin-bottom: 32px;
}
.article-tab {
  border: none;
  outline: none;
  background: #ecf0f1;
  color: #15523e;
  font-size: 1.02em;
  font-weight: 600;
  padding: 9px 26px;
  margin: 0 7px 0 0;
  cursor: pointer;
  border-radius: 18px 18px 0 0;
  transition: background 0.2s, color 0.18s;
}
.article-tab.active,.article-tab:active {
  background: #5ac16e;
  color: #fff;
}
.article-tab:last-child {
  margin-right: 0;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .articles-container {
    padding: 15px;
  }
  
  .articles-list {
    grid-template-columns: 1fr;
  }

  .article-item {
    padding: 20px;
  }

  .article-modal-content {
    padding: 20px;
    width: 95%;
  }

  .header h2 {
    font-size: 1.8em;
  }
  
  .article-header h3 {
    font-size: 1.3em;
  }
  
  .category-tags {
    justify-content: center;
  }
}
</style>
