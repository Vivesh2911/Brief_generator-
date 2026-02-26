import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, FileText, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function Sidebar({ briefs, selectedId, onSelect, onDelete, onNew }) {
  const [hoveredId, setHoveredId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (confirmDelete === id) {
      onDelete(id);
      setConfirmDelete(null);
    } else {
      setConfirmDelete(id);
      setTimeout(() => setConfirmDelete(null), 3000);
    }
  };

  return (
    <div style={{
      height: '100vh',
      background: 'var(--surface)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Sidebar Header */}
      <div style={{
        height: 60,
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        flexShrink: 0,
      }}>
        <span style={{
          fontSize: '0.65rem',
          color: 'var(--text-muted)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontWeight: 500,
        }}>
          History
        </span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNew}
          style={{
            marginLeft: 'auto',
            background: 'var(--accent)',
            border: 'none',
            color: '#0a0a0a',
            cursor: 'pointer',
            padding: '5px 10px',
            borderRadius: 'var(--radius)',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '0.7rem',
            letterSpacing: '0.02em',
          }}
        >
          <Plus size={12} />
          New
        </motion.button>
      </div>

      {/* Brief List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
        <AnimatePresence>
          {briefs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                padding: '32px 16px',
                textAlign: 'center',
                color: 'var(--text-muted)',
                fontSize: '0.75rem',
                lineHeight: 1.8,
              }}
            >
              <FileText size={24} style={{ marginBottom: 8, opacity: 0.3 }} />
              <div>No briefs yet.</div>
              <div>Generate your first spec.</div>
            </motion.div>
          ) : (
            briefs.map((brief, i) => (
              <motion.div
                key={brief.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => onSelect(brief)}
                onMouseEnter={() => setHoveredId(brief.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  padding: '10px 12px',
                  borderRadius: 'var(--radius)',
                  cursor: 'pointer',
                  marginBottom: 2,
                  border: `1px solid ${selectedId === brief.id ? 'var(--accent)' : 'transparent'}`,
                  background: selectedId === brief.id
                    ? 'var(--accent-dim)'
                    : hoveredId === brief.id
                    ? 'var(--surface-2)'
                    : 'transparent',
                  transition: 'all 0.15s ease',
                  position: 'relative',
                }}
              >
                <div style={{
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  color: selectedId === brief.id ? 'var(--accent)' : 'var(--text-primary)',
                  marginBottom: 3,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  paddingRight: 20,
                }}>
                  {brief.app_name}
                </div>
                <div style={{
                  fontSize: '0.68rem',
                  color: 'var(--text-muted)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  marginBottom: 4,
                }}>
                  {brief.description}
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: '0.62rem',
                  color: 'var(--text-muted)',
                }}>
                  <Clock size={9} />
                  {formatDistanceToNow(new Date(brief.created_at), { addSuffix: true })}
                </div>

                {/* Delete button */}
                <AnimatePresence>
                  {hoveredId === brief.id && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={(e) => handleDelete(e, brief.id)}
                      style={{
                        position: 'absolute',
                        top: 10,
                        right: 8,
                        background: confirmDelete === brief.id ? 'var(--red)' : 'transparent',
                        border: 'none',
                        color: confirmDelete === brief.id ? 'white' : 'var(--text-muted)',
                        cursor: 'pointer',
                        padding: '2px 4px',
                        borderRadius: 'var(--radius)',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      title={confirmDelete === brief.id ? 'Click again to confirm' : 'Delete'}
                    >
                      <Trash2 size={11} />
                    </motion.button>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
