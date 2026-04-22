// src/components/BeforeAfterSection/BeforeAfterSection.jsx
'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, AlertCircle, Frown, Sparkles, Smile, ArrowRight } from 'lucide-react';
import './BeforeAfterSection.css';

// Данные для центрального видео
const videoData = {
  before: "/video/before.mp4",
  after: "/video/after.mp4"
};

// Данные для боковых карточек
const features = {
  before: [
    { 
      id: 'b1', 
      icon: AlertCircle, 
      iconColor: '#ef4444', 
      title: "Скованность тела", 
      text: "Сильное волнение перед началом разговора, видимое мышечное напряжение в шее." 
    },
    { 
      id: 'b2', 
      icon: Frown, 
      iconColor: '#f97316', 
      title: "Страх речи", 
      text: "Избегание зрительного контакта, прерывистое дыхание и паузы из-за ступора." 
    }
  ],
  after: [
    { 
      id: 'a1', 
      icon: Sparkles, 
      iconColor: '#A078C4', 
      title: "Плавность и легкость", 
      text: "Спокойное произношение без физических усилий. Дыхание ровное и свободное." 
    },
    { 
      id: 'a2', 
      icon: Smile, 
      iconColor: '#22c55e', 
      title: "Уверенный контакт", 
      text: "Человек спокойно смотрит в глаза собеседнику и получает удовольствие от общения." 
    }
  ]
};

const scrollContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};

const scrollItemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

export default function BeforeAfterSection() {
  const [activeTab, setActiveTab] = useState('before');
  const videoRef = useRef(null); 
  const [isPlaying, setIsPlaying] = useState(true); 
  const [isMuted, setIsMuted] = useState(true); 

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsPlaying(true);
    setIsMuted(true);
  };

  const togglePlay = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  return (
    <section className="beforeAfterSection" id="results-video">
      
      {/* ФОНОВЫЕ ЭЛЕМЕНТЫ (Градиенты и линии) */}
      <div className="ba-bg-elements">
        <div className="ba-blob ba-blob-1"></div>
        <div className="ba-blob ba-blob-2"></div>
        <svg className="ba-bg-pattern" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="dotted" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.5" fill="rgba(160, 120, 196, 0.15)" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dotted)" />
        </svg>
      </div>

      <motion.div 
        className="ba-container"
        variants={scrollContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div className="ba-header" variants={scrollItemVariants}>
          <h2>Результат, который говорит <span className="highlight">сам за себя</span></h2>
          <p>Посмотрите, как меняется речь, физическое состояние и взгляд, когда мы убираем внутреннее напряжение.</p>
        </motion.div>

        <div className="ba-grid">
          
          {/* ЛЕВАЯ КОЛОНКА: "ДО" (Проблемы) */}
          <div className={`ba-col ba-col-left ${activeTab === 'after' ? 'dimmed' : ''}`}>
            <div className="ba-col-header">
                <h3>ДО начала работы</h3>
                <span className="ba-badge error">Проблемы</span>
            </div>
            {features.before.map((feature) => (
              <motion.div key={feature.id} className="ba-feature-card" variants={scrollItemVariants}>
                <div className="ba-icon-box" style={{ backgroundColor: `${feature.iconColor}15`, color: feature.iconColor }}>
                  <feature.icon size={22} />
                </div>
                <div>
                    <h4>{feature.title}</h4>
                    <p>{feature.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ЦЕНТРАЛЬНАЯ КОЛОНКА: ВИДЕО И ПЕРЕКЛЮЧАТЕЛЬ */}
          <motion.div className="ba-col ba-col-center" variants={scrollItemVariants}>
            <div className="ba-video-wrapper">
              <button className="ba-mute-btn" onClick={toggleMute} aria-label={isMuted ? "Включить звук" : "Выключить звук"}>
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>

              <AnimatePresence mode='wait'>
                <motion.div 
                  key={activeTab}
                  className="ba-video-inner"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                >
                  <video 
                    ref={videoRef} 
                    src={videoData[activeTab]} 
                    className="ba-video"
                    autoPlay 
                    muted={isMuted}
                    loop 
                    playsInline
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  /> 
                  <div className="ba-video-overlay" onClick={togglePlay}>
                    <button className={`ba-play-btn ${!isPlaying ? 'visible' : ''}`}>
                      {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" style={{ marginLeft: '4px' }} />}
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Переключатель под видео */}
            <div className="ba-toggle-container">
              <button className={`ba-toggle-btn ${activeTab === 'before' ? 'active' : ''}`} onClick={() => handleTabChange('before')}>
                До курса
              </button>
              <button className={`ba-toggle-btn ${activeTab === 'after' ? 'active' : ''}`} onClick={() => handleTabChange('after')}>
                После курса
              </button>
              <motion.div 
                className="ba-toggle-slider"
                layoutId="ba-toggle-slider" 
                style={{ left: activeTab === 'before' ? '4px' : 'calc(50% + 2px)' }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>
          </motion.div>

          {/* ПРАВАЯ КОЛОНКА: "ПОСЛЕ" (Улучшения) */}
          <div className={`ba-col ba-col-right ${activeTab === 'before' ? 'dimmed' : ''}`}>
            <div className="ba-col-header">
                <h3>ПОСЛЕ курса</h3>
                <span className="ba-badge success">Улучшения</span>
            </div>
            {features.after.map((feature) => (
              <motion.div key={feature.id} className="ba-feature-card" variants={scrollItemVariants}>
                <div className="ba-icon-box" style={{ backgroundColor: `${feature.iconColor}15`, color: feature.iconColor }}>
                  <feature.icon size={22} />
                </div>
                <div>
                    <h4>{feature.title}</h4>
                    <p>{feature.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </motion.div>
    </section>
  );
}