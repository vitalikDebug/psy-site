// src/components/BeforeAfterSection/BeforeAfterSection.jsx
'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import './BeforeAfterSection.css';

const contentData = {
  before: {
    id: 'before',
    title: "ДО: Скованность и страх",
    description: "Речь прерывистая, сильное волнение перед началом разговора. Заметны физические зажимы в области шеи и челюсти. Избегание зрительного контакта.",
    videoSrc: "/video/before.mp4"
  },
  after: {
    id: 'after',
    title: "ПОСЛЕ: Свобода и уверенность",
    description: "Плавная, спокойная речь без видимых усилий. Уверенный зрительный контакт, отсутствие страха паузы. Человек получает удовольствие от общения.",
    videoSrc: "/video/after.mp4"
  }
};

// --- НАСТРОЙКИ АНИМАЦИИ ПРИ СКРОЛЛЕ ---
const scrollContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Задержка между вылетом элементов
      delayChildren: 0.1,
    }
  }
};

const scrollItemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0, opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20, duration: 0.6 }
  }
};

export default function BeforeAfterSection() {
  const [activeTab, setActiveTab] = useState('before');
  const activeContent = contentData[activeTab];

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
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
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
      {/* Главный контейнер с анимацией при скролле */}
      <motion.div 
        className="beforeAfterSection__container"
        variants={scrollContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        
        <motion.h2 className="beforeAfterSection__header" variants={scrollItemVariants}>
          Результат — это не магия, а <span className="highlight">системная работа</span> с причиной
        </motion.h2>

        <div className="beforeAfterSection__content">
          
          <motion.div className="beforeAfterSection__video-wrapper" variants={scrollItemVariants}>
            <div className="video-player-box">
              <button className="video-mute-btn-external" onClick={toggleMute} aria-label={isMuted ? "Включить звук" : "Выключить звук"}>
                {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
              </button>

              <AnimatePresence mode='wait'>
                <motion.div 
                  key={activeTab}
                  className="telegram-video-container"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <video 
                    ref={videoRef} 
                    src={activeContent.videoSrc} 
                    className="telegram-video"
                    autoPlay 
                    muted={isMuted}
                    loop 
                    playsInline
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  /> 

                  <div className="video-overlay" onClick={togglePlay}>
                    <button 
                      className={`video-play-btn ${!isPlaying ? 'visible' : ''}`} 
                      aria-label={isPlaying ? "Пауза" : "Воспроизвести"}
                    >
                      {isPlaying ? (
                        <Pause size={32} fill="currentColor" />
                      ) : (
                        <Play size={32} fill="currentColor" style={{ marginLeft: '4px' }} />
                      )}
                    </button>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div className="beforeAfterSection__text-content" variants={scrollItemVariants}>
            {/* НОВЫЙ БЛОК ДЛЯ ТЕКСТА С ГРАДИЕНТОМ */}
            <div className="text-content-card">
                <AnimatePresence mode='wait'>
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <h3 className="beforeAfterSection__title">{activeContent.title}</h3>
                    <p className="beforeAfterSection__description">
                    {activeContent.description}
                    </p>
                </motion.div>
                </AnimatePresence>
            </div>
          </motion.div>

        </div>

        <motion.div className="beforeAfterSection__controls" variants={scrollItemVariants}>
          <div className="toggle-container">
            <button 
              className={`toggle-btn ${activeTab === 'before' ? 'active' : ''}`}
              onClick={() => handleTabChange('before')}
            >
              До курса
            </button>
            <button 
              className={`toggle-btn ${activeTab === 'after' ? 'active' : ''}`}
              onClick={() => handleTabChange('after')}
            >
              После курса
            </button>
            <motion.div 
              className="toggle-slider"
              layoutId="toggle-slider" 
              style={{ 
                left: activeTab === 'before' ? '4px' : '50%',
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}