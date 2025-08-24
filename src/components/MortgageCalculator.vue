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
  name: 'MortgageCalculator',
  setup() {
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
        errors.mortgageAmount = '房貸金額必須在 1 到 9,999 萬元之間'
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
           
           // 計算總付款（寬限期只繳利息 + 還款期間繳本息）
           const graceInterest = principal * monthlyRate * graceMonths
           const paymentTotal = firstYearPayment * actualPaymentMonths
           totalPayment = graceInterest + paymentTotal
           totalInterest = totalPayment - principal
           
           // 生成還款明細（包含寬限期）
           schedule = generateEqualPaymentScheduleWithGrace(principal, monthlyRate, totalMonths, graceMonths, firstYearPayment)
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
           
           // 計算總付款（寬限期只繳利息 + 還款期間繳本息）
           let graceInterest = 0
           for (let year = 1; year <= formData.gracePeriod; year++) {
             const rate = year <= 1 ? firstRate : secondRate
             graceInterest += principal * rate * 12
           }
           
           const paymentTotal = firstYearPayment * actualPaymentMonths
           totalPayment = graceInterest + paymentTotal
           totalInterest = totalPayment - principal
           
           // 生成還款明細（包含寬限期）
           schedule = generateTwoTierScheduleWithGrace(principal, firstRate, secondRate, totalMonths, graceMonths, firstYearPayment, secondYearPayment)
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
             
             // 第1年使用第一段利率（1%），計算整個貸款期間的月付金
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
               
                            // 使用更穩定的計算方法，避免 Math.pow 產生過大數值
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
           
           // 計算總付款（寬限期只繳利息 + 還款期間繳本息）
           let graceInterest = 0
           for (let year = 1; year <= formData.gracePeriod; year++) {
             const rate = year <= 1 ? firstRate : (year <= 2 ? secondRate : thirdRate)
             graceInterest += principal * rate * 12
           }
           
           const paymentTotal = firstYearPayment * actualPaymentMonths
           totalPayment = graceInterest + paymentTotal
           totalInterest = totalPayment - principal
           
           // 生成還款明細
           schedule = generateThreeTierScheduleWithGrace(principal, firstRate, secondRate, thirdRate, totalMonths, graceMonths, firstYearPayment, secondYearPayment, thirdYearPayment)
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
           schedule = generateEqualPrincipalScheduleWithGrace(principal, monthlyRate, totalMonths, graceMonths, monthlyPrincipal)
           
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
           schedule = generateTwoTierEqualPrincipalScheduleWithGrace(principal, firstRate, secondRate, totalMonths, graceMonths, monthlyPrincipal)
           
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
           schedule = generateThreeTierEqualPrincipalScheduleWithGrace(principal, firstRate, secondRate, thirdRate, totalMonths, graceMonths, monthlyPrincipal)
           
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
       console.log('Debug - isNaN(firstYearPayment):', isNaN(firstYearPayment))
       console.log('Debug - isFinite(firstYearPayment):', isFinite(firstYearPayment))
       
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

         const generateEqualPaymentSchedule = (principal, monthlyRate, totalPeriods, monthlyPayment) => {
       const schedule = []
       let remainingBalance = principal

       for (let period = 1; period <= totalPeriods; period++) {
         const interest = remainingBalance * monthlyRate
         const principalPayment = monthlyPayment - interest
         remainingBalance -= principalPayment

         schedule.push({
           period,
           payment: monthlyPayment,
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

       for (let period = 1; period <= totalPeriods; period++) {
         const interest = remainingBalance * monthlyRate
         const payment = monthlyPrincipal + interest
         remainingBalance -= monthlyPrincipal

         schedule.push({
           period,
           payment,
           principal: monthlyPrincipal,
           interest,
           remainingBalance: Math.max(0, remainingBalance)
         })
       }

       return schedule
     }

     const generateTwoTierSchedule = (principal, firstRate, secondRate, totalPeriods, firstPayment, secondPayment) => {
       const schedule = []
       let remainingBalance = principal

       for (let period = 1; period <= totalPeriods; period++) {
         let payment, interest, principalPayment
         
         if (period <= 12) {
           // 第一年使用第一段利率
           interest = remainingBalance * firstRate
           payment = firstPayment
           principalPayment = payment - interest
         } else {
           // 第二年以後使用第二段利率
           interest = remainingBalance * secondRate
           payment = secondPayment
           principalPayment = payment - interest
         }
         
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

     const generateThreeTierSchedule = (principal, firstRate, secondRate, thirdRate, totalPeriods, firstPayment, secondPayment, thirdPayment) => {
       const schedule = []
       let remainingBalance = principal

       for (let period = 1; period <= totalPeriods; period++) {
         let payment, interest, principalPayment
         
         if (period <= 12) {
           // 第一年使用第一段利率
           interest = remainingBalance * firstRate
           payment = firstPayment
           principalPayment = payment - interest
         } else if (period <= 24) {
           // 第二年使用第二段利率
           interest = remainingBalance * secondRate
           payment = secondPayment
           principalPayment = payment - interest
         } else {
           // 第三年以後使用第三段利率
           interest = remainingBalance * thirdRate
           payment = thirdPayment
           principalPayment = payment - interest
         }
         
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

     const generateTwoTierEqualPrincipalSchedule = (principal, firstRate, secondRate, totalPeriods, monthlyPrincipal) => {
       const schedule = []
       let remainingBalance = principal

       for (let period = 1; period <= totalPeriods; period++) {
         let interest, payment
         
         if (period <= 12) {
           // 第一年使用第一段利率
           interest = remainingBalance * firstRate
           payment = monthlyPrincipal + interest
         } else {
           // 第二年以後使用第二段利率
           interest = remainingBalance * secondRate
           payment = monthlyPrincipal + interest
         }
         
         remainingBalance -= monthlyPrincipal

         schedule.push({
           period,
           payment,
           principal: monthlyPrincipal,
           interest,
           remainingBalance: Math.max(0, remainingBalance)
         })
       }

       return schedule
     }

     const generateThreeTierEqualPrincipalSchedule = (principal, firstRate, secondRate, thirdRate, totalPeriods, monthlyPrincipal) => {
       const schedule = []
       let remainingBalance = principal

       for (let period = 1; period <= totalPeriods; period++) {
         let interest, payment
         
         if (period <= 12) {
           // 第一年使用第一段利率
           interest = remainingBalance * firstRate
           payment = monthlyPrincipal + interest
         } else if (period <= 24) {
           // 第二年使用第二段利率
           interest = remainingBalance * secondRate
           payment = monthlyPrincipal + interest
         } else {
           // 第三年以後使用第三段利率
           interest = remainingBalance * thirdRate
           payment = monthlyPrincipal + interest
         }
         
         remainingBalance -= monthlyPrincipal

         schedule.push({
           period,
           payment,
           principal: monthlyPrincipal,
           interest,
           remainingBalance: Math.max(0, remainingBalance)
         })
       }

       return schedule
     }

     // 包含寬限期的還款明細表生成函數
     const generateEqualPaymentScheduleWithGrace = (principal, monthlyRate, totalMonths, graceMonths, monthlyPayment) => {
       const schedule = []
       let remainingBalance = principal

       for (let period = 1; period <= totalMonths; period++) {
         let payment, interest, principalPayment
         
         if (period <= graceMonths) {
           // 寬限期內只繳利息
           interest = remainingBalance * monthlyRate
           payment = interest
           principalPayment = 0
         } else {
           // 寬限期後繳本息
           interest = remainingBalance * monthlyRate
           payment = monthlyPayment
           principalPayment = payment - interest
           remainingBalance -= principalPayment
         }

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

     const generateTwoTierScheduleWithGrace = (principal, firstRate, secondRate, totalMonths, graceMonths, firstPayment, secondPayment) => {
       const schedule = []
       let remainingBalance = principal

       for (let period = 1; period <= totalMonths; period++) {
         let payment, interest, principalPayment
         
         if (period <= graceMonths) {
           // 寬限期內只繳利息（使用第一段利率）
           interest = remainingBalance * firstRate
           payment = interest
           principalPayment = 0
         } else if (period <= graceMonths + 12) {
           // 第一年使用第一段利率
           interest = remainingBalance * firstRate
           payment = firstPayment
           principalPayment = payment - interest
           remainingBalance -= principalPayment
         } else {
           // 第二年以後使用第二段利率
           interest = remainingBalance * secondRate
           payment = secondPayment
           principalPayment = payment - interest
           remainingBalance -= principalPayment
         }

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

     const generateThreeTierScheduleWithGrace = (principal, firstRate, secondRate, thirdRate, totalMonths, graceMonths, firstPayment, secondPayment, thirdPayment) => {
       const schedule = []
       let remainingBalance = principal

       for (let period = 1; period <= totalMonths; period++) {
         let payment, interest, principalPayment
         
         if (period <= graceMonths) {
           // 寬限期內只繳利息（根據年份使用對應利率）
           const year = Math.ceil(period / 12)
           let rate
           if (year === 1) rate = firstRate
           else if (year === 2) rate = secondRate
           else rate = thirdRate
           interest = remainingBalance * rate
           payment = interest
           principalPayment = 0
         } else {
           // 寬限期後開始還本付息
           const paymentPeriod = period - graceMonths
           const paymentYear = Math.ceil(paymentPeriod / 12)
           
           if (formData.gracePeriod === 0) {
             // 無寬限期：第1年使用第一段利率，第2年使用第二段利率，第3年開始使用第三段利率
             if (paymentYear === 1) {
               interest = remainingBalance * firstRate
               payment = firstPayment
             } else if (paymentYear === 2) {
               interest = remainingBalance * secondRate
               payment = secondPayment
             } else {
               interest = remainingBalance * thirdRate
               payment = thirdPayment
             }
           } else {
             // 有寬限期：第1年還款期間使用第二段利率，第2年開始使用第三段利率
             if (paymentYear === 1) {
               interest = remainingBalance * secondRate
               payment = firstPayment
             } else {
               interest = remainingBalance * thirdRate
               payment = thirdPayment
             }
           }
           
           principalPayment = payment - interest
           remainingBalance -= principalPayment
         }

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

     const generateEqualPrincipalScheduleWithGrace = (principal, monthlyRate, totalMonths, graceMonths, monthlyPrincipal) => {
       const schedule = []
       let remainingBalance = principal

       for (let period = 1; period <= totalMonths; period++) {
         let interest, payment, principalPayment
         
         if (period <= graceMonths) {
           // 寬限期內只繳利息
           interest = remainingBalance * monthlyRate
           payment = interest
           principalPayment = 0
         } else {
           // 寬限期後繳本息
           interest = remainingBalance * monthlyRate
           payment = monthlyPrincipal + interest
           principalPayment = monthlyPrincipal
           remainingBalance -= monthlyPrincipal
         }

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

     const generateTwoTierEqualPrincipalScheduleWithGrace = (principal, firstRate, secondRate, totalMonths, graceMonths, monthlyPrincipal) => {
       const schedule = []
       let remainingBalance = principal

       for (let period = 1; period <= totalMonths; period++) {
         let interest, payment, principalPayment
         
         if (period <= graceMonths) {
           // 寬限期內只繳利息（根據年份使用對應利率）
           const year = Math.ceil(period / 12)
           let rate
           if (year <= 1) rate = firstRate
           else rate = secondRate
           interest = remainingBalance * rate
           payment = interest
           principalPayment = 0
         } else {
           // 寬限期後開始還本付息，使用第二段利率
           interest = remainingBalance * secondRate
           payment = monthlyPrincipal + interest
           principalPayment = monthlyPrincipal
           remainingBalance -= monthlyPrincipal
         }

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

     const generateThreeTierEqualPrincipalScheduleWithGrace = (principal, firstRate, secondRate, thirdRate, totalMonths, graceMonths, monthlyPrincipal) => {
       const schedule = []
       let remainingBalance = principal

       for (let period = 1; period <= totalMonths; period++) {
         let interest, payment, principalPayment
         
         if (period <= graceMonths) {
           // 寬限期內只繳利息（根據年份使用對應利率）
           const year = Math.ceil(period / 12)
           let rate
           if (year <= 1) rate = firstRate
           else if (year <= 2) rate = secondRate
           else rate = thirdRate
           interest = remainingBalance * rate
           payment = interest
           principalPayment = 0
         } else {
           // 寬限期後開始還本付息，使用第三段利率
           interest = remainingBalance * thirdRate
           payment = monthlyPrincipal + interest
           principalPayment = monthlyPrincipal
           remainingBalance -= monthlyPrincipal
         }

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

    return {
      formData,
      errors,
      calculationResult,
      isFormValid,
      resetRates,
      validateInput,
      calculateMortgage,
      formatCurrency,
      printSchedule
    }
  }
}
</script>
