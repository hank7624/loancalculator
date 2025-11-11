<template>
  <div id="app">
    <!-- 頂部廣告區域 -->
    <div class="ad-container ad-top">
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="ca-pub-9729139144169160"
           data-ad-slot="XXXXXXXXXX"
           data-ad-format="auto"
           data-full-width-responsive="true">
      </ins>
    </div>

    <!-- 主標題 -->
    <header class="header">
      <div class="title-container">
        <span class="icon">🧮</span>
        <h1>免費貸款計算機</h1>
        <span class="icon">💰</span>
      </div>
      <p>專業的信貸、車貸/房貸計算工具，支援多種還款方式</p>
    </header>

    <nav class="nav-tabs">
      <button :class="['nav-tab', { active: homeTab } ]" @click="resetHome">
        首頁
      </button>
      <button :class="['nav-tab', { active: activeTab === 'credit' }]" @click="openTab('credit')">
        💰 信貸/車貸計算
      </button>
      <button :class="['nav-tab', { active: activeTab === 'mortgage' }]" @click="openTab('mortgage')">
        🏠 房貸計算
      </button>
      <button :class="['nav-tab', { active: activeTab === 'rates' }]" @click="openTab('rates')">
        🏦 銀行利率對比
      </button>
      <button :class="['nav-tab', { active: activeTab === 'articles' }]" @click="openTab('articles')">
        📰 專欄文章
      </button>
    </nav>

    <main class="main-content">
      <!-- 左側廣告 -->
      <aside class="ad-sidebar ad-left">
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-9729139144169160"
             data-ad-slot="XXXXXXXXXX"
             data-ad-format="vertical"></ins>
      </aside>

      <div class="calculator-container">
        <!-- 首頁四大圖示 -->
        <div v-if="homeTab" class="home-feature-grid">
          <div class="feature-item" v-for="f in features" :key="f.key" @click="openTab(f.key)">
            <div class="feature-icon">{{ f.icon }}</div>
            <div class="feature-title">{{ f.title }}</div>
            <div class="feature-desc">{{ f.desc }}</div>
          </div>
        </div>
        <!-- 最新貸款資訊區 -->
        <div v-if="homeTab" class="latest-news">
          <h3>最新貸款資訊</h3>
          <ul>
            <li v-for="news in latestNews" :key="news.id">
              <strong @click="gotoArticle(news.id)" class="article-link">{{news.title}}</strong> <span class="date">({{ news.date }})</span>
              <p>{{ news.preview }}</p>
              <a @click.prevent="gotoArticle(news.id)" class="more-link">閱讀完整內容 →</a>
            </li>
          </ul>
        </div>
        <!-- 精選專欄（固定兩篇） -->
        <div v-if="homeTab && featuredArticles.length" class="random-article">
          <h3>精選專欄</h3>
          <div v-for="fa in featuredArticles" :key="fa.id" style="margin-bottom:1.1rem">
            <p style="margin:0">
              <strong>
                <a :href="articleStaticUrl(fa)" class="article-link">
                  {{ fa.title }}
                </a>
              </strong>
              <span class="date" style="margin-left:.35em">({{ fa.date }})</span>
            </p>
            <div class="summary">{{ fa.preview }}</div>
            <p style="margin-top:.4rem">
              <a :href="articleStaticUrl(fa)" class="more-link">閱讀完整內容 →</a>
            </p>
          </div>
        </div>

        <!-- 個別功能頁 -->
        <CreditCalculator v-if="activeTab === 'credit'" />
        <MortgageCalculator v-if="activeTab === 'mortgage'" />
        <BankRateComparison v-if="activeTab === 'rates'" />
        <Articles 
          v-if="activeTab==='articles'"
          :selected-id="selectedArticleId"
          :articles="articles"
          @article-selected="handleArticleSelected"
        />

        <!-- 內嵌資訊區塊（隱私政策／使用條款／關於我們／貸款知識） -->
        <section id="info-section" v-if="infoSectionComponent" class="info-section">
          <component :is="infoSectionComponent" @close="handleInfoClose" />
        </section>
      </div>

      <!-- 右側廣告 -->
      <aside class="ad-sidebar ad-right">
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-9729139144169160"
             data-ad-slot="XXXXXXXXXX"
             data-ad-format="vertical"></ins>
      </aside>
    </main>

    <!-- 底部廣告區域 -->
    <div class="ad-container ad-bottom">
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="ca-pub-9729139144169160"
           data-ad-slot="XXXXXXXXXX"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>

    <!-- 頁腳 -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-main">
          <p>&copy; 2024 免費貸款計算機. 本工具僅供參考，實際貸款條件請以銀行公告為準。</p>
        </div>
        <div class="footer-links">
          <div class="link-group">
            <h4>法律條款</h4>
            <a href="#" @click.prevent="scrollToInfo('PrivacyPolicy')">隱私政策</a>
            <a href="#" @click.prevent="scrollToInfo('TermsOfService')">使用條款</a>
          </div>
          <div class="link-group">
            <h4>關於我們</h4>
            <a href="#" @click.prevent="scrollToInfo('AboutUs')">關於我們</a>
            <a href="#" @click.prevent="scrollToInfo('LoanKnowledge')">貸款知識</a>
          </div>
          <div class="link-group">
            <h4>網站導覽</h4>
            <ul class="footer-nav-list">
              <li><a href="/credit.html">信貸/車貸介紹</a></li>
              <li><a href="/mortgage.html">房貸計算說明</a></li>
              <li><a href="/rates.html">銀行利率對比</a></li>
              <li><a href="/articles.html">專欄導覽</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>

    <!-- 彈出頁面（保留，其他地方可能用到） -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeModal">&times;</button>
        <component :is="currentModal" @close="closeModal" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, nextTick } from 'vue'
import CreditCalculator from './components/CreditCalculator.vue'
import MortgageCalculator from './components/MortgageCalculator.vue'
import BankRateComparison from './components/BankRateComparison.vue'
import Articles from './components/Articles.vue'
import PrivacyPolicy from './components/PrivacyPolicy.vue'
import TermsOfService from './components/TermsOfService.vue'
import AboutUs from './components/AboutUs.vue'
import LoanKnowledge from './components/LoanKnowledge.vue'
import articlesData from './components/articles-home-data.js'

export default {
  name: 'App',
  components: {
    CreditCalculator,
    MortgageCalculator,
    BankRateComparison,
    Articles,
    PrivacyPolicy,
    TermsOfService,
    AboutUs,
    LoanKnowledge
  },
  setup() {
    const homeTab = ref(true)
    const activeTab = ref('')
    const showModal = ref(false)
    const currentModal = ref(null)

    // 內嵌資訊區塊元件
    const infoSectionComponent = ref(null)

    // 引用所有專欄文章
    const articles = ref(articlesData)
    // 首頁最新2則，按日期先後
    const latestNews = computed(() => {
      return [...articles.value]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0,2);
    })
    // 首頁隨機精選摘要
    // 精選兩篇（固定 id）
    const featuredIds = [1006, 1005, 4]
    const featuredArticles = computed(() => {
      return articles.value.filter(a => featuredIds.includes(a.id))
    })
    function slugify(input) {
      return String(input)
        .trim()
        .toLowerCase()
        .replace(/[\s\/\\]+/g, '-')
        .replace(/[^\u4e00-\u9fa5a-z0-9\-]+/gi, '')
        .replace(/\-+/g, '-')
        .replace(/^\-+|\-+$/g, '')
    }
    function articleStaticUrl(a) {
      return `/articles/${a.id}-${slugify(a.title)}.html`
    }

    // 四大功能設定
    const features = [
      { key: 'credit', icon: '💰', title: '信貸/車貸計算', desc: '快速計算信貸/車貸 月付金額與總利息' },
      { key: 'mortgage', icon: '🏠', title: '房貸計算', desc: '支援多種利率、寬限期，還款明細清晰' },
      { key: 'rates', icon: '🏦', title: '銀行利率對比', desc: '即時更新利率，挑選適合自己的貸款' },
      { key: 'articles', icon: '📰', title: '專欄文章', desc: '專家解析，貸款大小事不遺漏' },
    ]

    // ===== 以下為原有 modal、tab控制，微調如下 =====
    const scrollToInfo = async (componentName) => {
      infoSectionComponent.value = componentName
      await nextTick()
      const el = document.getElementById('info-section')
      if (el) {
        try { el.scrollIntoView({ behavior: 'smooth', block: 'start' }) } catch (e) { window.scrollTo(0, el.offsetTop || 0) }
      }
    }

    const showPrivacyPolicy = () => { currentModal.value = 'PrivacyPolicy'; showModal.value = true }
    const showTermsOfService = () => { currentModal.value = 'TermsOfService'; showModal.value = true }
    const showAboutUs = () => { currentModal.value = 'AboutUs'; showModal.value = true }
    const showLoanKnowledge = () => { currentModal.value = 'LoanKnowledge'; showModal.value = true }
    const closeModal = () => { showModal.value = false; currentModal.value = null }

    // 首頁模式與tab切換
    function openTab(key) { homeTab.value = false; activeTab.value = key; selectedArticleId.value = null }
    function resetHome() { homeTab.value = true; activeTab.value = ''; selectedArticleId.value = null }

    // ===== 一篇專欄連結事件 =====
    const selectedArticleId = ref(null)
    function gotoArticle(id) { homeTab.value = false; activeTab.value = 'articles'; selectedArticleId.value = id }

    function handleArticleSelected(id) { selectedArticleId.value = id; activeTab.value = 'articles'; homeTab.value = false }
    function handleArticleModalClose() { selectedArticleId.value = null }

    // 內嵌資訊區塊關閉事件
    function handleInfoClose() {
      infoSectionComponent.value = null
      try { window.scrollTo({ top: 0, behavior: 'smooth' }) } catch (e) { window.scrollTo(0, 0) }
      // 可選：回首頁
      // homeTab.value = true; activeTab.value = ''
    }

    onMounted(() => { if (window.adsbygoogle) { window.adsbygoogle.push({}) } })

    return {
      homeTab,
      activeTab,
      features,
      articles,
      latestNews,
      featuredArticles,
      articleStaticUrl,
      showPrivacyPolicy,
      showTermsOfService,
      showAboutUs,
      showLoanKnowledge,
      showModal,
      currentModal,
      closeModal,
      openTab,
      resetHome,
      gotoArticle,
      selectedArticleId,
      handleArticleSelected,
      handleArticleModalClose,
      infoSectionComponent,
      scrollToInfo,
      handleInfoClose
    }
  }
}
</script>

<style scoped>
.home-feature-grid { display: flex; justify-content: center; align-items: stretch; gap: 2rem; margin: 2rem 0 0 0; }
.feature-item { cursor: pointer; background: #f4f8fb; border-radius: 10px; box-shadow: 0 2px 8px #ade1c2; padding: 2rem 1.2rem 1.5rem 1.2rem; width: 220px; text-align: center; transition: transform 0.18s, box-shadow 0.18s; position: relative; }
.feature-item:hover { transform: translateY(-8px) scale(1.045); box-shadow: 0 12px 32px rgba(43,120,64,0.12); }
.feature-icon { font-size: 3rem; margin-bottom: 1rem; }
.feature-title { font-size: 1.3rem; font-weight: bold; margin-bottom: .6rem; }
.feature-desc { color: #698972; font-size: .99em; margin-bottom: .2rem; }
.latest-news { margin-top: 3rem; background: #fafcf6; border-left: 5px solid #5ac16e; padding: 1.2rem 1.5rem 1rem 2.2rem; border-radius: 0 10px 10px 0; }
.latest-news h3 { margin-top: 0; color: #348760; font-weight: bold; }
.latest-news ul { padding-left: 1.2rem; }
.latest-news li { margin-bottom: 1.4em; }
.latest-news .date { color: #a2adb0; font-size: .98em; margin-left: .15em; }
.random-article { margin: 2.5rem auto 0 auto; max-width: 730px; background: #fffbe5; border-radius: 18px; box-shadow: 0 1px 8px #e1e2ae; padding: 1.7rem 2rem; }
.random-article h3 { color: #bf8a00; font-weight: bold; margin-bottom: 0.7em; }
.random-article .summary { margin-top: .5em; color: #444; }
/* 內嵌資訊區塊 */
.info-section { margin: 32px 0; padding: 20px; background: #ffffff; border:1px solid #eee; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,.04); }
.footer-nav-list { list-style: none; padding: 0; margin: 8px 0 0 0; }
.footer-nav-list li { margin-bottom: 10px; }
.footer-nav-list a { text-decoration: none; color: #3498db; }
.footer-nav-list a:hover { text-decoration: underline; }
/* 新增：頁腳連結行距與間距 */
.footer-links .link-group a { display: block; margin: 8px 0; line-height: 1.6; }
.footer-links .link-group a:hover { text-decoration: underline; }
</style>
