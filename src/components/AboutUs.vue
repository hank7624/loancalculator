<template>
  <div class="about-us">
    <div class="content-container">
      <h1>關於我們</h1>
      
      <section class="mission">
        <h2>🎯 我們的使命</h2>
        <p>提供免費、專業、易用的貸款計算工具，幫助用戶做出明智的理財決策。我們相信，每個人都應該能夠輕鬆計算和理解自己的貸款情況。</p>
      </section>

      <section class="features">
        <h2>✨ 產品特色</h2>
        <div class="feature-grid">
          <div class="feature-item">
            <div class="feature-icon">🧮</div>
            <h3>專業計算</h3>
            <p>支援多種還款方式，計算精確</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">📱</div>
            <h3>響應式設計</h3>
            <p>支援各種設備，使用體驗佳</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">🔒</div>
            <h3>隱私保護</h3>
            <p>本地計算，不收集個人數據</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">💡</div>
            <h3>完全免費</h3>
            <p>無需註冊，立即使用</p>
          </div>
        </div>
      </section>

      <section class="team">
        <h2>👥 專業團隊與編輯政策</h2>
        <p>我們的團隊由具備金融背景的開發者與資深理財顧問組成。每一行程式碼與每一篇專欄文章，皆經過嚴格的審核流程，確保資訊的正確性與即時性。</p>
        
        <div class="editorial-policy">
          <h3>📝 編輯政策 (Editorial Policy)</h3>
          <ul>
            <li><strong>數據來源：</strong> 我們的利率數據每週與各大銀行官網及中央銀行公告進行交叉比對，確保誤差降至最低。</li>
            <li><strong>中立性：</strong> 本站不接受任何隱性業配。所有推薦與排序皆基於客觀數據算法，不受金融機構贊助影響。</li>
            <li><strong>更新頻率：</strong> 每月1號會針對法規變動（如新青安房貸政策），做內容專欄更新。</li>
          </ul>
        </div>
      </section>

      <section class="contact">
        <h2>📞 聯絡我們</h2>
        <div class="contact-methods">
          <div class="contact-item">
            <div class="contact-icon">📍</div>
            <h3>聯絡地址</h3>
            <p>台北市信義區信義路五段7號 (此為虛擬辦公室，來訪請先預約)</p>
          </div>
          <div class="contact-item">
            <div class="contact-icon">📧</div>
            <h3>電子郵件</h3>
            <p>hank.chen204@gmail.com</p>
            <p class="response-time">我們通常在 1-2 個工作日內回覆</p>
          </div>
        </div>
      </section>

      <section class="disclaimer">
        <h2>⚠️ 重要聲明</h2>
        <p>本工具提供的計算結果僅供參考，實際貸款條件請以銀行或金融機構的公告為準。我們不承擔因使用本工具而產生的任何財務損失或決策後果。</p>
      </section>

      <div class="back-link">
        <router-link to="/" class="back-btn">返回首頁</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutUs'
}
</script>

<style scoped>
.about-us {
  max-width: 900px;
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
  margin-bottom: 30px;
  font-size: 2.5em;
}

section {
  margin-bottom: 40px;
}

h2 {
  color: #2c3e50;
  border-bottom: 2px solid #27ae60;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-size: 1.8em;
}

h3 {
  color: #34495e;
  margin-bottom: 10px;
  font-size: 1.3em;
}

p {
  line-height: 1.6;
  color: #555;
  margin-bottom: 15px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.feature-item {
  text-align: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
  border: 1px solid #e9ecef;
}

.feature-icon {
  font-size: 3em;
  margin-bottom: 15px;
}

.contact-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.contact-item {
  text-align: center;
  padding: 25px;
  background: #f8f9fa;
  border-radius: 10px;
  border: 1px solid #e9ecef;
}

.contact-icon {
  font-size: 2.5em;
  margin-bottom: 15px;
}

.contact-link {
  display: inline-block;
  background: #27ae60;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 20px;
  margin-top: 15px;
  transition: background 0.3s ease;
}

.contact-link:hover {
  background: #219a52;
}

.disclaimer {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 10px;
  padding: 20px;
}

.disclaimer h2 {
  color: #856404;
  border-bottom-color: #f39c12;
}

.disclaimer p {
  color: #856404;
}

.back-link {
  text-align: center;
  margin-top: 40px;
}

.back-btn {
  display: inline-block;
  background: #27ae60;
  color: white;
  padding: 12px 30px;
  text-decoration: none;
  border-radius: 25px;
  transition: background 0.3s ease;
}

.back-btn:hover {
  background: #219a52;
}

@media (max-width: 768px) {
  .about-us {
    margin: 10px;
    padding: 15px;
  }
  
  .content-container {
    padding: 20px;
  }
  
  h1 {
    font-size: 2em;
  }
  
  .contact-methods {
    grid-template-columns: 1fr;
  }
}

.editorial-policy {
  background: #f8fdfa;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #27ae60;
  margin-top: 20px;
}

.editorial-policy h3 {
  font-size: 1.2em;
  color: #2c3e50;
  margin-bottom: 12px;
}

.editorial-policy ul {
  padding-left: 20px;
}

.editorial-policy li {
  margin-bottom: 8px;
  color: #555;
}

.response-time {
  font-size: 0.85em;
  color: #888;
  margin-top: 5px;
}
</style>
