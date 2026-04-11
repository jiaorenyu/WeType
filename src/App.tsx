import { useState, useCallback, useMemo } from 'react';
import { Descendant } from 'slate';
import { AppEditor } from './components/Editor';
import { MobilePreview } from './components/Preview';
import { TemplateSelector } from './components/Templates';
import { Header, Modal, ToastContainer, ContentTypeSuggestion } from './components/common';
import { useClipboard, useToastStore } from './hooks';
import { generateInlineHtml, generateFallbackText } from './utils';
import { templates, exampleArticles, getTemplateById } from './data';
import type { Template, ContentType } from './types';

function App() {
  const [editorContent, setEditorContent] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);
  
  // Use this to force re-render the editor when content changes externally
  const [editorKey, setEditorKey] = useState(0);
  
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showExampleModal, setShowExampleModal] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [contentType, setContentType] = useState<ContentType>('unknown');
  const [confidence, setConfidence] = useState(0);
  const [showSuggestion, setShowSuggestion] = useState(true);

  const { copyToClipboard } = useClipboard();
  const addToast = useToastStore((state) => state.addToast);

  // Get current template for preview
  const currentTemplate = useMemo((): Template | null => {
    if (selectedTemplate) return selectedTemplate;
    if (contentType !== 'unknown' && confidence > 0.3) {
      return getTemplateById(getRecommendedTemplate(contentType)) || null;
    }
    return null;
  }, [selectedTemplate, contentType, confidence]);

  // Handle content change
  const handleContentChange = useCallback((content: Descendant[]) => {
    setEditorContent(content);
  }, []);

  // Handle content type detection
  const handleContentTypeChange = useCallback((type: string, conf: number) => {
    setContentType(type as ContentType);
    setConfidence(conf);
  }, []);

  // Handle template selection
  const handleSelectTemplate = useCallback((template: Template) => {
    setSelectedTemplate(template);
    setShowTemplateModal(false);
    addToast({
      message: `已应用【${template.name}】模板`,
      type: 'success',
      duration: 2000,
    });
  }, [addToast]);

  // Handle copy to clipboard
  const handleCopy = useCallback(async () => {
    setIsCopying(true);
    
    try {
      // Generate inline HTML
      const html = generateInlineHtml(editorContent, currentTemplate);
      
      // Copy to clipboard
      const success = await copyToClipboard(html);
      
      if (success) {
        // Show optional tip
        setTimeout(() => {
          addToast({
            message: '💡 登录后可保存本次排版记录',
            type: 'info',
            duration: 4000,
          });
        }, 3500);
      }
    } catch {
      // Fallback to plain text
      const plainText = generateFallbackText(editorContent);
      const success = await copyToClipboard(plainText);
      
      if (success) {
        addToast({
          message: '已复制纯文本（样式内联失败，请到公众号后台手动调整）',
          type: 'warning',
          duration: 5000,
        });
      }
    } finally {
      setIsCopying(false);
    }
  }, [editorContent, currentTemplate, copyToClipboard, addToast]);

  // Handle example selection
  const handleSelectExample = useCallback((exampleId: string) => {
    const example = exampleArticles.find((e) => e.id === exampleId);
    if (example) {
      setEditorContent(example.content);
      setEditorKey(prev => prev + 1); // Force re-render editor
      setShowExampleModal(false);
      addToast({
        message: `已加载示例：${example.title}`,
        type: 'success',
        duration: 2000,
      });
    }
  }, [addToast]);

  // Apply recommended template
  const handleApplyRecommendation = useCallback(() => {
    if (contentType !== 'unknown') {
      const templateId = getRecommendedTemplate(contentType);
      const template = getTemplateById(templateId);
      if (template) {
        setSelectedTemplate(template);
        addToast({
          message: `已应用【${template.name}】模板`,
          type: 'success',
          duration: 2000,
        });
      }
    }
    setShowSuggestion(false);
  }, [contentType, addToast]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header
        onCopy={handleCopy}
        onOpenTemplates={() => setShowTemplateModal(true)}
        onShowExample={() => setShowExampleModal(true)}
        isCopying={isCopying}
      />

      {/* Main content */}
      <main className="flex-1 flex flex-col lg:flex-row gap-6 p-6 max-w-7xl mx-auto w-full h-[calc(100vh-80px)]">
        {/* Editor area */}
        <div className="flex-1 space-y-4">
          {/* Content type suggestion */}
          {showSuggestion && contentType !== 'unknown' && confidence > 0.2 && (
            <ContentTypeSuggestion
              type={contentType}
              confidence={confidence}
              templateName={currentTemplate?.name || '未选择'}
              onConfirm={handleApplyRecommendation}
              onDismiss={() => setShowSuggestion(false)}
            />
          )}

          {/* Editor */}
          <AppEditor
            key={editorKey}
            initialValue={editorContent}
            onChange={handleContentChange}
            template={currentTemplate}
            onContentTypeChange={handleContentTypeChange}
          />
        </div>

        {/* Preview area */}
        <div className="hidden lg:block flex-shrink-0">
          <MobilePreview
            content={editorContent}
            template={currentTemplate}
          />
        </div>
      </main>

      {/* Template selector modal */}
      <Modal
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        size="lg"
      >
        <TemplateSelector
          templates={templates}
          selectedId={selectedTemplate?.id || null}
          onSelect={handleSelectTemplate}
          onClose={() => setShowTemplateModal(false)}
        />
      </Modal>

      {/* Example selector modal */}
      <Modal
        isOpen={showExampleModal}
        onClose={() => setShowExampleModal(false)}
        title="选择示例文章"
        size="md"
      >
        <div className="space-y-3">
          {exampleArticles.map((example) => (
            <button
              key={example.id}
              onClick={() => handleSelectExample(example.id)}
              className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-lg">
                  {example.category === 'tech' ? '💻' : example.category === 'emotion' ? '💝' : '🌿'}
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{example.title}</h3>
                  <p className="text-sm text-gray-500">
                    {example.category === 'tech' ? '技术教程' : example.category === 'emotion' ? '情感故事' : '生活随笔'}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </Modal>

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
}

// Helper function
const getRecommendedTemplate = (type: ContentType): string => {
  const map: Record<ContentType, string> = {
    tech: 'tech-minimal',
    product: 'business-elegant',
    emotion: 'midnight-radio',
    life: 'literary-clean',
    food: 'food-explore',
    business: 'business-elegant',
    news: 'minimal-bw',
    unknown: 'minimal-bw',
  };
  return map[type] || 'minimal-bw';
};

export default App;
