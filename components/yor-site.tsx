'use client'

import { useEffect, useMemo, useState } from 'react'
import { ArrowUpRight, Camera, ChevronRight, Clock3, Home, MapPin, Menu as MenuIcon, Search, Sparkles, X } from 'lucide-react'

const heroImage = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FZ8k8WZvLncjz6pMJYd6HGkp9ewumz.png'
const logoImage = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rV6Y9oFeA3Z2J3Bou6IdIKejDtQ91W.png'

const items = [
  { name: 'Iced Spanish Latte', ar: 'لاتيه إسباني مثلج', description: 'Silky milk, espresso, condensed sweetness.', price: 115, category: 'Iced', tag: 'Best seller' },
  { name: 'Matcha Cloud', ar: 'ماتشا كلاود', description: 'Ceremonial matcha, vanilla cream, ice.', price: 135, category: 'Iced', tag: 'New' },
  { name: 'Biscoff Frappe', ar: 'فرابيه بيسكوف', description: 'Cold brew, biscuit cream, caramel crumb.', price: 145, category: 'Cold', tag: 'Signature' },
  { name: 'Flat White', ar: 'فلات وايت', description: 'Double espresso with micro-foamed milk.', price: 95, category: 'Hot', tag: '' },
  { name: 'V60 Ethiopia', ar: 'V60 إثيوبيا', description: 'Jasmine, citrus, black tea. Light roast.', price: 150, category: 'Pour Over', tag: 'Single origin' },
  { name: 'Chocolate Croissant', ar: 'كرواسون شوكولاتة', description: 'Butter laminated pastry, dark chocolate.', price: 85, category: 'Goods', tag: '' },
]

function Logo({ small = false }: { small?: boolean }) { return <div className={`yor-logo ${small ? 'yor-logo-small' : ''}`} aria-label="YOR Speciality Coffee"><span>YOR</span><i /></div> }
function OpenBadge({ ar }: { ar: boolean }) { const cairoHour = Number(new Intl.DateTimeFormat('en-US', { timeZone: 'Africa/Cairo', hour: 'numeric', hour12: false }).format(new Date())) % 24; const isOpen = cairoHour >= 7 || cairoHour < 2; return <div className="open-badge"><span className={`live-dot ${isOpen ? '' : 'closed-dot'}`} /> <span>{isOpen ? (ar ? 'مفتوح الآن' : 'Open now') : (ar ? 'مغلق الآن' : 'Closed now')}</span><span className="badge-divider" /><span>{ar ? 'يومياً ٧ ص — ٢ ص' : 'Daily 7 AM — 2 AM'}</span></div> }

export default function YorSite({ initialSection = 'home' }: { initialSection?: 'home' | 'menu' }) {
  const [language, setLanguage] = useState<'EN' | 'AR'>('AR')
  const [active, setActive] = useState('All')
  const [query, setQuery] = useState('')
  const [dark, setDark] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [navVisible, setNavVisible] = useState(true)
  const [hashFilter, setHashFilter] = useState('')
  const isArabic = language === 'AR'
  const categories = ['All', 'Hot', 'Iced', 'Cold', 'Pour Over', 'Goods']
  const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  const selectedCategory = hashFilter || active
  const filtered = useMemo(() => items.filter((item) => (selectedCategory === 'All' || item.category === selectedCategory) && normalize(`${item.name} ${item.ar}`).includes(normalize(query))), [selectedCategory, query])

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem('yor-language')
    const savedTheme = window.localStorage.getItem('yor-theme')
    if (savedLanguage === 'EN' || savedLanguage === 'AR') setLanguage(savedLanguage)
    if (savedTheme === 'dark') setDark(true)
    const applyHashFilter = () => { const hashCategory = decodeURIComponent(window.location.hash.slice(1)).replaceAll('-', ' '); const matchingCategory = categories.find((category) => category.toLowerCase() === hashCategory.toLowerCase()) || ''; setHashFilter(matchingCategory); if (matchingCategory) setActive(matchingCategory) }
    applyHashFilter()
    window.addEventListener('hashchange', applyHashFilter)
    document.documentElement.lang = savedLanguage === 'EN' ? 'en' : 'ar'
    document.documentElement.dir = savedLanguage === 'EN' ? 'ltr' : 'rtl'
    if (initialSection === 'menu') window.setTimeout(() => document.getElementById('menu')?.scrollIntoView({ behavior: 'instant' as ScrollBehavior }), 50)
    let previous = window.scrollY
    const onScroll = () => { setNavVisible(window.scrollY < previous || window.scrollY < 80); previous = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('hashchange', applyHashFilter) }
  }, [initialSection])

  useEffect(() => { window.localStorage.setItem('yor-language', language); document.documentElement.lang = isArabic ? 'ar' : 'en'; document.documentElement.dir = isArabic ? 'rtl' : 'ltr' }, [language, isArabic])
  useEffect(() => { window.localStorage.setItem('yor-theme', dark ? 'dark' : 'light') }, [dark])

  const label = (en: string, ar: string) => isArabic ? ar : en
  const scrollTo = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }
  return <div dir={isArabic ? 'rtl' : 'ltr'} className={`${dark ? 'yor-app dark-mode' : 'yor-app'} ${initialSection === 'menu' ? 'menu-only' : ''} ${navVisible ? 'nav-visible' : 'nav-hidden'}`}>
    <header className="site-nav">
      <a href="/#top" className="nav-brand"><Logo small /><span>Speciality Coffee</span></a>
      <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation">
        <a href="/#vibes">{label('Our vibe', 'أجواء YOR')}</a><a href="/menu">{label('Menu', 'القائمة')}</a><a href="/#origins">{label('Origins', 'مصادرنا')}</a><a href="/#visit">{label('Visit us', 'زورونا')}</a>
      </nav>
      <div className="nav-actions"><button className="lang-btn" onClick={() => setLanguage(isArabic ? 'EN' : 'AR')} aria-label="Switch language">{isArabic ? 'EN' : 'عربي'}</button><button className="theme-btn" onClick={() => setDark(!dark)} aria-label="Toggle theme">{dark ? '☼' : '◐'}</button><button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <MenuIcon />}</button></div>
    </header>

    <main id="top">
      {initialSection === 'home' && <>
        <section className="hero"><div className="hero-copy"><p className="eyebrow">Mansoura · Egypt <span>—</span> Est. 2024</p><h1>YOUR<br /><em>OWN</em><br /><span>RHYTHM</span></h1><p className="hero-sub">{label('Specialty coffee for people who move at their own pace.', 'قهوة مختصة للناس اللي بتمشي على إيقاعها.')}</p><div className="hero-actions"><a href="/menu" className="button button-dark">{label('View the menu', 'شوف القائمة')} <ArrowUpRight size={17} /></a><a href="https://maps.google.com/?q=YOR+Speciality+Coffee+Mansoura" className="button button-ghost">{label('Get directions', 'الموقع')} <MapPin size={16} /></a></div></div><div className="hero-media"><img src={heroImage} alt="YOR coffees being prepared at the bar" /><div className="hero-media-label"><span>{label('Watch us pour', 'شوف التحضير')}</span><span className="play-dot">↗</span></div></div><div className="hero-footer"><OpenBadge ar={isArabic} /><span className="scroll-note">{label('Scroll to find your rhythm', 'اكتشف إيقاعك')} <ChevronRight size={16} /></span></div></section>
        <div className="marquee"><div>YOUR OWN RHYTHM <span>•</span> POUR OVER <span>•</span> OPEN TILL 2AM <span>•</span> SPECIALTY BEANS <span>•</span> YOUR OWN RHYTHM <span>•</span></div></div>
        <section className="section vibes" id="vibes"><div className="section-head"><p className="eyebrow">01 / The YOR feeling</p><h2>{label('Find your', 'اعثر على')}<br /><em>{label('flow.', 'إيقاعك.')}</em></h2><p className="section-intro">{label('A corner for early risers, late-night thinkers, and everyone finding their own pace in between.', 'مكان للصباحات الهادئة، وأفكار آخر الليل، وكل لحظة بينهما.')}</p></div><div className="vibe-grid"><div className="vibe-card vibe-image"><img src={logoImage} alt="YOR wordmark on a sage background" /><span>{label('It is not just coffee. It is a state of mind.', 'مش بس قهوة. دي حالة.')}</span></div><div className="vibe-card olive"><Sparkles /><strong>{label('Specialty beans', 'حبوب مختصة')}</strong><p>{label('Thoughtfully sourced. Carefully roasted. Always fresh.', 'مختارة بعناية، محمصة بحب، ودائماً فريش.')}</p></div><div className="vibe-card cream"><Clock3 /><strong>{label('Your own pace', 'إيقاعك أنت')}</strong><p>{label('Slow mornings or quick pick-me-ups. You set the tempo.', 'صباح هادي أو دفعة سريعة. أنت تحدد السرعة.')}</p></div><div className="vibe-card charcoal"><span className="big-number">7—2</span><strong>{label('Open late, open always', 'مفتوحين لوقت متأخر')}</strong><p>{label('Every day, 7 AM to 2 AM.', 'كل يوم، من ٧ صباحاً لـ ٢ صباحاً.')}</p></div></div></section>
        <section className="section teaser"><div className="section-head"><div><p className="eyebrow">02 / Something for every mood</p><h2>{label("What's your", 'إيه إيقاعك')}<br /><em>{label('rhythm today?', 'النهارده؟')}</em></h2></div><a href="/menu" className="text-link">{label('Explore full menu', 'كل القائمة')} <ArrowUpRight size={16} /></a></div><div className="teaser-row">{items.slice(0, 4).map((item) => <article className="teaser-card" key={item.name}><div className="teaser-image"><img src={heroImage} alt="" /></div><span>{item.tag || item.category}</span><h3>{isArabic ? item.ar : item.name}</h3><b>{item.price} <small>EGP</small></b></article>)}</div><div className="category-links">{['Hot', 'Iced', 'Pour Over', 'Goods'].map((cat) => <a key={cat} href={`/menu#${cat.toLowerCase().replace(' ', '-')}`}>{cat}</a>)}</div></section>
        <section className="origin-section" id="origins"><div className="origin-copy"><p className="eyebrow">03 / Coffee with a point of view</p><h2>{label('Know your', 'اعرف')}<br /><em>{label('origin.', 'مصدر قهوتك.')}</em></h2><p>{label('Every bean has a story. We bring the farms, the people, and the places closer to your cup.', 'كل حبة لها حكاية. بنقرب المزارع والناس والأماكن من فنجانك.')}</p><a href="/menu#pour-over" className="text-link">{label('Explore pour overs', 'استكشف الـ Pour Over')} <ArrowUpRight size={16} /></a></div><div className="origin-cards"><article className="origin-card origin-one"><span>01 / Ethiopia</span><h3>Guji<br />Natural</h3><p>Blueberry · Hibiscus · Cacao</p><b>V60 · Light roast</b></article><article className="origin-card origin-two"><span>02 / Colombia</span><h3>El<br />Paraiso</h3><p>Peach · Caramel · Jasmine</p><b>Origami · Light roast</b></article><article className="origin-card origin-three"><span>03 / Brazil</span><h3>Fazenda<br />Lagoa</h3><p>Hazelnut · Milk chocolate</p><b>Espresso · Medium roast</b></article></div></section>
        <section className="section take-away"><div><p className="eyebrow">04 / Take away</p><h2>{label('Good coffee,', 'قهوة حلوة،')}<br /><em>{label('on your way.', 'في طريقك.')}</em></h2></div><div><p>{label('Need your coffee to go? We prepare take away drinks with the same care. Most cups are ready in 5–10 minutes.', 'مستعجل؟ بنحضر مشروبك Take Away بنفس العناية. أغلب الطلبات بتكون جاهزة خلال ٥–١٠ دقايق.')}</p><a href="tel:+201000000000" className="button button-dark">{label('Call us', 'اتصل بنا')} <ArrowUpRight size={16} /></a></div></section>
        <section className="section visit-section" id="visit"><div className="visit-card"><div><p className="eyebrow">05 / Come say hi</p><h2>{label('Meet us at', 'قابلنا في')}<br /><em>{label('the corner.', 'الركن.')}</em></h2><p className="visit-address"><MapPin size={18} /> Elmashaya El Gomhouria St.<br /><span>In front of Faculty of Medicine, next to King Pizza</span></p><div className="visit-actions"><a className="button button-dark" href="https://maps.google.com/?q=YOR+Speciality+Coffee+Mansoura">{label('Get directions', 'الموقع')} <ArrowUpRight size={16} /></a><a className="button button-ghost" href="tel:+201000000000">{label('Call us', 'اتصل بنا')} <ArrowUpRight size={16} /></a></div></div><div className="map-placeholder"><div className="map-grid" /><span>31.0409° N, 31.3785° E</span><div className="map-pin"><MapPin /></div></div></div></section>
      </>}

      <section className="section menu-section" id="menu"><div className="section-head menu-heading"><div><p className="eyebrow">{initialSection === 'menu' ? 'YOR / Menu' : '06 / The menu'}</p><h2>{label('The menu,', 'القائمة')}<br /><em>{label('your way.', 'على مزاجك.')}</em></h2></div><label className="search"><Search size={17} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={label('Search the menu', 'ابحث في القائمة')} aria-label="Search menu" /></label></div><div className="category-tabs" role="tablist" aria-label={label('Menu categories', 'أقسام القائمة')}>{categories.map((cat) => <button type="button" role="tab" aria-selected={selectedCategory === cat} key={cat} className={selectedCategory === cat ? 'active' : ''} onClick={() => { setActive(cat); window.history.replaceState(null, '', cat === 'All' ? '/menu' : `/menu#${cat.toLowerCase().replace(' ', '-')}`) }}>{cat}</button>)}</div>{filtered.length ? <div className="menu-grid">{filtered.map((item) => <article className="menu-item" key={item.name}><div className="item-top"><span className="item-category">{item.category}</span>{item.tag && <span className="item-tag">{item.tag}</span>}</div><h3>{isArabic ? item.ar : item.name}</h3><p>{item.description}</p><div className="item-bottom"><strong>{item.price} <small>EGP</small></strong></div></article>)}</div> : <p className="menu-empty" role="status">{label('No menu items match your search.', 'لا توجد أصناف مطابقة لبحثك.')}</p>}<p className="menu-note">{label('Prices and availability may change. Ask our baristas about today’s beans and seasonal specials.', 'الأسعار والتوافر ممكن يتغيروا. اسأل الباريستا عن حبوب اليوم والعروض الموسمية.')}</p></section>
    </main>

    {initialSection === 'home' && <footer><div className="footer-top"><Logo /><p>Specialty coffee.<br /><em>Your own rhythm.</em></p><a href="https://instagram.com/yorspecialitycoffee_" aria-label="Instagram"><Camera /></a></div><div className="footer-bottom"><span>© 2024 YOR Speciality Coffee</span><span>Made with love in Mansoura</span><span>07:00 — 02:00 · Every day</span></div></footer>}
    <nav className="mobile-actions" aria-label="Quick navigation"><button onClick={() => scrollTo('top')}><Home />{label('Home', 'الرئيسية')}</button><button onClick={() => scrollTo('origins')}><Sparkles />{label('Origins', 'المصدر')}</button><a href="/menu" className="main-action"><Search />{label('Menu', 'القائمة')}</a><a href="https://instagram.com/yorspecialitycoffee_"><Camera />{label('Gallery', 'صور')}</a><button onClick={() => scrollTo('visit')}><MapPin />{label('Visit', 'زورنا')}</button></nav>
  </div>
}
