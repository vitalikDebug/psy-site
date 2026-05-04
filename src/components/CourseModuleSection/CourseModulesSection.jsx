// src/components/CourseModulesSection/CourseModulesSection.jsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import './CourseModulesSection.css';

const modulesData = [
  {
    id: 1, title: "УРОК 1", subtitle: "Состояние и речь",
    bullets: ["вы увидите, как ребёнок считывает не слова, а ваше состояние", "поймёте, почему он рядом с вами может говорить по-разному", "заметите, как ваше напряжение сразу отражается в его речи"],
    colors: ['#e0c3fc', '#8ec5fc'] 
  },
  {
    id: 2, title: "УРОК 2", subtitle: "Паузы и ожидание",
    bullets: ["поймёте, что пауза — это не «он не может», а ему стало сложно", "увидите, как спешка усиливает заикание", "научитесь выдерживать момент, в котором речь выравнивается"],
    colors: ['#a1c4fd', '#c2e9fb'] 
  },
  {
    id: 3, title: "УРОК 3", subtitle: "Давление помощи",
    bullets: ["узнаете, как давление появляется, даже когда вы «просто помогаете»", "увидите, в какие моменты ребёнок начинает зажиматься", "поймёте, какие слова усиливают запинки"],
    colors: ['#ffecd2', '#fcb69f'] 
  },
  {
    id: 4, title: "УРОК 4", subtitle: "Напряжение в теле",
    bullets: ["увидите связь: напряжение в теле = напряжение в речи", "начнёте замечать это в обычной жизни", "поймёте, почему в расслабленном состоянии ребёнок говорит легче"],
    colors: ['#cfd9df', '#e2ebf0'] 
  },
  {
    id: 5, title: "УРОК 5", subtitle: "Живое общение",
    bullets: ["узнаете, почему ребёнок закрывается в разговоре", "увидите, как «скажи правильно» ломает лёгкость речи", "поймёте, как вернуть живое общение"],
    colors: ['#fbc2eb', '#a6c1ee'] 
  },
  {
    id: 6, title: "УРОК 6", subtitle: "Естественное дыхание",
    bullets: ["поймёте, почему дыхание не нужно контролировать", "увидите, как оно выравнивается, когда ребёнку спокойно", "заметите, как через это меняется речь"],
    colors: ['#84fab0', '#8fd3f4'] 
  },
  {
    id: 7, title: "УРОК 7", subtitle: "Ощущение безопасности",
    bullets: ["увидите, как ребёнок чувствует оценку, даже без слов", "поймёте, почему рядом с вами ему может быть сложнее", "узнаете, что даёт ему ощущение безопасности"],
    colors: ['#ff9a9e', '#fecfef'] 
  },
  {
    id: 8, title: "УРОК 8", subtitle: "Ловушка подсказок",
    bullets: ["поймёте, почему «помочь» — не всегда про поддержку", "узнаете себя в моментах, когда хочется подсказать", "увидите, как это усиливает заикание"],
    colors: ['#d4fc79', '#96e6a1'] 
  },
  {
    id: 9, title: "УРОК 9", subtitle: "Поддержка без оценки",
    bullets: ["поймёте, почему даже «молодец» может напрягать", "увидите, как ребёнок начинает стараться и зажиматься", "научитесь поддерживать без давления"],
    colors: ['#a18cd1', '#fbc2eb'] 
  },
  {
    id: 10, title: "УРОК 10", subtitle: "Свободная речь",
    bullets: ["почувствуете, что речь не нужно «чинить»", "увидите, как она выравнивается без усилия", "поймёте, как ребёнок перестаёт застревать в этом состоянии"],
    colors: ['#fdfbfb', '#ebedee'] 
  }
];

export default function CourseModulesSection() {
  const [activeModule, setActiveModule] = useState(modulesData[0].id);
  const activeData = modulesData.find(m => m.id === activeModule) || modulesData[0];

  return (
    <section id="modules" className="horizontalRoadmap">
      
      {/* ФОН СЕКЦИИ */}
      <div className="horizontalRoadmap__bg">
        <motion.div 
          className="roadmap-blob roadmap-blob-1"
          animate={{ backgroundColor: activeData.colors[0] }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <motion.div 
          className="roadmap-blob roadmap-blob-2"
          animate={{ backgroundColor: activeData.colors[1] }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <div className="horizontalRoadmap__glass-overlay"></div>
      </div>

      <div className="horizontalRoadmap__container">
        
        <div className="horizontalRoadmap__header">
          <h2 className="horizontalRoadmap__title">Программа курса</h2>
          <p className="horizontalRoadmap__subtitle">Пошаговый путь к свободной речи вашего ребёнка</p>
        </div>

        {/* --- СЕТКА КАРТОЧЕК --- */}
        <div className="roadmapSteps__wrapper">
          <div className="roadmapSteps__grid">
            {modulesData.map((mod) => {
              const isActive = activeModule === mod.id;
              
              return (
                <div 
                  key={mod.id} 
                  className={`roadmapStep ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveModule(mod.id)}
                >
                  <div className="roadmapStep__line-segment"></div>

                  <motion.div 
                    className="roadmapStep__marker"
                    animate={{ 
                      borderColor: isActive ? activeData.colors[0] : '#cbd5e1',
                      backgroundColor: isActive ? activeData.colors[0] : '#ffffff',
                      scale: isActive ? 1.3 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <div className="roadmapStep__card">
                    <div className="roadmapStep__card-header">
                      <span className="roadmapStep__num">{mod.title}</span>
                      {isActive && <ArrowRight size={14} className="roadmapStep__arrow" style={{ color: activeData.colors[0] }} />}
                    </div>
                    <h4 className="roadmapStep__title">{mod.subtitle}</h4>

                    {/* === НОВЫЙ БЛОК: АККОРДЕОН ДЛЯ МОБИЛЬНЫХ === */}
                    <div className="roadmapStep__mobile-details-wrapper">
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ duration: 0.3 }}
                            className="roadmapStep__mobile-details"
                          >
                            <ul className="roadmapStep__mobile-list">
                              {mod.bullets.map((bullet, idx) => (
                                <li key={idx}>
                                  <CheckCircle2 size={16} className="roadmapStep__mobile-icon" style={{ color: activeData.colors[0] }} />
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* --- ОСНОВНОЙ БЛОК ОПИСАНИЯ (ТОЛЬКО ДЛЯ ПК) --- */}
        <div className="activeLesson__showcase desktop-only">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeData.id}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="activeLesson__card"
            >
              <div className="activeLesson__header">
                <span className="activeLesson__badge" style={{ backgroundColor: activeData.colors[0] }}>
                  {activeData.title}
                </span>
                <h3 className="activeLesson__card-title">{activeData.subtitle}</h3>
              </div>
              
              <ul className="activeLesson__list">
                {activeData.bullets.map((bullet, idx) => (
                  <li key={idx}>
                    <CheckCircle2 size={22} className="activeLesson__icon" style={{ color: activeData.colors[0] }} />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}