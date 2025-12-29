<template>
  <div class="privacy-policy">
    <div class="content-container">
      <h1>隱私政策</h1>
      <p class="last-updated">最後更新：2024年8月24日</p>
      
      <section>
        <h2>1. 信息收集</h2>
        <p>本貸款計算器網站不會收集、存儲或傳輸您的個人信息。所有計算都在您的瀏覽器中本地進行，不會向我們的服務器發送任何數據。</p>
      </section>

      <section>
        <h2>2. Cookie 使用</h2>
        <p>本網站可能使用必要的 Cookie 來改善用戶體驗，但不會使用追蹤 Cookie 來收集個人信息。</p>
      </section>

      <section>
        <h2>3. 第三方服務</h2>
        <p>本網站可能包含 Google AdSense 等第三方廣告服務，這些服務有自己的隱私政策。請查看相關服務的隱私政策了解詳情。</p>
      </section>

      <section>
        <h2>4. 數據安全</h2>
        <p>由於我們不收集個人數據，因此不存在數據洩露的風險。所有計算結果僅存儲在您的設備上。</p>
      </section>

      <section>
        <h2>5. 兒童隱私</h2>
        <p>本網站不針對13歲以下兒童，我們不會故意收集兒童的個人信息。</p>
      </section>

      <section>
        <h2>6. 隱私政策更新</h2>
        <p>我們可能會不時更新本隱私政策。重大變更將在網站上公佈。</p>
      </section>

      <section>
        <h2>7. 聯繫我們</h2>
        <p>如果您對本隱私政策有任何疑問，請通過 GitHub Issues 聯繫我們。</p>
      </section>

      <div class="back-link">
        <router-link to="/" class="back-btn">返回首頁</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrivacyPolicy'
}
</script>

<style scoped>
.privacy-policy {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.content-container {
  padding: 30px;
}

h1 {
  color: #333;
  text-align: center;
  margin-bottom: 10px;
  font-size: 2.5em;
}

.last-updated {
  text-align: center;
  color: #666;
  margin-bottom: 30px;
  font-style: italic;
}

section {
  margin-bottom: 30px;
}

h2 {
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
  margin-bottom: 15px;
}

p {
  line-height: 1.6;
  color: #555;
  margin-bottom: 15px;
}

.back-link {
  text-align: center;
  margin-top: 40px;
}

.back-btn {
  display: inline-block;
  background: #3498db;
  color: white;
  padding: 12px 30px;
  text-decoration: none;
  border-radius: 25px;
  transition: background 0.3s ease;
}

.back-btn:hover {
  background: #2980b9;
}

@media (max-width: 768px) {
  .privacy-policy {
    margin: 10px;
    padding: 15px;
  }
  
  .content-container {
    padding: 20px;
  }
  
  h1 {
    font-size: 2em;
  }
}
</style>
