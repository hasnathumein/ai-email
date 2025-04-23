'use client';
import React, { useState } from 'react';
import axios from 'axios';

const EmailForm = () => {
  const [scenario, setScenario] = useState('');
  const [responseEmail, setResponseEmail] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('Generating email...');
    setResponseEmail('');

    try {
      const res = await axios.post('http://localhost:5000/generate-email', {
        scenario,
        email: 'test@demo.com'
      });
      setStatus('✅ Email generated!');
      setResponseEmail(res.data.generated_email || 'No content returned.');
    } catch (err: any) {
      setStatus('❌ Something went wrong.');
      setResponseEmail(err.response?.data?.error || '');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white flex items-center justify-center px-6 py-10 font-sans">
      <div className="w-full max-w-2xl p-8 rounded-3xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20">
        <h1 className="text-4xl font-bold text-center mb-6 tracking-wide">✉️ Smart Email Generator</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <textarea
            rows={5}
            placeholder="e.g. Follow up with a client about a delayed invoice"
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition duration-200 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Generating...' : 'Generate Email'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-purple-300">{status}</p>

        {responseEmail && (
          <div className="mt-6 p-5 bg-white/10 border border-white/20 rounded-xl shadow-inner">
            <h2 className="text-lg font-semibold mb-2 text-purple-200">Generated Email</h2>
            <pre className="whitespace-pre-wrap text-white text-sm">{responseEmail}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailForm;
