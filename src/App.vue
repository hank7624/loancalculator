<template>
  <div id="app">
    <!-- 主標題 -->
    <header class="header">
      <div class="title-container" @click="goHome" style="cursor: pointer;">
        <span class="icon">🧮</span>
        <h1>免費貸款計算機</h1>
        <span class="icon">💰</span>
      </div>
      <p>專業的信貸、車貸/房貸計算工具，支援多種還款方式</p>
    </header>

    <nav class="nav-tabs">
      <router-link to="/" class="nav-tab" active-class="active">首頁</router-link>
      <router-link to="/credit" class="nav-tab" active-class="active">💰 信貸/車貸計算</router-link>
      <router-link to="/mortgage" class="nav-tab" active-class="active">🏠 房貸計算</router-link>
      <router-link to="/rates" class="nav-tab" active-class="active">🏦 銀行利率對比</router-link>
      <router-link to="/articles" class="nav-tab" active-class="active">📰 專欄文章</router-link>
      <router-link to="/glossary" class="nav-tab" active-class="active">📘 貸款百科</router-link>
    </nav>

    <!-- 頂部廣告區域 (已挪至導航下方，優化 Above the Fold) -->
    <div class="ad-container ad-top">
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="ca-pub-9729139144169160"
           data-ad-slot="9350842661"
           data-ad-format="auto"
           data-full-width-responsive="true">
      </ins>
    </div>

    <main class="main-content">
      <!-- 左側廣告 -->
      <aside class="ad-sidebar ad-left">
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-9729139144169160"
             data-ad-slot="8062973167"
             data-ad-format="vertical"></ins>
      </aside>

      <div class="calculator-container">
        <!-- 路由視圖：所有頁面將在這裡切換 -->
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>

      <!-- 右側廣告 -->
      <aside class="ad-sidebar ad-right">
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-9729139144169160"
             data-ad-slot="8062973167"
             data-ad-format="vertical"></ins>
      </aside>
    </main>

    <!-- 底部廣告區域 -->
    <div class="ad-container ad-bottom">
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="ca-pub-9729139144169160"
           data-ad-slot="7814295325"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>

    <!-- 頁腳 -->
    <footer class="footer">
      <p>
        © 2024 免費貸款計算機 | 
        <router-link to="/about">關於我們</router-link> | 
        <router-link to="/privacy">隱私權政策</router-link> | 
        <router-link to="/terms">使用條款</router-link> | 
        <router-link to="/knowledge">貸款知識</router-link> | 
        <router-link to="/articles">專欄導覽</router-link> | 
        <router-link to="/glossary">貸款百科</router-link>
      </p>
      <div style="font-size: 0.8rem; margin-top: 5px; color: #888;">
        © 2026 免費貸款計算機 | 理性理財，量入為出
      </div>
    </footer>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'App',
  setup() {
    const router = useRouter()

    const goHome = () => {
      router.push('/')
    }

    onMounted(() => {
      // AdSense 推送邏輯
      try {
        const ads = document.querySelectorAll('.adsbygoogle');
        ads.forEach(ad => {
          if (!ad.innerHTML) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          }
        });
      } catch (e) {
        console.error('AdSense load error:', e);
      }
    })

    return {
      goHome
    }
  }
}
</script>

<style scoped>
/* Phase 2: Homepage New Styles */
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
