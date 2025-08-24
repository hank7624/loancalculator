<template>
  <div id="app">
    <!-- 頂部廣告區域 -->
    <div class="ad-container ad-top">
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
           data-ad-slot="XXXXXXXXXX"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
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

    <!-- 導航標籤 -->
    <nav class="nav-tabs">
      <button 
        :class="['nav-tab', { active: activeTab === 'credit' }]"
        @click="activeTab = 'credit'"
      >
                 信貸/車貸計算
      </button>
      <button 
        :class="['nav-tab', { active: activeTab === 'mortgage' }]"
        @click="activeTab = 'mortgage'"
      >
        房貸計算
      </button>
    </nav>

    <!-- 主要內容區域 -->
    <main class="main-content">
      <!-- 左側廣告 -->
      <aside class="ad-sidebar ad-left">
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="XXXXXXXXXX"
             data-ad-format="vertical"></ins>
      </aside>

      <!-- 計算器組件 -->
      <div class="calculator-container">
        <CreditCalculator v-if="activeTab === 'credit'" />
        <MortgageCalculator v-if="activeTab === 'mortgage'" />
      </div>

      <!-- 右側廣告 -->
      <aside class="ad-sidebar ad-right">
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="XXXXXXXXXX"
             data-ad-format="vertical"></ins>
      </aside>
    </main>

    <!-- 底部廣告區域 -->
    <div class="ad-container ad-bottom">
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
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
            <a href="#" @click.prevent="showPrivacyPolicy">隱私政策</a>
            <a href="#" @click.prevent="showTermsOfService">使用條款</a>
          </div>
          
          <div class="link-group">
            <h4>關於我們</h4>
            <a href="#" @click.prevent="showAboutUs">關於我們</a>
            <a href="#" @click.prevent="showLoanKnowledge">貸款知識</a>
          </div>
        </div>
      </div>
    </footer>

    <!-- 彈出頁面 -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeModal">&times;</button>
        <component :is="currentModal" @close="closeModal" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import CreditCalculator from './components/CreditCalculator.vue'
import MortgageCalculator from './components/MortgageCalculator.vue'
import PrivacyPolicy from './components/PrivacyPolicy.vue'
import TermsOfService from './components/TermsOfService.vue'
import AboutUs from './components/AboutUs.vue'
import LoanKnowledge from './components/LoanKnowledge.vue'

export default {
  name: 'App',
  components: {
    CreditCalculator,
    MortgageCalculator,
    PrivacyPolicy,
    TermsOfService,
    AboutUs,
    LoanKnowledge
  },
  setup() {
    const activeTab = ref('credit')
    const showModal = ref(false)
    const currentModal = ref(null)

    const showPrivacyPolicy = () => {
      currentModal.value = 'PrivacyPolicy'
      showModal.value = true
    }

    const showTermsOfService = () => {
      currentModal.value = 'TermsOfService'
      showModal.value = true
    }

    const showAboutUs = () => {
      currentModal.value = 'AboutUs'
      showModal.value = true
    }

    const showLoanKnowledge = () => {
      currentModal.value = 'LoanKnowledge'
      showModal.value = true
    }

    const closeModal = () => {
      showModal.value = false
      currentModal.value = null
    }

    onMounted(() => {
      // 初始化Google AdSense廣告
      if (window.adsbygoogle) {
        window.adsbygoogle.push({})
      }
    })

    return {
      activeTab,
      showModal,
      currentModal,
      showPrivacyPolicy,
      showTermsOfService,
      showAboutUs,
      showLoanKnowledge,
      closeModal
    }
  }
}
</script>

<style scoped>
/* 頁腳樣式 */
.footer {
  background: #2c3e50;
  color: white;
  padding: 30px 0;
  margin-top: 40px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-main {
  text-align: center;
  margin-bottom: 30px;
}

.footer-main p {
  margin: 0;
  color: #bdc3c7;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  justify-items: center;
}

.link-group h4 {
  color: #ecf0f1;
  margin-bottom: 15px;
  font-size: 1.1em;
  border-bottom: 2px solid #3498db;
  padding-bottom: 5px;
}

.link-group a {
  display: block;
  color: #bdc3c7;
  text-decoration: none;
  margin-bottom: 8px;
  transition: color 0.3s ease;
}

.link-group a:hover {
  color: #3498db;
}

/* 模態框樣式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 10px;
  max-width: 90%;
  max-height: 90%;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 20px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 20px;
  cursor: pointer;
  z-index: 1001;
  transition: background 0.3s ease;
}

.modal-close:hover {
  background: #c0392b;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .footer-links {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .modal-content {
    max-width: 95%;
    max-height: 95%;
  }
}
</style>
