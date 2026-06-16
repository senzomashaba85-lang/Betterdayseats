import { useState, useEffect, useRef } from "react"
import { 
  FaFacebook, FaTwitter, FaInstagram, FaWhatsapp, FaTiktok,
  FaHeart, FaComment, FaBookmark, FaEllipsisH, FaSearch,
  FaBell, FaSignOutAlt, FaTimes, FaReply, FaTrash,
  FaAmazon, FaEnvelope, FaChevronDown, FaFire, FaClock
} from "react-icons/fa"

// ============================================
// THEME - Warm & Luxurious
// ============================================
const S = {
  // Primary colors
  gold: "#c9a84c", 
  goldDark: "#b8922e", 
  champagne: "#f5e6c8",
  
  // Backgrounds - Warm dark
  bg: "#0a0a0a", 
  card: "#111111", 
  cardHover: "#1a1a1a",
  border: "#1e1e1e",
  
  // Text
  text: "#e5e5e5", 
  muted: "#888888", 
  green: "#4caf50",
  
  // Warm accents
  rose: "#e8a87c",
  blush: "#f5d6c6",
  terracotta: "#c67b5c",
}

// ============================================
// COUNTRIES
// ============================================
const countries = [
  { code: "ZA", name: "South Africa", flag: "🇿🇦" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬" },
  { code: "KE", name: "Kenya", flag: "🇰🇪" },
  { code: "GH", name: "Ghana", flag: "🇬🇭" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "MX", name: "Mexico", flag: "🇲🇽" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "ES", name: "Spain", flag: "🇪🇸" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "CN", name: "China", flag: "🇨🇳" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "KR", name: "South Korea", flag: "🇰🇷" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "AE", name: "UAE", flag: "🇦🇪" },
  { code: "EG", name: "Egypt", flag: "🇪🇬" },
  { code: "ET", name: "Ethiopia", flag: "🇪🇹" },
  { code: "TZ", name: "Tanzania", flag: "🇹🇿" },
  { code: "UG", name: "Uganda", flag: "🇺🇬" },
  { code: "ZW", name: "Zimbabwe", flag: "🇿🇼" },
  { code: "ZM", name: "Zambia", flag: "🇿🇲" },
  { code: "BW", name: "Botswana", flag: "🇧🇼" },
  { code: "NA", name: "Namibia", flag: "🇳🇦" },
  { code: "PT", name: "Portugal", flag: "🇵🇹" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱" },
  { code: "SE", name: "Sweden", flag: "🇸🇪" },
  { code: "SG", name: "Singapore", flag: "🇸🇬" },
  { code: "MY", name: "Malaysia", flag: "🇲🇾" },
  { code: "PH", name: "Philippines", flag: "🇵🇭" },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿" },
  { code: "AR", name: "Argentina", flag: "🇦🇷" },
  { code: "PK", name: "Pakistan", flag: "🇵🇰" },
  { code: "TR", name: "Turkey", flag: "🇹🇷" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "RU", name: "Russia", flag: "🇷🇺" },
  { code: "TH", name: "Thailand", flag: "🇹🇭" },
  { code: "ID", name: "Indonesia", flag: "🇮🇩" },
  { code: "VN", name: "Vietnam", flag: "🇻🇳" },
  { code: "MA", name: "Morocco", flag: "🇲🇦" },
  { code: "CM", name: "Cameroon", flag: "🇨🇲" },
  { code: "SN", name: "Senegal", flag: "🇸🇳" },
  { code: "RW", name: "Rwanda", flag: "🇷🇼" },
  { code: "MW", name: "Malawi", flag: "🇲🇼" },
  { code: "MZ", name: "Mozambique", flag: "🇲🇿" },
]

// ============================================
// CATEGORIES - FOOD CATEGORIES
// ============================================
const categories = [
  { id: "all", name: "All", icon: "🍽️" },
  { id: "breakfast", name: "Breakfast", icon: "🍳" },
  { id: "lunch", name: "Lunch", icon: "🥪" },
  { id: "dinner", name: "Dinner", icon: "🍽️" },
  { id: "desserts", name: "Desserts", icon: "🍰" },
  { id: "soups", name: "Soups", icon: "🥣" },
  { id: "salads", name: "Salads", icon: "🥗" },
  { id: "seafood", name: "Seafood", icon: "🐟" },
  { id: "meat", name: "Meat", icon: "🥩" },
  { id: "chicken", name: "Chicken", icon: "🍗" },
  { id: "pasta", name: "Pasta", icon: "🍝" },
  { id: "rice", name: "Rice", icon: "🍚" },
  { id: "bread", name: "Bread", icon: "🥖" },
  { id: "smoothies", name: "Smoothies", icon: "🥤" },
  { id: "quick", name: "Quick & Easy", icon: "⏱️" },
  { id: "african", name: "African", icon: "🌍" },
  { id: "italian", name: "Italian", icon: "🍕" },
  { id: "mexican", name: "Mexican", icon: "🌮" },
  { id: "bbq", name: "BBQ", icon: "🔥" },
]

// ============================================
// HELPER: Time ago
// ============================================
function timeAgo(date) {
  const diff = Date.now() - new Date(date).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return new Date(date).toLocaleDateString()
}

// ============================================
// TOAST
// ============================================
function Toast({ message, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t) }, [onClose])
  return <div style={{ position: "fixed", bottom: "90px", left: "50%", transform: "translateX(-50%)", backgroundColor: S.gold, color: S.bg, padding: "12px 24px", borderRadius: "40px", fontWeight: "bold", fontSize: "13px", zIndex: 9999, boxShadow: "0 4px 20px rgba(201,168,76,0.3)" }}>{message}</div>
}

// ============================================
// SHARE BUTTONS
// ============================================
function ShareButtons({ recipe }) {
  const shareUrl = encodeURIComponent(window.location.href)
  const shareText = encodeURIComponent(`🍽️ ${recipe.title} on BetterDays Eats!`)
  const shares = [
    { name: "TikTok", icon: FaTiktok, url: `https://www.tiktok.com/share?url=${shareUrl}&text=${shareText}`, color: "#fff" },
    { name: "Facebook", icon: FaFacebook, url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, color: "#1877F2" },
    { name: "Twitter", icon: FaTwitter, url: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`, color: "#1DA1F2" },
    { name: "WhatsApp", icon: FaWhatsapp, url: `https://wa.me/?text=${shareText}%20${shareUrl}`, color: "#25D366" },
  ]
  return (
    <div style={{ display: "flex", gap: "12px" }}>
      {shares.map(s => <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: s.color }}><s.icon size={18} /></a>)}
    </div>
  )
}

// ============================================
// RECIPE CARD - Enhanced
// ============================================
function RecipeCard({ recipe, onLike, currentUser }) {
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState(recipe.comments || [])
  const cat = categories.find(c => c.id === recipe.category)

  const handleAddComment = () => {
    if (!newComment.trim()) return
    setComments([...comments, { id: Date.now(), text: newComment, author: currentUser?.name || "Guest", date: new Date().toISOString() }])
    setNewComment("")
  }

  return (
    <div style={{ 
      backgroundColor: S.card, 
      borderRadius: "20px", 
      marginBottom: "28px", 
      border: `1px solid ${S.border}`,
      overflow: "hidden",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = S.gold
      e.currentTarget.style.boxShadow = "0 8px 40px rgba(201,168,76,0.1)"
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = S.border
      e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)"
    }}>
      <div style={{ padding: "20px 20px 0 20px", position: "relative" }}>
        {/* Time badge */}
        <div style={{ 
          position: "absolute", 
          top: "12px", 
          right: "12px",
          background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(10px)",
          padding: "4px 12px",
          borderRadius: "20px",
          fontSize: "10px",
          color: S.muted,
          display: "flex",
          alignItems: "center",
          gap: "4px"
        }}>
          <FaClock size={10} /> {timeAgo(recipe.date)}
        </div>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <img src={recipe.userAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(recipe.author)}&background=c9a84c&color=000&bold=true`} alt={recipe.author} style={{ width: "48px", height: "48px", borderRadius: "50%", border: `2px solid ${S.gold}` }} />
          <div>
            <strong style={{ color: S.gold }}>{recipe.author}</strong>
            <span style={{ marginLeft: "8px", fontSize: "20px" }}>{recipe.countryFlag}</span>
            <div style={{ display: "flex", gap: "8px", marginTop: "4px", alignItems: "center", flexWrap: "wrap" }}>
              {cat && <span style={{ fontSize: "10px", backgroundColor: `${S.gold}20`, color: S.gold, padding: "2px 10px", borderRadius: "20px" }}>{cat.icon} {cat.name}</span>}
            </div>
          </div>
        </div>
        
        <h3 style={{ color: S.champagne, fontSize: "20px", margin: "0 0 8px 0" }}>{recipe.title}</h3>
        <p style={{ color: "#bbb", lineHeight: "1.6", marginBottom: "12px" }}>{recipe.description}</p>
      </div>
      
      {recipe.image && <img src={recipe.image} alt={recipe.title} style={{ width: "100%", maxHeight: "480px", objectFit: "cover", display: "block" }} />}
      {recipe.video && <video src={recipe.video} controls style={{ width: "100%", maxHeight: "480px", display: "block" }} />}
      
      <div style={{ padding: "16px 20px" }}>
        {recipe.ingredients?.length > 0 && (
          <div style={{ backgroundColor: S.bg, borderRadius: "12px", padding: "16px", marginBottom: "12px", border: `1px solid ${S.border}` }}>
            <strong style={{ color: S.gold, fontSize: "13px" }}>🛒 Ingredients:</strong>
            <ul style={{ color: "#bbb", margin: "8px 0 0 20px", fontSize: "13px", lineHeight: "1.8" }}>
              {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
            </ul>
          </div>
        )}
        
        <div style={{ display: "flex", gap: "20px", paddingTop: "12px", borderTop: `1px solid ${S.border}` }}>
          <button onClick={() => onLike(recipe.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", color: recipe.liked ? "#ff4444" : S.muted, fontSize: "14px" }}>
            <FaHeart size={18} /> {recipe.likes}
          </button>
          <button onClick={() => setShowComments(!showComments)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", color: S.muted, fontSize: "14px" }}>
            <FaComment size={16} /> {comments.length}
          </button>
          <div style={{ marginLeft: "auto" }}>
            <ShareButtons recipe={recipe} />
          </div>
        </div>
        
        {showComments && (
          <div style={{ marginTop: "16px" }}>
            {comments.map(c => <div key={c.id} style={{ backgroundColor: S.bg, padding: "10px", borderRadius: "10px", marginBottom: "8px" }}><strong style={{ color: S.gold }}>{c.author}</strong><p style={{ margin: "4px 0 0 0", fontSize: "13px" }}>{c.text}</p></div>)}
            {currentUser && (
              <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                <input value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Write a comment..." onKeyDown={e => e.key === "Enter" && handleAddComment()} style={{ flex: 1, backgroundColor: S.bg, border: `1px solid ${S.gold}`, borderRadius: "40px", padding: "10px 16px", color: "white", fontSize: "13px" }} />
                <button onClick={handleAddComment} style={{ backgroundColor: S.gold, color: S.bg, border: "none", borderRadius: "40px", padding: "10px 18px", fontWeight: "bold", cursor: "pointer", fontSize: "13px" }}>Post</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================
// CREATE POST MODAL
// ============================================
function CreatePostModal({ onClose, onCreate, currentUser }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("breakfast")
  const [ingredients, setIngredients] = useState("")
  const [instructions, setInstructions] = useState("")
  const [mediaFile, setMediaFile] = useState(null)
  const [mediaPreview, setMediaPreview] = useState("")
  const [mediaType, setMediaType] = useState("image")

  const handleMediaChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const fileType = file.type.split('/')[0]
    setMediaType(fileType === 'video' ? 'video' : 'image')
    setMediaFile(file)
    const reader = new FileReader()
    reader.onloadend = () => setMediaPreview(reader.result)
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !description.trim()) return
    
    let mediaUrl = null
    if (mediaFile) mediaUrl = mediaPreview
    
    onCreate({ 
      id: Date.now(), 
      title: title.trim(), 
      description: description.trim(), 
      category, 
      ingredients: ingredients.split("\n").filter(i => i.trim()), 
      instructions: instructions.trim(), 
      image: mediaType === 'image' ? mediaUrl : null,
      video: mediaType === 'video' ? mediaUrl : null,
      author: currentUser.name, 
      userAvatar: currentUser.avatar,
      countryFlag: currentUser.countryFlag, 
      date: new Date().toISOString(), 
      likes: 0, 
      liked: false, 
      comments: [] 
    })
    onClose()
  }

  const iStyle = { width: "100%", backgroundColor: "#1a1a1a", border: `1px solid ${S.border}`, borderRadius: "12px", padding: "14px", color: "white", marginBottom: "12px", fontSize: "14px", fontFamily: "inherit", boxSizing: "border-box" }

  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.95)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", overflowY: "auto" }}>
      <div style={{ backgroundColor: S.card, borderRadius: "24px", maxWidth: "600px", width: "100%", maxHeight: "90vh", overflowY: "auto", border: `1px solid ${S.gold}`, padding: "28px", position: "relative" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ color: S.gold, margin: 0, fontSize: "22px" }}>✨ Share Your Story</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: S.gold, fontSize: "24px", cursor: "pointer" }}><FaTimes /></button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Dish Title *" value={title} onChange={e => setTitle(e.target.value)} required style={iStyle} />
          <textarea placeholder="Tell us about your dish *" value={description} onChange={e => setDescription(e.target.value)} required rows="2" style={iStyle} />
          
          <select value={category} onChange={e => setCategory(e.target.value)} style={iStyle}>
            {categories.filter(c => c.id !== "all").map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
          </select>
          
          <textarea placeholder="Ingredients (one per line)" value={ingredients} onChange={e => setIngredients(e.target.value)} rows="3" style={{ ...iStyle, fontFamily: "monospace" }} />
          <textarea placeholder="Instructions" value={instructions} onChange={e => setInstructions(e.target.value)} rows="3" style={iStyle} />
          
          <div style={{ border: `2px dashed ${S.gold}`, borderRadius: "12px", padding: "20px", marginBottom: "12px", textAlign: "center", cursor: "pointer" }}>
            <label style={{ cursor: "pointer", display: "block" }}>
              <input type="file" accept="image/*,video/*" onChange={handleMediaChange} style={{ display: "none" }} />
              <div style={{ fontSize: "48px", marginBottom: "8px" }}>📸🎥</div>
              <p style={{ color: S.gold, margin: 0, fontWeight: "bold" }}>Add a photo or video</p>
              <p style={{ color: S.muted, fontSize: "11px", marginTop: "4px" }}>Show off your cooking!</p>
            </label>
          </div>
          
          {mediaPreview && (
            <div style={{ marginBottom: "16px", textAlign: "center" }}>
              {mediaType === 'image' ? (
                <img src={mediaPreview} alt="Preview" style={{ maxWidth: "100%", maxHeight: "200px", borderRadius: "8px" }} />
              ) : (
                <video src={mediaPreview} controls style={{ maxWidth: "100%", maxHeight: "200px", borderRadius: "8px" }} />
              )}
              <button type="button" onClick={() => { setMediaFile(null); setMediaPreview("") }} style={{ marginTop: "8px", background: "none", border: "none", color: "#ef4444", cursor: "pointer" }}>Remove</button>
            </div>
          )}
          
          <button type="submit" style={{ width: "100%", background: `linear-gradient(135deg, ${S.gold}, ${S.goldDark})`, color: S.bg, border: "none", borderRadius: "12px", padding: "14px", fontWeight: "bold", cursor: "pointer", fontSize: "16px" }}>
            🍽️ Share Your Story
          </button>
        </form>
      </div>
    </div>
  )
}

// ============================================
// AUTH MODAL
// ============================================
function AuthModal({ onClose, onLogin }) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [country, setCountry] = useState("ZA")

  const handleSubmit = (e) => {
    e.preventDefault()
    const sel = countries.find(c => c.code === country)
    onLogin({ id: Date.now(), email, name: name.trim() || email.split("@")[0], countryFlag: sel.flag, avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name || email)}&background=c9a84c&color=000`, joinDate: new Date().toISOString() })
    onClose()
  }

  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.97)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div style={{ backgroundColor: S.card, borderRadius: "24px", maxWidth: "400px", width: "100%", border: `2px solid ${S.gold}`, padding: "40px", position: "relative" }}>
        
        <button onClick={onClose} style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", color: S.muted, fontSize: "20px", cursor: "pointer", width: "36px", height: "36px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#1a1a1a"; e.currentTarget.style.color = S.gold }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = S.muted }}>
          ✕
        </button>
        
        <div style={{ fontSize: "52px", marginBottom: "12px", textAlign: "center" }}>🍽️</div>
        <h1 style={{ color: S.gold, margin: "0 0 4px 0", fontSize: "26px", fontWeight: "700", textAlign: "center" }}>BetterDays Eats</h1>
        <p style={{ color: S.champagne, fontSize: "12px", marginBottom: "28px", textAlign: "center" }}>Share your recipes with the world 🌍</p>
        
        <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
          <input type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} style={{ width: "100%", backgroundColor: "#1a1a1a", border: `1px solid ${S.gold}`, borderRadius: "12px", padding: "12px", color: "white", marginBottom: "12px" }} />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: "100%", backgroundColor: "#1a1a1a", border: `1px solid ${S.gold}`, borderRadius: "12px", padding: "12px", color: "white", marginBottom: "12px" }} />
          <select value={country} onChange={e => setCountry(e.target.value)} style={{ width: "100%", backgroundColor: "#1a1a1a", border: `1px solid ${S.gold}`, borderRadius: "12px", padding: "12px", color: "white", marginBottom: "20px" }}>
            {countries.map(c => <option key={c.code} value={c.code}>{c.flag} {c.name}</option>)}
          </select>
          <button type="submit" style={{ width: "100%", background: `linear-gradient(135deg, ${S.gold}, ${S.goldDark})`, color: S.bg, border: "none", borderRadius: "12px", padding: "12px", fontWeight: "bold", cursor: "pointer" }}>Join Now</button>
        </form>
        
        <button onClick={onClose} style={{ marginTop: "16px", background: "none", border: "none", color: S.muted, cursor: "pointer", fontSize: "13px", width: "100%", textAlign: "center" }}>Browse as Guest</button>
      </div>
    </div>
  )
}

// ============================================
// ADDITIONAL PAGES
// ============================================
function RestaurantsPage() { return <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px" }}><div style={{ backgroundColor: S.card, borderRadius: "24px", padding: "40px", border: `1px solid ${S.gold}` }}><h1 style={{ color: S.gold }}>🏪 Restaurants</h1><p style={{ color: S.text }}>Restaurant directory coming soon!</p></div></div> }
function JobsPage() { return <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px" }}><div style={{ backgroundColor: S.card, borderRadius: "24px", padding: "40px", border: `1px solid ${S.gold}` }}><h1 style={{ color: S.gold }}>💼 Jobs</h1><p style={{ color: S.text }}>Food industry jobs coming soon!</p></div></div> }
function EquipmentPage() { return <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px" }}><div style={{ backgroundColor: S.card, borderRadius: "24px", padding: "40px", border: `1px solid ${S.gold}` }}><h1 style={{ color: S.gold }}>🛒 Equipment</h1><p style={{ color: S.text }}>Kitchen equipment store coming soon!</p></div></div> }
function BusinessIdeasPage() { return <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px" }}><div style={{ backgroundColor: S.card, borderRadius: "24px", padding: "40px", border: `1px solid ${S.gold}` }}><h1 style={{ color: S.gold }}>💡 Business Ideas</h1><p style={{ color: S.text }}>Start your food business with our guides!</p></div></div> }
function CulinarySchoolsPage() { return <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px" }}><div style={{ backgroundColor: S.card, borderRadius: "24px", padding: "40px", border: `1px solid ${S.gold}` }}><h1 style={{ color: S.gold }}>🏫 Culinary Schools</h1><p style={{ color: S.text }}>Find culinary schools near you!</p></div></div> }
function KidsNutritionPage() { return <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px" }}><div style={{ backgroundColor: S.card, borderRadius: "24px", padding: "40px", border: `1px solid ${S.gold}` }}><h1 style={{ color: S.gold }}>👶 Kids Nutrition</h1><p style={{ color: S.text }}>Healthy meals for growing children!</p></div></div> }
function FastingPage() { return <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px" }}><div style={{ backgroundColor: S.card, borderRadius: "24px", padding: "40px", border: `1px solid ${S.gold}` }}><h1 style={{ color: S.gold }}>🕐 Fasting Guide</h1><p style={{ color: S.text }}>Science of fasting - coming soon!</p></div></div> }
function FoodDisordersPage() { return <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px" }}><div style={{ backgroundColor: S.card, borderRadius: "24px", padding: "40px", border: `1px solid ${S.gold}` }}><h1 style={{ color: S.gold }}>💙 Food Disorders</h1><p style={{ color: S.text }}>Support and resources coming soon!</p></div></div> }
function DonationsPage() { return <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px" }}><div style={{ backgroundColor: S.card, borderRadius: "24px", padding: "40px", border: `1px solid ${S.gold}` }}><h1 style={{ color: S.gold }}>❤️ Donate</h1><p style={{ color: S.text }}>Support food NGOs fighting hunger!</p></div></div> }
function BooksPage() { return <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px" }}><div style={{ backgroundColor: S.card, borderRadius: "24px", padding: "40px", border: `1px solid ${S.gold}` }}><h1 style={{ color: S.gold }}>📚 Books</h1><p style={{ color: S.text }}>Amazon affiliate books coming soon!</p></div></div> }
function AboutPage() { return <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px" }}><div style={{ backgroundColor: S.card, borderRadius: "24px", padding: "40px", border: `1px solid ${S.gold}` }}><h1 style={{ color: S.gold }}>About</h1><p style={{ color: S.text }}>BetterDays Eats - Share your recipes with the world. Born in South Africa. 🌍</p></div></div> }
function FAQPage() { return <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px" }}><div style={{ backgroundColor: S.card, borderRadius: "24px", padding: "40px", border: `1px solid ${S.gold}` }}><h1 style={{ color: S.gold }}>FAQ</h1><p style={{ color: S.text }}>Free platform for food lovers. Post recipes, like, comment, and share!</p></div></div> }
function ContactPage() { return <div style={{ maxWidth: "600px", margin: "0 auto", padding: "40px" }}><div style={{ backgroundColor: S.card, borderRadius: "24px", padding: "40px", border: `1px solid ${S.gold}` }}><h1 style={{ color: S.gold }}>Contact</h1><p style={{ color: S.text }}>Email: senzomashaba85@gmail.com</p><button onClick={() => window.open("https://wa.me/27762226325")} style={{ backgroundColor: S.gold, color: S.bg, border: "none", borderRadius: "8px", padding: "10px 20px", cursor: "pointer" }}>WhatsApp</button></div></div> }
function PrivacyPage() { return <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px" }}><div style={{ backgroundColor: S.card, borderRadius: "24px", padding: "40px", border: `1px solid ${S.gold}` }}><h1 style={{ color: S.gold }}>Privacy</h1><p style={{ color: S.text }}>We never sell your data.</p></div></div> }
function CookiesPage() { return <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px" }}><div style={{ backgroundColor: S.card, borderRadius: "24px", padding: "40px", border: `1px solid ${S.gold}` }}><h1 style={{ color: S.gold }}>Cookies</h1><p style={{ color: S.text }}>We use cookies for better experience.</p></div></div> }
function TermsPage() { return <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px" }}><div style={{ backgroundColor: S.card, borderRadius: "24px", padding: "40px", border: `1px solid ${S.gold}` }}><h1 style={{ color: S.gold }}>Terms</h1><p style={{ color: S.text }}>Be respectful to other users.</p></div></div> }

// ============================================
// COOKIE BANNER
// ============================================
function CookieBanner({ onAccept }) {
  return (
    <div style={{ position: "fixed", bottom: "70px", left: 0, right: 0, backgroundColor: "#111", borderTop: `1px solid ${S.gold}`, padding: "12px 20px", zIndex: 500, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
      <p style={{ color: S.text, margin: 0, fontSize: "12px" }}>🍪 We use cookies to improve your experience.</p>
      <button onClick={onAccept} style={{ backgroundColor: S.gold, color: S.bg, border: "none", borderRadius: "40px", padding: "6px 16px", cursor: "pointer", fontSize: "12px" }}>Accept</button>
    </div>
  )
}

// ============================================
// DROPDOWN MENU
// ============================================
function DropdownMenu({ currentPage, setCurrentPage, onClose }) {
  const groups = [
    { label: "Food Business", items: [
      { id: "restaurants", label: "🏪 Restaurants" },
      { id: "jobs", label: "💼 Jobs" },
      { id: "business", label: "💡 Business Ideas" },
      { id: "equipment", label: "🛒 Equipment" },
      { id: "schools", label: "🏫 Culinary Schools" },
    ]},
    { label: "Resources", items: [
      { id: "kids", label: "👶 Kids Nutrition" },
      { id: "fasting", label: "🕐 Fasting Guide" },
      { id: "disorders", label: "💙 Food Disorders" },
      { id: "donations", label: "❤️ Donate" },
      { id: "books", label: "📚 Books" },
    ]},
    { label: "Info", items: [
      { id: "about", label: "📖 About" },
      { id: "faq", label: "❓ FAQ" },
      { id: "contact", label: "📧 Contact" },
      { id: "privacy", label: "🔒 Privacy" },
      { id: "cookies", label: "🍪 Cookies" },
      { id: "terms", label: "⚖️ Terms" },
    ]},
  ]
  return (
    <div style={{ position: "absolute", top: "100%", left: 0, marginTop: "4px", backgroundColor: S.card, border: `1px solid ${S.gold}`, borderRadius: "12px", padding: "8px 0", zIndex: 9999, minWidth: "200px", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
      {groups.map((group, gi) => (
        <div key={gi}>
          <p style={{ color: S.muted, fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px", padding: "6px 16px 2px 16px", margin: 0 }}>{group.label}</p>
          {group.items.map(item => (
            <button key={item.id} onClick={() => { setCurrentPage(item.id); onClose() }}
              style={{ display: "block", width: "100%", textAlign: "left", padding: "9px 16px", background: "none", border: "none", color: currentPage === item.id ? S.gold : S.text, cursor: "pointer", fontSize: "13px", fontWeight: currentPage === item.id ? "bold" : "normal" }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#1a1a1a"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}>
              {item.label}
            </button>
          ))}
          {gi < groups.length - 1 && <div style={{ height: "1px", backgroundColor: S.border, margin: "6px 0" }} />}
        </div>
      ))}
    </div>
  )
}

// ============================================
// NOTIFICATION PANEL
// ============================================
function NotificationPanel({ notifications, onMarkRead, onClose }) {
  return (
    <div style={{ position: "absolute", top: "45px", right: 0, backgroundColor: S.card, borderRadius: "12px", border: `1px solid ${S.gold}`, width: "280px", maxHeight: "360px", overflowY: "auto", zIndex: 200, boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderBottom: `1px solid ${S.border}` }}>
        <h4 style={{ color: S.gold, margin: 0, fontSize: "14px" }}>🔔 Notifications</h4>
        <button onClick={() => { onMarkRead(); onClose() }} style={{ background: "none", border: "none", color: S.muted, cursor: "pointer", fontSize: "11px" }}>Mark all read</button>
      </div>
      {notifications.length === 0
        ? <div style={{ padding: "28px", textAlign: "center", color: S.muted, fontSize: "13px" }}>No notifications yet</div>
        : notifications.map(n => (
          <div key={n.id} style={{ padding: "12px 16px", borderBottom: `1px solid ${S.border}`, backgroundColor: n.read ? "transparent" : `${S.gold}08` }}>
            <p style={{ color: S.text, margin: 0, fontSize: "13px" }}>{n.msg}</p>
            <span style={{ color: S.muted, fontSize: "10px" }}>{new Date(n.date).toLocaleTimeString()}</span>
          </div>
        ))
      }
    </div>
  )
}

// ============================================
// MAIN APP
// ============================================
export default function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [recipes, setRecipes] = useState([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState("home")
  const [showNotifications, setShowNotifications] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [toast, setToast] = useState(null)
  const [cookiesAccepted, setCookiesAccepted] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("bde_currentUser")
    const storedRecipes = localStorage.getItem("bde_recipes")
    const cookieOk = localStorage.getItem("bde_cookies")
    if (storedUser) setCurrentUser(JSON.parse(storedUser))
    if (cookieOk) setCookiesAccepted(true)
    if (storedRecipes) {
      setRecipes(JSON.parse(storedRecipes))
    } else {
      // ============================================
      // DEMO RECIPES WITH REAL FOOD PHOTOS & COMMENTS
      // ============================================
      const demo = [
        { 
          id: 1, 
          title: "Creamy Jollof Rice with Chicken", 
          description: "A classic West African rice dish cooked in a rich tomato and pepper sauce, served with perfectly spiced grilled chicken. This is the ultimate comfort food that brings people together.",
          category: "african", 
          ingredients: ["2 cups long-grain rice", "1 can tomato puree", "1 onion, diced", "2 bell peppers, blended", "4 chicken thighs", "2 tbsp curry powder", "Thyme, bay leaves, salt", "2 cups chicken stock"], 
          instructions: "Blend tomatoes and peppers. Sauté onions until soft. Add tomato puree and spices. Cook for 10 minutes. Add rice and stock, cover and simmer 20 minutes. Grill chicken with salt, pepper, and lemon juice.",
          image: "https://images.unsplash.com/photo-1599045118108-bf996e3c5b0a?w=600", 
          author: "Chef Amara", 
          countryFlag: "🇳🇬",
          userAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100",
          date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
          likes: 142, 
          liked: false, 
          comments: [
            { id: 1, author: "TasteOfAfrica", text: "This is the real deal! My family loved it ❤️", date: new Date().toISOString() },
            { id: 2, author: "FoodieJourney", text: "The chicken looks incredible, will try this weekend!", date: new Date().toISOString() }
          ] 
        },
        { 
          id: 2, 
          title: "Full English Breakfast Feast", 
          description: "The ultimate weekend breakfast - crispy bacon, perfectly fried eggs, golden sausages, baked beans, grilled tomatoes, and mushrooms. Served with thick toast and butter.",
          category: "breakfast", 
          image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600", 
          author: "Breakfast Chef", 
          countryFlag: "🇬🇧",
          userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
          date: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
          likes: 89, 
          liked: false, 
          comments: [
            { id: 1, author: "MorningPerson", text: "This is what weekends are made for! 😍", date: new Date().toISOString() },
            { id: 2, author: "BrunchQueen", text: "I need this right now", date: new Date().toISOString() }
          ] 
        },
        { 
          id: 3, 
          title: "Authentic Spaghetti Carbonara", 
          description: "Roman pasta perfection - al dente spaghetti with crispy pancetta, creamy egg and pecorino cheese sauce, finished with freshly cracked black pepper. Simple ingredients, extraordinary taste.",
          category: "italian", 
          ingredients: ["400g spaghetti", "150g pancetta", "4 egg yolks", "100g pecorino cheese", "Black pepper", "Salt"], 
          instructions: "Cook spaghetti in salted water. Fry pancetta until crispy. Mix egg yolks with grated cheese. Combine everything with pasta water for creamy sauce.",
          image: "https://images.unsplash.com/photo-1551892379-6e9f7e3ae5e4?w=600", 
          author: "Chef Maria", 
          countryFlag: "🇮🇹",
          userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
          date: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
          likes: 203, 
          liked: false, 
          comments: [
            { id: 1, author: "PastaLover", text: "This is THE ONLY carbonara recipe you need! ⭐⭐⭐⭐⭐", date: new Date().toISOString() },
            { id: 2, author: "ItalianNonna", text: "This is how it's done! This recipe is authentic and delicious.", date: new Date().toISOString() },
            { id: 3, author: "FoodieTraveler", text: "Tried this yesterday and it was amazing!", date: new Date().toISOString() }
          ] 
        },
        { 
          id: 4, 
          title: "Honey Garlic Chicken Stir Fry", 
          description: "Quick and easy 20-minute dinner - tender chicken pieces with crisp vegetables in a sticky sweet and savory honey garlic sauce. Perfect for busy weeknights when you want something delicious fast.",
          category: "quick", 
          ingredients: ["2 chicken breasts, sliced", "1 bell pepper", "1 onion", "4 garlic cloves", "3 tbsp honey", "2 tbsp soy sauce", "1 tbsp oil", "Sesame seeds for garnish"], 
          instructions: "Stir fry chicken until golden. Add vegetables and cook 3-4 minutes. Add garlic, honey, and soy sauce. Cook until sauce thickens. Serve with rice or noodles.",
          image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600", 
          author: "Quick Cook", 
          countryFlag: "🇨🇳",
          userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
          date: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
          likes: 67, 
          liked: false, 
          comments: [
            { id: 1, author: "BusyMom", text: "Made this tonight, family loved it! Will definitely make again.", date: new Date().toISOString() }
          ] 
        },
        { 
          id: 5, 
          title: "Traditional South African Bunny Chow", 
          description: "A Durban classic - hollowed out quarter loaf of bread filled with fragrant, spicy curry. This is hands-down one of the most satisfying street foods in the world. Don't be afraid to eat with your hands!",
          category: "african", 
          ingredients: ["1 quarter loaf white bread", "500g beef or chicken", "2 onions, diced", "1 can tomatoes", "3 tbsp curry powder", "Garlic and ginger", "Fresh coriander"], 
          instructions: "Brown meat and set aside. Sauté onions, garlic, and ginger. Add curry powder and tomatoes. Return meat, add water, and simmer 45 minutes. Hollow out bread and fill with curry. Garnish with coriander.",
          image: "https://images.unsplash.com/photo-1545247181-516773cae754?w=600", 
          author: "Durban Chef", 
          countryFlag: "🇿🇦",
          userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
          date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          likes: 178, 
          liked: false, 
          comments: [
            { id: 1, author: "DurbanBorn", text: "This is the real deal! 🇿🇦", date: new Date().toISOString() },
            { id: 2, author: "StreetFoodFan", text: "Best bunny in SA, no argument!", date: new Date().toISOString() },
            { id: 3, author: "TravelEatRepeat", text: "I dream about this!", date: new Date().toISOString() }
          ] 
        },
        { 
          id: 6, 
          title: "Rich Dark Chocolate Lava Cake", 
          description: "A decadent dessert with a melting chocolate center. Served warm with a scoop of vanilla ice cream, this is pure indulgence. It's surprisingly easy to make - the perfect date night dessert.",
          category: "desserts", 
          ingredients: ["200g dark chocolate", "100g butter", "3 eggs", "80g sugar", "50g flour", "Vanilla extract", "Pinch of salt"], 
          instructions: "Melt chocolate and butter. Whisk eggs and sugar until fluffy. Fold in chocolate mixture. Add flour and salt. Bake at 200°C for 8-10 minutes. Serve immediately with ice cream.",
          image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600", 
          author: "Pastry Chef", 
          countryFlag: "🇫🇷",
          userAvatar: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=100",
          date: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
          likes: 256, 
          liked: false, 
          comments: [
            { id: 1, author: "Chocoholic", text: "Made this for my wife - she said YES! 💍😂", date: new Date().toISOString() },
            { id: 2, author: "FoodieDessert", text: "THE BEST LAVA CAKE EVER. Period.", date: new Date().toISOString() },
            { id: 3, author: "HomeBaker", text: "This was so easy and everyone was impressed!", date: new Date().toISOString() }
          ] 
        },
        { 
          id: 7, 
          title: "Fresh Grilled Salmon with Lemon Dill Sauce", 
          description: "Perfectly grilled salmon fillets with a creamy, tangy lemon dill sauce. This restaurant-quality dish is surprisingly simple to make at home and looks stunning on the plate.",
          category: "seafood", 
          ingredients: ["4 salmon fillets", "Olive oil", "Salt & pepper", "1 lemon", "Fresh dill", "1 cup sour cream", "Garlic powder"], 
          instructions: "Season salmon with salt, pepper, and olive oil. Grill 4-5 minutes per side. Mix sour cream with lemon juice, dill, and garlic powder. Serve with roasted vegetables.",
          image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600", 
          author: "Seafood Chef", 
          countryFlag: "🇳🇴",
          userAvatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100",
          date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
          likes: 145, 
          liked: false, 
          comments: [
            { id: 1, author: "SalmonLover", text: "This is restaurant quality!", date: new Date().toISOString() }
          ] 
        },
        { 
          id: 8, 
          title: "Fresh Berry and Granola Smoothie Bowl", 
          description: "A vibrant, nutrient-packed breakfast bowl - blended acai or mixed berries topped with crunchy granola, fresh banana slices, and a drizzle of honey. Instagram-worthy and delicious.",
          category: "smoothies", 
          ingredients: ["1 cup frozen berries", "1 banana", "1/2 cup yogurt", "1/4 cup milk", "Granola", "Fresh fruit toppings"], 
          instructions: "Blend berries, banana, yogurt, and milk until smooth. Pour into bowl. Top with granola, fresh fruit, and a drizzle of honey. Eat immediately with a spoon.",
          image: "https://images.unsplash.com/photo-1517673136490-25c0ed55c9b8?w=600", 
          author: "Health Guru", 
          countryFlag: "🇦🇺",
          userAvatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100",
          date: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
          likes: 97, 
          liked: false, 
          comments: [] 
        },
      ]
      setRecipes(demo)
      localStorage.setItem("bde_recipes", JSON.stringify(demo))
    }
  }, [])

  useEffect(() => { if (recipes.length) localStorage.setItem("bde_recipes", JSON.stringify(recipes)) }, [recipes])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const addNotification = (msg) => {
    const n = { id: Date.now(), msg, read: false, date: new Date().toISOString() }
    setNotifications(prev => [n, ...prev.slice(0, 19)])
    setUnreadCount(prev => prev + 1)
  }

  const showToast = (msg) => setToast(msg)

  const handleLogin = (user) => {
    setCurrentUser(user)
    localStorage.setItem("bde_currentUser", JSON.stringify(user))
    showToast(`Welcome ${user.name}!`)
    addNotification(`👋 Welcome to BetterDays Eats, ${user.name}!`)
  }

  const handleLogout = () => {
    localStorage.removeItem("bde_currentUser")
    setCurrentUser(null)
    showToast("Logged out")
  }

  const handleCreateRecipe = (newRecipe) => {
    setRecipes([newRecipe, ...recipes])
    showToast("Recipe shared!")
    addNotification(`✨ "${newRecipe.title}" is now live!`)
  }

  const handleLike = (id) => setRecipes(recipes.map(r => r.id === id ? { ...r, likes: r.liked ? r.likes - 1 : r.likes + 1, liked: !r.liked } : r))

  const filteredRecipes = recipes.filter(r => (selectedCategory === "all" || r.category === selectedCategory) && (!searchTerm || r.title.toLowerCase().includes(searchTerm.toLowerCase()) || r.author.toLowerCase().includes(searchTerm.toLowerCase())))

  return (
    <div style={{ backgroundColor: S.bg, minHeight: "100vh" }}>
      {/* HEADER */}
      <header style={{ backgroundColor: S.bg, borderBottom: `1px solid ${S.gold}`, padding: "12px 24px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div onClick={() => setCurrentPage("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "28px" }}>🍽️</span>
            <h1 style={{ color: S.gold, margin: 0, fontSize: "20px" }}>BetterDays Eats</h1>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <div style={{ position: "relative" }}>
              <input type="text" placeholder="Search recipes..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ backgroundColor: "#1a1a1a", border: `1px solid ${S.border}`, borderRadius: "40px", padding: "8px 16px 8px 36px", color: "white", width: "160px", fontSize: "12px" }} />
              <FaSearch style={{ position: "absolute", left: "12px", top: "10px", color: S.muted, fontSize: "12px" }} />
            </div>
            
            <div style={{ position: "relative" }}>
              <button onClick={() => setShowNotifications(!showNotifications)} style={{ background: "none", border: "none", color: S.gold, cursor: "pointer", position: "relative", padding: "4px" }}>
                <FaBell size={18} />
                {unreadCount > 0 && <span style={{ position: "absolute", top: "-4px", right: "-6px", backgroundColor: "#ef4444", color: "white", borderRadius: "50%", width: "14px", height: "14px", fontSize: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>{unreadCount}</span>}
              </button>
              {showNotifications && <NotificationPanel notifications={notifications} onMarkRead={() => { setNotifications(n => n.map(x => ({ ...x, read: true }))); setUnreadCount(0) }} onClose={() => setShowNotifications(false)} />}
            </div>
            
            {currentUser ? (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <img src={currentUser.avatar} alt={currentUser.name} style={{ width: "32px", height: "32px", borderRadius: "50%", border: `2px solid ${S.gold}` }} />
                <span style={{ color: S.gold, fontSize: "12px" }}>{currentUser.name}</span>
                <button onClick={handleLogout} style={{ background: "none", border: `1px solid ${S.border}`, color: S.muted, borderRadius: "6px", padding: "5px 10px", cursor: "pointer", fontSize: "11px" }}>Logout</button>
                <button onClick={() => setShowCreateModal(true)} style={{ background: `linear-gradient(135deg, ${S.gold}, ${S.goldDark})`, color: S.bg, border: "none", borderRadius: "40px", padding: "8px 16px", fontSize: "12px", cursor: "pointer", fontWeight: "bold" }}>✨ Post</button>
              </div>
            ) : (
              <button onClick={() => setShowAuthModal(true)} style={{ background: `linear-gradient(135deg, ${S.gold}, ${S.goldDark})`, color: S.bg, border: "none", borderRadius: "40px", padding: "8px 16px", fontSize: "12px", cursor: "pointer", fontWeight: "bold" }}>Join</button>
            )}
          </div>
        </div>
      </header>

      {/* NAVIGATION WITH DROPDOWN */}
      <nav style={{ backgroundColor: "#0d0d0d", borderBottom: `1px solid ${S.border}`, padding: "8px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", flexWrap: "wrap", position: "relative" }}>
          
          <button onClick={() => { setCurrentPage("home"); setShowDropdown(false); }} style={{ backgroundColor: currentPage === "home" ? S.gold : "transparent", color: currentPage === "home" ? S.bg : S.muted, border: "none", borderRadius: "8px", padding: "8px 18px", cursor: "pointer", fontSize: "13px", fontWeight: currentPage === "home" ? "bold" : "normal" }}>🏠 Home</button>
          
          {/* DROPDOWN BUTTON */}
          <div ref={dropdownRef} style={{ position: "relative" }}>
            <button onClick={() => setShowDropdown(!showDropdown)} style={{ backgroundColor: showDropdown ? S.gold : "transparent", color: showDropdown ? S.bg : S.muted, border: "none", borderRadius: "8px", padding: "8px 18px", cursor: "pointer", fontSize: "13px", display: "flex", alignItems: "center", gap: "6px" }}>
              More <FaChevronDown size={10} style={{ transition: "transform 0.2s", transform: showDropdown ? "rotate(180deg)" : "rotate(0deg)" }} />
            </button>
            {showDropdown && <DropdownMenu currentPage={currentPage} setCurrentPage={setCurrentPage} onClose={() => setShowDropdown(false)} />}
          </div>
        </div>
      </nav>

      {/* HERO SECTION - The Signature Element */}
      {currentPage === "home" && (
        <>
          <div style={{
            background: "linear-gradient(135deg, #0a0a0a 0%, #1a0f0a 50%, #0a0a0a 100%)",
            padding: "60px 24px 40px",
            textAlign: "center",
            borderBottom: `1px solid ${S.gold}40`,
          }}>
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
              <div style={{ 
                fontSize: "64px", 
                marginBottom: "16px",
                display: "flex",
                justifyContent: "center",
                gap: "16px"
              }}>
                <span>🍳</span>
                <span>🥘</span>
                <span>🍰</span>
              </div>
              <h1 style={{ 
                color: S.champagne, 
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: "300",
                letterSpacing: "-0.02em",
                marginBottom: "16px",
                lineHeight: "1.2"
              }}>
                A Place for Every <span style={{ color: S.gold }}>Story</span> & Every <span style={{ color: S.gold }}>Dish</span>
              </h1>
              <p style={{ 
                color: S.muted, 
                fontSize: "1.2rem",
                maxWidth: "500px",
                margin: "0 auto 32px",
                lineHeight: "1.6"
              }}>
                Share your recipes, discover new flavors, and connect with food lovers from around the world.
              </p>
              <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                <button onClick={() => currentUser ? setShowCreateModal(true) : setShowAuthModal(true)} style={{
                  background: `linear-gradient(135deg, ${S.gold}, ${S.goldDark})`,
                  color: S.bg,
                  border: "none",
                  borderRadius: "40px",
                  padding: "14px 32px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                  ✨ Start Your Story
                </button>
                <button onClick={() => setCurrentPage("about")} style={{
                  background: "transparent",
                  color: S.text,
                  border: `1px solid ${S.gold}40`,
                  borderRadius: "40px",
                  padding: "14px 32px",
                  fontSize: "16px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = S.gold}
                onMouseLeave={e => e.currentTarget.style.borderColor = `${S.gold}40`}>
                  Explore
                </button>
              </div>
            </div>
          </div>

          {/* ROTATING GALLERY - Community showcase */}
          <div style={{
            padding: "16px 24px",
            backgroundColor: S.bg,
            borderBottom: `1px solid ${S.border}`,
          }}>
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
              <p style={{ color: S.muted, fontSize: "11px", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>
                🌟 Fresh from the Community
              </p>
              <div style={{
                display: "flex",
                gap: "16px",
                overflowX: "auto",
                paddingBottom: "8px",
                scrollbarWidth: "thin",
              }}>
                {recipes.slice(0, 6).map(recipe => (
                  <div key={recipe.id} style={{
                    flex: "0 0 100px",
                    textAlign: "center",
                    cursor: "pointer",
                  }} onClick={() => {
                    setSelectedCategory(recipe.category)
                    document.querySelector('main')?.scrollIntoView({ behavior: 'smooth' })
                  }}>
                    <div style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      margin: "0 auto 8px",
                      border: `2px solid ${S.gold}40`,
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = S.gold}
                    onMouseLeave={e => e.currentTarget.style.borderColor = `${S.gold}40`}>
                      <img src={recipe.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100"} alt={recipe.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <p style={{ color: S.muted, fontSize: "9px", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {recipe.title}
                    </p>
                  </div>
                ))}
                {recipes.length === 0 && (
                  <p style={{ color: S.muted, fontSize: "13px", padding: "20px 0" }}>
                    No recipes yet. Be the first to share!
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* TRENDING SECTION */}
          {recipes.filter(r => r.likes > 0).length > 0 && (
            <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "24px 24px 8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <FaFire size={20} color={S.gold} />
                <h2 style={{ color: S.gold, margin: 0, fontSize: "18px", fontWeight: "500" }}>Trending Now</h2>
                <span style={{ color: S.muted, fontSize: "12px", marginLeft: "auto" }}>Most liked this week</span>
              </div>
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", 
                gap: "16px",
                marginBottom: "24px"
              }}>
                {recipes.filter(r => r.likes > 0).sort((a, b) => b.likes - a.likes).slice(0, 4).map(recipe => (
                  <div key={recipe.id} style={{
                    backgroundColor: S.card,
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: `1px solid ${S.border}`,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = S.gold}
                  onMouseLeave={e => e.currentTarget.style.borderColor = S.border}
                  onClick={() => {
                    setSelectedCategory(recipe.category)
                    document.querySelector('main')?.scrollIntoView({ behavior: 'smooth' })
                  }}>
                    <img src={recipe.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"} alt={recipe.title} style={{ width: "100%", height: "120px", objectFit: "cover" }} />
                    <div style={{ padding: "12px 14px" }}>
                      <h4 style={{ color: S.champagne, margin: "0 0 4px 0", fontSize: "12px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{recipe.title}</h4>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ color: S.muted, fontSize: "11px" }}>❤️ {recipe.likes}</span>
                        <span style={{ color: S.muted, fontSize: "11px" }}>👤 {recipe.author}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* CATEGORIES (home only) */}
      {currentPage === "home" && (
        <div style={{ backgroundColor: S.bg, borderBottom: `1px solid ${S.border}`, overflowX: "auto", whiteSpace: "nowrap", padding: "8px 24px" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
            {categories.map(cat => (
              <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} style={{ backgroundColor: selectedCategory === cat.id ? S.gold : "transparent", color: selectedCategory === cat.id ? S.bg : S.gold, border: `1px solid ${S.gold}`, borderRadius: "40px", padding: "6px 16px", cursor: "pointer", fontSize: "12px", display: "inline-flex", alignItems: "center", gap: "4px", whiteSpace: "nowrap" }}>
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      {currentPage === "home" && (
        <main style={{ maxWidth: "800px", margin: "0 auto", padding: "24px" }}>
          {filteredRecipes.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px", backgroundColor: S.card, borderRadius: "24px", border: `1px solid ${S.gold}` }}>
              <p style={{ color: S.champagne, fontSize: "18px" }}>No recipes yet</p>
              <button onClick={() => currentUser ? setShowCreateModal(true) : setShowAuthModal(true)} style={{ marginTop: "16px", background: `linear-gradient(135deg, ${S.gold}, ${S.goldDark})`, color: S.bg, border: "none", borderRadius: "40px", padding: "10px 24px", cursor: "pointer", fontWeight: "bold" }}>{currentUser ? "Share Recipe" : "Join to Post"}</button>
            </div>
          ) : (
            filteredRecipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} onLike={handleLike} currentUser={currentUser} />)
          )}
        </main>
      )}

      {/* PAGE ROUTING */}
      {currentPage === "restaurants" && <RestaurantsPage />}
      {currentPage === "jobs" && <JobsPage />}
      {currentPage === "equipment" && <EquipmentPage />}
      {currentPage === "business" && <BusinessIdeasPage />}
      {currentPage === "schools" && <CulinarySchoolsPage />}
      {currentPage === "kids" && <KidsNutritionPage />}
      {currentPage === "fasting" && <FastingPage />}
      {currentPage === "disorders" && <FoodDisordersPage />}
      {currentPage === "donations" && <DonationsPage />}
      {currentPage === "books" && <BooksPage />}
      {currentPage === "about" && <AboutPage />}
      {currentPage === "faq" && <FAQPage />}
      {currentPage === "contact" && <ContactPage />}
      {currentPage === "privacy" && <PrivacyPage />}
      {currentPage === "cookies" && <CookiesPage />}
      {currentPage === "terms" && <TermsPage />}

      {/* FOOTER */}
      <footer style={{ textAlign: "center", padding: "24px", borderTop: `1px solid ${S.border}`, color: S.muted, fontSize: "11px", marginTop: "24px" }}>
        <p>© 2026 BetterDays Eats · BetterDays Agile Technologies Inc · South Africa 🇿🇦</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "8px", flexWrap: "wrap" }}>
          <button onClick={() => setCurrentPage("about")} style={{ background: "none", border: "none", color: S.muted, cursor: "pointer" }}>About</button>
          <button onClick={() => setCurrentPage("faq")} style={{ background: "none", border: "none", color: S.muted, cursor: "pointer" }}>FAQ</button>
          <button onClick={() => setCurrentPage("contact")} style={{ background: "none", border: "none", color: S.muted, cursor: "pointer" }}>Contact</button>
          <button onClick={() => setCurrentPage("privacy")} style={{ background: "none", border: "none", color: S.muted, cursor: "pointer" }}>Privacy</button>
          <button onClick={() => setCurrentPage("cookies")} style={{ background: "none", border: "none", color: S.muted, cursor: "pointer" }}>Cookies</button>
          <button onClick={() => setCurrentPage("terms")} style={{ background: "none", border: "none", color: S.muted, cursor: "pointer" }}>Terms</button>
        </div>
      </footer>

      {/* MOBILE BOTTOM NAV */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, backgroundColor: S.bg, borderTop: `1px solid ${S.gold}`, display: "flex", justifyContent: "space-around", padding: "10px", zIndex: 100 }}>
        <button onClick={() => setCurrentPage("home")} style={{ background: "none", border: "none", color: currentPage === "home" ? S.gold : S.muted, fontSize: "20px", cursor: "pointer" }}>🏠</button>
        <button onClick={() => setShowCreateModal(true)} style={{ background: `linear-gradient(135deg, ${S.gold}, ${S.goldDark})`, border: "none", color: S.bg, fontSize: "18px", cursor: "pointer", borderRadius: "50%", width: "44px", height: "44px", marginTop: "-10px" }}>✨</button>
        <button onClick={() => setShowNotifications(!showNotifications)} style={{ background: "none", border: "none", color: S.muted, fontSize: "20px", cursor: "pointer", position: "relative" }}>
          🔔{unreadCount > 0 && <span style={{ position: "absolute", top: "-2px", right: "-4px", backgroundColor: "#ef4444", color: "white", borderRadius: "50%", width: "14px", height: "14px", fontSize: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>{unreadCount}</span>}
        </button>
        {currentUser ? (
          <button onClick={() => null} style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer" }}>👤</button>
        ) : (
          <button onClick={() => setShowAuthModal(true)} style={{ background: "none", border: "none", color: S.muted, fontSize: "20px", cursor: "pointer" }}>👤</button>
        )}
      </div>

      {/* MODALS */}
      {showCreateModal && currentUser && <CreatePostModal onClose={() => setShowCreateModal(false)} onCreate={handleCreateRecipe} currentUser={currentUser} />}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} onLogin={handleLogin} />}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      {!cookiesAccepted && <CookieBanner onAccept={() => { setCookiesAccepted(true); localStorage.setItem("bde_cookies", "true") }} />}
    </div>
  )
}