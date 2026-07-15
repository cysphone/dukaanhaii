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
        </ul>
        <div className="nav-actions">
          {session ? (
            <Link href="/dashboard" className="nav-cta">Dashboard →</Link>
          ) : (
            <Link href="/register" className="nav-cta">Start Free →</Link>
          )}
        </div>
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
              Your All-in-One AI Store Builder<br />
              that Delivers <span className="highlight" style={{ color: 'var(--green)' }}>Real Growth</span>
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

      {/* BUILT FOR SMALL BUSINESS OWNERS */}
      <section className="section text-center pt-8 pb-16">
        <div className="section-inner">
          <h3 className="section-title reveal mx-auto mb-10" style={{ fontSize: '1.8rem', maxWidth: '800px' }}>Built For Small Business Owners</h3>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {[
              { name: "Gym & Fitness", icon: "🏋️‍♂️" },
              { name: "Clothing Store", icon: "👗" },
              { name: "Bakery & Cake", icon: "🎂" },
              { name: "Salon Owner", icon: "💇‍♀️" },
              { name: "Restaurant & Cafe", icon: "🍛" },
              { name: "Hardware Store", icon: "🔧" },
              { name: "Kirana & Supermarket", icon: "🛒" },
              { name: "Handloom Sarees", icon: "🧵" },
            ].map((biz, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-2.5 rounded-full border shadow-sm reveal" style={{ background: 'var(--white)', borderColor: 'rgba(255,255,255,0.08)' }}>
                <span className="text-xl">{biz.icon}</span> <span className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>{biz.name}</span>
              </div>
            ))}
            <div className="flex items-center justify-center gap-3 px-6 py-3 rounded-full border border-green-500 shadow-sm reveal w-full sm:w-auto mt-2" style={{ background: 'rgba(37, 211, 102, 0.1)', color: 'var(--green)' }}>
              <span className="font-bold text-sm">And many more businesses like yours...</span>
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

      {/* AI ASSISTANTS */}
      <section className="features-section" id="features">
        <div className="features-inner">
          <p className="section-tag reveal text-center mx-auto block mb-4">Meet Your Assistants</p>
          <h2 className="section-title reveal text-center mx-auto mb-6">Meet Your DukaanHai AI Team</h2>
          <p className="section-sub reveal text-center mx-auto mb-16">
            A full team of digital experts working for you 24/7, all accessible through a simple WhatsApp chat.
          </p>

          <div className="flex flex-col gap-6 max-w-4xl mx-auto reveal">
            {/* Assistant 1 */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 p-8 rounded-2xl border shadow-sm transition-transform hover:-translate-y-1" style={{ background: 'var(--white)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <div className="flex flex-col items-center min-w-[200px] rounded-xl p-6" style={{ background: 'rgba(37, 211, 102, 0.05)' }}>
                <div className="text-6xl mb-4">🛍️</div>
                <div className="font-bold text-lg text-center" style={{ color: 'var(--ink)' }}>Store Setup Agent</div>
                <div className="text-sm font-medium mt-1 text-center" style={{ color: 'var(--green)' }}>DukaanHai Core</div>
              </div>
              <div className="flex-1 py-2 w-full">
                <ul className="space-y-4 text-left">
                  <li className="flex items-start gap-3">
                    <span style={{ color: 'var(--green)' }} className="mt-0.5 text-lg">✓</span>
                    <span style={{ color: 'var(--muted)' }}>Builds your complete online store in under 2 minutes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span style={{ color: 'var(--green)' }} className="mt-0.5 text-lg">✓</span>
                    <span style={{ color: 'var(--muted)' }}>Sets up secure WhatsApp login and dynamic dashboard</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span style={{ color: 'var(--green)' }} className="mt-0.5 text-lg">✓</span>
                    <span style={{ color: 'var(--muted)' }}>Automatically configures custom subdomains</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Assistant 2 */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 p-8 rounded-2xl border shadow-sm transition-transform hover:-translate-y-1" style={{ background: 'var(--white)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <div className="flex flex-col items-center min-w-[200px] rounded-xl p-6" style={{ background: 'rgba(100, 150, 255, 0.05)' }}>
                <div className="text-6xl mb-4">✍️</div>
                <div className="font-bold text-lg text-center" style={{ color: 'var(--ink)' }}>Copywriter Agent</div>
                <div className="text-sm font-medium mt-1 text-center text-blue-400">Content Creation</div>
              </div>
              <div className="flex-1 py-2 w-full">
                <ul className="space-y-4 text-left">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-0.5 text-lg">✓</span>
                    <span style={{ color: 'var(--muted)' }}>Generates compelling product descriptions instantly</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-0.5 text-lg">✓</span>
                    <span style={{ color: 'var(--muted)' }}>Writes SEO-friendly content to rank on Google</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-0.5 text-lg">✓</span>
                    <span style={{ color: 'var(--muted)' }}>Provides multi-language translations (Hindi, English, etc)</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Assistant 3 */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 p-8 rounded-2xl border shadow-sm transition-transform hover:-translate-y-1" style={{ background: 'var(--white)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <div className="flex flex-col items-center min-w-[200px] rounded-xl p-6" style={{ background: 'rgba(200, 100, 255, 0.05)' }}>
                <div className="text-6xl mb-4">🖼️</div>
                <div className="font-bold text-lg text-center" style={{ color: 'var(--ink)' }}>Image Enhancer</div>
                <div className="text-sm font-medium mt-1 text-center text-purple-400">Visuals Studio</div>
              </div>
              <div className="flex-1 py-2 w-full">
                <ul className="space-y-4 text-left">
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 mt-0.5 text-lg">✓</span>
                    <span style={{ color: 'var(--muted)' }}>Removes cluttered backgrounds from smartphone photos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 mt-0.5 text-lg">✓</span>
                    <span style={{ color: 'var(--muted)' }}>Generates professional studio-quality product shots</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 mt-0.5 text-lg">✓</span>
                    <span style={{ color: 'var(--muted)' }}>Automatically resizes and optimizes images for fast loading</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VOICES OF REAL BUSINESS OWNERS */}
      <section className="section py-20 text-center">
        <div className="section-inner max-w-6xl mx-auto px-4">
          <h2 className="section-title reveal mx-auto mb-12">Voices of Real Business Owners</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal">
            {[
              { name: "Priya Sharma", role: "Handloom Seller", desc: "My sales doubled after setting up my AI WhatsApp store in just 5 mins." },
              { name: "Rahul Verma", role: "Electronics Store", desc: "DukaanHai saved me ₹30,000 I would've paid to a developer." },
              { name: "Ayesha Khan", role: "Home Bakery", desc: "Customers love the clean dashboard and instant checkout." },
              { name: "Deepak Singh", role: "Hardware Shop", desc: "I manage all my inventory directly from my phone now!" }
            ].map((voice, idx) => (
              <div key={idx} className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg border border-surface-200 group transition-transform hover:-translate-y-2 cursor-pointer" style={{ background: 'var(--white)', borderColor: 'rgba(255,255,255,0.08)' }}>
                {/* Mock Video Placeholder */}
                <div className="absolute inset-0 bg-surface-100 flex flex-col justify-end p-5" style={{ background: 'linear-gradient(to top, rgba(5,13,8,0.95) 0%, rgba(5,13,8,0.2) 60%, rgba(5,13,8,0.1) 100%)' }}>
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-green-600 shadow-xl pl-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/></svg>
                    </div>
                  </div>
                  
                  {/* Text content */}
                  <div className="relative z-10 text-left">
                    <p className="text-white text-sm font-medium mb-3 italic line-clamp-3">"{voice.desc}"</p>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white text-xs font-bold shadow-md">
                        {voice.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-white font-bold text-sm leading-tight">{voice.name}</div>
                        <div className="text-gray-300 text-xs">{voice.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GRADIENT CTA BANNER */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto px-5">
          <div className="rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-2xl reveal" style={{ background: 'linear-gradient(135deg, var(--green-dark), #00b09b)' }}>
             <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 relative z-10 text-white">Get Your Free WhatsApp Store Link Now</h2>
             <p className="text-lg font-medium text-white/90 mb-8 relative z-10 max-w-2xl mx-auto">Join 10,000+ businesses who have already launched their online presence with DukaanHai's AI assistants.</p>
             <Link href="/register" className="inline-block bg-white text-green-700 font-bold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 relative z-10">Start Your Free Store Setup</Link>
             
             {/* Decorative Elements */}
             <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
             <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-green-400/30 rounded-full blur-3xl"></div>
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
