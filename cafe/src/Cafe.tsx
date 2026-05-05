import { useState, useEffect } from "react";
import Registrace from "./RegistracePage";

type Page = "atmosfera" | "menu" | "pribeh" | "navstivte" | "registrace";

const Nav = ({ 
  page, 
  setPage, 
  isDarkMode, 
  setIsDarkMode,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}: { 
  page: Page; 
  setPage: (p: Page) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}) => {
  const links: { id: Page; label: string }[] = [
    { id: "atmosfera", label: "Domů" },
    { id: "menu", label: "Menu" },
    { id: "pribeh", label: "Příběh" },
    { id: "navstivte", label: "Kontakty" },
  ];

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileLinkClick = (pageId: Page) => {
    setPage(pageId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`sticky top-0 z-50 border-b transition-colors duration-300 flex items-center justify-between px-4 sm:px-6 md:px-10 h-12 sm:h-14 ${
        isDarkMode 
          ? 'bg-[#1E0E05] border-[#3A2410]' 
          : 'bg-[#F8F5E9] border-[#DDD8C4]'
      }`}>
        <button
          type="button"
          className={`font-serif italic text-[13px] sm:text-[15px] md:text-[17px] cursor-pointer tracking-tight transition-transform-smooth hover:scale-105 truncate bg-transparent border-none text-left ${
            isDarkMode ? 'text-[#F8F5E9]' : 'text-[#2C1508]'
          }`}
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          onClick={() => setPage("atmosfera")}
        >
          Gallery
        </button>

        <div className="hidden md:flex gap-4 lg:gap-8 items-center">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => setPage(l.id)}
              className={`bg-transparent border-none text-xs lg:text-sm cursor-pointer pb-0.5 transition-smooth ${
                page === l.id
                  ? isDarkMode 
                    ? "text-[#F8F5E9] border-b-[1.5px] border-[#C8871A]"
                    : "text-[#4A2512] border-b-[1.5px] border-[#C8871A]"
                  : isDarkMode
                    ? "text-[#B8A898] border-b-[1.5px] border-transparent hover:text-[#F8F5E9]"
                    : "text-[#3A2410] border-b-[1.5px] border-transparent hover:text-[#4A2512]"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 sm:p-2.5 rounded-full transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-[#3A2410] text-[#F8F5E9] hover:bg-[#4A2512]' 
                : 'bg-[#EEE9D4] text-[#2C1508] hover:bg-[#DDD8C4]'
            }`}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? '☀️' : (
              <svg className="w-5 h-5 inline" fill="#999999" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" fill="white" />
                <circle cx="15" cy="12" r="9" fill="#EEE9D4" />
              </svg>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={handleMobileMenuToggle}
            className={`md:hidden p-1.5 sm:p-2 rounded transition-colors duration-200 ${
              isDarkMode 
                ? 'text-[#F8F5E9] hover:bg-[#3A2410]' 
                : 'text-[#2C1508] hover:bg-[#EEE9D4]'
            }`}
            aria-label="Toggle mobile menu"
          >
            <div className="w-4 h-4 flex flex-col justify-center items-center">
              <span className={`block w-3 h-0.5 transition-all duration-300 ${
                isDarkMode ? 'bg-[#F8F5E9]' : 'bg-[#2C1508]'
              } ${isMobileMenuOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-0.5'}`}></span>
              <span className={`block w-3 h-0.5 transition-all duration-300 ${
                isDarkMode ? 'bg-[#F8F5E9]' : 'bg-[#2C1508]'
              } ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block w-3 h-0.5 transition-all duration-300 ${
                isDarkMode ? 'bg-[#F8F5E9]' : 'bg-[#2C1508]'
              } ${isMobileMenuOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-0.5'}`}></span>
            </div>
          </button>

          <button
            onClick={() => setPage("registrace")}
            className={`border-none rounded-full px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 text-[10px] sm:text-[12px] md:text-[13px] font-medium cursor-pointer tracking-wide transition-smooth hover:scale-105 active:scale-95 whitespace-nowrap ${
              isDarkMode 
                ? 'bg-[#F8F5E9] text-[#1E0E05] hover:bg-[#DDD8C4]' 
                : 'bg-[#1E0E05] text-[#F8F5E9] hover:bg-[#2C1508]'
            }`}
          >
            Rezervovat
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div 
            className={`flex-1 ${isDarkMode ? 'bg-[rgba(255,255,255,0.08)]' : 'bg-white bg-opacity-60'}`}
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          <div className={`w-64 transition-transform duration-300 transform ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } ${isDarkMode ? 'bg-[#1E0E05]' : 'bg-[#F8F5E9]'} border-l ${
            isDarkMode ? 'border-[#3A2410]' : 'border-[#DDD8C4]'
          } shadow-2xl shadow-black/10`}>
            <div className="p-4 pt-6">
              <div className="space-y-2">
                {links.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => handleMobileLinkClick(l.id)}
                    className={`block w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                      page === l.id
                        ? isDarkMode 
                          ? "bg-[#3A2410] text-[#F8F5E9] border-l-4 border-[#C8871A]"
                          : "bg-[#EEE9D4] text-[#4A2512] border-l-4 border-[#C8871A]"
                        : isDarkMode
                          ? "text-[#B8A898] hover:bg-[#3A2410] hover:text-[#F8F5E9]"
                          : "text-[#3A2410] hover:bg-[#EEE9D4] hover:text-[#4A2512]"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Footer = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <footer className={`border-t px-4 sm:px-6 md:px-10 py-4 sm:py-6 flex flex-col sm:flex-row justify-between items-start sm:items-end flex-wrap gap-3 sm:gap-4 text-[10px] sm:text-xs transition-colors duration-300 ${
    isDarkMode 
      ? 'bg-[#1E0E05] border-[#3A2410]' 
      : 'bg-[#F8F5E9] border-[#DDD8C4]'
  }`}>
    <div>
      <div
        className={`italic text-[13px] sm:text-[15px] mb-1 ${isDarkMode ? 'text-[#F8F5E9]' : 'text-[#4A2512]'}`}
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        The Sensory Gallery
      </div>
      <div className="text-[#7A6050]">Praha 1, Staré Město</div>
      <div className="text-[#7A6050]">Otevřeno denně: 08:00 – 20:00</div>
    </div>
    <div className="flex flex-col gap-3 sm:gap-2 items-start sm:items-end">
      <div className="flex gap-2 sm:gap-3 items-center flex-wrap">
        {["Zásady ochrany", "Podmínky služby", "Press Kit", "Kariéra"].map((t) => (
          <span key={t} className={`cursor-pointer transition-colors ${isDarkMode ? 'text-[#B8A898] hover:text-[#F8F5E9]' : 'text-[#7A6050] hover:text-[#2C1508]'}`}>
            {t}
          </span>
        ))}
        <span className="text-[#7A6050]">
          © 2024 Gallery. Všechna práva vyhrazena.
        </span>
      </div>
      <p className="text-xs text-stone-500 max-w-[28rem]">
        * Tento web je fiktivní ukázkový projekt vytvořený pro portfolio.
      </p>
    </div>
  </footer>
);

const AtmosferaPage = ({ setPage, isDarkMode }: { setPage: (p: Page) => void; isDarkMode: boolean }) => {
  const coffees = [
    {
      origin: "ETIOPIE · YIRGACHEFFE",
      name: "Jasmínový Úsvit",
      desc: "Tóny jasmínu, bergamotu a divokých borůvek.",
      price: "90 Kč",
      img: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&q=80",
    },
    {
      origin: "KOLUMBIE · HUILA",
      name: "Sametová Noc",
      desc: "Bohatá čokoláda, hnědý cukr a jemný nádech.",
      price: "85 Kč",
      img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80",
    },
    {
      origin: "BRAZÍLIE · MINAS GERAIS",
      name: "Lískový Oříšek",
      desc: "Klasický profil s tóny pražených ořechů.",
      price: "80 Kč",
      img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80",
    },
  ];

  return (
    <div className={`${isDarkMode ? 'bg-[#1E0E05]' : 'bg-[#F8F5E9]'}`}>
      {/* Hero */}
      <section className="relative h-48 sm:h-64 md:h-96 lg:h-[560px] overflow-hidden animate-fade-in">
        <img
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1400&q=85"
          alt="Kavárna"
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${
          isDarkMode 
            ? 'from-[rgba(30,14,5,0.95)] via-[rgba(30,14,5,0.6)] to-[rgba(30,14,5,0.1)]' 
            : 'from-[rgba(248,245,233,0.95)] via-[rgba(248,245,233,0.6)] to-[rgba(248,245,233,0.1)]'
        }`} />
        <div className="absolute top-1/2 left-4 sm:left-6 md:left-10 lg:left-16 -translate-y-1/2 max-w-xs animate-slide-in-left">
          <p className={`text-[8px] sm:text-[9px] md:text-[11px] font-medium tracking-[2px] sm:tracking-[2.5px] md:tracking-[3px] uppercase mb-2 sm:mb-3 md:mb-4 ${
            isDarkMode ? 'text-[#F8F5E9]' : 'text-[#7A4020]'
          }`}>
            Prémiová pražírna
          </p>
          <h1
            className={`text-[24px] sm:text-[36px] md:text-[48px] lg:text-[60px] font-bold leading-[1.05] mb-2 sm:mb-3 md:mb-5 tracking-tight ${isDarkMode ? 'text-[#F8F5E9]' : 'text-[#2C1508]'}`}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Vaše denní<br />dávka klidu
          </h1>
          <p className={`text-[11px] sm:text-[12px] md:text-[14px] lg:text-[15px] leading-[1.6] md:leading-[1.7] mb-3 sm:mb-4 md:mb-8 ${isDarkMode ? 'text-[#B8A898]' : 'text-[#3A2410]'}`}>
            Objevte rituál, který začíná vůní čerstvě mletých zrn.
          </p>
          <div className="flex gap-2 sm:gap-3 flex-col sm:flex-row">
            <button
              onClick={() => setPage("menu")}
              className={`border-none rounded-full px-3 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-[11px] sm:text-[12px] md:text-[14px] font-medium cursor-pointer transition-smooth hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-[#F8F5E9] text-[#1E0E05] hover:bg-[#DDD8C4]' : 'bg-[#1E0E05] text-[#F8F5E9] hover:bg-[#2C1508]'}`}
            >
              Objevte Menu
            </button>
            <button
              onClick={() => setPage("navstivte")}
              className={`border rounded-full px-3 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-[11px] sm:text-[12px] md:text-[14px] font-medium cursor-pointer transition-smooth hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-transparent text-[#F8F5E9] border-[#F8F5E9] hover:bg-[#3A2410]' : 'bg-transparent text-[#2C1508] border-[#4A2512] hover:bg-[#EEE9D4]'}`}
            >
              Najít nás
            </button>
          </div>
        </div>
      </section>

      {/* Coffee selection */}
      <section className="px-4 sm:px-6 md:px-10 lg:px-16 pt-6 sm:pt-8 md:pt-12 lg:pt-16 pb-6 sm:pb-8 md:pb-10 lg:pb-12">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-3 mb-6 md:mb-8">
          <div>
            <h2
              className={`text-[20px] sm:text-[24px] md:text-[30px] lg:text-[36px] font-semibold mb-2 ${isDarkMode ? 'text-[#F8F5E9]' : 'text-[#2C1508]'}`}
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Naše speciality
            </h2>
            <p className={`text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] max-w-full md:max-w-lg lg:max-w-[520px] leading-relaxed ${isDarkMode ? 'text-[#B8A898]' : 'text-[#7A6050]'}`}>
              Pečlivě vybraná zrna z etických farem, pražená s úctou k jejich původu.
            </p>
          </div>
          <button
            onClick={() => setPage("menu")}
            className={`bg-transparent border-none text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] font-medium underline underline-offset-[2px] md:underline-offset-[3px] cursor-pointer transition-smooth self-start md:self-auto whitespace-nowrap ${isDarkMode ? 'text-[#F8F5E9] hover:text-[#DDD8C4]' : 'text-[#4A2512] hover:text-[#2C1508]'}`}
          >
            Zobrazit více →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {coffees.map((c) => (
            <div
              key={c.name}
              className={`rounded-xl md:rounded-2xl overflow-hidden border transition-smooth hover:shadow-lg hover:scale-[1.02] cursor-pointer animate-fade-in-up ${isDarkMode ? 'bg-[#3A2410] border-[#4A2512] hover:border-[#C8871A]' : 'bg-[#F0ECD8] border-[#DDD8C4] hover:border-[#C8871A]'}`}
            >
              <img src={c.img} alt={c.name} className="w-full h-32 sm:h-40 md:h-48 lg:h-[200px] object-cover transition-transform-smooth group-hover:scale-110" />
              <div className="p-3 sm:p-4 md:p-5">
                <p className="text-[8px] sm:text-[9px] md:text-[10px] tracking-[1.5px] md:tracking-[2px] text-[#7A6050] uppercase mb-1.5 sm:mb-2">{c.origin}</p>
                <h3
                  className={`text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-semibold mb-2 ${isDarkMode ? 'text-[#F8F5E9]' : 'text-[#2C1508]'}`}
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {c.name}
                </h3>
                <p className={`text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] leading-relaxed mb-3 ${isDarkMode ? 'text-[#B8A898]' : 'text-[#3A2410]'}`}>{c.desc}</p>
                <span
                  className={`text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] font-semibold ${isDarkMode ? 'text-[#F8F5E9]' : 'text-[#4A2512]'}`}
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {c.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dessert feature */}
      <div className={`grid grid-cols-1 md:grid-cols-2 mx-4 sm:mx-6 md:mx-8 lg:mx-16 mb-8 sm:mb-10 md:mb-12 lg:mb-16 rounded-xl md:rounded-[20px] overflow-hidden border ${isDarkMode ? 'border-[#3A2410]' : 'border-[#DDD8C4]'}`}>
        <div className="relative min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[400px]">
          <img
            src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=700&q=80"
            alt="Dort"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 lg:bottom-5 left-2 sm:left-3 md:left-4 lg:left-5 bg-[#1E0E05] text-[#F8F5E9] rounded-lg md:rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 md:py-2.5 lg:py-3 text-[9px] sm:text-[10px] md:text-[11px] lg:text-[12px] font-medium leading-snug">
            DNES<br />
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontSize: "0.95em" }}>
              Pistáciový Eclair
            </span>
          </div>
        </div>
        <div className={`px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10 lg:py-12 flex flex-col justify-center ${isDarkMode ? 'bg-[#1E0E05]' : 'bg-[#F8F5E9]'}`}>
          <p className="text-[8px] sm:text-[9px] md:text-[10px] tracking-[2px] md:tracking-[2.5px] lg:tracking-[3px] text-[#7A6050] uppercase mb-2 md:mb-3 lg:mb-4">Sladké pokušení</p>
          <h3
            className={`text-[20px] sm:text-[24px] md:text-[28px] lg:text-[34px] font-bold leading-[1.1] mb-2 sm:mb-3 md:mb-4 lg:mb-5 ${isDarkMode ? 'text-[#F8F5E9]' : 'text-[#2C1508]'}`}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Dnešní dezert
          </h3>
          <p className={`text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] leading-[1.6] md:leading-[1.7] mb-3 md:mb-4 lg:mb-6 ${isDarkMode ? 'text-[#B8A898]' : 'text-[#3A2410]'}`}>
            Náš šéfcukrář dnes připravil limitovanou edici tartaletek z 70% madagaskarské čokolády.
          </p>
          <button className={`self-start border-none rounded-full px-3 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-[10px] sm:text-[11px] md:text-[12px] lg:text-[14px] font-medium cursor-pointer transition-colors ${isDarkMode ? 'bg-[#F8F5E9] text-[#1E0E05] hover:bg-[#DDD8C4]' : 'bg-[#1E0E05] text-[#F8F5E9] hover:bg-[#2C1508]'}`}>
            Rezervovat
          </button>
        </div>
      </div>

      {/* Story teaser */}
      <section className="text-center px-4 sm:px-6 md:px-10 lg:px-16 py-8 sm:py-10 md:py-12 pb-10 sm:pb-12 md:pb-16 lg:pb-20">
        <p className={`text-[8px] sm:text-[9px] md:text-[10px] tracking-[2px] md:tracking-[2.5px] lg:tracking-[3px] uppercase mb-2 md:mb-3 lg:mb-4 ${isDarkMode ? 'text-[#F8F5E9]' : 'text-[#7A6050]'}`}>Příběh za šálkem</p>
        <h2
          className={`text-[20px] sm:text-[26px] md:text-[32px] lg:text-[40px] font-semibold leading-[1.15] mb-2 md:mb-3 lg:mb-4 ${isDarkMode ? 'text-[#F8F5E9]' : 'text-[#2C1508]'}`}
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Více než jen káva – je to cesta
        </h2>
        <p className={`text-[11px] sm:text-[12px] md:text-[13px] lg:text-[15px] leading-[1.6] md:leading-[1.7] max-w-xs sm:max-w-md md:max-w-lg lg:max-w-[560px] mx-auto mb-4 md:mb-5 lg:mb-7 ${isDarkMode ? 'text-[#B8A898]' : 'text-[#3A2410]'}`}>
          The Sensory Gallery vznikla z touhy propojit svět umění a kávové kultury. Věříme, že každý šálek je příležitostí.
        </p>
        <button
          onClick={() => setPage("pribeh")}
          className={`bg-transparent border-none text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] font-medium underline underline-offset-[2px] md:underline-offset-[3px] cursor-pointer ${isDarkMode ? 'text-[#F8F5E9]' : 'text-[#4A2512]'}`}
        >
          Více o příběhu →
        </button>
      </section>
    </div>
  );
};

const MenuPage = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const coffeeItems = [
    { name: "Espresso", sub: "Double shot", price: 55 },
    { name: "Cappuccino", sub: "Sametová mléčná pěna", price: 75 },
    { name: "Flat White", sub: "Intenzivní chuť", price: 85 },
    { name: "Latte", sub: "Klasická kombinace", price: 80 },
    { name: "Americano", sub: "Silná a čistá", price: 60 },
  ];

  const coldItems = [
    { name: "Iced Latte", sub: "Chlazený s mlékem", price: 85 },
    { name: "Cold Brew", sub: "24hodinový výluh", price: 90 },
    { name: "Frappuccino", sub: "Smíchaný s ledem", price: 95 },
  ];

  const foodItems = [
    { name: "Croissant", sub: "Máslový a křupavý", price: 45 },
    { name: "Avocado Toast", sub: "Se sezamovými semínky", price: 120 },
    { name: "Quiche", sub: "S špenátem a sýrem", price: 85 },
    { name: "Salát", sub: "Sezónní zelenina", price: 95 },
  ];

  const Item = ({ name, sub, price, isDarkMode }: { name: string; sub: string; price: number; isDarkMode: boolean }) => (
    <div className={`flex justify-between items-start py-2.5 sm:py-3 md:py-3.5 border-b ${isDarkMode ? 'border-[#3A2410]' : 'border-[#DDD8C4]'}`}>
      <div>
        <p className={`text-[12px] sm:text-[13px] md:text-[15px] font-semibold mb-0.5 ${isDarkMode ? 'text-[#F8F5E9]' : 'text-[#2C1508]'}`}>{name}</p>
        <p className="text-[10px] sm:text-[11px] md:text-[12px] text-[#7A6050]">{sub}</p>
      </div>
      <span
        className={`text-[12px] sm:text-[13px] md:text-[15px] font-semibold ml-2 whitespace-nowrap ${isDarkMode ? 'text-[#F8F5E9]' : 'text-[#4A2512]'}`}
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        {price} Kč
      </span>
    </div>
  );

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#1E0E05]' : 'bg-[#F8F5E9]'}`}>
      <section className="px-4 sm:px-6 md:px-10 lg:px-16 pt-6 sm:pt-8 md:pt-10 lg:pt-16 pb-4 md:pb-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 lg:gap-10 items-start animate-fade-in">
        <div>
          <p className={`text-[8px] sm:text-[9px] md:text-[10px] tracking-[2px] md:tracking-[3px] uppercase mb-2 md:mb-3 ${isDarkMode ? 'text-[#F8F5E9]' : 'text-[#7A6050]'}`}>Lístek chutí</p>
          <h1
            className={`text-[32px] sm:text-[40px] md:text-[52px] lg:text-[72px] font-bold leading-none mb-3 md:mb-4 lg:mb-5 ${isDarkMode ? 'text-[#F8F5E9]' : 'text-[#2C1508]'}`}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Naše Menu
          </h1>
          <p className={`text-[11px] sm:text-[12px] md:text-[13px] lg:text-[15px] leading-[1.6] md:leading-[1.7] max-w-xs md:max-w-sm lg:max-w-[440px] ${isDarkMode ? 'text-[#B8A898]' : 'text-[#3A2410]'}`}>
            Každý šálek je příběhem o původu a rituálu. Objevte náš výběr výběrové kávy.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80"
          alt="Latte art"
          className="w-full h-48 sm:h-56 md:h-72 object-cover rounded-xl md:rounded-2xl animate-fade-in-up"
        />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 px-4 sm:px-6 md:px-10 lg:px-16 py-6 sm:py-8 md:py-10 lg:py-12 items-start">
        <div className={`md:pr-4 lg:pr-6 border-b md:border-b-0 md:border-r pb-4 md:pb-0 animate-fade-in-up ${isDarkMode ? 'border-[#3A2410]' : 'border-[#DDD8C4]'}`}>
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <span className="text-lg md:text-xl">☕</span>
            <h2 className={`text-[18px] md:text-[22px] lg:text-[26px] font-semibold m-0 ${isDarkMode ? 'text-[#F8F5E9]' : 'text-[#2C1508]'}`} style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Káva</h2>
          </div>
          {coffeeItems.map((i) => <Item key={i.name} {...i} isDarkMode={isDarkMode} />)}
        </div>

        <div className={`md:px-4 lg:px-6 border-b md:border-b-0 md:border-r pb-4 md:pb-0 animate-fade-in-up animate-delay-1 ${isDarkMode ? 'border-[#3A2410]' : 'border-[#DDD8C4]'}`}>
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <span className="text-lg md:text-xl">❄️</span>
            <h2 className={`text-[18px] md:text-[22px] lg:text-[26px] font-semibold m-0 ${isDarkMode ? 'text-[#F8F5E9]' : 'text-[#2C1508]'}`} style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Studené</h2>
          </div>
          {coldItems.map((i) => <Item key={i.name} {...i} isDarkMode={isDarkMode} />)}
        </div>

        <div className="md:pl-4 lg:pl-6 animate-fade-in-up animate-delay-2">
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <span className="text-lg md:text-xl">🍴</span>
            <h2 className={`text-[18px] md:text-[22px] lg:text-[26px] font-semibold m-0 ${isDarkMode ? 'text-[#F8F5E9]' : 'text-[#2C1508]'}`} style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Jídlo</h2>
          </div>
          {foodItems.map((i) => <Item key={i.name} {...i} isDarkMode={isDarkMode} />)}
        </div>
      </section>

      <div className={`border-t px-4 sm:px-6 md:px-10 lg:px-16 py-3 md:py-4 lg:py-5 flex flex-col sm:flex-row justify-end items-center gap-3 md:gap-6 lg:gap-10 text-[10px] md:text-[11px] lg:text-[13px] ${isDarkMode ? 'bg-[#2C1508] border-[#3A2410]' : 'bg-[#EEE9D4] border-[#DDD8C4]'}`}>
        <span className="tracking-[2px] text-[#7A6050] uppercase">Otevírací doba</span>
        <span className={`${isDarkMode ? 'text-[#B8A898]' : 'text-[#3A2410]'}`}>Po–Pá: <strong>07:30 – 19:00</strong></span>
        <span className={`${isDarkMode ? 'text-[#B8A898]' : 'text-[#3A2410]'}`}>So–Ne: <strong>09:00 – 18:00</strong></span>
      </div>
    </div>
  );
};

const PribehPage = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const missions = [
    { icon: "🌿", title: "Udržitelný původ", text: "Spolupracujeme přímo s farmáři, kteří ctí půdu.", dark: false },
    { icon: "☕", title: "Vlastní pražírna", text: "Pražíme v malých dávkách každý týden.", dark: true },
    { icon: "🧺", title: "Lokální suroviny", text: "Naše pečivo pochází od sousedních farmářů.", dark: false },
  ];

  return (
    <div className={`${isDarkMode ? 'bg-[#1E0E05]' : 'bg-[#F8F5E9]'}`}>
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-auto md:min-h-[400px] lg:min-h-[440px] items-center animate-fade-in gap-4 md:gap-6">
        <div className="px-4 sm:px-6 md:px-8 lg:px-16 py-6 md:py-8 lg:py-16 animate-slide-in-left">
          <p className={`text-[8px] sm:text-[9px] md:text-[10px] tracking-[2px] md:tracking-[3px] uppercase mb-2 md:mb-4 ${isDarkMode ? 'text-[#F8F5E9]' : 'text-[#7A6050]'}`}>Vítejte v galerii</p>
          <h1 className={`text-[24px] sm:text-[32px] md:text-[40px] lg:text-[52px] font-bold leading-[1.05] mb-3 md:mb-5 ${isDarkMode ? 'text-[#F8F5E9]' : 'text-[#2C1508]'}`} style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Umění v každém šálku.
          </h1>
          <p className={`text-[11px] sm:text-[12px] md:text-[13px] lg:text-[15px] leading-[1.6] md:leading-[1.7] max-w-xs md:max-w-sm lg:max-w-[380px] ${isDarkMode ? 'text-[#B8A898]' : 'text-[#3A2410]'}`}>
            Věříme, že káva není jen nápoj, ale rituál.
          </p>
        </div>
        <div className="relative h-48 sm:h-56 md:h-80 lg:h-[440px] animate-fade-in-up">
          <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&q=80" alt="Šálek" className="w-full h-full object-cover" />
        </div>
      </section>

      <section className={`${isDarkMode ? 'bg-[#2C1508]' : 'bg-[#EEE9D4]'} px-4 sm:px-6 md:px-10 lg:px-16 py-8 sm:py-10 md:py-12 lg:py-16 animate-fade-in`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 lg:gap-16 items-center">
          <div className="order-2 md:order-1">
            <h2 className={`text-[20px] sm:text-[26px] md:text-[30px] lg:text-[36px] font-semibold mb-3 md:mb-5 ${isDarkMode ? 'text-[#F8F5E9]' : 'text-[#2C1508]'}`} style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Náš příběh</h2>
            <p className={`text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] leading-[1.7] mb-3 md:mb-4 ${isDarkMode ? 'text-[#B8A898]' : 'text-[#3A2410]'}`}>
              Vše začalo v malé garáži s jedním starým pražičem a vizí vytvořit místo, které oslavuje čistotu chuti.
            </p>
            <p className={`text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] leading-[1.7] mb-4 md:mb-6 ${isDarkMode ? 'text-[#B8A898]' : 'text-[#3A2410]'}`}>
              Cesta k otevření galerie byla lemována tisíci hodinami testování a cestami za farmáři.
            </p>
          </div>
          <div className="order-1 md:order-2 grid grid-cols-2 gap-2 md:gap-3 lg:gap-4">
            <img src="https://images.unsplash.com/photo-1459755486867-b55449bb39ff?w=400&q=80" alt="Pražírna" className="w-full h-32 sm:h-40 md:h-48 lg:h-[260px] object-cover rounded-lg md:rounded-xl" />
            <img src="https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=400&q=80" alt="Příprava" className="w-full h-32 sm:h-40 md:h-48 lg:h-[260px] object-cover rounded-lg md:rounded-xl mt-2 sm:mt-3 md:mt-4 lg:mt-6" />
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 md:px-10 lg:px-16 py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="text-center mb-6 md:mb-8 lg:mb-10">
          <p className={`text-[8px] sm:text-[9px] md:text-[10px] tracking-[2px] md:tracking-[3px] uppercase mb-2 md:mb-3 ${isDarkMode ? 'text-[#F8F5E9]' : 'text-[#7A6050]'}`}>Naše mise</p>
          <h2 className={`text-[20px] sm:text-[26px] md:text-[32px] lg:text-[40px] font-semibold ${isDarkMode ? 'text-[#F8F5E9]' : 'text-[#2C1508]'}`} style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Kvalita bez kompromisů
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 lg:gap-5">
          {missions.map((m, i) => (
            <div
              key={m.title}
              className={`rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 relative transition-smooth hover:shadow-lg hover:scale-[1.02] ${
                i === 0 ? "animate-fade-in-up" : i === 1 ? "animate-fade-in-up animate-delay-1" : "animate-fade-in-up animate-delay-2"
              } ${m.dark ? "bg-[#1E0E05]" : "bg-[#F0ECD8] border border-[#DDD8C4]"}`}
            >
              <span className="text-2xl md:text-3xl lg:text-[28px] mb-3 block">{m.icon}</span>
              <h3
                className={`text-[16px] md:text-[18px] lg:text-[22px] font-semibold mb-2 md:mb-3 ${m.dark ? "text-[#F8F5E9]" : "text-[#2C1508]"}`}
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {m.title}
              </h3>
              <p className={`text-[11px] md:text-[12px] lg:text-[13px] leading-[1.6] md:leading-[1.7] ${m.dark ? "text-[#B8A898]" : "text-[#3A2410]"}`}>{m.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const NavstivtePage = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (form.name && form.email && form.message) setSent(true);
  };

  const inputClass = "w-full px-2.5 sm:px-3 md:px-3.5 py-2 sm:py-2.5 md:py-3 bg-[#F0ECD8] border border-[#DDD8C4] rounded-lg md:rounded-[10px] text-[11px] sm:text-[12px] md:text-[14px] text-[#3A2410] outline-none focus:border-[#4A2512] transition-colors";
  const labelClass = "block text-[8px] sm:text-[9px] md:text-[10px] tracking-[1.5px] md:tracking-[2px] text-[#7A6050] uppercase mb-1 md:mb-2";

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#1E0E05]' : 'bg-[#F8F5E9]'}`}>
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-auto md:min-h-[350px] lg:min-h-[420px] items-center animate-fade-in gap-4">
        <div className="px-4 sm:px-6 md:px-8 lg:px-16 py-6 md:py-8 lg:py-16 animate-slide-in-left">
          <p className={`text-[8px] sm:text-[9px] md:text-[10px] tracking-[2px] md:tracking-[3px] uppercase mb-2 md:mb-4 ${isDarkMode ? 'text-[#F8F5E9]' : 'text-[#7A6050]'}`}>Najděte svůj rituál</p>
          <h1 className={`text-[22px] sm:text-[28px] md:text-[36px] lg:text-[50px] font-bold leading-[1.05] mb-2 md:mb-5 ${isDarkMode ? 'text-[#F8F5E9]' : 'text-[#2C1508]'}`} style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Přijďte<br />pro vůni.
          </h1>
          <p className={`text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] leading-[1.6] md:leading-[1.7] max-w-xs md:max-w-sm lg:max-w-[380px] ${isDarkMode ? 'text-[#B8A898]' : 'text-[#3A2410]'}`}>
            Uprostřed historického centra je naše galerie útočištěm pro ty, kteří oceňují umění.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1524293568345-75d62c3664f7?w=700&q=80"
          alt="Interiér"
          className="w-full h-48 sm:h-56 md:h-80 lg:h-[420px] object-cover animate-fade-in-up"
        />
      </section>

      <section className="px-4 sm:px-6 md:px-10 lg:px-16 py-8 sm:py-10 md:py-12 grid grid-cols-1 md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_380px] gap-4 md:gap-6">
        <div className="bg-white rounded-xl md:rounded-[20px] p-4 sm:p-6 md:p-8 lg:p-10 border border-[#DDD8C4]">
          <h2 className="text-[18px] md:text-[22px] lg:text-[28px] font-semibold text-[#2C1508] mb-4 md:mb-6 lg:mb-7" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Napište nám
          </h2>

          {sent ? (
            <div className="text-center py-6 md:py-10">
              <div className="text-3xl md:text-4xl mb-3">✓</div>
              <p className="text-[16px] md:text-[18px] lg:text-[22px] text-[#2C1508] mb-1 md:mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Zpráva odeslána!</p>
              <p className="text-[11px] md:text-[12px] lg:text-[14px] text-[#7A6050]">Ozveme se co nejdříve.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3 md:gap-4">
              <div className="grid grid-cols-2 gap-2 md:gap-3 lg:gap-4">
                <div>
                  <label className={labelClass}>Jméno</label>
                  <input className={inputClass} placeholder="Jan" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>E-mail</label>
                  <input className={inputClass} placeholder="jan@example.cz" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Zpráva</label>
                <textarea
                  className={`${inputClass} resize-y`}
                  rows={4}
                  placeholder="Napište nám..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>
              <button
                onClick={handleSubmit}
                className="self-start bg-[#1E0E05] text-[#F8F5E9] border-none rounded-full px-4 md:px-6 lg:px-7 py-2 md:py-2.5 lg:py-3 text-[11px] md:text-[12px] lg:text-[14px] font-medium cursor-pointer hover:bg-[#2C1508] transition-colors"
              >
                Odeslat
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 md:gap-4">
          <div className={`rounded-lg md:rounded-2xl p-4 md:p-5 lg:p-6 border ${isDarkMode ? 'bg-[#3A2410] border-[#4A2512]' : 'bg-white border-[#DDD8C4]'}`}>
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <span>🕐</span>
              <h3 className={`text-[14px] md:text-[16px] lg:text-[18px] font-semibold m-0 ${isDarkMode ? 'text-[#F8F5E9]' : 'text-[#2C1508]'}`} style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Hodiny</h3>
            </div>
            {[{ days: "Všední dny", hours: "07:30 — 20:00" }, { days: "Víkendy", hours: "09:00 — 21:00" }].map((r) => (
              <div key={r.days} className={`flex justify-between py-1.5 md:py-2 border-b ${isDarkMode ? 'border-[#4A2512]' : 'border-[#DDD8C4]'}`}>
                <span className="text-[10px] md:text-[11px] lg:text-[13px] text-[#7A6050]">{r.days}</span>
                <span className={`text-[10px] md:text-[11px] lg:text-[13px] font-semibold ${isDarkMode ? 'text-[#F8F5E9]' : 'text-[#2C1508]'}`}>{r.hours}</span>
              </div>
            ))}
          </div>

          <div className={`rounded-lg md:rounded-2xl p-4 md:p-5 lg:p-6 border ${isDarkMode ? 'bg-[#3A2410] border-[#4A2512]' : 'bg-white border-[#DDD8C4]'}`}>
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <span>📍</span>
              <h3 className={`text-[14px] md:text-[16px] lg:text-[18px] font-semibold m-0 ${isDarkMode ? 'text-[#F8F5E9]' : 'text-[#2C1508]'}`} style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Adresa</h3>
            </div>
            <p className={`text-[11px] md:text-[12px] lg:text-[14px] font-semibold mb-0.5 ${isDarkMode ? 'text-[#F8F5E9]' : 'text-[#2C1508]'}`}>Gallery Square 12</p>
            <p className="text-[10px] md:text-[11px] lg:text-[13px] text-[#7A6050] mb-3 leading-snug">Praha 1</p>
            <p className={`text-[11px] md:text-[12px] lg:text-[14px] font-semibold ${isDarkMode ? 'text-[#F8F5E9]' : 'text-[#2C1508]'}`}>+420 777 123 456</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default function App() {
  const [page, setPage] = useState<Page>("atmosfera");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const pageTitles: Record<Page, string> = {
      atmosfera: "Gallery - Domů",
      menu: "Gallery - Menu",
      pribeh: "Gallery - Příběh",
      navstivte: "Gallery - Kontakt",
      registrace: "Gallery - Rezervace",
    };
    document.title = pageTitles[page];
  }, [page]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap"
      />
      <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#1E0E05]' : 'bg-[#F8F5E9]'}`} style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        {page === "registrace" ? (
          <Registrace onFinish={setPage} onBack={() => setPage("atmosfera")} isDarkMode={isDarkMode} />
        ) : (
          <>
            <Nav 
              page={page} 
              setPage={setPage} 
              isDarkMode={isDarkMode} 
              setIsDarkMode={setIsDarkMode}
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
            <main>
              {page === "atmosfera" && <AtmosferaPage setPage={setPage} isDarkMode={isDarkMode} />}
              {page === "menu"      && <MenuPage isDarkMode={isDarkMode} />}
              {page === "pribeh"    && <PribehPage isDarkMode={isDarkMode} />}
              {page === "navstivte" && <NavstivtePage isDarkMode={isDarkMode} />}
            </main>
            <Footer isDarkMode={isDarkMode} />
          </>
        )}
      </div>
    </>
  );
}
