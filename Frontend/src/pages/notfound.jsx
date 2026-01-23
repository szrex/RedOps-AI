import React from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div style={styles.container} className="no-scrollbar">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .gif-container {
          animation: float 4s ease-in-out infinite;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 0 50px rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}</style>

      <main style={styles.main}>
        {/* Zoro GIF */}
        <div class="tenor-gif-embed" data-postid="17375932" data-share-method="host" data-aspect-ratio="1" data-width="100%"><a href="https://tenor.com/view/luffy-i-dont-know-one-piece-manga-series-confuse-gif-17375932">Luffy I Dont Know GIF</a>from <a href="https://tenor.com/search/luffy-gifs">Luffy GIFs</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script>

        {/* Text */}
        <p style={styles.subtitle}>Oh... I think I got lost.</p>

        {/* Transparent Button */}
        <Link to="/" style={styles.homeBtn} className="hover-scale">
          <Home size={18} />
          <span>Go to Home</span>
        </Link>
      </main>

      {/* Decorative Glows */}
      <div style={{ ...styles.glow, top: '20%', right: '10%', background: 'rgba(16, 185, 129, 0.05)' }} />
      <div style={{ ...styles.glow, bottom: '20%', left: '10%', background: 'rgba(59, 130, 246, 0.03)' }} />
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    backgroundColor: '#0a0a0c',
    color: '#e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Inter', sans-serif",
    position: 'relative',
    overflow: 'hidden',
  },
  main: {
    textAlign: 'center',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '30px',
    padding: '20px',
  },
  gifWrapper: {
    width: '100%',
    maxWidth: '480px',
    background: '#000',
  },
  gif: {
    width: '100%',
    height: 'auto',
    display: 'block',
  },
  subtitle: {
    fontSize: '24px',
    fontWeight: '500',
    color: '#94a3b8',
    margin: 0,
    fontStyle: 'italic',
  },
  homeBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 32px',
    background: 'transparent',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '100px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '15px',
    transition: 'all 0.3s ease',
  },
  glow: {
    position: 'absolute',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    filter: 'blur(100px)',
    pointerEvents: 'none',
    zIndex: 0,
  }
};