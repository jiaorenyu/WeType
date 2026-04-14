import React from 'react';

interface PreviewProps {
  html: string;
  themeName: string;
  isTransitioning: boolean;
}

const Preview: React.FC<PreviewProps> = ({ html, isTransitioning }) => {
  return (
    <div className="preview-container">
      <div className="phone-frame">
        <div className="phone-notch"></div>
        <div
          className="preview-content"
          style={{
            opacity: isTransitioning ? 0 : 1,
            transition: 'opacity 0.2s ease-in-out'
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </div>
  );
};

export default Preview;
