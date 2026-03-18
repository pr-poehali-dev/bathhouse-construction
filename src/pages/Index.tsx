import { useState } from "react";
import Icon from "@/components/ui/icon";

const NAV_LINKS = [
  { label: "Главная", href: "#home" },
  { label: "Услуги", href: "#services" },
  { label: "Проекты", href: "#projects" },
  { label: "Галерея", href: "#gallery" },
  { label: "Калькулятор", href: "#calculator" },
  { label: "Контакты", href: "#contacts" },
];

const SERVICES = [
  {
    icon: "TreePine",
    title: "Бани из бревна",
    desc: "Ручная рубка из отборной сосны и ели. Срок службы — более 80 лет. Сохраняют природный аромат и тепло.",
    price: "от 480 000 ₽",
  },
  {
    icon: "Layers",
    title: "Бани из бруса",
    desc: "Профилированный и клеёный брус. Быстрый монтаж, минимальная усадка, идеальная геометрия.",
    price: "от 320 000 ₽",
  },
  {
    icon: "Home",
    title: "Каркасные бани",
    desc: "Современные SIP-панели и каркас. Отличная теплоизоляция, строительство за 2–3 недели.",
    price: "от 220 000 ₽",
  },
  {
    icon: "Hammer",
    title: "Бани под ключ",
    desc: "Полный цикл: фундамент, сруб, кровля, отделка, печь, электрика, сантехника.",
    price: "от 780 000 ₽",
  },
];

const GALLERY_ITEMS = [
  { title: "Баня из бревна 6×4 м", tag: "Бревно", bg: "from-amber-900/30 to-amber-700/20" },
  { title: "Баня-куб из бруса", tag: "Брус", bg: "from-stone-700/30 to-stone-500/20" },
  { title: "Баня с террасой", tag: "Под ключ", bg: "from-green-900/30 to-green-700/20" },
  { title: "Финская сауна", tag: "Каркас", bg: "from-amber-800/25 to-yellow-700/15" },
  { title: "Банный комплекс", tag: "Под ключ", bg: "from-stone-800/30 to-stone-600/20" },
  { title: "Мобильная баня", tag: "Каркас", bg: "from-green-800/25 to-amber-700/15" },
];

const PROJECTS = [
  {
    title: "Баня «Классика»",
    size: "4×6 м · 24 м²",
    material: "Оцилиндрованное бревно",
    features: ["Парная + мойка + предбанник", "Кровля из металлочерепицы", "Готова к отделке"],
    price: 624000,
    badge: "Популярный",
    badgeColor: "bg-moss text-cream",
    icon: "TreePine",
  },
  {
    title: "Баня «Уют»",
    size: "4×5 м · 20 м²",
    material: "Профилированный брус",
    features: ["Парная + раздевалка", "Теплоизоляция пола", "Готова к отделке"],
    price: 370000,
    badge: "Бюджетный",
    badgeColor: "bg-leaf text-bark",
    icon: "Layers",
  },
  {
    title: "Баня «Комфорт»",
    size: "5×7 м · 35 м²",
    material: "Клеёный брус",
    features: ["Парная + мойка + комната отдыха", "Терраса 12 м²", "Премиум отделка"],
    price: 1430000,
    badge: "Премиум",
    badgeColor: "bg-wood text-cream",
    icon: "Hammer",
  },
  {
    title: "Баня «Экспресс»",
    size: "3×5 м · 15 м²",
    material: "Каркасная конструкция",
    features: ["Парная + раздевалка", "Монтаж за 2 недели", "Готова к использованию"],
    price: 217500,
    badge: "Быстро",
    badgeColor: "bg-stone text-cream",
    icon: "Home",
  },
];

const MATERIALS = [
  { id: "log", label: "Оцилиндрованное бревно", pricePerSqm: 26000 },
  { id: "beam", label: "Профилированный брус", pricePerSqm: 18500 },
  { id: "glued", label: "Клеёный брус", pricePerSqm: 34000 },
  { id: "frame", label: "Каркасная конструкция", pricePerSqm: 14500 },
];

const EXTRAS = [
  { id: "terrace", label: "Терраса / веранда", price: 120000 },
  { id: "stove", label: "Установка печи", price: 65000 },
  { id: "plumbing", label: "Сантехника", price: 90000 },
  { id: "electric", label: "Электрика", price: 55000 },
  { id: "interior", label: "Внутренняя отделка", price: 95000 },
];

const SEND_CONTACT_URL = "https://functions.poehali.dev/de33ce24-2871-48f3-b2d0-c98a90fb607b";

export default function Index() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [area, setArea] = useState(24);
  const [material, setMaterial] = useState("log");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const selectedMaterial = MATERIALS.find((m) => m.id === material)!;
  const baseCost = area * selectedMaterial.pricePerSqm;
  const extrasCost = EXTRAS.filter((e) => selectedExtras.includes(e.id)).reduce(
    (sum, e) => sum + e.price,
    0
  );
  const totalCost = baseCost + extrasCost;

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");
    try {
      const res = await fetch(SEND_CONTACT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formName, phone: formPhone, message: formMessage }),
      });
      if (res.ok) {
        setFormStatus("success");
        setFormName("");
        setFormPhone("");
        setFormMessage("");
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-md border-b border-sand">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo("#home")}
            className="font-display text-2xl font-semibold text-wood tracking-wide"
          >
            🌲 BaniDzen
          </button>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="nav-link font-body text-sm text-foreground/70 hover:text-wood transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#contacts")}
              className="bg-wood text-cream px-5 py-2 rounded-full font-body text-sm font-medium hover:bg-bark transition-colors"
            >
              Заказать звонок
            </button>
          </div>

          <button
            className="md:hidden text-wood"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Icon name={mobileOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-cream border-t border-sand px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-left font-body text-foreground/80 hover:text-wood"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
        style={{
          background:
            "radial-gradient(ellipse at 70% 60%, hsl(80 25% 82% / 0.5) 0%, transparent 60%), radial-gradient(ellipse at 20% 40%, hsl(25 45% 28% / 0.08) 0%, transparent 50%), hsl(40 30% 97%)",
        }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-sand/60 opacity-40 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-sand/80 opacity-50 pointer-events-none" />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 section-fade-in">
          <div className="inline-flex items-center gap-2 bg-sand/60 border border-sand text-stone text-xs font-body px-4 py-1.5 rounded-full mb-8">
            <Icon name="MapPin" size={12} />
            Строим по всей России
          </div>

          <h1 className="font-display text-6xl md:text-8xl font-light text-bark leading-none mb-6 tracking-tight">
            Баня вашей
            <br />
            <em className="italic text-wood">мечты</em>
          </h1>

          <p className="font-body text-lg md:text-xl text-foreground/60 max-w-xl mx-auto mb-10 leading-relaxed">
            Строим бани из натуральных материалов — бревна, бруса и каркаса.
            Под ключ с гарантией 10 лет.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollTo("#calculator")}
              className="bg-wood text-cream px-8 py-4 rounded-full font-body font-medium hover:bg-bark transition-all hover:shadow-lg"
            >
              Рассчитать стоимость
            </button>
            <button
              onClick={() => scrollTo("#services")}
              className="border border-wood text-wood px-8 py-4 rounded-full font-body font-medium hover:bg-sand/50 transition-colors"
            >
              Смотреть проекты
            </button>
          </div>

          <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { value: "12+", label: "лет опыта" },
              { value: "340", label: "бань построено" },
              { value: "10", label: "лет гарантии" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-4xl font-semibold text-wood">{s.value}</div>
                <div className="font-body text-xs text-stone mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="font-body text-xs text-stone">листайте</span>
          <Icon name="ChevronDown" size={16} className="text-stone animate-bounce" />
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-body text-xs uppercase tracking-widest text-moss mb-3">Что мы строим</p>
            <h2 className="font-display text-5xl md:text-6xl font-light text-bark">Наши услуги</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="card-hover bg-card rounded-2xl p-7 border border-sand texture-wood"
              >
                <div className="w-12 h-12 bg-sand rounded-xl flex items-center justify-center mb-5">
                  <Icon name={s.icon} size={22} className="text-wood" fallback="Home" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-bark mb-3">{s.title}</h3>
                <p className="font-body text-sm text-foreground/60 leading-relaxed mb-5">{s.desc}</p>
                <div className="font-body text-sm font-semibold text-wood">{s.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-24 px-6 bg-sand/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-body text-xs uppercase tracking-widest text-moss mb-3">Готовые решения</p>
            <h2 className="font-display text-5xl md:text-6xl font-light text-bark">Проекты с ценами</h2>
            <p className="font-body text-foreground/60 mt-4 text-base">
              Реальные проекты с фиксированной стоимостью — без скрытых доплат
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROJECTS.map((p) => (
              <div key={p.title} className="card-hover bg-card rounded-2xl border border-sand overflow-hidden flex flex-col">
                {/* Top accent */}
                <div className="h-1.5 bg-gradient-to-r from-wood to-moss" />

                <div className="p-6 flex flex-col flex-1">
                  {/* Badge + icon */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-11 h-11 bg-sand rounded-xl flex items-center justify-center">
                      <Icon name={p.icon} size={20} className="text-wood" fallback="Home" />
                    </div>
                    <span className={`text-xs font-body font-semibold px-3 py-1 rounded-full ${p.badgeColor}`}>
                      {p.badge}
                    </span>
                  </div>

                  {/* Title & size */}
                  <h3 className="font-display text-2xl font-semibold text-bark mb-1">{p.title}</h3>
                  <p className="font-body text-xs text-stone mb-1">{p.size}</p>
                  <p className="font-body text-xs text-moss font-medium mb-4">{p.material}</p>

                  {/* Features */}
                  <ul className="flex flex-col gap-2 mb-6 flex-1">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 font-body text-xs text-foreground/70">
                        <Icon name="Check" size={12} className="text-moss flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Price */}
                  <div className="border-t border-sand pt-4 flex items-end justify-between">
                    <div>
                      <div className="font-body text-xs text-stone mb-0.5">Стоимость</div>
                      <div className="font-display text-3xl font-semibold text-wood">
                        {(p.price / 1000).toFixed(0)}<span className="text-xl"> тыс ₽</span>
                      </div>
                    </div>
                    <button
                      onClick={() => scrollTo("#contacts")}
                      className="text-xs font-body font-medium text-wood border border-wood rounded-full px-4 py-2 hover:bg-wood hover:text-cream transition-all"
                    >
                      Заказать
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center font-body text-xs text-stone mt-8">
            * Цены актуальны на 2025 год. Точная стоимость рассчитывается после осмотра участка.
          </p>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 px-6 bg-sand/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-body text-xs uppercase tracking-widest text-moss mb-3">Наши работы</p>
            <h2 className="font-display text-5xl md:text-6xl font-light text-bark">Галерея</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {GALLERY_ITEMS.map((item) => (
              <div
                key={item.title}
                className={`card-hover relative rounded-2xl overflow-hidden h-56 bg-gradient-to-br ${item.bg} border border-sand cursor-pointer group`}
              >
                <div className="absolute inset-0 texture-wood opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-bark/60 to-transparent" />
                <div className="absolute top-6 right-6 opacity-20">
                  <Icon name="TreePine" size={48} className="text-cream" />
                </div>
                <div className="absolute bottom-0 left-0 p-5">
                  <span className="inline-block bg-cream/90 text-wood text-xs font-body font-medium px-3 py-1 rounded-full mb-2">
                    {item.tag}
                  </span>
                  <h3 className="font-display text-xl text-cream font-semibold">{item.title}</h3>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-bark/20">
                  <div className="bg-cream/90 text-wood text-sm font-body font-medium px-4 py-2 rounded-full">
                    Подробнее
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-body text-xs uppercase tracking-widest text-moss mb-3">Онлайн-расчёт</p>
            <h2 className="font-display text-5xl md:text-6xl font-light text-bark">Калькулятор</h2>
            <p className="font-body text-foreground/60 mt-4 text-base">
              Рассчитайте примерную стоимость вашей бани прямо сейчас
            </p>
          </div>

          <div className="bg-card rounded-3xl border border-sand p-8 md:p-12 shadow-sm">
            {/* Area slider */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <label className="font-body font-medium text-foreground">Площадь бани</label>
                <span className="font-display text-3xl font-semibold text-wood">{area} м²</span>
              </div>
              <input
                type="range"
                min={12}
                max={100}
                step={2}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, hsl(var(--wood)) 0%, hsl(var(--wood)) ${((area - 12) / 88) * 100}%, hsl(var(--sand)) ${((area - 12) / 88) * 100}%, hsl(var(--sand)) 100%)`,
                }}
              />
              <div className="flex justify-between font-body text-xs text-stone mt-2">
                <span>12 м²</span>
                <span>100 м²</span>
              </div>
            </div>

            {/* Material */}
            <div className="mb-10">
              <label className="font-body font-medium text-foreground block mb-4">Материал строительства</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MATERIALS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMaterial(m.id)}
                    className={`text-left p-4 rounded-xl border font-body text-sm transition-all ${
                      material === m.id
                        ? "border-wood bg-wood/10 text-wood font-medium"
                        : "border-sand bg-background text-foreground/70 hover:border-wood/50"
                    }`}
                  >
                    <div className="font-medium">{m.label}</div>
                    <div className={`text-xs mt-1 ${material === m.id ? "text-wood/70" : "text-stone"}`}>
                      {(m.pricePerSqm / 1000).toFixed(1)}k ₽/м²
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Extras */}
            <div className="mb-10">
              <label className="font-body font-medium text-foreground block mb-4">Дополнительные опции</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {EXTRAS.map((e) => (
                  <button
                    key={e.id}
                    onClick={() => toggleExtra(e.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border font-body text-sm transition-all ${
                      selectedExtras.includes(e.id)
                        ? "border-moss bg-moss/10 text-moss font-medium"
                        : "border-sand bg-background text-foreground/70 hover:border-moss/50"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                        selectedExtras.includes(e.id) ? "border-moss bg-moss" : "border-stone"
                      }`}
                    >
                      {selectedExtras.includes(e.id) && (
                        <Icon name="Check" size={10} className="text-cream" />
                      )}
                    </div>
                    <div>
                      <div>{e.label}</div>
                      <div className="text-xs text-stone">+{(e.price / 1000).toFixed(0)}k ₽</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Result */}
            <div
              className="rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 border border-wood/20"
              style={{ background: "hsl(25 45% 28% / 0.06)" }}
            >
              <div>
                <div className="font-body text-sm text-stone mb-1">Примерная стоимость</div>
                <div className="font-display text-5xl font-semibold text-wood">
                  {(totalCost / 1000000).toFixed(2)} <span className="text-3xl">млн ₽</span>
                </div>
                <div className="font-body text-xs text-stone mt-2">
                  {area} м² · {selectedMaterial.label}
                  {selectedExtras.length > 0 && ` · +${selectedExtras.length} опции`}
                </div>
              </div>
              <button
                onClick={() => scrollTo("#contacts")}
                className="whitespace-nowrap bg-wood text-cream px-7 py-3.5 rounded-full font-body font-medium hover:bg-bark transition-all text-sm"
              >
                Получить точный расчёт
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6 bg-bark text-cream">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-body text-xs uppercase tracking-widest text-leaf mb-3">Связаться с нами</p>
            <h2 className="font-display text-5xl md:text-6xl font-light text-cream">Контакты</h2>
            <p className="font-body text-cream/60 mt-4 text-base">
              Оставьте заявку и мы свяжемся с вами в течение 30 минут
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Ваше имя"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                required
                className="bg-white/10 border border-white/20 text-cream placeholder-cream/40 rounded-xl px-5 py-3.5 font-body text-sm focus:outline-none focus:border-leaf transition-colors"
              />
              <input
                type="tel"
                placeholder="Телефон"
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value)}
                required
                className="bg-white/10 border border-white/20 text-cream placeholder-cream/40 rounded-xl px-5 py-3.5 font-body text-sm focus:outline-none focus:border-leaf transition-colors"
              />
              <textarea
                rows={4}
                placeholder="Расскажите о вашем проекте..."
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
                className="bg-white/10 border border-white/20 text-cream placeholder-cream/40 rounded-xl px-5 py-3.5 font-body text-sm focus:outline-none focus:border-leaf transition-colors resize-none"
              />
              {formStatus === "success" ? (
                <div className="bg-leaf/20 border border-leaf/40 text-leaf rounded-xl px-5 py-4 font-body text-sm text-center">
                  ✓ Заявка отправлена! Свяжемся с вами в течение 30 минут.
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={formStatus === "loading"}
                  className="bg-leaf text-bark px-8 py-4 rounded-full font-body font-semibold hover:opacity-90 transition-opacity mt-2 text-sm disabled:opacity-60"
                >
                  {formStatus === "loading" ? "Отправляем..." : "Отправить заявку"}
                </button>
              )}
              {formStatus === "error" && (
                <p className="font-body text-xs text-red-300 text-center">
                  Ошибка отправки. Позвоните нам напрямую.
                </p>
              )}
            </form>

            <div className="flex flex-col gap-8">
              {[
                { icon: "Phone", label: "Телефон", value: "+7 905-710-8890" },
                { icon: "Phone", label: "Manager", value: "+7 977-634-1129" },
                { icon: "Mail", label: "Email", value: "pruddzen@gmail.com" },
                { icon: "MapPin", label: "Адрес", value: "Москва, работаем по всей России" },
                { icon: "Clock", label: "Время работы", value: "Пн–Сб, 9:00–19:00" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon} size={18} className="text-leaf" fallback="Info" />
                  </div>
                  <div>
                    <div className="font-body text-xs text-cream/50 uppercase tracking-wider mb-0.5">{item.label}</div>
                    <div className="font-body text-cream font-medium">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-bark border-t border-white/10 py-8 px-6 text-center">
        <p className="font-body text-xs text-cream/40">
          © 2024 BaniDzen — строительство бань под ключ
        </p>
      </footer>
    </div>
  );
}