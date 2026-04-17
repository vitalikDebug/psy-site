// src/app/page.js
'use client';

// 1. Импортируем хук контекста (useState здесь больше не нужен)
import { useModal } from '@/context/ModalContext';

import HeroSection from "@/components/HeroSection/HeroSection";
// ... остальные импорты секций без изменений ...
import ResultsSection from "@/components/resultSection/ResultSection";
import ApproachSection from "@/components/approachSection/ApproachSection";
import ProcessSection from "@/components/processSection/ProcessSection";
import ReviewsSection from "@/components/rewiewsSection/ReviewsSection";
import ServicesSection from "@/components/servicesSection/ServicesSection";
import AboutSection from "@/components/aboutSection/AboutSection";
import ProblemSection from "@/components/problemSection/ProblemSection";
import ConsequencesSection from "@/components/сonsequencesSection/ConsequencesSection";
import FAQSection from "@/components/FAQSection/FAQSection";
import FinalCTASection from "@/components/FinalCTASection/FinalCTASection";
import Footer from "@/components/footer/Footer";
import ContactModal from "@/components/ContactModal/ContactModal";
import CauseSection from '@/components/causeSection/CauseSection';
import BeforeAfterSection from '@/components/beforeAfterSection/BeforeAfterSection';
import CourseAuthorSection from '@/components/CourseAuthorSection/CourseAuthorSection';

export default function Home() {
  // 2. Достаем всё состояние и функции из глобального контекста
  const { isModalOpen, selectedService, closeModal } = useModal();

  // ЛОКАЛЬНОЕ СОСТОЯНИЕ И ФУНКЦИИ УДАЛЕНЫ (они теперь в контексте)

  return (
    <main>
      {/* Секции теперь сами используют useModal(), им не нужны пропсы */}
      <HeroSection />
      <AboutSection />
      <CourseAuthorSection />
      <ProblemSection />
      <CauseSection />
      <ConsequencesSection />
      <ServicesSection />
      <ApproachSection />
      <ResultsSection />
      <BeforeAfterSection />
      <ReviewsSection />
      <ProcessSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />

      {/* 3. Модалка теперь получает данные напрямую из контекста */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={closeModal}
        initialService={selectedService}
      />
    </main>
  );
}