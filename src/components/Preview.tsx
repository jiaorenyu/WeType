import React from 'react';
import { getThemeByName } from '../themes';

interface PreviewProps {
  html: string;
  themeName: string;
  isTransitioning: boolean;
}

const Preview: React.FC<PreviewProps> = ({ html, themeName, isTransitioning }) => {
  const theme = getThemeByName(themeName);

  return (
    <div className="phone-frame">
      <div className="phone-notch"></div>
      <div
        className="preview-content"
        style={{
          opacity: isTransitioning ? 0 : 1,
          transition: 'opacity 0.2s ease-in-out'
        }}
      >
        <style dangerouslySetInnerHTML={{ __html: theme.css }} />
        <div className="article-content" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
};

export default Preview;
