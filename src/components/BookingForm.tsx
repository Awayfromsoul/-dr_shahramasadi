import { useState, type FormEvent } from "react";
import { Check, Loader2, Phone, Send } from "lucide-react";
import { PHONE_TEL, PHONES, TREATMENT_OPTIONS } from "../data/content";
import { cn } from "../utils/cn";

interface BookingFormProps {
  initialService?: string;
  compact?: boolean;
}

interface Fields {
  name: string;
  phone: string;
  treatment: string;
  notes: string;
}

export function BookingForm({ initialService = "", compact }: BookingFormProps) {
  const [fields, setFields] = useState<Fields>({
    name: "",
    phone: "",
    treatment: initialService,
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const set = (key: keyof Fields, value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Fields> = {};
    if (!fields.name.trim()) next.name = "لطفاً نام و نام خانوادگی را وارد فرمایید.";
    const phone = fields.phone.replace(/[\s()-]/g, "");
    if (!phone) next.phone = "شماره تماس الزامی است.";
    else if (!/^0?9\d{9}$/.test(phone) && !/^0\d{10}$/.test(phone))
      next.phone = "شماره تماس معتبر نیست.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    // Static site: in production this would post to the clinic's CRM endpoint.
    window.setTimeout(() => setStatus("done"), 1100);
  };

  if (status === "done") {
    return (
      <div className="flex flex-col items-center gap-5 border border-[#D4AF37]/40 bg-[#0D0D0D] px-6 py-12 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#D4AF37] text-[#D4AF37]">
          <Check className="h-6 w-6" />
        </span>
        <div>
          <p className="text-lg font-semibold text-[#F5F2EA]">
            درخواست مشاوره شما ثبت گردید
          </p>
          <p className="mt-2 text-xs leading-relaxed text-[#A7A39A]">
            همکاران مطب دکتر شهرام اسعدی جهت هماهنگی نوبت ویزیت با شما تماس
            خواهند گرفت.
          </p>
        </div>
        <div className="w-full max-w-xs">
          <p className="mb-2 text-[11px] text-[#A7A39A]">تماس مستقیم با مطب</p>
          <ul className="flex flex-col gap-2">
            {PHONES.map((p) => (
              <li key={p.tel}>
                <a
                  href={p.tel}
                  aria-label={`تماس با ${p.label}: ${p.display}`}
                  className="flex min-h-[44px] items-center justify-between gap-3 border border-[#D4AF37]/40 px-4 py-2 text-xs font-semibold text-[#D4AF37] transition-all hover:bg-[#D4AF37] hover:text-[#070707]"
                >
                  <span className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5" />
                    {p.label}
                  </span>
                  <span dir="ltr" className="font-serif text-sm tracking-wider">
                    {p.display}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => {
            setStatus("idle");
            setFields({ name: "", phone: "", treatment: "", notes: "" });
          }}
          className="text-xs text-[#A7A39A] underline-offset-4 hover:underline"
        >
          ثبت درخواست جدید
        </button>
      </div>
    );
  }

  const labelCls = "text-xs font-medium text-[#A7A39A]";
  const inputCls = cn(
    "w-full border border-white/15 bg-[#070707] px-4 py-3.5 text-sm text-[#F5F2EA] placeholder:text-[#A7A39A]/40",
    "transition-colors focus:border-[#D4AF37] focus:outline-none"
  );

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-5 text-right">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor={`nm-${compact}`} className={labelCls}>
            نام و نام خانوادگی <span className="text-[#D4AF37]">*</span>
          </label>
          <input
            id={`nm-${compact}`}
            type="text"
            autoComplete="name"
            value={fields.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="نام و نام خانوادگی"
            className={cn(inputCls, errors.name && "border-red-500/70")}
          />
          {errors.name && <span className="text-[11px] text-red-400">{errors.name}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={`ph-${compact}`} className={labelCls}>
            شماره تماس <span className="text-[#D4AF37]">*</span>
          </label>
          <input
            id={`ph-${compact}`}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={fields.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="۰۹۱۲ ··· ····"
            className={cn(inputCls, errors.phone && "border-red-500/70")}
          />
          {errors.phone && <span className="text-[11px] text-red-400">{errors.phone}</span>}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`tx-${compact}`} className={labelCls}>
          نوع درمان موردنظر
        </label>
        <select
          id={`tx-${compact}`}
          value={fields.treatment}
          onChange={(e) => set("treatment", e.target.value)}
          className={cn(inputCls, "appearance-none")}
        >
          <option value="">انتخاب کنید…</option>
          {TREATMENT_OPTIONS.map((o) => (
            <option key={o} value={o} className="bg-[#0D0D0D] text-[#F5F2EA]">
              {o}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`nt-${compact}`} className={labelCls}>
          توضیحات
        </label>
        <textarea
          id={`nt-${compact}`}
          rows={3}
          value={fields.notes}
          onChange={(e) => set("notes", e.target.value)}
          placeholder="توضیح کوتاه درباره شرایط یا سوال شما (اختیاری)"
          className={cn(inputCls, "resize-none")}
        />
      </div>

      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex flex-1 items-center justify-center gap-2 border border-[#D4AF37] bg-[#070707] px-7 py-4 text-xs font-semibold tracking-wide text-[#D4AF37] transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#070707] disabled:opacity-60"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              در حال ارسال…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              رزرو مشاوره
            </>
          )}
        </button>

        <a
          href={PHONE_TEL}
          className="inline-flex items-center justify-center gap-2 border border-white/20 bg-transparent px-6 py-4 text-xs text-[#F5F2EA] transition-all hover:border-[#D4AF37] hover:text-[#D4AF37]"
        >
          <Phone className="h-4 w-4 text-[#D4AF37]" />
          تماس با مطب
        </a>
      </div>
    </form>
  );
}
