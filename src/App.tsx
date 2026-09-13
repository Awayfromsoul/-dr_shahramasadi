import { BookingProvider } from "./context/BookingContext";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { TrustStrip } from "./components/TrustStrip";
import { Philosophy } from "./components/Philosophy";
import { AboutDoctor } from "./components/AboutDoctor";
import { Experience } from "./components/Experience";
import { Services } from "./components/Services";
import { Implant } from "./components/Implant";
import {
  DigitalImplant,
  PeriodontalSection,
  LaserSection,
} from "./components/Expertise";
import { Cases } from "./components/Cases";
import { ProfessionalLicenses } from "./components/ProfessionalLicenses";
import { ClinicalGallery } from "./components/ClinicalGallery";
import { InstagramFeed } from "./components/InstagramFeed";
import { LocationSection } from "./components/Location";
import { Journey } from "./components/Journey";
import { OutOfTown } from "./components/OutOfTown";
import { FAQSection } from "./components/FAQ";
import { BookingSection } from "./components/BookingSection";
import { Footer } from "./components/Footer";
import { StickyCTA } from "./components/StickyCTA";
import { BookingModal } from "./components/BookingModal";

export default function App() {
  return (
    <BookingProvider>
      <div className="min-h-screen bg-[#070707] pb-24 sm:pb-28 text-[#F5F2EA] lg:pb-0">
        <Header />
        <main>
          <Hero />
          <TrustStrip />

          {/* 01 — Philosophy */}
          <Philosophy />

          {/* 02 — About the doctor */}
          <AboutDoctor />

          {/* Professional experience (verified wording) */}
          <Experience />

          {/* 03 — Services */}
          <Services />

          {/* Clinical expertise */}
          <Implant />
          <DigitalImplant />
          <PeriodontalSection />
          <LaserSection />

          {/* 04 — Selected cases / Before & After */}
          <Cases />

          {/* 05 — Professional credentials: the three REAL certificates */}
          <ProfessionalLicenses />

          {/* Clinical image gallery */}
          <ClinicalGallery />

          {/* 06 — Instagram */}
          <InstagramFeed />

          {/* 07 — Clinic location */}
          <LocationSection />

          {/* 08 — Treatment path */}
          <Journey />

          <OutOfTown />

          {/* 09 — FAQ */}
          <FAQSection />

          {/* Book a consultation */}
          <BookingSection />
        </main>

        <Footer />
        <StickyCTA />
        <BookingModal />
      </div>
    </BookingProvider>
  );
}
