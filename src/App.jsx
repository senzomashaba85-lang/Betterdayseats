import { useState, useEffect, useRef } from "react"
import { createClient } from "@supabase/supabase-js"
import {
  FaFacebook, FaTwitter, FaWhatsapp, FaTiktok,
  FaHeart, FaComment, FaBookmark, FaSearch,
  FaBell, FaTimes, FaChevronDown, FaFire,
  FaInstagram, FaYoutube, FaLink, FaMoon, FaSun,
  FaReply
} from "react-icons/fa"

const supabase = createClient(
  "https://vrbkynfdcpnnshofhmju.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyYmt5bmZkY3BubnNob2ZobWp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2ODUwOTksImV4cCI6MjA5NzI2MTA5OX0.1r4AwhLa_BAVw3OOKKWgfTSOknaKhbip6-Gs63fOPqI"
)

// ─── THEMES ─────────────────────────────────────────────────────────────────
const DARK = {
  bg:"#09060a", card:"#130d11", card2:"#1d1420", border:"#2d1d28",
  gold:"#d4a855", rose:"#c4788e", champ:"#f5e6d0", text:"#e8dfe5",
  muted:"#7a6472", grad:"linear-gradient(135deg, #d4a855 0%, #c4788e 100%)",
  inputBg:"#1a0f17", shadow:"rgba(0,0,0,0.6)", mode:"dark",
}
const LIGHT = {
  bg:"#fdf8f4", card:"#ffffff", card2:"#fef3ea", border:"#f0d9c8",
  gold:"#b8843a", rose:"#b05a75", champ:"#1a0a00", text:"#000000",
  muted:"#4a3020", grad:"linear-gradient(135deg, #b8843a 0%, #b05a75 100%)",
  inputBg:"#fff8f2", shadow:"rgba(0,0,0,0.12)", mode:"light",
}

const REACTIONS = [
  { emoji:"👍", label:"Like" },
  { emoji:"❤️", label:"Love" },
  { emoji:"😂", label:"Haha" },
  { emoji:"😮", label:"Wow" },
  { emoji:"😢", label:"Sad" },
  { emoji:"😡", label:"Angry" },
]

const EMOJIS = [
  "😀","😂","🤣","😍","🥰","😋","🤤","😮","👍","❤️",
  "🔥","💯","✨","👏","🙌","💪","🎉","🏆","⭐","💫",
  "🍽️","👨‍🍳","🥘","🍳","🥗","🌍","🇿🇦","🇳🇬","🇬🇭","🌶️",
  "😅","🤩","😎","🥺","💀","🙏","👌","✌️","🤝","💡",
]

const countries = [
  { code:"ZA",name:"South Africa",flag:"🇿🇦" },{ code:"US",name:"United States",flag:"🇺🇸" },
  { code:"GB",name:"United Kingdom",flag:"🇬🇧" },{ code:"NG",name:"Nigeria",flag:"🇳🇬" },
  { code:"KE",name:"Kenya",flag:"🇰🇪" },{ code:"GH",name:"Ghana",flag:"🇬🇭" },
  { code:"IN",name:"India",flag:"🇮🇳" },{ code:"BR",name:"Brazil",flag:"🇧🇷" },
  { code:"FR",name:"France",flag:"🇫🇷" },{ code:"IT",name:"Italy",flag:"🇮🇹" },
  { code:"ES",name:"Spain",flag:"🇪🇸" },{ code:"DE",name:"Germany",flag:"🇩🇪" },
  { code:"JP",name:"Japan",flag:"🇯🇵" },{ code:"AU",name:"Australia",flag:"🇦🇺" },
  { code:"CA",name:"Canada",flag:"🇨🇦" },{ code:"AE",name:"UAE",flag:"🇦🇪" },
  { code:"ZW",name:"Zimbabwe",flag:"🇿🇼" },{ code:"ZM",name:"Zambia",flag:"🇿🇲" },
  { code:"TZ",name:"Tanzania",flag:"🇹🇿" },{ code:"RW",name:"Rwanda",flag:"🇷🇼" },
  { code:"EG",name:"Egypt",flag:"🇪🇬" },{ code:"MA",name:"Morocco",flag:"🇲🇦" },
]

const categories = [
  { id:"all", name:"For You", icon:"✨" }, { id:"trending", name:"Trending", icon:"🔥" },
  { id:"african", name:"African", icon:"🌍" }, { id:"breakfast", name:"Breakfast", icon:"🌅" },
  { id:"lunch", name:"Lunch", icon:"🥗" }, { id:"dinner", name:"Dinner", icon:"🍽️" },
  { id:"desserts", name:"Desserts", icon:"🍰" }, { id:"soups", name:"Soups", icon:"🥣" },
  { id:"salads", name:"Salads", icon:"🥗" }, { id:"seafood", name:"Seafood", icon:"🐟" },
  { id:"meat", name:"Meat", icon:"🥩" }, { id:"chicken", name:"Chicken", icon:"🍗" },
  { id:"pasta", name:"Pasta", icon:"🍝" }, { id:"smoothies", name:"Smoothies", icon:"🥤" },
  { id:"italian", name:"Italian", icon:"🍕" }, { id:"mexican", name:"Mexican", icon:"🌮" },
  { id:"bbq", name:"BBQ", icon:"🔥" }, { id:"quick", name:"Quick Meals", icon:"⏱️" },
]

const DEMO = [
  {
    id:"demo-1", title:"Spiced Jollof Rice",
    description:"West African party rice with layers of sweet tomato, fire-roasted pepper and fragrant spices.",
    category:"african",
    image_url:"https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800&q=80",
    author_name:"Chef Amara", author_flag:"🇳🇬",
    author_avatar:"https://ui-avatars.com/api/?name=Chef+Amara&background=d4a855&color=09060a&bold=true",
    created_at: new Date(Date.now()-86400000*1).toISOString(),
    likes:284, liked:false, saved:false,
    reactions:{ "🔥":12, "😍":8 },
    comments:[{ id:1, text:"Made this last Sunday! Family loved it 😍", author_name:"Priya K.", author_flag:"🇮🇳", created_at:new Date().toISOString(), replies:[], reactions:{} }],
    ingredients:["2 cups long grain rice","4 ripe tomatoes","2 red bell peppers","1 large onion","2 cups chicken stock","1 tsp thyme"],
    socials:{ instagram:"@chefamara", tiktok:"@chefamara" }
  },
  {
    id:"demo-2", title:"Avocado Toast with Poached Eggs",
    description:"Creamy smashed avo on sourdough, topped with silky poached eggs, chilli flakes, and a drizzle of lemon.",
    category:"breakfast",
    image_url:"https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80",
    author_name:"Maya Torres", author_flag:"🇿🇦",
    author_avatar:"https://ui-avatars.com/api/?name=Maya+Torres&background=d4a855&color=09060a&bold=true",
    created_at: new Date(Date.now()-86400000*2).toISOString(),
    likes:412, liked:false, saved:false,
    reactions:{ "👍":22, "❤️":15 },
    comments:[{ id:1, text:"Obsessed with this recipe! 🥑", author_name:"Lerato M.", author_flag:"🇿🇦", created_at:new Date().toISOString(), replies:[], reactions:{} }],
    ingredients:["2 slices sourdough","1 ripe avocado","2 eggs","Lemon juice","Chilli flakes","Microgreens","Salt & pepper","Olive oil"],
    socials:{ instagram:"@mayacooks", website:"https://mayacooks.com" }
  },
  {
    id:"demo-3", title:"Creamy Pasta Carbonara",
    description:"Classic Roman carbonara made the proper way — no cream, just eggs, Pecorino and guanciale.",
    category:"pasta",
    image_url:"https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80",
    author_name:"Marco Rossi", author_flag:"🇮🇹",
    author_avatar:"https://ui-avatars.com/api/?name=Marco+Rossi&background=d4a855&color=09060a&bold=true",
    created_at: new Date(Date.now()-86400000*3).toISOString(),
    likes:356, liked:false, saved:false,
    reactions:{ "😂":5, "👍":11 }, comments:[],
    ingredients:["200g spaghetti","100g guanciale","3 egg yolks","1 whole egg","50g Pecorino Romano","Black pepper","Salt"],
    socials:{ instagram:"@marcorossi", youtube:"https://youtube.com/@marcorossi" }
  },
  {
    id:"demo-4", title:"Chocolate Lava Cake",
    description:"Warm, dark, and sinfully rich. Ready in 12 minutes and guaranteed to impress.",
    category:"desserts",
    image_url:"https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80",
    author_name:"Chef Céleste", author_flag:"🇫🇷",
    author_avatar:"https://ui-avatars.com/api/?name=Chef+Celeste&background=d4a855&color=09060a&bold=true",
    created_at: new Date(Date.now()-86400000*4).toISOString(),
    likes:527, liked:false, saved:false,
    reactions:{ "❤️":31, "😮":14 },
    comments:[{ id:1, text:"Made these for my anniversary dinner, absolute hit! 💕", author_name:"Nomvula D.", author_flag:"🇿🇦", created_at:new Date().toISOString(), replies:[], reactions:{} }],
    ingredients:["100g dark chocolate (70%)","100g butter","2 eggs + 2 yolks","80g caster sugar","30g plain flour","Pinch of salt","Cocoa powder for dusting"],
    socials:{ instagram:"@celeste_pastry" }
  },
  {
    id:"demo-5", title:"Açaí Smoothie Bowl",
    description:"Vibrant, energising, and almost too pretty to eat. Topped with fresh fruit, granola, coconut flakes.",
    category:"smoothies",
    image_url:"https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=800&q=80",
    author_name:"Bella Santos", author_flag:"🇧🇷",
    author_avatar:"https://ui-avatars.com/api/?name=Bella+Santos&background=d4a855&color=09060a&bold=true",
    created_at: new Date(Date.now()-86400000*5).toISOString(),
    likes:389, liked:false, saved:false,
    reactions:{ "😍":20, "👍":8 }, comments:[],
    ingredients:["200g frozen açaí","1 banana","100ml coconut milk","Granola","Fresh berries","Coconut flakes","Honey","Chia seeds"],
    socials:{ instagram:"@bellasmoothies", tiktok:"@bellasmoothies" }
  },
  {
    id:"demo-6", title:"Durban Bunny Chow",
    description:"Iconic Durban street food — a hollowed-out quarter loaf filled with fragrant lamb curry.",
    category:"african",
    image_url:"https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&q=80",
    author_name:"BetterDays Chef", author_flag:"🇿🇦",
    author_avatar:"https://ui-avatars.com/api/?name=BetterDays+Chef&background=d4a855&color=09060a&bold=true",
    created_at: new Date(Date.now()-86400000*6).toISOString(),
    likes:631, liked:false, saved:false,
    reactions:{ "🔥":28, "🤤":19 },
    comments:[{ id:1, text:"Nothing beats a KZN bunny 🙌🏾", author_name:"Sipho N.", author_flag:"🇿🇦", created_at:new Date().toISOString(), replies:[], reactions:{} }],
    ingredients:["500g lamb pieces","1 quarter bread loaf","1 tin tomatoes","2 onions","Durban masala mix","Curry leaves","Potatoes"],
    socials:{ instagram:"@betterdayschef", tiktok:"@betterdayschef" }
  },
]

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
      body { font-family: 'Inter', -apple-system, sans-serif; }
      input, textarea, select, button { font-family: 'Inter', -apple-system, sans-serif; }
      ::-webkit-scrollbar { width: 4px; height: 4px; }
      ::-webkit-scrollbar-thumb { border-radius: 4px; }
      .bde-card { transition: transform 0.3s cubic-bezier(.4,0,.2,1), box-shadow 0.3s ease; }
      .bde-card:hover { transform: translateY(-4px); }
      .bde-btn-grad { border: none; cursor: pointer; font-weight: 700; transition: opacity 0.2s, transform 0.15s; }
      .bde-btn-grad:hover { opacity: 0.88; transform: scale(1.02); }
      .bde-icon-btn { background: none; border: none; cursor: pointer; transition: color 0.2s, transform 0.15s; }
      .bde-icon-btn:hover { transform: scale(1.15); }
      @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
      @keyframes shimmer { 0%,100%{opacity:0.6} 50%{opacity:1} }
      @keyframes floatPulse { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      .bde-hero-text { animation: fadeUp 0.9s ease both; }
      .bde-hero-text-delay { animation: fadeUp 0.9s 0.2s ease both; }
      .bde-float { animation: floatPulse 3s ease-in-out infinite; }
      .theme-toggle { transition: all 0.3s ease; }
    `
    document.head.appendChild(style)
  }, [])
}

function Toast({ message, onClose, S }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t) }, [onClose])
  return (
    <div style={{ position:"fixed", bottom:"90px", left:"50%", transform:"translateX(-50%)",
      background:S.grad, color:"#fff", padding:"12px 28px", borderRadius:"40px",
      fontWeight:"700", fontSize:"13px", zIndex:9999, whiteSpace:"nowrap",
      boxShadow:`0 8px 32px ${S.shadow}` }}>
      {message}
    </div>
  )
}

function ThemeToggle({ S, isDark, onToggle }) {
  return (
    <button onClick={onToggle} className="theme-toggle"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      style={{ background: isDark ? "#1d1420" : "#f0d9c8", border:`1px solid ${S.border}`,
        borderRadius:"40px", padding:"7px 14px", cursor:"pointer", display:"flex",
        alignItems:"center", gap:"6px", color:S.gold, fontSize:"12px", fontWeight:"600",
        transition:"all 0.3s ease" }}>
      {isDark ? <FaSun size={13} /> : <FaMoon size={13} />}
      {isDark ? "Light" : "Dark"}
    </button>
  )
}

function ShareRow({ post }) {
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(`${post.title} on BetterDays Eats!`)
  const shares = [
    { Icon:FaTiktok, href:`https://www.tiktok.com/share?url=${url}&text=${text}`, color:"#000" },
    { Icon:FaWhatsapp, href:`https://wa.me/?text=${text}%20${url}`, color:"#25D366" },
    { Icon:FaFacebook, href:`https://www.facebook.com/sharer/sharer.php?u=${url}`, color:"#1877F2" },
    { Icon:FaTwitter, href:`https://twitter.com/intent/tweet?text=${text}&url=${url}`, color:"#1DA1F2" },
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

// ─── EMOJI PICKER ──────────────────────────────────────────────────────────
function EmojiPicker({ onSelect, onClose }) {
  const pickerRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  return (
    <div ref={pickerRef} style={{ 
      display: "grid",
      gridTemplateColumns: "repeat(8, 1fr)",
      gap: "4px",
      padding: "12px",
      background: "#1d1420",
      border: "1px solid #2d1d28",
      borderRadius: "14px",
      position: "absolute",
      bottom: "50px",
      left: "0",
      zIndex: 9999,
      boxShadow: "0 8px 32px rgba(0,0,0,0.8)",
      width: "280px",
      maxHeight: "200px",
      overflowY: "auto"
    }}>
      {EMOJIS.map(e => (
        <button 
          key={e} 
          onClick={() => { 
            onSelect(e); 
            onClose(); 
          }}
          style={{ 
            background: "none", 
            border: "none", 
            cursor: "pointer", 
            fontSize: "24px",
            padding: "4px",
            borderRadius: "8px",
            lineHeight: 1,
            transition: "all 0.15s"
          }}
          onMouseEnter={ev => { 
            ev.currentTarget.style.transform = "scale(1.3)"; 
            ev.currentTarget.style.background = "rgba(255,255,255,0.1)";
          }}
          onMouseLeave={ev => { 
            ev.currentTarget.style.transform = "scale(1)"; 
            ev.currentTarget.style.background = "none";
          }}
        >
          {e}
        </button>
      ))}
    </div>
  )
}

// ─── REACTION BAR ──────────────────────────────────────────────────────────
function ReactionBar({ reactions, onReact, S }) {
  const [showReactions, setShowReactions] = useState(false)
  const total = Object.values(reactions || {}).reduce((a,b) => a+b, 0)
  const topReactions = Object.entries(reactions || {}).filter(([,c]) => c > 0).sort((a,b) => b[1]-a[1]).slice(0,3)

  return (
    <div style={{ display:"flex", alignItems:"center", gap:"8px", flexWrap:"wrap", position:"relative" }}>
      <div style={{ position:"relative" }}
        onMouseEnter={() => setShowReactions(true)}
        onMouseLeave={() => setShowReactions(false)}>
        <button style={{ background:`${S.gold}15`, border:`1px solid ${S.border}`,
          borderRadius:"20px", padding:"4px 12px", fontSize:"12px", cursor:"pointer",
          display:"flex", alignItems:"center", gap:"5px", color:S.muted }}>
          👍 <span style={{ fontSize:"11px" }}>React</span>
        </button>
        {showReactions && (
          <div style={{ position:"absolute", bottom:"110%", left:0, display:"flex", gap:"4px",
            background: S.mode === "dark" ? "#1d1420" : "#fff",
            border:`1px solid ${S.border}`, borderRadius:"40px", padding:"6px 10px",
            boxShadow:"0 8px 32px rgba(0,0,0,0.4)", zIndex:9999 }}>
            {REACTIONS.map(r => (
              <button key={r.emoji} onClick={() => { onReact(r.emoji); setShowReactions(false) }}
                title={r.label}
                style={{ background:"none", border:"none", cursor:"pointer", fontSize:"22px", padding:"2px 4px" }}
                onMouseEnter={e => e.currentTarget.style.transform="scale(1.4) translateY(-4px)"}
                onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}>
                {r.emoji}
              </button>
            ))}
          </div>
        )}
      </div>
      {topReactions.length > 0 && (
        <div style={{ display:"flex", alignItems:"center", gap:"3px" }}>
          <span style={{ fontSize:"14px" }}>{topReactions.map(([e]) => e).join("")}</span>
          <span style={{ color:S.muted, fontSize:"12px" }}>{total}</span>
        </div>
      )}
    </div>
  )
}

// ─── COMMENT THREAD ────────────────────────────────────────────────────────
function CommentThread({ comment, currentUser, S }) {
  const [showReplyInput, setShowReplyInput] = useState(false)
  const [replyText, setReplyText] = useState("")
  const [replies, setReplies] = useState(comment.replies || [])
  const [showReplies, setShowReplies] = useState(false)
  const [reactions, setReactions] = useState(comment.reactions || {})
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const handleReply = () => {
    if (!replyText.trim() || !currentUser) return
    const newReply = {
      id: Date.now(),
      text: replyText.trim(),
      author_name: currentUser.name,
      author_flag: currentUser.countryFlag,
      created_at: new Date().toISOString()
    }
    setReplies(prev => [...prev, newReply])
    setReplyText("")
    setShowReplyInput(false)
    setShowReplies(true)
  }

  const handleReact = (emoji) => {
    setReactions(prev => ({ ...prev, [emoji]: (prev[emoji] || 0) + 1 }))
  }

  return (
    <div style={{ marginBottom:"10px" }}>
      <div style={{ padding:"10px 12px", background:S.card2, borderRadius:"10px", border:`1px solid ${S.border}` }}>
        <div style={{ display:"flex", alignItems:"center", gap:"6px", marginBottom:"5px" }}>
          <span style={{ fontSize:"14px" }}>{comment.author_flag}</span>
          <strong style={{ color:S.gold, fontSize:"12px" }}>{comment.author_name}</strong>
          <span style={{ color:S.muted, fontSize:"10px" }}>{new Date(comment.created_at).toLocaleDateString()}</span>
        </div>
        <p style={{ color:S.text, fontSize:"13px", lineHeight:"1.5", marginBottom:"8px" }}>{comment.text}</p>
        <div style={{ display:"flex", alignItems:"center", gap:"10px", flexWrap:"wrap" }}>
          <ReactionBar reactions={reactions} onReact={handleReact} S={S} />
          {currentUser && (
            <button onClick={() => setShowReplyInput(!showReplyInput)}
              style={{ background:"none", border:"none", color:S.muted, cursor:"pointer", fontSize:"11px", display:"flex", alignItems:"center", gap:"4px" }}>
              <FaReply size={10} /> Reply
            </button>
          )}
          {replies.length > 0 && (
            <button onClick={() => setShowReplies(!showReplies)}
              style={{ background:"none", border:"none", color:S.gold, cursor:"pointer", fontSize:"11px" }}>
              {showReplies ? "▲" : "▼"} {replies.length} {replies.length === 1 ? "reply" : "replies"}
            </button>
          )}
        </div>
      </div>

      {showReplies && replies.length > 0 && (
        <div style={{ marginLeft:"20px", marginTop:"6px" }}>
          {replies.map(r => (
            <div key={r.id} style={{ padding:"8px 12px", background:S.card2,
              borderRadius:"10px", border:`1px solid ${S.border}`, marginBottom:"6px",
              borderLeft:`3px solid ${S.gold}` }}>
              <div style={{ display:"flex", alignItems:"center", gap:"6px", marginBottom:"4px" }}>
                <span style={{ fontSize:"12px" }}>{r.author_flag}</span>
                <strong style={{ color:S.gold, fontSize:"11px" }}>{r.author_name}</strong>
              </div>
              <p style={{ color:S.text, fontSize:"12px", lineHeight:"1.5" }}>{r.text}</p>
            </div>
          ))}
        </div>
      )}

      {showReplyInput && currentUser && (
        <div style={{ marginLeft:"20px", marginTop:"6px", display:"flex", gap:"6px", position:"relative" }}>
          <div style={{ position:"relative", flex:1 }}>
            <input 
              value={replyText} 
              onChange={e => setReplyText(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleReply()}
              placeholder={`Reply to ${comment.author_name}...`}
              style={{ 
                width:"100%", 
                background:S.card2, 
                border:`1px solid ${S.border}`,
                borderRadius:"40px", 
                padding:"7px 40px 7px 14px",
                color:S.text, 
                fontSize:"12px", 
                outline:"none" 
              }} 
            />
            <button 
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              style={{ 
                position:"absolute", 
                right:"10px", 
                top:"50%",
                transform:"translateY(-50%)",
                background:"none", 
                border:"none", 
                cursor:"pointer",
                color:S.muted, 
                fontSize:"16px",
                padding:"2px"
              }}
            >
              😊
            </button>
            {showEmojiPicker && (
              <div style={{ position:"absolute", bottom:"45px", left:"0", zIndex:9999 }}>
                <EmojiPicker 
                  onSelect={e => setReplyText(prev => prev + e)} 
                  onClose={() => setShowEmojiPicker(false)} 
                />
              </div>
            )}
          </div>
          <button onClick={handleReply}
            style={{ 
              background:S.grad, 
              border:"none", 
              borderRadius:"40px",
              padding:"7px 14px", 
              color:"#fff", 
              fontSize:"12px", 
              cursor:"pointer", 
              fontWeight:"600" 
            }}>
            Reply
          </button>
        </div>
      )}
    </div>
  )
}

// ─── RECIPE CARD ──────────────────────────────────────────────────────────
// ─── RECIPE CARD ──────────────────────────────────────────────────────────
function RecipeCard({ recipe, onLike, onSave, currentUser, S }) {
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState(recipe.comments || [])
  const [imgLoaded, setImgLoaded] = useState(false)
  const [showAllIngredients, setShowAllIngredients] = useState(false)
  const [reactions, setReactions] = useState(recipe.reactions || {})
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [expanded, setExpanded] = useState(false) // ⭐ NEW: For description expand
  const cat = categories.find(c => c.id === recipe.category)

  const addComment = async () => {
    if (!newComment.trim() || !currentUser) return
    const isDemo = String(recipe.id).startsWith("demo-")
    const comment = {
      id: Date.now(), text: newComment.trim(),
      author_name: currentUser.name, author_flag: currentUser.countryFlag,
      created_at: new Date().toISOString(), replies: [], reactions: {}
    }
    if (!isDemo) {
      await supabase.from("comments").insert({
        recipe_id: recipe.id, author_id: currentUser.id,
        author_name: currentUser.name, text: newComment.trim()
      })
    }
    setComments(prev => [...prev, comment])
    setNewComment("")
  }

  const handleReact = (emoji) => {
    setReactions(prev => ({ ...prev, [emoji]: (prev[emoji] || 0) + 1 }))
  }

  return (
    <article className="bde-card" style={{ backgroundColor:S.card, borderRadius:"20px",
      border:`1px solid ${S.border}`, overflow:"hidden", display:"flex", flexDirection:"column",
      boxShadow: S.mode === "light" ? "0 4px 24px rgba(0,0,0,0.08)" : "none" }}>

      <div style={{ position:"relative", paddingTop:"65%", backgroundColor:S.card2 }}>
        {!imgLoaded && (
          <div style={{ position:"absolute", inset:0, background:`linear-gradient(135deg, ${S.card2}, ${S.border})`,
            animation:"shimmer 1.5s ease infinite", display:"flex", alignItems:"center",
            justifyContent:"center", fontSize:"32px" }}>🍽️</div>
        )}
        <img src={recipe.image_url} alt={recipe.title} onLoad={() => setImgLoaded(true)}
          style={{ position:"absolute", inset:0, width:"100%", height:"100%",
            objectFit:"cover", display: imgLoaded ? "block" : "none" }} />
        <div style={{ position:"absolute", inset:0,
          background:"linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)" }} />

        {cat && (
          <div style={{ position:"absolute", top:"14px", left:"14px",
            background: S.mode === "dark" ? "rgba(9,6,10,0.65)" : "rgba(253,248,244,0.9)",
            backdropFilter:"blur(8px)", border:`1px solid ${S.border}`, borderRadius:"40px",
            padding:"4px 12px", display:"flex", alignItems:"center", gap:"5px" }}>
            <span style={{ fontSize:"11px" }}>{cat.icon}</span>
            <span style={{ color:S.champ, fontSize:"11px", fontWeight:"500" }}>{cat.name}</span>
          </div>
        )}

        <button className="bde-icon-btn" onClick={() => onSave(recipe.id)}
          style={{ position:"absolute", top:"12px", right:"14px",
            color: recipe.saved ? S.gold : "rgba(255,255,255,0.7)", fontSize:"16px" }}>
          <FaBookmark />
        </button>

        <div style={{ position:"absolute", bottom:"14px", left:"14px", display:"flex", alignItems:"center", gap:"8px" }}>
          <img src={recipe.author_avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(recipe.author_name)}&background=d4a855&color=09060a&bold=true`}
            alt={recipe.author_name}
            style={{ width:"30px", height:"30px", borderRadius:"50%", border:`2px solid ${S.gold}` }} />
          <div>
            <div style={{ color:S.gold, fontSize:"12px", fontWeight:"600" }}>{recipe.author_name}</div>
            <div style={{ color:"rgba(255,255,255,0.7)", fontSize:"10px" }}>
              {recipe.author_flag} · {new Date(recipe.created_at).toLocaleDateString("en-ZA", { day:"numeric", month:"short" })}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding:"16px 16px 0 16px", flex:1 }}>
        <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:"18px", fontWeight:"700",
          color:S.champ, lineHeight:"1.3", marginBottom:"6px" }}>
          {recipe.title}
        </h3>

        <div style={{ display:"flex", alignItems:"center", gap:"6px", marginBottom:"8px" }}>
          <span style={{ fontSize:"16px" }}>{recipe.author_flag}</span>
          <span style={{ color:S.gold, fontSize:"12px", fontWeight:"600" }}>{recipe.author_name}</span>
        </div>

        {/* ⭐ EXPANDABLE DESCRIPTION - FIXED */}
        <div style={{ marginBottom:"8px" }}>
          <p style={{ 
            color:S.muted, 
            fontSize:"13px", 
            lineHeight:"1.65",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: expanded ? "none" : 3,
            WebkitBoxOrient: "vertical",
            maxHeight: expanded ? "none" : "65px",
            transition: "all 0.3s ease"
          }}>
            {recipe.description}
          </p>
          {recipe.description && recipe.description.length > 120 && (
            <button 
              onClick={() => setExpanded(!expanded)}
              style={{
                background: "none",
                border: "none",
                color: S.gold,
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: "600",
                padding: "4px 0",
                marginTop: "4px",
                display: "inline-block"
              }}
            >
              {expanded ? "Show less ▲" : "See more ▼"}
            </button>
          )}
        </div>

        <ReactionBar reactions={reactions} onReact={handleReact} S={S} />

        {recipe.socials && Object.keys(recipe.socials).some(k => recipe.socials[k]) && (
          <div style={{ display:"flex", gap:"6px", marginTop:"10px", flexWrap:"wrap" }}>
            {recipe.socials.instagram && (
              <a href={`https://instagram.com/${recipe.socials.instagram.replace('@','')}`} target="_blank" rel="noopener noreferrer"
                style={{ color:"#E4405F", fontSize:"11px", textDecoration:"none", background:`${S.rose}18`, padding:"3px 10px", borderRadius:"12px", display:"inline-flex", alignItems:"center", gap:"4px" }}>
                <FaInstagram size={11} /> IG
              </a>
            )}
            {recipe.socials.tiktok && (
              <a href={`https://tiktok.com/${recipe.socials.tiktok.replace('@','')}`} target="_blank" rel="noopener noreferrer"
                style={{ color: S.mode === "dark" ? "#fff" : "#010101", fontSize:"11px", textDecoration:"none", background:`${S.rose}18`, padding:"3px 10px", borderRadius:"12px", display:"inline-flex", alignItems:"center", gap:"4px" }}>
                <FaTiktok size={11} /> TikTok
              </a>
            )}
            {recipe.socials.website && (
              <a href={recipe.socials.website} target="_blank" rel="noopener noreferrer"
                style={{ color:S.gold, fontSize:"11px", textDecoration:"none", background:`${S.rose}18`, padding:"3px 10px", borderRadius:"12px", display:"inline-flex", alignItems:"center", gap:"4px" }}>
                <FaLink size={11} /> Website
              </a>
            )}
            {recipe.socials.facebook && (
              <a href={recipe.socials.facebook} target="_blank" rel="noopener noreferrer"
                style={{ color:"#1877F2", fontSize:"11px", textDecoration:"none", background:`${S.rose}18`, padding:"3px 10px", borderRadius:"12px", display:"inline-flex", alignItems:"center", gap:"4px" }}>
                <FaFacebook size={11} /> FB
              </a>
            )}
          </div>
        )}

        {recipe.ingredients?.length > 0 && (
          <div style={{ marginTop:"10px", padding:"10px 12px", background:S.card2,
            borderRadius:"10px", border:`1px solid ${S.border}` }}>
            <div style={{ color:S.gold, fontSize:"11px", fontWeight:"600", marginBottom:"6px" }}>🛒 Ingredients</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"4px" }}>
              {(showAllIngredients ? recipe.ingredients : recipe.ingredients.slice(0,4)).map((ing,i) => (
                <span key={i} style={{ background:`${S.gold}18`, color:S.champ, borderRadius:"20px", padding:"2px 10px", fontSize:"11px" }}>{ing}</span>
              ))}
              {recipe.ingredients.length > 4 && (
                <button onClick={() => setShowAllIngredients(!showAllIngredients)}
                  style={{ background:`${S.gold}28`, color:S.gold, borderRadius:"20px",
                    padding:"2px 10px", fontSize:"11px", border:"none", cursor:"pointer", fontWeight:"600" }}>
                  {showAllIngredients ? "less" : `+${recipe.ingredients.length-4}`}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <div style={{ padding:"12px 16px 16px 16px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
          paddingTop:"10px", borderTop:`1px solid ${S.border}` }}>
          <div style={{ display:"flex", gap:"16px", alignItems:"center" }}>
            <button className="bde-icon-btn" onClick={() => onLike(recipe.id)}
              style={{ display:"flex", alignItems:"center", gap:"6px",
                color: recipe.liked ? "#ff6b8a" : S.muted, fontSize:"13px" }}>
              <FaHeart size={14} />
              <span style={{ fontWeight:"600" }}>{recipe.likes}</span>
            </button>
            <button className="bde-icon-btn" onClick={() => setShowComments(!showComments)}
              style={{ display:"flex", alignItems:"center", gap:"6px", color:S.muted, fontSize:"13px" }}>
              <FaComment size={14} />
              <span style={{ fontWeight:"600" }}>{comments.length}</span>
            </button>
          </div>
          <ShareRow post={recipe} />
        </div>

        {showComments && (
          <div style={{ marginTop:"12px" }}>
            {comments.map(c => (
              <CommentThread key={c.id} comment={c} currentUser={currentUser} S={S} />
            ))}
            {currentUser ? (
              <div style={{ display:"flex", gap:"8px", marginTop:"8px", position:"relative" }}>
                <div style={{ position:"relative", flex:1 }}>
                  <input 
                    value={newComment} 
                    onChange={e => setNewComment(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && addComment()}
                    placeholder="Write a comment..."
                    style={{ 
                      width:"100%", 
                      background:S.card2, 
                      border:`1px solid ${S.border}`,
                      borderRadius:"40px", 
                      padding:"9px 45px 9px 16px",
                      color:S.text, 
                      fontSize:"13px", 
                      outline:"none" 
                    }} 
                  />
                  <button 
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    style={{ 
                      position:"absolute", 
                      right:"12px", 
                      top:"50%",
                      transform:"translateY(-50%)",
                      background:"none", 
                      border:"none", 
                      cursor:"pointer",
                      color:S.muted, 
                      fontSize:"18px",
                      padding:"4px",
                      borderRadius:"50%",
                      transition:"all 0.2s"
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = `${S.gold}30`}
                    onMouseLeave={e => e.currentTarget.style.background = "none"}
                  >
                    😊
                  </button>
                  {showEmojiPicker && (
                    <div style={{ position:"absolute", bottom:"50px", left:"0", zIndex:9999 }}>
                      <EmojiPicker 
                        onSelect={e => setNewComment(prev => prev + e)} 
                        onClose={() => setShowEmojiPicker(false)} 
                      />
                    </div>
                  )}
                </div>
                <button onClick={addComment}
                  style={{ 
                    background:S.grad, 
                    border:"none", 
                    borderRadius:"40px",
                    padding:"9px 20px", 
                    color:"#fff", 
                    fontSize:"13px",
                    cursor:"pointer", 
                    fontWeight:"600", 
                    whiteSpace:"nowrap" 
                  }}>
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
// ─── HERO BANNER ──────────────────────────────────────────────────────────
function HeroBanner({ recipe, onSignup, currentUser, onPost, S, isDark }) {
  if (!recipe) return null
  return (
    <div style={{ position:"relative", width:"100%", height:"460px", overflow:"hidden", borderBottom:`1px solid ${S.border}` }}>
      <img src={recipe.image_url} alt={recipe.title}
        style={{ width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.55) saturate(1.2)" }} />
      <div style={{ position:"absolute", inset:0,
        background: isDark
          ? "linear-gradient(180deg, rgba(9,6,10,0.1) 0%, rgba(9,6,10,0.4) 50%, rgba(9,6,10,0.97) 100%)"
          : "linear-gradient(180deg, rgba(253,248,244,0.05) 0%, rgba(253,248,244,0.3) 50%, rgba(253,248,244,0.97) 100%)"
      }} />
      <div className="bde-float" style={{ position:"absolute", top:"28px", left:"28px",
        display:"flex", alignItems:"center", gap:"8px",
        background: isDark ? "rgba(9,6,10,0.7)" : "rgba(255,255,255,0.9)",
        backdropFilter:"blur(12px)", border:`1px solid ${S.gold}50`, borderRadius:"40px", padding:"8px 16px" }}>
        <FaFire color={S.gold} size={12} />
        <span style={{ color:S.gold, fontSize:"12px", fontWeight:"600" }}>Featured Today</span>
        <span style={{ fontSize:"16px" }}>{recipe.author_flag}</span>
      </div>
      <div style={{ position:"absolute", bottom:"32px", left:"32px", right:"32px", maxWidth:"680px" }}>
        <div className="bde-hero-text">
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(26px,5vw,48px)",
            fontWeight:"900", color: isDark ? "#f5e6d0" : "#1a0a00",
            lineHeight:"1.1", marginBottom:"12px" }}>
            {recipe.title}
          </h1>
        </div>
        <p className="bde-hero-text-delay" style={{ color: isDark ? "#c8b8c4" : "#3a1f0d",
          fontSize:"14px", lineHeight:"1.65", maxWidth:"520px", marginBottom:"20px" }}>
          {recipe.description}
        </p>
        <div className="bde-hero-text-delay" style={{ display:"flex", alignItems:"center", gap:"16px", flexWrap:"wrap" }}>
          <button className="bde-btn-grad" onClick={() => currentUser ? onPost() : onSignup()}
            style={{ padding:"12px 28px", borderRadius:"40px", fontSize:"14px", background:S.grad, color:"#fff" }}>
            {currentUser ? "✨ Share Your Recipe" : "Join the Community"}
          </button>
          <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
            <img src={recipe.author_avatar} alt={recipe.author_name}
              style={{ width:"32px", height:"32px", borderRadius:"50%", border:`2px solid ${S.gold}` }} />
            <span style={{ color: isDark ? "#fff" : "#1a0a00", fontSize:"13px" }}>
              by <strong>{recipe.author_name}</strong>
            </span>
            <span style={{ color: isDark ? "rgba(255,255,255,0.7)" : "#3a1f0d", fontSize:"13px" }}>
              · {recipe.likes} likes
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── CREATE MODAL ──────────────────────────────────────────────────────────
function CreateModal({ onClose, onCreate, currentUser, S }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("african")
  const [ingredients, setIngredients] = useState("")
  const [socials, setSocials] = useState({ instagram:"", tiktok:"", website:"", facebook:"" })
  const [mediaFile, setMediaFile] = useState(null)
  const [mediaPreview, setMediaPreview] = useState("")
  const [mediaType, setMediaType] = useState("image")
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const iStyle = { width:"100%", background:S.card2, border:`1px solid ${S.border}`,
    borderRadius:"10px", padding:"12px 14px", color:S.text, fontSize:"14px", outline:"none" }

  const handleMedia = e => {
    const file = e.target.files[0]; if (!file) return
    setMediaType(file.type.startsWith("video") ? "video" : "image")
    setMediaFile(file)
    const r = new FileReader(); r.onloadend = () => setMediaPreview(r.result); r.readAsDataURL(file)
  }

  const handleSubmit = async e => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    setUploading(true);
    setError("");

    try {
      // ✅ CHECK if profile exists
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", currentUser.id)
        .single();

      // ✅ If not, create it
      if (!profile) {
        const { error: insertProfileError } = await supabase
          .from("profiles")
          .insert({
            id: currentUser.id,
            name: currentUser.name,
            email: currentUser.email || `${currentUser.id}@temp.com`,
            country_flag: currentUser.countryFlag || "🌍",
            avatar: currentUser.avatar || `https://ui-avatars.com/api/?name=${currentUser.name}&background=d4a855&color=09060a&bold=true`
          });
        
        if (insertProfileError) {
          console.error("Profile insert error:", insertProfileError);
          // Don't throw - continue anyway
        }
      }

      // ✅ NOW insert recipe
      let image_url = null, video_url = null;
      if (mediaFile) {
        const ext = mediaFile.name.split(".").pop();
        const filename = `${currentUser.id}-${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("recipes-media")
          .upload(filename, mediaFile, { cacheControl: "3600", upsert: false });
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage
          .from("recipes-media")
          .getPublicUrl(filename);
        if (mediaType === "image") image_url = urlData.publicUrl;
        else video_url = urlData.publicUrl;
      }

      const { data, error: insertError } = await supabase
        .from("recipes")
        .insert({
          title: title.trim(),
          description: description.trim(),
          category,
          ingredients: ingredients.split("\n").filter(i => i.trim()),
          image_url,
          video_url,
          author_id: currentUser.id,
          author_name: currentUser.name,
          author_flag: currentUser.countryFlag || "🌍",
          author_avatar: currentUser.avatar || `https://ui-avatars.com/api/?name=${currentUser.name}&background=d4a855&color=09060a&bold=true`,
          socials,
          likes: 0
        })
        .select()
        .single();

      if (insertError) throw insertError;
      
      // ✅ Add to UI
      onCreate({ 
        ...data, 
        comments: [], 
        liked: false, 
        saved: false, 
        reactions: {} 
      });
      onClose();
      
    } catch (err) {
      console.error("Submit error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ position:"fixed", inset:0, background: S.mode === "dark" ? "rgba(9,6,10,0.96)" : "rgba(60,30,20,0.7)",
      zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:"20px", overflowY:"auto" }}>
      <div style={{ background:S.card, borderRadius:"24px", width:"100%", maxWidth:"560px",
        maxHeight:"90vh", overflowY:"auto", border:`1px solid ${S.border}`,
        padding:"28px", position:"relative", boxShadow:`0 32px 80px ${S.shadow}` }}>

        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px" }}>
          <h2 style={{ fontFamily:"'Playfair Display',serif", color:S.champ, fontSize:"20px", fontWeight:"700" }}>
            🍽️ Share Your Recipe
          </h2>
          <button className="bde-icon-btn" onClick={onClose} style={{ color:S.muted, fontSize:"20px" }}><FaTimes /></button>
        </div>

        {error && (
          <div style={{ background:"#ef444420", border:"1px solid #ef4444", borderRadius:"10px",
            padding:"12px 16px", marginBottom:"16px", color:"#ef4444", fontSize:"13px" }}>{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
            <input placeholder="Recipe title *" value={title} onChange={e => setTitle(e.target.value)} required style={iStyle} />

            <div style={{ position:"relative" }}>
  <textarea 
    placeholder="Tell the story behind this dish... Use emojis!" 
    value={description}
    onChange={e => setDescription(e.target.value)} 
    required 
    rows={4}   // ⬅️ CHANGE THIS TO 5
    style={{ ...iStyle, resize:"vertical", paddingRight:"40px" }} 
  />
  <button type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)}
    style={{ position:"absolute", bottom:"10px", right:"10px", background:"none", border:"none", cursor:"pointer", fontSize:"18px" }}>😊</button>
  {showEmojiPicker && (
    <div style={{ position:"absolute", bottom:"40px", left:"0", zIndex:9999 }}>
      <EmojiPicker onSelect={e => setDescription(prev => prev + e)} onClose={() => setShowEmojiPicker(false)} />
    </div>
  )}
</div>

            <select value={category} onChange={e => setCategory(e.target.value)} style={iStyle}>
              {categories.filter(c => c.id !== "all" && c.id !== "trending").map(c =>
                <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
            </select>

            <textarea placeholder="Ingredients (one per line)" value={ingredients}
              onChange={e => setIngredients(e.target.value)} rows={3}
              style={{ ...iStyle, resize:"vertical", fontFamily:"monospace", fontSize:"13px" }} />

            {/* Socials */}
            <div style={{ background:S.card2, border:`1px solid ${S.border}`, borderRadius:"10px", padding:"14px" }}>
              <p style={{ color:S.gold, fontSize:"12px", fontWeight:"600", marginBottom:"10px" }}>🌐 Connect Your Socials</p>
              {[
                { key:"instagram", placeholder:"📸 Instagram (@handle)" },
                { key:"tiktok", placeholder:"🎵 TikTok (@handle)" },
                { key:"website", placeholder:"🌍 Website / Portfolio" },
                { key:"facebook", placeholder:"👥 Facebook page" },
              ].map(({ key, placeholder }) => (
                <input key={key} placeholder={placeholder} value={socials[key]}
                  onChange={e => setSocials(p => ({ ...p, [key]: e.target.value }))}
                  style={{ ...iStyle, fontSize:"12px", marginBottom:"6px" }} />
              ))}
            </div>

            <label style={{ cursor:"pointer" }}>
              <input type="file" accept="image/*,video/*" onChange={handleMedia} style={{ display:"none" }} />
              <div style={{ border:`2px dashed ${S.rose}60`, borderRadius:"12px", padding:"20px",
                textAlign:"center", background:`${S.rose}05` }}>
                <div style={{ fontSize:"32px", marginBottom:"6px" }}>📸</div>
                <p style={{ color:S.rose, fontWeight:"600", fontSize:"13px", margin:0 }}>
                  {mediaPreview ? "Change photo / video" : "Add a photo or video"}
                </p>
              </div>
            </label>

            {mediaPreview && (
              <div style={{ position:"relative", borderRadius:"12px", overflow:"hidden" }}>
                {mediaType === "image"
                  ? <img src={mediaPreview} alt="Preview" style={{ width:"100%", maxHeight:"180px", objectFit:"cover" }} />
                  : <video src={mediaPreview} controls style={{ width:"100%", maxHeight:"180px" }} />
                }
                <button type="button" onClick={() => { setMediaFile(null); setMediaPreview("") }}
                  style={{ position:"absolute", top:"8px", right:"8px", background:S.bg,
                    border:"none", color:"#ef4444", borderRadius:"50%", width:"26px", height:"26px", cursor:"pointer" }}>×</button>
              </div>
            )}

            <button type="submit" disabled={uploading}
              style={{ padding:"14px", borderRadius:"12px", fontSize:"15px", fontWeight:"700",
                background:S.grad, color:"#fff", border:"none", cursor:"pointer", opacity: uploading ? 0.7 : 1 }}>
              {uploading ? "⏳ Uploading..." : "🍽️ Share Recipe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── AUTH MODAL ─────────────────────────────────────────────────────────────
function AuthModal({ onClose, onLogin, S }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [country, setCountry] = useState("ZA")
  const [isSignUp, setIsSignUp] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [verifyEmailSent, setVerifyEmailSent] = useState(false)

  const iStyle = { width:"100%", background:S.card2, border:`1px solid ${S.border}`,
    borderRadius:"10px", padding:"13px 16px", color:S.text, fontSize:"14px", outline:"none" }

  const handleSubmit = async e => {
    e.preventDefault(); setLoading(true); setError("")
    try {
      if (isSignUp) {
        const sel = countries.find(c => c.code === country)
        const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name||email)}&background=d4a855&color=09060a&bold=true`
        const { data, error: err } = await supabase.auth.signUp({ email, password,
          options: { data: { name: name.trim() || email.split("@")[0], country_flag: sel?.flag || "🌍", avatar } } })
        if (err) throw err
        if (data.user) {
          await supabase.from("profiles").insert({
            id: data.user.id, name: name.trim() || email.split("@")[0],
            email, country_flag: sel?.flag || "🌍", avatar
          })
          setVerifyEmailSent(true)
        }
      } else {
        const { data, error: err } = await supabase.auth.signInWithPassword({ email, password })
        if (err) throw err
        if (data.user) {
          const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()
          onLogin({ id: data.user.id, email: data.user.email,
            name: profile?.name || data.user.email.split("@")[0],
            countryFlag: profile?.country_flag || "🌍",
            avatar: profile?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.user.email)}&background=d4a855&color=09060a&bold=true` })
          onClose()
        }
      }
    } catch (err) { setError(err.message) } finally { setLoading(false) }
  }

  if (verifyEmailSent) {
    return (
      <div style={{ position:"fixed", inset:0, background: S.mode === "dark" ? "rgba(9,6,10,0.97)" : "rgba(60,30,20,0.7)",
        zIndex:2000, display:"flex", alignItems:"center", justifyContent:"center", padding:"20px" }}>
        <div style={{ background:S.card, borderRadius:"28px", maxWidth:"400px", width:"100%",
          border:`1px solid ${S.border}`, padding:"48px 32px", textAlign:"center",
          boxShadow:`0 40px 100px ${S.shadow}` }}>
          <div style={{ fontSize:"64px", marginBottom:"16px" }}>📧</div>
          <h2 style={{ fontFamily:"'Playfair Display',serif", color:S.champ, fontSize:"22px", marginBottom:"12px" }}>
            Check Your Email!
          </h2>
          <div style={{ background:`${S.gold}15`, border:`1px solid ${S.gold}40`, borderRadius:"12px", padding:"16px", marginBottom:"20px" }}>
            <p style={{ color:S.text, fontSize:"14px", lineHeight:"1.7", margin:0 }}>
              We sent a verification link to<br />
              <strong style={{ color:S.gold }}>{email}</strong>
            </p>
          </div>
          <p style={{ coalor:S.muted, fontSize:"13px", lineHeight:"1.6", marginBottom:"24px" }}>
            ⚠️ <strong>You must verify your email before you can post.</strong><br />
            Check your inbox (and spam folder) and click the link to activate.
          </p>
          <button onClick={onClose}
            style={{ padding:"13px", borderRadius:"12px", fontSize:"14px", fontWeight:"700",
              background:S.grad, color:"#fff", border:"none", cursor:"pointer", width:"100%" }}>
            Got it — I'll check my email ✅
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ position:"fixed", inset:0, background: S.mode === "dark" ? "rgba(9,6,10,0.97)" : "rgba(60,30,20,0.7)",
      zIndex:2000, display:"flex", alignItems:"center", justifyContent:"center", padding:"20px" }}>
      <div style={{ background:S.card, borderRadius:"28px", maxWidth:"400px", width:"100%",
        border:`1px solid ${S.border}`, padding:"40px 32px", position:"relative",
        boxShadow:`0 40px 100px ${S.shadow}` }}>
        <button className="bde-icon-btn" onClick={onClose}
          style={{ position:"absolute", top:"16px", right:"16px", color:S.muted, fontSize:"18px" }}><FaTimes /></button>
        <div style={{ textAlign:"center", marginBottom:"24px" }}>
          <div style={{ fontSize:"48px", marginBottom:"10px" }}>👨‍🍳</div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"24px", fontWeight:"900",
            background:S.grad, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", margin:"0 0 6px 0" }}>
            BetterDays Eats
          </h1>
          <p style={{ color:S.muted, fontSize:"12px" }}>
            {isSignUp ? "Join our global food community 🌍" : "Welcome back! 👋"}
          </p>
        </div>
        {error && (
          <div style={{ background:"#ef444420", border:"1px solid #ef4444", borderRadius:"10px",
            padding:"12px", marginBottom:"14px", color:"#ef4444", fontSize:"13px" }}>{error}</div>
        )}
        <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
          {isSignUp && (
            <>
              <input placeholder="Your name *" value={name} onChange={e => setName(e.target.value)} style={iStyle} />
              <select value={country} onChange={e => setCountry(e.target.value)} style={iStyle}>
                {countries.map(c => <option key={c.code} value={c.code}>{c.flag} {c.name}</option>)}
              </select>
            </>
          )}
          <input type="email" placeholder="Email *" value={email} onChange={e => setEmail(e.target.value)} required style={iStyle} />
          <input type="password" placeholder="Password *" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} style={iStyle} />
          <button type="submit" disabled={loading}
            style={{ padding:"14px", borderRadius:"12px", fontSize:"15px", fontWeight:"700",
              background:S.grad, color:"#fff", border:"none", cursor:"pointer", opacity: loading ? 0.7 : 1 }}>
            {loading ? "⏳ Please wait..." : isSignUp ? "Join the Community" : "Sign In"}
          </button>
        </form>
        <button onClick={() => { setIsSignUp(!isSignUp); setError("") }}
          style={{ background:"none", border:"none", color:S.gold, cursor:"pointer",
            fontSize:"13px", width:"100%", textAlign:"center", marginTop:"14px" }}>
          {isSignUp ? "Already a member? Sign in" : "New here? Create account"}
        </button>
        <button onClick={onClose}
          style={{ background:"none", border:"none", color:S.muted, cursor:"pointer",
            fontSize:"12px", width:"100%", textAlign:"center", marginTop:"8px" }}>
          Browse as guest
        </button>
      </div>
    </div>
  )
}

// ─── STUB PAGE ──────────────────────────────────────────────────────────────
function StubPage({ icon, title, body, onBack, S }) {
  return (
    <div style={{ maxWidth:"700px", margin:"0 auto", padding:"40px 24px" }}>
      <div style={{ background:S.card, borderRadius:"24px", padding:"48px 36px",
        border:`1px solid ${S.border}`, textAlign:"center", position:"relative" }}>
        <button onClick={onBack}
          style={{ position:"absolute", top:"16px", left:"16px", background:"none", border:"none",
            color:S.muted, fontSize:"16px", cursor:"pointer", display:"flex", alignItems:"center", gap:"6px" }}
          onMouseEnter={e => e.currentTarget.style.color = S.gold}
          onMouseLeave={e => e.currentTarget.style.color = S.muted}>← Back</button>
        <div style={{ fontSize:"52px", marginBottom:"16px" }}>{icon}</div>
        <h1 style={{ fontFamily:"'Playfair Display',serif", color:S.champ, fontSize:"26px", marginBottom:"12px" }}>{title}</h1>
        <p style={{ color:S.muted }}>{body}</p>
        <div style={{ marginTop:"24px", padding:"12px 20px", background:`${S.gold}12`,
          borderRadius:"40px", display:"inline-block", border:`1px solid ${S.gold}30`, color:S.gold, fontSize:"13px" }}>
          Coming soon ✨
        </div>
      </div>
    </div>
  )
}

// ─── DROP MENU ──────────────────────────────────────────────────────────────
function DropMenu({ currentPage, setCurrentPage, onClose, S }) {
  const groups = [
    { label:"Food Business", items:[
      { id:"restaurants", label:"🏪 Restaurants" }, { id:"jobs", label:"💼 Jobs" },
      { id:"business", label:"💡 Business Ideas" }, { id:"equipment", label:"🛒 Equipment" },
      { id:"schools", label:"🏫 Culinary Schools" },
    ]},
    { label:"Resources", items:[
      { id:"kids", label:"👶 Kids Nutrition" }, { id:"fasting", label:"🕐 Fasting Guide" },
      { id:"disorders", label:"💙 Food Wellness" }, { id:"donations", label:"❤️ Donate" },
      { id:"books", label:"📚 Books" },
    ]},
    { label:"Info", items:[
      { id:"about", label:"📖 About" }, { id:"faq", label:"❓ FAQ" },
      { id:"contact", label:"📧 Contact" }, { id:"privacy", label:"🔒 Privacy" },
      { id:"terms", label:"⚖️ Terms" },
    ]},
  ]
  return (
    <div style={{ position:"absolute", top:"100%", left:0, marginTop:"6px",
      background:S.card, border:`1px solid ${S.border}`, borderRadius:"16px",
      padding:"8px 0", zIndex:99999, minWidth:"220px", boxShadow:`0 16px 48px ${S.shadow}` }}>
      {groups.map((g, gi) => (
        <div key={gi}>
          <p style={{ color:S.muted, fontSize:"10px", textTransform:"uppercase", letterSpacing:"1.5px", padding:"8px 18px 4px", margin:0 }}>{g.label}</p>
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
          {gi < groups.length-1 && <div style={{ height:"1px", background:S.border, margin:"6px 0" }} />}
        </div>
      ))}
    </div>
  )
}

// ─── NOTIFICATION PANEL ─────────────────────────────────────────────────────
function NotifPanel({ items, onRead, onClose, S }) {
  return (
    <div style={{ position:"absolute", top:"48px", right:0, backgroundColor:S.card,
      borderRadius:"16px", border:`1px solid ${S.border}`, width:"300px",
      maxHeight:"360px", overflowY:"auto", zIndex:300, boxShadow:`0 16px 48px ${S.shadow}` }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
        padding:"14px 16px", borderBottom:`1px solid ${S.border}` }}>
        <span style={{ color:S.champ, fontWeight:"600", fontSize:"14px", fontFamily:"'Playfair Display',serif" }}>Notifications</span>
        <button onClick={() => { onRead(); onClose() }}
          style={{ background:"none", border:"none", color:S.muted, cursor:"pointer", fontSize:"11px" }}>Mark all read</button>
      </div>
      {items.length === 0
        ? <div style={{ padding:"32px", textAlign:"center", color:S.muted, fontSize:"13px" }}>All caught up ✨</div>
        : items.map(n => (
          <div key={n.id} style={{ padding:"12px 16px", borderBottom:`1px solid ${S.border}`,
            backgroundColor: n.read ? "transparent" : `${S.rose}15` }}>
            <p style={{ color:S.text, fontSize:"13px", lineHeight:"1.5" }}>{n.msg}</p>
            <span style={{ color:S.muted, fontSize:"10px" }}>{new Date(n.date).toLocaleTimeString()}</span>
          </div>
        ))
      }
    </div>
  )
}

// ─── COOKIE BANNER ──────────────────────────────────────────────────────────
function CookieBanner({ onAccept, S }) {
  return (
    <div style={{ position:"fixed", bottom:"64px", left:0, right:0, zIndex:500,
      background:S.card, borderTop:`1px solid ${S.border}`,
      padding:"14px 20px", display:"flex", justifyContent:"space-between", alignItems:"center", gap:"12px", flexWrap:"wrap" }}>
      <p style={{ color:S.muted, fontSize:"12px", margin:0 }}>🍪 We use cookies to make your experience sweeter.</p>
      <button onClick={onAccept}
        style={{ padding:"7px 20px", borderRadius:"40px", fontSize:"12px", fontWeight:"700",
          background:S.grad, color:"#fff", border:"none", cursor:"pointer" }}>Accept</button>
    </div>
  )
}

// ─── MAIN APP ───────────────────────────────────────────────────────────────
export default function App() {
  useFonts()

  const [isDark, setIsDark] = useState(() => localStorage.getItem("bde_theme") !== "light")
  const S = isDark ? DARK : LIGHT

  const toggleTheme = () => {
    setIsDark(prev => { const next = !prev; localStorage.setItem("bde_theme", next ? "dark" : "light"); return next })
  }

  useEffect(() => { document.body.style.background = S.bg; document.body.style.color = S.text }, [isDark])

  const [currentUser, setCurrentUser] = useState(null)
  const [posts, setPosts] = useState(DEMO)
  const [dbPosts, setDbPosts] = useState([])
  const [showCreate, setShowCreate] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [selectedCat, setSelectedCat] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState("home")
  const [showNotifs, setShowNotifs] = useState(false)
  const [showDrop, setShowDrop] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [unread, setUnread] = useState(0)
  const [toast, setToast] = useState(null)
  const [cookiesOk, setCookiesOk] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [loadingDb, setLoadingDb] = useState(true)
  const dropRef = useRef(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check(); window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  useEffect(() => {
    const h = e => { if (dropRef.current && !dropRef.current.contains(e.target)) setShowDrop(false) }
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h)
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        supabase.from("profiles").select("*").eq("id", session.user.id).single().then(({ data: profile }) => {
          if (profile) setCurrentUser({ id:session.user.id, email:session.user.email,
            name:profile.name, countryFlag:profile.country_flag, avatar:profile.avatar })
        })
      }
    })
  }, [])

  useEffect(() => {
    const load = async () => {
      setLoadingDb(true)
      const { data, error } = await supabase.from("recipes").select("*").order("created_at", { ascending:false })
      if (!error && data) {
        const withComments = await Promise.all(data.map(async r => {
          const { data: comments } = await supabase.from("comments").select("*").eq("recipe_id", r.id).order("created_at", { ascending:true })
          return { ...r, comments: comments || [], liked:false, saved:false, reactions:{} }
        }))
        setDbPosts(withComments)
      }
      setLoadingDb(false)
    }
    load()
  }, [])

  const allPosts = [...dbPosts, ...posts]
  const showToast = msg => setToast(msg)
  const addNotif = msg => { setNotifications(p => [{ id:Date.now(), msg, read:false, date:new Date().toISOString() }, ...p.slice(0,19)]); setUnread(p => p+1) }

  const handleLogin = user => { setCurrentUser(user); showToast(`Welcome, ${user.name}! 🎉`); addNotif(`👋 Welcome to BetterDays Eats, ${user.name}!`) }
  const handleLogout = async () => { await supabase.auth.signOut(); setCurrentUser(null); showToast("See you soon 👋") }
  const handleCreate = r => { setDbPosts(p => [r, ...p]); showToast("Recipe shared! ✨"); addNotif(`✨ "${r.title}" is now live!`) }

  const handleLike = async id => {
    const isDemo = String(id).startsWith("demo-")
    if (isDemo) { setPosts(p => p.map(r => r.id === id ? { ...r, likes: r.liked ? r.likes-1 : r.likes+1, liked:!r.liked } : r)); return }
    const post = dbPosts.find(r => r.id === id); if (!post || !currentUser) return
    if (post.liked) {
      await supabase.from("likes").delete().match({ recipe_id:id, user_id:currentUser.id })
      await supabase.from("recipes").update({ likes: post.likes-1 }).eq("id", id)
      setDbPosts(p => p.map(r => r.id === id ? { ...r, likes:r.likes-1, liked:false } : r))
    } else {
      await supabase.from("likes").insert({ recipe_id:id, user_id:currentUser.id })
      await supabase.from("recipes").update({ likes: post.likes+1 }).eq("id", id)
      setDbPosts(p => p.map(r => r.id === id ? { ...r, likes:r.likes+1, liked:true } : r))
    }
  }

  const handleSave = id => {
    const isDemo = String(id).startsWith("demo-")
    if (isDemo) setPosts(p => p.map(r => r.id === id ? { ...r, saved:!r.saved } : r))
    else setDbPosts(p => p.map(r => r.id === id ? { ...r, saved:!r.saved } : r))
  }

  const filtered = allPosts.filter(r =>
    (selectedCat === "all" || selectedCat === "trending" || r.category === selectedCat) &&
    (!searchTerm || r.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.author_name?.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const featured = dbPosts[0] || posts[0]
  const openPost = () => { if (currentUser) setShowCreate(true); else setShowAuth(true) }

  const pages = {
    restaurants: <StubPage icon="🏪" title="Restaurants" body="Discover restaurants hiring near you." onBack={() => setCurrentPage("home")} S={S} />,
    jobs:        <StubPage icon="💼" title="Food Industry Jobs" body="Find your next role." onBack={() => setCurrentPage("home")} S={S} />,
    equipment:   <StubPage icon="🛒" title="Kitchen Equipment" body="Shop tools used by top chefs." onBack={() => setCurrentPage("home")} S={S} />,
    business:    <StubPage icon="💡" title="Business Ideas" body="Start your food business." onBack={() => setCurrentPage("home")} S={S} />,
    schools:     <StubPage icon="🏫" title="Culinary Schools" body="Find culinary schools near you." onBack={() => setCurrentPage("home")} S={S} />,
    kids:        <StubPage icon="👶" title="Kids Nutrition" body="Healthy meals for growing children." onBack={() => setCurrentPage("home")} S={S} />,
    donations:   <StubPage icon="❤️" title="Donate" body="Support food NGOs fighting hunger." onBack={() => setCurrentPage("home")} S={S} />,
    books:       <StubPage icon="📚" title="Cookbooks" body="Curated cookbooks from chefs." onBack={() => setCurrentPage("home")} S={S} />,
    about:       <StubPage icon="🌍" title="About BetterDays Eats" body="Born in South Africa. Built for the world." onBack={() => setCurrentPage("home")} S={S} />,
    faq:         <StubPage icon="❓" title="FAQ" body="Free platform for food lovers. Post recipes, like, comment, and share!" onBack={() => setCurrentPage("home")} S={S} />,
    contact:     <StubPage icon="📧" title="Contact" body="Email: senzomashaba85@gmail.com · WhatsApp: +27 76 222 6325" onBack={() => setCurrentPage("home")} S={S} />,
    privacy:     <StubPage icon="🔒" title="Privacy" body="We never sell your data. Ever." onBack={() => setCurrentPage("home")} S={S} />,
    terms:       <StubPage icon="⚖️" title="Terms" body="Be respectful. Be generous. Give credit." onBack={() => setCurrentPage("home")} S={S} />,
  }

  return (
    <div style={{ backgroundColor:S.bg, minHeight:"100vh", color:S.text, transition:"background 0.3s, color 0.3s" }}>

      <header style={{ backgroundColor:`${S.bg}f0`, backdropFilter:"blur(20px)",
  borderBottom:`1px solid ${S.border}`, padding:"14px 24px", position:"sticky", top:0, zIndex:200 }}>
  <div style={{ maxWidth:"1200px", margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", gap:"10px" }}>
    
    {/* ⭐ FIXED LOGO - ADDED key prop */}
    <div onClick={() => setCurrentPage("home")} style={{ cursor:"pointer", display:"flex", alignItems:"center", gap:"10px" }}>
      <span style={{ fontSize:"26px" }}>🍽️</span>
      <span 
        key={isDark ? "logo-dark" : "logo-light"} 
        style={{ 
          fontFamily:"'Playfair Display',serif", 
          fontSize:"18px", 
          fontWeight:"900",
          background:S.grad, 
          WebkitBackgroundClip:"text", 
          WebkitTextFillColor:"transparent" 
        }}
      >
        BetterDays Eats
      </span>
    </div>

    <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
      {!isMobile && (
        <div style={{ position:"relative" }}>
          <input placeholder="Search recipes…" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
            style={{ background:S.card2, border:`1px solid ${S.border}`, borderRadius:"40px",
              padding:"9px 16px 9px 36px", color:S.text, width:"180px", fontSize:"13px", outline:"none" }} />
          <FaSearch style={{ position:"absolute", left:"12px", top:"11px", color:S.muted, fontSize:"12px" }} />
        </div>
      )}
      <ThemeToggle S={S} isDark={isDark} onToggle={toggleTheme} />
      <div style={{ position:"relative" }}>
        <button className="bde-icon-btn" onClick={() => setShowNotifs(!showNotifs)}
          style={{ color:S.gold, position:"relative", padding:"4px" }}>
          <FaBell size={18} />
          {unread > 0 && (
            <span style={{ position:"absolute", top:"-4px", right:"-6px", background:"#ef4444", color:"#fff",
              borderRadius:"50%", width:"15px", height:"15px", fontSize:"9px",
              display:"flex", alignItems:"center", justifyContent:"center", fontWeight:"700" }}>{unread}</span>
          )}
        </button>
        {showNotifs && <NotifPanel items={notifications}
          onRead={() => { setNotifications(n => n.map(x => ({ ...x, read:true }))); setUnread(0) }}
          onClose={() => setShowNotifs(false)} S={S} />}
      </div>
      {currentUser ? (
        <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
          <img src={currentUser.avatar} alt={currentUser.name}
            style={{ width:"34px", height:"34px", borderRadius:"50%", border:`2px solid ${S.gold}` }} />
          {!isMobile && <span style={{ color:S.gold, fontSize:"13px", fontWeight:"500" }}>{currentUser.name}</span>}
          <button onClick={handleLogout}
            style={{ background:"none", border:`1px solid ${S.border}`, color:S.muted,
              borderRadius:"8px", padding:"6px 10px", cursor:"pointer", fontSize:"12px" }}>Out</button>
          {!isMobile && (
            <button onClick={() => setShowCreate(true)}
              style={{ padding:"9px 18px", borderRadius:"40px", fontSize:"13px", fontWeight:"700",
                background:S.grad, color:"#fff", border:"none", cursor:"pointer" }}>
              ✨ Post
            </button>
          )}
        </div>
      ) : (
        <button onClick={() => setShowAuth(true)}
          style={{ padding:"9px 20px", borderRadius:"40px", fontSize:"13px", fontWeight:"700",
            background:S.grad, color:"#fff", border:"none", cursor:"pointer" }}>
          Join Free
        </button>
      )}
    </div>
  </div>
</header>

      <nav style={{ background:`${S.card}cc`, backdropFilter:"blur(12px)",
        borderBottom:`1px solid ${S.border}`, padding:"0 24px", position:"relative", zIndex:9998 }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto", display:"flex", alignItems:"center", gap:"4px" }}>
          <button onClick={() => { setCurrentPage("home"); setShowDrop(false) }}
            style={{ background: currentPage === "home" ? `${S.gold}18` : "none",
              color: currentPage === "home" ? S.gold : S.muted, border:"none", borderRadius:"8px",
              padding:"12px 16px", cursor:"pointer", fontSize:"13px",
              fontWeight: currentPage === "home" ? "600" : "400",
              borderBottom: currentPage === "home" ? `2px solid ${S.gold}` : "2px solid transparent" }}>
            🏠 Home
          </button>
          <div ref={dropRef} style={{ position:"relative", display:"inline-block", zIndex:99999 }}>
            <button onClick={() => { setShowDrop(!showDrop); if (showNotifs) setShowNotifs(false) }}
              style={{ background: showDrop ? `${S.rose}18` : "none",
                color: showDrop ? S.rose : S.muted, border:"none", borderRadius:"8px",
                padding:"12px 16px", cursor:"pointer", fontSize:"13px",
                display:"flex", alignItems:"center", gap:"6px",
                borderBottom: showDrop ? `2px solid ${S.rose}` : "2px solid transparent" }}>
              More <FaChevronDown size={9} style={{ transform: showDrop ? "rotate(180deg)" : "rotate(0deg)" }} />
            </button>
            {showDrop && <DropMenu currentPage={currentPage} setCurrentPage={setCurrentPage} onClose={() => setShowDrop(false)} S={S} />}
          </div>
        </div>
      </nav>

      {currentPage === "home" && (
        <>
          <HeroBanner recipe={featured} onSignup={() => setShowAuth(true)} currentUser={currentUser} onPost={() => setShowCreate(true)} S={S} isDark={isDark} />

          {isMobile && (
            <div style={{ padding:"12px 16px", background:S.card, borderBottom:`1px solid ${S.border}` }}>
              <div style={{ position:"relative" }}>
                <input placeholder="Search recipes…" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                  style={{ width:"100%", background:S.card2, border:`1px solid ${S.border}`,
                    borderRadius:"40px", padding:"10px 16px 10px 36px", color:S.text, fontSize:"13px", outline:"none" }} />
                <FaSearch style={{ position:"absolute", left:"12px", top:"12px", color:S.muted, fontSize:"12px" }} />
              </div>
            </div>
          )}

          <div style={{ background:S.card, borderBottom:`1px solid ${S.border}`, overflowX:"auto", padding:"10px 16px" }}>
            <div style={{ display:"flex", gap:"6px", minWidth:"max-content" }}>
              {categories.map(cat => (
                <button key={cat.id} onClick={() => setSelectedCat(cat.id)}
                  style={{ background: selectedCat === cat.id ? S.grad : "none",
                    border: selectedCat === cat.id ? "none" : `1px solid ${S.border}`,
                    borderRadius:"40px", padding:"6px 14px", cursor:"pointer", fontSize:"12px",
                    display:"flex", alignItems:"center", gap:"4px", whiteSpace:"nowrap",
                    fontWeight: selectedCat === cat.id ? "600" : "400",
                    color: selectedCat === cat.id ? "#fff" : S.muted }}>
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </div>

          <main style={{ maxWidth:"1100px", margin:"0 auto", padding:"24px 16px 100px 16px" }}>
            {loadingDb ? (
              <div style={{ textAlign:"center", padding:"60px", color:S.muted }}>
                <div style={{ fontSize:"40px", marginBottom:"16px" }}>🍽️</div>
                <p>Loading delicious recipes...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div style={{ textAlign:"center", padding:"80px 24px", background:S.card,
                borderRadius:"24px", border:`1px solid ${S.border}` }}>
                <div style={{ fontSize:"52px", marginBottom:"16px" }}>🍽️</div>
                <h2 style={{ fontFamily:"'Playfair Display',serif", color:S.champ, marginBottom:"8px" }}>No recipes yet</h2>
                <p style={{ color:S.muted, marginBottom:"24px" }}>Be the first to share something delicious.</p>
                <button onClick={openPost}
                  style={{ padding:"12px 28px", borderRadius:"40px", fontSize:"14px", fontWeight:"700",
                    background:S.grad, color:"#fff", border:"none", cursor:"pointer" }}>
                  Share a Recipe
                </button>
              </div>
            ) : (
              <div style={{ columns: isMobile ? 1 : 2, columnGap:"20px" }}>
                {filtered.map(r => (
                  <div key={r.id} style={{ breakInside:"avoid", marginBottom:"20px" }}>
                    <RecipeCard recipe={r} onLike={handleLike} onSave={handleSave} currentUser={currentUser} S={S} />
                  </div>
                ))}
              </div>
            )}
          </main>
        </>
      )}

      {currentPage !== "home" && (pages[currentPage] ||
        <StubPage icon="🔍" title="Page not found" body="Head back home." onBack={() => setCurrentPage("home")} S={S} />)}

      {currentPage === "home" && (
        <footer style={{ textAlign:"center", padding:"32px 24px 80px", borderTop:`1px solid ${S.border}` }}>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"16px",
            background:S.grad, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            marginBottom:"4px", fontWeight:"700" }}>BetterDays Eats</div>
          <p style={{ color:S.muted, fontSize:"11px", marginBottom:"12px" }}>© 2026 BetterDays Agile Technologies · South Africa 🇿🇦</p>
          <div style={{ display:"flex", justifyContent:"center", gap:"16px", flexWrap:"wrap" }}>
            {["about","faq","contact","privacy","terms"].map(p => (
              <button key={p} onClick={() => setCurrentPage(p)}
                style={{ background:"none", border:"none", color:S.muted, cursor:"pointer", fontSize:"12px" }}>{p}</button>
            ))}
          </div>
        </footer>
      )}

      <div style={{ position:"fixed", bottom:0, left:0, right:0, background:`${S.bg}f5`,
        backdropFilter:"blur(20px)", borderTop:`1px solid ${S.border}`,
        display:"flex", justifyContent:"space-around", padding:"10px 0 14px", zIndex:100 }}>
        <button className="bde-icon-btn" onClick={() => setCurrentPage("home")}
          style={{ color: currentPage === "home" ? S.gold : S.muted, fontSize:"20px", padding:"4px 16px" }}>🏠</button>
        <button className="bde-icon-btn" onClick={() => setSelectedCat("trending")}
          style={{ color: selectedCat === "trending" ? S.rose : S.muted, fontSize:"20px", padding:"4px 16px" }}>🔥</button>
        <button onClick={openPost}
          style={{ borderRadius:"50%", width:"48px", height:"48px", display:"flex", alignItems:"center",
            justifyContent:"center", fontSize:"22px", marginTop:"-10px",
            background:S.grad, color:"#fff", border:"none", cursor:"pointer",
            boxShadow:`0 4px 20px ${S.rose}50` }}>+</button>
        <button className="bde-icon-btn" onClick={() => setShowNotifs(!showNotifs)}
          style={{ color:S.muted, fontSize:"20px", padding:"4px 16px", position:"relative" }}>
          🔔
          {unread > 0 && (
            <span style={{ position:"absolute", top:0, right:"10px", background:"#ef4444", color:"#fff",
              borderRadius:"50%", width:"14px", height:"14px", fontSize:"9px",
              display:"flex", alignItems:"center", justifyContent:"center", fontWeight:"700" }}>{unread}</span>
          )}
        </button>
        <button className="bde-icon-btn" onClick={() => currentUser ? null : setShowAuth(true)}
          style={{ color: currentUser ? S.gold : S.muted, fontSize:"20px", padding:"4px 16px" }}>👤</button>
      </div>

      {showCreate && currentUser && <CreateModal onClose={() => setShowCreate(false)} onCreate={handleCreate} currentUser={currentUser} S={S} />}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onLogin={handleLogin} S={S} />}
      {toast && <Toast message={toast} onClose={() => setToast(null)} S={S} />}
      {!cookiesOk && <CookieBanner onAccept={() => setCookiesOk(true)} S={S} />}
    </div>
  )
}