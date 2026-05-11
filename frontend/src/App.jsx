import React, { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('Accepted');
  const [message, setMessage] = useState('');

  const sendEmail = async () => {
    setMessage('Sending...');
    try {
      // This tells the website to talk to your Render brain
      const response = await fetch('https://abstract-api-xyz.onrender.com/api/send-notice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, status })
      });
      const data = await response.json();
      if (data.success) setMessage('Notice sent successfully!');
      else setMessage('Failed to send notice.');
    } catch (err) {
      setMessage('Error connecting to server.');
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '400px', margin: 'auto' }}>
      <h1>Send Notice to Author</h1>
      <input type="text" placeholder="Author Name" onChange={e => setName(e.target.value)} style={{width:'100%', marginBottom: '10px', padding: '8px'}} />
      <input type="email" placeholder="Author Email" onChange={e => setEmail(e.target.value)} style={{width:'100%', marginBottom: '10px', padding: '8px'}} />
      <select onChange={e => setStatus(e.target.value)} style={{width:'100%', marginBottom: '20px', padding: '8px'}}>
        <option>Accepted</option>
        <option>Minor Revision</option>
        <option>Rejected</option>
      </select>
      <button onClick={sendEmail} style={{ width: '100%', padding: '10px', background: 'blue', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Send Email Notice
      </button>
      {message && <p style={{ marginTop: '20px', color: 'green' }}>{message}</p>}
    </div>
  );
}

export default App;
