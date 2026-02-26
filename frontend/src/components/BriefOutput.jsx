import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus, CheckCircle2, AlertTriangle, Server, Database,
  Globe, Cpu, Target, Users, Layers, Activity,
  ChevronDown, ChevronUp, Copy, Check, ArrowLeft
} from 'lucide-react';
import { format } from 'date-fns';

const priorityColor = {
  'Must Have': 'var(--green)',
  'Should Have': 'var(--blue)',
  'Nice to Have': 'var(--text-muted)',
};

const severityColor = {
  'High': 'var(--red)',
  'Medium': 'var(--orange)',
  'Low': 'var(--text-muted)',
};

function Section({ icon: Icon, title, accent, children, delay = 0 }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        marginBottom: 16,
        overflow: 'hidden',
      }}
    >
      <div
        onClick={() => setCollapsed(c => !c)}
        style={{
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          cursor: 'pointer',
          borderBottom: collapsed ? 'none' : '1px solid var(--border)',
          transition: 'background 0.15s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-2)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        <div style={{
          width: 28,
          height: 28,
          background: accent || 'var(--surface-3)',
          borderRadius: 'var(--radius)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Icon size={13} color={accent ? '#0a0a0a' : 'var(--text-secondary)'} />
        </div>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '0.8rem',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}>
          {title}
        </span>
        <div style={{ marginLeft: 'auto', color: 'var(--text-muted)' }}>
          {collapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        </div>
      </div>
      {!collapsed && <div style={{ padding: '16px 20px' }}>{children}</div>}
    </motion.div>
  );
}

function Badge({ text, color }) {
  return (
    <span style={{
      fontSize: '0.62rem',
      color: color || 'var(--text-muted)',
      border: `1px solid ${color || 'var(--border)'}`,
      borderRadius: 2,
      padding: '2px 6px',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      fontWeight: 500,
      whiteSpace: 'nowrap',
    }}>
      {text}
    </span>
  );
}

function Tag({ text, color }) {
  return (
    <span style={{
      background: color ? `${color}18` : 'var(--surface-3)',
      color: color || 'var(--text-secondary)',
      fontSize: '0.68rem',
      padding: '3px 8px',
      borderRadius: 2,
      fontFamily: 'var(--font-body)',
    }}>
      {text}
    </span>
  );
}

export default function BriefOutput({ brief, onNew }) {
  const [copied, setCopied] = useState(false);
  const spec = brief?.generated_spec;

  if (!brief || !spec) return null;

  const copyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(spec, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };

  return (
    <motion.div variants={container} initial="hidden" animate="show" style={{ maxWidth: 860, margin: '0 auto' }}>

      {/* Top Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 16,
          marginBottom: 32,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: '0.62rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: 6,
          }}>
            Engineering Brief · {format(new Date(brief.created_at), 'MMM d, yyyy · HH:mm')}
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
          }}>
            {brief.app_name}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: 6, lineHeight: 1.6 }}>
            {brief.description}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0, flexWrap: 'wrap' }}>
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={onNew}
            style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius)', color: 'var(--text-secondary)',
              cursor: 'pointer', padding: '8px 14px', fontFamily: 'var(--font-body)',
              fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            <ArrowLeft size={13} /> New Brief
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={copyJSON}
            style={{
              background: copied ? 'var(--green)' : 'var(--accent)',
              border: 'none',
              borderRadius: 'var(--radius)', color: '#0a0a0a',
              cursor: 'pointer', padding: '8px 14px', fontFamily: 'var(--font-display)',
              fontWeight: 700, fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? 'Copied!' : 'Copy JSON'}
          </motion.button>
        </div>
      </motion.div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        style={{
          background: 'var(--accent-dim)',
          border: '1px solid var(--accent-mid)',
          borderRadius: 'var(--radius-lg)',
          padding: '18px 22px',
          marginBottom: 16,
        }}
      >
        <div style={{ fontSize: '0.62rem', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
          Executive Summary
        </div>
        <p style={{ color: 'var(--text-primary)', lineHeight: 1.7, fontSize: '0.9rem' }}>
          {spec.summary}
        </p>
        {spec.problem_statement && (
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--accent-mid)' }}>
            <div style={{ fontSize: '0.62rem', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
              Problem Statement
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.6 }}>
              {spec.problem_statement}
            </p>
          </div>
        )}
      </motion.div>

      {/* MVP Features */}
      {spec.mvp_features && (
        <Section icon={CheckCircle2} title="MVP Features" accent="var(--accent)" delay={0.1}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {spec.mvp_features.map((f, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 12,
                padding: '10px 14px', background: 'var(--surface-2)',
                borderRadius: 'var(--radius)', borderLeft: `3px solid ${priorityColor[f.priority] || 'var(--border)'}`,
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontFamily: 'var(--font-display)', fontSize: '0.82rem', marginBottom: 3 }}>
                    {f.feature}
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', lineHeight: 1.5 }}>
                    {f.description}
                  </div>
                </div>
                <Badge text={f.priority} color={priorityColor[f.priority]} />
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* User Stories */}
      {spec.user_stories && (
        <Section icon={Users} title="User Stories" delay={0.15}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {spec.user_stories.map((s, i) => (
              <div key={i} style={{
                padding: '10px 14px', background: 'var(--surface-2)',
                borderRadius: 'var(--radius)', fontSize: '0.8rem', lineHeight: 1.6,
              }}>
                <span style={{ color: 'var(--blue)', fontWeight: 500 }}>{s.role}</span>
                {' · '}
                <span style={{ color: 'var(--text-secondary)' }}>{s.action}</span>
                {' · '}
                <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>{s.benefit}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Tech Stack */}
      {spec.tech_stack && (
        <Section icon={Cpu} title="Tech Stack" delay={0.2}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
            {['frontend', 'backend', 'database', 'hosting'].map(key => spec.tech_stack[key] && (
              <div key={key} style={{
                padding: '12px 14px', background: 'var(--surface-2)',
                borderRadius: 'var(--radius)', border: '1px solid var(--border)',
              }}>
                <div style={{
                  fontSize: '0.6rem', color: 'var(--text-muted)',
                  letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6,
                }}>
                  {key}
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', marginBottom: 4,
                  color: key === 'frontend' ? 'var(--blue)' : key === 'backend' ? 'var(--green)' : key === 'database' ? 'var(--orange)' : 'var(--accent)',
                }}>
                  {spec.tech_stack[key].technology}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {spec.tech_stack[key].reason}
                </div>
              </div>
            ))}
          </div>
          {spec.tech_stack.extras && spec.tech_stack.extras.length > 0 && (
            <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', paddingTop: 2 }}>Also:</span>
              {spec.tech_stack.extras.map((e, i) => (
                <Tag key={i} text={e.technology} />
              ))}
            </div>
          )}
        </Section>
      )}

      {/* Data Models */}
      {spec.data_models && (
        <Section icon={Database} title="Data Models" delay={0.25}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {spec.data_models.map((model, i) => (
              <div key={i} style={{
                border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden',
              }}>
                <div style={{
                  padding: '8px 14px',
                  background: 'var(--surface-3)',
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: '0.8rem', color: 'var(--orange)',
                }}>
                  {model.model}
                </div>
                <div>
                  {(model.fields || []).map((field, j) => (
                    <div key={j} style={{
                      display: 'grid', gridTemplateColumns: '1fr 100px 2fr',
                      padding: '7px 14px',
                      borderTop: j === 0 ? 'none' : '1px solid var(--border)',
                      fontSize: '0.76rem', gap: 12, alignItems: 'center',
                    }}>
                      <code style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>
                        {field.name}
                      </code>
                      <code style={{ color: 'var(--blue)', fontFamily: 'var(--font-body)', fontSize: '0.7rem' }}>
                        {field.type}
                      </code>
                      <span style={{ color: 'var(--text-muted)' }}>{field.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* API Endpoints */}
      {spec.api_endpoints && (
        <Section icon={Globe} title="API Endpoints" delay={0.3}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {spec.api_endpoints.map((ep, i) => {
              const methodColor = { GET: 'var(--green)', POST: 'var(--blue)', PUT: 'var(--orange)', DELETE: 'var(--red)', PATCH: 'var(--orange)' };
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '9px 14px', background: 'var(--surface-2)',
                  borderRadius: 'var(--radius)', flexWrap: 'wrap',
                }}>
                  <Badge text={ep.method} color={methodColor[ep.method]} />
                  <code style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--text-primary)', flex: '0 0 auto' }}>
                    {ep.path}
                  </code>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', flex: 1 }}>
                    {ep.description}
                  </span>
                  {ep.auth_required && <Badge text="Auth" color="var(--orange)" />}
                </div>
              );
            })}
          </div>
        </Section>
      )}

      {/* Risks */}
      {spec.risks && (
        <Section icon={AlertTriangle} title="Risks & Mitigations" delay={0.35}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {spec.risks.map((r, i) => (
              <div key={i} style={{
                padding: '10px 14px', background: 'var(--surface-2)',
                borderRadius: 'var(--radius)',
                borderLeft: `3px solid ${severityColor[r.severity] || 'var(--border)'}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontWeight: 600, fontSize: '0.8rem', fontFamily: 'var(--font-display)' }}>{r.risk}</span>
                  <Badge text={r.severity} color={severityColor[r.severity]} />
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  ↳ {r.mitigation}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Milestones */}
      {spec.milestones && (
        <Section icon={Layers} title="Milestones" delay={0.4}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {spec.milestones.map((m, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, position: 'relative', paddingBottom: i < spec.milestones.length - 1 ? 20 : 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.7rem', color: '#0a0a0a',
                    flexShrink: 0,
                  }}>
                    {i + 1}
                  </div>
                  {i < spec.milestones.length - 1 && (
                    <div style={{ width: 1, flex: 1, background: 'var(--border)', marginTop: 4, minHeight: 20 }} />
                  )}
                </div>
                <div style={{ paddingTop: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.82rem' }}>
                      {m.phase}
                    </span>
                    <Tag text={m.duration} color="var(--accent)" />
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {(m.deliverables || []).map((d, j) => (
                      <span key={j} style={{
                        fontSize: '0.72rem', color: 'var(--text-secondary)',
                        background: 'var(--surface-3)', padding: '3px 8px', borderRadius: 2,
                      }}>
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Success Metrics & Out of Scope */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {spec.success_metrics && (
          <Section icon={Activity} title="Success Metrics" delay={0.45}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {spec.success_metrics.map((m, i) => (
                <div key={i} style={{
                  padding: '7px 12px', background: 'var(--surface-2)',
                  borderRadius: 'var(--radius)', fontSize: '0.78rem', color: 'var(--text-secondary)',
                  display: 'flex', alignItems: 'flex-start', gap: 8,
                }}>
                  <span style={{ color: 'var(--green)', flexShrink: 0 }}>◆</span>
                  {m}
                </div>
              ))}
            </div>
          </Section>
        )}

        {spec.out_of_scope && (
          <Section icon={Target} title="Out of Scope" delay={0.5}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {spec.out_of_scope.map((o, i) => (
                <div key={i} style={{
                  padding: '7px 12px', background: 'var(--surface-2)',
                  borderRadius: 'var(--radius)', fontSize: '0.78rem', color: 'var(--text-muted)',
                  display: 'flex', alignItems: 'flex-start', gap: 8,
                }}>
                  <span style={{ color: 'var(--red)', flexShrink: 0 }}>✕</span>
                  {o}
                </div>
              ))}
            </div>
          </Section>
        )}
      </div>

    </motion.div>
  );
}
