import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Loader2 } from 'lucide-react';

const inputStyle = {
  width: '100%',
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius)',
  color: 'var(--text-primary)',
  fontFamily: 'var(--font-body)',
  fontSize: '0.875rem',
  padding: '12px 14px',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  lineHeight: 1.5,
};

function Field({ label, tag, hint, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
        <label style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '0.75rem',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          color: 'var(--text-primary)',
        }}>
          {label}
        </label>
        {tag && (
          <span style={{
            fontSize: '0.6rem',
            color: 'var(--accent)',
            border: '1px solid var(--accent-mid)',
            borderRadius: 2,
            padding: '1px 5px',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}>
            {tag}
          </span>
        )}
      </div>
      {hint && (
        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 8 }}>
          {hint}
        </div>
      )}
      {children}
    </div>
  );
}

export default function BriefForm({ onSubmit, isGenerating }) {
  const [form, setForm] = useState({
    app_name: '',
    description: '',
    target_users: '',
    extra_context: '',
  });
  const [focused, setFocused] = useState(null);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.app_name || !form.description || !form.target_users) return;
    onSubmit(form);
  };

  const focusStyle = (field) => focused === field
    ? { borderColor: 'var(--accent)', boxShadow: '0 0 0 3px var(--accent-dim)' }
    : {};

  const examples = [
    { app_name: 'TaskFlow', description: 'A kanban-style project management tool for remote teams', target_users: 'Remote software teams of 5-50 people' },
    { app_name: 'MealMate', description: 'AI-powered meal planning and grocery list generator', target_users: 'Busy professionals who want to eat healthily' },
    { app_name: 'PitchPerfect', description: 'A tool to help founders craft and refine investor pitches', target_users: 'Early-stage startup founders' },
  ];

  const loadExample = (ex) => setForm({ ...ex, extra_context: '' });

  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: 48 }}
      >
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          fontSize: '0.65rem',
          color: 'var(--accent)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: 16,
          border: '1px solid var(--accent-mid)',
          padding: '4px 10px',
          borderRadius: 2,
        }}>
          <Zap size={10} fill="var(--accent)" />
          GPT-4o Powered
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          marginBottom: 16,
        }}>
          From idea to{' '}
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            color: 'var(--accent)',
          }}>
            engineering spec
          </span>
          <br />in seconds.
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '0.95rem',
          lineHeight: 1.7,
          maxWidth: 520,
        }}>
          Describe your product idea and get a complete engineering specification — user stories, data models, API design, tech stack recommendations, risks, and milestones.
        </p>
      </motion.div>

      {/* Quick examples */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ marginBottom: 32 }}
      >
        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
          Quick examples
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {examples.map((ex, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => loadExample(ex)}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                padding: '6px 12px',
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
            >
              {ex.app_name}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        onSubmit={handleSubmit}
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: 28,
        }}
      >
        <Field label="App Name" tag="Required" hint="What's the product called?">
          <input
            type="text"
            placeholder="e.g. TaskFlow, HealthOS, CodeReview Pro"
            value={form.app_name}
            onChange={set('app_name')}
            onFocus={() => setFocused('app_name')}
            onBlur={() => setFocused(null)}
            style={{ ...inputStyle, ...focusStyle('app_name') }}
            required
          />
        </Field>

        <Field label="Product Description" tag="Required" hint="Explain what it does and the core value proposition.">
          <textarea
            placeholder="e.g. A kanban-style project management tool that helps remote teams track tasks, collaborate in real-time, and ship faster. Integrates with Slack and GitHub."
            value={form.description}
            onChange={set('description')}
            onFocus={() => setFocused('description')}
            onBlur={() => setFocused(null)}
            rows={4}
            style={{ ...inputStyle, ...focusStyle('description'), resize: 'vertical', minHeight: 100 }}
            required
          />
        </Field>

        <Field label="Target Users" tag="Required" hint="Who is this built for? Be specific.">
          <input
            type="text"
            placeholder="e.g. Remote software teams of 5-50 people, B2B SaaS"
            value={form.target_users}
            onChange={set('target_users')}
            onFocus={() => setFocused('target_users')}
            onBlur={() => setFocused(null)}
            style={{ ...inputStyle, ...focusStyle('target_users') }}
            required
          />
        </Field>

        <Field label="Extra Context" hint="Tech constraints, competitors, integrations, or anything else helpful.">
          <textarea
            placeholder="e.g. Must integrate with Stripe for payments. Competitor is Linear. Budget is limited so prefer open-source libraries."
            value={form.extra_context}
            onChange={set('extra_context')}
            onFocus={() => setFocused('extra_context')}
            onBlur={() => setFocused(null)}
            rows={3}
            style={{ ...inputStyle, ...focusStyle('extra_context'), resize: 'vertical' }}
          />
        </Field>

        <motion.button
          type="submit"
          disabled={isGenerating || !form.app_name || !form.description || !form.target_users}
          whileHover={!isGenerating ? { scale: 1.01 } : {}}
          whileTap={!isGenerating ? { scale: 0.99 } : {}}
          style={{
            width: '100%',
            padding: '14px 24px',
            background: isGenerating ? 'var(--surface-3)' : 'var(--accent)',
            border: 'none',
            borderRadius: 'var(--radius)',
            color: isGenerating ? 'var(--text-muted)' : '#0a0a0a',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '0.95rem',
            letterSpacing: '0.02em',
            cursor: isGenerating ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            transition: 'background 0.2s',
          }}
        >
          {isGenerating ? (
            <>
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                <Loader2 size={16} />
              </motion.div>
              Generating spec with GPT-4o...
            </>
          ) : (
            <>
              <Zap size={16} fill="#0a0a0a" />
              Generate Engineering Spec
            </>
          )}
        </motion.button>
      </motion.form>
    </div>
  );
}
