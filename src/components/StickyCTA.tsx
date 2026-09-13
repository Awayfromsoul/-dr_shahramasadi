import { useState } from "react";
import { Phone } from "lucide-react";
import { useBooking } from "../context/BookingContext";
import { CallSheet } from "./CallSheet";

/**
 * Mobile sticky bottom CTA — ONLY «رزرو مشاوره» + «تماس با مطب».
 * "تماس با مطب" opens a phone-selection sheet with the three official numbers.
 * Black blurred surface, thin gold top border, safe-area aware. No WhatsApp.
 */
export function StickyCTA() {
  const { openBooking } = useBooking();
  const [callOpen, setCallOpen] = useState(false);

  return (
    <>
      <div className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-[#D4AF37]/35 bg-[#070707]/94 backdrop-blur-md lg:hidden">
        <div className="grid grid-cols-2 gap-3 px-4 py-3">
          <button
            type="button"
            onClick={() => setCallOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={callOpen}
            className="flex min-h-[48px] items-center justify-center gap-2 border border-white/20 bg-transparent px-4 py-3 text-xs font-medium text-[#F5F2EA] transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
          >
            <Phone className="h-4 w-4 text-[#D4AF37]" />
            تماس با مطب
          </button>

          <button
            type="button"
            onClick={() => openBooking()}
            className="flex min-h-[48px] items-center justify-center gap-2 border border-[#D4AF37] bg-[#D4AF37] px-4 py-3 text-xs font-semibold text-[#070707] transition-all hover:bg-[#E6C766]"
          >
            رزرو مشاوره
          </button>
        </div>
      </div>

      <CallSheet open={callOpen} onClose={() => setCallOpen(false)} />
    </>
  );
}
