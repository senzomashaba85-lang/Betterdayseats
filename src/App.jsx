import { useState, useEffect, useRef } from "react"
import {
  FaFacebook, FaTwitter, FaWhatsapp, FaTiktok,
  FaHeart, FaComment, FaBookmark, FaSearch,
  FaBell, FaTimes, FaChevronDown, FaFire,
  FaGlobeAfrica, FaUtensils, FaPlus, FaInstagram,
  FaYoutube, FaLink
} from "react-icons/fa"

// ─── THEME ─────────────────────────────────────────────────────────────────
const S = {
  bg:      "#09060a",
  card:    "#130d11",
  card2:   "#1d1420",
  border:  "#2d1d28",
  gold:    "#d4a855",
  rose:    "#c4788e",
  champ:   "#f5e6d0",
  text:    "#e8dfe5",
  muted:   "#7a6472",
  green:   "#5cb87a",
  grad:    "linear-gradient(135deg, #d4a855 0%, #c4788e 100%)",
  gradR:   "linear-gradient(135deg, #c4788e 0%, #d4a855 100%)",
  overlay: "linear-gradient(180deg, rgba(9,6,10,0) 0%, rgba(9,6,10,0.55) 40%, rgba(9,6,10,0.97) 100%)",
}

// ─── DATA ───────────────────────────────────────────────────────────────────
const countries = [
  { code:"ZA",name:"South Africa",flag:"🇿🇦" },{ code:"US",name:"United States",flag:"🇺🇸" },
  { code:"GB",name:"United Kingdom",flag:"🇬🇧" },{ code:"NG",name:"Nigeria",flag:"🇳🇬" },
  { code:"KE",name:"Kenya",flag:"🇰🇪" },{ code:"GH",name:"Ghana",flag:"🇬🇭" },
  { code:"IN",name:"India",flag:"🇮🇳" },{ code:"BR",name:"Brazil",flag:"🇧🇷" },
  { code:"FR",name:"France",flag:"🇫🇷" },{ code:"IT",name:"Italy",flag:"🇮🇹" },
  { code:"ES",name:"Spain",flag:"🇪🇸" },{ code:"DE",name:"Germany",flag:"🇩🇪" },
  { code:"JP",name:"Japan",flag:"🇯🇵" },{ code:"AU",name:"Australia",flag:"🇦🇺" },
  { code:"CA",name:"Canada",flag:"🇨🇦" },{ code:"AE",name:"UAE",flag:"🇦🇪" },
  { code:"EG",name:"Egypt",flag:"🇪🇬" },{ code:"ET",name:"Ethiopia",flag:"🇪🇹" },
  { code:"TZ",name:"Tanzania",flag:"🇹🇿" },{ code:"ZW",name:"Zimbabwe",flag:"🇿🇼" },
  { code:"ZM",name:"Zambia",flag:"🇿🇲" },{ code:"BW",name:"Botswana",flag:"🇧🇼" },
  { code:"NA",name:"Namibia",flag:"🇳🇦" },{ code:"PT",name:"Portugal",flag:"🇵🇹" },
  { code:"SG",name:"Singapore",flag:"🇸🇬" },{ code:"MA",name:"Morocco",flag:"🇲🇦" },
  { code:"MX",name:"Mexico",flag:"🇲🇽" },{ code:"RW",name:"Rwanda",flag:"🇷🇼" },
]

const categories = [
  { id:"all",      name:"For You",     icon:"✨" },
  { id:"trending", name:"Trending",    icon:"🔥" },
  { id:"african",  name:"African",     icon:"🌍" },
  { id:"breakfast",name:"Breakfast",   icon:"🌅" },
  { id:"lunch",    name:"Lunch",       icon:"🥗" },
  { id:"dinner",   name:"Dinner",      icon:"🍽️" },
  { id:"desserts", name:"Desserts",    icon:"🍰" },
  { id:"soups",    name:"Soups",       icon:"🥣" },
  { id:"salads",   name:"Salads",      icon:"🥗" },
  { id:"seafood",  name:"Seafood",     icon:"🐟" },
  { id:"meat",     name:"Meat",        icon:"🥩" },
  { id:"chicken",  name:"Chicken",     icon:"🍗" },
  { id:"pasta",    name:"Pasta",       icon:"🍝" },
  { id:"smoothies",name:"Smoothies",   icon:"🥤" },
  { id:"italian",  name:"Italian",     icon:"🍕" },
  { id:"mexican",  name:"Mexican",     icon:"🌮" },
  { id:"bbq",      name:"BBQ",         icon:"🔥" },
  { id:"quick",    name:"Quick Meals", icon:"⏱️" },
]

const DEMO = [
  {
    id:1, title:"Spiced Jollof Rice",
    description:"West African party rice with layers of sweet tomato, fire-roasted pepper and fragrant spices. Soul food at its finest — every bite tells a story.",
    category:"african",
    image:"https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800&q=80",
    author:"Chef Amara", countryFlag:"🇳🇬",
    date: new Date(Date.now() - 86400000*1).toISOString(),
    likes:284, liked:false, saved:false, comments:[
      { id:1, text:"Made this last Sunday! Family loved it 😍", author:"Priya K.", date: new Date().toISOString() }
    ],
    ingredients:["2 cups long grain rice","4 ripe tomatoes","2 red bell peppers","1 large onion","2 cups chicken stock","1 tsp thyme","1 tsp curry powder","Bay leaves","Salt & pepper"],
    socials: { instagram: "@chefamara", twitter: "@chefamara", tiktok: "@chefamara" }
  },
  {
    id:2, title:"Avocado Toast with Poached Eggs",
    description:"Creamy smashed avo on sourdough, topped with silky poached eggs, chilli flakes, and a drizzle of lemon. The brunch you deserve.",
    category:"breakfast",
    image:"https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80",
    author:"Maya Torres", countryFlag:"🇿🇦",
    date: new Date(Date.now() - 86400000*2).toISOString(),
    likes:412, liked:false, saved:false, comments:[
      { id:1, text:"Obsessed with this recipe! 🥑", author:"Lerato M.", date: new Date().toISOString() }
    ],
    ingredients:["2 slices sourdough","1 ripe avocado","2 eggs","Lemon juice","Chilli flakes","Microgreens","Salt & pepper","Olive oil"],
    socials: { instagram: "@mayacooks", website: "https://mayacooks.com" }
  },
  {
    id:3, title:"Creamy Pasta Carbonara",
    description:"Silky, rich, utterly indulgent. Classic Roman carbonara made the proper way — no cream, just eggs, Pecorino and guanciale doing their magic.",
    category:"pasta",
    image:"https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80",
    author:"Marco Rossi", countryFlag:"🇮🇹",
    date: new Date(Date.now() - 86400000*3).toISOString(),
    likes:356, liked:false, saved:false, comments:[],
    ingredients:["200g spaghetti","100g guanciale","3 egg yolks","1 whole egg","50g Pecorino Romano","Black pepper","Salt"],
    socials: { instagram: "@marcorossi", youtube: "https://youtube.com/@marcorossi" }
  },
  {
    id:4, title:"Chocolate Lava Cake",
    description:"That magical moment when the centre flows out — warm, dark, and sinfully rich. Ready in 12 minutes and guaranteed to impress anyone at the table.",
    category:"desserts",
    image:"https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80",
    author:"Chef Céleste", countryFlag:"🇫🇷",
    date: new Date(Date.now() - 86400000*4).toISOString(),
    likes:527, liked:false, saved:false, comments:[
      { id:1, text:"Made these for my anniversary dinner, absolute hit! 💕", author:"Nomvula D.", date: new Date().toISOString() }
    ],
    ingredients:["100g dark chocolate (70%)","100g butter","2 eggs + 2 yolks","80g caster sugar","30g plain flour","Pinch of salt","Cocoa powder for dusting"],
    socials: { instagram: "@celeste_pastry", facebook: "https://facebook.com/celestepastry" }
  },
  {
    id:5, title:"Açaí Smoothie Bowl",
    description:"Vibrant, energising, and almost too pretty to eat. Topped with fresh fruit, granola, coconut flakes and a honey drizzle. Your morning just got an upgrade.",
    category:"smoothies",
    image:"https://images.unsplash.com/photo-1490323814079-2e2bc5b1f7d2?w=800&q=80",
    author:"Bella Santos", countryFlag:"🇧🇷",
    date: new Date(Date.now() - 86400000*5).toISOString(),
    likes:389, liked:false, saved:false, comments:[],
    ingredients:["200g frozen açaí","1 banana","100ml coconut milk","Granola","Fresh berries","Coconut flakes","Honey","Chia seeds"],
    socials: { instagram: "@bellasmoothies", tiktok: "@bellasmoothies" }
  },
  {
    id:6, title:"Durban Bunny Chow",
    description:"Iconic Durban street food — a hollowed-out quarter loaf filled with fragrant lamb curry. Straight from the streets of KZN to your table.",
    category:"african",
    image:"https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&q=80",
    author:"BetterDays Chef", countryFlag:"🇿🇦",
    date: new Date(Date.now() - 86400000*6).toISOString(),
    likes:631, liked:false, saved:false, comments:[
      { id:1, text:"Nothing beats a KZN bunny 🙌🏾", author:"Sipho N.", date: new Date().toISOString() }
    ],
    ingredients:["500g lamb pieces","1 quarter bread loaf","1 tin tomatoes","2 onions","Durban masala mix","Curry leaves","Cardamom","Ginger & garlic","Potatoes"],
    socials: { instagram: "@betterdayschef", twitter: "@betterdayschef", tiktok: "@betterdayschef" }
  },
]

// ─── FONT INJECTOR ──────────────────────────────────────────────────────────
function useFonts() {
  useEffect(() => {
    if (document.getElementById("bde-fonts")) return
    const link = document.createElement("link")
    link.id = "bde-fonts"
    link.rel = "stylesheet"
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400&family=Inter:wght@300;400;500;600&display=swap"
    document.head.appendChild(link)

    const style = document.createElement("style")
    style.id = "bde-global"
    style.textContent = `
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      body { background: #09060a; color: #e8dfe5; font-family: 'Inter', -apple-system, sans-serif; }
      input, textarea, select, button { font-family: 'Inter', -apple-system, sans-serif; }
      ::-webkit-scrollbar { width: 4px; height: 4px; }
      ::-webkit-scrollbar-track { background: #130d11; }
      ::-webkit-scrollbar-thumb { background: #2d1d28; border-radius: 4px; }
      .bde-card { transition: transform 0.3s cubic-bezier(.4,0,.2,1), box-shadow 0.3s ease; }
      .bde-card:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
      .bde-btn-grad { background: linear-gradient(135deg, #d4a855, #c4788e); border: none; cursor: pointer; color: #09060a; font-weight: 700; transition: opacity 0.2s, transform 0.15s; }
      .bde-btn-grad:hover { opacity: 0.88; transform: scale(1.02); }
      .bde-icon-btn { background: none; border: none; cursor: pointer; transition: color 0.2s, transform 0.15s; }
      .bde-icon-btn:hover { transform: scale(1.15); }
      @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
      @keyframes shimmer { 0%,100%{opacity:0.6} 50%{opacity:1} }
      @keyframes floatPulse { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      .bde-hero-text { animation: fadeUp 0.9s ease both; }
      .bde-hero-text-delay { animation: fadeUp 0.9s 0.2s ease both; }
      .bde-float { animation: floatPulse 3s ease-in-out infinite; }
    `
    document.head.appendChild(style)
  }, [])
}

// ─── TOAST ─────────────────────────────────────────────────────────────────
function Toast({ message, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t) }, [onClose])
  return (
    <div style={{ position:"fixed", bottom:"90px", left:"50%", transform:"translateX(-50%)",
      background: S.grad, color: S.bg, padding:"12px 28px", borderRadius:"40px",
      fontWeight:"700", fontSize:"13px", zIndex:9999, letterSpacing:"0.3px",
      boxShadow:"0 8px 32px rgba(196,120,142,0.35)", whiteSpace:"nowrap" }}>
      {message}
    </div>
  )
}

// ─── SHARE BUTTONS ─────────────────────────────────────────────────────────
function ShareRow({ recipe }) {
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(`🍽️ ${recipe.title} on BetterDays Eats!`)
  const shares = [
    { Icon: FaTiktok,   href: `https://www.tiktok.com/share?url=${url}&text=${text}`,           color:"#fff" },
    { Icon: FaWhatsapp, href: `https://wa.me/?text=${text}%20${url}`,                            color:"#25D366" },
    { Icon: FaFacebook, href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,             color:"#1877F2" },
    { Icon: FaTwitter,  href: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,        color:"#1DA1F2" },
  ]
  return (
    <div style={{ display:"flex", gap:"14px", alignItems:"center" }}>
      {shares.map(({ Icon, href, color }, i) => (
        <a key={i} href={href} target="_blank" rel="noopener noreferrer"
          style={{ color, opacity:0.8, transition:"opacity 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.opacity="1"}
          onMouseLeave={e => e.currentTarget.style.opacity="0.8"}>
          <Icon size={16} />
        </a>
      ))}
    </div>
  )
}

// ─── NOTIFICATION PANEL ─────────────────────────────────────────────────────
function NotifPanel({ items, onRead, onClose }) {
  return (
    <div style={{ position:"absolute", top:"48px", right:0, backgroundColor:S.card,
      borderRadius:"16px", border:`1px solid ${S.border}`, width:"300px",
      maxHeight:"360px", overflowY:"auto", zIndex:300, boxShadow:"0 16px 48px rgba(0,0,0,0.6)" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
        padding:"14px 16px", borderBottom:`1px solid ${S.border}` }}>
        <span style={{ color:S.champ, fontWeight:"600", fontSize:"14px", fontFamily:"'Playfair Display',serif" }}>Notifications</span>
        <button onClick={() => { onRead(); onClose() }}
          style={{ background:"none", border:"none", color:S.muted, cursor:"pointer", fontSize:"11px" }}>
          Mark all read
        </button>
      </div>
      {items.length === 0
        ? <div style={{ padding:"32px", textAlign:"center", color:S.muted, fontSize:"13px" }}>All caught up ✨</div>
        : items.map(n => (
          <div key={n.id} style={{ padding:"12px 16px", borderBottom:`1px solid ${S.border}`,
            backgroundColor: n.read ? "transparent" : `${S.rose}0d` }}>
            <p style={{ color:S.text, fontSize:"13px", lineHeight:"1.5" }}>{n.msg}</p>
            <span style={{ color:S.muted, fontSize:"10px" }}>{new Date(n.date).toLocaleTimeString()}</span>
          </div>
        ))
      }
    </div>
  )
}

// ─── HERO BANNER ───────────────────────────────────────────────────────────
function HeroBanner({ recipe, onSignup, currentUser, onPost }) {
  if (!recipe) return null
  return (
    <div style={{ position:"relative", width:"100%", height:"480px", overflow:"hidden",
      borderBottom:`1px solid ${S.border}` }}>
      {/* BG Image */}
      <img src={recipe.image} alt={recipe.title}
        style={{ width:"100%", height:"100%", objectFit:"cover", display:"block",
          filter:"brightness(0.55) saturate(1.2)" }} />

      {/* Gradient overlay */}
      <div style={{ position:"absolute", inset:0,
        background:"linear-gradient(180deg, rgba(9,6,10,0.1) 0%, rgba(9,6,10,0.3) 40%, rgba(9,6,10,0.97) 100%)" }} />

      {/* Floating badge */}
      <div className="bde-float" style={{ position:"absolute", top:"28px", left:"28px",
        display:"flex", alignItems:"center", gap:"8px",
        background:"rgba(9,6,10,0.6)", backdropFilter:"blur(12px)",
        border:`1px solid ${S.gold}40`, borderRadius:"40px", padding:"8px 16px" }}>
        <FaFire color={S.gold} size={12} />
        <span style={{ color:S.gold, fontSize:"12px", fontWeight:"600", letterSpacing:"0.5px" }}>
          Featured Today
        </span>
        <span style={{ fontSize:"16px" }}>{recipe.countryFlag}</span>
      </div>

      {/* Text content */}
      <div style={{ position:"absolute", bottom:"36px", left:"32px", right:"32px", maxWidth:"680px" }}>
        <div className="bde-hero-text">
          <span style={{ display:"inline-block", fontSize:"11px", fontWeight:"600",
            letterSpacing:"2px", textTransform:"uppercase", color:S.rose, marginBottom:"10px" }}>
            ✦ Recipe of the day
          </span>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(28px,5vw,52px)",
            fontWeight:"900", color:S.champ, lineHeight:"1.1", marginBottom:"14px" }}>
            {recipe.title}
          </h1>
        </div>
        <p className="bde-hero-text-delay" style={{ color:"#c8b8c4", fontSize:"15px",
          lineHeight:"1.65", maxWidth:"520px", marginBottom:"24px" }}>
          {recipe.description}
        </p>
        <div className="bde-hero-text-delay" style={{ display:"flex", alignItems:"center", gap:"16px", flexWrap:"wrap" }}>
          <button className="bde-btn-grad"
            onClick={() => currentUser ? onPost() : onSignup()}
            style={{ padding:"13px 28px", borderRadius:"40px", fontSize:"14px" }}>
            {currentUser ? "✨ Share Your Recipe" : "Join the Community"}
          </button>
          <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
            <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(recipe.author)}&background=d4a855&color=09060a&bold=true`}
              alt={recipe.author} style={{ width:"32px", height:"32px", borderRadius:"50%", border:`2px solid ${S.gold}` }} />
            <span style={{ color:S.champ, fontSize:"13px" }}>by <strong>{recipe.author}</strong></span>
            <span style={{ color:S.muted, fontSize:"13px" }}>· {recipe.likes} likes</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── RECIPE CARD ────────────────────────────────────────────────────────────
function RecipeCard({ recipe, onLike, onSave, currentUser, onComment }) {
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment]     = useState("")
  const [comments, setComments]         = useState(recipe.comments || [])
  const [imgLoaded, setImgLoaded]       = useState(false)
  const [showAllIngredients, setShowAllIngredients] = useState(false)
  const cat = categories.find(c => c.id === recipe.category)

  const addComment = () => {
    if (!newComment.trim()) return
    setComments(prev => [...prev, {
      id: Date.now(), text: newComment.trim(),
      author: currentUser?.name || "Guest",
      date: new Date().toISOString()
    }])
    setNewComment("")
  }

  return (
    <article className="bde-card" style={{ backgroundColor:S.card, borderRadius:"20px",
      border:`1px solid ${S.border}`, overflow:"hidden", display:"flex", flexDirection:"column" }}>

      {/* Image */}
      <div style={{ position:"relative", paddingTop:"65%", backgroundColor:S.card2 }}>
        {!imgLoaded && (
          <div style={{ position:"absolute", inset:0,
            background:`linear-gradient(135deg, ${S.card2} 0%, ${S.border} 100%)`,
            animation:"shimmer 1.5s ease infinite", display:"flex", alignItems:"center",
            justifyContent:"center", fontSize:"32px", color:S.border }}>
            🍽️
          </div>
        )}
        <img src={recipe.image} alt={recipe.title} onLoad={() => setImgLoaded(true)}
          style={{ position:"absolute", inset:0, width:"100%", height:"100%",
            objectFit:"cover", display: imgLoaded ? "block" : "none" }} />

        {/* Overlay */}
        <div style={{ position:"absolute", inset:0, background: S.overlay }} />

        {/* Category badge */}
        {cat && (
          <div style={{ position:"absolute", top:"14px", left:"14px",
            background:"rgba(9,6,10,0.65)", backdropFilter:"blur(8px)",
            border:`1px solid ${S.border}`, borderRadius:"40px",
            padding:"4px 12px", display:"flex", alignItems:"center", gap:"5px" }}>
            <span style={{ fontSize:"11px" }}>{cat.icon}</span>
            <span style={{ color:S.champ, fontSize:"11px", fontWeight:"500" }}>{cat.name}</span>
          </div>
        )}

        {/* Save button */}
        <button className="bde-icon-btn" onClick={() => onSave(recipe.id)}
          style={{ position:"absolute", top:"12px", right:"14px",
            color: recipe.saved ? S.gold : "rgba(255,255,255,0.5)", fontSize:"16px" }}>
          <FaBookmark />
        </button>

        {/* Author */}
        <div style={{ position:"absolute", bottom:"14px", left:"14px",
          display:"flex", alignItems:"center", gap:"8px" }}>
          <img src={recipe.userAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(recipe.author)}&background=d4a855&color=09060a&bold=true`}
            alt={recipe.author}
            style={{ width:"30px", height:"30px", borderRadius:"50%", border:`2px solid ${S.gold}` }} />
          <div>
            <div style={{ color:S.gold, fontSize:"12px", fontWeight:"600" }}>{recipe.author}</div>
            <div style={{ color:"rgba(245,230,208,0.6)", fontSize:"10px" }}>
              {recipe.countryFlag} · {new Date(recipe.date).toLocaleDateString("en-ZA", { day:"numeric", month:"short" })}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding:"18px 18px 0 18px", flex:1 }}>
        <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:"18px", fontWeight:"700",
          color:S.champ, lineHeight:"1.3", marginBottom:"8px" }}>
          {recipe.title}
        </h3>
        <p style={{ color:"#a08898", fontSize:"13px", lineHeight:"1.65",
          display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
          {recipe.description}
        </p>

        {/* Social Media Handles */}
        {recipe.socials && (
          <div style={{ display:"flex", gap:"6px", marginTop:"10px", flexWrap:"wrap" }}>
            {recipe.socials.instagram && (
              <a href={recipe.socials.instagram.startsWith('http') ? recipe.socials.instagram : `https://instagram.com/${recipe.socials.instagram.replace('@', '')}`} 
                 target="_blank" rel="noopener noreferrer"
                 style={{ color:"#E4405F", fontSize:"11px", textDecoration:"none", background:`${S.rose}15`, padding:"3px 10px", borderRadius:"12px", display:"inline-flex", alignItems:"center", gap:"4px" }}>
                <FaInstagram size={11} /> IG
              </a>
            )}
            {recipe.socials.twitter && (
              <a href={recipe.socials.twitter.startsWith('http') ? recipe.socials.twitter : `https://twitter.com/${recipe.socials.twitter.replace('@', '')}`} 
                 target="_blank" rel="noopener noreferrer"
                 style={{ color:"#1DA1F2", fontSize:"11px", textDecoration:"none", background:`${S.rose}15`, padding:"3px 10px", borderRadius:"12px", display:"inline-flex", alignItems:"center", gap:"4px" }}>
                <FaTwitter size={11} /> X
              </a>
            )}
            {recipe.socials.tiktok && (
              <a href={recipe.socials.tiktok.startsWith('http') ? recipe.socials.tiktok : `https://tiktok.com/${recipe.socials.tiktok.replace('@', '')}`} 
                 target="_blank" rel="noopener noreferrer"
                 style={{ color:"#fff", fontSize:"11px", textDecoration:"none", background:`${S.rose}15`, padding:"3px 10px", borderRadius:"12px", display:"inline-flex", alignItems:"center", gap:"4px" }}>
                <FaTiktok size={11} /> TikTok
              </a>
            )}
            {recipe.socials.youtube && (
              <a href={recipe.socials.youtube} target="_blank" rel="noopener noreferrer"
                 style={{ color:"#FF0000", fontSize:"11px", textDecoration:"none", background:`${S.rose}15`, padding:"3px 10px", borderRadius:"12px", display:"inline-flex", alignItems:"center", gap:"4px" }}>
                <FaYoutube size={11} /> YouTube
              </a>
            )}
            {recipe.socials.website && (
              <a href={recipe.socials.website} target="_blank" rel="noopener noreferrer"
                 style={{ color:S.gold, fontSize:"11px", textDecoration:"none", background:`${S.rose}15`, padding:"3px 10px", borderRadius:"12px", display:"inline-flex", alignItems:"center", gap:"4px" }}>
                <FaLink size={11} /> Website
              </a>
            )}
            {recipe.socials.facebook && (
              <a href={recipe.socials.facebook} target="_blank" rel="noopener noreferrer"
                 style={{ color:"#1877F2", fontSize:"11px", textDecoration:"none", background:`${S.rose}15`, padding:"3px 10px", borderRadius:"12px", display:"inline-flex", alignItems:"center", gap:"4px" }}>
                <FaFacebook size={11} /> FB
              </a>
            )}
          </div>
        )}

        {recipe.ingredients?.length > 0 && (
          <div style={{ marginTop:"12px", padding:"10px 14px",
            background:S.card2, borderRadius:"10px", border:`1px solid ${S.border}` }}>
            <div style={{ color:S.gold, fontSize:"11px", fontWeight:"600",
              marginBottom:"6px", letterSpacing:"0.5px" }}>🛒 Ingredients</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"4px" }}>
              {/* Show first 5 ingredients or all if expanded */}
              {(showAllIngredients ? recipe.ingredients : recipe.ingredients.slice(0,5)).map((ing,i) => (
                <span key={i} style={{ background:`${S.gold}15`, color:S.champ,
                  borderRadius:"20px", padding:"2px 10px", fontSize:"11px" }}>{ing}</span>
              ))}
              {recipe.ingredients.length > 5 && (
                <button 
                  onClick={() => setShowAllIngredients(!showAllIngredients)}
                  style={{ 
                    background:`${S.gold}25`, 
                    color:S.gold, 
                    borderRadius:"20px", 
                    padding:"2px 10px", 
                    fontSize:"11px",
                    border:"none",
                    cursor:"pointer",
                    transition:"all 0.2s",
                    fontWeight:"600"
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = `${S.gold}40`}
                  onMouseLeave={e => e.currentTarget.style.background = `${S.gold}25`}
                >
                  {showAllIngredients ? `Show less -${recipe.ingredients.length - 5}` : `+${recipe.ingredients.length - 5} more`}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div style={{ padding:"14px 18px 18px 18px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
          paddingTop:"12px", borderTop:`1px solid ${S.border}` }}>
          <div style={{ display:"flex", gap:"18px", alignItems:"center" }}>
            <button className="bde-icon-btn" onClick={() => onLike(recipe.id)}
              style={{ display:"flex", alignItems:"center", gap:"6px",
                color: recipe.liked ? "#ff6b8a" : S.muted, fontSize:"13px" }}>
              <FaHeart size={15} />
              <span style={{ fontWeight:"600" }}>{recipe.likes}</span>
            </button>
            <button className="bde-icon-btn" onClick={() => setShowComments(!showComments)}
              style={{ display:"flex", alignItems:"center", gap:"6px", color:S.muted, fontSize:"13px" }}>
              <FaComment size={15} />
              <span style={{ fontWeight:"600" }}>{comments.length}</span>
            </button>
          </div>
          <ShareRow recipe={recipe} />
        </div>

        {/* Comments */}
        {showComments && (
          <div style={{ marginTop:"14px" }}>
            {comments.map(c => (
              <div key={c.id} style={{ padding:"10px 12px", background:S.card2,
                borderRadius:"10px", marginBottom:"8px", border:`1px solid ${S.border}` }}>
                <strong style={{ color:S.gold, fontSize:"12px" }}>{c.author}</strong>
                <p style={{ color:S.text, fontSize:"13px", marginTop:"3px", lineHeight:"1.5" }}>{c.text}</p>
              </div>
            ))}
            {currentUser ? (
              <div style={{ display:"flex", gap:"8px", marginTop:"10px" }}>
                <input value={newComment} onChange={e => setNewComment(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && addComment()}
                  placeholder="Add a comment..."
                  style={{ flex:1, background:S.card2, border:`1px solid ${S.border}`,
                    borderRadius:"40px", padding:"9px 16px", color:S.text,
                    fontSize:"13px", outline:"none" }} />
                <button className="bde-btn-grad" onClick={addComment}
                  style={{ borderRadius:"40px", padding:"9px 18px", fontSize:"13px" }}>
                  Post
                </button>
              </div>
            ) : (
              <p style={{ color:S.muted, fontSize:"12px", textAlign:"center", marginTop:"10px" }}>
                Sign in to comment
              </p>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
// ─── CREATE POST MODAL ──────────────────────────────────────────────────────
function CreateModal({ onClose, onCreate, currentUser }) {
  const [title, setTitle]             = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory]       = useState("breakfast")
  const [ingredients, setIngredients] = useState("")
  const [socials, setSocials] = useState({
    instagram: "",
    twitter: "",
    tiktok: "",
    youtube: "",
    website: "",
    facebook: ""
  })
  const [mediaFile, setMediaFile]     = useState(null)
  const [mediaPreview, setMediaPreview] = useState("")
  const [mediaType, setMediaType]     = useState("image")

  const handleMedia = e => {
    const file = e.target.files[0]
    if (!file) return
    setMediaType(file.type.startsWith("video") ? "video" : "image")
    setMediaFile(file)
    const r = new FileReader()
    r.onloadend = () => setMediaPreview(r.result)
    r.readAsDataURL(file)
  }

  const iStyle = {
    width:"100%", background:S.card2, border:`1px solid ${S.border}`,
    borderRadius:"10px", padding:"12px 14px", color:S.text, fontSize:"14px",
    outline:"none", transition:"border-color 0.2s",
  }

  const handleSocialChange = (platform, value) => {
    setSocials(prev => ({ ...prev, [platform]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!title.trim() || !description.trim()) return
    onCreate({
      id: Date.now(), 
      title: title.trim(), 
      description: description.trim(), 
      category, 
      ingredients: ingredients.split("\n").filter(i => i.trim()),
      image: mediaType === "image" ? mediaPreview : null,
      video: mediaType === "video" ? mediaPreview : null,
      author: currentUser.name, 
      userAvatar: currentUser.avatar,
      countryFlag: currentUser.countryFlag,
      date: new Date().toISOString(), 
      likes:0, 
      liked:false, 
      saved:false, 
      comments:[],
      socials: socials
    })
    onClose()
  }

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(9,6,10,0.96)", zIndex:1000,
      display:"flex", alignItems:"center", justifyContent:"center", padding:"20px", overflowY:"auto" }}>
      <div style={{ background:S.card, borderRadius:"24px", width:"100%", maxWidth:"560px",
        maxHeight:"90vh", overflowY:"auto", border:`1px solid ${S.border}`,
        padding:"32px", position:"relative", boxShadow:"0 32px 80px rgba(0,0,0,0.8)" }}>

        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"24px" }}>
          <h2 style={{ fontFamily:"'Playfair Display',serif", color:S.champ, fontSize:"22px", fontWeight:"700" }}>
            Share Your Recipe ✨
          </h2>
          <button className="bde-icon-btn" onClick={onClose} style={{ color:S.muted, fontSize:"20px" }}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
            <input placeholder="Recipe title *" value={title} onChange={e => setTitle(e.target.value)} required style={iStyle} />
            <textarea placeholder="Tell the story behind this dish *" value={description}
              onChange={e => setDescription(e.target.value)} required rows={3} style={{ ...iStyle, resize:"vertical" }} />
            <select value={category} onChange={e => setCategory(e.target.value)} style={iStyle}>
              {categories.filter(c => c.id !== "all" && c.id !== "trending").map(c =>
                <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
            </select>
            <textarea placeholder="Ingredients (one per line)" value={ingredients}
              onChange={e => setIngredients(e.target.value)} rows={4}
              style={{ ...iStyle, resize:"vertical", fontFamily:"monospace", fontSize:"13px" }} />

            {/* Social Media Section */}
            <div style={{ 
              background:S.card2, 
              border:`1px solid ${S.border}`, 
              borderRadius:"10px", 
              padding:"16px",
              marginTop:"4px"
            }}>
              <p style={{ color:S.gold, fontSize:"13px", fontWeight:"600", marginBottom:"12px" }}>
                🌐 Connect Your Socials
              </p>
              <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
                <input 
                  placeholder="📸 Instagram (e.g., @chefname or https://instagram.com/chefname)" 
                  value={socials.instagram}
                  onChange={e => handleSocialChange("instagram", e.target.value)}
                  style={{ ...iStyle, fontSize:"13px" }} 
                />
                <input 
                  placeholder="🐦 Twitter/X (e.g., @chefname or https://twitter.com/chefname)" 
                  value={socials.twitter}
                  onChange={e => handleSocialChange("twitter", e.target.value)}
                  style={{ ...iStyle, fontSize:"13px" }} 
                />
                <input 
                  placeholder="🎵 TikTok (e.g., @chefname or https://tiktok.com/@chefname)" 
                  value={socials.tiktok}
                  onChange={e => handleSocialChange("tiktok", e.target.value)}
                  style={{ ...iStyle, fontSize:"13px" }} 
                />
                <input 
                  placeholder="▶️ YouTube (e.g., https://youtube.com/@chefname)" 
                  value={socials.youtube}
                  onChange={e => handleSocialChange("youtube", e.target.value)}
                  style={{ ...iStyle, fontSize:"13px" }} 
                />
                <input 
                  placeholder="🌍 Website/Blog (e.g., https://chefname.com)" 
                  value={socials.website}
                  onChange={e => handleSocialChange("website", e.target.value)}
                  style={{ ...iStyle, fontSize:"13px" }} 
                />
                <input 
                  placeholder="👥 Facebook (e.g., https://facebook.com/chefname)" 
                  value={socials.facebook}
                  onChange={e => handleSocialChange("facebook", e.target.value)}
                  style={{ ...iStyle, fontSize:"13px" }} 
                />
              </div>
              <p style={{ color:S.muted, fontSize:"11px", marginTop:"8px" }}>
                Share your handles so people can follow you! (Optional)
              </p>
            </div>

            {/* Media upload */}
            <label style={{ cursor:"pointer" }}>
              <input type="file" accept="image/*,video/*" onChange={handleMedia} style={{ display:"none" }} />
              <div style={{ border:`2px dashed ${S.rose}60`, borderRadius:"14px", padding:"24px",
                textAlign:"center", background:`${S.rose}05`,
                transition:"background 0.2s" }}>
                <div style={{ fontSize:"36px", marginBottom:"8px" }}>📸</div>
                <p style={{ color:S.rose, fontWeight:"600", fontSize:"14px", margin:0 }}>
                  {mediaPreview ? "Change photo / video" : "Add a photo or video"}
                </p>
                <p style={{ color:S.muted, fontSize:"11px", marginTop:"4px" }}>
                  Show off your cooking! 🍴
                </p>
              </div>
            </label>

            {mediaPreview && (
              <div style={{ position:"relative", borderRadius:"12px", overflow:"hidden" }}>
                {mediaType === "image"
                  ? <img src={mediaPreview} alt="Preview" style={{ width:"100%", maxHeight:"200px", objectFit:"cover" }} />
                  : <video src={mediaPreview} controls style={{ width:"100%", maxHeight:"200px" }} />
                }
                <button type="button" onClick={() => { setMediaFile(null); setMediaPreview("") }}
                  style={{ position:"absolute", top:"8px", right:"8px", background:S.bg,
                    border:"none", color:"#ef4444", borderRadius:"50%",
                    width:"28px", height:"28px", cursor:"pointer", fontSize:"14px" }}>
                  ×
                </button>
              </div>
            )}

            <button type="submit" className="bde-btn-grad"
              style={{ padding:"14px", borderRadius:"12px", fontSize:"15px", marginTop:"4px" }}>
              🍽️ Share Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── AUTH MODAL ─────────────────────────────────────────────────────────────
function AuthModal({ onClose, onLogin }) {
  const [email,   setEmail]   = useState("")
  const [name,    setName]    = useState("")
  const [country, setCountry] = useState("ZA")

  const handleSubmit = e => {
    e.preventDefault()
    const sel = countries.find(c => c.code === country)
    onLogin({
      id: Date.now(), email, name: name.trim() || email.split("@")[0],
      countryFlag: sel?.flag || "🌍",
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name||email)}&background=d4a855&color=09060a&bold=true`,
      joinDate: new Date().toISOString()
    })
    onClose()
  }

  const iStyle = {
    width:"100%", background:"#1a0f17", border:`1px solid ${S.border}`,
    borderRadius:"10px", padding:"13px 16px", color:S.text, fontSize:"14px", outline:"none",
  }

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(9,6,10,0.97)", zIndex:2000,
      display:"flex", alignItems:"center", justifyContent:"center", padding:"20px" }}>
      <div style={{ background:S.card, borderRadius:"28px", maxWidth:"400px", width:"100%",
        border:`1px solid ${S.border}`, padding:"44px 36px", position:"relative",
        boxShadow:"0 40px 100px rgba(0,0,0,0.9)" }}>

        <button className="bde-icon-btn" onClick={onClose}
          style={{ position:"absolute", top:"16px", right:"16px", color:S.muted, fontSize:"18px" }}>
          <FaTimes />
        </button>

        {/* Logo mark */}
        <div style={{ textAlign:"center", marginBottom:"28px" }}>
          <div style={{ fontSize:"52px", marginBottom:"12px" }}>🍽️</div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"28px", fontWeight:"900",
            background: S.grad, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            margin:"0 0 6px 0" }}>
            BetterDays Eats
          </h1>
          <p style={{ color:S.muted, fontSize:"13px" }}>
            A global table. Share your recipe with the world 🌍
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
          <input placeholder="Your name" value={name} onChange={e => setName(e.target.value)} style={iStyle} />
          <input type="email" placeholder="Email address *" value={email}
            onChange={e => setEmail(e.target.value)} required style={iStyle} />
          <select value={country} onChange={e => setCountry(e.target.value)} style={iStyle}>
            {countries.map(c => <option key={c.code} value={c.code}>{c.flag} {c.name}</option>)}
          </select>
          <button type="submit" className="bde-btn-grad"
            style={{ padding:"14px", borderRadius:"12px", fontSize:"15px", marginTop:"4px" }}>
            Join the Table
          </button>
        </form>

        <button onClick={onClose}
          style={{ background:"none", border:"none", color:S.muted, cursor:"pointer",
            fontSize:"12px", width:"100%", textAlign:"center", marginTop:"16px" }}>
          Browse as guest
        </button>
      </div>
    </div>
  )
}

// ─── STUB PAGES ─────────────────────────────────────────────────────────────
// ─── STUB PAGES ─────────────────────────────────────────────────────────────
function StubPage({ icon, title, body, onBack }) {
  return (
    <div style={{ maxWidth:"700px", margin:"0 auto", padding:"40px 24px" }}>
      <div style={{ background:S.card, borderRadius:"24px", padding:"48px 36px",
        border:`1px solid ${S.border}`, textAlign:"center", position:"relative" }}>
        
        {/* Back button */}
        <button 
          onClick={onBack}
          style={{
            position:"absolute",
            top:"16px",
            left:"16px",
            background:"none",
            border:"none",
            color:S.muted,
            fontSize:"20px",
            cursor:"pointer",
            padding:"8px",
            borderRadius:"8px",
            transition:"all 0.2s",
            display:"flex",
            alignItems:"center",
            gap:"6px"
          }}
          onMouseEnter={e => { e.currentTarget.style.color = S.gold; e.currentTarget.style.background = S.card2 }}
          onMouseLeave={e => { e.currentTarget.style.color = S.muted; e.currentTarget.style.background = "none" }}
        >
          ← Back
        </button>
        
        <div style={{ fontSize:"52px", marginBottom:"16px" }}>{icon}</div>
        <h1 style={{ fontFamily:"'Playfair Display',serif", color:S.champ, fontSize:"26px", marginBottom:"12px" }}>{title}</h1>
        <p style={{ color:S.muted }}>{body}</p>
        <div style={{ marginTop:"24px", padding:"12px 20px", background:`${S.gold}12`,
          borderRadius:"40px", display:"inline-block",
          border:`1px solid ${S.gold}30`, color:S.gold, fontSize:"13px" }}>
          Coming soon ✨
        </div>
      </div>
    </div>
  )
}
// ─── DROPDOWN MENU ──────────────────────────────────────────────────────────
function DropMenu({ currentPage, setCurrentPage, onClose }) {
  const groups = [
    { label:"Food Business", items:[
      { id:"restaurants", label:"🏪 Restaurants" },
      { id:"jobs",        label:"💼 Jobs" },
      { id:"business",    label:"💡 Business Ideas" },
      { id:"equipment",   label:"🛒 Equipment" },
      { id:"schools",     label:"🏫 Culinary Schools" },
    ]},
    { label:"Resources", items:[
      { id:"kids",      label:"👶 Kids Nutrition" },
      { id:"fasting",   label:"🕐 Fasting Guide" },
      { id:"disorders", label:"💙 Food Wellness" },
      { id:"donations", label:"❤️ Donate" },
      { id:"books",     label:"📚 Books" },
    ]},
    { label:"Info", items:[
      { id:"about",   label:"📖 About" },
      { id:"faq",     label:"❓ FAQ" },
      { id:"contact", label:"📧 Contact" },
      { id:"privacy", label:"🔒 Privacy" },
      { id:"terms",   label:"⚖️ Terms" },
    ]},
  ]
  return (
    <div style={{ position:"absolute", top:"100%", left:0, marginTop:"6px",
      background:S.card, border:`1px solid ${S.border}`, borderRadius:"16px",
      padding:"8px 0", zIndex:99999, minWidth:"220px",
      boxShadow:"0 16px 48px rgba(0,0,0,0.7)" }}>
      {groups.map((g, gi) => (
        <div key={gi}>
          <p style={{ color:S.muted, fontSize:"10px", textTransform:"uppercase",
            letterSpacing:"1.5px", padding:"8px 18px 4px", margin:0 }}>{g.label}</p>
          {g.items.map(item => (
            <button key={item.id} onClick={() => { setCurrentPage(item.id); onClose() }}
              style={{ display:"block", width:"100%", textAlign:"left", padding:"9px 18px",
                background:"none", border:"none", cursor:"pointer", fontSize:"13px",
                color: currentPage === item.id ? S.gold : S.text,
                fontWeight: currentPage === item.id ? "600" : "400" }}
              onMouseEnter={e => e.currentTarget.style.background = S.card2}
              onMouseLeave={e => e.currentTarget.style.background = "none"}>
              {item.label}
            </button>
          ))}
          {gi < groups.length - 1 && (
            <div style={{ height:"1px", background:S.border, margin:"6px 0" }} />
          )}
        </div>
      ))}
    </div>
  )
}

// ─── COOKIE BANNER ──────────────────────────────────────────────────────────
function CookieBanner({ onAccept }) {
  return (
    <div style={{ position:"fixed", bottom:"64px", left:0, right:0, zIndex:500,
      background:S.card, borderTop:`1px solid ${S.border}`,
      padding:"14px 20px", display:"flex", justifyContent:"space-between",
      alignItems:"center", gap:"12px", flexWrap:"wrap" }}>
      <p style={{ color:S.muted, fontSize:"12px", margin:0 }}>
        🍪 We use cookies to make your experience sweeter.
      </p>
      <button className="bde-btn-grad" onClick={onAccept}
        style={{ padding:"7px 20px", borderRadius:"40px", fontSize:"12px" }}>
        Accept
      </button>
    </div>
  )
}

// ─── MAIN APP ───────────────────────────────────────────────────────────────
export default function App() {
  useFonts()

  const [currentUser,      setCurrentUser]      = useState(null)
  const [recipes,          setRecipes]           = useState(DEMO)
  const [showCreate,       setShowCreate]        = useState(false)
  const [showAuth,         setShowAuth]          = useState(false)
  const [selectedCat,      setSelectedCat]       = useState("all")
  const [searchTerm,       setSearchTerm]        = useState("")
  const [currentPage,      setCurrentPage]       = useState("home")
  const [showNotifs,       setShowNotifs]        = useState(false)
  const [showDrop,         setShowDrop]          = useState(false)
  const [notifications,    setNotifications]     = useState([])
  const [unread,           setUnread]            = useState(0)
  const [toast,            setToast]             = useState(null)
  const [cookiesOk,        setCookiesOk]         = useState(false)
  const [isMobile,         setIsMobile]          = useState(false)
  const dropRef = useRef(null)

  // Responsive
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const h = e => { if (dropRef.current && !dropRef.current.contains(e.target)) setShowDrop(false) }
    document.addEventListener("mousedown", h)
    return () => document.removeEventListener("mousedown", h)
  }, [])

  const showToast = msg => setToast(msg)

  const addNotif = msg => {
    setNotifications(p => [{ id:Date.now(), msg, read:false, date:new Date().toISOString() }, ...p.slice(0,19)])
    setUnread(p => p + 1)
  }

  const handleLogin = user => {
    setCurrentUser(user)
    showToast(`Welcome, ${user.name}! 🎉`)
    addNotif(`👋 Welcome to BetterDays Eats, ${user.name}!`)
  }

  const handleLogout = () => { setCurrentUser(null); showToast("See you soon 👋") }

  const handleCreate = r => {
    setRecipes(p => [r, ...p])
    showToast("Recipe shared! ✨")
    addNotif(`✨ "${r.title}" is now live!`)
  }

  const handleLike = id =>
    setRecipes(p => p.map(r => r.id === id
      ? { ...r, likes: r.liked ? r.likes - 1 : r.likes + 1, liked: !r.liked } : r))

  const handleSave = id =>
    setRecipes(p => p.map(r => r.id === id ? { ...r, saved: !r.saved } : r))

  const filtered = recipes.filter(r =>
    (selectedCat === "all" || selectedCat === "trending" || r.category === selectedCat) &&
    (!searchTerm || r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.author.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const featured = recipes.find(r => r.featured) || recipes[0]

  const openPost = () => { if (currentUser) setShowCreate(true); else setShowAuth(true) }

  
// ─── PAGES ────────────────────────────────────────────────────────────────
const pages = {
  restaurants: <StubPage icon="🏪" title="Restaurants" body="Discover the best restaurants near you." onBack={() => setCurrentPage("home")} />,
  jobs:        <StubPage icon="💼" title="Food Industry Jobs" body="Find your next role in hospitality & food." onBack={() => setCurrentPage("home")} />,
  equipment:   <StubPage icon="🛒" title="Kitchen Equipment" body="Shop tools used by top chefs." onBack={() => setCurrentPage("home")} />,
  business:    <StubPage icon="💡" title="Business Ideas" body="Start your food business with our guides." onBack={() => setCurrentPage("home")} />,
  schools:     <StubPage icon="🏫" title="Culinary Schools" body="Find culinary schools near you." onBack={() => setCurrentPage("home")} />,
  kids:        <StubPage icon="👶" title="Kids Nutrition" body="Healthy meals for growing children." onBack={() => setCurrentPage("home")} />,
  donations:   <StubPage icon="❤️" title="Donate" body="Support food NGOs fighting hunger across Africa." onBack={() => setCurrentPage("home")} />,
  books:       <StubPage icon="📚" title="Cookbooks" body="Curated cookbooks from chefs around the world." onBack={() => setCurrentPage("home")} />,
  about:       <StubPage icon="🌍" title="About BetterDays Eats" body="Born in South Africa. Built for the world. A luxury food community for people who believe great food tells great stories." onBack={() => setCurrentPage("home")} />,
  faq:         <StubPage icon="❓" title="FAQ" body="Free platform for food lovers. Post recipes, like, comment, and share!" onBack={() => setCurrentPage("home")} />,
  contact:     <StubPage icon="📧" title="Contact" body="Email: senzomashaba85@gmail.com · WhatsApp: +27 76 222 6325" onBack={() => setCurrentPage("home")} />,
  privacy:     <StubPage icon="🔒" title="Privacy" body="We never sell your data. Ever." onBack={() => setCurrentPage("home")} />,
  terms:       <StubPage icon="⚖️" title="Terms" body="Be respectful. Be generous. Give credit." onBack={() => setCurrentPage("home")} />,
}

  return (
    <div style={{ backgroundColor:S.bg, minHeight:"100vh" }}>

      {/* ── HEADER ───────────────────────────────────────────────────────── */}
      <header style={{ backgroundColor:`${S.bg}f0`, backdropFilter:"blur(20px)",
        borderBottom:`1px solid ${S.border}`, padding:"14px 24px",
        position:"sticky", top:0, zIndex:200 }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto",
          display:"flex", justifyContent:"space-between", alignItems:"center", gap:"12px" }}>

          {/* Logo */}
          <div onClick={() => setCurrentPage("home")}
            style={{ cursor:"pointer", display:"flex", alignItems:"center", gap:"10px" }}>
            <span style={{ fontSize:"26px" }}>🍽️</span>
            <span style={{ fontFamily:"'Playfair Display',serif", fontSize:"20px", fontWeight:"900",
              background:S.grad, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              BetterDays Eats
            </span>
          </div>

          {/* Right actions */}
          <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
            {!isMobile && (
              <div style={{ position:"relative" }}>
                <input placeholder="Search recipes…" value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  style={{ background:S.card2, border:`1px solid ${S.border}`,
                    borderRadius:"40px", padding:"9px 16px 9px 38px",
                    color:S.text, width:"180px", fontSize:"13px", outline:"none" }} />
                <FaSearch style={{ position:"absolute", left:"13px", top:"11px",
                  color:S.muted, fontSize:"12px" }} />
              </div>
            )}

            {/* Notifications */}
            <div style={{ position:"relative" }}>
              <button className="bde-icon-btn" onClick={() => setShowNotifs(!showNotifs)}
                style={{ color:S.gold, position:"relative", padding:"4px" }}>
                <FaBell size={18} />
                {unread > 0 && (
                  <span style={{ position:"absolute", top:"-4px", right:"-6px",
                    background:"#ef4444", color:"#fff", borderRadius:"50%",
                    width:"15px", height:"15px", fontSize:"9px",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontWeight:"700" }}>
                    {unread}
                  </span>
                )}
              </button>
              {showNotifs && (
                <NotifPanel items={notifications}
                  onRead={() => { setNotifications(n => n.map(x => ({ ...x, read:true }))); setUnread(0) }}
                  onClose={() => setShowNotifs(false)} />
              )}
            </div>

            {/* User */}
            {currentUser ? (
              <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                <img src={currentUser.avatar} alt={currentUser.name}
                  style={{ width:"34px", height:"34px", borderRadius:"50%",
                    border:`2px solid ${S.gold}` }} />
                {!isMobile && (
                  <span style={{ color:S.gold, fontSize:"13px", fontWeight:"500" }}>
                    {currentUser.name}
                  </span>
                )}
                <button onClick={handleLogout}
                  style={{ background:"none", border:`1px solid ${S.border}`,
                    color:S.muted, borderRadius:"8px", padding:"6px 12px",
                    cursor:"pointer", fontSize:"12px" }}>
                  Out
                </button>
                {!isMobile && (
                  <button className="bde-btn-grad" onClick={() => setShowCreate(true)}
                    style={{ padding:"9px 20px", borderRadius:"40px", fontSize:"13px" }}>
                    ✨ Post
                  </button>
                )}
              </div>
            ) : (
              <button className="bde-btn-grad" onClick={() => setShowAuth(true)}
                style={{ padding:"9px 22px", borderRadius:"40px", fontSize:"13px" }}>
                Join Free
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ─── NAV ──────────────────────────────────────────────────────────── */}
      <nav style={{ 
        background:`${S.card}cc`, 
        backdropFilter:"blur(12px)",
        borderBottom:`1px solid ${S.border}`, 
        padding:"0 24px",
        position:"relative",
        zIndex:9998
      }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto",
          display:"flex", alignItems:"center", gap:"4px" }}>
          
          <button onClick={() => { setCurrentPage("home"); setShowDrop(false); }}
            style={{ background: currentPage === "home" ? `${S.gold}18` : "none",
              color: currentPage === "home" ? S.gold : S.muted,
              border:"none", borderRadius:"8px", padding:"12px 16px",
              cursor:"pointer", fontSize:"13px", fontWeight: currentPage === "home" ? "600" : "400",
              borderBottom: currentPage === "home" ? `2px solid ${S.gold}` : "2px solid transparent",
              transition:"all 0.2s" }}>
            🏠 Home
          </button>

          <div ref={dropRef} style={{ position:"relative", display:"inline-block", zIndex:99999 }}>
            <button onClick={() => {
              setShowDrop(!showDrop);
              if (showNotifs) setShowNotifs(false);
            }}
              style={{ 
                background: showDrop ? `${S.rose}18` : "none",
                color: showDrop ? S.rose : S.muted, 
                border:"none", 
                borderRadius:"8px",
                padding:"12px 16px", 
                cursor:"pointer", 
                fontSize:"13px",
                display:"flex", 
                alignItems:"center", 
                gap:"6px",
                borderBottom: showDrop ? `2px solid ${S.rose}` : "2px solid transparent",
                transition:"all 0.2s",
                position:"relative",
                zIndex:99999
              }}>
              More <FaChevronDown size={9}
                style={{ 
                  transform: showDrop ? "rotate(180deg)" : "rotate(0deg)", 
                  transition:"transform 0.2s" 
                }} />
            </button>
            {showDrop && <DropMenu currentPage={currentPage} setCurrentPage={setCurrentPage} onClose={() => setShowDrop(false)} />}
          </div>
        </div>
      </nav>

      {/* ── HOME PAGE ────────────────────────────────────────────────────── */}
      {currentPage === "home" && (
        <>
          {/* Hero */}
          <HeroBanner recipe={featured} onSignup={() => setShowAuth(true)}
            currentUser={currentUser} onPost={() => setShowCreate(true)} />

          {/* Mobile search */}
          {isMobile && (
            <div style={{ padding:"16px 20px", background:S.card,
              borderBottom:`1px solid ${S.border}` }}>
              <div style={{ position:"relative" }}>
                <input placeholder="Search recipes…" value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  style={{ width:"100%", background:S.card2, border:`1px solid ${S.border}`,
                    borderRadius:"40px", padding:"10px 16px 10px 38px",
                    color:S.text, fontSize:"13px", outline:"none" }} />
                <FaSearch style={{ position:"absolute", left:"13px", top:"12px",
                  color:S.muted, fontSize:"12px" }} />
              </div>
            </div>
          )}

          {/* Categories */}
          <div style={{ background:S.card, borderBottom:`1px solid ${S.border}`,
            overflowX:"auto", padding:"12px 20px" }}>
            <div style={{ display:"flex", gap:"8px", minWidth:"max-content" }}>
              {categories.map(cat => (
                <button key={cat.id} onClick={() => setSelectedCat(cat.id)}
                  className={selectedCat === cat.id ? "bde-btn-grad" : ""}
                  style={{
                    background: selectedCat !== cat.id ? "none" : undefined,
                    border: selectedCat === cat.id ? "none" : `1px solid ${S.border}`,
                    borderRadius:"40px", padding:"7px 16px", cursor:"pointer",
                    fontSize:"12px", display:"flex", alignItems:"center", gap:"5px",
                    whiteSpace:"nowrap", fontWeight: selectedCat === cat.id ? "600" : "400",
                    color: selectedCat === cat.id ? S.bg : S.muted,
                    transition:"all 0.2s"
                  }}>
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <main style={{ maxWidth:"1100px", margin:"0 auto", padding:"28px 20px 100px 20px" }}>
            {filtered.length === 0 ? (
              <div style={{ textAlign:"center", padding:"80px 24px",
                background:S.card, borderRadius:"24px", border:`1px solid ${S.border}` }}>
                <div style={{ fontSize:"52px", marginBottom:"16px" }}>🍽️</div>
                <h2 style={{ fontFamily:"'Playfair Display',serif", color:S.champ, marginBottom:"8px" }}>
                  No recipes yet
                </h2>
                <p style={{ color:S.muted, marginBottom:"24px" }}>
                  Be the first to share something delicious.
                </p>
                <button className="bde-btn-grad" onClick={openPost}
                  style={{ padding:"12px 28px", borderRadius:"40px", fontSize:"14px" }}>
                  Share a Recipe
                </button>
              </div>
            ) : (
              <div style={{ columns: isMobile ? 1 : 2, columnGap:"20px" }}>
                {filtered.map(r => (
                  <div key={r.id} style={{ breakInside:"avoid", marginBottom:"20px" }}>
                    <RecipeCard recipe={r} onLike={handleLike} onSave={handleSave}
                      currentUser={currentUser} />
                  </div>
                ))}
              </div>
            )}
          </main>
        </>
      )}

      {/* ── OTHER PAGES ──────────────────────────────────────────────────── */}
      {currentPage !== "home" && (pages[currentPage] ||
        <StubPage icon="🔍" title="Page not found" body="Head back home." />)}

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      {currentPage === "home" && (
        <footer style={{ textAlign:"center", padding:"32px 24px",
          borderTop:`1px solid ${S.border}`, paddingBottom:"80px" }}>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"16px",
            background:S.grad, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            marginBottom:"8px", fontWeight:"700" }}>
            BetterDays Eats
          </div>
          <p style={{ color:S.muted, fontSize:"11px", marginBottom:"12px" }}>
            © 2026 BetterDays Agile Technologies Inc · South Africa 🇿🇦
          </p>
          <div style={{ display:"flex", justifyContent:"center", gap:"16px", flexWrap:"wrap" }}>
            {["about","faq","contact","privacy","terms"].map(p => (
              <button key={p} onClick={() => setCurrentPage(p)}
                style={{ background:"none", border:"none", color:S.muted,
                  cursor:"pointer", fontSize:"12px", textTransform:"capitalize" }}>
                {p}
              </button>
            ))}
          </div>
        </footer>
      )}

      {/* ── MOBILE BOTTOM NAV ────────────────────────────────────────────── */}
      <div style={{ position:"fixed", bottom:0, left:0, right:0,
        background:`${S.bg}f5`, backdropFilter:"blur(20px)",
        borderTop:`1px solid ${S.border}`, display:"flex",
        justifyContent:"space-around", padding:"10px 0 14px", zIndex:100 }}>
        <button className="bde-icon-btn" onClick={() => setCurrentPage("home")}
          style={{ color: currentPage === "home" ? S.gold : S.muted, fontSize:"20px", padding:"4px 16px" }}>
          🏠
        </button>
        <button className="bde-icon-btn"
          onClick={() => setSelectedCat("trending")}
          style={{ color: selectedCat === "trending" ? S.rose : S.muted, fontSize:"20px", padding:"4px 16px" }}>
          🔥
        </button>
        <button className="bde-btn-grad" onClick={openPost}
          style={{ borderRadius:"50%", width:"48px", height:"48px",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:"20px", marginTop:"-10px", boxShadow:`0 4px 20px ${S.rose}50` }}>
          +
        </button>
        <button className="bde-icon-btn"
          onClick={() => setShowNotifs(!showNotifs)}
          style={{ color:S.muted, fontSize:"20px", padding:"4px 16px", position:"relative" }}>
          🔔
          {unread > 0 && (
            <span style={{ position:"absolute", top:0, right:"10px",
              background:"#ef4444", color:"#fff", borderRadius:"50%",
              width:"14px", height:"14px", fontSize:"9px",
              display:"flex", alignItems:"center", justifyContent:"center", fontWeight:"700" }}>
              {unread}
            </span>
          )}
        </button>
        <button className="bde-icon-btn"
          onClick={() => currentUser ? null : setShowAuth(true)}
          style={{ color: currentUser ? S.gold : S.muted, fontSize:"20px", padding:"4px 16px" }}>
          👤
        </button>
      </div>

      {/* ── MODALS & OVERLAYS ─────────────────────────────────────────────── */}
      {showCreate && currentUser && (
        <CreateModal onClose={() => setShowCreate(false)} onCreate={handleCreate} currentUser={currentUser} />
      )}
      {showAuth && (
        <AuthModal onClose={() => setShowAuth(false)} onLogin={handleLogin} />
      )}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      {!cookiesOk && (
        <CookieBanner onAccept={() => setCookiesOk(true)} />
      )}
    </div>
  )
}