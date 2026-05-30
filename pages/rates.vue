<template>
  <div class="bank-rate-comparison">
         <div class="header">
       <h2>🏦 銀行利率對比</h2>
       <p class="subtitle">即時對比各大銀行房貸、信貸利率，助您選擇最佳方案</p>
     </div>

    <!-- 筛选和排序控制 -->
    <div class="controls">
             <div class="control-group">
         <label>貸款類型：</label>
         <select v-model="selectedLoanType" @change="updateRates">
           <option value="mortgage">🏠 房貸</option>
           <option value="credit">💰 信貸</option>
         </select>
       </div>

       <div class="control-group">
         <label>排序方式：</label>
         <select v-model="sortOrder" @change="updateRates">
           <option value="asc">利率從低到高</option>
           <option value="desc">利率從高到低</option>
           <option value="name">按銀行名稱</option>
         </select>
       </div>


    </div>

    <!-- 利率统计信息 -->
    <div class="rate-stats">
      <div class="stat-card">
        <div class="stat-value">{{ rateRange.minRate }}%</div>
        <div class="stat-label">最低利率</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ rateRange.maxRate }}%</div>
        <div class="stat-label">最高利率</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ averageRate }}%</div>
        <div class="stat-label">平均利率</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ (rateRange.maxRate - rateRange.minRate).toFixed(3) }}%</div>
        <div class="stat-label">利率差距</div>
      </div>
    </div>

         <!-- 利率對比表格 -->
     <div class="rate-table-container">
      <table class="rate-table">
        <thead>
          <tr>
                     <th>銀行</th>
         <th>利率</th>
         <th>類型</th>
         <th>貸款額度</th>
         <th>備註</th>
         <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="bank in sortedRates" :key="bank.name" class="bank-row">
            <td class="bank-info">
              <span class="bank-logo">{{ bank.logo }}</span>
              <span class="bank-name">{{ bank.name }}</span>
            </td>
                         <td class="rate-value">
               <span class="rate-number">{{ bank.rate }}</span>
               <div class="rate-bar" :style="{ width: getRateBarWidth(bank.rate) + '%' }"></div>
             </td>
            <td class="rate-type">
              <span :class="['type-badge', getTypeClass(bank.type)]">
                {{ bank.type }}
              </span>
            </td>
                         <td class="loan-amount">
              <div class="amount-range">
                {{ selectedLoanType === 'credit' ? `最高${bank.maxAmount}` : bank.minAmount }}
              </div>
            </td>
                         <td class="rate-note">{{ bank.note }}</td>
             <td class="actions">
               <a 
                 :href="bank.website" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 class="bank-link-btn"
               >
                 前往官網
               </a>
             </td>
          </tr>
        </tbody>
      </table>
    </div>

    

         <!-- 更新信息 -->
     <div class="update-info">
       <div class="update-header">
         <h3>📅 利率更新資訊</h3>
         <p class="last-update">最後更新：{{ latestUpdate?.date || bankRates.lastUpdate }}</p>
       </div>
       
       <div v-if="latestUpdate" class="update-summary">
         <h4>最新更新 ({{ latestUpdate.version }})</h4>
         <p>{{ latestUpdate.summary }}</p>
         
         <div class="update-changes">
           <h5>主要變更：</h5>
           <div class="change-list">
             <div v-for="change in latestUpdate.changes.slice(0, 3)" :key="`${change.bank}-${change.type}`" class="change-item">
               <span class="bank-name">{{ change.bank }}</span>
               <span class="change-type">{{ change.type }}</span>
               <span class="rate-change" :class="getChangeClass(change.change)">
                 {{ formatChange(change.change) }}
               </span>
               <span class="change-reason">{{ change.reason }}</span>
             </div>
           </div>
         </div>
       </div>
       
       <div class="update-stats" v-if="rateChangeStats">
         <h5>更新統計：</h5>
         <div class="stats-grid">
           <div class="stat-item">
             <span class="stat-label">總變更次數</span>
             <span class="stat-value">{{ rateChangeStats.totalChanges }}</span>
           </div>
           <div class="stat-item">
             <span class="stat-label">平均變動</span>
             <span class="stat-value">{{ rateChangeStats.averageChange }}%</span>
           </div>
           <div class="stat-item">
             <span class="stat-label">調升次數</span>
             <span class="stat-value up">{{ rateChangeStats.increaseCount }}</span>
           </div>
           <div class="stat-item">
             <span class="stat-label">調降次數</span>
             <span class="stat-value down">{{ rateChangeStats.decreaseCount }}</span>
           </div>
         </div>
       </div>
       
       <div class="disclaimer">
         <p>⚠️ 注意：利率資料僅供參考，實際利率請以銀行公告為準</p>
         <p>💡 建議：聯繫銀行了解最新利率和申請條件</p>
         <p>🔄 更新頻率：每月檢查，重大政策變更時即時更新</p>
       </div>
     </div>

    
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { bankRates, getRatesByType, sortRatesByValue, getRateRange } from '~/assets/data/bankRates.js'
import { getLatestUpdate, getRateChangeStats } from '~/assets/data/rateUpdateLog.js'

export default {
  name: 'BankRateComparison',
  setup() {
         const selectedLoanType = ref('mortgage')
     const sortOrder = ref('asc')
     

         // 更新日誌相關
     const latestUpdate = ref(getLatestUpdate())
     const rateChangeStats = ref(getRateChangeStats())

     // 计算属性
     const rates = computed(() => getRatesByType(selectedLoanType.value))
     const rateRange = computed(() => getRateRange(selectedLoanType.value))
    
         const averageRate = computed(() => {
       const total = rates.value.reduce((sum, bank) => {
         let rateValue = bank.rate
         if (typeof bank.rate === 'string') {
           rateValue = parseFloat(bank.rate.replace(/[%起]/g, ''))
         }
         return sum + rateValue
       }, 0)
       return (total / rates.value.length).toFixed(2)
     })

    const sortedRates = computed(() => {
      let sorted = [...rates.value]
      
      if (sortOrder.value === 'asc') {
        sorted = sortRatesByValue(sorted, true)
      } else if (sortOrder.value === 'desc') {
        sorted = sortRatesByValue(sorted, false)
      } else if (sortOrder.value === 'name') {
        sorted.sort((a, b) => a.name.localeCompare(b.name))
      }
      
      return sorted
    })

    // 方法
    const updateRates = () => {
      // 触发重新计算
    }

         const getRateBarWidth = (rate) => {
       const min = rateRange.value.minRate
       const max = rateRange.value.maxRate
       
       // 提取利率數值（移除%和起字）
       let rateValue = rate
       if (typeof rate === 'string') {
         rateValue = parseFloat(rate.replace(/[%起]/g, ''))
       }
       
       return ((rateValue - min) / (max - min)) * 100
     }

    const getTypeClass = (type) => {
      const typeMap = {
        '固定': 'type-fixed',
        '浮动': 'type-floating',
        '混合': 'type-hybrid'
      }
      return typeMap[type] || 'type-default'
    }

         const formatAmount = (amount) => {
      console.log('formatAmount input:', amount, 'type:', typeof amount)
      if (amount >= 1000000) {
        // 直接除以10000，這樣 8000000 會變成 800萬
        const result = (amount / 10000).toFixed(0) + '萬'
        console.log('formatAmount result (萬):', result)
        return result
      } else if (amount >= 1000) {
        const result = (amount / 1000).toFixed(0) + 'K'
        console.log('formatAmount result (K):', result)
        return result
      }
      const result = amount.toString()
      console.log('formatAmount result (default):', result)
      return result
    }

     const getChangeClass = (change) => {
       if (change > 0) return 'up'
       if (change < 0) return 'down'
       return 'flat'
     }

     const formatChange = (change) => {
       if (change === null || change === undefined) return '-'
       const sign = change > 0 ? '+' : ''
       return `${sign}${change.toFixed(2)}%`
     }

    // 监听器
    watch([selectedLoanType, sortOrder], () => {
      updateRates()
    })

           return {
         bankRates,
         selectedLoanType,
         sortOrder,
         rates,
         rateRange,
         averageRate,
         sortedRates,
         updateRates,
         getRateBarWidth,
         getTypeClass,
         formatAmount,
         getChangeClass,
         formatChange,
         latestUpdate,
         rateChangeStats
       }
  }
}
</script>

<style scoped>
.bank-rate-comparison {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 30px;
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

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
  justify-content: center;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.control-group label {
  font-weight: bold;
  color: #2c3e50;
}

.control-group select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}



.rate-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border: 2px solid #e9ecef;
}

.stat-value {
  font-size: 2em;
  font-weight: bold;
  color: #3498db;
  margin-bottom: 8px;
}

.stat-label {
  color: #666;
  font-size: 0.9em;
}

.rate-table-container {
  background: white;
  border-radius: 10px;
  overflow-x: auto; /* 添加水平滾動 */
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 30px;
  -webkit-overflow-scrolling: touch; /* iOS 平滑滾動 */
}

.rate-table {
  width: 100%;
  border-collapse: collapse;
}

.rate-table th {
  background: #2c3e50;
  color: white;
  padding: 15px;
  text-align: left;
  font-weight: 600;
}

.rate-table td {
  padding: 15px;
  border-bottom: 1px solid #e9ecef;
}

.bank-row:hover {
  background: #f8f9fa;
}

.bank-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.bank-logo {
  font-size: 1.5em;
}

.bank-name {
  font-weight: 600;
  color: #2c3e50;
}

.rate-value {
  position: relative;
}

.rate-number {
  font-size: 1.2em;
  font-weight: bold;
  color: #e74c3c;
}

.rate-bar {
  height: 4px;
  background: #3498db;
  border-radius: 2px;
  margin-top: 5px;
  transition: width 0.3s ease;
}

.rate-type {
  text-align: center;
}

.type-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8em;
  font-weight: 600;
}

.type-fixed {
  background: #e8f5e8;
  color: #27ae60;
}

.type-floating {
  background: #fff3cd;
  color: #f39c12;
}

.type-hybrid {
  background: #e3f2fd;
  color: #2196f3;
}

 .loan-amount {
   text-align: center;
   color: #666;
   font-size: 0.9em;
 }

 .actions {
   text-align: center;
 }

 .bank-link-btn {
   display: inline-block;
   background: #27ae60;
   color: white;
   text-decoration: none;
   padding: 6px 12px;
   border-radius: 6px;
   font-size: 0.8em;
   transition: all 0.3s ease;
   border: none;
   cursor: pointer;
 }

 .bank-link-btn:hover {
   background: #229954;
   transform: translateY(-2px);
   box-shadow: 0 4px 8px rgba(0,0,0,0.2);
 }

 .bank-link-btn:active {
   transform: translateY(0);
   box-shadow: 0 2px 4px rgba(0,0,0,0.2);
 }





.update-info {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 10px;
  padding: 20px;
  margin-top: 30px;
}

.update-info p {
  margin: 5px 0;
  color: #856404;
}



/* 响应式设计 */
@media (max-width: 768px) {
  .controls {
    flex-direction: column;
    align-items: center;
  }
  
  .rate-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .rate-table {
    font-size: 14px;
    min-width: 600px; /* 設置最小寬度，確保內容完整顯示 */
  }
  
  .rate-table th,
  .rate-table td {
    padding: 10px 8px;
    white-space: nowrap; /* 防止文字換行 */
  }
  
  .bank-logo {
    font-size: 1.2em;
  }
  
  /* 手機直立式優化 */
  .rate-table-container {
    margin: 0 -15px 30px -15px; /* 負邊距，讓滾動區域更寬 */
    border-radius: 0; /* 手機上移除圓角 */
  }
  
  /* 添加滾動提示 */
  .rate-table-container::after {
    content: '← 左右滑動查看更多 →';
    display: block;
    text-align: center;
    padding: 10px;
    color: #666;
    font-size: 12px;
    background: #f8f9fa;
    border-top: 1px solid #e9ecef;
  }
}
</style>
