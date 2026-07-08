import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import HomeClientLogic from '@/components/HomeClientLogic';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <main className="home-page-root">
      <HomeClientLogic />

      <div className="cursor" id="cursor"></div>
      <div className="cursor-ring" id="cursorRing"></div>

      {/* NAV */}
      <nav id="nav">
        <Link className="nav-logo" href="/" style={{ textDecoration: "none" }}>
          <div className="logo-icon">🛍️</div>
          DukaanHai
        </Link>
        <ul className="nav-links">
          <li><Link href="#how">How It Works</Link></li>
          <li><Link href="#features">Features</Link></li>
          <li><Link href="#pricing">Pricing</Link></li>
          <li>
            {session ? (
              <Link href="/dashboard" className="nav-cta">Dashboard →</Link>
            ) : (
              <Link href="/register" className="nav-cta">Start Free →</Link>
            )}
          </li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-blob blob-1"></div>
        <div className="hero-bg-blob blob-2"></div>
        <div className="hero-bg-blob blob-3"></div>

        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-badge"><span className="badge-dot"></span> Now in Early Access — Free Forever Plan</div>
            <h1 className="hero-title">
              Your Online Store,<br />
              Built on <span className="highlight">WhatsApp</span>
            </h1>
            <p className="hero-sub">
              Message our AI on WhatsApp, answer a few questions, and watch your professional online store go live
              in minutes. No code. No designers. Just results.
            </p>
            <div className="hero-actions">
              {session ? (
                <Link href="/dashboard" className="btn-primary">
                  <span>💬</span> Go to Dashboard
                </Link>
              ) : (
                <Link href="/register" className="btn-primary">
                  <span>💬</span> Start on WhatsApp
                </Link>
              )}

              <Link href="#how" className="btn-secondary">
                See how it works →
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-num">2 min</div>
                <div className="stat-label">Average setup time</div>
              </div>
              <div className="stat">
                <div className="stat-num">10K+</div>
                <div className="stat-label">Stores created</div>
              </div>
              <div className="stat">
                <div className="stat-num">₹0</div>
                <div className="stat-label">To get started</div>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="phone-wrap">
              <div className="phone-glow"></div>

              <div className="floating-badge fb-1">
                <span>🚀</span> Store Live!
              </div>
              <div className="floating-badge fb-2">
                <span>🛒</span> 3 orders today
              </div>
              <div className="floating-badge fb-3" style={{ "fontSize": "0.72rem" }}>
                <span style={{ "color": "var(--green)" }}>●</span> AI Writing...
              </div>

              <div className="phone">
                <div className="phone-screen">
                  <div className="phone-header">
                    <div className="phone-avatar">🛍️</div>
                    <div className="phone-contact">
                      <div className="phone-contact-name">DukaanHai AI</div>
                      <div className="phone-contact-status">online</div>
                    </div>
                  </div>
                  <div className="phone-messages">
                    <div className="msg msg-bot">
                      👋 Namaste! Tell me your business name and what you sell.
                      <div className="msg-time">10:32</div>
                    </div>
                    <div className="msg msg-out">
                      Sharma Sarees, we sell handloom sarees
                      <div className="msg-time">10:33</div>
                    </div>
                    <div className="msg msg-bot">
                      Beautiful! Upload 3 product photos and I'll write AI descriptions for each.
                      <div className="msg-time">10:33</div>
                    </div>
                    <div className="msg msg-out">
                      [3 photos sent]
                      <div className="msg-time">10:34</div>
                    </div>
                    <div className="msg msg-bot">
                      ✨ Done! Your store is live:
                      <div className="link-card">
                        <div>sharma-sarees.dukaanhai.com</div>
                        <div className="link-card-url">Tap to view your store →</div>
                      </div>
                      <div className="msg-time">10:35</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker-wrap">
        <div className="ticker">
          <div className="ticker-item"><span className="ticker-dot">✦</span> WhatsApp-first setup</div>
          <div className="ticker-item"><span className="ticker-dot">✦</span> AI product descriptions</div>
          <div className="ticker-item"><span className="ticker-dot">✦</span> Custom subdomain included</div>
          <div className="ticker-item"><span className="ticker-dot">✦</span> Instant store link</div>
          <div className="ticker-item"><span className="ticker-dot">✦</span> No coding needed</div>
          <div className="ticker-item"><span className="ticker-dot">✦</span> Secure dashboard login via WhatsApp</div>
          <div className="ticker-item"><span className="ticker-dot">✦</span> AI image optimization</div>
          <div className="ticker-item"><span className="ticker-dot">✦</span> Launch in 2 minutes</div>
          {/* Duplicate for seamless loop */}
          <div className="ticker-item"><span className="ticker-dot">✦</span> WhatsApp-first setup</div>
          <div className="ticker-item"><span className="ticker-dot">✦</span> AI product descriptions</div>
          <div className="ticker-item"><span className="ticker-dot">✦</span> Custom subdomain included</div>
          <div className="ticker-item"><span className="ticker-dot">✦</span> Instant store link</div>
          <div className="ticker-item"><span className="ticker-dot">✦</span> No coding needed</div>
          <div className="ticker-item"><span className="ticker-dot">✦</span> Secure dashboard login via WhatsApp</div>
          <div className="ticker-item"><span className="ticker-dot">✦</span> AI image optimization</div>
          <div className="ticker-item"><span className="ticker-dot">✦</span> Launch in 2 minutes</div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="section" id="how">
        <div className="section-inner">
          <p className="section-tag reveal">How It Works</p>
          <h2 className="section-title reveal">From zero to store in three chats</h2>
          <p className="section-sub reveal">No forms, no dashboards, no confusion. Just a conversation on WhatsApp.</p>

          <div className="steps-grid">
            <div className="step-card reveal reveal-delay-1">
              <div className="step-num">01</div>
              <div className="step-icon">💬</div>
              <div className="step-title">Message the Bot</div>
              <p className="step-desc">Open WhatsApp and message DukaanHai. Our AI asks you a few simple questions —
                your business name, what you sell, and your location.</p>
            </div>
            <div className="step-card reveal reveal-delay-2">
              <div className="step-num">02</div>
              <div className="step-icon">📸</div>
              <div className="step-title">Send Your Products</div>
              <p className="step-desc">Upload product photos directly on WhatsApp. Our AI optimizes images, writes
                compelling descriptions, and sets up your catalog automatically.</p>
            </div>
            <div className="step-card reveal reveal-delay-3">
              <div className="step-num">03</div>
              <div className="step-icon">🚀</div>
              <div className="step-title">Go Live Instantly</div>
              <p className="step-desc">Receive your live store link — like yourshop.dukaanhai.com — directly on
                WhatsApp. Share it anywhere and start selling immediately.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section" id="features">
        <div className="features-inner">
          <p className="section-tag reveal">Everything You Need</p>
          <h2 className="section-title reveal">Powerful features,<br />zero complexity</h2>
          <p className="section-sub reveal">Built for India's small business owners. Everything a big brand has —
            delivered through a WhatsApp chat.</p>

          <div className="features-grid reveal">
            <div className="feat">
              <div className="feat-icon-wrap" style={{ "background": "rgba(37,211,102,0.12)" }}>🤖</div>
              <div className="feat-title">AI-Written Descriptions</div>
              <p className="feat-desc">Our AI reads your product photos and generates SEO-optimized, compelling
                product descriptions in seconds. In Hindi or English.</p>
            </div>
            <div className="feat">
              <div className="feat-icon-wrap" style={{ "background": "rgba(255,107,43,0.12)" }}>🖼️</div>
              <div className="feat-title">Smart Image Optimization</div>
              <p className="feat-desc">Automatic background removal, enhancement, and resizing. Your products always
                look professional, even from a basic smartphone photo.</p>
            </div>
            <div className="feat">
              <div className="feat-icon-wrap" style={{ "background": "rgba(255,200,50,0.12)" }}>🔗</div>
              <div className="feat-title">Instant Subdomain</div>
              <p className="feat-desc">Get a permanent, shareable link at yourstore.dukaanhai.com. Easy to remember,
                easy to share on any social platform or with customers.</p>
            </div>
            <div className="feat">
              <div className="feat-icon-wrap" style={{ "background": "rgba(100,150,255,0.12)" }}>🔐</div>
              <div className="feat-title">WhatsApp Login to Dashboard</div>
              <p className="feat-desc">No passwords. We send a secure login link to your WhatsApp. Manage orders, add
                products, and update content from any device — all through a clean dashboard.</p>
            </div>
            <div className="feat feat-big" style={{ "background": "rgba(255,255,255,0.05)" }}>
              <div style={{ "display": "flex", "gap": "40px", "alignItems": "center", "flexWrap": "wrap" }}>
                <div style={{ "flex": "1", "minWidth": "200px" }}>
                  <div className="feat-icon-wrap" style={{ "background": "rgba(37,211,102,0.12)" }}>📊</div>
                  <div className="feat-title">Live Store Analytics</div>
                  <p className="feat-desc">Track visits, product views, and customer engagement in real-time. Know
                    what's selling and what's not, right from your dashboard.</p>
                </div>
                <div style={{ "flex": "1", "minWidth": "200px" }}>
                  <div className="feat-icon-wrap" style={{ "background": "rgba(255,107,43,0.12)" }}>💳</div>
                  <div className="feat-title">Payments & Orders</div>
                  <p className="feat-desc">Accept UPI, cards, and more. All orders land in your dashboard and a
                    WhatsApp notification, so you never miss a sale.</p>
                </div>
                <div style={{ "flex": "1", "minWidth": "200px" }}>
                  <div className="feat-icon-wrap" style={{ "background": "rgba(200,100,255,0.12)" }}>🌐</div>
                  <div className="feat-title">Multi-language Ready</div>
                  <p className="feat-desc">Serve customers in their preferred language. Your store can display
                    content in Hindi, English, Tamil, Bengali, and more.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SHOWCASE */}
      <section className="showcase-section">
        <div className="showcase-inner">
          <p className="section-tag reveal">Live Stores</p>
          <h2 className="section-title reveal">Real businesses, real results</h2>
          <p className="section-sub reveal">Thousands of sellers across India are already live on DukaanHai.</p>

          <div className="store-cards reveal">
            <div className="store-card">
              <div className="store-img" style={{ "background": "linear-gradient(135deg,#ff9a9e,#fad0c4)", "color": "#c0392b" }}>
                <div className="store-img-pattern" style={{ "color": "#c0392b" }}></div>
                🌸
              </div>
              <div className="store-body">
                <div className="store-name">Priya's Boutique</div>
                <div className="store-url">priya-boutique.dukaanhai.com</div>
                <div className="store-meta">
                  <span className="store-pill">Fashion</span>
                  <span className="store-pill">Mumbai</span>
                </div>
              </div>
            </div>
            <div className="store-card">
              <div className="store-img" style={{ "background": "linear-gradient(135deg,#a1c4fd,#c2e9fb)", "color": "#2c6fad" }}>
                <div className="store-img-pattern" style={{ "color": "#2c6fad" }}></div>
                ⚡
              </div>
              <div className="store-body">
                <div className="store-name">Ravi Electronics</div>
                <div className="store-url">ravi-electronics.dukaanhai.com</div>
                <div className="store-meta">
                  <span className="store-pill">Electronics</span>
                  <span className="store-pill">Delhi</span>
                </div>
              </div>
            </div>
            <div className="store-card">
              <div className="store-img" style={{ "background": "linear-gradient(135deg,#fddb92,#d1fdff)", "color": "#b8860b" }}>
                <div className="store-img-pattern" style={{ "color": "#b8860b" }}></div>
                🍛
              </div>
              <div className="store-body">
                <div className="store-name">Amma's Kitchen</div>
                <div className="store-url">ammas-kitchen.dukaanhai.com</div>
                <div className="store-meta">
                  <span className="store-pill">Food</span>
                  <span className="store-pill">Chennai</span>
                </div>
              </div>
            </div>
            <div className="store-card">
              <div className="store-img" style={{ "background": "linear-gradient(135deg,#a8edea,#fed6e3)", "color": "#2c9687" }}>
                <div className="store-img-pattern" style={{ "color": "#2c9687" }}></div>
                🌿
              </div>
              <div className="store-body">
                <div className="store-name">Organic Nest</div>
                <div className="store-url">organic-nest.dukaanhai.com</div>
                <div className="store-meta">
                  <span className="store-pill">Organic</span>
                  <span className="store-pill">Pune</span>
                </div>
              </div>
            </div>
            <div className="store-card">
              <div className="store-img" style={{ "background": "linear-gradient(135deg,#f093fb,#f5576c)", "color": "white" }}>
                <div className="store-img-pattern" style={{ "color": "white" }}></div>
                💎
              </div>
              <div className="store-body">
                <div className="store-name">Meena Jewels</div>
                <div className="store-url">meena-jewels.dukaanhai.com</div>
                <div className="store-meta">
                  <span className="store-pill">Jewellery</span>
                  <span className="store-pill">Jaipur</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testi-section">
        <div className="testi-inner">
          <p className="section-tag reveal">Testimonials</p>
          <h2 className="section-title reveal">Sellers love DukaanHai</h2>

          <div className="testi-grid">
            <div className="testi reveal reveal-delay-1">
              <div className="testi-stars">★★★★★</div>
              <p className="testi-quote">"I thought I'd need to hire a developer. Within 10 minutes of chatting on
                WhatsApp, my saree store was live. My customers couldn't believe it."</p>
              <div className="testi-person">
                <div className="testi-avatar" style={{ "background": "linear-gradient(135deg,#ff9a9e,#fad0c4)" }}>🌸</div>
                <div>
                  <div className="testi-name">Sunita Sharma</div>
                  <div className="testi-loc">Handloom Seller, Varanasi</div>
                </div>
              </div>
            </div>
            <div className="testi reveal reveal-delay-2">
              <div className="testi-stars">★★★★★</div>
              <p className="testi-quote">"My old website cost ₹30,000 and took 3 months. DukaanHai did the same in 5
                minutes for free. The AI descriptions are actually better than what I wrote!"</p>
              <div className="testi-person">
                <div className="testi-avatar" style={{ "background": "linear-gradient(135deg,#a1c4fd,#c2e9fb)" }}>⚡</div>
                <div>
                  <div className="testi-name">Ravi Malhotra</div>
                  <div className="testi-loc">Electronics Shop, Lajpat Nagar</div>
                </div>
              </div>
            </div>
            <div className="testi reveal reveal-delay-3">
              <div className="testi-stars">★★★★★</div>
              <p className="testi-quote">"Ab meri dukan poori duniya dekh sakti hai! I just sent photos on WhatsApp
                and within minutes people from other cities started ordering my food products."</p>
              <div className="testi-person">
                <div className="testi-avatar" style={{ "background": "linear-gradient(135deg,#fddb92,#fad0c4)" }}>🍛</div>
                <div>
                  <div className="testi-name">Rekha Devi</div>
                  <div className="testi-loc">Home Food Business, Lucknow</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing-section" id="pricing">
        <div className="pricing-inner">
          <p className="section-tag reveal">Pricing</p>
          <h2 className="section-title reveal" style={{ "margin": "0 auto 14px" }}>Simple, honest pricing</h2>
          <p className="section-sub reveal" style={{ "margin": "0 auto" }}>Start free. Upgrade when you're ready to grow.</p>

          <div className="pricing-grid reveal">
            <div className="price-card">
              <div className="price-name">Starter</div>
              <div className="price-amount">₹0 <span>/ mo</span></div>
              <div className="price-sub">Forever free</div>
              <div className="price-divider"></div>
              <ul className="price-items">
                <li className="price-item"><span className="check">✓</span> 1 WhatsApp store setup</li>
                <li className="price-item"><span className="check">✓</span> Up to 10 products</li>
                <li className="price-item"><span className="check">✓</span> yourstore.dukaanhai.com</li>
                <li className="price-item"><span className="check">✓</span> AI descriptions (5/mo)</li>
                <li className="price-item"><span className="check">✓</span> Basic dashboard</li>
              </ul>
              <Link href="/register" className="btn-price btn-price-outline" style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}>Get Started Free</Link>
            </div>

            <div className="price-card featured">
              <div className="popular-badge">⚡ Most Popular</div>
              <div className="price-name">Growth</div>
              <div className="price-amount">₹299 <span>/ mo</span></div>
              <div className="price-sub">Billed monthly</div>
              <div className="price-divider"></div>
              <ul className="price-items">
                <li className="price-item"><span className="check">✓</span> Unlimited products</li>
                <li className="price-item"><span className="check">✓</span> Custom domain support</li>
                <li className="price-item"><span className="check">✓</span> Unlimited AI descriptions</li>
                <li className="price-item"><span className="check">✓</span> Smart image optimization</li>
                <li className="price-item"><span className="check">✓</span> Analytics dashboard</li>
                <li className="price-item"><span className="check">✓</span> UPI + card payments</li>
                <li className="price-item"><span className="check">✓</span> WhatsApp order alerts</li>
              </ul>
              <Link href="/register" className="btn-price btn-price-green" style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}>Start 14-day Trial</Link>
            </div>

            <div className="price-card">
              <div className="price-name">Business</div>
              <div className="price-amount">₹799 <span>/ mo</span></div>
              <div className="price-sub">For growing teams</div>
              <div className="price-divider"></div>
              <ul className="price-items">
                <li className="price-item"><span className="check">✓</span> Everything in Growth</li>
                <li className="price-item"><span className="check">✓</span> 3 team logins</li>
                <li className="price-item"><span className="check">✓</span> Multi-language store</li>
                <li className="price-item"><span className="check">✓</span> Priority WhatsApp support</li>
                <li className="price-item"><span className="check">✓</span> Advanced analytics</li>
                <li className="price-item"><span className="check">✓</span> Bulk product upload</li>
              </ul>
              <Link href="mailto:support@dukaanhai.com" className="btn-price btn-price-outline" style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}>Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-inner reveal">
          <h2 className="cta-title">Your store is one WhatsApp message away</h2>
          <p className="cta-sub">Join 10,000+ small businesses who launched their online store in minutes — for free.</p>
          <div className="cta-input-group">
            <input className="cta-input" type="tel" placeholder="Enter your WhatsApp number..." />
            <Link href="/register" className="btn-cta" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>Get My Store Link 🚀</Link>
          </div>
          <p className="cta-note">We'll send you a WhatsApp message to get started. No spam, ever.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <Link className="nav-logo" href="/" style={{ "textDecoration": "none" }}>
                <div className="logo-icon">🛍️</div>
                DukaanHai
              </Link>
              <p className="footer-desc">Making India's small businesses unstoppable — one WhatsApp message at a time.
              </p>
            </div>
            <div className="footer-col">
              <h5>Product</h5>
              <ul>
                <li><Link href="#how">How It Works</Link></li>
                <li><Link href="#features">Features</Link></li>
                <li><Link href="#pricing">Pricing</Link></li>
                <li><Link href="#">Demo Store</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>Company</h5>
              <ul>
                <li><Link href="#">About</Link></li>
                <li><Link href="#">Blog</Link></li>
                <li><Link href="#">Careers</Link></li>
                <li><Link href="#">Press</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>Support</h5>
              <ul>
                <li><Link href="#">Help Center</Link></li>
                <li><Link href="#">WhatsApp Support</Link></li>
                <li><Link href="#">Privacy Policy</Link></li>
                <li><Link href="#">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2025 DukaanHai. Made with ❤️ in India.</p>
            <div className="footer-social">
              <Link href="#" className="social-btn">𝕏</Link>
              <Link href="#" className="social-btn">in</Link>
              <Link href="#" className="social-btn">📷</Link>
              <Link href="#" className="social-btn">▶</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
