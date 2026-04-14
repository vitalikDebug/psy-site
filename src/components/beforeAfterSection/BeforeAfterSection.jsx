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

    // videoSrc: "https://github.com/vitalikDebug/psy-site/releases/download/v1.0-media/first_v_before.mp4" 
    videoSrc: "/video/first_v_before.mp4"
  },
  after: {
    id: 'after',
    title: "ПОСЛЕ: Свобода и уверенность",
    description: "Плавная, спокойная речь без видимых усилий. Уверенный зрительный контакт, отсутствие страха паузы. Человек получает удовольствие от общения.",
 
    // videoSrc: "https://github.com/vitalikDebug/psy-site/releases/download/v1.0-media/first_v_after.mp4" 
    videoSrc: "/video/first_v_after.mp4"
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
    e.stopPropagation(); // Чтобы клик не срабатывал дважды
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
      videoRef.current.muted = !isMuted; // Принудительно меняем в DOM
    }
    setIsMuted(!isMuted); // Меняем состояние React
  };

  return (
    <section className={`beforeAfterSection beforeAfterSection--${activeTab}`} id="results-video">
      <div className="beforeAfterSection__container">
        
        <h2 className="beforeAfterSection__header">
          Результат — это не магия, а <span className="highlight">системная работа</span> с причиной
        </h2>

        <div className="beforeAfterSection__content">
          
          <div className="beforeAfterSection__video-wrapper">
            {/* Обертка для позиционирования внешней кнопки звука */}
            <div className="video-player-box">
              
              {/* Внешняя кнопка звука (в правом верхнем углу) */}
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
                    muted={isMuted} // Важно: привязываем к состоянию
                    loop 
                    playsInline
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  /> 

                  {/* Оверлей затемнения и кнопка Play/Pause по центру */}
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
          </div>

          <div className="beforeAfterSection__text-content">
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
        </div>

        <div className="beforeAfterSection__controls">
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
        </div>

      </div>
    </section>
  );
}