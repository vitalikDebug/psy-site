// src/app/blog/[slug]/page.js
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import './BlogPost.css';

const articleData = {
    'will-it-pass': {
        title: 'Может ли заикание пройти само с возрастом?',
        date: '12 Апреля 2024',
        category: 'Частые вопросы',
        mainImage: '/photo_2026-03-27_20-59-20.jpg',
        blocks: [
            { type: 'text', content: 'Это один из самых частых вопросов родителей. Многие надеются, что ребёнок перерастёт, привыкнет, станет старше, и речь выровняется сама.' },
            { type: 'text', content: 'Да, так бывает, заикание может пройти. Совсем. Без любого вмешательства. Но нет никакой гарантии, что это произойдёт, как и нет единого инструмента.' },
            { type: 'highlight', content: 'Чаще ребенок взрослеет, учится подстраиваться, начинает говорить осторожнее, избегает сложных слов, меньше отвечает.' },
            { type: 'text', content: 'Со стороны кажется, что стало лучше. Но часто это не исчезновение заикания, а адаптация:' },
            {
                type: 'list', items: [
                    'говорить тише',
                    'говорить меньше',
                    'заменять слова',
                    'избегать ответов',
                    'бояться устных заданий'
                ]
            },
            { type: 'text', content: 'И напряжение остаётся внутри. Поэтому с возрастом заикание чаще не уходит, а меняется. Речь может становиться более ровной, но появляется страх речи, контроль, избегание.' },
            { type: 'quote', content: 'И уже подростки говорят:<br/>«Я знаю, что застряну»<br/>«Я заранее думаю, что не скажу»<br/>«Мне проще промолчать»' },
            { type: 'text', content: 'Поэтому важно не ждать, что всё пройдёт само. Если запинки держатся, усиливаются или ребёнок начинает переживать — лучше мягко помочь раньше.' },
            { type: 'text', content: 'Когда работа начинается вовремя, результат приходит быстрее и закрепляется легче. Ребёнок учится говорить спокойнее, увереннее и без постоянного контроля.' },
            { type: 'highlight', content: 'И часто родители уже в середине работы замечают, что ребёнок начинает свободнее говорить и меньше бояться речи 💜' },
        ]
    },
    'adults-regrets': {
        title: 'Почему взрослые жалеют об упущенном времени?',
        date: '10 Апреля 2024',
        category: 'О взрослых',
        mainImage: '/photo_2026-04-17_12-16-38.jpg',
        blocks: [
            { type: 'text', content: 'У меня много взрослых клиентов. И как бы странно это ни звучало, потому что мой блог в основном про детей и коррекцию речи у детей, ко мне регулярно обращаются взрослые люди.' },
            { type: 'text', content: 'Часто они пишут, что давно читают, узнают себя в описаниях, вспоминают своё детство и понимают, что их запинки никуда не исчезли, просто со временем стали частью жизни.' },
            { type: 'text', content: 'Со взрослыми мы всегда идём в индивидуальную работу, потому что заикание к этому возрасту уже обрастает опытом, страхами и привычками.' },
            {
                type: 'list', items: [
                    'Человек учится обходить сложные слова',
                    'Избегает выступлений, звонков, знакомств',
                    'Заранее продумывает фразы'
                ]
            },
            { type: 'quote', content: 'И почти каждый взрослый в какой-то момент говорит одну и ту же фразу:<br/>«Жаль, что мы не начали раньше. Жаль, что в детстве это осталось без внимания. Жаль, что столько лет ушло на страх говорить...»' },
            { type: 'highlight', content: 'Поэтому в таких случаях я всегда советую начинать работу раньше, пока заикание не закрепилось как привычная модель речи и поведения.' }
        ]
    },
    'kids-psychotypes': {
        title: 'Детские психотипы и речь',
        date: '15 Апреля 2024',
        category: 'О детях',
        mainImage: '/photo_2026-04-17_16-32-20.jpg',
        blocks: [
            { type: 'text', content: 'Очень часто родители приходят с запросом «что делать с речью», но если смотреть глубже, становится понятно, речь — это отражение состояния ребёнка.' },
            { type: 'text', content: 'Если упростить, можно выделить несколько психотипов, и у каждого из них есть не только особенности речи, но и поведения в целом.' },
            { type: 'subtitle', content: 'Чувствительные дети' },
            { type: 'text', content: 'Это дети, которые всё проживают глубже. Они могут долго переживать, обижаться, сильно реагировать на замечания и очень чувствовать атмосферу вокруг.' },
            { type: 'list', items: ['«А я правильно сказал?»', '«А ты на меня не злишься?»'] },
            { type: 'subtitle', content: 'Импульсивные дети' },
            { type: 'text', content: 'Это быстрые, активные дети, которые говорят, не успевая за мыслью. Они могут перебивать, перескакивать, говорить много и быстро.' },
            { type: 'list', items: ['«Подожди, я сейчас скажу!»', '«Я знаю, я знаю!»'] },
            { type: 'subtitle', content: 'Тревожные дети' },
            { type: 'text', content: 'Они заранее переживают, что не получится, боятся новых ситуаций, им важно, чтобы всё было понятно и безопасно.' },
            { type: 'list', items: ['«А если я не смогу?»', '«А вдруг я ошибусь?»'] },
            { type: 'subtitle', content: 'Дети-перфекционисты' },
            { type: 'text', content: 'Им важно сделать всё идеально. Они могут долго думать перед тем, как сказать, и переживать из-за ошибок.' },
            { type: 'subtitle', content: 'Дети, которые держат всё в себе' },
            { type: 'text', content: 'Они редко злятся открыто, не спорят, стараются быть «удобными», но внутри может быть много эмоций.' },
            { type: 'subtitle', content: '«Удобные» дети' },
            { type: 'text', content: 'Это дети, которые очень ориентированы на взрослых и стараются соответствовать.' },
            { type: 'highlight', content: 'И тогда работа идёт не только с запинками, а с состоянием ребёнка.' },
            { type: 'quote', content: 'Какой у вас ребёнок? 💜' },
        ]
    },
    'school-intensive': {
        title: 'Интенсив для школьников: Как мы преодолеваем заикание',
        date: '20 Апреля 2024',
        category: 'С чего начать',
        mainImage: '/photo_2026-04-17_17-36-41.jpg',
        blocks: [
            { type: 'text', content: 'Рассказываю подробно, потому что наша работа всегда намного больше, чем просто про речь.' },
            { type: 'highlight', content: 'Поэтому моя работа никогда не про «поставить речь». Она про создание пространства, где ребёнок может выдохнуть и перестать бояться.' },
            { type: 'subtitle', content: '1. Речевая работа' },
            { type: 'text', content: 'Идём от простого к сложному, от звука к слову и к фразе.' },
            { type: 'subtitle', content: '2. Работа с телом' },
            { type: 'text', content: 'Заикание почти всегда связано с мышечным напряжением.' },
            { type: 'subtitle', content: '3. Психологическая работа' },
            { type: 'text', content: 'Мы говорим о страхе оценки, о боли сравнения.' },
            { type: 'quote', content: 'Мы работаем как команда, потому что за каждым детским страхом часто стоит взрослый, который тоже долго не знал, что делать.' },
        ]
    },
    'tactless-questions': {
        title: 'Бестактные вопросы про запинки. Как реагировать родителям?',
        date: '25 Апреля 2024',
        category: 'Частые вопросы',
        mainImage: '/photo_2026-04-07_22-34-25.jpg',
        blocks: [
            { type: 'text', content: 'Часто такие вопросы звучат прямо при ребёнке.' },
            { type: 'list', items: ['«А почему ваш ребёнок заикается?»', '«Он у вас испугался?»'] },
            { type: 'highlight', content: 'Важно вернуть себе опору. Вы не обязаны объяснять состояние своего ребёнка.' },
            { type: 'subtitle', content: 'Иногда помогает лёгкий юмор' },
            { type: 'list', items: ['«Он тщательно подбирает слова»', '«Он думает быстрее, чем говорит»'] },
            { type: 'quote', content: 'Порой самая поддерживающая фраза очень простая: <br/>«Он скажет сам».' },
        ]
    },
};

export default async function BlogPost({ params, searchParams }) {
    const { slug } = await params;
    const currentSearchParams = await searchParams;

    const from = currentSearchParams?.from || 'course';
    const post = articleData[slug];

    if (!post) {
        return (
            <div className="blogPostPage errorPage">
                <h2>Статья не найдена</h2>
                <Link href="/" className="back-link">Вернуться на главную</Link>
            </div>
        );
    }

    // ДОБАВИЛИ #author К ССЫЛКАМ
    const backLink = from === 'home' ? '/#author' : '/course#author';
    const backText = from === 'home' ? 'На главную' : 'К курсу';

    return (
        <main className="blogPostPage">
            <article className="article-container">

                <Link href={backLink} className="article-back-btn">
                    <ArrowLeft size={20} />
                    <span>{backText}</span>
                </Link>

                <header className="article-header">
                    <div className="article-meta">
                        <span className="article-category">{post.category}</span>
                        <span className="article-date">{post.date}</span>
                    </div>
                    <h1 className="article-title">{post.title}</h1>
                </header>

                {post.mainImage && (
                    <div className="article-image">
                        <img src={post.mainImage} alt={post.title} />
                    </div>
                )}

                <div className="article-content">
                    {post.blocks.map((block, index) => {
                        if (block.type === 'text') {
                            return <p key={index}>{block.content}</p>;
                        }
                        if (block.type === 'subtitle') {
                            return <h3 key={index} className="article-block-subtitle">{block.content}</h3>;
                        }
                        if (block.type === 'highlight') {
                            return (
                                <div key={index} className="article-block-highlight">
                                    <p>{block.content}</p>
                                </div>
                            );
                        }
                        if (block.type === 'quote') {
                            return (
                                <blockquote key={index} className="article-block-quote" dangerouslySetInnerHTML={{ __html: block.content }} />
                            );
                        }
                        if (block.type === 'list') {
                            return (
                                <ul key={index} className="article-block-list">
                                    {block.items.map((item, i) => (
                                        <li key={i}>
                                            <span className="clip">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            );
                        }
                        return null;
                    })}
                </div>
            </article>
        </main>
    );
}