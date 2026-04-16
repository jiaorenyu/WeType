import React, { useState, useRef, useEffect } from 'react';
import { themes, ThemeType } from '../themes';

interface ThemeSelectorProps {
  value: ThemeType;
  onChange: (theme: ThemeType) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentTheme = themes.find(t => t.name === value);

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (themeName: ThemeType) => {
    onChange(themeName);
    setIsOpen(false);
  };

  return (
    <div className="theme-selector-wrapper" ref={dropdownRef}>
      <button
        className="theme-selector-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div
          className="theme-color-dot"
          style={{ backgroundColor: currentTheme?.preview || '#1A5F7A' }}
        />
        <span className="theme-name">{currentTheme?.displayName}</span>
        <svg
          className={`dropdown-arrow ${isOpen ? 'open' : ''}`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <ul className="theme-dropdown" role="listbox">
          {themes.map((theme) => (
            <li
              key={theme.name}
              className={`theme-option ${value === theme.name ? 'selected' : ''}`}
              onClick={() => handleSelect(theme.name)}
              role="option"
              aria-selected={value === theme.name}
            >
              <div
                className="theme-color-dot"
                style={{ backgroundColor: theme.preview }}
              />
              <span className="theme-name">{theme.displayName}</span>
              {value === theme.name && (
                <svg
                  className="check-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ThemeSelector;
