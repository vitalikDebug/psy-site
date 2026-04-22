// src/components/CourseAuthorSection/CourseAuthorSection.jsx
'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Clock, HelpCircle, Rocket, ArrowRight, Mic } from 'lucide-react'; 
import './CourseAuthorSection.css';

const categories = [
  { id: 'all', title: 'Все записи' },
  { id: 'adults', title: 'О взрослых', icon: Briefcase, color: '#D98A5B', bg: '#F7E5D4' },
  { id: 'kids', title: 'О детях', icon: Clock, color: '#5B9A56', bg: '#D4E8D0' },
  { id: 'faq', title: 'Частые вопросы', icon: HelpCircle, color: '#6C758F', bg: '#E2E4E9' },
  { id: 'start', title: 'С чего начать', icon: Rocket, color: '#A078C4', bg: '#F3E1F5' },
  { id: 'podcast', title: 'Подкасты', icon: Mic, color: '#FF7A00', bg: '#FFF0E5' }
];

const blogPosts = [

  {
    id: 1,
    categoryId: 'podcast', 
    slug: 'podcast-neurologist',
    title: 'Подкаст: Психология и неврология заикания',
    excerpt: 'Совместный выпуск с врачом-неврологом Евой Баль. Разбираем заикание с двух сторон: медицина и психология. Что работает, а что нет?',
  },
  {
    id: 2,
    categoryId: 'faq',
    slug: 'will-it-pass',
    title: 'Может ли заикание пройти само с возрастом?',
    excerpt: 'Это один из самых частых вопросов родителей. Многие надеются, что ребёнок перерастёт, и речь выровняется сама. Да, так бывает, но нет никакой гарантии...',
  },
  {
    id: 3,
    categoryId: 'kids',
    slug: 'kids-psychotypes',
    title: 'Детские психотипы и речь: что скрывается за запинками',
    excerpt: 'Очень часто родители приходят с запросом «что делать с речью», но если смотреть глубже, становится понятно: речь — это отражение состояния ребёнка...',
  },
  {
    id: 4,
    categoryId: 'faq', 
    slug: 'tactless-questions',
    title: 'Бестактные вопросы про запинки: как реагировать?',
    excerpt: 'Часто такие вопросы звучат прямо при ребёнке из любопытства или «из лучших побуждений». Но по сути это всегда нарушение границ...',
  },
  {
    id: 5,
    categoryId: 'start', 
    slug: 'school-intensive',
    title: 'Интенсив для школьников: как мы преодолеваем заикание',
    excerpt: 'Рассказываю подробно, потому что наша работа всегда намного больше, чем просто про речь. Мы работаем в трёх направлениях...',
  },
  {
    id: 6,
    categoryId: 'kids', 
    slug: 'teacher-anxiety',
    title: 'Когда учитель неосознанно усиливает тревогу ребёнка',
    excerpt: 'Верю, учителя не хотят навредить. Наоборот, они хотят включить ребёнка в процесс, подтянуть, поддержать, сделать сильнее. Но даже хорошие намерения могут усиливать тревогу...',
  },
  {
    id: 7,
    categoryId: 'kids', 
    slug: 'books-emotions',
    title: 'Книги для эмоционального развития ребёнка',
    excerpt: 'Очень часто родители фокусируются только на речи ребёнка и ищут способы быстрее убрать запинки. При этом упускается важный момент: речь напрямую связана с эмоциями...',
  },
  {
    id: 8,
    categoryId: 'kids', 
    slug: 'school-anxiety-parents',
    title: 'Что делать родителям, если школа усиливает тревогу ребёнка?',
    excerpt: 'Если вы замечаете, что ребёнок не хочет идти в школу, стал раздражительным, закрытым, тревожным, начал сильнее запинаться, не спешите считать это ленью или капризами...',
  },
    {
    id: 9,
    categoryId: 'adults',
    slug: 'adults-regrets',
    title: 'Почему взрослые жалеют об упущенном времени?',
    excerpt: 'У меня много взрослых клиентов. И как бы странно это ни звучало, ко мне регулярно обращаются взрослые люди. Заикание к этому возрасту обрастает опытом, страхами и привычками...',
  },
  {
    id: 10,
    categoryId: 'kids',
    slug: 'bullying-and-stuttering',
    title: 'Про буллинг и заикание',
    excerpt: 'Есть вещи, которые невозможно скрыть. Есть уязвимости, которые становятся видны сразу, ещё до слов. Заикание — одна из них...',
  }
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

export default function CourseAuthorSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const pathname = usePathname();
  const fromParam = pathname === '/' ? 'home' : 'course';

  // Для расчета границ свайпа
  const sliderRef = useRef(null);
  const trackRef = useRef(null);
  const [sliderConstraints, setSliderConstraints] = useState({ left: 0, right: 0 });

  const filteredPosts = blogPosts.filter(post => 
    activeCategory === 'all' ? true : post.categoryId === activeCategory
  );

useEffect(() => {
    if (sliderRef.current && trackRef.current) {

      const timeoutId = setTimeout(() => {
        if (!sliderRef.current || !trackRef.current) return;
        
        const sliderWidth = sliderRef.current.offsetWidth;
        const trackWidth = trackRef.current.scrollWidth;
        
        const newLeft = trackWidth > sliderWidth ? -(trackWidth - sliderWidth) : 0;

        // Обновляем стейт ТОЛЬКО если значение реально изменилось
        setSliderConstraints((prev) => {
          if (prev.left === newLeft) return prev; 
          return { left: newLeft, right: 0 };
        });
      }, 50); // 50мс достаточно для перерисовки

      return () => clearTimeout(timeoutId);
    }
  }, [activeCategory, filteredPosts.length]);


  return (
    <section id="author" className="courseAuthorSection">
      <div className="authorSection__container">
        
        <motion.div 
          className="authorSection__header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={itemVariants}
        >
          <h2 className="authorSection__title">Полезные статьи</h2>
          <p className="authorSection__subtitle">Опыт из практики, который важно знать каждому.</p>
        </motion.div>

        {/* ФИЛЬТРЫ */}
        <motion.div 
          className="blogCategories"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={itemVariants}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button 
                key={cat.id}
                className={`categoryBtn ${isActive ? 'categoryBtn--active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.icon && (
                  <div className="categoryBtn__icon" style={{ backgroundColor: cat.bg }}>
                    <cat.icon size={16} color={cat.color} strokeWidth={2} />
                  </div>
                )}
                <span>{cat.title}</span>
              </button>
            );
          })}
        </motion.div>

        {/* ЛЕНТА (СЛАЙДЕР) ПОСТОВ */}
        <motion.div 
          className="slider-viewport"
          ref={sliderRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div 
            className="slider-track"
            ref={trackRef}
            drag={sliderConstraints.left < 0 ? "x" : false} // Включаем свайп только если нужно
            dragConstraints={sliderConstraints}
            dragElastic={0.1}
          >
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post) => {
                const tagData = categories.find(c => c.id === post.categoryId);
                return (
                  <motion.div 
                    key={post.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="blogCard-wrapper"
                  >
                    <div className="blogCard">
                      {tagData && (
                        <div className="blogCard__tag" style={{ backgroundColor: tagData.bg, color: tagData.color }}>
                          <tagData.icon size={14} strokeWidth={2.5} />
                          {tagData.title}
                        </div>
                      )}
                      
                      <h3 className="blogCard__title">{post.title}</h3>
                      <p className="blogCard__excerpt">{post.excerpt}</p>
                      
                      <Link href={`/blog/${post.slug}?from=${fromParam}`} className="blogCard__readMore">
                        Читать далее <ArrowRight size={16} />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            
            {filteredPosts.length === 0 && (
              <p className="blogPostsEmpty">В этой категории пока нет записей.</p>
            )}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}