import { createRouter, createWebHistory } from 'vue-router'

// 1. 定義路由組件
// 使用動態導入 (Lazy Loading) 優化效能
const Home = () => import('../components/Home.vue') // 需從 App.vue 把首頁內容抽離出來
const CreditCalculator = () => import('../components/CreditCalculator.vue')
const MortgageCalculator = () => import('../components/MortgageCalculator.vue')
const BankRateComparison = () => import('../components/BankRateComparison.vue')
const Articles = () => import('../components/Articles.vue')
const AboutUs = () => import('../components/AboutUs.vue')
const PrivacyPolicy = () => import('../components/PrivacyPolicy.vue')
const TermsOfService = () => import('../components/TermsOfService.vue')
const LoanKnowledge = () => import('../components/LoanKnowledge.vue')
// const ArticleDetail = () => import('../components/ArticleDetail.vue') // 如果需要單獨文章頁

// 暫時將首頁內容與 App.vue 保持一致，我們稍後會重構 App.vue
// 為了避免大規模移動程式碼造成錯誤，我們採用漸進式策略：
// 1. 路由配置指向現有組件
// 2. 特殊邏輯（如 Articles 傳參）在路由中處理

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { title: '免費貸款計算機 - 首頁' }
    },
    {
        path: '/credit',
        name: 'Credit',
        component: CreditCalculator,
        meta: { title: '信貸/車貸計算機 | 免費貸款計算機' }
    },
    {
        path: '/mortgage',
        name: 'Mortgage',
        component: MortgageCalculator,
        meta: { title: '房貸試算工具 | 免費貸款計算機' }
    },
    {
        path: '/rates',
        name: 'Rates',
        component: BankRateComparison,
        meta: { title: '銀行利率比較 | 免費貸款計算機' }
    },
    {
        path: '/articles',
        name: 'Articles',
        component: Articles,
        meta: { title: '專欄文章 | 免費貸款計算機' }
    },
    {
        path: '/about',
        name: 'About',
        component: AboutUs,
        meta: { title: '關於我們 | 免費貸款計算機' }
    },
    {
        path: '/privacy',
        name: 'Privacy',
        component: PrivacyPolicy,
        meta: { title: '隱私權政策 | 免費貸款計算機' }
    },
    {
        path: '/terms',
        name: 'Terms',
        component: TermsOfService,
        meta: { title: '使用條款 | 免費貸款計算機' }
    },
    {
        path: '/knowledge',
        name: 'Knowledge',
        component: LoanKnowledge,
        meta: { title: '貸款知識庫 | 免費貸款計算機' }
    },
    // 捕捉 404
    { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

// 全局導航守衛：更新標題
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

export default router
