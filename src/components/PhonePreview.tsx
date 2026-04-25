import React, { useMemo } from 'react';
import { getThemeByName } from '../themes';
import { ThemeType } from '../types';

interface PhonePreviewProps {
  html: string;
  theme: ThemeType;
}

const PhonePreview: React.FC<PhonePreviewProps> = ({ html, theme }) => {
  const themeCss = useMemo(() => getThemeByName(theme).css, [theme]);

  return (
    <div className="phone-frame">
      <div className="phone-screen">
        <style>{themeCss}</style>
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
      <div className="phone-home-indicator" />
    </div>
  );
};

export default PhonePreview;
