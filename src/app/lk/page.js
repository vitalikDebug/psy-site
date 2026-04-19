import { Info, Lock } from 'lucide-react';

export default function LkDashboard() {
    return (
        <main>
            <h1 style={{ fontFamily: 'var(--font-family-headings)', fontSize: '36px', color: 'var(--color-text-dark)', marginBottom: '30px' }}>
                Мой путь
            </h1>

            {/* АКТИВНЫЙ ЭТАП */}
            <div style={{ background: 'var(--color-white)', padding: '30px', borderRadius: '24px', boxShadow: '0 15px 40px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.04)', marginBottom: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                    <span style={{ background: '#A078C4', color: 'white', padding: '4px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>
                        Текущий этап
                    </span>
                    <span style={{ color: '#666', fontSize: '14px', fontWeight: '600' }}>Неделя 1 из 12</span>
                </div>

                <h2 style={{ fontFamily: 'var(--font-family-headings)', fontSize: '28px', marginBottom: '12px' }}>
                    Охранительный речевой режим
                </h2>

                <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '24px' }}>
                    На этой неделе мы полностью снимаем речевое напряжение. Ваша задача — свести общение к минимуму. Связь с Юлией только в текстовом формате.
                </p>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', background: 'rgba(160, 120, 196, 0.05)', padding: '16px', borderRadius: '16px', color: '#A078C4' }}>
                    <Info size={20} style={{ marginTop: '2px', flexShrink: 0 }} />
                    <p style={{ fontSize: '14px', fontWeight: '500', margin: 0, lineHeight: '1.5' }}>
                        До снятия режима тишины осталось: <strong>3 дня</strong>. Продолжайте наблюдать за своими телесными реакциями.
                    </p>
                </div>
            </div>

            {/* СЛЕДУЮЩИЙ ЭТАП (Заблокирован) */}
            <div style={{ background: 'var(--color-white)', padding: '30px', borderRadius: '24px', border: '1px dashed #d1c4e9', opacity: 0.7 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <Lock size={18} color="#A078C4" />
                    <h3 style={{ fontFamily: 'var(--font-family-headings)', fontSize: '20px', margin: 0 }}>Неделя 2: Запуск голоса и гласные</h3>
                </div>
                <p style={{ color: '#666', margin: 0, paddingLeft: '30px' }}>Откроется после завершения режима тишины.</p>
            </div>

        </main>
    );
}