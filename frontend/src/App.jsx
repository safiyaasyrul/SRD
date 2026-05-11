import React, { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('Accepted');
  const [message, setMessage] = useState('');

  const sendEmail = async () => {
    setMessage('⏳ Connecting to server...');
    try {
      const response = await fetch('https://abstract-api-j7wi.onrender.com/api/send-notice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, status })
      });

      if (!response.ok) {
        throw new Error('Server responded with an error');
      }

      const data = await response.json();
      if (data.success) {
        setMessage('✅ Success! Email notice sent to ' + email);
      } else {
        setMessage('❌ Mailer error: Check your Resend API Key');
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Connection Error: Wait 1 minute for Render to "Wake Up"');
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '450px', margin: 'auto', border: '1px solid #ddd', borderRadius: '10px', marginTop: '50px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <h2 style={{ color: '#333', textAlign: 'center' }}>Abstract Notice System</h2>
      <p style={{ fontSize: '14px', color: '#666', textAlign: 'center' }}>Send a status update email to the author.</p>
      
      <div style={{ marginTop: '30px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Author Name</label>
        <input type="text" placeholder="e.g. John Doe" onChange={e => setName(e.target.value)} style={{ width: '100%', marginBottom: '15px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
        
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Author Email</label>
        <input type="email" placeholder="e.g. author@example.com" onChange={e => setEmail(e.target.value)} style={{ width: '100%', marginBottom: '15px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
        
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Submission Status</label>
        <select onChange={e => setStatus(e.target.value)} style={{ width: '100%', marginBottom: '25px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', background: 'white' }}>
          <option>Accepted</option>
          <option>Minor Revision</option>
          <option>Major Revision</option>
          <option>Rejected</option>
        </select>
        
        <button onClick={sendEmail} style={{ width: '100%', padding: '12px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
          Send Email Notice
        </button>
      </div>

      {message && (
        <div style={{ marginTop: '20px', padding: '10px', borderRadius: '4px', backgroundColor: message.includes('✅') ? '#dcfce7' : '#fee2e2', color: message.includes('✅') ? '#166534' : '#991b1b', textAlign: 'center', fontSize: '14px' }}>
          {message}
        </div>
      )}
    </div>
  );
}

export default App;
