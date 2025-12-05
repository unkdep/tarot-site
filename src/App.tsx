import React from "react";
import "./App.css";
import {
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";

import capaTarot from "./capataro.jpg";
import fundoCura from "./fundocura.jpg";
import fundoEquilibrio from "./fundoequilibrio.png";

import imgIntuitivo from "./intuitivo.png";
import imgAmoroso from "./amoroso.png";
import imgCaminhos from "./caminhos.png";
import imgEspiritual from "./espiritual.png";
import imgMapaAstral from "./mapaastral.png";
import imgLimpeza from "./limpezaenergetica.png";
import imgCirculo from "./circulo.png";

function App() {
  return (
    <div className="page">
      {/* HERO */}
      <section className="hero">
        <img src={capaTarot} alt="Cartas de Tarot" className="hero-image" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-title-row">
            <div className="hero-bar" />
            <h1>Desbloqueie a paz interior.</h1>
          </div>
          <p className="hero-subtitle">
            Consultas de Tarot para clareza, cura e equilíbrio energético.
          </p>
          <button className="hero-btn">Agendar Consulta</button>
        </div>
      </section>

      {/* LINHA LILÁS */}
      <div className="section-divider" />

      {/* GRID DE SERVIÇOS 3x2 */}
      <section className="services">
        <div className="grid">
          <div className="item">
            <div className="icon-circle">
              <img src={imgIntuitivo} alt="Tarot Intuitivo" />
            </div>
            <h3>Tarot Intuitivo</h3>
            <p>Leituras profundas para entender o momento presente.</p>
          </div>

          <div className="item">
            <div className="icon-circle">
              <img src={imgAmoroso} alt="Tarot Amoroso" />
            </div>
            <h3>Tarot Amoroso</h3>
            <p>Orientação para relacionamentos e conexões afetivas.</p>
          </div>

          <div className="item">
            <div className="icon-circle">
              <img src={imgCaminhos} alt="Tarot de Caminhos" />
            </div>
            <h3>Tarot de Caminhos</h3>
            <p>Clareza para decisões importantes da sua jornada.</p>
          </div>

          <div className="item">
            <div className="icon-circle">
              <img src={imgEspiritual} alt="Tarot Espiritual" />
            </div>
            <h3>Tarot Espiritual</h3>
            <p>Conexão com sua espiritualidade e propósito.</p>
          </div>

          <div className="item">
            <div className="icon-circle">
              <img src={imgMapaAstral} alt="Tarot & Mapa Astral" />
            </div>
            <h3>Tarot &amp; Mapa Astral</h3>
            <p>Integração entre cartas e astrologia para autoconhecimento.</p>
          </div>

          <div className="item">
            <div className="icon-circle">
              <img src={imgLimpeza} alt="Limpeza Energética" />
            </div>
            <h3>Limpeza Energética</h3>
            <p>Leituras voltadas a desbloqueios e harmonização.</p>
          </div>
        </div>
      </section>

      {/* SOBRE / TAROT */}
      <section
        className="about"
        style={{ backgroundImage: `url(${fundoCura})` }}
      >
        <div className="about-overlay" />
        <div className="about-content">
          <div className="about-circle-wrapper">
            <div className="about-circle-outer">
              <div className="about-circle">
                <img src={imgCirculo} alt="Símbolo Tarot" />
              </div>
            </div>
          </div>

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

      {/* LINHA LILÁS */}
      <div className="section-divider" />

      {/* COMENTÁRIOS */}
      <section className="testimonials">
        <div className="testi">
          <p className="quote">“</p>
          <div className="stars">★★★★★</div>
          <h4>Renata Josias</h4>
          <p>
            A leitura trouxe respostas que eu precisava ouvir com muita
            sensibilidade e acolhimento.
          </p>
        </div>

        <div className="testi">
          <p className="quote">“</p>
          <div className="stars">★★★★★</div>
          <h4>Luan Santos</h4>
          <p>
            Saí da consulta com outra visão sobre minha vida e decisões
            importantes.
          </p>
        </div>

        <div className="testi">
          <p className="quote">“</p>
          <div className="stars">★★★★★</div>
          <h4>Rodinei Jesus</h4>
          <p>
            Experiência profunda, senti a energia do Tarot guiando cada
            mensagem recebida.
          </p>
        </div>
      </section>

      {/* LINHA ANTES DO EQUILÍBRIO */}
      <div className="section-divider" />

      {/* SEÇÃO EQUILÍBRIO */}
      <section
        className="equilibrio"
        style={{ backgroundImage: `url(${fundoEquilibrio})` }}
      >
        <div className="equilibrio-overlay" />
        <div className="equilibrio-content">
          <h2>Descubra o Equilíbrio</h2>
          <p>
            Este é o momento de ouvir as cartas, alinhar suas energias e
            transformar dúvidas em clareza.
          </p>
          <button className="hero-btn equilibrio-btn">Quero uma leitura</button>
        </div>
      </section>

      {/* LINHA ABAIXO DO EQUILÍBRIO */}
      <div className="section-divider" />

      {/* FOOTER TECNOLÓGICO */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-col footer-col-with-icon">
            <div className="footer-icon-circle">
              <FaEnvelope className="footer-icon-svg" />
            </div>
            <div className="footer-text-block">
              <h4>Contato</h4>
              <p>
                <a href="mailto:contato@seudominio.com">
                  contato@seudominio.com
                </a>
              </p>
              <p>(41) 99999-9999</p>
            </div>
          </div>

          <div className="footer-col footer-col-with-icon">
            <div className="footer-icon-circle">
              <FaMapMarkerAlt className="footer-icon-svg" />
            </div>
            <div className="footer-text-block">
              <h4>Endereço</h4>
              <p>Curitiba - PR</p>
            </div>
          </div>

          <div className="footer-col footer-col-with-icon">
            <div className="footer-icon-circle">
              <FaPhone className="footer-icon-svg" />
            </div>
            <div className="footer-text-block">
              <h4>Atendimento</h4>
              <p>10h às 20h | Seg - Sáb</p>
            </div>
          </div>

          <div className="footer-col footer-col-social">
            <div className="footer-social-center">
              <button className="footer-social-circle footer-btn">
                <FaInstagram className="footer-icon-svg footer-icon-big" />
              </button>
              <button className="footer-social-circle footer-btn">
                <FaWhatsapp className="footer-icon-svg footer-icon-big" />
              </button>
            </div>
          </div>
        </div>

        <p className="copy">© 2025 Seu Site. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
