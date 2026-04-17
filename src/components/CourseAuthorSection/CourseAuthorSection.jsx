// src/components/CourseAuthorSection/CourseAuthorSection.jsx
'use client';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Clock, HelpCircle, Rocket, ArrowRight } from 'lucide-react';
import './CourseAuthorSection.css';

// Данные категорий (они же теги)
const categories = [
  { id: 'all', title: 'Все записи' },
  { id: 'adults', title: 'О взрослых', icon: Briefcase, color: '#D98A5B', bg: '#F7E5D4' },
  { id: 'kids', title: 'О детях', icon: Clock, color: '#5B9A56', bg: '#D4E8D0' },
  { id: 'faq', title: 'Частые вопросы', icon: HelpCircle, color: '#6C758F', bg: '#E2E4E9' },
  { id: 'start', title: 'С чего начать', icon: Rocket, color: '#A078C4', bg: '#F3E1F5' }
];


const blogPosts = [
  {
    id: 1,
    categoryId: 'adults',
    slug: 'adults-regrets',
    title: 'Почему взрослые жалеют об упущенном времени?',
    excerpt: 'У меня много взрослых клиентов. И как бы странно это ни звучало, ко мне регулярно обращаются взрослые люди. Заикание к этому возрасту обрастает опытом, страхами и привычками...',
    fullText: 'Человек учится обходить сложные слова, избегает выступлений, звонков, знакомств. И почти каждый взрослый в какой-то момент говорит: «Жаль, что мы не начали раньше».',
  },
  {
    id: 2,
    categoryId: 'faq',
    slug: 'will-it-pass',
    title: 'Может ли заикание пройти само с возрастом?',
    excerpt: 'Это один из самых частых вопросов родителей. Многие надеются, что ребёнок перерастёт, и речь выровняется сама. Да, так бывает, но нет никакой гарантии...',
    fullText: 'Чаще ребенок взрослеет, учится подстраиваться, начинает говорить осторожнее. Со стороны кажется, что стало лучше. Но часто это не исчезновение заикания, а адаптация: говорить тише, избегать ответов.',
  },
  {
    id: 3,
    categoryId: 'start',
    title: 'Начните раньше: Интенсивы',
    excerpt: 'Поэтому я всегда советую начинать работу раньше, пока заикание не закрепилось как привычная модель поведения. Отлично подходит формат интенсивов...',
    fullText: 'Мы создаём безопасное пространство, постепенно снижаем напряжение и начинаем выравнивать речь. 13 апреля стартует мини-интенсив, а 23 апреля — полноценный.',
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

export default function CourseAuthorSection() {
  const [activeCategory, setActiveCategory] = useState('all');
const pathname = usePathname();
  // Фильтруем посты в зависимости от выбранной категории
  const fromParam = pathname === '/' ? 'home' : 'course';
  const filteredPosts = blogPosts.filter(post => 
    activeCategory === 'all' ? true : post.categoryId === activeCategory
  );

  return (
    <section className="authorSection">
      <div className="authorSection__container">
        
        {/* ЗАГОЛОВОК */}
        <motion.div 
          className="authorSection__header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={itemVariants}
        >
          <h2 className="authorSection__title">От автора курса.</h2>
          <p className="authorSection__subtitle">Опыт из практики, который важно знать каждому родителю.</p>
        </motion.div>

        {/* =========================================
            КАТЕГОРИИ (ФИЛЬТРЫ)
        ========================================= */}
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
                {/* Если это не кнопка "Все", показываем иконку */}
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

        {/* =========================================
            ЛЕНТА ПОСТОВ
        ========================================= */}
        <motion.div 
          className="blogPostsGrid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => {
              // Находим данные категории для этого поста, чтобы отрендерить тег
              const tagData = categories.find(c => c.id === post.categoryId);

              return (
                <motion.div 
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="blogCard"
                >
                  {/* ТЕГ ПОСТА */}
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
                </motion.div>
              );
            })}
          </AnimatePresence>
          
          {filteredPosts.length === 0 && (
            <p className="blogPostsEmpty">В этой категории пока нет записей.</p>
          )}
        </motion.div>

      </div>
    </section>
  );
}