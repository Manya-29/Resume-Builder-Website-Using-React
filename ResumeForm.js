import React, { useState } from 'react';
import '../styles/ResumeForm.css';

function ResumeForm({ onSubmit, initialData }) {
//   const [form, setForm] = useState(
//     initialData || {
//       phone: '',
//       address: '',
//       summary: '',
//       education: [{ degree: '', school: '', year: '' }],
//       experience: [{ position: '', company: '', year: '' }],
//       skills: ''
//     }
//   );

const getDefaultForm = (initialData) => ({
  phone: initialData?.phone || '',
  address: initialData?.address || '',
  summary: initialData?.summary || '',
  education: Array.isArray(initialData?.education) ? initialData.education : [{ degree: '', school: '', year: '' }],
  experience: Array.isArray(initialData?.experience) ? initialData.experience : [{ position: '', company: '', year: '' }],
  skills: initialData?.skills || ''
});

const [form, setForm] = useState(getDefaultForm(initialData || {}));


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // For arrays (education, experience)
  const handleArrChange = (idx, field, val, key) => {
    const newArr = [...form[key]];
    newArr[idx][field] = val;
    setForm({...form, [key]: newArr});
  };

  const addField = (key, obj) => {
    setForm({
      ...form,
      [key]: [...form[key], { ...obj }]
    });
  };

  const removeField = (key, idx) => {
    setForm({
      ...form,
      [key]: form[key].filter((_, i) => i !== idx)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };




  return (
    <div className="resume-form-container">
      <h2>Fill Resume Details</h2>
      <form onSubmit={handleSubmit} className="resume-form">
        <label>Phone:</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <label>Address:</label>
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          required
        />
        <label>Professional Summary:</label>
        <textarea
          name="summary"
          value={form.summary}
          onChange={handleChange}
          required
        />
        {/* Education */}
        <div className="multi-fields">
          <h4>Education:</h4>
          {form.education.map((ed, idx) => (
            <div key={idx} className="multi-field-row">
              <input
                placeholder="Degree"
                value={ed.degree}
                onChange={e =>
                  handleArrChange(idx, 'degree', e.target.value, 'education')
                }
                required
              />
              <input
                placeholder="School"
                value={ed.school}
                onChange={e =>
                  handleArrChange(idx, 'school', e.target.value, 'education')
                }
                required
              />
              <input
                placeholder="Year"
                value={ed.year}
                onChange={e =>
                  handleArrChange(idx, 'year', e.target.value, 'education')
                }
                required
              />
              {form.education.length > 1 && (
                <button type="button" onClick={() => removeField('education', idx)}>Remove</button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => addField('education', { degree: '', school: '', year: '' })}>
            Add Education
          </button>
        </div>
        {/* Experience */}
        <div className="multi-fields">
          <h4>Experience:</h4>
          {form.experience.map((ex, idx) => (
            <div key={idx} className="multi-field-row">
              <input
                placeholder="Position"
                value={ex.position}
                onChange={e =>
                  handleArrChange(idx, 'position', e.target.value, 'experience')
                }
                required
              />
              <input
                placeholder="Company"
                value={ex.company}
                onChange={e =>
                  handleArrChange(idx, 'company', e.target.value, 'experience')
                }
                required
              />
              <input
                placeholder="Year"
                value={ex.year}
                onChange={e =>
                  handleArrChange(idx, 'year', e.target.value, 'experience')
                }
                required
              />
              {form.experience.length > 1 && (
                <button type="button" onClick={() => removeField('experience', idx)}>Remove</button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => addField('experience', { position: '', company: '', year: '' })}>
            Add Experience
          </button>
        </div>
        <label>Skills (comma separated):</label>
        <input
          name="skills"
          value={form.skills}
          onChange={handleChange}
          required
        />
        <button className="submit-btn" type="submit">Generate Resume</button>
      </form>
    </div>
  );
}

export default ResumeForm;
