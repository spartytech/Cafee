import { useState } from "react";

type Step = 1 | 2 | 3;

interface ReservationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes: string;
}

const GUEST_OPTIONS = [
  { id: 1, label: "1 osoba" },
  { id: 2, label: "2 osoby" },
  { id: 3, label: "3 osoby" },
  { id: 4, label: "4 osoby" },
  { id: 5, label: "5 osob" },
  { id: 6, label: "6 osob" },
  { id: 7, label: "7 osob" },
  { id: 8, label: "8+ osob" },
];

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30", "20:00",
];

const serif = { fontFamily: "'Playfair Display', Georgia, serif" };
const inputCls = (isDarkMode: boolean) =>
  `w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm outline-none focus:border-[#4A2512] focus:ring-2 focus:ring-[#4A2512]/10 transition-all placeholder:text-[#B8A898] ${
    isDarkMode
      ? "bg-[#1F1B18] border border-[#4A2512] text-[#F8F5E9]"
      : "bg-[#F0ECD8] border border-[#DDD8C4] text-[#3A2410]"
  }`;
const labelCls = (isDarkMode: boolean) =>
  `block text-[8px] sm:text-[10px] tracking-[1.5px] md:tracking-[2px] uppercase mb-1.5 sm:mb-2 font-medium ${
    isDarkMode ? "text-[#F8F5E9]" : "text-[#7A6050]"
  }`;

const StepIndicator = ({ current, isDarkMode }: { current: Step; isDarkMode: boolean }) => {
  const steps = [
    { n: 1, label: "Kontakt" },
    { n: 2, label: "Datum & čas" },
    { n: 3, label: "Potvrzení" },
  ];
  return (
    <div className="flex items-center justify-center gap-0 mb-6 sm:mb-12 px-2">
      {steps.map((s, i) => (
        <div key={s.n} className="flex items-center flex-shrink-0">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-7 sm:w-9 h-7 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-all duration-300 flex-shrink-0 ${
                current > s.n
                  ? "bg-[#C8871A] text-white"
                  : current === s.n
                  ? "bg-[#1E0E05] text-[#F8F5E9]"
                  : "bg-[#EEE9D4] text-[#7A6050] border border-[#DDD8C4]"
              }`}
            >
              {current > s.n ? "✓" : s.n}
            </div>
            <span
              className={`text-[7px] sm:text-[10px] tracking-[1px] md:tracking-[1.5px] uppercase font-medium whitespace-nowrap ${
                current === s.n
                  ? isDarkMode
                    ? "text-[#F8F5E9]"
                    : "text-[#2C1508]"
                  : isDarkMode
                  ? "text-[#D5C5B3]"
                  : "text-[#7A6050]"
              }`}
            >
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`w-8 sm:w-20 h-px mx-1 sm:mx-2 mb-5 transition-colors duration-300 flex-shrink-0 ${
                current > s.n ? "bg-[#C8871A]" : "bg-[#DDD8C4]"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const Step1 = ({
  data,
  setData,
  onNext,
  isDarkMode,
}: {
  data: ReservationData;
  setData: (d: ReservationData) => void;
  onNext: () => void;
  isDarkMode: boolean;
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!data.firstName.trim()) e.firstName = "Zadejte jméno";
    if (!data.lastName.trim()) e.lastName = "Zadejte příjmení";
    if (!data.email.includes("@")) e.email = "Zadejte platný e-mail";
    if (!data.phone.trim()) e.phone = "Zadejte telefonní číslo";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  return (
    <div>
      <div className="text-center mb-6 sm:mb-8">
        <p className={`text-[8px] sm:text-[10px] tracking-[2px] md:tracking-[3px] uppercase mb-2 sm:mb-3 ${isDarkMode ? "text-[#D5C5B3]" : "text-[#7A6050]"}`}>Krok 1 ze 3</p>
        <h2 className={`text-[22px] sm:text-[28px] md:text-[36px] font-bold mb-1.5 sm:mb-2 ${isDarkMode ? "text-[#F8F5E9]" : "text-[#2C1508]"}`} style={serif}>
          Vaše kontaktní údaje
        </h2>
        <p className={`text-[11px] sm:text-sm max-w-xs sm:max-w-sm mx-auto leading-relaxed ${isDarkMode ? "text-[#D5C5B3]" : "text-[#7A6050]"}`}>
          Pomozte nám znát vás lépe. Tyto informace použijeme pro potvrzení vaší rezervace.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:gap-5">
        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          <div>
            <label className={labelCls(isDarkMode)}>Jméno</label>
            <input
              type="text"
              className={`${inputCls(isDarkMode)} ${errors.firstName ? "border-red-400 focus:border-red-400" : ""}`}
              placeholder="Jan"
              value={data.firstName}
              onChange={(e) => setData({ ...data, firstName: e.target.value })}
            />
            {errors.firstName && <p className="text-red-500 text-[9px] sm:text-[11px] mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <label className={labelCls(isDarkMode)}>Příjmení</label>
            <input
              type="text"
              className={`${inputCls(isDarkMode)} ${errors.lastName ? "border-red-400 focus:border-red-400" : ""}`}
              placeholder="Novák"
              value={data.lastName}
              onChange={(e) => setData({ ...data, lastName: e.target.value })}
            />
            {errors.lastName && <p className="text-red-500 text-[9px] sm:text-[11px] mt-1">{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <label className={labelCls(isDarkMode)}>E-mailová adresa</label>
          <input
            type="email"
            className={`${inputCls(isDarkMode)} ${errors.email ? "border-red-400 focus:border-red-400" : ""}`}
            placeholder="jan@example.cz"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          {errors.email && <p className="text-red-500 text-[9px] sm:text-[11px] mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className={labelCls(isDarkMode)}>Telefonní číslo</label>
          <input
            type="tel"
            className={`${inputCls(isDarkMode)} ${errors.phone ? "border-red-400 focus:border-red-400" : ""}`}
            placeholder="+420 777 123 456"
            value={data.phone}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
          />
          {errors.phone && <p className="text-red-500 text-[9px] sm:text-[11px] mt-1">{errors.phone}</p>}
        </div>

        <button
          onClick={handleNext}
          className="w-full bg-[#1E0E05] text-[#F8F5E9] border-none rounded-lg sm:rounded-2xl py-2.5 sm:py-3.5 text-xs sm:text-sm font-semibold cursor-pointer hover:bg-[#2C1508] transition-colors mt-2"
        >
          Pokračovat →
        </button>
      </div>
    </div>
  );
};

const Step2 = ({
  data,
  setData,
  onNext,
  onBack,
  isDarkMode,
}: {
  data: ReservationData;
  setData: (d: ReservationData) => void;
  onNext: () => void;
  onBack: () => void;
  isDarkMode: boolean;
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!data.date) e.date = "Vyberte datum";
    if (!data.time) e.time = "Vyberte čas";
    if (data.guests === 0) e.guests = "Vyberte počet osob";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <div>
      <div className="text-center mb-6 sm:mb-8">
        <p className={`text-[8px] sm:text-[10px] tracking-[2px] md:tracking-[3px] uppercase mb-2 sm:mb-3 ${isDarkMode ? "text-[#D5C5B3]" : "text-[#7A6050]"}`}>Krok 2 ze 3</p>
        <h2 className={`text-[22px] sm:text-[28px] md:text-[36px] font-bold mb-1.5 sm:mb-2 ${isDarkMode ? "text-[#F8F5E9]" : "text-[#2C1508]"}`} style={serif}>
          Vyberte datum a čas
        </h2>
        <p className={`text-[11px] sm:text-sm max-w-xs sm:max-w-sm mx-auto leading-relaxed ${isDarkMode ? "text-[#D5C5B3]" : "text-[#7A6050]"}`}>
          Kdy se chcete podívat? Máme volná místa pro skupiny i jednotlivce.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:gap-5">
        <div>
          <label className={labelCls(isDarkMode)}>Datum</label>
          <input
            type="date"
            min={minDate}
            className={`${inputCls(isDarkMode)} ${errors.date ? "border-red-400" : ""}`}
            value={data.date}
            onChange={(e) => setData({ ...data, date: e.target.value })}
          />
          {errors.date && <p className="text-red-500 text-[9px] sm:text-[11px] mt-1">{errors.date}</p>}
        </div>

        <div>
          <label className={labelCls(isDarkMode)}>Čas</label>
          <select
            className={`${inputCls(isDarkMode)} cursor-pointer ${errors.time ? "border-red-400" : ""}`}
            value={data.time}
            onChange={(e) => setData({ ...data, time: e.target.value })}
          >
            <option value="">Vyberte čas...</option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {errors.time && <p className="text-red-500 text-[9px] sm:text-[11px] mt-1">{errors.time}</p>}
        </div>

        <div>
          <label className={labelCls(isDarkMode)}>Počet osob</label>
          <select
            className={`${inputCls(isDarkMode)} cursor-pointer ${errors.guests ? "border-red-400" : ""}`}
            value={data.guests || ""}
            onChange={(e) => setData({ ...data, guests: parseInt(e.target.value) || 0 })}
          >
            <option value="">Vyberte počet...</option>
            {GUEST_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.guests && <p className="text-red-500 text-[9px] sm:text-[11px] mt-1">{errors.guests}</p>}
        </div>

        <div>
          <label className={labelCls(isDarkMode)}>Poznámky (volitelné)</label>
          <textarea
            className={inputCls(isDarkMode)}
            placeholder="Máte nějaké speciální přání?"
            rows={3}
            value={data.notes}
            onChange={(e) => setData({ ...data, notes: e.target.value })}
          />
        </div>

        <div className="flex gap-2 sm:gap-3 flex-col sm:flex-row">
          <button
            onClick={onBack}
            className="flex-1 bg-transparent text-[#3A2410] border border-[#DDD8C4] rounded-lg sm:rounded-2xl py-2.5 sm:py-3.5 text-xs sm:text-sm font-medium cursor-pointer hover:bg-[#EEE9D4] transition-colors"
          >
            ← Zpět
          </button>
          <button
            onClick={handleNext}
            className="flex-1 bg-[#1E0E05] text-[#F8F5E9] border-none rounded-lg sm:rounded-2xl py-2.5 sm:py-3.5 text-xs sm:text-sm font-semibold cursor-pointer hover:bg-[#2C1508] transition-colors"
          >
            Pokračovat →
          </button>
        </div>
      </div>
    </div>
  );
};

const Step3 = ({
  data,
  onNext,
  onBack,
  loading,
  isDarkMode,
}: {
  data: ReservationData;
  onNext: () => void;
  onBack: () => void;
  loading: boolean;
  isDarkMode: boolean;
}) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("cs-CZ", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div>
      <div className="text-center mb-6 sm:mb-8">
        <p className={`text-[8px] sm:text-[10px] tracking-[2px] md:tracking-[3px] uppercase mb-2 sm:mb-3 ${isDarkMode ? "text-[#D5C5B3]" : "text-[#7A6050]"}`}>Krok 3 ze 3</p>
        <h2 className={`text-[22px] sm:text-[28px] md:text-[36px] font-bold mb-1.5 sm:mb-2 ${isDarkMode ? "text-[#F8F5E9]" : "text-[#2C1508]"}`} style={serif}>
          Potvrďte rezervaci
        </h2>
        <p className={`text-[11px] sm:text-sm max-w-xs sm:max-w-sm mx-auto leading-relaxed ${isDarkMode ? "text-[#D5C5B3]" : "text-[#7A6050]"}`}>
          Zkontrolujte prosím všechny údaje a potvrďte vaši rezervaci.
        </p>
      </div>

      <div className={`rounded-lg sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border transition-colors ${
        isDarkMode
          ? "bg-[#1F1B18] border-[#4A2512]"
          : "bg-[#F0ECD8] border border-[#DDD8C4]"
      }`}>
        <p className={`text-[8px] sm:text-[10px] tracking-[1.5px] md:tracking-[2px] uppercase mb-3 sm:mb-4 ${isDarkMode ? "text-[#D5C5B3]" : "text-[#7A6050]"}`}>Shrnutí rezervace</p>
        <div className="space-y-2 sm:space-y-3">
          <div className="flex justify-between text-[11px] sm:text-[13px]">
            <span className="text-[#7A6050]">Jméno:</span>
            <span className="font-semibold text-[#2C1508]">{data.firstName} {data.lastName}</span>
          </div>
          <div className="flex justify-between text-[11px] sm:text-[13px]">
            <span className="text-[#7A6050]">E-mail:</span>
            <span className="font-semibold text-[#2C1508] break-all">{data.email}</span>
          </div>
          <div className="flex justify-between text-[11px] sm:text-[13px]">
            <span className="text-[#7A6050]">Telefon:</span>
            <span className="font-semibold text-[#2C1508]">{data.phone}</span>
          </div>
          <div className="border-t border-[#DDD8C4] my-2 sm:my-3 pt-2 sm:pt-3">
            <div className="flex justify-between mb-2 text-[11px] sm:text-[13px]">
              <span className="text-[#7A6050]">Datum:</span>
              <span className="font-semibold text-[#2C1508]">{formatDate(data.date)}</span>
            </div>
            <div className="flex justify-between mb-2 text-[11px] sm:text-[13px]">
              <span className="text-[#7A6050]">Čas:</span>
              <span className="font-semibold text-[#2C1508]">{data.time}</span>
            </div>
            <div className="flex justify-between text-[11px] sm:text-[13px]">
              <span className="text-[#7A6050]">Počet osob:</span>
              <span className="font-semibold text-[#2C1508]">{data.guests}</span>
            </div>
          </div>
          {data.notes && (
            <>
              <div className="border-t border-[#DDD8C4] my-2 sm:my-3 pt-2 sm:pt-3">
                <span className="text-[11px] sm:text-[13px] text-[#7A6050]">Poznámka:</span>
                <p className="text-[11px] sm:text-[13px] text-[#2C1508] mt-1">{data.notes}</p>
              </div>
            </>
          )}
        </div>
      </div>

<div className={`rounded-lg sm:rounded-2xl p-3 sm:p-4 mb-6 sm:mb-8 border transition-colors ${
          isDarkMode
            ? "bg-[#1A1714] border-[#4A2512]"
            : "bg-[#F8F5E9] border border-[#DDD8C4]"
        }`}>
          <p className={`text-[10px] sm:text-[11px] leading-relaxed ${isDarkMode ? "text-[#D5C5B3]" : "text-[#7A6050]"}`}>
          Potvrzovací e-mail obdržíte na adresu <strong>{data.email}</strong>.
        </p>
      </div>

      <div className="flex gap-2 sm:gap-3 flex-col sm:flex-row">
        <button
          onClick={onBack}
          className="flex-1 bg-transparent text-[#3A2410] border border-[#DDD8C4] rounded-lg sm:rounded-2xl py-2.5 sm:py-3.5 text-xs sm:text-sm font-medium cursor-pointer hover:bg-[#EEE9D4] transition-colors"
        >
          ← Zpět
        </button>
        <button
          onClick={onNext}
          disabled={loading}
          className="flex-1 bg-[#1E0E05] text-[#F8F5E9] border-none rounded-lg sm:rounded-2xl py-2.5 sm:py-3.5 text-xs sm:text-sm font-semibold cursor-pointer hover:bg-[#2C1508] transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-[#F8F5E9]/30 border-t-[#F8F5E9] rounded-full animate-spin" />
              <span>Odesílám...</span>
            </>
          ) : (
            "Potvrdit rezervaci →"
          )}
        </button>
      </div>
    </div>
  );
};

const SuccessPage = ({
  data,
  onFinish,
  isDarkMode,
}: {
  data: ReservationData;
  onFinish: (page: any) => void;
  isDarkMode: boolean;
}) => {
  return (
    <div className="text-center">
      <div className={`w-16 sm:w-20 h-16 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 text-2xl sm:text-3xl ${
        isDarkMode ? "bg-[#C8871A] text-[#1E0E05]" : "bg-[#1E0E05] text-[#F8F5E9]"
      }`}>
        ✓
      </div>

      <p className={`text-[8px] sm:text-[10px] tracking-[2px] md:tracking-[3px] uppercase mb-2 sm:mb-3 ${isDarkMode ? "text-[#D5C5B3]" : "text-[#7A6050]"}`}>Rezervace potvrzena</p>
      <h2 className={`text-[28px] sm:text-[32px] md:text-[40px] font-bold mb-2 sm:mb-3 ${isDarkMode ? "text-[#F8F5E9]" : "text-[#2C1508]"}`} style={serif}>
        Těšíme se na vás!
      </h2>
      <p className={`text-[11px] sm:text-sm max-w-xs sm:max-w-sm mx-auto leading-relaxed mb-6 sm:mb-10 ${isDarkMode ? "text-[#D5C5B3]" : "text-[#7A6050]"}`}>
        Vaše rezervace na den{" "}
        <strong>{new Date(data.date + "T00:00:00").toLocaleDateString("cs-CZ")} v {data.time}</strong> byla
        potvrzena. Potvrzovací e-mail jsme odeslali na <strong>{data.email}</strong>.
      </p>

      <div className={`rounded-lg sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border transition-colors ${
        isDarkMode
          ? "bg-[#1F1B18] border-[#4A2512]"
          : "bg-[#F0ECD8] border border-[#DDD8C4]"
      }`}>
        <p className={`text-[8px] sm:text-[10px] tracking-[1.5px] md:tracking-[2px] uppercase mb-3 ${isDarkMode ? "text-[#D5C5B3]" : "text-[#7A6050]"}`}>Čekáme na vás</p>
        <p className={`text-[14px] sm:text-[16px] font-semibold mb-2 ${isDarkMode ? "text-[#F8F5E9]" : "text-[#2C1508]"}`}>The Sensory Gallery</p>
        <p className={`text-[11px] sm:text-[13px] leading-relaxed ${isDarkMode ? "text-[#D5C5B3]" : "text-[#7A6050]"}`}>
          Gallery Square 12<br />
          Praha 1, 110 00<br />
          +420 777 123 456
        </p>
      </div>

      <div className="flex gap-2 sm:gap-3 flex-col sm:flex-row">
        <button
          onClick={() => onFinish("menu")}
          className="flex-1 bg-[#1E0E05] text-[#F8F5E9] border-none rounded-lg sm:rounded-2xl py-2.5 sm:py-3.5 text-xs sm:text-sm font-semibold cursor-pointer hover:bg-[#2C1508] transition-colors"
        >
          Zobrazit menu
        </button>
        <button
          onClick={() => onFinish("atmosfera")}
          className="flex-1 bg-transparent text-[#2C1508] border border-[#DDD8C4] rounded-lg sm:rounded-2xl py-2.5 sm:py-3.5 text-xs sm:text-sm font-medium cursor-pointer hover:bg-[#EEE9D4] transition-colors"
        >
          Domů
        </button>
      </div>
    </div>
  );
};

type PageType = "atmosfera" | "menu" | "pribeh" | "navstivte" | "registrace";

export default function Registrace({
  onFinish,
  onBack,
  isDarkMode,
}: {
  onFinish: (page: PageType) => void;
  onBack: () => void;
  isDarkMode: boolean;
}) {
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [form, setForm] = useState<ReservationData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 0,
    notes: "",
  });

  const handleFinish = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCompleted(true);
    }, 1200);
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap"
      />
      <div
        className={`min-h-screen flex flex-col lg:flex-row transition-colors ${
          isDarkMode ? "bg-[#110F0D] text-[#F8F5E9]" : "bg-[#F8F5E9] text-[#2C1508]"
        }`}
        style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
      >
        {/* Left panel – decorative (hidden on mobile) */}
        <div className="hidden lg:flex w-80 shrink-0 bg-[#1E0E05] flex-col justify-between p-8 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(200,135,26,0.3) 20px, rgba(200,135,26,0.3) 21px)",
            }}
          />

          <button
            onClick={onBack}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-[#F8F5E9] text-lg border-none cursor-pointer transition-colors"
            title="Zavřít rezervaci"
          >
            ✕
          </button>

          <div className="relative">
            <p className="italic text-lg sm:text-xl text-[#F8F5E9]" style={serif}>
              The Sensory Gallery
            </p>
            <p className="text-[8px] sm:text-[10px] tracking-[2px] sm:tracking-[3px] text-[#C8871A] uppercase mt-1">
              Prémiová pražírna · Praha
            </p>
          </div>

          <div className="relative">
            <div className="w-16 h-px bg-[#C8871A] mb-8" />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F8F5E9] leading-[1.1] mb-6" style={serif}>
              Umění<br />v každém<br />šálku.
            </h2>
            <p className="text-xs sm:text-sm text-[#B8A898] leading-relaxed max-w-xs">
              Rezervujte si místíčko v naší intimní galerii. Omezená kapacita, maximální atmosféra.
            </p>
          </div>

          <div className="relative grid grid-cols-3 gap-4 pt-6 sm:pt-8 border-t border-white/10">
            <div>
              <p className="text-xl sm:text-2xl font-bold text-[#F8F5E9] mb-0.5" style={serif}>
                350m²
              </p>
              <p className="text-[7px] sm:text-[10px] tracking-[1px] md:tracking-[1.5px] text-[#B8A898] uppercase">Plocha</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-[#F8F5E9] mb-0.5" style={serif}>40</p>
              <p className="text-[7px] sm:text-[10px] tracking-[1px] md:tracking-[1.5px] text-[#B8A898] uppercase">Míst</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-[#F8F5E9] mb-0.5" style={serif}>7/24</p>
              <p className="text-[7px] sm:text-[10px] tracking-[1px] md:tracking-[1.5px] text-[#B8A898] uppercase">Otevřeno</p>
            </div>
          </div>
        </div>

        {/* Right panel – form */}
        <div className="flex-1 flex flex-col items-center justify-center py-6 sm:py-12 lg:py-16 px-4 sm:px-6 overflow-y-auto">
          {/* Mobile close button */}
          <button
            onClick={onBack}
            className={`lg:hidden absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-lg border-none cursor-pointer transition-colors ${
              isDarkMode
                ? "bg-white/10 hover:bg-white/20 text-[#F8F5E9]"
                : "bg-[#1E0E05]/10 hover:bg-[#1E0E05]/20 text-[#1E0E05]"
            }`}
          >
            ✕
          </button>

          <div className="w-full max-w-sm">
            {!completed && step < 3 && <StepIndicator current={step} isDarkMode={isDarkMode} />}

            <div
              className={`rounded-2xl sm:rounded-3xl shadow-sm p-4 sm:p-6 md:p-8 border transition-colors ${
                isDarkMode
                  ? "bg-[#1F1B18] border-[#4A2512]"
                  : "bg-white border-[#EEE9D4]"
              }`}
            >
              {!completed ? (
                <>
                  {step === 1 && <Step1 data={form} setData={setForm} onNext={() => setStep(2)} isDarkMode={isDarkMode} />}
                  {step === 2 && (
                    <Step2 data={form} setData={setForm} onNext={() => setStep(3)} onBack={() => setStep(1)} isDarkMode={isDarkMode} />
                  )}
                  {step === 3 && (
                    <Step3 data={form} onNext={handleFinish} onBack={() => setStep(2)} loading={loading} isDarkMode={isDarkMode} />
                  )}
                </>
              ) : (
                <SuccessPage data={form} onFinish={onFinish} isDarkMode={isDarkMode} />
              )}
            </div>

            {!completed && step < 3 && (
              <p className={`text-center text-[11px] sm:text-[13px] mt-4 ${isDarkMode ? "text-[#D5C5B3]" : "text-[#7A6050]"}`}>
                Máte dotazy?{" "}
                <span
                  className={`underline underline-offset-2 cursor-pointer transition-colors ${
                    isDarkMode ? "text-[#F8F5E9] hover:text-[#DDD1B3]" : "text-[#4A2512] hover:text-[#2C1508]"
                  }`}
                >
                  Volejte nám
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
