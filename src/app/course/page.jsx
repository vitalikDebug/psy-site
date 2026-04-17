// src/app/course/page.js
import './CoursePage.css';

// Импортируем все наши чистые блоки

import CourseTargetSection from '@/components/CourseTargetSection/CourseTargetSection';
import CourseVideoSection from '@/components/CourseVideoSection/CourseVideoSection';

import CourseAuthorSection from '@/components/CourseAuthorSection/CourseAuthorSection';
import CourseHeroSection from '@/components/CourseHeroSection/CourseHeroSection';
import CourseModulesSection from '@/components/CourseModuleSection/CourseModulesSection';
import CoursePricingSection from '@/components/CoursePricingSection/CoursePricingSection';

export default function CoursePage() {
  return (
    <main className="coursePage">
      {/* Мягкие фоновые свечения страницы */}
      <div className="coursePage__glow coursePage__glow--1"></div>
      <div className="coursePage__glow coursePage__glow--2"></div>

      {/* Наш лендинг, собранный из независимых блоков */}
      <CourseHeroSection />
      <CourseTargetSection />
      <CourseVideoSection />
      <CourseModulesSection />
      <CourseAuthorSection />
      <CoursePricingSection/>
    </main>
  );
}