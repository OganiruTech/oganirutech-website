import Link from "next/link";

// ─── Hero SVG Graphic ────────────────────────────────────────────────────────
function HeroGraphic() {
  return (
    <svg
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        <linearGradient id="navyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0B1F3B" />
          <stop offset="100%" stopColor="#071426" />
        </linearGradient>
        <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0F9D58" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0a7a44" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a4a8a" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0B1F3B" stopOpacity="0.5" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="softglow">
          <feGaussianBlur stdDeviation="8" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Ambient glow background */}
      <circle cx="250" cy="250" r="200" fill="#0F9D58" opacity="0.04" />
      <circle cx="250" cy="250" r="150" fill="#0F9D58" opacity="0.05" />

      {/* Outer ring */}
      <circle cx="250" cy="250" r="195" fill="none" stroke="#0F9D58" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="4 6" />
      <circle cx="250" cy="250" r="170" fill="none" stroke="#1a4a8a" strokeWidth="0.5" strokeOpacity="0.3" />

      {/* Grid lines */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={250 + 170 * Math.cos(rad)}
            y1={250 + 170 * Math.sin(rad)}
            x2={250 - 170 * Math.cos(rad)}
            y2={250 - 170 * Math.sin(rad)}
            stroke="#1a4a8a"
            strokeWidth="0.4"
            strokeOpacity="0.2"
          />
        );
      })}

      {/* Hexagonal outer shell faces — bottom-right dark */}
      <polygon
        points="250,100 370,170 370,330 250,400 130,330 130,170"
        fill="none"
        stroke="#0F9D58"
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />

      {/* 3D Hexagon — top face */}
      <polygon
        points="250,110 355,168 355,175 250,118 145,175 145,168"
        fill="url(#emeraldGrad)"
        opacity="0.85"
      />

      {/* 3D Hexagon — left face */}
      <polygon
        points="145,168 250,118 250,285 145,335"
        fill="url(#blueGrad)"
        opacity="0.9"
      />

      {/* 3D Hexagon — right face */}
      <polygon
        points="355,168 250,118 250,285 355,335"
        fill="url(#emeraldGrad)"
        opacity="0.55"
      />

      {/* 3D Hexagon — bottom-left face */}
      <polygon
        points="145,335 250,285 250,395 145,338"
        fill="#0a2a50"
        opacity="0.95"
      />

      {/* 3D Hexagon — bottom-right face */}
      <polygon
        points="355,335 250,285 250,395 355,338"
        fill="#071e3a"
        opacity="0.95"
      />

      {/* 3D Hexagon — bottom face */}
      <polygon
        points="250,395 145,338 145,335 250,388 355,335 355,338"
        fill="#061528"
        opacity="1"
      />

      {/* Inner glowing hexagon */}
      <polygon
        points="250,175 305,207 305,272 250,305 195,272 195,207"
        fill="#0F9D58"
        opacity="0.12"
        filter="url(#softglow)"
      />
      <polygon
        points="250,175 305,207 305,272 250,305 195,272 195,207"
        fill="none"
        stroke="#0F9D58"
        strokeWidth="1.5"
        strokeOpacity="0.8"
        filter="url(#glow)"
      />

      {/* Center symbol — forward arrow / progress mark */}
      <g transform="translate(250, 240)" filter="url(#glow)">
        <polygon points="0,-28 24,14 -24,14" fill="none" stroke="#0F9D58" strokeWidth="2" strokeOpacity="0.9" />
        <polygon points="0,-14 12,7 -12,7" fill="#0F9D58" opacity="0.7" />
        <line x1="0" y1="14" x2="0" y2="28" stroke="#0F9D58" strokeWidth="2" strokeOpacity="0.6" />
      </g>

      {/* Corner data nodes */}
      {[
        { cx: 130, cy: 170 },
        { cx: 370, cy: 170 },
        { cx: 250, cy: 100 },
        { cx: 130, cy: 330 },
        { cx: 370, cy: 330 },
        { cx: 250, cy: 400 },
      ].map((node, i) => (
        <g key={i}>
          <circle cx={node.cx} cy={node.cy} r="6" fill="#0B1F3B" stroke="#0F9D58" strokeWidth="1.5" strokeOpacity="0.8" filter="url(#glow)" />
          <circle cx={node.cx} cy={node.cy} r="2" fill="#0F9D58" opacity="0.9" />
        </g>
      ))}

      {/* Connecting lines to outer elements */}
      <line x1="130" y1="170" x2="80" y2="130" stroke="#0F9D58" strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="3 4" />
      <line x1="370" y1="170" x2="420" y2="130" stroke="#0F9D58" strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="3 4" />
      <line x1="250" y1="100" x2="250" y2="50" stroke="#0F9D58" strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="3 4" />

      {/* Outer satellite nodes */}
      <circle cx="75" cy="125" r="4" fill="#0F9D58" opacity="0.5" filter="url(#glow)" />
      <circle cx="425" cy="125" r="4" fill="#0F9D58" opacity="0.5" filter="url(#glow)" />
      <circle cx="250" cy="45" r="4" fill="#0F9D58" opacity="0.5" filter="url(#glow)" />

      {/* Floating data labels */}
      <text x="60" y="95" fill="#0F9D58" fontSize="8" fontFamily="monospace" opacity="0.5">SYS.01</text>
      <text x="400" y="95" fill="#0F9D58" fontSize="8" fontFamily="monospace" opacity="0.5">NET.04</text>
      <text x="215" y="35" fill="#0F9D58" fontSize="8" fontFamily="monospace" opacity="0.5">OGA.NG</text>

      {/* Bottom bar data */}
      <text x="90" y="460" fill="#0F9D58" fontSize="7" fontFamily="monospace" opacity="0.35">▲ PROGRESS VECTOR: ACTIVE</text>
      <text x="300" y="460" fill="#1a4a8a" fontSize="7" fontFamily="monospace" opacity="0.4">BUILD: 2025.1</text>
    </svg>
  );
}

// ─── Pillar Card ─────────────────────────────────────────────────────────────
function PillarCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center p-8 border border-gray-100 hover:border-emerald hover:shadow-lg transition-all duration-300 group">
      <div className="w-16 h-16 rounded-full bg-navy/5 flex items-center justify-center mb-5 group-hover:bg-emerald/10 transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-navy font-bold text-sm tracking-widest uppercase mb-3">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main className="min-h-screen">

      {/* ── HERO ── */}
      <section className="relative min-h-screen bg-navy overflow-hidden flex items-center">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(#0F9D58 1px, transparent 1px), linear-gradient(90deg, #0F9D58 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(15,157,88,0.08)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(11,31,59,0.6)_0%,transparent_70%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — text */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 text-emerald text-xs font-semibold tracking-widest uppercase border border-emerald/30 px-4 py-2 rounded-full w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
              Africa First. World Next.
            </div>
            <h1 className="text-white font-extrabold text-5xl lg:text-6xl leading-tight tracking-tight uppercase">
              Innovating<br />
              <span className="text-emerald">Forward,</span><br />
              Advancing Africa.
            </h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-md">
              Engineering digital infrastructure from Africa — structured, intelligent, and built to scale globally.
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Link
                href="/products"
                className="bg-emerald text-white font-semibold text-sm px-8 py-4 tracking-widest uppercase hover:bg-emerald-light transition-colors duration-200"
              >
                Our Products
              </Link>
              <Link
                href="/build-with-us"
                className="border border-white/30 text-white font-semibold text-sm px-8 py-4 tracking-widest uppercase hover:border-white hover:bg-white/5 transition-all duration-200"
              >
                Build With Us
              </Link>
            </div>
            {/* Stats strip */}
            <div className="flex gap-8 mt-6 pt-6 border-t border-white/10">
              {[
                { value: "100%", label: "Indigenous" },
                { value: "∞", label: "Scalable" },
                { value: "AF→GL", label: "Reach" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-emerald font-extrabold text-xl">{stat.value}</div>
                  <div className="text-white/40 text-xs tracking-widest uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — graphic */}
          <div className="relative w-full aspect-square max-w-lg mx-auto lg:mx-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(15,157,88,0.08)_0%,transparent_70%)]" />
            <HeroGraphic />
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ── PILLARS ── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-emerald text-xs font-bold tracking-widest uppercase mb-3">What We Stand For</p>
            <h2 className="text-navy font-extrabold text-4xl uppercase tracking-tight">Empowering The Future.</h2>
            <p className="text-gray-400 mt-3 text-sm tracking-widest">Innovation. Progress. Possibility.</p>
            <div className="w-12 h-0.5 bg-emerald mx-auto mt-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-100">
            <PillarCard
              icon={
                <svg viewBox="0 0 24 24" className="w-7 h-7 text-emerald" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
                </svg>
              }
              title="Technology & Growth"
              description="Building solutions for a smarter, more connected Africa — infrastructure that empowers communities and industries."
            />
            <PillarCard
              icon={
                <svg viewBox="0 0 24 24" className="w-7 h-7 text-emerald" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
              }
              title="Forward Thinking"
              description="Pioneering the future with vision and strategy — engineering tomorrow's solutions with today's most advanced thinking."
            />
            <PillarCard
              icon={
                <svg viewBox="0 0 24 24" className="w-7 h-7 text-emerald" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253M3 12c0 .778.099 1.533.284 2.253" />
                </svg>
              }
              title="Global Impact"
              description="African excellence with worldwide reach — proving that world-class digital infrastructure is built here, for everywhere."
            />
          </div>
        </div>
      </section>

      {/* ── VISION ── */}
      <section className="relative py-32 overflow-hidden">
        {/* Background image via Unsplash */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=1600&q=80')`,
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-navy/85" />
        {/* Emerald gradient accent */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_50%,rgba(15,157,88,0.15)_0%,transparent_60%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-6">
            <p className="text-emerald text-xs font-bold tracking-widest uppercase">Our Vision</p>
            <h2 className="text-white font-extrabold text-4xl lg:text-5xl uppercase tracking-tight leading-tight">
              Moving Forward,<br />
              <span className="text-emerald">Shaping Tomorrow.</span>
            </h2>
            <div className="w-12 h-0.5 bg-emerald" />
            <p className="text-white/70 text-lg leading-relaxed">
              <span className="text-white font-semibold">Oganiru means Progress.</span> We are a structured engine of innovation — advancing Africa first and the world next, engineering progress where it matters most.
            </p>
            <p className="text-white/50 text-sm leading-relaxed">
              Leading the way to a brighter future — one product, one solution, one breakthrough at a time.
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Link
                href="/products"
                className="border border-white/40 text-white font-semibold text-xs px-7 py-4 tracking-widest uppercase hover:bg-white hover:text-navy transition-all duration-200"
              >
                Discover Our Vision
              </Link>
            </div>
          </div>

          {/* Right side — metrics */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { number: "2025", label: "Year Founded", sub: "Built from Africa" },
              { number: "∞", label: "Scale Potential", sub: "No limits" },
              { number: "2", label: "Core Tracks", sub: "Products + Services" },
              { number: "01", label: "Mission", sub: "Africa First" },
            ].map((item) => (
              <div key={item.label} className="border border-white/10 p-6 hover:border-emerald/50 transition-colors duration-300">
                <div className="text-emerald font-extrabold text-3xl mb-1">{item.number}</div>
                <div className="text-white font-semibold text-sm tracking-wide">{item.label}</div>
                <div className="text-white/40 text-xs mt-1">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS TEASER ── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-emerald text-xs font-bold tracking-widest uppercase mb-3">What We're Building</p>
              <h2 className="text-navy font-extrabold text-4xl uppercase tracking-tight">Our Products</h2>
            </div>
            <Link href="/products" className="text-emerald text-sm font-semibold tracking-widest uppercase hover:underline underline-offset-4">
              View All Products →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { tag: "Coming Soon", name: "Product Alpha", desc: "A flagship indigenous platform engineered for Africa's most critical digital needs." },
              { tag: "In Development", name: "Product Beta", desc: "Scalable infrastructure tooling for enterprises building in emerging markets." },
              { tag: "Coming Soon", name: "Product Gamma", desc: "Consumer-facing product redefining how Africans interact with digital services." },
            ].map((product) => (
              <div key={product.name} className="group border border-gray-100 p-8 hover:border-emerald hover:shadow-xl transition-all duration-300 cursor-pointer">
                <span className="inline-block text-xs font-semibold tracking-widest text-emerald uppercase bg-emerald/8 px-3 py-1 mb-5">
                  {product.tag}
                </span>
                <h3 className="text-navy font-bold text-xl mb-3">{product.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{product.desc}</p>
                <span className="text-emerald text-xs font-bold tracking-widest uppercase group-hover:underline underline-offset-4">
                  Learn More →
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUILD WITH US CTA ── */}
      <section className="bg-navy py-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div>
            <p className="text-emerald text-xs font-bold tracking-widest uppercase mb-3">Work With Us</p>
            <h2 className="text-white font-extrabold text-4xl uppercase tracking-tight leading-tight">
              Have an idea?<br />Let's build it together.
            </h2>
            <p className="text-white/50 mt-4 text-sm leading-relaxed max-w-lg">
              From ideation to launch — we provide end-to-end digital solutions for businesses, startups, and institutions ready to build for Africa and beyond.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              href="/build-with-us"
              className="bg-emerald text-white font-semibold text-sm px-8 py-4 tracking-widest uppercase hover:bg-emerald-light transition-colors duration-200 text-center"
            >
              Book a Consultation
            </Link>
            <Link
              href="/build-with-us"
              className="border border-white/20 text-white font-semibold text-sm px-8 py-4 tracking-widest uppercase hover:border-white transition-colors duration-200 text-center"
            >
              Submit Your Idea
            </Link>
          </div>
        </div>
      </section>

      {/* ── CAREERS TEASER ── */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-emerald text-xs font-bold tracking-widest uppercase mb-3">Join The Team</p>
          <h2 className="text-navy font-extrabold text-4xl uppercase tracking-tight mb-4">
            Build With The Best.
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xl mx-auto mb-8">
            We're looking for engineers, designers, and operators who believe Africa deserves world-class technology — and want to build it.
          </p>
          <Link
            href="/careers"
            className="inline-block border-2 border-navy text-navy font-semibold text-sm px-8 py-4 tracking-widest uppercase hover:bg-navy hover:text-white transition-all duration-200"
          >
            View Open Roles
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-navy-dark border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-emerald font-extrabold text-xl">O</span>
              <span className="text-white font-bold text-sm tracking-widest uppercase">Oganiru Technologies</span>
            </div>
            <p className="text-white/30 text-xs tracking-wide">Advancing African Innovation</p>
          </div>
          <div className="flex gap-8 text-white/40 text-xs tracking-widest uppercase">
            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
            <Link href="/build-with-us" className="hover:text-white transition-colors">Services</Link>
            <Link href="/careers" className="hover:text-white transition-colors">Careers</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
          <p className="text-white/20 text-xs">© 2025 Oganiru Technologies. All rights reserved.</p>
        </div>
      </footer>

    </main>
  );
}