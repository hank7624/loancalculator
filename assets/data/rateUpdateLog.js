// 利率更新日誌
export const rateUpdateLog = [
  {
    date: '2024-12-01',
    version: 'v1.1',
    summary: '央行降息政策調整，多家銀行跟進調降',
    changes: [
      {
        bank: '台灣銀行',
        type: '房貸',
        oldRate: 2.15,
        newRate: 2.05,
        change: -0.10,
        reason: '央行降息政策',
        effectiveDate: '2024-12-01'
      },
      {
        bank: '台灣銀行',
        type: '信貸',
        oldRate: 6.88,
        newRate: 6.78,
        change: -0.10,
        reason: '央行降息政策',
        effectiveDate: '2024-12-01'
      },
      {
        bank: '玉山銀行',
        type: '房貸',
        oldRate: 2.18,
        newRate: 2.08,
        change: -0.10,
        reason: '青年首購專案優惠',
        effectiveDate: '2024-12-01'
      }
    ]
  },
  {
    date: '2024-11-15',
    version: 'v1.0',
    summary: '初始利率數據建立',
    changes: [
      {
        bank: '台灣銀行',
        type: '房貸',
        oldRate: null,
        newRate: 2.15,
        change: null,
        reason: '初始數據',
        effectiveDate: '2024-11-15'
      },
      {
        bank: '中國信託',
        type: '房貸',
        oldRate: null,
        newRate: 2.25,
        change: null,
        reason: '初始數據',
        effectiveDate: '2024-11-15'
      }
      // ... 其他銀行的初始數據
    ]
  }
];

// 獲取最新更新信息
export const getLatestUpdate = () => rateUpdateLog[0];

// 獲取指定銀行的更新歷史
export const getBankUpdateHistory = (bankName) => {
  return rateUpdateLog.flatMap(update => 
    update.changes.filter(change => change.bank === bankName)
  );
};

// 獲取指定貸款類型的更新歷史
export const getLoanTypeUpdateHistory = (loanType) => {
  return rateUpdateLog.flatMap(update => 
    update.changes.filter(change => change.type === loanType)
  );
};

// 計算利率變化統計
export const getRateChangeStats = () => {
  const allChanges = rateUpdateLog.flatMap(update => update.changes);
  const validChanges = allChanges.filter(change => change.change !== null);
  
  if (validChanges.length === 0) return null;
  
  const totalChange = validChanges.reduce((sum, change) => sum + change.change, 0);
  const avgChange = totalChange / validChanges.length;
  const increaseCount = validChanges.filter(change => change.change > 0).length;
  const decreaseCount = validChanges.filter(change => change.change < 0).length;
  
  return {
    totalChanges: validChanges.length,
    averageChange: avgChange.toFixed(2),
    increaseCount,
    decreaseCount,
    lastUpdate: rateUpdateLog[0]?.date
  };
};
