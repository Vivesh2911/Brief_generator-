import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import BriefForm from './components/BriefForm';
import BriefOutput from './components/BriefOutput';
import Header from './components/Header';
import axios from 'axios';
import toast from 'react-hot-toast';

const API = 'https://specforge-zzmi.onrender.com/api';

export default function App() {
  const [briefs, setBriefs] = useState([]);
  const [selectedBrief, setSelectedBrief] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [view, setView] = useState('form'); // 'form' | 'output'
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    fetchBriefs();
  }, []);

  const fetchBriefs = async () => {
    try {
      const res = await axios.get(`${API}/briefs`);
      setBriefs(res.data);
    } catch (err) {
      console.error('Failed to fetch briefs', err);
    }
  };

  const handleGenerate = async (formData) => {
    setIsGenerating(true);
    setView('form');
    try {
      const res = await axios.post(`${API}/briefs`, formData);
      const newBrief = res.data;
      setBriefs(prev => [newBrief, ...prev]);
      setSelectedBrief(newBrief);
      setView('output');
      toast.success('Engineering spec generated!', {
        style: { background: '#1a1a1a', color: '#f0f0f0', border: '1px solid #2a2a2a' }
      });
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to generate spec';
      toast.error(msg, {
        style: { background: '#1a1a1a', color: '#ff4747', border: '1px solid #ff4747' }
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectBrief = (brief) => {
    setSelectedBrief(brief);
    setView('output');
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/briefs/${id}`);
      setBriefs(prev => prev.filter(b => b.id !== id));
      if (selectedBrief?.id === id) {
        setSelectedBrief(null);
        setView('form');
      }
      toast.success('Brief deleted', {
        style: { background: '#1a1a1a', color: '#f0f0f0', border: '1px solid #2a2a2a' }
      });
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  const handleNewBrief = () => {
    setSelectedBrief(null);
    setView('form');
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg)' }}>
      <Toaster position="top-right" />

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ width: 280, flexShrink: 0 }}
          >
            <Sidebar
              briefs={briefs}
              selectedId={selectedBrief?.id}
              onSelect={handleSelectBrief}
              onDelete={handleDelete}
              onNew={handleNewBrief}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Header
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(p => !p)}
          briefCount={briefs.length}
        />
        <main style={{ flex: 1, overflow: 'auto', padding: '32px' }}>
          <AnimatePresence mode="wait">
            {view === 'form' ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <BriefForm onSubmit={handleGenerate} isGenerating={isGenerating} />
              </motion.div>
            ) : (
              <motion.div
                key="output"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <BriefOutput brief={selectedBrief} onNew={handleNewBrief} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
