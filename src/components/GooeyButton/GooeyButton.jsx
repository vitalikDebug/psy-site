// src/components/GooeyButton/GooeyButton.jsx
import Link from 'next/link';
import './GooeyButton.scss';

export default function GooeyButton({ href, children, className = '' }) {
  return (
    <div className={`gooey-button-wrapper ${className}`}>
      <Link href={href} className="gooey-button">
        {children}
        
        {/* Пузырьки, которые будут анимироваться */}
        <span className="bubbles">
          <span className="bubble"></span>
          <span className="bubble"></span>
          <span className="bubble"></span>
          <span className="bubble"></span>
          <span className="bubble"></span>
          <span className="bubble"></span>
          <span className="bubble"></span>
          <span className="bubble"></span>
          <span className="bubble"></span>
          <span className="bubble"></span>
        </span>
      </Link>

      {/* SVG фильтр для эффекта "слипания" */}
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="gooey-filter">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" 
              result="goo" 
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
          </filter>
        </defs>
      </svg>
    </div>
  );
}