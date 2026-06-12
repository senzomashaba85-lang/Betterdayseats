import { useState, useEffect } from "react"
import { 
  FaFacebook, FaTwitter, FaInstagram, FaWhatsapp, FaTiktok,
  FaHeart, FaComment, FaBookmark, FaEllipsisH, FaSearch,
  FaBell, FaSignOutAlt, FaTimes, FaReply, FaTrash,
  FaBriefcase, FaHandHoldingHeart, FaLeaf, FaClock,
  FaAmazon, FaEnvelope, FaPhone, FaGlobe, FaUserMd,
  FaAppleAlt, FaCookie, FaShieldAlt, FaQuestionCircle,
  FaInfoCircle, FaPhoneAlt, FaMapMarkerAlt, FaCalendarAlt
} from "react-icons/fa"

// ============================================
// THEME
// ============================================
const S = {
  gold: "#c9a84c", goldDark: "#b8922e", champagne: "#f5e6c8",
  bg: "#0a0a0a", card: "#111111", border: "#1e1e1e",
  text: "#e5e5e5", muted: "#666666", green: "#4caf50",
  burgundy: "#8b0000", teal: "#00bcd4"
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
// CATEGORIES
// ============================================
const categories = [
  { id: "all", name: "All", icon: "🍽️" },
  { id: "vegetarian", name: "Vegetarian", icon: "🥗" },
  { id: "healthy", name: "Healthy", icon: "💪" },
  { id: "desserts", name: "Desserts", icon: "🍰" },
  { id: "healing", name: "Healing Food", icon: "🌱" },
]

// ============================================
// TOAST
// ============================================
function Toast({ message, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t) }, [onClose])
  return <div style={{ position: "fixed", bottom: "90px", left: "50%", transform: "translateX(-50%)", backgroundColor: S.gold, color: S.bg, padding: "12px 24px", borderRadius: "40px", fontWeight: "bold", fontSize: "13px", zIndex: 9999 }}>{message}</div>
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
// RECIPE CARD
// ============================================
function RecipeCard({ recipe, onLike, currentUser }) {
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState(recipe.comments || [])

  const handleAddComment = () => {
    if (!newComment.trim()) return
    setComments([...comments, { id: Date.now(), text: newComment, author: currentUser?.name || "Guest", date: new Date().toISOString() }])
    setNewComment("")
  }

  return (
    <div style={{ backgroundColor: S.card, borderRadius: "20px", marginBottom: "24px", border: `1px solid ${S.gold}`, padding: "20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
        <div style={{ fontSize: "40px" }}>👨‍🍳</div>
        <div>
          <strong style={{ color: S.gold }}>{recipe.author}</strong>
          <span style={{ marginLeft: "8px", fontSize: "20px" }}>{recipe.countryFlag}</span>
          <div style={{ fontSize: "11px", color: S.muted }}>{new Date(recipe.date).toLocaleDateString()}</div>
        </div>
      </div>
      <h3 style={{ color: S.champagne }}>{recipe.title}</h3>
      <p style={{ color: "#bbb", lineHeight: "1.6" }}>{recipe.description}</p>
      {recipe.image && <img src={recipe.image} alt={recipe.title} style={{ width: "100%", borderRadius: "12px", margin: "12px 0" }} />}
      
      <div style={{ display: "flex", gap: "20px", marginTop: "16px", paddingTop: "12px", borderTop: `1px solid ${S.border}` }}>
        <button onClick={() => onLike(recipe.id)} style={{ background: "none", border: "none", color: recipe.liked ? "#ff4444" : S.muted, cursor: "pointer" }}><FaHeart /> {recipe.likes}</button>
        <button onClick={() => setShowComments(!showComments)} style={{ background: "none", border: "none", color: S.muted, cursor: "pointer" }}><FaComment /> {comments.length}</button>
        <ShareButtons recipe={recipe} />
      </div>
      
      {showComments && (
        <div style={{ marginTop: "16px" }}>
          {comments.map(c => <div key={c.id} style={{ backgroundColor: S.bg, padding: "8px", borderRadius: "8px", marginBottom: "8px" }}><strong style={{ color: S.gold }}>{c.author}</strong><p style={{ margin: "4px 0 0 0", fontSize: "13px" }}>{c.text}</p></div>)}
          {currentUser && <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}><input value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Write a comment..." style={{ flex: 1, backgroundColor: S.bg, border: `1px solid ${S.gold}`, borderRadius: "40px", padding: "8px 16px", color: "white" }} /><button onClick={handleAddComment} style={{ backgroundColor: S.gold, color: S.bg, border: "none", borderRadius: "40px", padding: "8px 16px", cursor: "pointer" }}>Post</button></div>}
        </div>
      )}
    </div>
  )
}

// ============================================
// CREATE POST MODAL
// ============================================
function CreatePostModal({ onClose, onCreate, currentUser }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("healthy")
  const [ingredients, setIngredients] = useState("")
  const [instructions, setInstructions] = useState("")
  const [image, setImage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !description.trim()) return
    onCreate({ id: Date.now(), title: title.trim(), description: description.trim(), category, ingredients: ingredients.split("\n").filter(i => i.trim()), instructions: instructions.trim(), image: image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600", author: currentUser.name, countryFlag: currentUser.countryFlag, date: new Date().toISOString(), likes: 0, liked: false, comments: [] })
    onClose()
  }

  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.95)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ backgroundColor: S.card, borderRadius: "24px", maxWidth: "600px", width: "100%", border: `1px solid ${S.gold}`, padding: "28px" }}>
        <h2 style={{ color: S.gold }}>✨ Share Recipe</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required style={{ width: "100%", backgroundColor: "#1a1a1a", border: `1px solid ${S.border}`, borderRadius: "8px", padding: "12px", color: "white", marginBottom: "12px" }} />
          <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required rows="2" style={{ width: "100%", backgroundColor: "#1a1a1a", border: `1px solid ${S.border}`, borderRadius: "8px", padding: "12px", color: "white", marginBottom: "12px" }} />
          <select value={category} onChange={e => setCategory(e.target.value)} style={{ width: "100%", backgroundColor: "#1a1a1a", border: `1px solid ${S.border}`, borderRadius: "8px", padding: "12px", color: "white", marginBottom: "12px" }}>
            {categories.filter(c => c.id !== "all").map(c => <option key={c.id}>{c.icon} {c.name}</option>)}
          </select>
          <textarea placeholder="Ingredients (one per line)" value={ingredients} onChange={e => setIngredients(e.target.value)} rows="4" style={{ width: "100%", backgroundColor: "#1a1a1a", border: `1px solid ${S.border}`, borderRadius: "8px", padding: "12px", color: "white", marginBottom: "12px", fontFamily: "monospace" }} />
          <textarea placeholder="Instructions" value={instructions} onChange={e => setInstructions(e.target.value)} rows="4" style={{ width: "100%", backgroundColor: "#1a1a1a", border: `1px solid ${S.border}`, borderRadius: "8px", padding: "12px", color: "white", marginBottom: "12px" }} />
          <input type="url" placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} style={{ width: "100%", backgroundColor: "#1a1a1a", border: `1px solid ${S.border}`, borderRadius: "8px", padding: "12px", color: "white", marginBottom: "20px" }} />
          <button type="submit" style={{ width: "100%", backgroundColor: S.gold, color: S.bg, border: "none", borderRadius: "12px", padding: "14px", fontWeight: "bold", cursor: "pointer" }}>Post Recipe</button>
        </form>
        <button onClick={onClose} style={{ marginTop: "16px", background: "none", border: "none", color: S.muted, cursor: "pointer" }}>Cancel</button>
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
    onLogin({ id: Date.now(), email, name: name.trim() || email.split("@")[0], countryFlag: sel.flag, avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name || email)}&background=c9a84c&color=000` })
    onClose()
  }

  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.95)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ backgroundColor: S.card, borderRadius: "24px", maxWidth: "400px", width: "100%", border: `2px solid ${S.gold}`, padding: "32px", textAlign: "center" }}>
        <h1 style={{ color: S.gold }}>BetterDays Eats</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} style={{ width: "100%", backgroundColor: "#1a1a1a", border: `1px solid ${S.gold}`, borderRadius: "8px", padding: "12px", color: "white", marginBottom: "12px" }} />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: "100%", backgroundColor: "#1a1a1a", border: `1px solid ${S.gold}`, borderRadius: "8px", padding: "12px", color: "white", marginBottom: "12px" }} />
          <select value={country} onChange={e => setCountry(e.target.value)} style={{ width: "100%", backgroundColor: "#1a1a1a", border: `1px solid ${S.gold}`, borderRadius: "8px", padding: "12px", color: "white", marginBottom: "20px" }}>
            {countries.map(c => <option key={c.code} value={c.code}>{c.flag} {c.name}</option>)}
          </select>
          <button type="submit" style={{ width: "100%", backgroundColor: S.gold, color: S.bg, border: "none", borderRadius: "8px", padding: "12px", fontWeight: "bold", cursor: "pointer" }}>Login / Sign Up</button>
        </form>
        <button onClick={onClose} style={{ marginTop: "16px", background: "none", border: "none", color: S.muted, cursor: "pointer" }}>Browse as Guest</button>
      </div>
    </div>
  )
}

// ============================================
// RESTAURANTS PAGE
// ============================================
function RestaurantsPage() {
  const restaurants = [
    { name: "The Golden Plate", location: "Sandton, Johannesburg", cuisine: "African Fine Dining", rating: "⭐⭐⭐⭐⭐", price: "R250-R500" },
    { name: "Mama Afrika", location: "Cape Town", cuisine: "Pan-African", rating: "⭐⭐⭐⭐⭐", price: "R180-R400" },
    { name: "Spice Route", location: "Durban", cuisine: "Indian", rating: "⭐⭐⭐⭐", price: "R150-R350" },
  ]
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ backgroundColor: S.card, borderRadius: "24px", padding: "32px", border: `1px solid ${S.gold}` }}>
        <h1 style={{ color: S.gold }}>🏪 Restaurant Directory</h1>
        <p style={{ color: S.text }}>Discover the best restaurants near you.</p>
        <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
          <input type="text" placeholder="Search restaurants..." style={{ flex: 1, backgroundColor: "#1a1a1a", border: `1px solid ${S.border}`, borderRadius: "40px", padding: "12px", color: "white" }} />
          <button style={{ backgroundColor: S.gold, color: S.bg, border: "none", borderRadius: "40px", padding: "12px 24px", cursor: "pointer" }}>Search</button>
        </div>
      </div>
      {restaurants.map((r, i) => (
        <div key={i} style={{ backgroundColor: S.card, borderRadius: "16px", padding: "20px", marginTop: "16px", border: `1px solid ${S.border}` }}>
          <h3 style={{ color: S.champagne }}>{r.name}</h3>
          <p style={{ color: S.gold }}>📍 {r.location}</p>
          <p style={{ color: "#bbb" }}>{r.cuisine} • {r.price}</p>
          <p style={{ color: "#ffd700" }}>{r.rating}</p>
          <button style={{ marginTop: "12px", backgroundColor: S.gold, color: S.bg, border: "none", borderRadius: "8px", padding: "8px 16px", cursor: "pointer" }}>View Profile</button>
        </div>
      ))}
      <div style={{ backgroundColor: `${S.gold}10`, borderRadius: "12px", padding: "16px", marginTop: "20px", textAlign: "center" }}>
        <p style={{ color: S.champagne }}>Own a restaurant? <a href="mailto:senzomashaba85@gmail.com" style={{ color: S.gold }}>List your restaurant</a></p>
      </div>
    </div>
  )
}

// ============================================
// JOBS PAGE
// ============================================
function JobsPage() {
  const jobs = [
    { title: "Head Chef", company: "The Golden Plate", location: "Johannesburg", salary: "R25,000-R40,000", type: "Full-time" },
    { title: "Pastry Chef", company: "Sweet Dreams Bakery", location: "Cape Town", salary: "R18,000-R25,000", type: "Full-time" },
    { title: "Sous Chef", company: "Bella Vista", location: "Durban", salary: "R20,000-R30,000", type: "Full-time" },
  ]
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ backgroundColor: S.card, borderRadius: "24px", padding: "32px", border: `1px solid ${S.gold}` }}>
        <h1 style={{ color: S.gold }}>💼 Food Industry Jobs</h1>
        <p style={{ color: S.text }}>Find chef, waiter, and food business jobs worldwide.</p>
        <button style={{ marginTop: "16px", backgroundColor: S.gold, color: S.bg, border: "none", borderRadius: "40px", padding: "10px 20px", cursor: "pointer" }}>+ Post a Job (R99)</button>
      </div>
      {jobs.map((job, i) => (
        <div key={i} style={{ backgroundColor: S.card, borderRadius: "16px", padding: "20px", marginTop: "16px", border: `1px solid ${S.border}` }}>
          <h3 style={{ color: S.champagne }}>{job.title}</h3>
          <p style={{ color: S.gold }}>{job.company} • {job.location}</p>
          <p style={{ color: "#bbb" }}>{job.salary} • {job.type}</p>
          <a href="mailto:senzomashaba85@gmail.com" style={{ display: "inline-block", marginTop: "12px", backgroundColor: S.gold, color: S.bg, padding: "8px 16px", borderRadius: "8px", textDecoration: "none" }}>Apply Now</a>
        </div>
      ))}
    </div>
  )
}

// ============================================
// EQUIPMENT PAGE
// ============================================
function EquipmentPage() {
  const products = [
    { name: "Mobile Food Trailer", price: "R85,000", image: "🚚", desc: "Complete mobile kitchen" },
    { name: "Commercial Gas Oven", price: "R12,500", image: "🔥", desc: "6-burner commercial oven" },
    { name: "POS System", price: "R8,500", image: "💳", desc: "Complete point of sale" },
    { name: "Commercial Blender", price: "R3,200", image: "🥤", desc: "Heavy duty smoothie blender" },
    { name: "Food Packaging Set", price: "R1,200", image: "📦", desc: "200 containers kit" },
    { name: "Display Fridge", price: "R15,000", image: "❄️", desc: "Commercial refrigeration" },
  ]
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ backgroundColor: S.card, borderRadius: "24px", padding: "32px", border: `1px solid ${S.gold}` }}>
        <h1 style={{ color: S.gold }}>🛒 Equipment Store</h1>
        <p style={{ color: S.text }}>Start your food business with the right equipment. Affiliate links.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "16px", marginTop: "16px" }}>
        {products.map((p, i) => (
          <a key={i} href="https://www.takealot.com" target="_blank" rel="sponsored" style={{ textDecoration: "none" }}>
            <div style={{ backgroundColor: S.card, borderRadius: "16px", padding: "20px", border: `1px solid ${S.border}`, textAlign: "center" }}>
              <div style={{ fontSize: "48px" }}>{p.image}</div>
              <h3 style={{ color: S.champagne, margin: "8px 0 4px" }}>{p.name}</h3>
              <p style={{ color: "#bbb", fontSize: "12px" }}>{p.desc}</p>
              <p style={{ color: S.gold, fontWeight: "bold", fontSize: "16px" }}>{p.price}</p>
              <span style={{ display: "inline-block", marginTop: "12px", backgroundColor: S.gold, color: S.bg, padding: "6px 12px", borderRadius: "8px", fontSize: "12px" }}>View →</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

// ============================================
// BUSINESS IDEAS PAGE
// ============================================
function BusinessIdeasPage() {
  const [selected, setSelected] = useState(null)
  const ideas = [
    { title: "Start a Catering Business with R5000", icon: "📋", content: "Start from your home kitchen. Equipment R3,000, marketing R1,000, first ingredients R1,000." },
    { title: "Food Truck Business Guide", icon: "🚚", content: "Used truck R80k-R150k. Permits: CIPC, health certificate, trading permit." },
    { title: "Home Bakery Business", icon: "🥐", content: "Equipment R5k-R15k. Sell celebration cakes (R300-800), cupcakes (R25-40)." },
    { title: "Meal Prep Service", icon: "📦", content: "Containers R1,000. Price per meal R50-80. Target busy professionals." },
  ]
  if (selected) return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ backgroundColor: S.card, borderRadius: "24px", padding: "32px", border: `1px solid ${S.gold}` }}>
        <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: S.gold, cursor: "pointer", marginBottom: "16px" }}>← Back</button>
        <div style={{ fontSize: "48px", textAlign: "center" }}>{selected.icon}</div>
        <h1 style={{ color: S.gold }}>{selected.title}</h1>
        <p style={{ color: "#bbb", lineHeight: "1.8", whiteSpace: "pre-wrap", marginTop: "20px" }}>{selected.content}</p>
        <div style={{ backgroundColor: S.bg, borderRadius: "12px", padding: "16px", marginTop: "20px", textAlign: "center" }}>
          <p style={{ color: S.gold }}>💡 Need help starting your food business?</p>
          <a href="mailto:senzomashaba85@gmail.com" style={{ color: S.champagne }}>Contact us →</a>
        </div>
      </div>
    </div>
  )
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ backgroundColor: S.card, borderRadius: "24px", padding: "32px", border: `1px solid ${S.gold}` }}>
        <h1 style={{ color: S.gold }}>💡 Food Business Ideas</h1>
        <p style={{ color: S.text }}>Practical guides to start and grow your food business.</p>
      </div>
      {ideas.map((idea, i) => (
        <button key={i} onClick={() => setSelected(idea)} style={{ width: "100%", backgroundColor: S.card, borderRadius: "16px", padding: "20px", marginTop: "16px", border: `1px solid ${S.border}`, textAlign: "left", cursor: "pointer" }}
          onMouseEnter={e => e.currentTarget.style.borderColor = S.gold}
          onMouseLeave={e => e.currentTarget.style.borderColor = S.border}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: "32px" }}>{idea.icon}</span>
            <div><h3 style={{ color: S.champagne, margin: 0 }}>{idea.title}</h3><p style={{ color: S.muted, fontSize: "12px", marginTop: "4px" }}>Click to read →</p></div>
          </div>
        </button>
      ))}
    </div>
  )
}

// ============================================
// CULINARY SCHOOLS PAGE
// ============================================
function CulinarySchoolsPage() {
  const schools = [
    { name: "Institute of Culinary Arts (ICA)", location: "Stellenbosch", courses: "Professional Chef, Patisserie", cost: "R45,000-R120,000" },
    { name: "Prue Leith Chefs Academy", location: "Centurion", courses: "Culinary Arts, Patisserie", cost: "R50,000-R150,000" },
    { name: "Capsicum Culinary Studio", location: "Cape Town/Durban/JHB", courses: "Professional Cookery, Baking", cost: "R35,000-R80,000" },
    { name: "Le Cordon Bleu SA", location: "Johannesburg", courses: "Grand Diplôme, Cuisine", cost: "R150,000-R300,000" },
  ]
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ backgroundColor: S.card, borderRadius: "24px", padding: "32px", border: `1px solid ${S.gold}` }}>
        <h1 style={{ color: S.gold }}>🏫 Culinary Schools Directory</h1>
        <p style={{ color: S.text }}>Find registered culinary schools across South Africa.</p>
      </div>
      {schools.map((school, i) => (
        <div key={i} style={{ backgroundColor: S.card, borderRadius: "16px", padding: "20px", marginTop: "16px", border: `1px solid ${S.border}` }}>
          <h3 style={{ color: S.champagne }}>{school.name}</h3>
          <p style={{ color: S.gold }}>📍 {school.location}</p>
          <p style={{ color: "#bbb" }}>🎓 {school.courses}</p>
          <p style={{ color: S.muted }}>💰 {school.cost}</p>
          <button style={{ marginTop: "12px", backgroundColor: S.gold, color: S.bg, border: "none", borderRadius: "8px", padding: "8px 16px", cursor: "pointer" }}>Contact School</button>
        </div>
      ))}
    </div>
  )
}

// ============================================
// KIDS NUTRITION PAGE
// ============================================
function KidsNutritionPage() {
  const [posts, setPosts] = useState([
    { id: 1, title: "Traditional African Porridge", content: "Nutrient-dense porridge for healthy weight gain.", author: "Mama Nomsa", countryFlag: "🇿🇦", likes: 45 },
    { id: 2, title: "Spinach and Liver Stew", content: "Prevents anemia in growing children.", author: "Nutritionist Thandi", countryFlag: "🇿🇦", likes: 67 },
  ])
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ backgroundColor: S.card, borderRadius: "24px", padding: "32px", border: `1px solid ${S.gold}` }}>
        <h1 style={{ color: S.gold }}>👶 Kids Nutrition</h1>
        <p style={{ color: S.text }}>Share meals that help children grow healthy and strong.</p>
        <button style={{ marginTop: "16px", backgroundColor: S.gold, color: S.bg, border: "none", borderRadius: "40px", padding: "10px 20px", cursor: "pointer" }}>+ Share a Kids Meal</button>
      </div>
      {posts.map(post => (
        <div key={post.id} style={{ backgroundColor: S.card, borderRadius: "16px", padding: "20px", marginTop: "16px", border: `1px solid ${S.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><strong style={{ color: S.gold }}>{post.author}</strong><span>{post.countryFlag}</span></div>
          <h3 style={{ color: S.champagne, marginTop: "8px" }}>{post.title}</h3>
          <p style={{ color: "#bbb" }}>{post.content}</p>
          <div style={{ marginTop: "12px", color: S.muted }}>❤️ {post.likes} helpful</div>
        </div>
      ))}
    </div>
  )
}

// ============================================
// DONATIONS PAGE
// ============================================
function DonationsPage() {
  const ngos = [
    { name: "FoodForward SA", country: "🇿🇦", desc: "South Africa's largest food bank.", link: "https://www.foodforwardsa.org" },
    { name: "World Food Programme", country: "🌍", desc: "Nobel Prize-winning hunger organization.", link: "https://www.wfp.org" },
    { name: "Action Against Hunger", country: "🌍", desc: "Fighting malnutrition worldwide.", link: "https://www.actionagainsthunger.org" },
  ]
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ backgroundColor: S.card, borderRadius: "24px", padding: "32px", border: `1px solid ${S.gold}` }}>
        <h1 style={{ color: S.gold }}>❤️ Support Food NGOs</h1>
        <p style={{ color: S.text }}>Your donation helps fight hunger worldwide.</p>
      </div>
      {ngos.map((ngo, i) => (
        <div key={i} style={{ backgroundColor: S.card, borderRadius: "16px", padding: "20px", marginTop: "16px", border: `1px solid ${S.border}` }}>
          <h3 style={{ color: S.champagne }}>{ngo.name} {ngo.country}</h3>
          <p style={{ color: "#bbb" }}>{ngo.desc}</p>
          <a href={ngo.link} target="_blank" rel="noreferrer" style={{ display: "inline-block", marginTop: "12px", backgroundColor: S.gold, color: S.bg, padding: "8px 16px", borderRadius: "8px", textDecoration: "none" }}>Donate Now</a>
        </div>
      ))}
    </div>
  )
}

// ============================================
// BOOKS PAGE - Money Maker
// ============================================
function BooksPage() {
  const AFFILIATE_LINK = "https://amzn.to/4e5zO3r"
  const books = [
    { title: "The Healing Foods Cookbook", author: "Michael Murray", price: "$29.99", rating: "⭐⭐⭐⭐⭐", cat: "Healing", emoji: "🌿", desc: "Transform your health through food with ancient wisdom and modern science." },
    { title: "How Not to Die", author: "Dr. Michael Greger", price: "$18.99", rating: "⭐⭐⭐⭐⭐", cat: "Healthy", emoji: "💪", desc: "Foods scientifically proven to prevent and reverse disease." },
    { title: "The Complete Alkaline Diet", author: "Rockridge Press", price: "$19.99", rating: "⭐⭐⭐⭐", cat: "Alkaline", emoji: "🌿", desc: "Comprehensive guide to alkaline eating for beginners and experts." },
    { title: "The Fasting Mimicking Diet", author: "Dr. Valter Longo", price: "$24.99", rating: "⭐⭐⭐⭐⭐", cat: "Fasting", emoji: "🕐", desc: "The science of fasting and longevity explained." },
    { title: "Eating in the Light of the Moon", author: "Anita Johnston", price: "$16.99", rating: "⭐⭐⭐⭐⭐", cat: "Disorders", emoji: "💙", desc: "Healing your relationship with food. A must-read." },
    { title: "The Vegetarian Bible", author: "Nancy Birtwhistle", price: "$32.99", rating: "⭐⭐⭐⭐", cat: "Vegetarian", emoji: "🥗", desc: "500+ vegetarian recipes from around the world." },
    { title: "The Obesity Code", author: "Dr. Jason Fung", price: "$16.99", rating: "⭐⭐⭐⭐⭐", cat: "Obesity", emoji: "⚖️", desc: "Revolutionary approach to insulin and obesity." },
    { title: "Africa's Best Recipes", author: "Various Chefs", price: "$22.99", rating: "⭐⭐⭐⭐", cat: "African", emoji: "🌍", desc: "Rich food cultures and cuisines across Africa." },
  ]
  const [filter, setFilter] = useState("All")
  const cats = ["All", ...new Set(books.map(b => b.cat))]
  const filtered = filter === "All" ? books : books.filter(b => b.cat === filter)
  
  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ backgroundColor: S.card, borderRadius: "24px", padding: "32px", border: `1px solid ${S.gold}`, marginBottom: "24px", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "8px" }}>
          <FaAmazon size={32} color={S.gold} />
          <h1 style={{ color: S.gold, margin: 0 }}>📚 Food & Wellness Books</h1>
        </div>
        <p style={{ color: S.text, marginBottom: "4px" }}>Handpicked books on healing food, fasting, eating disorders, and culinary arts.</p>
        <p style={{ color: "#ffd700", fontSize: "13px", margin: "0 0 16px 0", fontWeight: "bold" }}>💰 We earn a commission when you purchase through these links — thank you for supporting BetterDays Eats!</p>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
          {cats.map(f => <button key={f} onClick={() => setFilter(f)} style={{ backgroundColor: filter === f ? S.gold : "transparent", color: filter === f ? S.bg : S.gold, border: `1px solid ${S.gold}`, borderRadius: "40px", padding: "6px 16px", cursor: "pointer", fontSize: "12px", fontWeight: filter === f ? "bold" : "normal" }}>{f}</button>)}
        </div>
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
        {filtered.map((book, i) => (
          <a key={i} href={AFFILIATE_LINK} target="_blank" rel="sponsored noopener noreferrer" style={{ textDecoration: "none" }}>
            <div style={{ backgroundColor: S.card, borderRadius: "16px", padding: "24px", border: `1px solid ${S.border}`, height: "100%", transition: "all 0.3s", cursor: "pointer" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = S.gold; e.currentTarget.style.transform = "translateY(-4px)" }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = S.border; e.currentTarget.style.transform = "translateY(0)" }}>
              <div style={{ fontSize: "52px", textAlign: "center", marginBottom: "12px" }}>{book.emoji}</div>
              <span style={{ backgroundColor: `${S.gold}20`, color: S.gold, fontSize: "10px", padding: "3px 12px", borderRadius: "20px", fontWeight: "bold", display: "inline-block", marginBottom: "12px" }}>{book.cat}</span>
              <h3 style={{ color: S.champagne, fontSize: "15px", margin: "8px 0 4px 0" }}>{book.title}</h3>
              <p style={{ color: S.muted, fontSize: "12px", margin: "0 0 8px 0" }}>by {book.author}</p>
              <p style={{ color: "#bbb", fontSize: "12px", margin: "0 0 12px 0" }}>{book.desc}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: S.gold, fontWeight: "bold", fontSize: "18px" }}>{book.price}</span>
                <span style={{ backgroundColor: S.gold, color: S.bg, padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold" }}>Buy on Amazon →</span>
              </div>
              <p style={{ color: "#ffd700", fontSize: "12px", margin: "8px 0 0 0" }}>{book.rating}</p>
            </div>
          </a>
        ))}
      </div>
      
      <div style={{ backgroundColor: `${S.gold}10`, borderRadius: "16px", padding: "24px", marginTop: "32px", textAlign: "center" }}>
        <p style={{ color: S.champagne, margin: "0 0 8px 0" }}>📖 Don't see what you're looking for?</p>
        <a href="mailto:senzomashaba85@gmail.com?subject=Book Recommendation" style={{ color: S.gold, textDecoration: "none", fontWeight: "bold" }}>Suggest a book →</a>
      </div>
    </div>
  )
}

// ============================================
// STATIC PAGES
// ============================================
function AboutPage() { return <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}><div style={{ backgroundColor: S.card, borderRadius: "24px", padding: "40px", border: `1px solid ${S.gold}` }}><h1 style={{ color: S.gold }}>About BetterDays Eats</h1><p style={{ color: S.text }}>Born in South Africa. Built for the world. 🌍</p><p style={{ color: S.text, marginTop: "16px" }}>BetterDays Agile Technologies Inc · A Manifest Agile Projects (Pty) Ltd Company</p></div></div> }
function FAQPage() { return <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}><div style={{ backgroundColor: S.card, borderRadius: "24px", padding: "40px", border: `1px solid ${S.gold}` }}><h1 style={{ color: S.gold }}>FAQ</h1><p style={{ color: S.text }}>BetterDays Eats is 100% free for all users worldwide.</p></div></div> }
function ContactPage() { return <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}><div style={{ backgroundColor: S.card, borderRadius: "24px", padding: "40px", border: `1px solid ${S.gold}` }}><h1 style={{ color: S.gold }}>Contact</h1><p style={{ color: S.text }}>Email: senzomashaba85@gmail.com</p><button onClick={() => window.open("https://wa.me/27762226325")} style={{ marginTop: "16px", backgroundColor: S.gold, color: S.bg, border: "none", borderRadius: "8px", padding: "10px 20px", cursor: "pointer" }}>WhatsApp</button></div></div> }
function PrivacyPage() { return <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}><div style={{ backgroundColor: S.card, borderRadius: "24px", padding: "40px", border: `1px solid ${S.gold}` }}><h1 style={{ color: S.gold }}>Privacy Policy</h1><p style={{ color: S.text }}>We never sell your data. Your privacy is our priority.</p></div></div> }
function CookiesPage() { return <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}><div style={{ backgroundColor: S.card, borderRadius: "24px", padding: "40px", border: `1px solid ${S.gold}` }}><h1 style={{ color: S.gold }}>Cookie Policy</h1><p style={{ color: S.text }}>We use cookies to improve your experience.</p></div></div> }
function TermsPage() { return <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}><div style={{ backgroundColor: S.card, borderRadius: "24px", padding: "40px", border: `1px solid ${S.gold}` }}><h1 style={{ color: S.gold }}>Terms & Conditions</h1><p style={{ color: S.text }}>By using BetterDays Eats, you agree to these terms. Be respectful to other users.</p></div></div> }

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
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [toast, setToast] = useState(null)
  const [cookiesAccepted, setCookiesAccepted] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("bde_currentUser")
    const storedRecipes = localStorage.getItem("bde_recipes")
    const cookieOk = localStorage.getItem("bde_cookies")
    if (storedUser) setCurrentUser(JSON.parse(storedUser))
    if (cookieOk) setCookiesAccepted(true)
    if (storedRecipes) setRecipes(JSON.parse(storedRecipes))
    else {
      const demo = [{ id: 1, title: "African Superfood Smoothie Bowl", description: "Packed with moringa and baobab", category: "smoothies", image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600", author: "Chef Amara", countryFlag: "🇿🇦", date: new Date().toISOString(), likes: 128, liked: false, comments: [] }]
      setRecipes(demo)
      localStorage.setItem("bde_recipes", JSON.stringify(demo))
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest('.dropdown-container')) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [showDropdown])

  useEffect(() => { if (recipes.length) localStorage.setItem("bde_recipes", JSON.stringify(recipes)) }, [recipes])

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
  }

  const handleLogout = () => {
    localStorage.removeItem("bde_currentUser")
    setCurrentUser(null)
    showToast("Logged out")
  }

  const handleCreateRecipe = (newRecipe) => {
    setRecipes([newRecipe, ...recipes])
    showToast("Recipe shared!")
  }

  const handleLike = (id) => setRecipes(recipes.map(r => r.id === id ? { ...r, likes: r.liked ? r.likes - 1 : r.likes + 1, liked: !r.liked } : r))

  const filteredRecipes = recipes.filter(r => (selectedCategory === "all" || r.category === selectedCategory) && (!searchTerm || r.title.toLowerCase().includes(searchTerm.toLowerCase())))

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
              <input type="text" placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ backgroundColor: "#1a1a1a", border: `1px solid ${S.border}`, borderRadius: "40px", padding: "8px 16px 8px 36px", color: "white", width: "140px", fontSize: "12px" }} />
              <FaSearch style={{ position: "absolute", left: "12px", top: "10px", color: S.muted, fontSize: "12px" }} />
            </div>
            <div style={{ position: "relative" }}>
              <button onClick={() => setShowNotifications(!showNotifications)} style={{ background: "none", border: "none", color: S.gold, cursor: "pointer", position: "relative", padding: "4px" }}>
                <FaBell size={18} />
                {unreadCount > 0 && <span style={{ position: "absolute", top: "-4px", right: "-6px", backgroundColor: "#ef4444", color: "white", borderRadius: "50%", width: "14px", height: "14px", fontSize: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>{unreadCount}</span>}
              </button>
              {showNotifications && <div style={{ position: "absolute", top: "35px", right: 0, backgroundColor: S.card, borderRadius: "12px", border: `1px solid ${S.gold}`, width: "280px", zIndex: 200 }}><div style={{ padding: "12px", borderBottom: `1px solid ${S.border}` }}>🔔 Notifications</div>{notifications.map(n => <div key={n.id} style={{ padding: "12px", borderBottom: `1px solid ${S.border}` }}><p style={{ margin: 0, fontSize: "12px" }}>{n.msg}</p></div>)}</div>}
            </div>
            {currentUser ? (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <img src={currentUser.avatar} alt={currentUser.name} style={{ width: "32px", height: "32px", borderRadius: "50%", border: `2px solid ${S.gold}` }} />
                <span style={{ color: S.gold, fontSize: "12px" }}>{currentUser.name}</span>
                <button onClick={handleLogout} style={{ background: "none", border: `1px solid ${S.border}`, color: S.muted, borderRadius: "6px", padding: "5px 10px", cursor: "pointer", fontSize: "11px" }}>Logout</button>
                <button onClick={() => setShowCreateModal(true)} style={{ backgroundColor: S.gold, color: S.bg, border: "none", borderRadius: "40px", padding: "8px 16px", fontSize: "12px", cursor: "pointer" }}>✨ Post</button>
              </div>
            ) : (
              <button onClick={() => setShowAuthModal(true)} style={{ backgroundColor: S.gold, color: S.bg, border: "none", borderRadius: "40px", padding: "8px 16px", fontSize: "12px", cursor: "pointer" }}>Login</button>
            )}
          </div>
        </div>
      </header>

      {/* NAVIGATION - CENTERED WITH ALL BUTTONS */}
      <nav style={{ backgroundColor: "#0d0d0d", borderBottom: `1px solid ${S.border}`, padding: "8px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", flexWrap: "wrap" }}>
          
          <button onClick={() => { setCurrentPage("home"); setShowDropdown(false); }} style={{ backgroundColor: currentPage === "home" ? S.gold : "transparent", color: currentPage === "home" ? S.bg : S.muted, border: "none", borderRadius: "8px", padding: "8px 18px", cursor: "pointer", fontSize: "13px", fontWeight: currentPage === "home" ? "bold" : "normal", transition: "all 0.2s" }}>🏠 Home</button>
          
          <button onClick={() => { setCurrentPage("jobs"); setShowDropdown(false); }} style={{ backgroundColor: currentPage === "jobs" ? S.gold : "transparent", color: currentPage === "jobs" ? S.bg : S.muted, border: "none", borderRadius: "8px", padding: "8px 18px", cursor: "pointer", fontSize: "13px", fontWeight: currentPage === "jobs" ? "bold" : "normal", transition: "all 0.2s" }}>💼 Jobs</button>
          
          <button onClick={() => { setCurrentPage("restaurants"); setShowDropdown(false); }} style={{ backgroundColor: currentPage === "restaurants" ? S.gold : "transparent", color: currentPage === "restaurants" ? S.bg : S.muted, border: "none", borderRadius: "8px", padding: "8px 18px", cursor: "pointer", fontSize: "13px", fontWeight: currentPage === "restaurants" ? "bold" : "normal", transition: "all 0.2s" }}>🏪 Restaurants</button>
          
          <button onClick={() => { setCurrentPage("business"); setShowDropdown(false); }} style={{ backgroundColor: currentPage === "business" ? S.gold : "transparent", color: currentPage === "business" ? S.bg : S.muted, border: "none", borderRadius: "8px", padding: "8px 18px", cursor: "pointer", fontSize: "13px", fontWeight: currentPage === "business" ? "bold" : "normal", transition: "all 0.2s" }}>💡 Business Ideas</button>
          
          <button onClick={() => { setCurrentPage("schools"); setShowDropdown(false); }} style={{ backgroundColor: currentPage === "schools" ? S.gold : "transparent", color: currentPage === "schools" ? S.bg : S.muted, border: "none", borderRadius: "8px", padding: "8px 18px", cursor: "pointer", fontSize: "13px", fontWeight: currentPage === "schools" ? "bold" : "normal", transition: "all 0.2s" }}>🏫 Culinary Schools</button>
          
          <button onClick={() => { setCurrentPage("kids"); setShowDropdown(false); }} style={{ backgroundColor: currentPage === "kids" ? S.gold : "transparent", color: currentPage === "kids" ? S.bg : S.muted, border: "none", borderRadius: "8px", padding: "8px 18px", cursor: "pointer", fontSize: "13px", fontWeight: currentPage === "kids" ? "bold" : "normal", transition: "all 0.2s" }}>👶 Kids Nutrition</button>
          
          <button onClick={() => { setCurrentPage("books"); setShowDropdown(false); }} style={{ backgroundColor: currentPage === "books" ? S.gold : "transparent", color: currentPage === "books" ? S.bg : S.muted, border: "none", borderRadius: "8px", padding: "8px 18px", cursor: "pointer", fontSize: "13px", fontWeight: currentPage === "books" ? "bold" : "normal", transition: "all 0.2s" }}>📚 Books</button>
          
          {/* DROPDOWN */}
          <div className="dropdown-container" style={{ position: "relative", display: "inline-block" }}>
            <button onClick={() => setShowDropdown(!showDropdown)} style={{ backgroundColor: showDropdown ? S.gold : "transparent", color: showDropdown ? S.bg : S.muted, border: "none", borderRadius: "8px", padding: "8px 18px", cursor: "pointer", fontSize: "13px", display: "flex", alignItems: "center", gap: "6px", fontWeight: showDropdown ? "bold" : "normal" }}>
              More <span style={{ fontSize: "10px", transform: showDropdown ? "rotate(180deg)" : "rotate(0deg)", display: "inline-block", transition: "transform 0.2s" }}>▼</span>
            </button>
            {showDropdown && (
              <div style={{ position: "absolute", top: "100%", right: 0, marginTop: "6px", backgroundColor: S.card, border: `1px solid ${S.gold}`, borderRadius: "12px", padding: "8px 0", zIndex: 9999, minWidth: "180px", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
                <button onClick={() => { setCurrentPage("equipment"); setShowDropdown(false); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 16px", background: "none", border: "none", color: S.text, cursor: "pointer", fontSize: "13px" }} onMouseEnter={e => e.currentTarget.style.backgroundColor = "#1a1a1a"} onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}>🛒 Equipment Store</button>
                <button onClick={() => { setCurrentPage("donations"); setShowDropdown(false); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 16px", background: "none", border: "none", color: S.text, cursor: "pointer", fontSize: "13px" }} onMouseEnter={e => e.currentTarget.style.backgroundColor = "#1a1a1a"} onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}>❤️ Donate</button>
                <div style={{ height: "1px", backgroundColor: S.border, margin: "6px 12px" }} />
                <button onClick={() => { setCurrentPage("about"); setShowDropdown(false); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 16px", background: "none", border: "none", color: S.text, cursor: "pointer", fontSize: "13px" }} onMouseEnter={e => e.currentTarget.style.backgroundColor = "#1a1a1a"} onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}>📖 About</button>
                <button onClick={() => { setCurrentPage("faq"); setShowDropdown(false); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 16px", background: "none", border: "none", color: S.text, cursor: "pointer", fontSize: "13px" }} onMouseEnter={e => e.currentTarget.style.backgroundColor = "#1a1a1a"} onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}>❓ FAQ</button>
                <button onClick={() => { setCurrentPage("contact"); setShowDropdown(false); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 16px", background: "none", border: "none", color: S.text, cursor: "pointer", fontSize: "13px" }} onMouseEnter={e => e.currentTarget.style.backgroundColor = "#1a1a1a"} onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}>📧 Contact</button>
                <div style={{ height: "1px", backgroundColor: S.border, margin: "6px 12px" }} />
                <button onClick={() => { setCurrentPage("privacy"); setShowDropdown(false); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 16px", background: "none", border: "none", color: S.text, cursor: "pointer", fontSize: "13px" }} onMouseEnter={e => e.currentTarget.style.backgroundColor = "#1a1a1a"} onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}>🔒 Privacy</button>
                <button onClick={() => { setCurrentPage("cookies"); setShowDropdown(false); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 16px", background: "none", border: "none", color: S.text, cursor: "pointer", fontSize: "13px" }} onMouseEnter={e => e.currentTarget.style.backgroundColor = "#1a1a1a"} onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}>🍪 Cookies</button>
                <button onClick={() => { setCurrentPage("terms"); setShowDropdown(false); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 16px", background: "none", border: "none", color: S.text, cursor: "pointer", fontSize: "13px" }} onMouseEnter={e => e.currentTarget.style.backgroundColor = "#1a1a1a"} onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}>⚖️ Terms</button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* CATEGORIES (home only) */}
      {currentPage === "home" && (
        <div style={{ backgroundColor: S.bg, borderBottom: `1px solid ${S.border}`, overflowX: "auto", whiteSpace: "nowrap", padding: "10px 24px" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
            {categories.map(cat => (
              <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} style={{ backgroundColor: selectedCategory === cat.id ? S.gold : "transparent", color: selectedCategory === cat.id ? S.bg : S.gold, border: `1px solid ${S.gold}`, borderRadius: "40px", padding: "7px 16px", cursor: "pointer", fontSize: "12px" }}>{cat.icon} {cat.name}</button>
            ))}
          </div>
        </div>
      )}

      {/* PAGE CONTENT */}
      {currentPage === "home" && (
        <main style={{ maxWidth: "800px", margin: "0 auto", padding: "24px" }}>
          {filteredRecipes.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px", backgroundColor: S.card, borderRadius: "24px", border: `1px solid ${S.gold}` }}>
              <p style={{ color: S.champagne }}>No recipes yet</p>
              <button onClick={() => currentUser ? setShowCreateModal(true) : setShowAuthModal(true)} style={{ marginTop: "16px", backgroundColor: S.gold, color: S.bg, border: "none", borderRadius: "40px", padding: "10px 24px", cursor: "pointer" }}>{currentUser ? "Share Recipe" : "Login to Post"}</button>
            </div>
          ) : (
            filteredRecipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} onLike={handleLike} currentUser={currentUser} />)
          )}
        </main>
      )}

      {currentPage === "restaurants" && <RestaurantsPage />}
      {currentPage === "jobs" && <JobsPage />}
      {currentPage === "equipment" && <EquipmentPage />}
      {currentPage === "business" && <BusinessIdeasPage />}
      {currentPage === "schools" && <CulinarySchoolsPage />}
      {currentPage === "kids" && <KidsNutritionPage />}
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
        <button onClick={() => setCurrentPage("jobs")} style={{ background: "none", border: "none", color: currentPage === "jobs" ? S.gold : S.muted, fontSize: "20px", cursor: "pointer" }}>💼</button>
        <button onClick={() => currentUser ? setShowCreateModal(true) : setShowAuthModal(true)} style={{ background: S.gold, border: "none", color: S.bg, fontSize: "18px", cursor: "pointer", borderRadius: "50%", width: "44px", height: "44px", marginTop: "-10px" }}>✨</button>
        <button onClick={() => setShowNotifications(!showNotifications)} style={{ background: "none", border: "none", color: S.muted, fontSize: "20px", cursor: "pointer" }}>🔔</button>
        <button onClick={() => currentUser ? null : setShowAuthModal(true)} style={{ background: "none", border: "none", color: S.muted, fontSize: "20px", cursor: "pointer" }}>👤</button>
      </div>

      {showCreateModal && currentUser && <CreatePostModal onClose={() => setShowCreateModal(false)} onCreate={handleCreateRecipe} currentUser={currentUser} />}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} onLogin={handleLogin} />}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      {!cookiesAccepted && <CookieBanner onAccept={() => { setCookiesAccepted(true); localStorage.setItem("bde_cookies", "true") }} />}
    </div>
  )
}