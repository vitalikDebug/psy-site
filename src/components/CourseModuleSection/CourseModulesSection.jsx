// src/components/CourseModulesSection/CourseModulesSection.jsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import './CourseModulesSection.css';
import AnimatedBrainSVG from '../AnimatedBrainSVG/AnimatedBrainSVG';
import AnimatedBalanceSVG from '../AnimatedBalanceSvg/AnimatedBalanceSvg';
import AnimatedAnxietySVG from '../AnimatedAnixetySVG/AnimatedAnixetySVG';
import AnimatedChillSVG from '../AnimatedChillSVG/AnimatedChillSVG';

// Данные модулей курса
const modulesData = [
  {
   id: 1,
    title: "Модуль 1. Природа заикания и осознанность",
    description: "Разбираем истинные причины запинок. Вы поймете, как работает речевой аппарат ребенка, почему возникают ступоры и перестанете винить себя. Это фундамент, без которого не работает ни одна техника.",
    type: 'svg', 
    component: <AnimatedBrainSVG className="module-svg-icon" />
  },
{
    id: 2,
    title: "Модуль 2. Работа с родительской тревогой",
    description: "Дети считывают наше состояние. В этом модуле мы учимся снимать ваше внутреннее напряжение, возвращать опору и реагировать на запинки ребенка спокойно, без паники и жалости.",
    type: 'svg', // <-- МЕНЯЕМ 'image' НА 'svg'
    component: <AnimatedAnxietySVG className="module-svg-icon" /> 
  },
  {
    id: 3,
    title: "Модуль 3. Правильная реакция и среда",
    description: "Как правильно слушать? Куда смотреть, когда ребенок застрял на слове? Нужно ли помогать ему договорить? Выстраиваем дома терапевтическую среду, где ребенку безопасно звучать.",
    type: 'svg',
    component: <AnimatedChillSVG className="module-svg-icon" /> 
  },
  {
    id: 4,
    title: "Модуль 4. Снижение напряжения и результат",
    description: "Переходим к практическим инструментам расслабления тела и снижения темпа жизни. Вы увидите, как через изменение семейных привычек речь ребенка становится более плавной и свободной.",
    type: 'svg', 
    component: <AnimatedBalanceSVG className="module-svg-icon" /> 
  }
];

export default function CourseModulesSection() {
  // По умолчанию открыт первый модуль
  const [activeModule, setActiveModule] = useState(modulesData[0].id);

  const toggleModule = (id) => {
    setActiveModule(activeModule === id ? null : id);
  };

  // Находим данные активного модуля для вывода картинки справа
  const activeData = modulesData.find(m => m.id === activeModule) || modulesData[0];

  return (
    <section id="modules" className="modulesSection">
      <div className="modulesSection__container">
        
        <div className="modulesSection__header">
          <h2 className="modulesSection__title">Программа курса</h2>
          <p className="modulesSection__subtitle">Пошаговый путь к свободной речи вашего ребёнка</p>
        </div>

        <div className="modulesGrid">
          
       
          <div className="modulesAccordion">
            {modulesData.map((mod) => {
              const isActive = activeModule === mod.id;

             return (
                <div key={mod.id} className={`accordionItem ${isActive ? 'accordionItem--active' : ''}`}>
                  <button className="accordionItem__header" onClick={() => toggleModule(mod.id)}>
                    <span className="accordionItem__title">{mod.title}</span>
                    <motion.div 
                      className="accordionItem__icon"
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={24} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="accordionItem__body"
                      >
                        <div className="accordionItem__content">
                          <p>{mod.description}</p>
                          
                          {/* Картинка или SVG для мобильных */}
                          <div className="accordionItem__mobile-illus">
                            {mod.type === 'svg' ? (
                                mod.component
                            ) : (
                                <motion.img 
                                  src={mod.illustration} 
                                  alt="Иллюстрация модуля"
                                  animate={{ y: [0, -10, 0] }}
                                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                />
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* --- ПРАВАЯ КОЛОНКА: ПАРЯЩАЯ ИЛЛЮСТРАЦИЯ (Десктоп) --- */}
          <div className="modulesVisual">
            <div className="modulesVisual__sticky">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeData.id}
                  initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                  transition={{ duration: 0.5 }}
                  className="modulesVisual__image-wrapper"
                >
                  {/* Если тип SVG, рендерим компонент. Иначе - картинку с анимацией парения */}
                  {activeData.type === 'svg' ? (
                      activeData.component
                  ) : (
                      <motion.img 
                        src={activeData.illustration} 
                        alt={activeData.title} 
                        animate={{ y: [0, -20, 0] }}
                        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                      />
                  )}
                </motion.div>
              </AnimatePresence>
              <div className="modulesVisual__glow"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}