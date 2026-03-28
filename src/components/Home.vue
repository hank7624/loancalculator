<template>
  <div class="home-page">
    <!-- Phase 2: Hero Intro Section -->
    <div class="hero-intro">
      <h2>全方位的免費貸款試算平台</h2>
      <p class="intro-text">
        無論您是計畫買房的首購族、需要資金周轉的創業者，或是想比較銀行利率的精明理財者，
        <strong>免費貸款計算機</strong>都能為您提供最精準的數字依據。
        我們採用與銀行同等的試算邏輯，協助您解析每月還款壓力、總利息支出及最佳貸款方案。
        <br><br>
        不需註冊、不留個資，所有計算皆在您的瀏覽器本地完成，保障您的隱私安全。
      </p>
    </div>

    <!-- 首頁四大圖示 -->
    <div class="home-feature-grid">
      <div class="feature-item" v-for="f in features" :key="f.key" @click="navigateTo(f.route)">
        <div class="feature-icon">{{ f.icon }}</div>
        <div class="feature-title">{{ f.title }}</div>
        <div class="feature-desc">{{ f.desc }}</div>
      </div>
    </div>

    <!-- Phase 4: Expert Analysis Section -->
    <div class="expert-analysis">
      <h3>💡 專業理財點評</h3>
      <div class="analysis-grid">
        <div class="analysis-card">
          <div class="analysis-tag">2026 展望</div>
          <p>「隨著全球進入微通膨時代，房貸利率預期將維持穩定。建議首購族善用各項補貼政策，並預留至少 6 個月的還款周轉金。」</p>
          <div class="expert-info">— 資深授信專員 / 陳先生</div>
        </div>
        <div class="analysis-card">
          <div class="analysis-tag">信用策略</div>
          <p>「信用卡預借現金對信用的傷害往往超乎想像。若有資金壓力，辦理低息信貸並維持穩定還款，才是長期維持 800 分信用的捷徑。」</p>
          <div class="expert-info">— 財務顧問 / 林小姐</div>
        </div>
      </div>
    </div>

    <!-- Phase 2: Tools Overview Section -->
    <div class="tools-overview">
      <div class="tool-desc-item" @click="navigateTo('/credit')">
        <h4>💰 信貸/車貸計算</h4>
        <p>適用於信用貸款、汽車貸款或任何分期付款試算。支援「本息平均攤還」與「本金平均攤還」兩種模式，並可產出詳細的月付金明細表，讓您清楚知道每一塊錢利息的去向。</p>
      </div>
      <div class="tool-desc-item" @click="navigateTo('/mortgage')">
        <h4>🏠 房貸試算</h4>
        <p>專為購屋族設計。考量寬限期、單一或分段式利率（如新青安房貸）等多種參數，精準模擬未來 20~40 年的還款現金流，是買房前必備的財務規劃工具。</p>
      </div>
      <div class="tool-desc-item" @click="navigateTo('/rates')">
        <h4>🏦 利率對比</h4>
        <p>彙整各大銀行最新的信貸與房貸利率與手續費資訊。透過客觀的數據比較，協助您在眾多方案中篩選出最划算、隱藏成本最低的貸款產品。</p>
      </div>
    </div>

    <!-- 最新貸款資訊區 -->
    <div class="latest-news">
      <h3>最新貸款資訊</h3>
      <ul>
        <li v-for="news in latestNews" :key="news.id">
          <strong @click="openArticle(news)" class="article-link">{{news.title}}</strong> 
          <span class="date">({{ news.date }})</span>
          <p>{{ news.preview }}</p>
          <a @click.prevent="openArticle(news)" class="more-link">閱讀完整內容 →</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import articlesData from './articles-home-data.js'

export default {
  name: 'Home',
  setup() {
    const router = useRouter()
    const features = [
      { key: 'credit', route: '/credit', icon: '💰', title: '信貸/車貸試算', desc: '快速計算每月還款與總利息' },
      { key: 'mortgage', route: '/mortgage', icon: '🏠', title: '房貸試算', desc: '支援寬限期與多段式利率' },
      { key: 'rates', route: '/rates', icon: '🏦', title: '銀行利率比較', desc: '即時更新各大銀行貸款利率' },
      { key: 'articles', route: '/articles', icon: '📰', title: '專欄文章', desc: '最新金融政策與貸款知識' }
    ]

    const articles = ref(articlesData)
    // 首頁最新2則
    const latestNews = computed(() => {
      return [...articles.value]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 2);
    })

    const navigateTo = (path) => {
      router.push(path)
    }

    const openArticle = (article) => {
      router.push({ 
        name: 'Articles', 
        query: { id: article.id }
      })
    }

    return {
      features,
      latestNews,
      navigateTo,
      openArticle
    }
  }
}
</script>

<style scoped>
.hero-intro {
  background: linear-gradient(to right, #ffffff, #f0fdf4);
  padding: 2.5rem 3rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  border-left: 6px solid #42b983;
  box-shadow: 0 4px 15px rgba(0,0,0,0.03);
}

.hero-intro h2 {
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 1.2rem;
  font-weight: 700;
}

.intro-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
}

.tools-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  margin: 3rem 0;
}

.tool-desc-item {
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.04);
  border: 1px solid #eef2f5;
  transition: transform 0.2s;
  cursor: pointer;
}

.tool-desc-item:hover {
  transform: translateY(-5px);
  border-color: #42b983;
}

.tool-desc-item h4 {
  color: #2c3e50;
  font-size: 1.3rem;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f0f0f0;
}

.tool-desc-item p {
  color: #666;
  line-height: 1.6;
}

.home-feature-grid { display: flex; justify-content: center; align-items: stretch; gap: 2rem; margin: 2rem 0 0 0; }
.feature-item { cursor: pointer; background: #f4f8fb; border-radius: 10px; box-shadow: 0 2px 8px #ade1c2; padding: 2rem 1.2rem 1.5rem 1.2rem; width: 220px; text-align: center; transition: transform 0.18s, box-shadow 0.18s; position: relative; }
.feature-item:hover { transform: translateY(-8px) scale(1.045); box-shadow: 0 12px 32px rgba(43,120,64,0.12); }
.feature-icon { font-size: 3rem; margin-bottom: 1rem; }
.feature-title { font-size: 1.2rem; font-weight: bold; color: #2c3e50; margin-bottom: 0.5rem; }
.feature-desc { font-size: 0.9rem; color: #666; line-height: 1.4; }

/* Expert Analysis */
.expert-analysis { margin: 3rem 0; }
.expert-analysis h3 { margin-bottom: 1.5rem; color: #2c3e50; font-weight: bold; }
.analysis-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.analysis-card { background: #fffdf0; border: 1px solid #ffeeba; padding: 20px; border-radius: 12px; position: relative; }
.analysis-tag { display: inline-block; background: #e67e22; color: white; padding: 2px 10px; border-radius: 4px; font-size: 0.8rem; margin-bottom: 12px; }
.analysis-card p { font-style: italic; color: #444; line-height: 1.6; margin-bottom: 15px; }
.expert-info { font-size: 0.9rem; color: #7f8c8d; text-align: right; font-weight: 500; }

@media (max-width: 600px) {
  .analysis-grid { grid-template-columns: 1fr; }
}

.latest-news { margin-top: 3rem; background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 2px 15px rgba(0,0,0,0.05); }
.latest-news h3 { margin-bottom: 1.5rem; color: #2c3e50; border-bottom: 2px solid #f0f0f0; padding-bottom: 0.5rem; }
.latest-news ul { list-style: none; padding: 0; }
.latest-news li { margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px dashed #eee; }
.latest-news li:last-child { border-bottom: none; }
.article-link { font-size: 1.1rem; color: #2c3e50; cursor: pointer; transition: color 0.2s; }
.article-link:hover { color: #42b983; }
.date { font-size: 0.85rem; color: #999; margin-left: 0.5rem; }
.more-link { display: inline-block; margin-top: 0.5rem; color: #42b983; cursor: pointer; font-size: 0.9rem; font-weight: 500; }
.more-link:hover { text-decoration: underline; }

/* 響應式 */
@media (max-width: 768px) {
  .home-feature-grid { flex-direction: column; align-items: center; }
  .feature-item { width: 100%; max-width: 300px; }
  .hero-intro { padding: 1.5rem; }
  .tools-overview { grid-template-columns: 1fr; }
}
</style>
