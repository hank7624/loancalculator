<template>
  <div class="terms-of-service">
    <div class="content-container">
      <h1>使用條款</h1>
      <p class="last-updated">最後更新：2024年8月24日</p>
      
      <section>
        <h2>1. 服務說明</h2>
        <p>本貸款計算器網站提供免費的貸款計算工具，包括信貸、房貸和車貸計算功能。所有計算結果僅供參考，不構成財務建議。</p>
      </section>

      <section>
        <h2>2. 使用條件</h2>
        <p>使用本網站即表示您同意遵守以下條件：</p>
        <ul>
          <li>僅用於個人理財規劃目的</li>
          <li>不進行任何非法或有害活動</li>
          <li>不嘗試破解或干擾網站功能</li>
          <li>尊重其他用戶的使用權利</li>
        </ul>
      </section>

      <section>
        <h2>3. 免責聲明</h2>
        <p>本網站提供的計算結果僅供參考，實際貸款條件請以銀行或金融機構的公告為準。我們不承擔因使用本工具而產生的任何財務損失或決策後果。</p>
      </section>

      <section>
        <h2>4. 知識產權</h2>
        <p>本網站的設計、代碼和內容均受版權保護。未經許可，不得複製、分發或修改。</p>
      </section>

      <section>
        <h2>5. 服務變更</h2>
        <p>我們保留隨時修改、暫停或終止服務的權利，恕不另行通知。</p>
      </section>

      <section>
        <h2>6. 責任限制</h2>
        <p>在法律允許的最大範圍內，我們對因使用本網站而產生的任何直接、間接、偶然或特殊損害不承擔責任。</p>
      </section>

      <section>
        <h2>7. 法律適用</h2>
        <p>本使用條款受中華民國法律管轄，任何爭議將通過友好協商解決。</p>
      </section>

      <div class="back-link">
        <button class="back-btn" @click="$emit('close')">返回首頁</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TermsOfService'
}
</script>

<style scoped>
.terms-of-service {
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
  border-bottom: 2px solid #e74c3c;
  padding-bottom: 10px;
  margin-bottom: 15px;
}

p {
  line-height: 1.6;
  color: #555;
  margin-bottom: 15px;
}

ul {
  margin-left: 20px;
  color: #555;
}

li {
  margin-bottom: 8px;
  line-height: 1.5;
}

.back-link {
  text-align: center;
  margin-top: 40px;
}

.back-btn {
  display: inline-block;
  background: #e74c3c;
  color: white;
  padding: 12px 30px;
  text-decoration: none;
  border-radius: 25px;
  transition: background 0.3s ease;
}

.back-btn:hover {
  background: #c0392b;
}

@media (max-width: 768px) {
  .terms-of-service {
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
