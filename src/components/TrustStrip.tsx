import { TRUST_ITEMS } from "../data/content";
import { DiamondMark } from "./icons";
import { Container } from "./ui";

export function TrustStrip() {
  return (
    <section className="relative border-y border-[#D4AF37]/25 bg-[#0D0D0D]">
      <Container className="py-7">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:justify-between">
          {TRUST_ITEMS.map((item, i) => (
            <div key={item} className="flex items-center gap-8">
              <span className="text-xs tracking-wide text-[#F5F2EA] sm:text-sm">
                {item}
              </span>
              {i < TRUST_ITEMS.length - 1 && (
                <DiamondMark className="hidden h-2.5 w-2.5 text-[#D4AF37]/70 md:block" />
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
