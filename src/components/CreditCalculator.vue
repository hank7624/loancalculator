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
    </div>
  </template>
  
  <script>
  import { ref, reactive, computed } from 'vue'
  
  export default {
    name: 'CreditCalculator',
    setup() {
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
  
      const generateEqualPaymentSchedule = (principal, monthlyRate, totalPeriods, monthlyPayment) => {
        const schedule = []
        let remainingBalance = principal
        const round = (x) => Math.round(x)
        const payRounded = round(monthlyPayment)

        for (let period = 1; period <= totalPeriods; period++) {
          const isLast = period === totalPeriods
          if (isLast) {
            const interest = round(remainingBalance * monthlyRate)
            const principalPayment = remainingBalance
            const payment = principalPayment + interest
            remainingBalance = 0
            schedule.push({
              period,
              payment,
              principal: principalPayment,
              interest,
              remainingBalance: 0
            })
            break
          }

          const interest = round(remainingBalance * monthlyRate)
          const principalPayment = payRounded - interest
          remainingBalance -= principalPayment
          schedule.push({
            period,
            payment: payRounded,
            principal: principalPayment,
            interest,
            remainingBalance: Math.max(0, remainingBalance)
          })
        }

        return schedule
      }
  
      const generateEqualPrincipalSchedule = (principal, monthlyRate, totalPeriods, monthlyPrincipal) => {
        const schedule = []
        let remainingBalance = principal
        const round = (x) => Math.round(x)
        const basePrincipal = monthlyPrincipal

        for (let period = 1; period <= totalPeriods; period++) {
          const isLast = period === totalPeriods
          let principalPayment = isLast ? remainingBalance : round(basePrincipal)
          const interest = round(remainingBalance * monthlyRate)
          const payment = principalPayment + interest
          remainingBalance -= principalPayment

          schedule.push({
            period,
            payment,
            principal: principalPayment,
            interest,
            remainingBalance: Math.max(0, remainingBalance)
          })
        }

        return schedule
      }
  
      const formatCurrency = (amount) => {
        return new Intl.NumberFormat('zh-TW', {
          style: 'currency',
          currency: 'TWD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(amount)
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
                @media print { body { margin: 0; }
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
  
      return {
        formData,
        errors,
        calculationResult,
        isFormValid,
        validateInput,
        calculateLoan,
        formatCurrency,
        printSchedule
      }
    }
  }
  </script>
  