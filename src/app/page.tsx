'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './page.module.scss';

const projects = [
  { number: '01', name: 'WorldAtlas', type: 'Exploration / Geography', summary: 'A country-exploration website featuring an interactive globe.', url: 'https://worldatlas0018.vercel.app/', visual: 'globe' },
  { number: '02', name: 'E-commerce Website', type: 'Commerce / Web application', summary: 'A separate e-commerce project. Its specific workflows and features are still being documented.', url: 'https://e-commerce-sagarupadhyay.vercel.app/', visual: 'commerce' },
  { number: '03', name: 'Movie Finding Website', type: 'Discovery / Entertainment', summary: 'A movie-discovery project. Data source and search behavior need confirmation.', url: 'https://movie-finding-website.vercel.app/', visual: 'film' },
  { number: '04', name: 'Employee Management System', type: 'Management / Web application', summary: 'An employee-management application; implemented workflows need confirmation.', url: 'https://employees-management-systemmm.vercel.app/', visual: 'people' },
  { number: '05', name: 'Kanban Board', type: 'Organization / Productivity', summary: 'A board-based task-organization project. Interaction details need confirmation.', url: 'https://kanban-boarddd.vercel.app/', visual: 'board' },
  { number: '06', name: 'Snake Game', type: 'Game / Interactive programming', summary: 'A game project exploring interactive programming and application logic.', url: 'https://snake-game-sagarupadhyay.vercel.app/', visual: 'snake' },
];

const skillGroups = [
  { label: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'] },
  { label: 'Workflow', items: ['Git', 'GitHub', 'Vercel'] },
  { label: 'Application experience', items: ['Component-based development', 'Client-side routing', 'React Context + useReducer', 'Cart state + localStorage', 'Clerk integration', 'External APIs', 'Interactive 3D'] },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true" className={styles.arrow}>{diagonal ? '↗' : '→'}</span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);
  const projectsRailRef = useRef<HTMLDivElement>(null);
  const closeMenu = () => setMenuOpen(false);
  const scrollProjects = (direction: -1 | 1) => {
    const rail = projectsRailRef.current;
    if (!rail) return;
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    rail.scrollBy({ left: direction * Math.max(280, rail.clientWidth * 0.78), behavior });
  };

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const bounds = scene.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      scene.style.setProperty('--tilt-x', `${x * 16}deg`);
      scene.style.setProperty('--tilt-y', `${y * -12}deg`);
    };
    const resetPointer = () => {
      scene.style.setProperty('--tilt-x', '0deg');
      scene.style.setProperty('--tilt-y', '0deg');
    };
    scene.addEventListener('pointermove', handlePointerMove, { passive: true });
    scene.addEventListener('pointerleave', resetPointer, { passive: true });
    return () => {
      scene.removeEventListener('pointermove', handlePointerMove);
      scene.removeEventListener('pointerleave', resetPointer);
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const range = document.documentElement.scrollHeight - window.innerHeight;
        const value = range > 0 ? Math.min(1, window.scrollY / range) : 0;
        document.documentElement.style.setProperty('--scroll-progress', `${value}`);
      });
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress();
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    elements.forEach(element => { element.dataset.revealPending = 'true'; });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        delete element.dataset.revealPending;
        element.dataset.revealed = 'true';
        observer.unobserve(element);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });
    elements.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return <main>
    <div className={styles.scrollProgress} aria-hidden="true"><span /></div>
    <header className={styles.header}>
      <a className={styles.brand} href="#home" onClick={closeMenu} aria-label="Sagar Upadhyay, home"><span className={styles.brandMark}>S<span>.</span></span><span className={styles.brandName}>SAGAR<br />UPADHYAY</span></a>
      <button className={styles.menuToggle} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`} aria-label="Main navigation">
        {[['About', '#about'], ['Projects', '#projects'], ['Skills', '#skills'], ['Contact', '#contact']].map(([label, href]) => <a key={label} href={href} onClick={closeMenu}>{label}</a>)}
        <a className={styles.navCta} href="https://www.linkedin.com/in/sagar-upadhyay-a0113333b/" target="_blank" rel="noreferrer" onClick={closeMenu}>Let’s connect <Arrow diagonal /></a>
      </nav>
    </header>

    <section className={styles.hero} id="home">
      <div className={styles.heroGrid} aria-hidden="true" />
      <div className={styles.heroTopline}><span><i className={styles.statusDot} /> OPEN TO INTERNSHIP OPPORTUNITIES</span><span>WEB DEVELOPMENT · SOFTWARE ENGINEERING</span></div>
      <div className={styles.heroMain}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>A DEVELOPER IN PROGRESS <span>— DELHI, INDIA</span></p>
          <h1>Ideas into<br /><em>working</em> websites<span className={styles.period}>.</span></h1>
          <p className={styles.heroIntro}>I’m Sagar — a frontend developer learning by building. I enjoy turning ideas into useful, interactive web experiences.</p>
          <div className={styles.heroActions}><a className={styles.buttonPrimary} href="#projects">Explore projects <Arrow /></a><a className={styles.textLink} href="#about">My story <span>↓</span></a></div>
        </div>
        <div ref={sceneRef} className={styles.heroArt} aria-label="Interactive 3D abstract object representing connected parts of an application">
          <div className={styles.sceneGlow} /><div className={`${styles.orbit} ${styles.orbitOne}`} /><div className={`${styles.orbit} ${styles.orbitTwo}`} /><div className={`${styles.orbit} ${styles.orbitThree}`} />
          <div className={styles.sceneCore}>
            <div className={styles.cubeFloat}><div className={styles.cube}>
              <div className={`${styles.cubeFace} ${styles.cubeFront}`}><span className={styles.cubeMonogram}>S<span>.</span></span><b>IDEA<br />IN MOTION</b></div>
              <div className={`${styles.cubeFace} ${styles.cubeBack}`}><b>BUILD<br />/ 001</b></div>
              <div className={`${styles.cubeFace} ${styles.cubeRight}`}><span>REACT</span><span>STATE</span></div>
              <div className={`${styles.cubeFace} ${styles.cubeLeft}`}><span>{'{ }'}</span></div>
              <div className={`${styles.cubeFace} ${styles.cubeTop}`}><span>DESIGN<br />× CODE</span></div>
              <div className={`${styles.cubeFace} ${styles.cubeBottom}`}><span>UPADHYAY / 2026</span></div>
            </div></div>
            <span className={styles.coreLabel}>IDEA <i>→</i> BUILD</span>
          </div>
          <span className={`${styles.node} ${styles.nodeOne}`}>UI</span><span className={`${styles.node} ${styles.nodeTwo}`}>STATE</span><span className={`${styles.node} ${styles.nodeThree}`}>DATA</span>
          <span className={styles.artCaption}>FRONTEND / 001</span>
        </div>
      </div>
      <div className={styles.heroFooter}><span>SCROLL TO EXPLORE</span><span className={styles.scrollLine} /><span>BA (HONS.) POLITICAL SCIENCE · DU SOL</span><a href="#projects" aria-label="Scroll to projects">↓</a></div>
    </section>

    <section className={styles.introBand} aria-label="Portfolio statement"><span className={styles.sectionIndex}>01 / THE APPROACH</span><p>Learn by making.<br /><span>Grow with every build.</span></p><span className={styles.introAside}>A collection of experiments,<br />lessons, and shipped projects.</span></section>

    <div className={styles.ticker} aria-hidden="true"><div className={styles.tickerTrack}>{Array.from({ length: 2 }, (_, index) => <span key={index}>LEARN BY BUILDING <i>✳</i> FRONTEND IN MOTION <i>✳</i> IDEAS INTO INTERACTION <i>✳</i> KEEP EXPLORING <i>✳</i></span>)}</div></div>

    <section className={`${styles.about} ${styles.sectionWrap} ${styles.revealTarget}`} id="about" data-reveal>
      <div className={styles.sectionHeader}><span className={styles.kicker}>01 — ABOUT</span><span className={styles.sectionRule} /><span className={styles.sectionAside}>THE PERSON BEHIND THE BUILDS</span></div>
      <div className={styles.aboutGrid}><h2>Curiosity<br />made <em>practical.</em></h2><div className={styles.aboutText}><p className={styles.lead}>I’m drawn to making things — especially the moment an idea becomes something people can use.</p><p>I’ve been learning web development through independent experimentation, tutorials, documentation, and AI-assisted learning. Personal projects have helped me connect interface components, state, data, and user interactions while building a stronger foundation in frontend development.</p><p>I’m now working toward full-stack development and practical AI integration. I’m looking for an internship where I can contribute to real work, learn from an engineering team, and keep improving through practice.</p><a className={styles.underlinedLink} href="#contact">A little more about me <Arrow /></a></div></div>
      <div className={styles.education}><span className={styles.kicker}>CURRENTLY STUDYING</span><div><strong>BA (Hons.) Political Science</strong><span>Delhi University School of Open Learning</span></div><span className={styles.pill}>IN PROGRESS</span></div>
    </section>

    <section className={`${styles.featured} ${styles.revealTarget}`} id="shoesphere" data-reveal>
      <div className={`${styles.sectionHeader} ${styles.featuredHeader}`}><span className={styles.kicker}>02 — FEATURED PROJECT</span><span className={styles.sectionRule} /><span className={styles.sectionAside}>THE DEEPEST BUILD SO FAR</span></div>
      <div className={styles.featuredGrid}>
        <div className={styles.featureVisual}>
          <div className={styles.featureVisualTop}><span>PROJECT / 001</span><span>ECOMMERCE EXPERIENCE</span></div>
          <div className={styles.shoeStage} aria-label="Stylized line illustration of a shoe, representing the ShoeSphere product experience">
            <div className={styles.stageGlow} /><div className={styles.shoeShadow} /><svg className={styles.shoeDrawing} viewBox="0 0 620 330" role="img" aria-label="Abstract sneaker illustration"><defs><linearGradient id="shoeFill" x1="0" x2="1"><stop stopColor="#f2dfa0" /><stop offset="1" stopColor="#c49a2e" /></linearGradient></defs><path d="M88 219c28-5 49-36 66-73 6-13 16-24 32-21 23 5 56 62 89 72 37 12 74 10 111 9 28-1 56 5 78 19 21 13 38 32 46 52 5 13-2 25-17 28H102c-26 0-40-16-37-40 2-21 6-39 23-46Z" fill="url(#shoeFill)" stroke="#fff2c4" strokeWidth="3" /><path d="M65 267c95 10 215 7 330 3 45-2 83-7 117-14 5 8 8 15 9 22 2 13-6 24-19 27H102c-26 0-40-15-37-38Z" fill="#443510" stroke="#e1bd4e" strokeWidth="3" /><path d="m164 155 57 5m-70 19 70 8m-82 17 68 7m68-2 47 3m-74-44 45 13m-29-27 47 25" stroke="#fff0b2" strokeWidth="6" strokeLinecap="round" /><path d="M323 218c29 12 61 17 93 14m-350 46h432" fill="none" stroke="#e1bd4e" strokeWidth="2" opacity=".7" /><circle cx="170" cy="152" r="4" fill="#fff8dd" /><circle cx="147" cy="180" r="4" fill="#fff8dd" /><circle cx="128" cy="207" r="4" fill="#fff8dd" /></svg>
            <span className={styles.stageTag}>SHOESPHERE <i>↗</i></span><span className={styles.stageAxis}>3D PRODUCT EXPERIENCE</span>
          </div>
          <div className={styles.featureVisualBottom}><span>REACT / TAILWIND</span><span>BUILDING THROUGH INTERACTION</span></div>
        </div>
        <div className={styles.featureCopy}><span className={styles.projectNumber}>01 <span>—</span> E-COMMERCE</span><h2>Shoe<span>Sphere</span></h2><p className={styles.lead}>An interactive product experience that brought several parts of an application together.</p><p>Product listings and details, a 3D shoe model, routing, authentication integration, and a persistent cart gave me hands-on practice coordinating state and interactions across an app.</p><div className={styles.featureTags}><span>REACT</span><span>TAILWIND CSS</span><span>CONTEXT + REDUCER</span><span>CLERK</span><span>LOCAL STORAGE</span></div><div className={styles.challenge}><span className={styles.kicker}>THE ENGINEERING LESSON</span><p>Keeping cart state coherent across views — and debugging how application pieces affect one another.</p></div><a className={styles.buttonPrimary} href="https://shoesphere0018.vercel.app/" target="_blank" rel="noreferrer">Visit ShoeSphere <Arrow diagonal /></a><p className={styles.disclaimer}>Project details are based on the supplied project notes; live behavior has not yet been confirmed.</p></div>
      </div>
    </section>

    <section className={`${styles.projects} ${styles.sectionWrap} ${styles.revealTarget}`} id="projects" data-reveal>
      <div className={styles.sectionHeader}><span className={styles.kicker}>03 — SELECTED WORK</span><span className={styles.sectionRule} /><span className={styles.sectionAside}>SIX MORE EXPERIMENTS</span></div>
      <div className={styles.projectsIntro}><h2>Different ideas.<br /><em>More ways to learn.</em></h2><p>A growing set of projects exploring interactive experiences, information, and application logic. Descriptions stay close to what’s currently confirmed.</p></div>
      <div className={styles.railToolbar}><span>SCROLL TO EXPLORE <i>DRAG · TRACKPAD · ARROWS</i></span><div><button type="button" aria-label="Scroll to previous projects" onClick={() => scrollProjects(-1)}>←</button><button type="button" aria-label="Scroll to next projects" onClick={() => scrollProjects(1)}>→</button></div></div>
      <div ref={projectsRailRef} className={styles.projectList} tabIndex={0} aria-label="Project gallery. Scroll horizontally to explore projects.">{projects.map((project) => <article className={`${styles.projectRow} ${styles.revealTarget}`} key={project.number} data-reveal>
        <a href={project.url} target="_blank" rel="noreferrer" className={styles.projectVisualLink} aria-label={`Open ${project.name} live site`}>
          <div className={`${styles.projectVisual} ${styles[project.visual]}`} aria-hidden="true"><span className={styles.visualIndex}>{project.number}</span><div className={styles.visualShape}>{project.visual === 'globe' ? <><div className={styles.globeLines} /><span className={styles.globeDot} /></> : project.visual === 'board' ? <div className={styles.miniBoard}><i /><i /><i /></div> : project.visual === 'snake' ? <div className={styles.snakeTrail}><i /><i /><i /><i /><b /></div> : project.visual === 'film' ? <div className={styles.filmFrame}><i /><i /><i /></div> : project.visual === 'people' ? <div className={styles.peopleDots}><i /><i /><i /></div> : <div className={styles.productTile}>SHOP<br /><span>01</span></div>}</div><span className={styles.visualArrow}>↗</span></div>
        </a>
        <div className={styles.projectInfo}><div className={styles.projectMeta}><span>{project.number}</span><span>{project.type}</span></div><h3>{project.name}</h3><p>{project.summary}</p><a className={styles.projectLink} href={project.url} target="_blank" rel="noreferrer">Explore live project <Arrow diagonal /></a></div>
      </article>)}</div>
      <p className={styles.projectNote}>Project previews are abstract visual motifs, not screenshots. Feature and technology details are being verified.</p>
    </section>

    <section className={`${styles.skills} ${styles.revealTarget}`} id="skills" data-reveal>
      <div className={`${styles.sectionHeader} ${styles.skillsHeader}`}><span className={styles.kicker}>04 — TOOLKIT</span><span className={styles.sectionRule} /><span className={styles.sectionAside}>USED IN PROJECTS · STILL GROWING</span></div>
      <div className={styles.skillsIntro}><h2>Foundations<br />in <em>motion.</em></h2><p>A practical toolkit built through project work. I’m continuing to deepen these skills while developing toward full-stack applications and useful AI features.</p></div>
      <div className={styles.skillGroups}>{skillGroups.map((group, index) => <div className={styles.skillGroup} key={group.label}><span className={styles.skillGroupLabel}>0{index + 1} / {group.label}</span><div className={styles.skillChips}>{group.items.map(item => <span key={item}>{item}</span>)}</div></div>)}<div className={`${styles.skillGroup} ${styles.learningGroup}`}><span className={styles.skillGroupLabel}>04 / LEARNING NEXT</span><div className={styles.learningText}><span>Full-stack development</span><span>Practical AI integration</span></div><span className={styles.learningMark}>↗</span></div></div>
    </section>

    <section className={`${styles.closing} ${styles.revealTarget}`} data-reveal>
      <span className={styles.kicker}>05 — THE NEXT CHAPTER</span><div className={styles.closingGrid}><h2>Ready to learn<br />by <em>contributing.</em></h2><div><p>I’m looking for a web development or software engineering internship where I can bring curiosity, practical project experience, and a willingness to grow.</p><a className={styles.buttonLight} href="https://www.linkedin.com/in/sagar-upadhyay-a0113333b/" target="_blank" rel="noreferrer">Connect on LinkedIn <Arrow diagonal /></a></div></div>
    </section>

    <footer className={styles.footer} id="contact"><div className={styles.footerTop}><a className={styles.brand} href="#home"><span className={styles.brandMark}>S<span>.</span></span><span className={styles.brandName}>SAGAR<br />UPADHYAY</span></a><p>Thanks for taking a look.<br /><span>More learning, one build at a time.</span></p><a className={styles.backTop} href="#home">BACK TO TOP ↑</a></div><div className={styles.footerBottom}><span>© {new Date().getFullYear()} SAGAR UPADHYAY</span><div><a href="https://github.com/sagarupadhyay0018" target="_blank" rel="noreferrer">GITHUB <Arrow diagonal /></a><a href="https://www.linkedin.com/in/sagar-upadhyay-a0113333b/" target="_blank" rel="noreferrer">LINKEDIN <Arrow diagonal /></a><a href="https://www.instagram.com/sagarupadhyayyy/" target="_blank" rel="noreferrer">INSTAGRAM <Arrow diagonal /></a></div><span>DESIGNED AROUND REAL WORK</span></div></footer>
  </main>;
}
