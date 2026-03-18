import { useState } from "react";
import Icon from "@/components/ui/icon";

const NAV_LINKS = [
  { label: "Главная", href: "#home" },
  { label: "Услуги", href: "#services" },
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

export default function Index() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [area, setArea] = useState(24);
  const [material, setMaterial] = useState("log");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

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

  return (
    <div className="min-h-screen bg-background">
      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-md border-b border-sand">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo("#home")}
            className="font-display text-2xl font-semibold text-wood tracking-wide"
          >
            🌲 БаняПро
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
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Ваше имя"
                className="bg-white/10 border border-white/20 text-cream placeholder-cream/40 rounded-xl px-5 py-3.5 font-body text-sm focus:outline-none focus:border-leaf transition-colors"
              />
              <input
                type="tel"
                placeholder="Телефон"
                className="bg-white/10 border border-white/20 text-cream placeholder-cream/40 rounded-xl px-5 py-3.5 font-body text-sm focus:outline-none focus:border-leaf transition-colors"
              />
              <textarea
                rows={4}
                placeholder="Расскажите о вашем проекте..."
                className="bg-white/10 border border-white/20 text-cream placeholder-cream/40 rounded-xl px-5 py-3.5 font-body text-sm focus:outline-none focus:border-leaf transition-colors resize-none"
              />
              <button className="bg-leaf text-bark px-8 py-4 rounded-full font-body font-semibold hover:opacity-90 transition-opacity mt-2 text-sm">
                Отправить заявку
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {[
                { icon: "Phone", label: "Телефон", value: "+7 (800) 000-00-00" },
                { icon: "Mail", label: "Email", value: "info@banyapro.ru" },
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
          © 2024 БаняПро — строительство бань под ключ
        </p>
      </footer>
    </div>
  );
}