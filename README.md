# 免費貸款計算機 (Free Loan Calculator)

一個專業的信貸、車貸和房貸計算工具，支援多種還款方式和利率類型。

## 🚀 功能特色

### 信貸/車貸計算器
- 支援本息平均攤還（銀行常用）和本金平均攤還兩種方式
- 精確計算月付金、總利息、繳款總金額
- 生成完整的還款明細表
- 支援列印功能

### 房貸計算器
- 支援單一利率、兩段式利率、三段式利率
- 寬限期設定（0-5年）
- 貸款年限選擇（1-50年）
- 智能計算不同利率階段的月付金
- 詳細的還款明細表

## 🛠️ 技術架構

- **前端框架**: Vue 3 (Composition API)
- **構建工具**: Vite
- **開發語言**: JavaScript
- **樣式**: CSS3
- **部署**: 靜態網頁應用

## 📦 安裝與運行

### 前置需求
- Node.js 16.0 或更高版本
- npm 或 yarn

### 安裝步驟
```bash
# 克隆專案
git clone [你的GitHub倉庫URL]
cd loancalculator

# 安裝依賴
npm install

# 啟動開發服務器
npm run dev

# 構建生產版本
npm run build

# 預覽生產版本
npm run preview
```

## 🌐 使用方式

1. 選擇計算器類型（信貸/車貸 或 房貸）
2. 輸入相關參數（貸款金額、利率、期數等）
3. 選擇計算方式和利率類型
4. 點擊計算按鈕
5. 查看計算結果和還款明細表
6. 可選擇列印還款明細表

## 📊 計算公式

### 本息平均攤還
```
月付金 = 本金 × (月利率 × (1 + 月利率)^期數) / ((1 + 月利率)^期數 - 1)
```

### 本金平均攤還
```
月付金 = 月還本金 + 當期利息
月還本金 = 總本金 / 總期數
當期利息 = 剩餘本金 × 月利率
```

## 🔧 專案結構

```
loancalculator/
├── src/
│   ├── components/
│   │   ├── CreditCalculator.vue    # 信貸/車貸計算器
│   │   └── MortgageCalculator.vue  # 房貸計算器
│   ├── App.vue                     # 主應用組件
│   ├── main.js                     # 應用入口
│   └── style.css                   # 全局樣式
├── public/                         # 靜態資源
├── index.html                      # HTML 入口
└── vite.config.js                  # Vite 配置
```

## 📝 開發說明

### 新增功能
- 在 `src/components/` 目錄下創建新的 Vue 組件
- 在 `App.vue` 中引入並使用新組件
- 更新樣式文件以保持一致性

### 修改計算邏輯
- 信貸計算邏輯位於 `CreditCalculator.vue`
- 房貸計算邏輯位於 `MortgageCalculator.vue`
- 所有計算函數都有詳細註釋

## 🚀 部署

### GitHub Pages
1. 構建專案：`npm run build`
2. 將 `dist` 目錄內容推送到 GitHub Pages 分支

### 其他平台
- Netlify
- Vercel
- 任何支援靜態網站的託管服務

## 📄 授權

本專案僅供學習和參考使用。實際貸款條件請以銀行公告為準。

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📞 聯絡方式

如有問題或建議，請在 GitHub 上提交 Issue。

---

**注意**: 本工具僅供參考，實際貸款條件請以銀行公告為準。
