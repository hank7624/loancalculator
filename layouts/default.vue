<template>
  <div class="layout-wrapper">
    <!-- 頂層極簡導覽列 -->
    <header class="navbar">
      <div class="navbar-container container">
        <NuxtLink to="/" class="logo">
          <span class="logo-icon">🧮</span>
          <span class="logo-text">免費貸款計算機</span>
        </NuxtLink>
        <div class="nav-actions">
          <NuxtLink to="/articles" class="btn-ghost">專欄文章</NuxtLink>
          <NuxtLink to="/glossary" class="btn-ghost">貸款百科</NuxtLink>
        </div>
      </div>
    </header>

    <!-- 頂部廣告區塊 (AdSense) -->
    <div class="ad-container">
      <!-- 請在此替換您的 AdSense 程式碼 -->
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
           data-ad-slot="XXXXXXXXXX"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>

    <!-- 主要內容區 -->
    <main class="page-content">
      <slot />
    </main>

    <!-- 極簡頁腳 -->
    <footer class="footer">
      <div class="container footer-content">
        <div class="footer-links">
          <NuxtLink to="/about">關於我們</NuxtLink>
          <span class="divider">|</span>
          <NuxtLink to="/privacy">隱私權政策</NuxtLink>
          <span class="divider">|</span>
          <NuxtLink to="/terms">使用條款</NuxtLink>
        </div>
        <p class="copyright">© 2026 免費貸款計算機 | 理性理財，量入為出</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.navbar {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid var(--border-color);
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
}

.logo-text {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--primary-dark);
}

.nav-actions {
  display: flex;
  gap: 8px;
}

.page-content {
  flex-grow: 1;
  padding: 24px 0;
}

.footer {
  text-align: center;
  padding: 32px 0;
  background-color: var(--surface-color);
  border-top: 1px solid var(--border-color);
  margin-top: auto;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 12px;
  font-size: 0.9rem;
}

.footer-links a {
  color: var(--text-muted);
  text-decoration: none;
}

.footer-links a:hover {
  color: var(--primary);
}

.divider {
  color: var(--border-color);
}

.copyright {
  font-size: 0.8rem;
  color: #9ca3af;
}
</style>
