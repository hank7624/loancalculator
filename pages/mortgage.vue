<template>
  <div class="mortgage-calculator">
    <h2>房貸計算器</h2>
    
    <div class="calculator-form">
      <div class="form-group">
        <label for="mortgageAmount">房貸金額</label>
        <div class="input-container">
          <input
            id="mortgageAmount"
            v-model.number="formData.mortgageAmount"
            type="number"
            min="1"
            max="9999"
            placeholder="請輸入房貸金額"
            @input="validateInput"
          />
          <span class="unit">萬元</span>
        </div>
        <div class="error-message" v-if="errors.mortgageAmount">
          {{ errors.mortgageAmount }}
        </div>
      </div>

      <div class="form-group">
        <label for="loanYears">貸款年限</label>
        <select
          id="loanYears"
          v-model="formData.loanYears"
          @change="validateInput"
        >
          <option value="">請選擇貸款年限</option>
          <option v-for="year in 50" :key="year" :value="year">{{ year }}年</option>
        </select>
        <div class="error-message" v-if="errors.loanYears">
          {{ errors.loanYears }}
        </div>
      </div>

      <div class="form-group">
        <label for="gracePeriod">寬限期</label>
        <select
          id="gracePeriod"
          v-model="formData.gracePeriod"
          @change="validateInput"
        >
          <option value="">請選擇寬限期</option>
          <option v-for="year in 6" :key="year-1" :value="year-1">{{ year-1 }}年</option>
        </select>
        <div class="error-message" v-if="errors.gracePeriod">
          {{ errors.gracePeriod }}
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
              name="mortgageCalculationMethod"
            />
            <span>本息平均攤還 (銀行常用)</span>
          </label>
          <label class="radio-label">
            <input
              type="radio"
              v-model="formData.calculationMethod"
              value="equal-principal"
              name="mortgageCalculationMethod"
            />
            <span>本金平均攤還</span>
          </label>
        </div>
      </div>

      <div class="form-group">
        <label>利率類型</label>
        <div class="radio-group">
          <label class="radio-label">
            <input
              type="radio"
              v-model="formData.rateType"
              value="single"
              name="rateType"
              @change="resetRates"
            />
            <span>單一利率</span>
          </label>
          <label class="radio-label">
            <input
              type="radio"
              v-model="formData.rateType"
              value="two-tier"
              name="rateType"
              @change="resetRates"
            />
            <span>兩段式利率</span>
          </label>
          <label class="radio-label">
            <input
              type="radio"
              v-model="formData.rateType"
              value="three-tier"
              name="rateType"
              @change="resetRates"
            />
            <span>三段式利率</span>
          </label>
        </div>
      </div>

      <!-- 單一利率 -->
      <div v-if="formData.rateType === 'single'" class="form-group">
        <label for="singleRate">年利率 (%)</label>
        <div class="input-container">
          <input
            id="singleRate"
            v-model.number="formData.rates.single"
            type="number"
            min="0.01"
            max="15.99"
            step="0.01"
            placeholder="請輸入年利率"
            @input="validateInput"
          />
          <span class="unit">%</span>
        </div>
        <div class="error-message" v-if="errors.singleRate">
          {{ errors.singleRate }}
        </div>
      </div>

      <!-- 兩段式利率 -->
      <div v-if="formData.rateType === 'two-tier'" class="rate-tiers">
        <div class="form-group">
          <label for="twoTierRate1">第一段年利率 (%)</label>
          <div class="input-container">
            <input
              id="twoTierRate1"
              v-model.number="formData.rates.twoTier[0]"
              type="number"
              min="0.01"
              max="15.99"
              step="0.01"
              placeholder="請輸入第一段年利率"
              @input="validateInput"
              @blur="validateInput"
            />
            <span class="unit">%</span>
          </div>
          <span v-if="errors.twoTierRate1" class="error-message">{{ errors.twoTierRate1 }}</span>
        </div>
        <div class="form-group">
          <label for="twoTierRate2">第二段年利率 (%)</label>
          <div class="input-container">
            <input
              id="twoTierRate2"
              v-model.number="formData.rates.twoTier[1]"
              type="number"
              min="0.01"
              max="15.99"
              step="0.01"
              placeholder="請輸入第二段年利率"
              @input="validateInput"
              @blur="validateInput"
            />
            <span class="unit">%</span>
          </div>
          <span v-if="errors.twoTierRate2" class="error-message">{{ errors.twoTierRate2 }}</span>
        </div>
      </div>

      <!-- 三段式利率 -->
      <div v-if="formData.rateType === 'three-tier'" class="rate-tiers">
        <div class="form-group">
          <label for="threeTierRate1">第一段年利率 (%)</label>
          <div class="input-container">
            <input
              id="threeTierRate1"
              v-model.number="formData.rates.threeTier[0]"
              type="number"
              min="0.01"
              max="15.99"
              step="0.01"
              placeholder="請輸入第一段年利率"
              @input="validateInput"
              @blur="validateInput"
            />
            <span class="unit">%</span>
          </div>
          <span v-if="errors.threeTierRate1" class="error-message">{{ errors.threeTierRate1 }}</span>
        </div>
        <div class="form-group">
          <label for="threeTierRate2">第二段年利率 (%)</label>
          <div class="input-container">
            <input
              id="threeTierRate2"
              v-model.number="formData.rates.threeTier[1]"
              type="number"
              min="0.01"
              max="15.99"
              step="0.01"
              placeholder="請輸入第二段年利率"
              @input="validateInput"
              @blur="validateInput"
            />
            <span class="unit">%</span>
          </div>
          <span v-if="errors.threeTierRate2" class="error-message">{{ errors.threeTierRate2 }}</span>
        </div>
        <div class="form-group">
          <label for="threeTierRate3">第三段年利率 (%)</label>
          <div class="input-container">
            <input
              id="threeTierRate3"
              v-model.number="formData.rates.threeTier[2]"
              type="number"
              min="0.01"
              max="15.99"
              step="0.01"
              placeholder="請輸入第三段年利率"
              @input="validateInput"
              @blur="validateInput"
            />
            <span class="unit">%</span>
          </div>
          <span v-if="errors.threeTierRate3" class="error-message">{{ errors.threeTierRate3 }}</span>
        </div>
      </div>

      <button 
        class="calculate-btn"
        @click="calculateMortgage"
        :disabled="!isFormValid"
      >
        計算房貸
      </button>
    </div>

     <!-- 計算結果 -->
     <div v-if="calculationResult" class="calculation-result">
       <h3>計算結果</h3>
       <div class="result-grid">
         <!-- 本息平均攤還法顯示 -->
         <template v-if="formData.calculationMethod === 'equal-payment'">
           <!-- 單一利率顯示 -->
           <div v-if="formData.rateType === 'single'" class="result-item">
             <template v-if="formData.gracePeriod > 0">
               <div class="result-item">
                 <span class="result-label">第1~{{ formData.gracePeriod }}年(月付金)</span>
                 <span class="result-value">{{ formatCurrency(calculationResult.gracePeriodPayment) }}</span>
               </div>
               <div class="result-item">
                 <span class="result-label">第{{ formData.gracePeriod + 1 }}年開始(月付金)</span>
                 <span class="result-value">{{ formatCurrency(calculationResult.monthlyPayment) }}</span>
               </div>
             </template>
             <template v-else>
               <div class="result-item">
                 <span class="result-label">月付金</span>
                 <span class="result-value">{{ formatCurrency(calculationResult.monthlyPayment) }}</span>
               </div>
             </template>
           </div>
           
           <!-- 兩段式利率顯示 -->
           <template v-if="formData.rateType === 'two-tier'">
             <template v-if="formData.gracePeriod > 0">
               <!-- 寬限期內如果跨越利率階段，需要分別顯示 -->
               <template v-if="formData.gracePeriod >= 1">
                 <div class="result-item">
                   <span class="result-label">第1年(月付金)</span>
                   <span class="result-value">{{ formatCurrency(calculationResult.gracePeriodPayment) }}</span>
                 </div>
               </template>
               <!-- 智能合併顯示相同的月付金 -->
               <template v-if="formData.gracePeriod >= 2">
                 <!-- 檢查第2-5年是否有連續相同的月付金 -->
                 <template v-if="formData.gracePeriod >= 5 && 
                                calculationResult.gracePeriodPayment2 === calculationResult.gracePeriodPayment3 &&
                                calculationResult.gracePeriodPayment3 === calculationResult.gracePeriodPayment4 &&
                                calculationResult.gracePeriodPayment4 === calculationResult.gracePeriodPayment5">
                   <div class="result-item">
                     <span class="result-label">第2~5年(月付金)</span>
                     <span class="result-value">{{ formatCurrency(calculationResult.gracePeriodPayment2) }}</span>
                   </div>
                 </template>
                 <template v-else-if="formData.gracePeriod >= 4 && 
                                    calculationResult.gracePeriodPayment2 === calculationResult.gracePeriodPayment3 &&
                                    calculationResult.gracePeriodPayment3 === calculationResult.gracePeriodPayment4">
                   <div class="result-item">
                     <span class="result-label">第2~4年(月付金)</span>
                     <span class="result-value">{{ formatCurrency(calculationResult.gracePeriodPayment2) }}</span>
                   </div>
                   <template v-if="formData.gracePeriod >= 5">
                     <div class="result-item">
                       <span class="result-label">第5年(月付金)</span>
                       <span class="result-value">{{ formatCurrency(calculationResult.gracePeriodPayment5) }}</span>
                     </div>
                   </template>
                 </template>
                 <template v-else-if="formData.gracePeriod >= 3 && 
                                    calculationResult.gracePeriodPayment2 === calculationResult.gracePeriodPayment3">
                   <div class="result-item">
                     <span class="result-label">第2~3年(月付金)</span>
                     <span class="result-value">{{ formatCurrency(calculationResult.gracePeriodPayment2) }}</span>
                   </div>
                   <template v-if="formData.gracePeriod >= 4">
                     <div class="result-item">
                       <span class="result-label">第4年(月付金)</span>
                       <span class="result-value">{{ formatCurrency(calculationResult.gracePeriodPayment4) }}</span>
                     </div>
                   </template>
                   <template v-if="formData.gracePeriod >= 5">
                     <div class="result-item">
                       <span class="result-label">第5年(月付金)</span>
                       <span class="result-value">{{ formatCurrency(calculationResult.gracePeriodPayment5) }}</span>
                     </div>
                   </template>
                 </template>
                 <template v-else>
                   <div class="result-item">
                     <span class="result-label">第2年(月付金)</span>
                     <span class="result-value">{{ formatCurrency(calculationResult.gracePeriodPayment2) }}</span>
                   </div>
                   <template v-if="formData.gracePeriod >= 3">
                     <div class="result-item">
                       <span class="result-label">第3年(月付金)</span>
                       <span class="result-value">{{ formatCurrency(calculationResult.gracePeriodPayment3) }}</span>
                     </div>
                   </template>
                   <template v-if="formData.gracePeriod >= 4">
                     <div class="result-item">
                       <span class="result-label">第4年(月付金)</span>
                       <span class="result-value">{{ formatCurrency(calculationResult.gracePeriodPayment4) }}</span>
                     </div>
                   </template>
                   <template v-if="formData.gracePeriod >= 5">
                     <div class="result-item">
                       <span class="result-label">第5年(月付金)</span>
                       <span class="result-value">{{ formatCurrency(calculationResult.gracePeriodPayment5) }}</span>
                     </div>
                   </template>
                 </template>
               </template>
               <!-- 寬限期後的還款期間 -->
               <div class="result-item">
                 <span class="result-label">第{{ formData.gracePeriod + 1 }}年開始(月付金)</span>
                 <span class="result-value">{{ formatCurrency(calculationResult.firstYearPayment) }}</span>
               </div>
             </template>
             <template v-else>
               <div class="result-item">
                 <span class="result-label">第一年(月付金)</span>
                 <span class="result-value">{{ formatCurrency(calculationResult.firstYearPayment) }}</span>
               </div>
               <div class="result-item" v-if="calculationResult.firstYearPayment !== calculationResult.secondYearPayment">
                 <span class="result-label">第二年開始(月付金)</span>
                 <span class="result-value">{{ formatCurrency(calculationResult.secondYearPayment) }}</span>
               </div>
             </template>
           </template>
           
           <!-- 三段式利率顯示 -->
           <template v-if="formData.rateType === 'three-tier'">
             <template v-if="formData.gracePeriod > 0">
               <!-- 寬限期內如果跨越利率階段，需要分別顯示 -->
               <template v-if="formData.gracePeriod >= 1">
                 <div class="result-item">
                   <span class="result-label">第1年(月付金)</span>
                   <span class="result-value">{{ formatCurrency(calculationResult.gracePeriodPayment) }}</span>
                 </div>
               </template>
               <!-- 智能合併顯示相同的月付金 -->
               <template v-if="formData.gracePeriod >= 2">
                 <!-- 檢查第2-5年是否有連續相同的月付金 -->
                 <template v-if="formData.gracePeriod >= 5 && 
                                calculationResult.gracePeriodPayment2 === calculationResult.gracePeriodPayment3 &&
                                calculationResult.gracePeriodPayment3 === calculationResult.gracePeriodPayment4 &&
                                calculationResult.gracePeriodPayment4 === calculationResult.gracePeriodPayment5">
                   <div class="result-item">
                     <span class="result-label">第2~5年(月付金)</span>
                     <span class="result-value">{{ formatCurrency(calculationResult.gracePeriodPayment2) }}</span>
                   </div>
                 </template>
                 <template v-else-if="formData.gracePeriod >= 4 && 
                                    calculationResult.gracePeriodPayment2 === calculationResult.gracePeriodPayment3 &&
                                    calculationResult.gracePeriodPayment3 === calculationResult.gracePeriodPayment4">
                   <div class="result-item">
                     <span class="result-label">第2~4年(月付金)</span>
                     <span class="result-value">{{ formatCurrency(calculationResult.gracePeriodPayment2) }}</span>
                   </div>
                   <template v-if="formData.gracePeriod >= 5">
                     <div class="result-item">
                       <span class="result-label">第5年(月付金)</span>
                       <span class="result-value">{{ formatCurrency(calculationResult.gracePeriodPayment5) }}</span>
                     </div>
                   </template>
                 </template>
                 <template v-else-if="formData.gracePeriod >= 3 && 
                                    calculationResult.gracePeriodPayment2 === calculationResult.gracePeriodPayment3">
                   <div class="result-item">
                     <span class="result-label">第2~3年(月付金)</span>
                     <span class="result-value">{{ formatCurrency(calculationResult.gracePeriodPayment2) }}</span>
                   </div>
                   <!-- 檢查第3-5年是否相同 -->
                   <template v-if="formData.gracePeriod >= 5">
                     <template v-if="calculationResult.gracePeriodPayment3 === calculationResult.gracePeriodPayment4 &&
                                    calculationResult.gracePeriodPayment4 === calculationResult.gracePeriodPayment5">
                       <div class="result-item">
                         <span class="result-label">第3~5年(月付金)</span>
                         <span class="result-value">{{ formatCurrency(calculationResult.gracePeriodPayment3) }}</span>
                       </div>
                     </template>
                     <template v-else-if="calculationResult.gracePeriodPayment4 === calculationResult.gracePeriodPayment5">
                       <div class="result-item">
                         <span class="result-label">第4~5年(月付金)</span>
                         <span class="result-value">{{ formatCurrency(calculationResult.gracePeriodPayment4) }}</span>
                       </div>
                     </template>
                     <template v-else>
                       <div class="result-item">
                         <span class="result-label">第4年(月付金)</span>
                         <span class="result-value">{{ formatCurrency(calculationResult.gracePeriodPayment4) }}</span>
                       </div>
                       <div class="result-item">
                         <span class="result-label">第5年(月付金)</span>
                         <span class="result-value">{{ formatCurrency(calculationResult.gracePeriodPayment5) }}</span>
                       </div>
                     </template>
                   </template>
                   <template v-else-if="formData.gracePeriod >= 4">
                     <template v-if="calculationResult.gracePeriodPayment3 === calculationResult.gracePeriodPayment4">
                       <div class="result-item">
                         <span class="result-label">第3~4年(月付金)</span>
                         <span class="result-value">{{ formatCurrency(calculationResult.gracePeriodPayment3) }}</span>
                       </div>
                     </template>
                     <template v-else>
                       <div class="result-item">
                         <span class="result-label">第4年(月付金)</span>
                         <span class="result-value">{{ formatCurrency(calculationResult.gracePeriodPayment4) }}</span>
                       </div>
                     </template>
                   </template>
                 </template>
                 <template v-else>
                   <div class="result-item">
                     <span class="result-label">第2年(月付金)</span>
                     <span class="result-value">{{ formatCurrency(calculationResult.gracePeriodPayment2) }}</span>
                   </div>
                   <!-- 檢查第3-5年是否相同 -->
                   <template v-if="formData.gracePeriod >= 5">
                     <template v-if="calculationResult.gracePeriodPayment3 === calculationResult.gracePeriodPayment4 &&
                                    calculationResult.gracePeriodPayment4 === calculationResult.gracePeriodPayment5">
                       <div class="result-item">
                         <span class="result-label">第3~5年(月付金)</span>
                         <span class="result-value">{{ formatCurrency(calculationResult.gracePeriodPayment3) }}</span>
                       </div>
                     </template>
                     <template v-else-if="calculationResult.gracePeriodPayment4 === calculationResult.gracePeriodPayment5">
                       <div class="result-item">
                         <span class="result-label">第3年(月付金)</span>
                         <span class="result-value">{{ formatCurrency(calculationResult.gracePeriodPayment3) }}</span>
                       </div>
                       <div class="result-item">
                         <span class="result-label">第4~5年(月付金)</span>
                         <span class="result-value">{{ formatCurrency(calculationResult.gracePeriodPayment4) }}</span>
                       </div>
                     </template>
                     <template v-else>
                       <div class="result-item">
                         <span class="result-label">第3年(月付金)</span>
                         <span class="result-value">{{ formatCurrency(calculationResult.gracePeriodPayment3) }}</span>
                       </div>
                       <div class="result-item">
                         <span class="result-label">第4年(月付金)</span>
                         <span class="result-value">{{ formatCurrency(calculationResult.gracePeriodPayment4) }}</span>
                       </div>
                       <div class="result-item">
                         <span class="result-label">第5年(月付金)</span>
                         <span class="result-value">{{ formatCurrency(calculationResult.gracePeriodPayment5) }}</span>
                       </div>
                     </template>
                   </template>
                   <template v-else-if="formData.gracePeriod >= 4">
                     <template v-if="calculationResult.gracePeriodPayment3 === calculationResult.gracePeriodPayment4">
                       <div class="result-item">
                         <span class="result-label">第3~4年(月付金)</span>
                         <span class="result-value">{{ formatCurrency(calculationResult.gracePeriodPayment3) }}</span>
                       </div>
                     </template>
                     <template v-else>
                       <div class="result-item">
                         <span class="result-label">第3年(月付金)</span>
                         <span class="result-value">{{ formatCurrency(calculationResult.gracePeriodPayment3) }}</span>
                       </div>
                       <div class="result-item">
                         <span class="result-label">第4年(月付金)</span>
                         <span class="result-value">{{ formatCurrency(calculationResult.gracePeriodPayment4) }}</span>
                       </div>
                     </template>
                   </template>
                   <template v-else-if="formData.gracePeriod >= 3">
                     <div class="result-item">
                       <span class="result-label">第3年(月付金)</span>
                       <span class="result-value">{{ formatCurrency(calculationResult.gracePeriodPayment3) }}</span>
                     </div>
                   </template>
                 </template>
               </template>
               <!-- 寬限期後的還款期間 -->
               <template v-if="formData.gracePeriod === 1">
                 <!-- 寬限期1年：顯示第2年和第3年開始的不同月付金 -->
                 <div class="result-item">
                   <span class="result-label">第2年(月付金)</span>
                   <span class="result-value">{{ formatCurrency(calculationResult.secondYearPayment) }}</span>
                 </div>
                 <div class="result-item" v-if="calculationResult.secondYearPayment !== calculationResult.thirdYearPayment">
                   <span class="result-label">第3年開始(月付金)</span>
                   <span class="result-value">{{ formatCurrency(calculationResult.thirdYearPayment) }}</span>
                 </div>
               </template>
               <template v-else>
                 <!-- 寬限期2年或以上：顯示統一的月付金 -->
                 <div class="result-item">
                   <span class="result-label">第{{ formData.gracePeriod + 1 }}年開始(月付金)</span>
                   <span class="result-value">{{ formatCurrency(calculationResult.firstYearPayment) }}</span>
                 </div>
               </template>
             </template>
             <template v-else>
               <div class="result-item">
                 <span class="result-label">第一年(月付金)</span>
                 <span class="result-value">{{ formatCurrency(calculationResult.firstYearPayment) }}</span>
               </div>
               <div class="result-item" v-if="calculationResult.firstYearPayment !== calculationResult.secondYearPayment">
                 <span class="result-label">第二年(月付金)</span>
                 <span class="result-value">{{ formatCurrency(calculationResult.secondYearPayment) }}</span>
               </div>
               <div class="result-item" v-if="calculationResult.secondYearPayment !== calculationResult.thirdYearPayment">
                 <span class="result-label">第三年開始(月付金)</span>
                 <span class="result-value">{{ formatCurrency(calculationResult.thirdYearPayment) }}</span>
               </div>
             </template>
           </template>
         </template>
         
         <!-- 本金平均攤還法只顯示總計 -->
         <template v-if="formData.calculationMethod === 'equal-principal'">
           <div class="result-item">
             <span class="result-label">說明</span>
             <span class="result-value">每期月付金不同，請參考還款明細表</span>
           </div>
         </template>
         
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
                <td>
                  {{ payment.period }}
                  <span v-if="formData.gracePeriod > 0 && payment.period <= formData.gracePeriod * 12" class="grace-period-label">寬限期</span>
                </td>
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
      <h3>房貸試算與申請攻略</h3>
      
      <article class="guide-content">
        <h4>影響房貸成數與利率的關鍵</h4>
        <p>銀行鑑價與核貸成數主要取決於「人」與「屋」兩大構面。<strong>房屋地點（Location）</strong>是決定成數的關鍵（如捷運沿線通常可達 8 成）；而<strong>借款人信用與收入</strong>則決定利率高低。建議申貸前保持帳戶內有穩定餘額，並避免近期增貸。</p>
        
        <h4>寬限期運用策略：該用好用滿嗎？</h4>
        <p>「寬限期」是指只需繳利息、不需繳本金的期間（通常 1~5 年）。雖然初期壓力小，但<strong>寬限期結束後，本金會在剩餘年限內攤還，導致月付金大幅跳升</strong>（可能變為原本的 2~3 倍）。建議僅在庫存現金不足或有明確短期投資規劃時使用，切勿單純因「想少繳一點」而申請，以免日後無力負擔。</p>

        <h4>本息平均攤還 vs 本金平均攤還</h4>
        <ul>
          <li><strong>本息平均攤還</strong>：每月繳款金額固定（利率不變前提下），適合薪水固定的首購族，便於財務規劃。缺點是總利息支出較多。</li>
          <li><strong>本金平均攤還</strong>：每月償還固定本金，利息隨本金減少而遞減。初期繳款壓力最大，但總繳利息最少。適合目前收入較高或預期未來收入可能減少的族群。</li>
        </ul>
      </article>

      <div class="faq-section">
        <h4>常見問題 (FAQ)</h4>
        <details>
          <summary>首購族有什麼優惠貸款？</summary>
          <p>目前最熱門的是「新青安房貸」（新青年安心成家房貸），提供最高 1000 萬額度、最長 40 年期與 5 年寬限期，利率經補貼後約在 2.5%~3.0%（依政策變動）。只要名下無自有住宅（本人、配偶及未成年子女）即可申請。</p>
        </details>
        <details>
          <summary>甚麼是「房貸負擔率」？建議佔薪水多少？</summary>
          <p>房貸負擔率 = 每月房貸支出 / 每月家庭可支配所得。一般建議控制在 <strong>30% 以內</strong> 為優，不超過 40% 為上限。若超過 50%，將嚴重擠壓生活品質並增加違約風險。</p>
        </details>
        <details>
          <summary>一段式利率好，還是分段式好？</summary>
          <p>一段式利率結構簡單，不易隨銀行政策大幅波動，適合長期持有自住。分段式利率通常「前低後高」，若您計畫在短期內（如 3~5 年）轉手或轉貸，可考慮前幾年利率較低的方案；否則長期來看，一段式通常較活算。</p>
        </details>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

const formData = reactive({
  mortgageAmount: '',
  loanYears: '',
  gracePeriod: '',
  calculationMethod: 'equal-payment',
  rateType: 'single',
  rates: {
    single: '',
    twoTier: ['', ''],
    threeTier: ['', '', '']
  }
})

const errors = reactive({
  mortgageAmount: '',
  loanYears: '',
  gracePeriod: '',
  singleRate: '',
  twoTierRate1: '',
  twoTierRate2: '',
  threeTierRate1: '',
  threeTierRate2: '',
  threeTierRate3: ''
})

const calculationResult = ref(null)

const isFormValid = computed(() => {
  const basicValid = formData.mortgageAmount > 0 && 
                    formData.loanYears > 0 && 
                    formData.gracePeriod !== ''

  if (!basicValid) return false

  // 檢查利率輸入
  if (formData.rateType === 'single') {
    return formData.rates.single > 0 && !errors.singleRate
  } else if (formData.rateType === 'two-tier') {
    return formData.rates.twoTier[0] > 0 && 
           formData.rates.twoTier[1] > 0 &&
           !errors.twoTierRate1 && !errors.twoTierRate2
  } else if (formData.rateType === 'three-tier') {
    return formData.rates.threeTier[0] > 0 && 
           formData.rates.threeTier[1] > 0 &&
           formData.rates.threeTier[2] > 0 &&
           !errors.threeTierRate1 && !errors.threeTierRate2 && !errors.threeTierRate3
  }

  return false
})

const resetRates = () => {
  formData.rates.single = ''
  formData.rates.twoTier = ['', '']
  formData.rates.threeTier = ['', '', '']
  Object.keys(errors).forEach(key => {
    if (key.includes('Rate')) {
      errors[key] = ''
    }
  })
}

const validateInput = () => {
  // 驗證房貸金額
  if (formData.mortgageAmount < 1 || formData.mortgageAmount > 9999) {
    errors.mortgageAmount = '房貸金額必須在 1 到 99,999 萬元之間'
  } else {
    errors.mortgageAmount = ''
  }

  // 驗證貸款年限
  if (!formData.loanYears) {
    errors.loanYears = '請選擇貸款年限'
  } else {
    errors.loanYears = ''
  }

  // 驗證寬限期
  if (formData.gracePeriod === '') {
    errors.gracePeriod = '請選擇寬限期'
  } else {
    errors.gracePeriod = ''
  }

  // 驗證利率
  if (formData.rateType === 'single') {
    if (formData.rates.single < 0.01 || formData.rates.single > 15.99) {
      errors.singleRate = '年利率必須在 0.01% 到 15.99% 之間'
    } else {
      errors.singleRate = ''
    }
  } else if (formData.rateType === 'two-tier') {
    if (formData.rates.twoTier[0] < 0.01 || formData.rates.twoTier[0] > 15.99) {
      errors.twoTierRate1 = '第一段年利率必須在 0.01% 到 15.99% 之間'
    } else {
      errors.twoTierRate1 = ''
    }
    if (formData.rates.twoTier[1] < 0.01 || formData.rates.twoTier[1] > 15.99) {
      errors.twoTierRate2 = '第二段年利率必須在 0.01% 到 15.99% 之間'
    } else {
      errors.twoTierRate2 = ''
    }
  } else if (formData.rateType === 'three-tier') {
    if (formData.rates.threeTier[0] < 0.01 || formData.rates.threeTier[0] > 15.99) {
      errors.threeTierRate1 = '第一段年利率必須在 0.01% 到 15.99% 之間'
    } else {
      errors.threeTierRate1 = ''
    }
    if (formData.rates.threeTier[1] < 0.01 || formData.rates.threeTier[1] > 15.99) {
      errors.threeTierRate2 = '第二段年利率必須在 0.01% 到 15.99% 之間'
    } else {
      errors.threeTierRate2 = ''
    }
    if (formData.rates.threeTier[2] < 0.01 || formData.rates.threeTier[2] > 15.99) {
      errors.threeTierRate3 = '第三段年利率必須在 0.01% 到 15.99% 之間'
    } else {
      errors.threeTierRate3 = ''
    }
  }
}

const calculateMortgage = () => {
  if (!isFormValid.value) return

  const principal = formData.mortgageAmount * 10000 // 轉換為元
  const totalMonths = formData.loanYears * 12
  const graceMonths = formData.gracePeriod * 12
  const actualPaymentMonths = totalMonths - graceMonths

  let firstYearPayment, secondYearPayment, thirdYearPayment, totalInterest, totalPayment, schedule

  if (formData.calculationMethod === 'equal-payment') {
    // 本息平均攤還
    if (formData.rateType === 'single') {
      // 單一利率
      const monthlyRate = formData.rates.single / 100 / 12
      firstYearPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, actualPaymentMonths)) / 
                        (Math.pow(1 + monthlyRate, actualPaymentMonths) - 1)
      secondYearPayment = firstYearPayment
      thirdYearPayment = firstYearPayment
      
      // 生成還款明細（包含寬限期）
      schedule = graceMonths === 0
        ? generateEqualPaymentSchedule(principal, monthlyRate, totalMonths, firstYearPayment)
        : generateEqualPaymentScheduleWithGrace(principal, monthlyRate, totalMonths, graceMonths, firstYearPayment)
      
      // 從明細表累積計算總利息和總付款，確保與明細表一致
      totalInterest = 0
      totalPayment = 0
      schedule.forEach(payment => {
        totalInterest += payment.interest
        totalPayment += payment.payment
      })
    } else if (formData.rateType === 'two-tier') {
      // 兩段式利率
      const firstRate = formData.rates.twoTier[0] / 100 / 12
      const secondRate = formData.rates.twoTier[1] / 100 / 12
      
      if (formData.gracePeriod === 0) {
        // 無寬限期，從第一段利率開始
        firstYearPayment = principal * (firstRate * Math.pow(1 + firstRate, actualPaymentMonths)) / 
                          (Math.pow(1 + firstRate, actualPaymentMonths) - 1)
        
        // 計算第一年後剩餘的本金
        let remainingBalance = principal
        for (let month = 1; month <= 12; month++) {
          const interest = remainingBalance * firstRate
          const principalPayment = firstYearPayment - interest
          remainingBalance -= principalPayment
        }
        
        // 第二年開始使用第二段利率
        const secondYearMonths = actualPaymentMonths - 12
        secondYearPayment = remainingBalance * (secondRate * Math.pow(1 + secondRate, secondYearMonths)) / 
                          (Math.pow(1 + secondRate, secondYearMonths) - 1)
      } else {
        // 有寬限期，從第二段利率開始
        firstYearPayment = principal * (secondRate * Math.pow(1 + secondRate, actualPaymentMonths)) / 
                          (Math.pow(1 + secondRate, actualPaymentMonths) - 1)
        
        // 第二年以後月付金相同（因為利率相同）
        secondYearPayment = firstYearPayment
      }
      
      // 生成還款明細（包含寬限期）
      schedule = formData.gracePeriod === 0
        ? generateTwoTierSchedule(principal, firstRate, secondRate, totalMonths, firstYearPayment, secondYearPayment)
        : generateTwoTierScheduleWithGrace(principal, firstRate, secondRate, totalMonths, graceMonths, firstYearPayment, secondYearPayment)
      
      // 從明細表累積計算總利息和總付款，確保與明細表一致
      totalInterest = 0
      totalPayment = 0
      schedule.forEach(payment => {
        totalInterest += payment.interest
        totalPayment += payment.payment
      })
    } else if (formData.rateType === 'three-tier') {
      // 三段式利率
      console.log('Debug - 進入三段式利率計算')
      const firstRate = formData.rates.threeTier[0] / 100 / 12
      const secondRate = formData.rates.threeTier[1] / 100 / 12
      const thirdRate = formData.rates.threeTier[2] / 100 / 12
      
      // 根據寬限期長度決定使用哪一段利率開始還本付息
      let startRate
      
      if (formData.gracePeriod < 1) {
        // 無寬限期，從第一段利率開始
        startRate = firstRate
        
        // 第1年使用第一段利率（1%），計算整個貸款期間 the monthly payment
        firstYearPayment = principal * (firstRate * Math.pow(1 + firstRate, actualPaymentMonths)) / 
                          (Math.pow(1 + firstRate, actualPaymentMonths) - 1)
        
        // 計算第一年後剩餘的本金
        let remainingBalance = principal
        for (let month = 1; month <= 12; month++) {
          const interest = remainingBalance * firstRate
          const principalPayment = firstYearPayment - interest
          remainingBalance -= principalPayment
        }
        
        // 第2年使用第二段利率（2%），計算剩餘期數的月付金
        const secondYearMonths = actualPaymentMonths - 12
        secondYearPayment = remainingBalance * (secondRate * Math.pow(1 + secondRate, secondYearMonths)) / 
                           (Math.pow(1 + secondRate, secondYearMonths) - 1)
        
        // 計算第二年後剩餘的本金
        for (let month = 1; month <= 12; month++) {
          const interest = remainingBalance * secondRate
          const principalPayment = secondYearPayment - interest
          remainingBalance -= principalPayment
        }
        
        // 第3年開始使用第三段利率（3%），計算剩餘期數的月付金
        const remainingMonths = actualPaymentMonths - 24
        thirdYearPayment = remainingBalance * (thirdRate * Math.pow(1 + thirdRate, remainingMonths)) / 
                          (Math.pow(1 + thirdRate, remainingMonths) - 1)
      } else if (formData.gracePeriod < 2) {
        // 寬限期1年，從第二段利率開始
        startRate = secondRate
        
        // 第2年使用第二段利率（2%）
        const secondYearMonths = actualPaymentMonths
        firstYearPayment = principal * (secondRate * Math.pow(1 + secondRate, secondYearMonths)) / 
                          (Math.pow(1 + secondRate, secondYearMonths) - 1)
        
        // 第3年開始使用第三段利率（3%）
        // 先計算第2年後剩餘的本金
        let remainingBalance = principal
        for (let month = 1; month <= 12; month++) {
          const interest = remainingBalance * secondRate
          const principalPayment = firstYearPayment - interest
          remainingBalance -= principalPayment
        }
        
        // 第3年開始使用第三段利率
        const thirdYearMonths = actualPaymentMonths - 12
        secondYearPayment = firstYearPayment  // 第2年使用第二段利率
        thirdYearPayment = remainingBalance * (thirdRate * Math.pow(1 + thirdRate, thirdYearMonths)) / 
                          (Math.pow(1 + thirdRate, thirdYearMonths) - 1)
      } else if (formData.gracePeriod < 3) {
        // 寬限期2年，從第三段利率開始
        startRate = thirdRate
        firstYearPayment = principal * (thirdRate * Math.pow(1 + thirdRate, actualPaymentMonths)) / 
                          (Math.pow(1 + thirdRate, actualPaymentMonths) - 1)
        
        // 第二年以後月付金相同
        secondYearPayment = firstYearPayment
        thirdYearPayment = firstYearPayment
      } else {
        // 寬限期3年或以上，從第三段利率開始
        console.log('Debug - 進入寬限期3年或以上分支')
        startRate = thirdRate
        
        // 使用更穩定的計算方法
        const monthlyRate = thirdRate
        const totalMonths = actualPaymentMonths
        
        // 計算月付金
        if (monthlyRate === 0) {
          firstYearPayment = principal / totalMonths
        } else {
          const rate = monthlyRate
          const n = totalMonths
          const pv = principal
          
          console.log('Debug - 開始計算 firstYearPayment')
          console.log('Debug - rate:', rate, 'n:', n, 'pv:', pv)
          
          try {
            // 先檢查參數是否合理
            if (n > 1000 || rate > 0.1) {
              // 如果期數過多或利率過高，使用簡化公式
              console.log('Debug - 使用簡化公式（參數過大）')
              firstYearPayment = pv / n + pv * rate
            } else {
              // 使用標準的等額本息公式
              console.log('Debug - 使用標準公式')
              const powResult = Math.pow(1 + rate, n)
              console.log('Debug - powResult:', powResult)
              if (isFinite(powResult) && powResult > 1) {
                firstYearPayment = pv * (rate * powResult) / (powResult - 1)
                console.log('Debug - 標準公式計算結果:', firstYearPayment)
              } else {
                // 如果 Math.pow 失敗，使用簡化公式
                console.log('Debug - Math.pow 失敗，使用簡化公式')
                firstYearPayment = pv / n + pv * rate
              }
            }
          } catch (error) {
            // 如果計算過程中出現錯誤，使用簡化公式
            console.log('Debug - 計算錯誤，使用簡化公式:', error)
            firstYearPayment = pv / n + pv * rate
          }
          
          console.log('Debug - 計算完成，firstYearPayment:', firstYearPayment)
          
          // 最終檢查計算結果是否有效
          if (!isFinite(firstYearPayment) || isNaN(firstYearPayment) || firstYearPayment <= 0) {
            // 如果計算失敗，使用簡化公式
            console.log('Debug - 最終檢查失敗，使用簡化公式')
            firstYearPayment = pv / n + pv * rate
            console.log('Debug - 最終 firstYearPayment:', firstYearPayment)
          }
        }
        
        // 第二年以後月付金相同
        secondYearPayment = firstYearPayment
        thirdYearPayment = firstYearPayment
      }
      
      // 生成還款明細
      schedule = generateThreeTierScheduleWithGrace(principal, firstRate, secondRate, thirdRate, totalMonths, graceMonths, firstYearPayment, secondYearPayment, thirdYearPayment)
      
      // 從明細表累積計算總利息和總付款，確保與明細表一致
      totalInterest = 0
      totalPayment = 0
      schedule.forEach(payment => {
        totalInterest += payment.interest
        totalPayment += payment.payment
      })
    }
  } else {
    // 本金平均攤還
    const monthlyPrincipal = principal / actualPaymentMonths
    
    if (formData.rateType === 'single') {
      const monthlyRate = formData.rates.single / 100 / 12
      firstYearPayment = monthlyPrincipal + (principal * monthlyRate)
      secondYearPayment = firstYearPayment
      thirdYearPayment = firstYearPayment
      
      // 計算總付款（寬限期只繳利息 + 還款期間繳本息）
      const graceInterest = principal * monthlyRate * graceMonths
      totalInterest = 0
      schedule = graceMonths === 0
        ? generateEqualPrincipalSchedule(principal, monthlyRate, totalMonths, monthlyPrincipal)
        : generateEqualPrincipalScheduleWithGrace(principal, monthlyRate, totalMonths, graceMonths, monthlyPrincipal)
      
      // 計算總利息和總付款
      schedule.forEach(payment => {
        totalInterest += payment.interest
      })
      totalPayment = principal + totalInterest
    } else if (formData.rateType === 'two-tier') {
      const firstRate = formData.rates.twoTier[0] / 100 / 12
      const secondRate = formData.rates.twoTier[1] / 100 / 12
      firstYearPayment = monthlyPrincipal + (principal * firstRate)
      secondYearPayment = monthlyPrincipal + (principal * secondRate)
      
      // 生成兩段式利率的還款明細表（包含寬限期）
      schedule = graceMonths === 0
        ? generateTwoTierEqualPrincipalSchedule(principal, firstRate, secondRate, totalMonths, monthlyPrincipal)
        : generateTwoTierEqualPrincipalScheduleWithGrace(principal, firstRate, secondRate, totalMonths, graceMonths, monthlyPrincipal)
      
      // 計算總利息和總付款
      totalInterest = 0
      schedule.forEach(payment => {
        totalInterest += payment.interest
      })
      totalPayment = principal + totalInterest
    } else if (formData.rateType === 'three-tier') {
      const firstRate = formData.rates.threeTier[0] / 100 / 12
      const secondRate = formData.rates.threeTier[1] / 100 / 12
      const thirdRate = formData.rates.threeTier[2] / 100 / 12
      firstYearPayment = monthlyPrincipal + (principal * firstRate)
      secondYearPayment = monthlyPrincipal + (principal * secondRate)
      thirdYearPayment = monthlyPrincipal + (principal * thirdRate)
      
      // 生成三段式利率的還款明細表（包含寬限期）
      schedule = graceMonths === 0
        ? generateThreeTierEqualPrincipalSchedule(principal, firstRate, secondRate, thirdRate, totalMonths, monthlyPrincipal)
        : generateThreeTierEqualPrincipalScheduleWithGrace(principal, firstRate, secondRate, thirdRate, totalMonths, graceMonths, monthlyPrincipal)
      
      // 計算總利息和總付款
      totalInterest = 0
      schedule.forEach(payment => {
        totalInterest += payment.interest
      })
      totalPayment = principal + totalInterest
    }
  }

  // 計算寬限期內各年的月付金
  let gracePeriodPayments = {}
  if (formData.gracePeriod > 0) {
    if (formData.rateType === 'single') {
      const rate = formData.rates.single / 100 / 12
      for (let year = 1; year <= formData.gracePeriod; year++) {
        gracePeriodPayments[`gracePeriodPayment${year > 1 ? year : ''}`] = principal * rate
      }
    } else if (formData.rateType === 'two-tier') {
      const firstRate = formData.rates.twoTier[0] / 100 / 12
      const secondRate = formData.rates.twoTier[1] / 100 / 12
      for (let year = 1; year <= formData.gracePeriod; year++) {
        const rate = year <= 1 ? firstRate : secondRate
        gracePeriodPayments[`gracePeriodPayment${year > 1 ? year : ''}`] = principal * rate
      }
    } else if (formData.rateType === 'three-tier') {
      const firstRate = formData.rates.threeTier[0] / 100 / 12
      const secondRate = formData.rates.threeTier[1] / 100 / 12
      const thirdRate = formData.rates.threeTier[2] / 100 / 12
      for (let year = 1; year <= formData.gracePeriod; year++) {
        let rate
        if (year <= 1) rate = firstRate
        else if (year <= 2) rate = secondRate
        else rate = thirdRate
        gracePeriodPayments[`gracePeriodPayment${year > 1 ? year : ''}`] = principal * rate
      }
    }
  }

  // 調試信息：檢查 firstYearPayment 的值
  console.log('Debug - firstYearPayment:', firstYearPayment)
  console.log('Debug - typeof firstYearPayment:', typeof firstYearPayment)
  
  calculationResult.value = {
    monthlyPayment: firstYearPayment, // 保持向後兼容
    firstYearPayment,
    secondYearPayment,
    thirdYearPayment,
    gracePeriodPayment: formData.gracePeriod > 0 ? principal * (formData.rates.single || formData.rates.twoTier?.[0] || formData.rates.threeTier?.[0]) / 100 / 12 : 0,
    ...gracePeriodPayments,
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
        <title>房貸還款明細表</title>
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
          <h1>房貸還款明細表</h1>
          <p>房貸金額：${formData.mortgageAmount}萬元</p>
          <p>貸款年限：${formData.loanYears}年</p>
          <p>寬限期：${formData.gracePeriod}年</p>
          <p>計算方式：${formData.calculationMethod === 'equal-payment' ? '本息平均攤還' : '本金平均攤還'}</p>
          <p>利率類型：${
            formData.rateType === 'single' ? '單一利率' :
            formData.rateType === 'two-tier' ? '兩段式利率' : '三段式利率'
          }</p>
          <p>利率：${
            formData.rateType === 'single' ? `${formData.rates.single}%` :
            formData.rateType === 'two-tier' ? `${formData.rates.twoTier[0]}% / ${formData.rates.twoTier[1]}%` :
            `${formData.rates.threeTier[0]}% / ${formData.rates.threeTier[1]}% / ${formData.rates.threeTier[2]}%`
          }</p>
        </div>
        <div class="summary">
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
.mortgage-calculator { max-width: 800px; margin: 0 auto; padding: 20px; }
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

.rate-tiers { background: #fcfcfc; padding: 15px; border-radius: 8px; border: 1px dashed #ddd; margin-bottom: 20px; }
.rate-tiers .form-group:last-child { margin-bottom: 0; }

@media (max-width: 600px) {
  .result-grid { grid-template-columns: 1fr; }
  .radio-group { flex-direction: column; gap: 10px; }
  .mortgage-calculator { padding: 15px; }
  .calculator-form, .calculation-result { padding: 15px; }
}

.grace-period-label {
  color: #e74c3c;
  font-size: 0.85em;
  font-weight: bold;
  margin-left: 8px;
}

/* 新增：SEO內容區塊樣式 (比照信貸計算機) */
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
</style>
