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
      <p>&copy; 2024 免費貸款計算機. 本工具僅供參考，實際貸款條件請以銀行公告為準。</p>
    </footer>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import CreditCalculator from './components/CreditCalculator.vue'
import MortgageCalculator from './components/MortgageCalculator.vue'

export default {
  name: 'App',
  components: {
    CreditCalculator,
    MortgageCalculator
  },
  setup() {
    const activeTab = ref('credit')

    onMounted(() => {
      // 初始化Google AdSense廣告
      if (window.adsbygoogle) {
        window.adsbygoogle.push({})
      }
    })

    return {
      activeTab
    }
  }
}
</script>
