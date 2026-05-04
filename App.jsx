import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Testimonials from './components/Testimonials.jsx';
import Pricing from './components/Pricing.jsx';
import Footer from './components/Footer.jsx';

/* ─── Floating particles canvas ─── */
function Particles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const COLORS = ['rgba(139,92,246,', 'rgba(96,165,250,', 'rgba(52,211,153,', 'rgba(244,114,182,'];
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.4 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}

/* ─── Section divider ─── */
function Divider() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="h-px w-full"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.2) 30%, rgba(96,165,250,0.2) 70%, transparent)' }} />
    </div>
  );
}

/* ─── Root App ─── */
export default function App() {
  return (
    <div className="relative min-h-screen" style={{ background: 'linear-gradient(135deg, #020008 0%, #080318 40%, #050d1a 70%, #020008 100%)' }}>
      {/* Ambient background particles */}
      <Particles />

      {/* Fixed large background blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, -8, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
          className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.03) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
      </div>

      {/* Content — sits above particles */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Divider />
          <Features />
          <Divider />
          <HowItWorks />
          <Divider />
          <Testimonials />
          <Divider />
          <Pricing />
        </main>
        <Footer />
      </div>
    </div>
  );
}
