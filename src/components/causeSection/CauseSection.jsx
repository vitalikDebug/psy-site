// src/components/CauseSection/CauseSection.jsx
import './CauseSection.css';

export default function CauseSection() {
  return (
    <section className="causeSection" id="cause">
      <div className="causeSection__container">
        
        <h2 className="causeSection__title">
          ПОЧЕМУ ВОЗНИКАЕТ <br /> ЗАИКАНИЕ
        </h2>

        <div className="causeGrid">
          
          {/* Главная мысль (Широкий блок сверху) */}
          <div className="causeItem causeItem--intro">
            <h3 className="causeItem__title">Это не проблема звуков</h3>
            <p className="causeItem__text">
              Заикание — это реакция нервной системы на напряжение. Когда появляется страх речи, мозг начинает гипертрофированно контролировать каждый звук, что приводит к физическому ступору.
            </p>
          </div>

          {/* Шаг 1 */}
          <div className="causeItem causeItem--step">
            <div className="causeItem__step-num">01</div>
            <h3 className="causeItem__title">Напряжение</h3>
            <p className="causeItem__text">
              Возникает волнение перед общением, звонком или сложной ситуацией. Тело мобилизуется, связки зажимаются.
            </p>
          </div>

          {/* Шаг 2 */}
          <div className="causeItem causeItem--step">
            <div className="causeItem__step-num">02</div>
            <h3 className="causeItem__title">Запинка</h3>
            <p className="causeItem__text">
              Из-за спазма мышц речевого аппарата происходит сбой. Слово «застревает», нарушается плавность дыхания.
            </p>
          </div>

          {/* Шаг 3 */}
          <div className="causeItem causeItem--step">
            <div className="causeItem__step-num">03</div>
            <h3 className="causeItem__title">Страх</h3>
            <p className="causeItem__text">
              Мозг моментально фиксирует неудачу. Формируется стойкий страх перед конкретными словами, звуками или людьми.
            </p>
          </div>

          {/* Шаг 4 */}
          <div className="causeItem causeItem--step">
            <div className="causeItem__step-num">04</div>
            <h3 className="causeItem__title">Контроль</h3>
            <p className="causeItem__text">
              Попытка сказать «идеально правиильно» и избежать запинки приводит к колоссальному стрессу и... новому напряжению.
            </p>
          </div>

          {/* Итог (Широкий блок снизу) */}
          <div className="causeItem causeItem--outro">
             <h3 className="causeItem__title">Порочный круг замыкается</h3>
             <p className="causeItem__text">
              Одно цепляется за другое, усиливая симптом с каждым разом. Именно поэтому так важно работать с первопричиной — страхом и напряжением, а не только механически тренировать речь.
             </p>
          </div>

        </div>
      </div>
    </section>
  );
}