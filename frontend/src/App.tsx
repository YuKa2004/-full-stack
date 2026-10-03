import React, { useState } from 'react';

function App() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      // In a real app, you would fetch this from your Hono backend
      // const response = await fetch('/api/checkout', { method: 'POST', ... });
      // const data = await response.json();
      // window.location.href = data.url;
      
      alert('Mock redirect to Stripe Checkout! (Connects to Hono backend /api/checkout)');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <header style={{ borderBottom: '1px solid #eee', paddingBottom: '20px', marginBottom: '20px' }}>
        <h1 style={{ margin: 0, color: '#111' }}>PrintFlow Platform</h1>
        <p style={{ color: '#666', marginTop: '8px' }}>Parent Ordering & Studio Fulfillment</p>
      </header>

      <section>
        <h2>School Picture Day - 2026</h2>
        <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
          <div style={{ border: '1px solid #e5e7eb', padding: '16px', borderRadius: '8px', flex: 1 }}>
            <h3>Digital Only</h3>
            <p>$35.00</p>
            <button 
              onClick={handleCheckout} 
              disabled={loading}
              style={{ background: '#000', color: '#fff', padding: '10px 16px', border: 'none', borderRadius: '6px', cursor: 'pointer', width: '100%' }}>
              Select Package
            </button>
          </div>
          <div style={{ border: '1px solid #2563eb', padding: '16px', borderRadius: '8px', flex: 1, position: 'relative' }}>
            <span style={{ position: 'absolute', top: '-12px', right: '16px', background: '#2563eb', color: '#fff', padding: '4px 8px', fontSize: '12px', borderRadius: '12px' }}>Popular</span>
            <h3>Digital + Print Pack</h3>
            <p>$65.00</p>
            <ul style={{ paddingLeft: '20px', color: '#4b5563', fontSize: '14px' }}>
              <li>High-res digital downloads</li>
              <li>2x 8x10 prints</li>
              <li>Automated lab fulfillment</li>
            </ul>
            <button 
              onClick={handleCheckout} 
              disabled={loading}
              style={{ background: '#2563eb', color: '#fff', padding: '10px 16px', border: 'none', borderRadius: '6px', cursor: 'pointer', width: '100%', marginTop: '10px' }}>
              Select Package
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
