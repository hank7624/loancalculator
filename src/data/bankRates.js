export const bankRates = {
  lastUpdate: '2025-08-08',
  banks: [
         {
       id: 'bot',
       name: '台灣銀行',
       logo: '🏦',
       website: 'https://cln.bot.com.tw/fln/fln01002/010?loan=HLN',
       rates: {
         mortgage: { 
           rate: '1.775%', 
           type: '固定', 
           note: '首購優惠利率',
           minAmount: '依鑑價金額',
           maxAmount: '依鑑價金額'
         },
         credit: { 
           rate: '2.985%起', 
           type: '浮動', 
           note: '公教/優質企業員工',
           minAmount: 100000,
           maxAmount: '200萬',
           website: 'https://cln.bot.com.tw/fln/fln01002/010?loan=CLN'
         }
       }
     },
         {
       id: 'ctbc',
       name: '中國信託',
       logo: '🏛️',
       website: 'https://www.ctbcbank.com/content/dam/minisite/long/loan/mortgage/product01.html?MediaChannel=ctbcpromo4&ActivityCode=27000',
       rates: {
         mortgage: { 
           rate: '2.68%起', 
           type: '浮動', 
           note: '一般型房貸',
           minAmount: '依鑑價金額',
           maxAmount: '依鑑價金額'
         },
         credit: { 
           rate: '3.85%起', 
           type: '浮動', 
           note: '中信薪轉戶',
           minAmount: 200000,
           maxAmount: '800萬',
           website: 'https://www.ctbcbank.com/twrbo/zh_tw/loan_index/personal_loan/personal_loan_product.html'
         }
       }
     },
         {
       id: 'esun',
       name: '玉山銀行',
       logo: '🏔️',
       website: 'https://www.esunbank.com/zh-tw/personal/loan/house',
       rates: {
         mortgage: { 
           rate: '2.50%起', 
           type: '浮動', 
           note: 'e指房貸',
           minAmount: '依鑑價金額',
           maxAmount: '依鑑價金額'
         },
         credit: { 
           rate: '3.3%起', 
           type: '浮動', 
           note: 'e指信貸',
           minAmount: 150000,
           maxAmount: '500萬',
           website: 'https://www.esunbank.com/zh-tw/personal/loan/personal'
         }
       }
     },
         {
       id: 'cathay',
       name: '國泰世華',
       logo: '🌳',
       website: 'https://www.cathaybk.com.tw/cathaybk/personal/loan/product/mortgage/',
       rates: {
         mortgage: { 
           rate: '2.72%起', 
           type: '浮動', 
           note: '一般購屋貸款',
           minAmount: '依鑑價金額',
           maxAmount: '依鑑價金額'
         },
         credit: { 
           rate: '4.73%起', 
           type: '浮動', 
           note: '泰幸福信用貸款',
           minAmount: 300000,
           maxAmount: '300萬',
           website: 'https://www.cathaybk.com.tw/cathaybk/personal/loan/product/personal-loan/'
         }
       }
     },
         {
       id: 'fubon',
       name: '富邦銀行',
       logo: '💰',
       website: 'https://www.fubon.com/banking/personal/mortgage/all_plan/myplan.htm',
       rates: {
         mortgage: { 
           rate: '2.65%起', 
           type: '浮動', 
           note: '富邦購屋房貸',
           minAmount: '依鑑價金額',
           maxAmount: '依鑑價金額'
         },
         credit: { 
           rate: '3.50%起', 
           type: '浮動', 
           note: '富邦一般信貸',
           minAmount: 180000,
           maxAmount: '500萬',
           website: 'https://www.fubon.com/banking/personal/personal_loan/all_plan/myplan.htm'
         }
       }
     },
         {
       id: 'shinhan',
       name: '新光銀行',
       logo: '✨',
       website: 'https://www.skbank.com.tw/houseloan',
       rates: {
         mortgage: { 
           rate: '2.50%起', 
           type: '浮動', 
           note: '一般優惠房貸',
           minAmount: '依鑑價金額',
           maxAmount: '依鑑價金額'
         },
         credit: { 
           rate: '4.24%起', 
           type: '浮動', 
           note: '上班族專案',
           minAmount: 200000,
           maxAmount: '300萬',
           website: 'https://www.skbank.com.tw/CC-Loan'
         }
       }
     }
  ]
};

// 获取所有银行名称
export const getBankNames = () => bankRates.banks.map(bank => bank.name);

 // 获取指定贷款类型的所有利率
 export const getRatesByType = (loanType) => {
   return bankRates.banks.map(bank => ({
     name: bank.name,
     logo: bank.logo,
     website: bank.rates[loanType].website || bank.website, // 優先使用貸款類型專用連結
     rate: bank.rates[loanType].rate,
     type: bank.rates[loanType].type,
     note: bank.rates[loanType].note,
     minAmount: bank.rates[loanType].minAmount,
     maxAmount: bank.rates[loanType].maxAmount
   }));
 };

// 按利率排序
export const sortRatesByValue = (rates, ascending = true) => {
  return [...rates].sort((a, b) => {
    // 提取利率數值進行排序（移除%和起字）
    const getRateValue = (rate) => {
      if (typeof rate === 'string') {
        return parseFloat(rate.replace(/[%起]/g, ''));
      }
      return rate;
    };
    
    const rateA = getRateValue(a.rate);
    const rateB = getRateValue(b.rate);
    
    return ascending ? rateA - rateB : rateB - rateA;
  });
};

// 获取利率范围
export const getRateRange = (loanType) => {
  const rates = getRatesByType(loanType);
  
  // 提取利率數值進行計算（移除%和起字）
  const getRateValue = (rate) => {
    if (typeof rate === 'string') {
      return parseFloat(rate.replace(/[%起]/g, ''));
    }
    return rate;
  };
  
  const rateValues = rates.map(r => getRateValue(r.rate));
  const minRate = Math.min(...rateValues);
  const maxRate = Math.max(...rateValues);
  
  return { minRate, maxRate };
};
