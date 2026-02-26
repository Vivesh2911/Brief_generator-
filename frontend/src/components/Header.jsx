import React from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';

export default function Header({ sidebarOpen, onToggleSidebar, briefCount }) {
  return (
    <header style={{
      height: 60,
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 32px',
      gap: 16,
      background: 'var(--bg)',
      flexShrink: 0,
      position: 'relative',
      zIndex: 10,
    }}>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onToggleSidebar}
        style={{
          background: 'none',
          border: '1px solid var(--border)',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          padding: '6px 8px',
          borderRadius: 'var(--radius)',
          display: 'flex',
          alignItems: 'center',
          transition: 'border-color 0.2s, color 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
      >
        {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
      </motion.button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: 28,
          height: 28,
          background: 'var(--accent)',
          borderRadius: 'var(--radius)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Zap size={14} color="#0a0a0a" fill="#0a0a0a" />
        </div>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.02em' }}>
          SpecForge
        </span>
        <span style={{
          fontSize: '0.65rem',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-body)',
          borderLeft: '1px solid var(--border)',
          paddingLeft: 10,
          marginLeft: 2,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}>
          AI Engineering Brief Generator
        </span>
      </div>

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{
          fontSize: '0.7rem',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-body)',
          letterSpacing: '0.05em',
        }}>
          {briefCount} {briefCount === 1 ? 'brief' : 'briefs'} generated
        </span>
        <div style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'var(--green)',
          boxShadow: '0 0 8px var(--green)',
        }} />
      </div>
    </header>
  );
}
