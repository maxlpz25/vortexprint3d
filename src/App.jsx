import { useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import {
  FaWhatsapp, FaCube, FaPaintBrush, FaKey, FaGem, FaRocket,
  FaEnvelope, FaLayerGroup, FaTools, FaCheckCircle, FaStar,
  FaShieldAlt, FaIndustry,
} from "react-icons/fa";
import "./index.css";

const asesor1 = "https://wa.me/51962240556";
const asesor2 = "https://wa.me/51953763886";
const webWhatsapp = "https://wa.me/51962240556";

/* ── CANVAS PARTÍCULAS FONDO ── */
function ParticleCanvas() {
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    let raf;
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    const printerPoints = [];
    const cx = W / 2, cy = H / 2;
    for (let i = 0; i < 80; i++) { const a = (i / 80) * Math.PI * 2; printerPoints.push({ tx: cx + Math.cos(a) * 110, ty: cy + 95, tz: Math.sin(a) * 40 }); }
    for (let j = 0; j < 60; j++) { const t = j / 59; printerPoints.push({ tx: cx - 110, ty: cy + 95 - t * 220, tz: 0 }); printerPoints.push({ tx: cx + 110, ty: cy + 95 - t * 220, tz: 0 }); }
    for (let i = 0; i < 50; i++) { const t = i / 49; printerPoints.push({ tx: cx - 90 + t * 180, ty: cy - 125 + Math.sin(t * Math.PI) * 20, tz: 0 }); }
    for (let i = 0; i < 60; i++) { const a = (i / 60) * Math.PI * 2; printerPoints.push({ tx: cx + Math.cos(a) * 90, ty: cy + 85, tz: Math.sin(a) * 35 }); }
    for (let j = 0; j < 50; j++) { const t = j / 49; const r = 25 * (1 - t * 0.5); const a = t * Math.PI * 6; printerPoints.push({ tx: cx + Math.cos(a) * r, ty: cy + 80 - t * 90, tz: Math.sin(a) * r }); }
    const ambient = Array.from({ length: 180 }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5, r: Math.random() * 1.8 + 0.4, alpha: Math.random() * 0.6 + 0.2, color: Math.random() > 0.5 ? "#d946ef" : "#00eaff" }));
    const particles = printerPoints.map((p) => ({ x: Math.random() * W, y: Math.random() * H, z: Math.random() * 200 - 100, tx: p.tx, ty: p.ty, tz: p.tz, color: Math.random() > 0.6 ? "#d946ef" : "#00eaff", size: Math.random() * 2 + 1, speed: 0.04 + Math.random() * 0.04 }));
    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W, H); t += 0.012;
      ambient.forEach((p) => { p.x += p.vx; p.y += p.vy; if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = p.color; ctx.globalAlpha = p.alpha * (0.6 + 0.4 * Math.sin(t * 2 + p.x)); ctx.shadowBlur = 8; ctx.shadowColor = p.color; ctx.fill(); ctx.globalAlpha = 1; ctx.shadowBlur = 0; });
      const angle = t * 0.35;
      particles.forEach((p) => { const dx = p.tx - cx, dz = p.tz; const rx = dx * Math.cos(angle) - dz * Math.sin(angle); const rz = dx * Math.sin(angle) + dz * Math.cos(angle); const perspScale = 600 / (600 + rz); const sx = cx + rx * perspScale; const sy = p.ty; p.x += (sx - p.x) * p.speed; p.y += (sy - p.y) * p.speed; const size = p.size * perspScale; ctx.beginPath(); ctx.arc(p.x, p.y, size, 0, Math.PI * 2); ctx.fillStyle = p.color; ctx.globalAlpha = 0.85 * perspScale; ctx.shadowBlur = 12; ctx.shadowColor = p.color; ctx.fill(); ctx.globalAlpha = 1; ctx.shadowBlur = 0; });
      const headX = cx + Math.sin(t * 1.4) * 85; const headY = cy - 125;
      const grad = ctx.createLinearGradient(headX, headY, cx, cy + 80); grad.addColorStop(0, "#00eaff"); grad.addColorStop(1, "transparent");
      ctx.beginPath(); ctx.moveTo(headX, headY); ctx.lineTo(cx + Math.sin(t * 1.4) * 20, cy + 80); ctx.strokeStyle = grad; ctx.lineWidth = 2; ctx.globalAlpha = 0.7 + 0.3 * Math.sin(t * 4); ctx.shadowBlur = 20; ctx.shadowColor = "#00eaff"; ctx.stroke(); ctx.globalAlpha = 1; ctx.shadowBlur = 0;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="particleCanvas" />;
}

/* ── ANIMACIÓN BOQUILLA IMPRESORA ── */
function PrinterAnimation() {
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const W = canvas.width = 480;
    const H = canvas.height = 480;
    let raf;
    let t = 0;
    const buildLayers = 40;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.018;
      const cx = W / 2, cy = H / 2;

      // plataforma base
      ctx.save();
      ctx.translate(cx, cy + 130);
      const platGrad = ctx.createLinearGradient(-110, 0, 110, 0);
      platGrad.addColorStop(0, "#00eaff11");
      platGrad.addColorStop(0.5, "#00eaff55");
      platGrad.addColorStop(1, "#00eaff11");
      ctx.beginPath();
      ctx.ellipse(0, 0, 110, 22, 0, 0, Math.PI * 2);
      ctx.fillStyle = platGrad;
      ctx.fill();
      ctx.strokeStyle = "#00eaff";
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 18;
      ctx.shadowColor = "#00eaff";
      ctx.stroke();
      ctx.restore();

      // figura construyéndose
      const progress = Math.sin(t * 0.5) * 0.5 + 0.5;
      const totalH = 120;
      const layersDone = Math.floor(progress * buildLayers);
      for (let i = 0; i < layersDone; i++) {
        const lt = i / buildLayers;
        const ly = cy + 120 - lt * totalH;
        const r = 38 * Math.sin(lt * Math.PI) + 8;
        const sides = 6;
        const rotation = lt * Math.PI * 2 + t * 0.3;
        const hue = lt < 0.5
          ? `rgba(${Math.floor(217 - lt * 100)},70,239,0.85)`
          : `rgba(0,${Math.floor(180 + lt * 75)},255,0.85)`;
        ctx.save();
        ctx.translate(cx, ly);
        ctx.beginPath();
        for (let s = 0; s <= sides; s++) {
          const a = (s / sides) * Math.PI * 2 + rotation;
          s === 0 ? ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r * 0.45)
                  : ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r * 0.45);
        }
        ctx.closePath();
        ctx.fillStyle = hue;
        ctx.shadowBlur = 10;
        ctx.shadowColor = lt > 0.5 ? "#00eaff" : "#d946ef";
        ctx.fill();
        ctx.strokeStyle = lt > 0.5 ? "#00eaffaa" : "#d946efaa";
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.restore();
      }

      // rieles verticales
      [cx - 130, cx + 130].forEach(rx => {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(rx, cy - 130);
        ctx.lineTo(rx, cy + 130);
        ctx.strokeStyle = "#ffffff18";
        ctx.lineWidth = 2;
        ctx.stroke();
        for (let m = 0; m < 8; m++) {
          const my = cy - 130 + m * 33;
          ctx.beginPath();
          ctx.moveTo(rx - 6, my);
          ctx.lineTo(rx + 6, my);
          ctx.strokeStyle = "#ffffff25";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        ctx.restore();
      });

      // brazo horizontal
      const nozzleY = cy + 120 - progress * totalH - 18;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx - 130, cy - 110);
      ctx.lineTo(cx, cy - 110);
      ctx.lineTo(cx, nozzleY - 30);
      ctx.strokeStyle = "#ffffff28";
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.restore();

      // boquilla
      ctx.save();
      ctx.translate(cx, nozzleY);
      const ng = ctx.createLinearGradient(-18, -25, 18, 25);
      ng.addColorStop(0, "#888"); ng.addColorStop(0.5, "#ddd"); ng.addColorStop(1, "#666");
      ctx.beginPath();
      ctx.moveTo(-18, -28); ctx.lineTo(18, -28); ctx.lineTo(10, 0);
      ctx.lineTo(4, 18); ctx.lineTo(-4, 18); ctx.lineTo(-10, 0);
      ctx.closePath();
      ctx.fillStyle = ng;
      ctx.shadowBlur = 22;
      ctx.shadowColor = "#00eaff";
      ctx.fill();
      ctx.strokeStyle = "#00eaff80";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // filamento
      if (layersDone > 0) {
        const figTop = cy + 120 - progress * totalH;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(cx, nozzleY + 18);
        ctx.lineTo(cx + Math.sin(t * 3) * 3, figTop);
        const fg = ctx.createLinearGradient(0, nozzleY + 18, 0, figTop);
        fg.addColorStop(0, "#d946ef"); fg.addColorStop(1, "#00eaff");
        ctx.strokeStyle = fg;
        ctx.lineWidth = 2.5;
        ctx.shadowBlur = 14;
        ctx.shadowColor = "#d946ef";
        ctx.stroke();
        ctx.restore();

        // chispa
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx + Math.sin(t * 3) * 3, figTop, 4 + Math.sin(t * 8) * 2, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.shadowBlur = 22;
        ctx.shadowColor = "#d946ef";
        ctx.fill();
        ctx.restore();
      }

      // scan line
      const scanY = cy + 120 - progress * totalH - 4;
      ctx.save();
      const sg = ctx.createLinearGradient(cx - 80, 0, cx + 80, 0);
      sg.addColorStop(0, "transparent"); sg.addColorStop(0.5, "#00eaffcc"); sg.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.moveTo(cx - 80, scanY); ctx.lineTo(cx + 80, scanY);
      ctx.strokeStyle = sg; ctx.lineWidth = 1.5;
      ctx.shadowBlur = 12; ctx.shadowColor = "#00eaff";
      ctx.stroke();
      ctx.restore();

      // label
      ctx.save();
      ctx.font = "bold 11px sans-serif";
      ctx.fillStyle = "#00eaff";
      ctx.globalAlpha = 0.7 + 0.3 * Math.sin(t * 2);
      ctx.textAlign = "center";
      ctx.shadowBlur = 12; ctx.shadowColor = "#00eaff";
      ctx.fillText("IMPRESORA 3D EN TIEMPO REAL", cx, 26);
      ctx.restore();

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        maxWidth: "480px",
        height: "auto",
        borderRadius: "32px",
        background: "linear-gradient(145deg,#ffffff0d,#ffffff04)",
        border: "1px solid #ffffff18",
        boxShadow: "0 0 80px #d946ef33",
      }}
    />
  );
}

/* ── APP ── */
export default function App() {
  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service_g61u3jb", "template_1ob6jqt", formRef.current, "ug3_CCVG7iHGp5E0-")
      .then(() => {
        alert("✅ Mensaje enviado correctamente. Te contactaremos pronto.");
        formRef.current.reset();
      })
      .catch((err) => {
        console.error(err);
        alert("⚠️ Error al enviar. Por favor contáctanos directamente por WhatsApp.");
      });
  };

  return (
    <div className="page">
      <ParticleCanvas />
      <div className="bgGlow" />
      <div className="gridBg" />

      <nav className="nav">
        <div className="logo">Vortex<span>Print3D</span></div>
        <div className="navLinks">
          <a href="#impresion">Impresión 3D</a>
          <a href="#proceso">Proceso</a>
          <a href="#materiales">Materiales</a>
          <a href="#pintado">Pintado</a>
          <a href="#webs">Páginas Web</a>
          <a href="#contacto">Contacto</a>
        </div>
      </nav>

      <section className="hero" id="impresion">
        <motion.div className="heroText" initial={{ opacity: 0, x: -70 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }}>
          <p className="badge">IMPRESIÓN 3D • RESINA • FILAMENTO • PINTADO PROFESIONAL</p>
          <h1>Fabricamos piezas <span>3D únicas</span></h1>
          <p className="desc">
            En <b>VortexPrint3D</b> damos vida a tus ideas con tecnología de impresión 3D de última generación.
            Figuras de colección, llaveros, prototipos, piezas funcionales y decorativas — todo con acabado
            profesional y pintado artesanal de primer nivel.
          </p>
          <div className="statRow">
            <Stat n="500+" label="Piezas entregadas" />
            <Stat n="98%" label="Satisfacción" />
            <Stat n="48h" label="Entrega express" />
          </div>
          <div className="buttons">
            <a href={asesor1} className="btnMain"><FaWhatsapp /> Cotizar asesor 1</a>
            <a href={asesor2} className="btnGhost"><FaWhatsapp /> Cotizar asesor 2</a>
          </div>
        </motion.div>

        <motion.div className="heroVisual" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 1 }}>
          <PrinterAnimation />
        </motion.div>
      </section>

      <section className="section" id="servicios">
        <h2>Servicios de Impresión 3D</h2>
        <p className="sectionDesc">Desde la idea hasta la pieza terminada — manejamos cada etapa con precisión industrial.</p>
        <div className="cards">
          <Card icon={<FaCube />} title="Figuras personalizadas" text="Fabricamos figuras de anime, videojuegos, mascotas, personajes originales y trofeos. Alta fidelidad al diseño original con acabado de colección." />
          <Card icon={<FaKey />} title="Llaveros 3D" text="Llaveros personalizados para empresas, eventos, regalos y marcas. Con logo, texto, forma o diseño libre. Mínimo 1 unidad." />
          <Card icon={<FaGem />} title="Figuras en resina" text="Resina fotopolimérica para máximo detalle. Ideal para miniaturas, joyería, réplicas y piezas finas de hasta 0.05 mm de resolución." />
          <Card icon={<FaCube />} title="Piezas en filamento" text="PLA, PETG y especiales para piezas grandes, estructurales, decorativas o funcionales. Resistencia superior para uso diario." />
          <Card icon={<FaTools />} title="Prototipos y piezas técnicas" text="Fabricamos piezas de ingeniería, repuestos, accesorios y prototipos para empresas y emprendedores. Tolerancias precisas." />
          <Card icon={<FaRocket />} title="Pedidos en cantidad" text="Producción en serie para negocios, eventos y distribución. Precios especiales por volumen. Consulta sin compromiso." />
          <Card icon={<FaLayerGroup />} title="Modelos arquitectónicos" text="Maquetas y modelos a escala para arquitectos, inmobiliarias y concursos. Detalle estructural completo." />
          <Card icon={<FaIndustry />} title="Piezas industriales" text="Tapas, carcasas, soportes, adaptadores y accesorios para maquinaria. Material PETG de alta resistencia térmica." />
          <Card icon={<FaStar />} title="Ediciones de colección" text="Piezas limitadas con numeración, certificado y acabado premium. Para coleccionistas y regalos especiales." />
        </div>
      </section>

      <section className="section" id="proceso">
        <h2>¿Cómo trabajamos?</h2>
        <p className="sectionDesc">Un proceso claro, rápido y profesional en 5 pasos.</p>
        <div className="process">
          <Step n="01" title="Envías tu idea" text="Foto, referencia, boceto o descripción. Nosotros evaluamos la viabilidad y te orientamos sobre el mejor material." />
          <Step n="02" title="Cotización personalizada" text="Precio según tamaño, material, detalle y cantidad. Respuesta en menos de 2 horas por WhatsApp." />
          <Step n="03" title="Preparación del modelo" text="Ajustamos o preparamos el archivo 3D (STL/OBJ). Si no tienes archivo, lo modelamos o usamos referencias." />
          <Step n="04" title="Impresión y control de calidad" text="Impresión con monitoreo en tiempo real. Revisamos cada capa. Sin defectos o volvemos a imprimir." />
          <Step n="05" title="Pintado y entrega" text="Pintado profesional opcional. Empaquetado seguro para envío o entrega en Lima." />
        </div>
      </section>

      <section className="materials" id="materiales">
        <h2>Materiales que usamos</h2>
        <p className="sectionDesc">Seleccionamos el material ideal según tu proyecto para garantizar el mejor resultado.</p>
        <div className="materialGrid">
          <Material title="PLA" badge="MÁS POPULAR" text="Material rígido, ecológico y versátil. Ideal para figuras decorativas, llaveros y piezas de exhibición. Acabado suave y colores vivos." specs={["Alta definición visual","Biodegradable","Más de 30 colores"]} />
          <Material title="PETG" badge="MÁS RESISTENTE" text="Resistencia mecánica y térmica superior. Perfecto para piezas funcionales, repuestos y componentes que exigen durabilidad real." specs={["Alta resistencia al calor","Anticorrosivo","Semi-flexible"]} />
          <Material title="Resina" badge="MÁXIMO DETALLE" text="Impresión fotopolimérica con resolución de 0.05 mm. Para miniaturas, joyería, figuras premium y piezas con microdetalles." specs={["Resolución ultrafina","Superficie lisa","Ideal para colección"]} />
          <Material title="Especiales" badge="A PEDIDO" text="Filamento con madera, metal, fibra de carbono, fosforescente o flexible. Para proyectos únicos con propiedades específicas." specs={["Efecto madera/metal","Flexibilidad opcional","Proyectos especiales"]} />
        </div>
      </section>

      <section className="section" id="pintado">
        <h2>Pintado Profesional</h2>
        <p className="sectionDesc">El acabado hace la diferencia. Usamos pinturas y técnicas de nivel profesional para transformar cada pieza.</p>
        <div className="cards">
          <Card icon={<FaPaintBrush />} title="Pinturas acrílicas de calidad" text="Usamos pinturas acrílicas profesionales de marcas reconocidas (Vallejo, Citadel, Tamiya). Colores firmes, resistentes y de larga duración." />
          <Card icon={<FaShieldAlt />} title="Sellado y barnizado" text="Aplicamos barniz mate, satinado o brillante según el acabado deseado. Protege la pintura y da un look premium a cada pieza." />
          <Card icon={<FaStar />} title="Sombreado y efectos" text="Técnicas de dry-brush, washing, sombreado y highlights para dar profundidad visual. Resultado cinematográfico en cada figura." />
          <Card icon={<FaCheckCircle />} title="Base y preparación" text="Aplicamos imprimante profesional antes de pintar para garantizar adherencia perfecta y colores exactos sobre cualquier material." />
          <Card icon={<FaGem />} title="Efectos especiales" text="Metálicos, cromados, translúcidos, fosforescentes y envejecidos. Personalizamos el efecto visual según tu visión." />
          <Card icon={<FaRocket />} title="Pintado de colección" text="Para figuras de alta gama, aplicamos hasta 8 capas con aerógrafo. Resultado de nivel exposición y galería." />
        </div>
        <div className="paintNote">
          <FaCheckCircle /> Todas las piezas pintadas incluyen capa protectora final sin costo adicional.
        </div>
      </section>

      <section className="section" id="webs">
        <h2>Páginas Web para Negocios</h2>
        <p className="sectionDesc">
          También diseñamos páginas web modernas, elegantes y optimizadas para captar clientes. Estructura comercial,
          animaciones, botón WhatsApp y diseño único para tu marca.
        </p>
        <div className="plans">
          <Plan name="BÁSICO" price="A cotizar" text="Web de presentación con tus servicios, contacto y botón WhatsApp. Ideal para empezar." features={["1 página completa","Diseño responsivo","Botón WhatsApp"]} />
          <Plan name="PRO" price="A cotizar" active text="Varias secciones, animaciones, formulario de contacto y diseño visual profesional." features={["Múltiples secciones","Animaciones avanzadas","Formulario de contacto","Dominio incluido*"]} />
          <Plan name="ULTRA" price="A cotizar" text="Efectos visuales premium, estructura avanzada y presencia de alto impacto para destacar." features={["Efectos 3D/partículas","SEO básico incluido","Soporte 30 días","Mantenimiento"]} />
        </div>
        <div className="center buttons" style={{ marginTop: "40px" }}>
          <a href={webWhatsapp} className="btnMain"><FaWhatsapp /> Cotizar página web</a>
        </div>
      </section>

      <section className="contact" id="contacto">
        <h2>Envíanos tu idea</h2>
        <p>Cuéntanos qué deseas crear y te respondemos para cotizar tu proyecto.</p>
        <form ref={formRef} onSubmit={sendEmail}>
          <div className="formRow">
            <input name="name" placeholder="Tu nombre completo" required />
            <input name="phone" placeholder="Tu WhatsApp (con código país)" required />
          </div>
          <input name="email" type="email" placeholder="Tu correo electrónico" required />
          <select name="service">
            <option>Figuras personalizadas</option>
            <option>Llaveros 3D</option>
            <option>Piezas en resina</option>
            <option>Piezas en filamento</option>
            <option>Pintado profesional</option>
            <option>Prototipo / Pieza técnica</option>
            <option>Modelo arquitectónico</option>
            <option>Pedido en cantidad</option>
            <option>Página web para negocio</option>
          </select>
          <div className="formRow">
            <select name="material">
              <option value="">Material preferido (opcional)</option>
              <option>PLA</option>
              <option>PETG</option>
              <option>Resina</option>
              <option>Especial / No sé</option>
            </select>
            <select name="urgency">
              <option value="">Urgencia del pedido</option>
              <option>Normal (5-7 días)</option>
              <option>Express (48 horas)</option>
              <option>Estoy explorando opciones</option>
            </select>
          </div>
          <textarea name="message" placeholder="Describe tu idea, tamaño aproximado, cantidad y cualquier detalle importante..." required />
          <input type="hidden" name="to_email" value="jonathanpickling@gmail.com" />
          <button type="submit"><FaEnvelope /> Enviar solicitud</button>
        </form>
        <div className="buttons center" style={{ marginTop: "28px" }}>
          <a href={asesor1} className="btnMain"><FaWhatsapp /> Asesor 1 - Impresión 3D</a>
          <a href={asesor2} className="btnGhost"><FaWhatsapp /> Asesor 2 - Impresión 3D</a>
        </div>
      </section>
    </div>
  );
}

function Stat({ n, label }) {
  return (
    <div className="stat">
      <span className="statN">{n}</span>
      <span className="statL">{label}</span>
    </div>
  );
}

function Card({ icon, title, text }) {
  return (
    <motion.div className="card" whileHover={{ y: -12, scale: 1.03 }}>
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </motion.div>
  );
}

function Material({ title, badge, text, specs }) {
  return (
    <motion.div className="material" whileHover={{ y: -12, scale: 1.03 }}>
      <span className="matBadge">{badge}</span>
      <h3>{title}</h3>
      <p>{text}</p>
      <ul className="specList">
        {specs.map((s, i) => <li key={i}><FaCheckCircle /> {s}</li>)}
      </ul>
    </motion.div>
  );
}

function Plan({ name, price, text, active, features }) {
  return (
    <motion.div className={active ? "plan active" : "plan"} whileHover={{ y: -12, scale: 1.03 }}>
      {active && <span className="planBadge">RECOMENDADO</span>}
      <h3>{name}</h3>
      <h4>{price}</h4>
      <p>{text}</p>
      <ul className="featureList">
        {features.map((f, i) => <li key={i}><FaCheckCircle /> {f}</li>)}
      </ul>
    </motion.div>
  );
}

function Step({ n, title, text }) {
  return (
    <motion.div className="step" whileHover={{ x: 8 }}>
      <span className="stepN">{n}</span>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </motion.div>
  );
}