import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './HomePage.css';

const SITE_URL = 'https://www.yigu.online';
const SITE_NAME = 'WriteNow';
const DEFAULT_DESC = 'WriteNow — 极简 Markdown 转公众号排版工具。类 Typora 所见即所得编辑，三套精美主题，一键复制到微信后台。免登录，开源免费，30 秒完成排版。';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <Helmet>
        <title>{SITE_NAME} — 极简 Markdown 转公众号排版工具</title>
        <meta name="description" content={DEFAULT_DESC} />
        <meta name="keywords" content="Markdown,公众号排版,微信排版,Markdown转公众号,排版工具,所见即所得" />

        {/* Open Graph */}
        <meta property="og:title" content={`${SITE_NAME} — 极简 Markdown 转公众号排版工具`} />
        <meta property="og:description" content={DEFAULT_DESC} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:locale" content="zh_CN" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${SITE_NAME} — 极简 Markdown 转公众号排版工具`} />
        <meta name="twitter:description" content={DEFAULT_DESC} />

        {/* 结构化数据 */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: SITE_NAME,
            url: SITE_URL,
            description: DEFAULT_DESC,
            applicationCategory: 'UtilityApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'CNY',
            },
            author: {
              '@type': 'Person',
              name: 'WriteNow',
            },
          })}
        </script>
      </Helmet>

      {/* 导航栏 */}
      <nav className="home-nav">
        <div className="home-nav-inner">
          <div className="home-logo">
            <h1>WriteNow</h1>
          </div>
          <button className="nav-cta-button" onClick={() => navigate('/editor')}>
            开始排版
          </button>
        </div>
      </nav>

      {/* Hero 区域 */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <div className="hero-badge">免登录 · 开源 · 免费</div>
          <h2 className="hero-title">
            极简 <span className="hero-highlight">Markdown</span> 转<br />
            公众号排版工具
          </h2>
          <p className="hero-subtitle">
            Write, Format, Publish.
          </p>
          <p className="hero-description">
            类 Typora 的所见即所得编辑体验，搭配手机实时预览。打开即用，复制即走。30 秒完成从写作到精美排版的全部流程。
          </p>
          <div className="hero-actions">
            <button className="hero-cta" onClick={() => navigate('/editor')}>
              开始使用
              <span className="hero-cta-arrow">→</span>
            </button>
            <button className="hero-secondary" onClick={() => {
              const featuresEl = document.getElementById('features');
              featuresEl?.scrollIntoView({ behavior: 'smooth' });
            }}>
              了解更多
            </button>
          </div>
        </div>
      </section>

      {/* 特性区域 */}
      <section id="features" className="features">
        <div className="features-inner">
          <h2 className="section-title">为什么选择 WriteNow？</h2>
          <p className="section-subtitle">专注做好一件事：从写作到排版，30 秒完成</p>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <h3>所见即所得编辑</h3>
              <p>类 Typora 的富文本编辑体验，同时兼容原生 Markdown 语法。支持标题、加粗、引用、代码块，边写边渲染。</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>
              <h3>三套精美主题</h3>
              <p>极客代码、文艺阅读、简约商务。设计师打磨，一键切换，丝滑过渡。</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  <rect x="8" y="2" width="8" height="4" rx="1" />
                </svg>
              </div>
              <h3>一键复制到公众号</h3>
              <p>样式自动内联化，完美兼容微信后台。粘贴即用，无需二次调整。</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <line x1="12" y1="18" x2="12" y2="18" />
                </svg>
              </div>
              <h3>完全免登录</h3>
              <p>打开即用，无需注册账号。你的内容只保存在本地，隐私安全。</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <h3>手机实时预览</h3>
              <p>一键切换手机预览模式，在模拟手机框中实时查看文章效果，排版所见即所得。</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="4 7 4 4 20 4 20 7" />
                  <line x1="9" y1="20" x2="15" y2="20" />
                  <line x1="12" y1="4" x2="12" y2="20" />
                </svg>
              </div>
              <h3>富文本工具栏</h3>
              <p>支持 H1-H3 标题、粗体、斜体、引用、列表、代码块等快捷键和工具栏按钮，无需记忆语法。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 使用流程 */}
      <section className="how-it-works">
        <div className="how-it-works-inner">
          <h2 className="section-title">三步完成排版</h2>
          <p className="section-subtitle">比想象中更简单</p>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>写内容</h3>
              <p>在所见即所得编辑器中直接撰写，或粘贴 Markdown 内容。</p>
            </div>
            <div className="step-connector" />
            <div className="step">
              <div className="step-number">2</div>
              <h3>选主题</h3>
              <p>在 3 套精美主题中选择你喜欢的风格，实时预览效果。</p>
            </div>
            <div className="step-connector" />
            <div className="step">
              <div className="step-number">3</div>
              <h3>复制发布</h3>
              <p>点击"复制到公众号"，粘贴到微信后台，完成发布。</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 区域 */}
      <section className="home-cta">
        <div className="home-cta-inner">
          <h2 className="home-cta-title">准备好开始了吗？</h2>
          <p className="home-cta-text">无需注册，打开即用</p>
          <button className="hero-cta" onClick={() => navigate('/editor')}>
            开始排版
            <span className="hero-cta-arrow">→</span>
          </button>
        </div>
      </section>

      {/* 底部 */}
      <footer className="home-footer">
        <div className="home-footer-inner">
          <div className="home-footer-brand">
            <h3>WriteNow</h3>
            <p>Write, Format, Publish.</p>
          </div>
          <div className="home-footer-links">
            <span>开源项目 ·</span>
            <span>
              <a href="https://github.com/jiaorenyu/WeType" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
