import React from 'react';
import '../styles/TemplateSelector.css';

const templates = [
  {
    id: 'simple',
    name: 'Simple',
    preview: '📝'
  },
  {
    id: 'modern',
    name: 'Modern',
    preview: '📑'
  }
];

function TemplateSelector({ onSelect }) {
  return (
    <div className="template-selector">
      <h2>Select a Resume Template</h2>
      <div className="templates">
        {templates.map(tpl => (
          <div
            key={tpl.id}
            className="template-card"
            onClick={() => onSelect(tpl.id)}
          >
            <div className="preview">{tpl.preview}</div>
            <div className="name">{tpl.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TemplateSelector;
