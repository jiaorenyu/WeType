import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
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
            打开即用，复制即走。30 秒完成从 Markdown 到精美排版的全部流程。
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
          <p className="section-subtitle">专注做好一件事：Markdown → 公众号排版</p>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </div>
              <h3>Markdown 编辑</h3>
              <p>语法高亮，实时预览。支持标题、加粗、列表、代码块等 95% 常用语法。</p>
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
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h3>完全免登录</h3>
              <p>打开即用，无需注册账号。你的内容只保存在本地，隐私安全。</p>
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
              <h3>写 Markdown</h3>
              <p>在编辑器中撰写内容，支持所有常用 Markdown 语法。</p>
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
