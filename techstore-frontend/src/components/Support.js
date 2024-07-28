import React, { useState } from 'react';
import axios from 'axios';

function Support() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/support', { message });
      setResponse(res.data.message);
    } catch (error) {
      setResponse('Failed to send message');
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Support</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea
            id="message"
            className="form-control"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        {response && <div className="alert alert-info">{response}</div>}
        <button type="submit" className="btn btn-primary">Send</button>
      </form>
    </div>
  );
}

export default Support;
