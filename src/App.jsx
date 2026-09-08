    import { useState, useEffect, useMemo } from "react";

const COLORS = {
  cream: "#F7F1E8",
  paper: "#FBF8F3",
  harbor: "#2F495C",
  harborLight: "#5A7080",
  bloom: "#F2A79D",
  bloomDeep: "#C97E73",
  sprout: "#5C8567",
  sand: "#E4D8C3",
  sandDeep: "#D8C9AE",
  bark: "#3A342C",
  barkSoft: "#8A8272",
};

const RAW_PRODUCTS = [
  { name: "Kaliteli Kumaştan Tahriş Etmeyen Özellikte %100 Pamuk Çocuk Bebek Banyo Bornozu", img: "https://cdn.dsmcdn.com/ty1950/prod/QC_PREP/20260831/23/7f810c8b-564e-3f78-9770-fae0196a891a/1_org_zoom.jpg", category: "Bornoz" },
  { name: "Tahriş Etmeyen Özellikte %100 Pamuk Emici Kumaştan Kaliteli Bebek Çocuk Banyo Bornozu", img: "https://cdn.dsmcdn.com/ty1951/prod/QC_PREP/20260831/23/fec9bf11-cc43-3162-bbd1-1d640caff409/1_org_zoom.jpg", category: "Bornoz" },
  { name: "Tahriş Etmeyen Kumaştan %100 Pamuk Emici Özellikli Kaliteli Bebek Çocuk Banyo Bornozu", img: "https://cdn.dsmcdn.com/ty1951/prod/QC_PREP/20260831/22/db8a5365-4f6c-31cc-a3e8-047d584ce5d4/1_org_zoom.jpg", category: "Bornoz" },
  { name: "Kaliteli Kumaş %100 Pamuk Bebek Çocuk Banyo Bornozu Emici Özellikli Tahriş Etmez", img: "https://cdn.dsmcdn.com/ty1952/prod/QC_PREP/20260831/22/9b04bfde-a43e-3063-9ce1-ca5c8bbf72b8/1_org_zoom.jpg", category: "Bornoz" },
  { name: "Yeni Sezon Bebek Çocuk Banyo Bornozu %100 Pamuk Müslin Tahriş Etmez Emici Özellikli", img: "https://cdn.dsmcdn.com/ty1951/prod/QC_PREP/20260831/22/14de959b-cd26-3e01-87e5-d96931315567/1_org_zoom.jpg", category: "Bornoz" },
  { name: "Yeni Sezon Bebek Çıt Çıtlı Badi %100 Organik Kumaş Kaliteli GOTS", img: "https://cdn.dsmcdn.com/ty1952/prod/QC_PREP/20260830/20/eb1561a7-7c21-3399-b999-65ee25f5990c/1_org_zoom.jpg", category: "Badi" },
  { name: "Yeni Sezon Bebek Çıt Çıtlı Badi %100 Organik Kumaş Kaliteli GOTS", img: "https://cdn.dsmcdn.com/ty1951/prod/QC_PREP/20260830/20/252f7f07-be09-3770-97fc-68c78df1453c/1_org_zoom.jpg", category: "Badi" },
  { name: "Yeni Doğan Bebek Organik Pamuk Hastane Çıkışı 5'li Set GOTS", img: "https://cdn.dsmcdn.com/ty1949/prod/QC_PREP/20260829/18/6ceab1e8-790e-3596-bb93-5a36a8847bcf/1_org_zoom.jpg", category: "Hastane Çıkışı" },
  { name: "Yeni Doğan Bebek Organik Pamuk Hastane Çıkışı 5'li Set GOTS", img: "https://cdn.dsmcdn.com/ty1948/prod/QC_PREP/20260829/18/bbd5c4f4-dfa3-3083-9d88-65c78c64209f/1_org_zoom.jpg", category: "Hastane Çıkışı" },
  { name: "Hastane Çıkışı Yeni Doğan Bebek %100 Organik Pamuklu Kaliteli 10'lu Set GOTS Sertifika", img: "https://cdn.dsmcdn.com/ty1947/prod/QC_PREP/20260829/18/affc938a-4afa-398f-b15c-d42754db3bc2/1_org_zoom.jpg", category: "Hastane Çıkışı" },
  { name: "Premium Seri Özel Terletmez Koku Yapmaz Fitilli Bebek Patik Çorap", img: "https://cdn.dsmcdn.com/ty1948/prod/QC_PREP/20260825/13/16f3b2b2-203c-378d-8da8-6fbe9ef6208d/1_org_zoom.jpg", category: "Patik" },
  { name: "Yeni Doğan Bebek Organik Pamuk Hastane Çıkışı 5'li Set GOTS", img: "https://cdn.dsmcdn.com/ty1949/prod/QC_PREP/20260829/18/2840cceb-1a14-3900-8eba-42cfd987d989/1_org_zoom.jpg", category: "Hastane Çıkışı" },
  { name: "Yeni Doğan Bebek Organik Pamuk Hastane Çıkışı 5'li Set GOTS", img: "https://cdn.dsmcdn.com/ty1949/prod/QC_PREP/20260829/18/13ca5d96-f4c1-3847-906a-d5bc5aa21898/1_org_zoom.jpg", category: "Hastane Çıkışı" },
  { name: "Yeni Doğan Bebek Organik Pamuk Hastane Çıkışı 5'li Set GOTS", img: "https://cdn.dsmcdn.com/ty1948/prod/QC_PREP/20260829/18/aa407894-04f1-33bc-b4bc-007a03c9a43d/1_org_zoom.jpg", category: "Hastane Çıkışı" },
  { name: "Bebek Hastane Çıkışı 10'lu Set %100 Organik Pamuklu Yeni Doğan GOTS Sertifikalı", img: "https://cdn.dsmcdn.com/ty1948/prod/QC_PREP/20260829/18/8b2b6910-1c89-3b96-9e5f-e9d9221bad84/1_org_zoom.jpg", category: "Hastane Çıkışı" },
  { name: "Yeni Doğan Bebek Organik Pamuk Hastane Çıkışı 5'li Set GOTS", img: "https://cdn.dsmcdn.com/ty1948/prod/QC_PREP/20260829/18/0eda896e-affa-3cc1-9108-8ef4e0a3f92e/1_org_zoom.jpg", category: "Hastane Çıkışı" },
  { name: "Yeni Doğan Bebek Organik Pamuk Hastane Çıkışı 5'li Set GOTS", img: "https://cdn.dsmcdn.com/ty1948/prod/QC_PREP/20260829/18/9cd117c6-7f7b-306a-97e6-798fa820fd50/1_org_zoom.jpg", category: "Hastane Çıkışı" },
  { name: "Premium Seri Özel Terletmez Koku Yapmaz Fitilli Bebek Patik Çorap", img: "https://cdn.dsmcdn.com/ty1948/prod/QC_PREP/20260825/13/4d4082eb-0338-37c6-bcd5-c35c750d11f9/1_org_zoom.jpg", category: "Patik" },
  { name: "Premium Seri Özel Terletmez Koku Yapmaz Fitilli Bebek Patik Çorap", img: "https://cdn.dsmcdn.com/ty1949/prod/QC_PREP/20260825/13/8b25d25c-f84e-3501-a67a-b4a10c63a22e/1_org_zoom.jpg", category: "Patik" },
  { name: "Premium Seri Özel Terletmez Koku Yapmaz Fitilli Bebek Patik Çorap", img: "https://cdn.dsmcdn.com/ty1947/prod/QC_PREP/20260825/13/4955061d-5208-3aa9-9d4f-feaa31312342/1_org_zoom.jpg", category: "Patik" },
  { name: "Yeni Sezon Fitilli Kumaş Cepli Şort İkili Çocuk Takım", img: "https://cdn.dsmcdn.com/ty1948/prod/QC_PREP/20260825/13/882d41ea-9de4-3160-81b9-7629fc37b2ba/1_org_zoom.jpg", category: "Takım" },
  { name: "Premium Seri İki Kat Müslin Kumaşlı Bebek Puset Örtüsü Yastık Takımı", img: "https://cdn.dsmcdn.com/ty1949/prod/QC_PREP/20260825/13/5deb1f34-74b8-3e0c-8961-61f0dffa2698/1_org_zoom.jpg", category: "Ev Tekstili" },
  { name: "Premium Seri Özel Terletmez Koku Yapmaz Fitilli Bebek Patik Çorap", img: "https://cdn.dsmcdn.com/ty1947/prod/QC_PREP/20260825/13/a9766000-ddcc-34dc-a6c3-d3fc428dec67/1_org_zoom.jpg", category: "Patik" },
  { name: "Premium Seri Özel Terletmez Koku Yapmaz Fitilli Bebek Patik Çorap", img: "https://cdn.dsmcdn.com/ty1947/prod/QC_PREP/20260825/13/bec096c5-27dc-3106-9133-d4d5c2164461/1_org_zoom.jpg", category: "Patik" },
  { name: "Premium Seri İki Kat Müslin Kumaşlı Bebek Puset Örtüsü Yastık Takımı", img: "https://cdn.dsmcdn.com/ty1948/prod/QC_PREP/20260825/13/b801b3c1-6485-31cc-bd08-731681cb61c4/1_org_zoom.jpg", category: "Ev Tekstili" },
  { name: "Premium Seri İki Kat Müslin Kumaşlı Bebek Puset Örtüsü Yastık Takımı", img: "https://cdn.dsmcdn.com/ty1949/prod/QC_PREP/20260825/13/f2741eb8-0bc4-3d9e-8879-4c12e57f330d/1_org_zoom.jpg", category: "Ev Tekstili" },
  { name: "Yeni Sezon Ekru Ceylan Desenli %100 Pamuk Bebek 5'li Set Hastane Çıkışı", img: "https://cdn.dsmcdn.com/ty1947/prod/QC_PREP/20260825/13/ae2b54e8-01e1-376a-97c4-1cb136c18257/1_org_zoom.jpg", category: "Hastane Çıkışı" },
  { name: "Premium Seri İki Kat Müslin Kumaşlı Bebek Puset Örtüsü Yastık Takımı", img: "https://cdn.dsmcdn.com/ty1949/prod/QC_PREP/20260825/13/f5ecc2b1-9741-3e0e-ab5f-50254efbb77d/1_org_zoom.jpg", category: "Ev Tekstili" },
  { name: "Premium Seri Özel Terletmez Koku Yapmaz Fitilli Bebek Patik Çorap", img: "https://cdn.dsmcdn.com/ty1949/prod/QC_PREP/20260825/13/4064891d-51c8-3e1c-b281-27dc7e4783a2/1_org_zoom.jpg", category: "Patik" },
  { name: "Yeni Sezon Fitilli Kumaş Cepli Şort İkili Çocuk Takım", img: "https://cdn.dsmcdn.com/ty1949/prod/QC_PREP/20260825/13/c952c12d-3f44-306c-90dc-c88d3a3a1ba5/1_org_zoom.jpg", category: "Takım" },
  { name: "Yeni Sezon Fitilli Kumaş Cepli Şort İkili Çocuk Takım", img: "https://cdn.dsmcdn.com/ty1947/prod/QC_PREP/20260825/13/5938b9c7-b07a-3a45-bc70-9504317b3757/1_org_zoom.jpg", category: "Takım" },
  { name: "Premium Seri İki Kat Müslin Kumaşlı Bebek Puset Örtüsü Yastık Takımı", img: "https://cdn.dsmcdn.com/ty1949/prod/QC_PREP/20260825/13/311c766d-8cb3-3f27-bf41-8a1918e3a40d/1_org_zoom.jpg", category: "Ev Tekstili" },
  { name: "Yeni Sezon Bebek Çocuk Gökkuşağı Bulut Güneş Desenli %100 Pamuk Çıtçıtlı Salopet", img: "https://cdn.dsmcdn.com/ty1947/prod/QC_PREP/20260825/13/ffccec07-eba0-3c8f-b4fc-6245ef34d2f5/1_org_zoom.jpg", category: "Badi" },
  { name: "Premium Seri Özel Terletmez Koku Yapmaz Fitilli Bebek Patik Çorap", img: "https://cdn.dsmcdn.com/ty1949/prod/QC_PREP/20260825/13/73e14ad7-2ed9-37a6-be99-7f80e4f5d08d/1_org_zoom.jpg", category: "Patik" },
];

const PRODUCTS = RAW_PRODUCTS.map((p, i) => ({ ...p, id: i }));
const FEATURED_IDS = [0, 5, 7, 10, 20, 30];
const CATEGORIES = ["Tümü", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];

const ICONS = {
  leaf: "M20 5c-7 0-13 4-15 11-1 3 0 6 2 6 7 0 13-4 15-11 1-3 0-6-2-6zM6 16c3-6 7-9 13-10",
  truck: "M2 8h11v9H2zM13 11h4l3 3v3h-7zM6 20a2 2 0 100-4 2 2 0 000 4zM17 20a2 2 0 100-4 2 2 0 000 4z",
  shield: "M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5z",
  refresh: "M4 12a8 8 0 0114-5.3M20 12a8 8 0 01-14 5.3M18 4v4h-4M6 20v-4h4",
};

function Icon({ path, size = 22, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  );
}

function useGoogleFont() {
  useEffect(() => {
    if (document.getElementById("pofidoo-font")) return;
    const link = document.createElement("link");
    link.id = "pofidoo-font";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap";
    document.head.appendChild(link);
  }, []);
}

function Logo({ size = 34 }) {
  return (
    <img
      src="/logo.png"
      alt="pofidoo baby"
      style={{ height: size * 2.4, display: "block" }}
    />
  );
}

function money(n) {
  if (n === "" || n === null || n === undefined || isNaN(n)) return null;
  return Number(n).toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " ₺";
}

function ProductCard({ p, price, onPriceChange, onAdd, big }) {
  return (
    <div className="pf-card" style={{ border: `1px solid ${COLORS.sand}`, borderRadius: 14, padding: 14, display: "flex", flexDirection: "column", background: COLORS.paper, transition: "box-shadow 160ms ease, transform 160ms ease" }}>
      <div style={{ position: "relative", marginBottom: 12 }}>
        <img src={p.img} alt={p.name} style={{ width: "100%", aspectRatio: big ? "4/5" : "3/4", objectFit: "cover", borderRadius: 10, display: "block" }} />
        <span style={{ position: "absolute", top: 10, left: 10, background: "rgba(247,241,232,0.92)", color: COLORS.sprout, fontSize: 11, padding: "4px 10px", borderRadius: 20, fontWeight: 500 }}>
          {p.category}
        </span>
      </div>
      <div className="pf-clamp2" style={{ fontSize: 14, lineHeight: 1.45, color: COLORS.bark, marginBottom: 12, minHeight: 40 }}>
        {p.name}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, border: `1px solid ${COLORS.sand}`, borderRadius: 8, padding: "8px 12px", background: "#fff" }}>
        <span style={{ fontSize: 14, color: COLORS.bloomDeep, fontWeight: 600 }}>₺</span>
        <input
          value={price || ""}
          onChange={(e) => onPriceChange(e.target.value.replace(/[^0-9.,]/g, ""))}
          placeholder="Fiyat girin"
          style={{ border: "none", background: "transparent", fontFamily: "Poppins, sans-serif", fontSize: 15, fontWeight: 600, color: COLORS.bloomDeep, width: "100%", outline: "none" }}
        />
      </div>
      <button className="pf-btn" onClick={onAdd} style={{ background: COLORS.harbor, border: "none", color: COLORS.cream, borderRadius: 8, padding: "10px 0", fontFamily: "Poppins, sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "background 150ms ease" }}>
        Sepete ekle
      </button>
    </div>
  );
}

export default function PofidooStore() {
  useGoogleFont();
  const [category, setCategory] = useState("Tümü");
  const [prices, setPrices] = useState({});
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [view, setView] = useState("shop");
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", city: "" });
  const [formErrors, setFormErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  const filtered = useMemo(
    () => (category === "Tümü" ? PRODUCTS : PRODUCTS.filter((p) => p.category === category)),
    [category]
  );
  const featured = useMemo(() => FEATURED_IDS.map((id) => PRODUCTS[id]), []);

  const cartItems = Object.entries(cart)
    .filter(([, qty]) => qty > 0)
    .map(([id, qty]) => ({ product: PRODUCTS[id], qty, price: prices[id] }));

  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
  const missingPriceCount = cartItems.filter((i) => !i.price).length;
  const subtotal = cartItems.reduce((s, i) => s + (i.price ? Number(i.price) * i.qty : 0), 0);

  function addToCart(id) {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
    setCartOpen(true);
    const p = PRODUCTS[id];
    if (typeof window.fbq === "function") {
      window.fbq("track", "AddToCart", {
        content_name: p.name,
        content_category: p.category,
        content_ids: [String(id)],
        content_type: "product",
        value: prices[id] ? Number(prices[id]) : 0,
        currency: "TRY",
      });
    }
    if (typeof window.gtag === "function") {
      window.gtag("event", "add_to_cart", {
        currency: "TRY",
        value: prices[id] ? Number(prices[id]) : 0,
        items: [{ item_name: p.name, item_category: p.category }],
      });
    }
  }
  function changeQty(id, delta) {
    setCart((c) => ({ ...c, [id]: Math.max(0, (c[id] || 0) + delta) }));
  }
  function updatePrice(id, val) {
    setPrices((p) => ({ ...p, [id]: val }));
  }

  function validateAndSubmit(e) {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = "Ad soyad girin";
    if (!form.phone.trim()) errs.phone = "Telefon numarası girin";
    if (!form.address.trim()) errs.address = "Teslimat adresi girin";
    if (!form.city.trim()) errs.city = "Şehir girin";
    setFormErrors(errs);
    if (Object.keys(errs).length === 0) {
      setOrderPlaced(true);
      if (typeof window.fbq === "function") {
        window.fbq("track", "Lead", {
          value: subtotal,
          currency: "TRY",
          num_items: cartCount,
        });
      }
      if (typeof window.gtag === "function") {
        window.gtag("event", "generate_lead", {
          currency: "TRY",
          value: subtotal,
        });
      }
    }
  }

  const inputStyle = {
    width: "100%",
    padding: "11px 14px",
    borderRadius: 8,
    border: `1px solid ${COLORS.sand}`,
    background: "#fff",
    fontFamily: "Poppins, sans-serif",
    fontSize: 14,
    color: COLORS.bark,
    outline: "none",
    boxSizing: "border-box",
  };

  const features = [
    { icon: ICONS.leaf, title: "GOTS organik sertifikalı", body: "Tüm kumaşlar bağımsız denetimden geçer" },
    { icon: ICONS.truck, title: "Bursa'dan hızlı kargo", body: "Siparişler 1-2 iş günü içinde yola çıkar" },
    { icon: ICONS.shield, title: "Güvenli ödeme", body: "Kart bilgileriniz saklanmaz, şifreli işlem" },
  ];

  return (
    <div style={{ fontFamily: "Poppins, sans-serif", background: COLORS.cream, color: COLORS.bark, minHeight: "100%" }}>
      <style>{`
        .pf-clamp2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
        .pf-card:hover{box-shadow:0 10px 24px rgba(58,52,44,0.10);transform:translateY(-2px)}
        .pf-btn:hover{background:#243a49}
        .pf-navlink:hover{color:${COLORS.bloomDeep}}
        .pf-feat-row{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}
        .pf-hero-grid{display:grid;grid-template-columns:1.1fr 1fr;gap:48px}
        .pf-checkout-grid{display:grid;grid-template-columns:1.3fr 1fr;gap:32px;align-items:start}
        .pf-marquee-track{display:flex;width:max-content;animation:pf-scroll 22s linear infinite}
        @keyframes pf-scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .pf-step-num{font-size:13px;font-weight:700;color:${COLORS.bloomDeep};letter-spacing:0.05em}
        @media (max-width:760px){
          .pf-feat-row{grid-template-columns:1fr}
          .pf-hero-grid{grid-template-columns:1fr}
          .pf-checkout-grid{grid-template-columns:1fr}
        }
      `}</style>

      <div style={{ background: COLORS.harbor, color: COLORS.cream, textAlign: "center", fontSize: 12.5, padding: "8px 12px" }}>
        Bursa'dan tüm Türkiye'ye kargo &nbsp;·&nbsp; GOTS sertifikalı %100 organik pamuk
      </div>

      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 40px", borderBottom: `1px solid ${COLORS.sand}`, position: "sticky", top: 0, background: COLORS.cream, zIndex: 20 }}>
        <button onClick={() => setView("shop")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <Logo />
        </button>
        <nav style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <button className="pf-navlink" onClick={() => setView("shop")} style={{ background: "none", border: "none", fontFamily: "Poppins, sans-serif", fontSize: 14, color: COLORS.harbor, cursor: "pointer" }}>
            Koleksiyon
          </button>
          <a className="pf-navlink" href="#oncikanlar" style={{ fontSize: 14, color: COLORS.harbor, textDecoration: "none" }}>Öne çıkanlar</a>
          <a className="pf-navlink" href="#hakkimizda" style={{ fontSize: 14, color: COLORS.harbor, textDecoration: "none" }}>Hakkımızda</a>
          <button
            onClick={() => setCartOpen(true)}
            style={{ position: "relative", background: COLORS.harbor, color: COLORS.cream, border: "none", borderRadius: 20, padding: "9px 20px", fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
          >
            Sepet
            <span style={{ background: COLORS.bloom, color: COLORS.harbor, borderRadius: 12, minWidth: 20, height: 20, fontSize: 12, display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
              {cartCount}
            </span>
          </button>
        </nav>
      </header>

      {view === "shop" && (
        <>
          <section className="pf-hero-grid" style={{ padding: "64px 40px 48px", alignItems: "center", maxWidth: 1180, margin: "0 auto" }}>
            <div>
              <div style={{ display: "inline-block", background: COLORS.paper, border: `1px solid ${COLORS.sand}`, borderRadius: 20, padding: "6px 16px", fontSize: 12.5, color: COLORS.sprout, fontWeight: 600, marginBottom: 18 }}>
                Yenidoğan & Bebek Giyim · Organik
              </div>
              <h1 style={{ fontSize: 46, lineHeight: 1.14, fontWeight: 700, color: COLORS.harbor, margin: "0 0 18px" }}>
                Yumuşacık <span style={{ fontStyle: "italic", color: COLORS.bloomDeep }}>Başlangıçlar</span>
              </h1>
              <p style={{ fontSize: 16, lineHeight: 1.65, color: COLORS.harborLight, maxWidth: 400, margin: "0 0 24px" }}>
                Yeni doğan ve bebek giyimde GOTS sertifikalı organik pamuk. Her parça, hassas ciltler düşünülerek seçildi ve elde kontrol edildi.
              </p>
              <button
                onClick={() => document.getElementById("katalog")?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: COLORS.harbor, color: COLORS.cream, border: "none", borderRadius: 24, padding: "15px 30px", fontSize: 15, fontWeight: 600, fontFamily: "Poppins, sans-serif", cursor: "pointer" }}
              >
                Koleksiyona göz at
              </button>
            </div>
            <div style={{ position: "relative", height: 320 }}>
              <img src={PRODUCTS[0].img} alt="" style={{ position: "absolute", width: 155, height: 195, objectFit: "cover", borderRadius: 14, left: 6, top: 6, transform: "rotate(-6deg)", boxShadow: "0 16px 30px rgba(58,52,44,0.18)" }} />
              <img src={PRODUCTS[5].img} alt="" style={{ position: "absolute", width: 155, height: 195, objectFit: "cover", borderRadius: 14, left: 140, top: 46, transform: "rotate(3deg)", boxShadow: "0 16px 30px rgba(58,52,44,0.18)" }} />
              <img src={PRODUCTS[7].img} alt="" style={{ position: "absolute", width: 155, height: 195, objectFit: "cover", borderRadius: 14, left: 276, top: 14, transform: "rotate(-3deg)", boxShadow: "0 16px 30px rgba(58,52,44,0.18)" }} />
              <div style={{ position: "absolute", bottom: 20, left: 20, right: 40, height: 18, background: "radial-gradient(ellipse at center, rgba(58,52,44,0.14), transparent 70%)" }} />
            </div>
          </section>

          <div style={{ overflow: "hidden", borderTop: `1px solid ${COLORS.sand}`, borderBottom: `1px solid ${COLORS.sand}`, background: COLORS.paper, padding: "14px 0" }}>
            <div className="pf-marquee-track">
              {[0, 1].map((rep) => (
                <div key={rep} style={{ display: "flex", flexShrink: 0 }}>
                  {["GOTS Sertifikalı", "%100 Organik Pamuk", "Bursa Üretimi", "Elde Kontrol Edilmiş", "Hızlı Kargo", "Hassas Ciltler İçin"].map((t) => (
                    <span key={t} style={{ display: "inline-flex", alignItems: "center", fontSize: 13.5, color: COLORS.harbor, fontWeight: 500, padding: "0 24px", whiteSpace: "nowrap" }}>
                      {t} <span style={{ color: COLORS.bloom, marginLeft: 24 }}>✦</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <section style={{ borderBottom: `1px solid ${COLORS.sand}`, padding: "36px 40px", maxWidth: 1180, margin: "0 auto" }}>
            <div className="pf-feat-row">
              {features.map((f) => (
                <div key={f.title} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <Icon path={f.icon} color={COLORS.sprout} />
                  <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.harbor }}>{f.title}</div>
                  <div style={{ fontSize: 12.5, color: COLORS.harborLight, lineHeight: 1.5 }}>{f.body}</div>
                </div>
              ))}
            </div>
          </section>

          <section style={{ padding: "48px 40px", maxWidth: 1180, margin: "0 auto" }}>
            <h2 style={{ fontSize: 24, color: COLORS.harbor, marginBottom: 32, textAlign: "center" }}>3 adımda kapına gelsin</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 28 }}>
              {[
                { n: "01", title: "Ürünü Seç", body: "GOTS sertifikalı koleksiyondan sana uygun parçayı bul." },
                { n: "02", title: "Sepete Ekle", body: "Beğendiklerini sepete ekle, bilgilerini gir." },
                { n: "03", title: "Kapında Teslim Al", body: "Bursa'dan 1-2 iş günü içinde kargoya verilir." },
              ].map((s) => (
                <div key={s.n}>
                  <div className="pf-step-num">{s.n}</div>
                  <div style={{ fontSize: 17, fontWeight: 600, color: COLORS.harbor, margin: "6px 0" }}>{s.title}</div>
                  <div style={{ fontSize: 13.5, color: COLORS.harborLight, lineHeight: 1.6 }}>{s.body}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="oncikanlar" style={{ padding: "48px 40px 8px", maxWidth: 1180, margin: "0 auto" }}>
            <h2 style={{ fontSize: 24, color: COLORS.harbor, marginBottom: 20 }}>Öne çıkanlar</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 20 }}>
              {featured.map((p) => (
                <ProductCard
                  key={p.id}
                  p={p}
                  big
                  price={prices[p.id]}
                  onPriceChange={(v) => updatePrice(p.id, v)}
                  onAdd={() => addToCart(p.id)}
                />
              ))}
            </div>
          </section>

          <div id="katalog" style={{ padding: "48px 40px 12px", maxWidth: 1180, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <h2 style={{ fontSize: 24, color: COLORS.harbor, margin: 0 }}>Tüm koleksiyon</h2>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  style={{
                    padding: "8px 18px",
                    borderRadius: 20,
                    border: `1px solid ${category === c ? COLORS.harbor : COLORS.sand}`,
                    background: category === c ? COLORS.harbor : "transparent",
                    color: category === c ? COLORS.cream : COLORS.harbor,
                    fontFamily: "Poppins, sans-serif",
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <section style={{ padding: "24px 40px 80px", maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 22 }}>
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                p={p}
                price={prices[p.id]}
                onPriceChange={(v) => updatePrice(p.id, v)}
                onAdd={() => addToCart(p.id)}
              />
            ))}
          </section>

          <section style={{ padding: "16px 40px 56px", maxWidth: 1180, margin: "0 auto" }}>
            <h2 style={{ fontSize: 24, color: COLORS.harbor, marginBottom: 20, textAlign: "center" }}>Kategorilerimiz</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
              <div
                onClick={() => { setCategory("Hastane Çıkışı"); setView("shop"); setTimeout(() => document.getElementById("katalog")?.scrollIntoView({ behavior: "smooth" }), 50); }}
                style={{ borderRadius: 14, overflow: "hidden", position: "relative", cursor: "pointer" }}
              >
                <img src={PRODUCTS[7].img} alt="" style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(47,73,92,0.75), transparent 60%)", display: "flex", alignItems: "flex-end", padding: 20 }}>
                  <div>
                    <div style={{ color: COLORS.cream, fontSize: 19, fontWeight: 700 }}>Yenidoğan Setleri</div>
                    <div style={{ color: "rgba(247,241,232,0.85)", fontSize: 13 }}>GOTS sertifikalı hastane çıkışı setleri</div>
                  </div>
                </div>
              </div>
              <div
                onClick={() => { setCategory("Badi"); setView("shop"); setTimeout(() => document.getElementById("katalog")?.scrollIntoView({ behavior: "smooth" }), 50); }}
                style={{ borderRadius: 14, overflow: "hidden", position: "relative", cursor: "pointer" }}
              >
                <img src={PRODUCTS[5].img} alt="" style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(47,73,92,0.75), transparent 60%)", display: "flex", alignItems: "flex-end", padding: 20 }}>
                  <div>
                    <div style={{ color: COLORS.cream, fontSize: 19, fontWeight: 700 }}>Organik Giyim</div>
                    <div style={{ color: "rgba(247,241,232,0.85)", fontSize: 13 }}>%100 pamuklu, günlük kullanım için rahat</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section style={{ padding: "8px 40px 56px", maxWidth: 1180, margin: "0 auto" }}>
            <h2 style={{ fontSize: 24, color: COLORS.harbor, marginBottom: 24, textAlign: "center" }}>Neden pofidoo baby?</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
              {[
                { img: PRODUCTS[0].img, title: "GOTS sertifikalı %100 organik pamuk", tag: "Organik Sertifika" },
                { img: PRODUCTS[5].img, title: "Hassas ciltler için elde kontrol edildi", tag: "Kalite Kontrolü" },
                { img: PRODUCTS[7].img, title: "Bursa'dan Türkiye geneline hızlı kargo", tag: "Hızlı Teslimat" },
                { img: PRODUCTS[0].img, title: "Kart bilgileri saklanmaz, güvenli ödeme", tag: "Güvenli Ödeme" },
                { img: PRODUCTS[5].img, title: "Yenidoğandan başlayan geniş beden seçenekleri", tag: "Geniş Beden Aralığı" },
                { img: PRODUCTS[7].img, title: "Uzun ömürlü, kaliteli dikiş işçiliği", tag: "Dayanıklı Kalite" },
              ].map((v, i) => (
                <div key={i} style={{ border: `1px solid ${COLORS.sand}`, borderRadius: 14, padding: 16, background: COLORS.paper }}>
                  <img src={v.img} alt="" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", borderRadius: 8, marginBottom: 12 }} />
                  <div style={{ fontSize: 12, color: COLORS.sprout, fontWeight: 600, marginBottom: 6 }}>{v.tag}</div>
                  <div style={{ fontSize: 14, color: COLORS.bark, lineHeight: 1.4 }}>{v.title}</div>
                </div>
              ))}
            </div>
          </section>

          <section style={{ padding: "8px 40px 56px", maxWidth: 760, margin: "0 auto" }}>
            <h2 style={{ fontSize: 24, color: COLORS.harbor, marginBottom: 24, textAlign: "center" }}>Sık Sorular</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { q: "Ürünler organik mi?", a: "Evet, tüm ürünlerimiz GOTS sertifikalı %100 organik pamuktan üretiliyor ve hassas bebek cildi için özenle seçiliyor." },
                { q: "Kargo ne kadar sürede gelir?", a: "Siparişler Bursa'dan 1-2 iş günü içinde kargoya verilir, Türkiye geneline gönderim yapılıyor." },
                { q: "Ödeme güvenli mi?", a: "Kart bilgileriniz saklanmaz, tüm ödeme işlemleri şifreli olarak gerçekleştirilir." },
                { q: "Doğru bedeni nasıl seçerim?", a: "Yaşa göre genel beden aralığı: Yenidoğan (0-1 ay) 50-56cm, 1-3 ay 56-62cm, 3-6 ay 62-68cm, 6-9 ay 68-74cm. Şüphede kaldığınızda bir üst bedeni tercih edin." },
              ].map((f, i) => (
                <div key={i} style={{ border: `1px solid ${COLORS.sand}`, borderRadius: 10, padding: "16px 20px", background: COLORS.paper }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.harbor, marginBottom: 6 }}>{f.q}</div>
                  <div style={{ fontSize: 13.5, color: COLORS.harborLight, lineHeight: 1.6 }}>{f.a}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="hakkimizda" style={{ background: COLORS.harbor, color: COLORS.cream, padding: "56px 40px", textAlign: "center" }}>
            <h2 style={{ fontSize: 26, marginBottom: 14, fontWeight: 700 }}>Bursa'da, sevgiyle üretiliyor</h2>
            <p style={{ maxWidth: 560, margin: "0 auto", fontSize: 15, lineHeight: 1.7, color: "rgba(247,241,232,0.85)" }}>
              pofidoo baby, GOTS sertifikalı organik pamuktan üretilen yenidoğan ve bebek giyimini doğrudan atölyeden ailelere ulaştırıyor. Her ürün, hassas bebek cildi göz önünde bulundurularak seçiliyor.
            </p>
          </section>

          <section style={{ background: COLORS.paper, padding: "56px 40px", textAlign: "center" }}>
            <h2 style={{ fontSize: 26, color: COLORS.harbor, marginBottom: 20, fontWeight: 700 }}>Yumuşacık Koleksiyonu Keşfedin</h2>
            <button
              onClick={() => document.getElementById("katalog")?.scrollIntoView({ behavior: "smooth" })}
              style={{ background: COLORS.harbor, color: COLORS.cream, border: "none", borderRadius: 24, padding: "14px 30px", fontSize: 15, fontWeight: 600, fontFamily: "Poppins, sans-serif", cursor: "pointer" }}
            >
              Alışverişe Başla
            </button>
          </section>
        </>
      )}

      {view === "checkout" && !orderPlaced && (
        <section style={{ maxWidth: 920, margin: "0 auto", padding: "48px 40px 80px" }}>
          <div style={{ display: "flex", gap: 20, marginBottom: 32, fontSize: 13, color: COLORS.harborLight }}>
            <span>1. Sepet</span>
            <span style={{ color: COLORS.harbor, fontWeight: 600 }}>2. Bilgiler</span>
            <span>3. Onay</span>
          </div>
          <div className="pf-checkout-grid">
            <div>
              <h2 style={{ fontSize: 26, color: COLORS.harbor, marginBottom: 20 }}>Teslimat bilgileri</h2>
              <form onSubmit={validateAndSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <input style={inputStyle} placeholder="Ad soyad" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  {formErrors.name && <div style={{ color: "#B4453A", fontSize: 12, marginTop: 4 }}>{formErrors.name}</div>}
                </div>
                <div>
                  <input style={inputStyle} placeholder="Telefon" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  {formErrors.phone && <div style={{ color: "#B4453A", fontSize: 12, marginTop: 4 }}>{formErrors.phone}</div>}
                </div>
                <input style={inputStyle} placeholder="E-posta (opsiyonel)" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <div>
                  <input style={inputStyle} placeholder="Teslimat adresi" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                  {formErrors.address && <div style={{ color: "#B4453A", fontSize: 12, marginTop: 4 }}>{formErrors.address}</div>}
                </div>
                <div>
                  <input style={inputStyle} placeholder="Şehir" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                  {formErrors.city && <div style={{ color: "#B4453A", fontSize: 12, marginTop: 4 }}>{formErrors.city}</div>}
                </div>
                <button type="submit" style={{ background: COLORS.harbor, color: COLORS.cream, border: "none", borderRadius: 24, padding: "14px 0", fontSize: 15, fontWeight: 600, fontFamily: "Poppins, sans-serif", cursor: "pointer", marginTop: 8 }}>
                  Siparişi önizle
                </button>
                <button type="button" onClick={() => setView("shop")} style={{ background: "none", border: "none", color: COLORS.harborLight, fontSize: 13, cursor: "pointer", padding: 8 }}>
                  Alışverişe geri dön
                </button>
              </form>
            </div>

            <div style={{ background: COLORS.paper, border: `1px solid ${COLORS.sand}`, borderRadius: 14, padding: 20, position: "sticky", top: 90 }}>
              <div style={{ fontSize: 15, color: COLORS.harbor, fontWeight: 600, marginBottom: 14 }}>Sipariş özeti</div>
              {cartItems.map((i) => (
                <div key={i.product.id} style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                  <img src={i.product.img} alt="" style={{ width: 44, height: 54, objectFit: "cover", borderRadius: 6 }} />
                  <div style={{ flex: 1, fontSize: 12.5, color: COLORS.bark }}>
                    <div className="pf-clamp2" style={{ marginBottom: 2 }}>{i.product.name}</div>
                    <div style={{ color: COLORS.harborLight }}>{i.qty} adet</div>
                  </div>
                  <div style={{ fontSize: 13, color: COLORS.bloomDeep, fontWeight: 600, whiteSpace: "nowrap" }}>
                    {i.price ? money(i.price * i.qty) : "—"}
                  </div>
                </div>
              ))}
              <div style={{ borderTop: `1px solid ${COLORS.sand}`, marginTop: 4, paddingTop: 12, display: "flex", justifyContent: "space-between", fontWeight: 700, color: COLORS.harbor, fontSize: 15 }}>
                <span>Toplam</span>
                <span>{money(subtotal) || "0,00 ₺"}</span>
              </div>
              <div style={{ fontSize: 12, color: COLORS.harborLight, background: "rgba(242,167,157,0.18)", borderRadius: 8, padding: 12, marginTop: 14 }}>
                Bu bir önizlemedir. Gerçek ödeme altyapısı bağlandığında bu adım canlı ödemeye dönüşecek.
              </div>
            </div>
          </div>
        </section>
      )}

      {view === "checkout" && orderPlaced && (
        <section style={{ maxWidth: 500, margin: "0 auto", padding: "80px 32px", textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 16, color: COLORS.bloom }}>♥</div>
          <h2 style={{ fontSize: 24, color: COLORS.harbor, marginBottom: 12 }}>Sipariş önizlemesi hazır</h2>
          <p style={{ color: COLORS.harborLight, fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
            {form.name} adına {cartCount} ürünlük sipariş kaydedildi. Bu bir demo önizlemesidir — gerçek ödeme altyapısı bağlanana kadar canlı sipariş oluşmaz.
          </p>
          <button
            onClick={() => { setOrderPlaced(false); setView("shop"); setCart({}); }}
            style={{ background: COLORS.harbor, color: COLORS.cream, border: "none", borderRadius: 24, padding: "12px 26px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
          >
            Alışverişe devam et
          </button>
        </section>
      )}

      {cartOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(58,52,44,0.35)", zIndex: 30, display: "flex", justifyContent: "flex-end" }} onClick={() => setCartOpen(false)}>
          <div style={{ width: 400, maxWidth: "90vw", background: COLORS.cream, height: "100%", padding: 26, overflowY: "auto", display: "flex", flexDirection: "column" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
              <h3 style={{ fontSize: 18, color: COLORS.harbor, margin: 0 }}>Sepetiniz</h3>
              <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", fontSize: 20, color: COLORS.harborLight, cursor: "pointer" }}>×</button>
            </div>

            {cartItems.length === 0 && <p style={{ color: COLORS.harborLight, fontSize: 14 }}>Sepetiniz henüz boş.</p>}

            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
              {cartItems.map((i) => (
                <div key={i.product.id} style={{ display: "flex", gap: 12, borderBottom: `1px solid ${COLORS.sand}`, paddingBottom: 14 }}>
                  <img src={i.product.img} alt="" style={{ width: 58, height: 70, objectFit: "cover", borderRadius: 8 }} />
                  <div style={{ flex: 1 }}>
                    <div className="pf-clamp2" style={{ fontSize: 13, color: COLORS.bark, marginBottom: 6 }}>{i.product.name}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <button onClick={() => changeQty(i.product.id, -1)} style={{ width: 24, height: 24, borderRadius: "50%", border: `1px solid ${COLORS.sand}`, background: "#fff", cursor: "pointer" }}>−</button>
                      <span style={{ fontSize: 13 }}>{i.qty}</span>
                      <button onClick={() => changeQty(i.product.id, 1)} style={{ width: 24, height: 24, borderRadius: "50%", border: `1px solid ${COLORS.sand}`, background: "#fff", cursor: "pointer" }}>+</button>
                      <span style={{ marginLeft: "auto", fontSize: 13, color: COLORS.bloomDeep, fontWeight: 600 }}>
                        {i.price ? money(i.price * i.qty) : "fiyat yok"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {cartItems.length > 0 && (
              <div style={{ marginTop: 20 }}>
                {missingPriceCount > 0 && (
                  <div style={{ fontSize: 12, color: COLORS.bloomDeep, marginBottom: 10 }}>
                    {missingPriceCount} üründe fiyat girilmedi, toplam eksik hesaplanıyor.
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, fontWeight: 600, color: COLORS.harbor, marginBottom: 14 }}>
                  <span>Ara toplam</span>
                  <span>{money(subtotal) || "0,00 ₺"}</span>
                </div>
                <button
                  onClick={() => {
                    setCartOpen(false);
                    setView("checkout");
                    if (typeof window.fbq === "function") {
                      window.fbq("track", "InitiateCheckout", {
                        value: subtotal,
                        currency: "TRY",
                        num_items: cartCount,
                      });
                    }
                    if (typeof window.gtag === "function") {
                      window.gtag("event", "begin_checkout", {
                        currency: "TRY",
                        value: subtotal,
                      });
                    }
                  }}
                  style={{ width: "100%", background: COLORS.harbor, color: COLORS.cream, border: "none", borderRadius: 24, padding: "13px 0", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
                >
                  Ödemeye geç
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <footer style={{ borderTop: `1px solid ${COLORS.sand}`, background: COLORS.paper }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "48px 40px", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 40 }}>
          <div>
            <Logo />
            <p style={{ fontSize: 13, color: COLORS.harborLight, lineHeight: 1.7, marginTop: 14, maxWidth: 280 }}>
              Yenidoğan ve bebek giyimde GOTS sertifikalı organik pamuk. Bursa'dan tüm Türkiye'ye gönderim yapıyoruz.
            </p>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.harbor, marginBottom: 12 }}>Koleksiyon</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {CATEGORIES.filter((c) => c !== "Tümü").map((c) => (
                <button key={c} onClick={() => { setCategory(c); setView("shop"); }} style={{ background: "none", border: "none", padding: 0, textAlign: "left", fontSize: 13, color: COLORS.harborLight, cursor: "pointer" }}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.harbor, marginBottom: 12 }}>İletişim</div>
            <div style={{ fontSize: 13, color: COLORS.harborLight, lineHeight: 2 }}>
              Instagram: @pofidoobaby<br />
              Trendyol mağazamız
            </div>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${COLORS.sand}`, textAlign: "center", padding: "16px", fontSize: 12, color: COLORS.harborLight }}>
          © 2026 pofidoo baby
        </div>
      </footer>
    </div>
  );
}

    
