/**
 * Clean pasted content from Word/HTML
 * Removes redundant styles while preserving semantic structure
 */
export const cleanPastedContent = (html: string): string => {
  // Simple HTML cleaning - remove all tags and keep text
  const clean = html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return clean;
};

/**
 * Convert HTML to plain text
 */
export const htmlToPlainText = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const body = doc.body;
  
  // Convert block elements to newlines
  const blockElements = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI', 'BLOCKQUOTE', 'PRE'];
  
  blockElements.forEach(tag => {
    const elements = body.getElementsByTagName(tag);
    Array.from(elements).forEach(el => {
      el.insertAdjacentText('afterbegin', '\n');
      el.insertAdjacentText('beforeend', '\n');
    });
  });
  
  // Get text content
  let text = body.textContent || '';
  
  // Clean up whitespace
  text = text
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+/g, ' ')
    .trim();
  
  return text;
};

/**
 * Strip all HTML tags
 */
export const stripHtml = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

/**
 * Preserve only semantic structure
 */
export const preserveSemanticStructure = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const body = doc.body;
  
  // Map of tags to preserve
  const preserveTags = new Set([
    'P', 'BR', 'STRONG', 'B', 'EM', 'I', 'U', 'S',
    'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
    'UL', 'OL', 'LI',
    'BLOCKQUOTE', 'PRE', 'CODE',
    'A', 'SPAN',
  ]);
  
  // Recursively clean element
  const cleanElement = (element: Element): void => {
    const children = Array.from(element.childNodes);
    
    children.forEach(child => {
      if (child.nodeType === Node.ELEMENT_NODE) {
        const el = child as Element;
        
        if (!preserveTags.has(el.tagName)) {
          // Keep text content, remove the element
          while (el.firstChild) {
            el.parentNode?.insertBefore(el.firstChild, el);
          }
          el.parentNode?.removeChild(el);
        } else {
          // Clean attributes
          if (el.attributes) {
            Array.from(el.attributes).forEach(attr => {
              el.removeAttribute(attr.name);
            });
          }
          // Recurse
          cleanElement(el);
        }
      }
    });
  };
  
  cleanElement(body);
  
  return body.innerHTML;
};
