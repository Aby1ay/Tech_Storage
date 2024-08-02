import React, { useState } from 'react';
import axios from 'axios';
import './Support.css';


function Support() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('general');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting support request:', { name, email, subject, message }); // Отладка
    try {
      const res = await axios.post('http://localhost:5000/api/support', {
        name,
        email,
        message,
        subject,
      });
      console.log('Server response:', res.data); // Отладка
      setResponse(res.data.message);
      clearForm();
    } catch (error) {
      console.error('Error sending message:', error.message); // Отладка
      setResponse('Failed to send message. Please try again later.');
    }
  };

  const clearForm = () => {
    setName('');
    setEmail('');
    setMessage('');
    setSubject('general');
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="support-button" onClick={toggleModal}>
  <img src="https://taxi-club24.ru/wp-content/uploads/2022/06/dist-972x1024.png" alt="Support" className="support-icon" />
</button>


      {isOpen && (
        <div className="support-modal">
          <div className={`support-modal-content ${isOpen ? 'show' : ''}`}>
            <span className="close-button" onClick={toggleModal}>
              &times;
            </span>
            <h2 className="text-center mb-4">Поддержка</h2>
            <form onSubmit={handleSubmit} className="support-form">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">ФИО</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="subject" className="form-label">Тема</label>
                <select
                  id="subject"
                  className="form-select"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  <option value="general">Общий запрос</option>
                  <option value="technical">Техническая проблема</option>
                  <option value="billing">Вопрос о выставлении счета</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Сообщение</label>
                <textarea
                  id="message"
                  className="form-control"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              {response && (
                <div
                  className={`alert ${
                    response.startsWith('Failed') ? 'alert-danger' : 'alert-success'
                  }`}
                >
                  {response}
                </div>
              )}
              <button type="submit" className="btn btn-primary">Отправить</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Support;
