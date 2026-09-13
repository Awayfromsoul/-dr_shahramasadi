import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface BookingCtx {
  open: boolean;
  prefill: string;
  openBooking: (service?: string) => void;
  close: () => void;
}

const Ctx = createContext<BookingCtx>({
  open: false,
  prefill: "",
  openBooking: () => {},
  close: () => {},
});

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState("");

  const openBooking = useCallback((service?: string) => {
    setPrefill(service ?? "");
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // Lock body scroll while open + close on Escape
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <Ctx.Provider value={{ open, prefill, openBooking, close }}>
      {children}
    </Ctx.Provider>
  );
}

export function useBooking() {
  return useContext(Ctx);
}
