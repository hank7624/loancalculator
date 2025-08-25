<template>
  <div class="articles-container">
    <div class="header">
      <h2>📰 專欄文章</h2>
      <p class="subtitle">最新金融政策解析與貸款知識分享</p>
    </div>

    <!-- 文章列表 -->
    <div class="articles-list">
      <div 
        v-for="article in articles" 
        :key="article.id" 
        class="article-item"
        @click="selectArticle(article)"
      >
        <div class="article-header">
          <h3>{{ article.title }}</h3>
          <div class="article-meta">
            <span class="date">{{ article.date }}</span>
            <span class="category">{{ article.category }}</span>
          </div>
        </div>
        <div class="article-preview">
          <p>{{ article.preview }}</p>
        </div>
        <div class="read-more">
          <span class="read-more-text">點擊閱讀全文 →</span>
        </div>
      </div>
    </div>

    <!-- 文章詳情彈出層 -->
    <div v-if="selectedArticle" class="article-modal-overlay" @click="closeArticle">
      <div class="article-modal-content" @click.stop>
        <button class="modal-close" @click="closeArticle">&times;</button>
        
        <div class="article-detail">
          <h2>{{ selectedArticle.title }}</h2>
          <div class="article-meta">
            <span class="source">{{ selectedArticle.source }}</span>
            <span class="date">{{ selectedArticle.date }}</span>
          </div>
          
          <div class="article-content">
            <div v-for="(paragraph, index) in selectedArticle.content" :key="index">
              <p>{{ paragraph }}</p>
            </div>
          </div>

          <div v-if="selectedArticle.keyPoints" class="key-points">
            <h4>📋 重點摘要</h4>
            <ul>
              <li v-for="(point, index) in selectedArticle.keyPoints" :key="index">
                {{ point }}
              </li>
            </ul>
          </div>

          <div v-if="selectedArticle.expertAdvice" class="expert-advice">
            <h4>💡 專家建議</h4>
            <ol>
              <li v-for="(advice, index) in selectedArticle.expertAdvice" :key="index">
                {{ advice }}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Articles',
  setup() {
    const selectedArticle = ref(null)
    
    const articles = ref([
      {
        id: 1,
        title: '央行宣布升息半碼！一文看決策重點',
        date: '2024/03/21',
        category: '央行政策',
        source: '中央社記者潘姿羽、蘇思云',
        preview: '中央銀行今天理監事會決議升息半碼，跌破市場眼鏡，背後考量是憂心電價擬於4月調漲，所引發的通膨預期效應...',
        content: [
          '中央銀行今天理監事會決議升息半碼，跌破市場眼鏡，背後考量是憂心電價擬於4月調漲，所引發的通膨預期效應，總裁楊金龍直言，為了抑制通膨預期，這是「合理的決定」。當歐美關注降息時機點，台灣央行維持貨幣緊縮路線，後續是否連2升，彙整關鍵問答一次看懂。',
          '中央銀行今天舉行今年首場理監事會議，決議升息半碼，展現打擊通膨預期決心。重貼現率、擔保放款融通利率及短期融通利率各調升0.125個百分點，分別由年息1.875%、2.25%及4.125%調整為2%、2.375%及4.25%，自3月22日起實施。',
          '對於升息半碼的結果，楊金龍不諱言，相信這讓大家很surprise，但考量台灣通膨率偏高已經維持較長時間，可能加劇通膨預期，讓政府更難對付通膨，「預防性升息」有其必要。'
        ],
        keyPoints: [
          '重貼現率調升0.125%至2%',
          '擔保放款融通利率調升至2.375%',
          '短期融通利率調升至4.25%',
          '自3月22日起實施'
        ],
        expertAdvice: [
          '關注後續是否連續升息',
          '評估對房貸、信貸的影響',
          '提前做好財務規劃準備'
        ]
      },
      {
        id: 2,
        title: '央行升息與降息，對貸款族的影響有哪些？',
        date: '2024/03/20',
        category: '貸款知識',
        source: '金融專家分析',
        preview: '央行貨幣政策調整直接影響銀行利率，進而影響貸款族群的還款負擔。升息時，房貸、信貸利率會跟著調升...',
        content: [
          '央行貨幣政策調整直接影響銀行利率，進而影響貸款族群的還款負擔。升息時，房貸、信貸利率會跟著調升，每月還款金額增加；降息時則相反，還款負擔減輕。本文詳細分析升息降息對不同類型貸款族的具體影響，以及應對策略。',
          '升息對房貸族的影響最為明顯，以貸款1000萬元、30年期為例，利率每調升0.125%，月付金額約增加1,000-2,000元，年付金額增加12,000-24,000元。',
          '信貸族雖然貸款金額較小，但利率調升仍會增加總利息支出，影響個人現金流。車貸族影響相對較小，但也要注意月付金額的增加。'
        ],
        keyPoints: [
          '房貸族：升息0.125%約增加月付金額1,000-2,000元',
          '信貸族：利率調升會增加總利息支出',
          '車貸族：月付金額增加，但影響相對較小',
          '應對策略：可考慮轉貸、提前還款或調整還款方式'
        ],
        expertAdvice: [
          '定期檢視貸款合約，了解利率調整機制',
          '評估轉貸成本與效益，選擇最適合的方案',
          '建立緊急預備金，因應利率調升的還款壓力',
          '關注央行政策動向，提前做好財務規劃'
        ]
      },
      {
        id: 3,
        title: '2024年房貸利率趨勢分析與預測',
        date: '2024/03/19',
        category: '房貸資訊',
        source: '房市專家評論',
        preview: '2024年台灣房貸市場面臨諸多挑戰，包括央行貨幣政策、通膨壓力、經濟成長等因素影響...',
        content: [
          '2024年台灣房貸市場面臨諸多挑戰，包括央行貨幣政策、通膨壓力、經濟成長等因素影響。本文分析當前房貸利率趨勢，並對未來發展進行預測。',
          '目前五大銀行新承作房貸利率約在2.1%-2.3%之間，較去年有所上升。主要受到央行升息政策影響，各銀行紛紛調升房貸利率。',
          '預期2024年下半年，如果通膨壓力持續，央行可能維持緊縮貨幣政策，房貸利率仍有上調空間。建議購屋族提前做好財務規劃。'
        ],
        keyPoints: [
          '五大銀行新承作房貸利率約2.1%-2.3%',
          '較去年有所上升，主要受央行升息影響',
          '下半年利率仍有上調空間',
          '建議購屋族提前做好財務規劃'
        ],
        expertAdvice: [
          '鎖定固定利率方案',
          '評估還款能力，預留利率上調空間',
          '比較不同銀行方案，選擇最優惠利率',
          '考慮提前還款或轉貸時機'
        ]
      },
      {
        id: 4,
        title: '信貸申請指南｜貸款條件有哪些？',
        date: '2024/03/18',
        category: '信貸指南',
        source: '金融專家整理',
        preview: '信用貸款是許多人解決資金需求的首選，但你知道申請信貸需要符合哪些條件嗎？本文詳細解析信貸申請的4大基本條件、常見雷點及加分技巧...',
        content: [
          '信用貸款是許多人解決資金需求的首選，但你知道申請信貸需要符合哪些條件嗎？本文詳細解析信貸申請的4大基本條件、常見雷點及加分技巧，幫助您順利通過信貸審核。',
          '針對臺灣的信貸申請條件，符合以下銀行的4大基本條件就可申請信用貸款：滿20歲以上的中華民國國民、收入財務狀況穩定、具正常還款能力且信用紀錄良好、現職工作至少任滿3個月以上。',
          '不過，有些貸款產品會針對特定族群進行設計，就會有特別的任職產業要求、服務單位、年資等等限制，因此建議申貸前需先詳細了解各家銀行貸款條件，確保自身的權益。'
        ],
        keyPoints: [
          '年齡要求：年滿20歲至65歲，滿18歲以上已婚者可負擔完全行為能力',
          '工作年資：現職任滿3個月以上，多數銀行要求6-12個月以上',
          '自營商要求：經營時間滿半年以上，公司營業執照滿1年以上',
          '財力證明：需提供薪資轉帳、扣繳憑單、勞保明細等證明'
        ],
        expertAdvice: [
          '申貸前詳細了解各家銀行貸款條件，確保自身權益',
          '準備完整的財力證明，有效提升借貸成功率',
          '避免DBR超過22倍、月負債比超過70%',
          '維持良好信用紀錄，準時還款繳信用卡帳單'
        ]
      }
    ])

    const selectArticle = (article) => {
      selectedArticle.value = article
    }

    const closeArticle = () => {
      selectedArticle.value = null
    }

    return {
      articles,
      selectedArticle,
      selectArticle,
      closeArticle
    }
  }
}
</script>

<style scoped>
.articles-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h2 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 2.2em;
}

.subtitle {
  color: white;
  font-size: 1.1em;
}

.articles-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.article-item {
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.article-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.15);
}

.article-header h3 {
  color: #2c3e50;
  font-size: 1.5em;
  margin-bottom: 10px;
  line-height: 1.4;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 0.9em;
  color: #666;
}

.date {
  font-style: italic;
}

.category {
  background: #3498db;
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
  font-weight: 500;
}

.article-preview p {
  color: #555;
  line-height: 1.7;
  margin-bottom: 15px;
  font-size: 1em;
}

.read-more {
  text-align: right;
}

.read-more-text {
  color: #3498db;
  font-weight: 500;
  font-size: 0.9em;
}

.article-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.article-modal-content {
  background: white;
  border-radius: 15px;
  padding: 30px;
  width: 90%;
  max-width: 800px;
  max-height: 90%;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 10px 40px rgba(0,0,0,0.3);
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5em;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  transition: background-color 0.2s ease;
}

.modal-close:hover {
  background: #c0392b;
}

.article-detail h2 {
  color: #2c3e50;
  font-size: 2em;
  margin-bottom: 15px;
  line-height: 1.3;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 0.9em;
  color: #666;
}

.source {
  font-style: italic;
}

.article-content p {
  color: #333;
  line-height: 1.8;
  margin-bottom: 20px;
  font-size: 1.1em;
}

.key-points, .expert-advice {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  margin: 20px 0;
  border-left: 4px solid #3498db;
}

.key-points h4, .expert-advice h4 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.1em;
}

.key-points ul, .expert-advice ol {
  color: #555;
  line-height: 1.8;
  padding-left: 20px;
}

.key-points li, .expert-advice li {
  margin-bottom: 8px;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .articles-container {
    padding: 15px;
  }
  
  .articles-list {
    grid-template-columns: 1fr;
  }

  .article-item {
    padding: 20px;
  }

  .article-modal-content {
    padding: 20px;
    width: 95%;
  }

  .header h2 {
    font-size: 1.8em;
  }
  
  .article-header h3 {
    font-size: 1.3em;
  }
  
  .category-tags {
    justify-content: center;
  }
}
</style>
