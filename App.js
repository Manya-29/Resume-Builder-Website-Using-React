import React, { useState } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import TemplateSelector from './components/TemplateSelector';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [step, setStep] = useState('login'); // login, template, form, preview
  const [template, setTemplate] = useState(null);
  const [resumeData, setResumeData] = useState({});

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    setStep('template');
  };

  const handleTemplateSelect = (temp) => {
    setTemplate(temp);
    setStep('form');
  };

  const handleFormSubmit = (data) => {
    setResumeData(data);
    setStep('preview');
  };

  const handleEdit = () => {
    setStep('form');
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setStep('login');
    setTemplate(null);
    setResumeData({});
  }
  

  return (
    <div className="app-container">
      {isLoggedIn && <Home user={user} onLogout={handleLogout} />}
      {step === 'login' && <Login onLogin={handleLogin} />}
      {step === 'template' && isLoggedIn && <TemplateSelector onSelect={handleTemplateSelect} />}
      {step === 'form' && template && (
        <ResumeForm onSubmit={handleFormSubmit} initialData={resumeData} />
      )}
      {step === 'preview' && (
        <ResumePreview
          user={user}
          data={resumeData}
          template={template}
          onEdit={() => setStep('form')}
        />
      )}
    </div>
  );
}
export default App;
