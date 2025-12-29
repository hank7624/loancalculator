<template>
  <div class="loan-knowledge">
    <div class="content-container">
      <h1>貸款知識</h1>
      <p class="subtitle">專業的貸款知識分享，幫助您做出明智的理財決策</p>
      
      <!-- 房貸 vs 信貸差異 -->
      <section class="knowledge-section">
        <h2>🏠 房貸 vs 💰 信貸差異比較</h2>
        
        <div class="comparison-table">
          <div class="table-header">
            <div class="header-item">比較項目</div>
            <div class="header-item">房貸</div>
            <div class="header-item">信貸</div>
          </div>
          
          <div class="table-row">
            <div class="row-item">貸款金額</div>
            <div class="row-item">通常較大 (數百萬至數千萬)</div>
            <div class="row-item">通常較小 (數萬至數百萬)</div>
          </div>
          
          <div class="table-row">
            <div class="row-item">貸款期限</div>
            <div class="row-item">較長 (20-30年)</div>
            <div class="row-item">較短 (1-7年)</div>
          </div>
          
          <div class="table-row">
            <div class="row-item">利率</div>
            <div class="row-item">較低 (1.5-3%)</div>
            <div class="row-item">較高 (3-15%)</div>
          </div>
          
          <div class="table-row">
            <div class="row-item">擔保品</div>
            <div class="row-item">房屋本身</div>
            <div class="row-item">通常無擔保</div>
          </div>
          
          <div class="table-row">
            <div class="row-item">用途限制</div>
            <div class="row-item">購屋專用</div>
            <div class="row-item">用途較彈性</div>
          </div>
          
          <div class="table-row">
            <div class="row-item">審核標準</div>
            <div class="row-item">較嚴格</div>
            <div class="row-item">較寬鬆</div>
          </div>
        </div>
      </section>

      <!-- 計算案例 -->
      <section class="knowledge-section">
        <h2>📊 實際計算案例</h2>
        
        <div class="case-studies">
          <!-- 房貸案例 -->
          <div class="case-study">
            <h3>🏠 房貸計算案例</h3>
            <div class="case-details">
              <p><strong>貸款金額：</strong>800萬元</p>
              <p><strong>貸款年限：</strong>30年</p>
              <p><strong>年利率：</strong>2.5%</p>
              <p><strong>還款方式：</strong>本息平均攤還</p>
            </div>
            <div class="case-result">
              <p><strong>月付金：</strong>31,600元</p>
              <p><strong>總利息：</strong>337萬元</p>
              <p><strong>總還款：</strong>1,137萬元</p>
            </div>
            <div class="case-tip">
              <p>💡 <strong>小貼士：</strong>房貸利率較低，但總利息金額龐大，建議提前還款以節省利息支出。</p>
            </div>
          </div>

          <!-- 信貸案例 -->
          <div class="case-study">
            <h3>💰 信貸計算案例</h3>
            <div class="case-details">
              <p><strong>貸款金額：</strong>50萬元</p>
              <p><strong>貸款年限：</strong>5年</p>
              <p><strong>年利率：</strong>8%</p>
              <p><strong>還款方式：</strong>本息平均攤還</p>
            </div>
            <div class="case-result">
              <p><strong>月付金：</strong>10,140元</p>
              <p><strong>總利息：</strong>10.8萬元</p>
              <p><strong>總還款：</strong>60.8萬元</p>
            </div>
            <div class="case-tip">
              <p>💡 <strong>小貼士：</strong>信貸利率較高，建議短期使用，避免長期負擔高額利息。</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 貸款知識文章 -->
      <section class="knowledge-section">
        <h2>📚 貸款知識文章</h2>
        
        <div class="articles">
          <article class="article">
            <h3>🎯 如何選擇適合的貸款方式？</h3>
            <p>選擇貸款方式時，需要考慮以下幾個因素：</p>
            <ul>
              <li><strong>資金需求：</strong>評估實際需要的金額，避免過度借貸</li>
              <li><strong>還款能力：</strong>計算月收入與支出的比例，確保還款無虞</li>
              <li><strong>利率比較：</strong>貨比三家，選擇最優惠的利率方案</li>
              <li><strong>還款期限：</strong>根據資金用途和還款能力選擇合適期限</li>
            </ul>
          </article>

          <article class="article">
            <h3>💡 提前還款的優缺點分析</h3>
            <p><strong>優點：</strong></p>
            <ul>
              <li>節省總利息支出</li>
              <li>減輕心理負擔</li>
              <li>提高信用評分</li>
            </ul>
            <p><strong>缺點：</strong></p>
            <ul>
              <li>可能產生提前還款手續費</li>
              <li>失去資金流動性</li>
              <li>錯失其他投資機會</li>
            </ul>
          </article>

          <article class="article">
            <h3>🔍 貸款審核的關鍵因素</h3>
            <p>銀行審核貸款時，主要考慮以下因素：</p>
            <ul>
              <li><strong>信用記錄：</strong>過往的還款記錄和信用評分</li>
              <li><strong>收入穩定性：</strong>工作性質、年資和收入水平</li>
              <li><strong>負債比例：</strong>現有負債與收入的比例</li>
              <li><strong>擔保品：</strong>是否有足夠的擔保或抵押</li>
            </ul>
          </article>
        </div>
      </section>

      <div class="back-link">
        <router-link to="/" class="back-btn">返回首頁</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoanKnowledge'
}
</script>

<style scoped>
.loan-knowledge {
  max-width: 1000px;
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

.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 40px;
  font-size: 1.2em;
}

.knowledge-section {
  margin-bottom: 50px;
}

h2 {
  color: #2c3e50;
  border-bottom: 3px solid #9b59b6;
  padding-bottom: 15px;
  margin-bottom: 30px;
  font-size: 1.8em;
}

h3 {
  color: #34495e;
  margin-bottom: 20px;
  font-size: 1.4em;
}

/* 比較表格樣式 */
.comparison-table {
  border: 2px solid #e9ecef;
  border-radius: 10px;
  overflow: hidden;
  margin: 20px 0;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background: #9b59b6;
  color: white;
  font-weight: bold;
}

.header-item {
  padding: 15px;
  text-align: center;
  border-right: 1px solid #e9ecef;
}

.header-item:last-child {
  border-right: none;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-bottom: 1px solid #e9ecef;
}

.table-row:nth-child(even) {
  background: #f8f9fa;
}

.row-item {
  padding: 15px;
  text-align: center;
  border-right: 1px solid #e9ecef;
  line-height: 1.5;
}

.row-item:last-child {
  border-right: none;
}

.row-item:first-child {
  font-weight: bold;
  background: #f1f3f4;
}

/* 案例研究樣式 */
.case-studies {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
  margin: 20px 0;
}

.case-study {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 10px;
  padding: 25px;
}

.case-details, .case-result {
  margin: 20px 0;
  padding: 15px;
  background: white;
  border-radius: 8px;
  border-left: 4px solid #9b59b6;
}

.case-result {
  background: #e8f5e8;
  border-left-color: #27ae60;
}

.case-tip {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
  padding: 15px;
  margin-top: 20px;
}

.case-tip p {
  color: #856404;
  margin: 0;
}

/* 文章樣式 */
.articles {
  display: grid;
  gap: 30px;
}

.article {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 10px;
  padding: 25px;
}

.article h3 {
  color: #9b59b6;
  border-bottom: 2px solid #9b59b6;
  padding-bottom: 10px;
}

.article ul {
  margin-left: 20px;
  color: #555;
}

.article li {
  margin-bottom: 8px;
  line-height: 1.5;
}

.back-link {
  text-align: center;
  margin-top: 40px;
}

.back-btn {
  display: inline-block;
  background: #9b59b6;
  color: white;
  padding: 12px 30px;
  text-decoration: none;
  border-radius: 25px;
  transition: background 0.3s ease;
}

.back-btn:hover {
  background: #8e44ad;
}

@media (max-width: 768px) {
  .loan-knowledge {
    margin: 10px;
    padding: 15px;
  }
  
  .content-container {
    padding: 20px;
  }
  
  h1 {
    font-size: 2em;
  }
  
  .case-studies {
    grid-template-columns: 1fr;
  }
  
  .table-header,
  .table-row {
    grid-template-columns: 1fr;
  }
  
  .header-item,
  .row-item {
    border-right: none;
    border-bottom: 1px solid #e9ecef;
  }
}
</style>
