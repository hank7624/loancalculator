<template>
    <div class="credit-calculator">
      <h2>信貸/車貸計算器</h2>
      
      <div class="calculator-form">
        <div class="form-group">
          <label for="loanAmount">貸款金額</label>
          <div class="input-container">
            <input
              id="loanAmount"
              v-model.number="formData.loanAmount"
              type="number"
              min="1"
              max="99999999"
              placeholder="請輸入貸款金額"
              @input="validateInput"
            />
            <span class="unit">元</span>
          </div>
          <div class="error-message" v-if="errors.loanAmount">
            {{ errors.loanAmount }}
          </div>
        </div>
  
        <div class="form-group">
          <label for="annualRate">年利率 (%)</label>
          <div class="input-container">
            <input
              id="annualRate"
              v-model.number="formData.annualRate"
              type="number"
              min="0.01"
              max="999.99"
              step="0.01"
              placeholder="請輸入年利率"
              @input="validateInput"
            />
            <span class="unit">%</span>
          </div>
          <div class="error-message" v-if="errors.annualRate">
            {{ errors.annualRate }}
          </div>
        </div>
  
        <div class="form-group">
          <label for="loanTerm">還款期數</label>
          <div class="input-container">
            <input
              id="loanTerm"
              v-model.number="formData.loanTerm"
              type="number"
              min="1"
              max="600"
              placeholder="請輸入還款期數"
              @input="validateInput"
          />
            <span class="unit">期</span>
          </div>
          <div class="error-message" v-if="errors.loanTerm">
            {{ errors.loanTerm }}
          </div>
        </div>
  
        <div class="form-group">
          <label>計算方式</label>
          <div class="radio-group">
            <label class="radio-label">
              <input
                type="radio"
                v-model="formData.calculationMethod"
                value="equal-payment"
                name="calculationMethod"
              />
              <span>本息平均攤還 (銀行常用)</span>
            </label>
            <label class="radio-label">
              <input
                type="radio"
                v-model="formData.calculationMethod"
                value="equal-principal"
                name="calculationMethod"
              />
              <span>本金平均攤還</span>
            </label>
          </div>
        </div>
  
        <button 
          class="calculate-btn"
          @click="calculateLoan"
          :disabled="!isFormValid"
        >
          計算貸款
        </button>
      </div>
  
      <!-- 計算結果 -->
      <div v-if="calculationResult" class="calculation-result">
        <h3>計算結果</h3>
        <div class="result-grid">
          <div class="result-item">
            <span class="result-label">月付金</span>
            <span class="result-value">{{ formatCurrency(calculationResult.monthlyPayment) }}</span>
          </div>
          <div class="result-item">
            <span class="result-label">總利息</span>
            <span class="result-value">{{ formatCurrency(calculationResult.totalInterest) }}</span>
          </div>
          <div class="result-item">
            <span class="result-label">繳款總金額</span>
            <span class="result-value">{{ formatCurrency(calculationResult.totalPayment) }}</span>
          </div>
        </div>
  
        <!-- 還款明細表 -->
        <div class="payment-schedule">
          <h4>還款明細表 (全部期數)</h4>
          <div class="schedule-table">
            <table>
              <thead>
                <tr>
                  <th>期數</th>
                  <th>月付金</th>
                  <th>本金</th>
                  <th>利息</th>
                  <th>剩餘本金</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="payment in calculationResult.schedule" :key="payment.period">
                  <td>{{ payment.period }}</td>
                  <td>{{ formatCurrency(payment.payment) }}</td>
                  <td>{{ formatCurrency(payment.principal) }}</td>
                  <td>{{ formatCurrency(payment.interest) }}</td>
                  <td>{{ formatCurrency(payment.remainingBalance) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="print-section">
            <button class="print-btn" @click="printSchedule">
              🖨️ 列印還款明細表
            </button>
          </div>
        </div>
      </div>

    <!-- 新增：SEO與內容說明區塊 -->
    <section class="calculator-guide-section">
      <h3>信貸/車貸申請與計算指南</h3>
      
      <article class="guide-content">
        <h4>決定信貸利率的關鍵因素</h4>
        <p>銀行在核貸信用貸款或汽車貸款時，主要依據「5P原則」與聯徵中心（JCIC）的信用評分。若想爭取更低的利率（如 3% 以下）或更高的額度（如月薪 22 倍），建議維持良好的信用卡繳款紀錄、避免使用循環利息，並提供完整的財力證明（除薪轉外，定存、股票或房產皆可加分）。</p>
        
        <h4>本息平均攤還 vs 本金平均攤還</h4>
        <ul>
          <li><strong>本息平均攤還</strong>：最常見的還款方式。將本金與利息平均分攤到每一期，每月繳款金額固定，適合薪水固定的上班族，方便理財規劃。但初期繳款中利息佔比較高。</li>
          <li><strong>本金平均攤還</strong>：每月償還固定的本金，利息則隨剩餘本金減少而遞減。因此首期繳款金額最高，之後逐月遞減。優點是總利息支出較少，但初期資金壓力較大。</li>
        </ul>

        <h4>總費用年百分率 (APR) 是什麼？</h4>
        <p>許多銀行主打「前三期 0.1%」或超低開辦費，但魔鬼藏在細節裡。<strong>總費用年百分率 (Annual Percentage Rate, APR)</strong> 是將貸款期間的所有成本（開辦費、帳管費、手續費、多階段利率）均攤計算後的「實質年利率」。比較貸款方案時，請務必以 APR 為準，而非僅看最低的名目利率。</p>
      </article>

      <div class="faq-section">
        <h4>常見問題 (FAQ)</h4>
        <details>
          <summary>信貸額度最高可以貸多少？</summary>
          <p>依據金管會規定，無擔保債務總額不得超過平均月收入的 22 倍（DBR 22）。例如平均月薪 5 萬元，理論上限約 110 萬元。實際上銀行會依信用評分與負債比審核，通常落在 15~18 倍較為常見。</p>
        </details>
        <details>
          <summary>提前還款會有違約金嗎？</summary>
          <p>這取決於您簽署的合約是否為「綁約」方案。綁約方案通常利率較優惠，但若在綁約期（常見為 1 年或 1.5 年）內提前清償，需支付 3%~4% 不等的違約金。建議在申辦前確認清楚。</p>
        </details>
        <details>
          <summary>車貸與信貸哪個利率比較低？</summary>
          <p>一般而言，優質信貸（如公教、百大企業）的利率通常低於一般車貸（約 2%~5% vs 3%~8%）。但若是一般融資公司的中古車貸，利率可能高達 8%~14%。建議先評估個人條件，優先申請銀行信貸。</p>
        </details>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

const formData = reactive({
  loanAmount: '',
  annualRate: '',
  loanTerm: '',
  calculationMethod: 'equal-payment'
})

const errors = reactive({
  loanAmount: '',
  annualRate: '',
  loanTerm: ''
})

const calculationResult = ref(null)

const isFormValid = computed(() => {
  return formData.loanAmount > 0 && 
         formData.annualRate > 0 && 
         formData.loanTerm > 0 &&
         !errors.loanAmount && 
         !errors.annualRate && 
         !errors.loanTerm
})

const validateInput = () => {
  // 驗證貸款金額
  if (formData.loanAmount < 1 || formData.loanAmount > 99999999) {
    errors.loanAmount = '貸款金額必須在 1 到 99,999,999 元之間'
  } else {
    errors.loanAmount = ''
  }

  // 驗證年利率
  if (formData.annualRate < 0.01 || formData.annualRate > 999.99) {
    errors.annualRate = '年利率必須在 0.01% 到 999.99% 之間'
  } else {
    errors.annualRate = ''
  }

  // 驗證還款期數
  if (formData.loanTerm < 1 || formData.loanTerm > 600) {
    errors.loanTerm = '還款期數必須在 1 到 600 期之間'
  } else {
    errors.loanTerm = ''
  }
}

const calculateLoan = () => {
  if (!isFormValid.value) return

  const principal = formData.loanAmount
  const monthlyRate = formData.annualRate / 100 / 12
  const totalPeriods = formData.loanTerm

  let monthlyPayment, totalInterest, totalPayment, schedule

  if (formData.calculationMethod === 'equal-payment') {
    // 本息平均攤還
    monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPeriods)) / 
                    (Math.pow(1 + monthlyRate, totalPeriods) - 1)
    
    // 生成還款明細
    schedule = generateEqualPaymentSchedule(principal, monthlyRate, totalPeriods, monthlyPayment)
    
    // 從明細表累積計算總利息和總付款，確保與明細表一致
    totalInterest = 0
    totalPayment = 0
    schedule.forEach(payment => {
      totalInterest += payment.interest
      totalPayment += payment.payment
    })
    
    // 更新月付金為四捨五入後的值（除了最後一期）
    monthlyPayment = schedule.length > 0 ? schedule[0].payment : monthlyPayment
  } else {
    // 本金平均攤還
    const monthlyPrincipal = principal / totalPeriods
    monthlyPayment = monthlyPrincipal + (principal * monthlyRate)
    
    totalInterest = 0
    schedule = generateEqualPrincipalSchedule(principal, monthlyRate, totalPeriods, monthlyPrincipal)
    
    // 計算總利息和總付款
    schedule.forEach(payment => {
      totalInterest += payment.interest
    })
    totalPayment = principal + totalInterest
  }

  calculationResult.value = {
    monthlyPayment,
    totalInterest,
    totalPayment,
    schedule
  }
}

const printSchedule = () => {
  if (!calculationResult.value) return
  
  const printWindow = window.open('', '_blank')
  const loanInfo = `
    <html>
      <head>
        <title>信貸還款明細表</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          table { border-collapse: collapse; width: 100%; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
          th { background-color: #f2f2f2; }
          .header { text-align: center; margin-bottom: 20px; }
          .summary { margin: 20px 0; }
          @media print { body { margin: 0; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>信貸還款明細表</h1>
          <p>貸款金額：${formatCurrency(formData.loanAmount)}</p>
          <p>年利率：${formData.annualRate}%</p>
          <p>還款期數：${formData.loanTerm}期</p>
          <p>計算方式：${formData.calculationMethod === 'equal-payment' ? '本息平均攤還' : '本金平均攤還'}</p>
        </div>
        <div class="summary">
          <p><strong>月付金：${formatCurrency(calculationResult.value.monthlyPayment)}</strong></p>
          <p><strong>總利息：${formatCurrency(calculationResult.value.totalInterest)}</strong></p>
          <p><strong>繳款總金額：${formatCurrency(calculationResult.value.totalPayment)}</strong></p>
        </div>
        <table>
          <thead>
            <tr>
              <th>期數</th>
              <th>月付金</th>
              <th>本金</th>
              <th>利息</th>
              <th>剩餘本金</th>
            </tr>
          </thead>
          <tbody>
            ${calculationResult.value.schedule.map(payment => `
              <tr>
                <td>${payment.period}</td>
                <td>${formatCurrency(payment.payment)}</td>
                <td>${formatCurrency(payment.principal)}</td>
                <td>${formatCurrency(payment.interest)}</td>
                <td>${formatCurrency(payment.remainingBalance)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
    </html>
  `
  
  printWindow.document.write(loanInfo)
  printWindow.document.close()
  printWindow.focus()
  printWindow.print()
}
</script>

<style scoped>
/* 原有樣式保持不變，新增下方內容樣式 */
.credit-calculator { max-width: 800px; margin: 0 auto; padding: 20px; }
.calculator-form { background: #fff; padding: 25px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 30px; }
.form-group { margin-bottom: 20px; }
label { display: block; margin-bottom: 8px; font-weight: 500; color: #2c3e50; }
.input-container { position: relative; display: flex; align-items: center; }
input, select { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 16px; transition: border-color 0.3s; }
input:focus, select:focus { border-color: #42b983; outline: none; }
.unit { position: absolute; right: 12px; color: #666; pointer-events: none; }
.radio-group { display: flex; gap: 20px; }
.radio-label { display: flex; align-items: center; gap: 8px; cursor: pointer; }
.calculate-btn { width: 100%; padding: 14px; background-color: #42b983; color: white; border: none; border-radius: 8px; font-size: 18px; font-weight: bold; cursor: pointer; transition: background-color 0.3s; margin-top: 10px; }
.calculate-btn:hover:not(:disabled) { background-color: #3aa876; }
.calculate-btn:disabled { background-color: #a8d5c2; cursor: not-allowed; }
.error-message { color: #e74c3c; font-size: 14px; margin-top: 5px; }

/* 結果區塊 */
.calculation-result { background: #f8fcfb; padding: 25px; border-radius: 12px; border: 1px solid #e0f2e9; margin-top: 30px; }
.result-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
.result-item { background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.03); text-align: center; }
.result-label { display: block; color: #666; font-size: 14px; margin-bottom: 5px; }
.result-value { display: block; color: #2c3e50; font-size: 20px; font-weight: bold; }
.payment-schedule { margin-top: 30px; }
.schedule-table { overflow-x: auto; margin-top: 15px; border-radius: 8px; border: 1px solid #eee; }
table { width: 100%; border-collapse: collapse; min-width: 600px; }
th, td { padding: 12px 15px; text-align: left; border-bottom: 1px solid #eee; }
th { background-color: #f1f8f5; font-weight: 600; color: #2c3e50; white-space: nowrap; }
tr:hover { background-color: #f9f9f9; }
.print-section { margin-top: 20px; text-align: center; }
.print-btn { background-color: #6c757d; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; transition: background 0.2s; }
.print-btn:hover { background-color: #5a6268; }

/* 新增：SEO內容區塊樣式 */
.calculator-guide-section { margin-top: 40px; padding-top: 30px; border-top: 2px solid #eee; }
.calculator-guide-section h3 { font-size: 1.5rem; color: #2c3e50; margin-bottom: 1.5rem; text-align: center; }
.guide-content { background: #fff; padding: 25px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); margin-bottom: 30px; }
.guide-content h4 { font-size: 1.2rem; color: #34495e; margin: 1.5rem 0 0.8rem; border-left: 4px solid #42b983; padding-left: 10px; }
.guide-content h4:first-child { margin-top: 0; }
.guide-content p { line-height: 1.7; color: #555; margin-bottom: 1rem; }
.guide-content ul { padding-left: 20px; margin-bottom: 1rem; }
.guide-content li { margin-bottom: 0.8rem; color: #555; line-height: 1.6; }

.faq-section { background: #fff; padding: 25px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
.faq-section h4 { font-size: 1.3rem; color: #2c3e50; margin-bottom: 1.2rem; }
details { margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 15px; }
details:last-child { border-bottom: none; }
summary { font-weight: 600; cursor: pointer; color: #2c3e50; font-size: 1.05rem; list-style: none; /* simple reset */ }
summary::-webkit-details-marker { display: none; }
summary::after { content: '+'; float: right; font-weight: bold; color: #42b983; }
details[open] summary::after { content: '-'; }
details p { margin-top: 12px; color: #666; line-height: 1.6; padding-left: 10px; border-left: 3px solid #eee; }

@media (max-width: 600px) {
  .result-grid { grid-template-columns: 1fr; }
  .radio-group { flex-direction: column; gap: 10px; }
  .credit-calculator { padding: 15px; }
  .calculator-form, .calculation-result { padding: 15px; }
}
</style>
  