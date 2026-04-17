// src/app/blog/[slug]/page.js
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import './BlogPost.css';

const articleData = {
    'will-it-pass': {
        title: 'Может ли заикание пройти само с возрастом?',
        date: '12 Апреля 2024',
        category: 'Частые вопросы',
        mainImage: '/photo_child.jpg',
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
    }
};

// CHANGE 1: Make the component async
export default async function BlogPost({ params, searchParams }) {
    // CHANGE 2: Await params before using it
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

    const backLink = from === 'home' ? '/' : '/course';
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
                                        <li key={i}><span className="clip"></span> {item}</li>
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