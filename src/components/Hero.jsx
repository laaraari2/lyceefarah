import React, { useState, useEffect } from 'react';
import './HeroSlider.css';

const slides = [
  {
    id: 1,
    image: '/images/bac.png',
    alt: 'La Crèche Yassamine',
  },
  {
    id: 2,
    image: '/images/wahda.png',
    alt: 'Écoles Yassamine',
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  return (
    <section className="hero-slider-section">
      <div className="slider-wrapper">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide-item ${index === current ? 'active' : ''}`}
          >
            <img src={slide.image} alt={slide.alt} className="slide-image" />
          </div>
        ))}

        {/* Navigation arrows */}
        <button 
          className="slider-arrow slider-arrow-prev" 
          onClick={prevSlide}
          aria-label="Slide précédente"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button 
          className="slider-arrow slider-arrow-next" 
          onClick={nextSlide}
          aria-label="Slide suivante"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>

        {/* Indicators */}
        <div className="slider-dots">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`dot ${idx === current ? 'active' : ''}`}
              onClick={() => setCurrent(idx)}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
