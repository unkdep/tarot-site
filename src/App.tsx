import { useEffect, useRef } from "react";
import "./App.css";
import {
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";

import capaTarot       from "./capataro.jpg";
import imgIntuitivo  from "./intuitivo.png";
import imgAmoroso    from "./amoroso.png";
import imgCaminhos   from "./caminhos.png";
import imgEspiritual from "./espiritual.png";
import imgMapaAstral from "./mapaastral.png";
import imgLimpeza    from "./limpezaenergetica.png";
import imgCirculo    from "./circulo.png";
import imgJJ         from "./jj.png";

/* ─── light-particle canvas ─────────────────────────────────────── */
function useCosmosCanvas() {
  const raf = useRef<number>(0);
  useEffect(() => {
    const canvas = document.getElementById("cosmos") as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0;

    type Particle = { x:number; y:number; r:number; phase:number; spd:number; op:number; type:'dust'|'orb'; };
    type Flash = { x:number; y:number; radius:number; maxRadius:number; opacity:number; active:boolean; timer:number; };
    type Ray = { x:number; y:number; angle:number; len:number; life:number; maxLife:number; opacity:number; active:boolean; timer:number; };

    let particles: Particle[] = [];
    let flashes: Flash[] = [];
    let rays: Ray[] = [];

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;

      particles = Array.from({ length: Math.floor(W * H / 3000) }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.8 + 0.3,
        phase: Math.random() * Math.PI * 2,
        spd: Math.random() * 0.012 + 0.003,
        op: Math.random() * 0.25 + 0.05,
        type: Math.random() < 0.2 ? 'orb' : 'dust',
      }));

      flashes = Array.from({ length: 5 }, () => newFlash());
      rays    = Array.from({ length: 4 }, () => newRay());
    }

    function newFlash(): Flash {
      return {
        x: Math.random() * W, y: Math.random() * H * 0.8,
        radius: 0, maxRadius: Math.random() * 120 + 60,
        opacity: 0, active: false,
        timer: Math.random() * 400 + 150,
      };
    }
    function newRay(): Ray {
      return {
        x: Math.random() * W, y: Math.random() * H * 0.6,
        angle: Math.PI / 6 + Math.random() * Math.PI / 3,
        len: Math.random() * 200 + 80,
        life: 0, maxLife: Math.random() * 60 + 30,
        opacity: 0, active: false,
        timer: Math.random() * 600 + 200,
      };
    }

    function loop() {
      ctx.clearRect(0, 0, W, H);

      /* dust particles */
      for (const p of particles) {
        p.phase += p.spd;
        const op = p.op * (0.5 + 0.5 * Math.sin(p.phase));
        const r  = p.r  * (0.8  + 0.2  * Math.sin(p.phase));
        ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        if (p.type === 'orb') {
          const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,r*4);
          g.addColorStop(0, `rgba(155,114,204,${op})`);
          g.addColorStop(1, 'rgba(155,114,204,0)');
          ctx.fillStyle = g;
          ctx.arc(p.x, p.y, r*4, 0, Math.PI*2);
        } else {
          ctx.fillStyle = `rgba(196,154,60,${op * 0.6})`;
        }
        ctx.fill();
      }

      /* light flashes */
      for (const f of flashes) {
        if (!f.active) { if (--f.timer <= 0) { Object.assign(f, newFlash()); f.active = true; f.timer = 0; } continue; }
        if (f.radius < f.maxRadius) { f.radius += 3.5; f.opacity = Math.min(1, f.opacity + 0.08); }
        else { f.opacity -= 0.04; }
        if (f.opacity <= 0) { Object.assign(f, newFlash()); f.timer = Math.random() * 500 + 200; continue; }

        const g = ctx.createRadialGradient(f.x,f.y,0,f.x,f.y,f.radius);
        g.addColorStop(0,   `rgba(240,230,255,${f.opacity * 0.5})`);
        g.addColorStop(0.3, `rgba(200,176,232,${f.opacity * 0.15})`);
        g.addColorStop(1,   'rgba(200,176,232,0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(f.x, f.y, f.radius, 0, Math.PI*2);
        ctx.fill();
      }

      /* light rays */
      for (const r of rays) {
        if (!r.active) { if (--r.timer <= 0) { Object.assign(r, newRay()); r.active = true; r.timer = 0; } continue; }
        r.life++;
        r.opacity = r.life < 12 ? r.life/12 : r.life > r.maxLife - 12 ? (r.maxLife - r.life)/12 : 1;
        if (r.life >= r.maxLife) { Object.assign(r, newRay()); r.timer = Math.random() * 600 + 200; continue; }

        const ex = r.x + Math.cos(r.angle) * r.len;
        const ey = r.y + Math.sin(r.angle) * r.len;
        const g = ctx.createLinearGradient(r.x, r.y, ex, ey);
        g.addColorStop(0,   'rgba(255,255,255,0)');
        g.addColorStop(0.3, `rgba(230,210,255,${r.opacity * 0.4})`);
        g.addColorStop(0.6, `rgba(196,154,60,${r.opacity * 0.25})`);
        g.addColorStop(1,   'rgba(196,154,60,0)');
        ctx.strokeStyle = g; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(r.x, r.y); ctx.lineTo(ex, ey);
        ctx.stroke();
      }

      raf.current = requestAnimationFrame(loop);
    }

    resize(); window.addEventListener("resize", resize); loop();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf.current); };
  }, []);
}

/* ─── cursor ─────────────────────────────────────────────────────── */
function useCursor() {
  useEffect(() => {
    const dot  = document.getElementById("cur-dot")!;
    const ring = document.getElementById("cur-ring")!;
    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + "px"; dot.style.top = my + "px";
    };
    document.addEventListener("mousemove", onMove);
    let id: number;
    const anim = () => { rx += (mx-rx)*0.12; ry += (my-ry)*0.12; ring.style.left=rx+"px"; ring.style.top=ry+"px"; id=requestAnimationFrame(anim); };
    anim();
    return () => { document.removeEventListener("mousemove", onMove); cancelAnimationFrame(id); };
  }, []);
}

/* ─── scroll top ─────────────────────────────────────────────────── */
function useScrollTop() {
  useEffect(() => {
    const btn = document.getElementById("topBtn");
    if (!btn) return;
    const onScroll = () => btn.classList.toggle("visible", window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    const onClick = () => window.scrollTo({ top: 0, behavior: "smooth" });
    btn.addEventListener("click", onClick);
    return () => { window.removeEventListener("scroll", onScroll); btn.removeEventListener("click", onClick); };
  }, []);
}

/* ─── scroll reveal ──────────────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const delay = el.dataset.delay || "0";
            setTimeout(() => el.classList.add("visible"), parseInt(delay));
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ─── App ─────────────────────────────────────────────────────────── */
const SERVICES = [
  { img: imgIntuitivo,  alt: "Tarot Intuitivo",    title: "Tarot Intuitivo",    desc: "Leituras profundas para entender o momento presente.", n: "01" },
  { img: imgAmoroso,    alt: "Tarot Amoroso",       title: "Tarot Amoroso",      desc: "Orientação para relacionamentos e conexões afetivas.",  n: "02" },
  { img: imgCaminhos,   alt: "Tarot de Caminhos",   title: "Tarot de Caminhos",  desc: "Clareza para decisões importantes da sua jornada.",     n: "03" },
  { img: imgEspiritual, alt: "Tarot Espiritual",    title: "Tarot Espiritual",   desc: "Conexão com sua espiritualidade e propósito.",          n: "04" },
  { img: imgMapaAstral, alt: "Tarot & Mapa Astral", title: "Tarot & Mapa Astral",desc:"Integração entre cartas e astrologia para autoconhecimento.", n: "05" },
  { img: imgLimpeza,    alt: "Limpeza Energética",  title: "Limpeza Energética", desc: "Leituras voltadas a desbloqueios e harmonização.",     n: "06" },
];

function App() {
  useCosmosCanvas();
  useCursor();
  useScrollTop();
  useScrollReveal();

  return (
    <div className="page">

      {/* cursors */}
      <div className="cursor"      id="cur-dot"  />
      <div className="cursor-ring" id="cur-ring" />

      {/* light particle canvas */}
      <canvas id="cosmos" />

      {/* ── NAV ── */}
      <nav className="navbar">
        <a href="#inicio" className="nav-logo">ARCANA</a>
        <div className="nav-links">
          <a href="#servicos">Serviços</a>
          <a href="#sobre">Sobre</a>
          <a href="#depoimentos">Depoimentos</a>
          <a href="#contato" className="nav-cta">Agendar</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" id="inicio">
        <img src={capaTarot} alt="" className="hero-image" />
        <div className="hero-overlay" />

        <div className="hero-content">
          <div className="hero-mono">Consultas de Tarot</div>
          <div className="hero-title-row">
            <div className="hero-bar" />
            <h1>
              Desbloqueie<br />
              <em>a paz interior.</em>
            </h1>
          </div>
          <p className="hero-subtitle">
            Consultas de Tarot para clareza, cura e equilíbrio energético.
          </p>
          <button className="hero-btn">Agendar Consulta</button>
        </div>

        <div className="hero-cards">
          <img src={imgJJ} alt="Cartas de Tarot" />
        </div>

        <div className="scroll-hint">
          <div className="scroll-line" />
          <span>Explorar</span>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── SERVICES ── */}
      <section className="services" id="servicos">
        <div className="s-header reveal" data-delay="0">
          <div className="s-eyebrow">O que ofereço</div>
          <h2 className="s-title">Serviços de Consulta</h2>
          <p className="s-sub">Cada leitura é uma janela para a sua essência mais profunda.</p>
        </div>

        <div className="grid">
          {SERVICES.map((s, i) => (
            <div className="item reveal" key={s.n} data-delay={String(i * 80)}>
              <span className="item-num">{s.n} — 06</span>
              <div className="icon-circle">
                <img src={s.img} alt={s.alt} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* ── ABOUT ── */}
      <section className="about" id="sobre">
        <div className="about-visual reveal" data-delay="0">
          <div className="about-circle-wrapper">
            <div className="about-circle-outer">
              <div className="about-circle">
                <img src={imgCirculo} alt="Cartas de Tarot" />
              </div>
            </div>
          </div>
        </div>

        <div className="about-content reveal" data-delay="150">
          <div className="s-eyebrow">Sobre</div>
          <h2>Tarot</h2>
          <p>
            Somos um espaço dedicado a consultas de Tarot acolhedoras e
            transformadoras, unindo intuição e técnica para orientar suas
            escolhas com clareza e amor.
          </p>
          <p>
            Cada sessão é personalizada, focada em iluminar seus caminhos,
            curar padrões e fortalecer sua conexão com a própria essência.
          </p>
          <button className="hero-btn about-btn">Agendar Sessão</button>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── TESTIMONIALS ── */}
      <section className="testimonials" id="depoimentos">
        <div className="testi-header reveal" data-delay="0">
          <div className="s-eyebrow">Depoimentos</div>
          <h2 className="s-title">O que dizem</h2>
        </div>

        {[
          { n: "01", name: "Renata Josias", text: "A leitura trouxe respostas que eu precisava ouvir com muita sensibilidade e acolhimento." },
          { n: "02", name: "Luan Santos",   text: "Saí da consulta com outra visão sobre minha vida e decisões importantes." },
          { n: "03", name: "Rodinei Jesus", text: "Experiência profunda, senti a energia do Tarot guiando cada mensagem recebida." },
        ].map((t, i) => (
          <div className="testi reveal" key={t.n} data-delay={String(i * 100)}>
            <span className="testi-number">{t.n} — 03</span>
            <div className="stars">★★★★★</div>
            <div className="testi-line" />
            <p>{t.text}</p>
            <h4>{t.name}</h4>
          </div>
        ))}
      </section>

      <div className="section-divider" />

      {/* ── EQUILIBRIUM ── */}
      <section className="equilibrio" id="equilibrio">
        <div className="equilibrio-overlay" />
        <div className="equil-glow" />

        <div className="equilibrio-content reveal" data-delay="0">
          <div className="s-eyebrow">Equilíbrio</div>
          <h2>Descubra o<br />Equilíbrio</h2>
          <p>
            Este é o momento de ouvir as cartas, alinhar suas energias e
            transformar dúvidas em clareza.
          </p>
          <span className="equil-symbol" />
          <button className="hero-btn equilibrio-btn">Quero uma leitura</button>
        </div>

        <div className="equil-img-wrap reveal" data-delay="150">
          <img src={imgMapaAstral} alt="Mapa Astral" />
        </div>
      </section>

      <div className="section-divider" />

      {/* ── FOOTER ── */}
      <footer className="footer" id="contato">
        <div className="footer-grid">
          <div className="footer-col footer-col-with-icon">
            <div className="footer-icon-circle">
              <FaEnvelope className="footer-icon-svg" />
            </div>
            <div className="footer-text-block">
              <h4>Contato</h4>
              <p><a href="mailto:contato@seudominio.com">contato@seudominio.com</a></p>
              <p>(41) 99999-9999</p>
            </div>
          </div>

          <div className="footer-col footer-col-with-icon">
            <div className="footer-icon-circle">
              <FaMapMarkerAlt className="footer-icon-svg" />
            </div>
            <div className="footer-text-block">
              <h4>Endereço</h4>
              <p>Curitiba — PR</p>
            </div>
          </div>

          <div className="footer-col footer-col-with-icon">
            <div className="footer-icon-circle">
              <FaPhone className="footer-icon-svg" />
            </div>
            <div className="footer-text-block">
              <h4>Atendimento</h4>
              <p>10h às 20h — Seg / Sáb</p>
            </div>
          </div>
        </div>

        {/* social row */}
        <div style={{ maxWidth:'1080px', margin:'40px auto 0', display:'flex', gap:'28px', alignItems:'center', borderTop:'1px solid rgba(155,114,204,0.1)', paddingTop:'32px' }}>
          <a href="https://instagram.com" className="footer-social-link" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="footer-icon-svg" />
            <span>Instagram</span>
          </a>
          <a href="https://wa.me/5541999999999" className="footer-social-link" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="footer-icon-svg" />
            <span>WhatsApp</span>
          </a>
        </div>

        <p className="copy">© 2025 Arcana — Todos os direitos reservados</p>
      </footer>

      {/* float buttons */}
      <a href="https://wa.me/5541999999999" className="wa-float" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <FaWhatsapp />
      </a>
      <button className="top-btn" id="topBtn" aria-label="Voltar ao topo">↑</button>

    </div>
  );
}

export default App;