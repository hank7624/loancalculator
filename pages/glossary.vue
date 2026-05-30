<template>
  <div class="glossary-page">
    <div v-if="error" class="error-box">
      <h3>❌ 程式碼執行錯誤：</h3>
      <p>{{ error }}</p>
    </div>

    <div v-else>
      <div class="glossary-title-area">
        <h2>📘 貸款名詞百科</h2>
        <p class="subtitle">收錄 50+ 專業金融術語，助您看懂所有貸款合約</p>
      </div>

      <!-- 快速搜索 -->
      <div class="glossary-search-container">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="搜尋名詞或關鍵字 (例如: DBR, 寬限期...)"
          class="glossary-search-input"
        >
      </div>

      <!-- 分類過濾 -->
      <div class="glossary-filters">
        <button 
          v-for="cat in categories" 
          :key="cat"
          class="gls-filter-btn"
          :class="{ active: currentCategory === cat }"
          @click="currentCategory = cat"
        >
          {{ cat }}
        </button>
      </div>

      <div class="glossary-grid">
        <div 
          v-for="item in filteredTerms" 
          :key="item.term" 
          class="gls-card"
        >
          <div class="gls-card-header">
            <h3>{{ item.term }}</h3>
            <span class="gls-tag">{{ item.category }}</span>
          </div>
          <div class="gls-card-body">
            <p>{{ item.definition }}</p>
          </div>
        </div>
        
        <div v-if="filteredTerms && filteredTerms.length === 0" class="no-results">
          找不到相關的詞條，請嘗試其他關鍵字。
        </div>
      </div>
    </div>

    <div class="footer-back">
      <NuxtLink to="/" class="btn-back">返回首頁</NuxtLink>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

export default {
  name: 'LoanGlossary',
  setup() {
    const error = ref(null)
    const searchQuery = ref('')
    const currentCategory = ref('全部')
    const categories = ['全部', '貸款種類', '利率與費用', '還款方式', '信用與法律', '財理專用']

    const terms = ref([
      // 貸款種類
      { term: '信用貸款 (Personal Loan)', category: '貸款種類', definition: '不需提供擔保品（如房子、土地），純粹以此人之信用、收入作為還款保障的貸款。' },
      { term: '房屋貸款 (Mortgage)', category: '貸款種類', definition: '提供不動產作為抵押，向銀行借入大額資金。通常利率低、期限長。' },
      { term: '汽車貸款 (Car Loan)', category: '貸款種類', definition: '提供汽車作為抵押權設定的貸款。包含新車貸、中古車貸、原車融資等。' },
      { term: '二胎房貸 (Second Mortgage)', category: '貸款種類', definition: '在房屋已有第一順位抵押權（原房貸）的情況下，再次設定第二順位抵押權進行借款。' },
      { term: '房屋增貸 (Refinance Add-on)', category: '貸款種類', definition: '在房貸已部分償還後，向原銀行申請就已還款的額度內再次借出資金。' },
      { term: '政策性貸款 (Policy Loan)', category: '貸款種類', definition: '由政府提供利息補貼或保險，針對特定族群（如首購族、青年、勞工）提供的低利貸款。' },
      { term: '逆向抵押貸款 (以房養老)', category: '貸款種類', definition: '屋主將房子抵押給銀行，銀行按月撥付養老金，長輩身故後銀行再處分房子償還。' },
      { term: '企業貸款', category: '貸款種類', definition: '提供公司法人、小規模商業、負責人進行營運、週轉、擴張設備等用途的貸款。' },
      { term: '融資公司貸款', category: '貸款種類', definition: '非銀行體系的金融機構（如中租、裕融、和潤）提供的貸款，審核通常較銀行寬鬆。' },
      { term: '勞工貸款', category: '貸款種類', definition: '由政府勞動部辦理的低利紓困或週轉貸款，通常有特定的申請資格限制。' },
      
      // 利率與費用
      { term: '年百分率 (APR)', category: '利率與費用', definition: '計算貸款成本的真實利率，包含名目利率及手續費、帳管費等所有開辦成本。' },
      { term: '機動利率 (Floating Rate)', category: '利率與費用', definition: '隨銀行定儲利率指數（基準利率）調整而變動的利率。' },
      { term: '固定利率 (Fixed Rate)', category: '利率與費用', definition: '在約定期間內，無論市場如何變動，貸款利率維持固定不變。' },
      { term: '基準利率 (Index Rate)', category: '利率與費用', definition: '銀行用來作為放款利率基礎的指數，通常參考十大行庫的一年或兩年期定儲平均利率。' },
      { term: '加碼利率', category: '利率與費用', definition: '銀行依據申貸人的信用、風險評等，在基準利率之上額外增加的固定趴數。' },
      { term: '開辦費', category: '利率與費用', definition: '向銀行申請貸款時需支付的一次性手續費，包含徵信費、帳管費等。' },
      { term: '徵信費', category: '利率與費用', definition: '銀行向聯徵中心查詢或進行內部徵信審核時所產生的作業費用。' },
      { term: '動保設定費', category: '利率與費用', definition: '汽車貸款時，向監理站設定動產擔保抵押權所需的行政規費。' },
      { term: '違約金 (Prepayment Penalty)', category: '利率與費用', definition: '在合約約定的限制清償期間（綁約期）內提前清償全部或部分本金所產生的費用。' },
      { term: '循環利息', category: '利率與費用', definition: '針對信用卡未繳清餘額，按日計算的高額利息（通常 5%~15%）。' },

      // 還款方式
      { term: '本息平均攤還', category: '還款方式', definition: '將本金與總利息平均分配在各期，每期繳納固定金額。前期利息多，後期本金多。' },
      { term: '本金平均攤還', category: '還款方式', definition: '每期償還固定本金，利息依剩餘本金逐月減少，因此每期月付金會隨時間遞減。' },
      { term: '寬限期 (Grace Period)', category: '還款方式', definition: '寬限期內「只繳利息、不還本金」。結束後，剩餘本金需在剩餘年限內歸還。' },
      { term: '限制清償期間 (綁約期)', category: '還款方式', definition: '合約規定不得提前結清。若提前結清需繳納違約金，通常為 1~3 年。' },
      { term: '到期一次還本', category: '還款方式', definition: '平時只繳息，合約到期（如 1 年後）再一次償還整筆本金。常見於理財型房貸或二胎。' },
      { term: '遞增型還款', category: '還款方式', definition: '隨著還款年限增加，每月繳款金額也隨之遞增，適合預期未來收入會增加的人。' },
      { term: '彈性繳款', category: '還款方式', definition: '允許借款人根據自身財務狀況，在特定條件下調整每期還款金額。' },
      { term: '部分還款', category: '還款方式', definition: '在合約期間內，額外投入資金償還部分本金，以減少利息並縮短期限。' },
      { term: '理財型房貸 (隨借隨還)', category: '還款方式', definition: '已償還的房貸本金轉為循環額度，有撥款才計息，不撥款不計息，適合靈活週轉。' },
      { term: '攤還年限', category: '還款方式', definition: '貸款從撥款到還清所需的總時間，常見房貸為 20、30 或 40 年。' },

      // 信用與法律
      { term: '聯徵紀錄 (Credit Report)', category: '信用與法律', definition: '聯徵中心記錄之全台個人與各金融機構間的借貸、信用卡及還款往來紀錄。' },
      { term: '信用分數 (Credit Score)', category: '信用與法律', definition: '依據聯徵資料計算的分數（200-800），反映信用風險的高低。' },
      { term: 'DBR 22 (負債比)', category: '信用與法律', definition: '銀行法規定，個人無擔保負債總額不得超過平均月薪的 22 倍。' },
      { term: '負債比 (Debt ratio)', category: '信用與法律', definition: '每月需償還的本息負擔佔每月可支配收入的比例。建議不高於 1/2。' },
      { term: '保證人 (Guarantor)', category: '信用與法律', definition: '當借款人無法履約時，負有代為清償責任的人，分為一般保證人與連帶保證人。' },
      { term: '先訴抗辯權', category: '信用與法律', definition: '一般保證人有的權利，要求債權銀行必須先執行完借款人財產後，才能找保人。' },
      { term: '抵押權 (Collateral)', category: '信用與法律', definition: '債權人對債務人提供的房地產、動產等享有的優先受償權利。' },
      { term: '查封 (Seizure/Foreclosure)', category: '信用與法律', definition: '因債務逾期未還，法院依法扣押債務人名下的財產，禁止其移轉。' },
      { term: '法拍 (Court Auction)', category: '信用與法律', definition: '遭查封的不動產由法院進行公開拍賣，所得款項用於還清債權人的債務。' },
      { term: '前置協商', category: '信用與法律', definition: '債務人無力償還時，正式向債權銀行尋求降低利率或展延期限的過程。' },

      // 財理專用
      { term: '存摺明細 (薪轉)', category: '財理專用', definition: '銀行評估收入穩定性的關鍵文件，包含近半年或一年的薪資入帳紀錄。' },
      { term: '扣繳憑單 (Income Statement)', category: '財理專用', definition: '申報所得稅用的收入憑證，反映上一年度的總所得，是重要財力證明。' },
      { term: '負債整合 (Consolidation)', category: '財理專用', definition: '申請一筆低息長期的貸款來還清多筆高息債務，降低月負擔。' },
      { term: '轉貸 (Refinance)', category: '財理專用', definition: '將現有房貸結清並轉移到另一家銀行，爭取更低利率或更長限期。' },
      { term: '鑑價 (Appraisal)', category: '財理專用', definition: '銀行委託專業人員，依據市價、路段、屋況評估抵押品的市場價值。' },
      { term: '核貸成數 (LTV)', category: '財理專用', definition: '銀行核准的貸款金額佔抵押品評估價值（或成交價）的比例。' },
      { term: '信用小白', category: '財理專用', definition: '指從未與銀行有信用往來、無信用卡紀錄的人，銀行難以評估其風險。' },
      { term: '收支比', category: '財理專用', definition: '衡量每個月的現金收入與還款支出的健康情況。' },
      { term: '自備款', category: '財理專用', definition: '購屋時除貸款外的首付款。通常為總房價的 20%~30%。' },
      { term: '寬限期試算', category: '財理專用', definition: '計算寬限期結束後跳升的月付金，以預防繳款壓力過大的過程。' }
    ])

    const filteredTerms = computed(() => {
      try {
        const s = searchQuery.value.toLowerCase().trim()
        return terms.value.filter(item => {
          const matchesSearch = !s || item.term.toLowerCase().includes(s) || 
                               item.definition.toLowerCase().includes(s)
          const matchesCategory = currentCategory.value === '全部' || item.category === currentCategory.value
          return matchesSearch && matchesCategory
        }).sort((a, b) => a.term.localeCompare(b.term))
      } catch (err) {
        error.value = '計算過濾時出錯: ' + err.message
        return []
      }
    })

    onMounted(() => {
    })

    return {
      error,
      searchQuery,
      currentCategory,
      categories,
      terms,
      filteredTerms
    }
  }
}
</script>

<style scoped>
.glossary-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 30px 20px;
  color: #333;
}

.error-box {
  background: #fff5f5;
  color: #c53030;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #feb2b2;
  margin: 20px 0;
}

.glossary-title-area {
  text-align: center;
  margin-bottom: 40px;
}

.glossary-title-area h2 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 10px;
}

.subtitle {
  color: #666;
  font-size: 1.1rem;
}

.glossary-search-container {
  margin-bottom: 30px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.glossary-search-input {
  width: 100%;
  padding: 14px 25px;
  border-radius: 30px;
  border: 2px solid #ddd;
  font-size: 1.1rem;
  outline: none;
  transition: all 0.3s;
}

.glossary-search-input:focus {
  border-color: #27ae60;
  box-shadow: 0 0 10px rgba(39, 174, 96, 0.1);
}

.glossary-filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 40px;
}

.gls-filter-btn {
  padding: 8px 18px;
  border-radius: 20px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
  color: #555;
  transition: all 0.2s;
}

.gls-filter-btn.active {
  background: #27ae60;
  color: white;
  border-color: #27ae60;
}

.glossary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px;
}

@media (max-width: 600px) {
  .glossary-grid {
    grid-template-columns: 1fr;
  }
}

.gls-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  border-left: 5px solid #27ae60;
}

.gls-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
}

.gls-card-header h3 {
  margin: 0;
  font-size: 1.25rem;
  color: #2c3e50;
}

.gls-tag {
  font-size: 0.8rem;
  background: #f0f0f0;
  padding: 2px 8px;
  border-radius: 4px;
}

.gls-card-body p {
  margin: 0;
  color: #555;
  line-height: 1.6;
}

.no-results {
  grid-column: 1 / -1;
  text-align: center;
  padding: 50px;
  color: #999;
}

.footer-back {
  text-align: center;
  margin-top: 50px;
}

.btn-back {
  display: inline-block;
  background: #27ae60;
  color: white;
  padding: 12px 30px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: bold;
}
</style>
