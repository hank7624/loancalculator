import fs from 'fs'
import path from 'path'

// 自行讀取假資料以產生靜態路由
// 將原本的 JS parse 抓出 id 與 title (這裡為求穩定，使用簡單的字串解析或直接引入)

export default defineNuxtConfig({
  ssr: true,
  app: {
    head: {
      titleTemplate: '%s | 免費貸款計算機',
      title: '免費貸款計算機 - 現代化專業版',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '專業的信貸、車貸/房貸計算工具，支援多種還款方式' }
      ]
    }
  },
  css: [
    '~/assets/css/main.css'
  ],
  hooks: {
    async 'nitro:config'(nitroConfig) {
      if (nitroConfig.dev) { return }
      
      // 動態讀取文章列表並加入預渲染
      const dataFilePath = path.resolve(__dirname, 'assets/articles-home-data.js')
      try {
        const fileContent = fs.readFileSync(dataFilePath, 'utf-8')
        // 簡單解析 JS 陣列
        const match = fileContent.match(/export default \[(.*?)\];/s)
        if (match) {
           // 我們不需要完美 parse，只要爬出所有 id 與 title
           const idMatches = [...fileContent.matchAll(/id:\s*(\d+)/g)]
           const titleMatches = [...fileContent.matchAll(/title:\s*['"](.*?)['"]/g)]
           
           if(idMatches.length > 0) {
              const routes = idMatches.map((m, index) => {
                const id = m[1]
                const title = titleMatches[index] ? titleMatches[index][1] : ''
                const slug = title.replace(/\s+/g, '-').replace(/[^\w\-\u4e00-\u9fa5]/g, '')
                return `/articles/${id}-${slug}`
              })
              nitroConfig.prerender = nitroConfig.prerender || {}
              nitroConfig.prerender.routes = nitroConfig.prerender.routes || []
              nitroConfig.prerender.routes.push(...routes)
           }
        }
      } catch(e) {
        console.error('Failed to parse dynamic routes', e)
      }
    }
  }
})
