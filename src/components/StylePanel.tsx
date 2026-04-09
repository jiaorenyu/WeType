import React, { useState, useEffect } from 'react';
import { Modal, Slider, InputNumber, ColorPicker, Button, Space, Row, Col, Typography } from 'antd';
import { useStore } from '../store';
import { StyleConfig } from '../types';

const { Title } = Typography;

interface StylePanelProps {
  visible: boolean;
  onCancel: () => void;
}

const StylePanel: React.FC<StylePanelProps> = ({ visible, onCancel }) => {
  const { customStyle, setCustomStyle, resetCustomStyle } = useStore();
  const [localStyle, setLocalStyle] = useState<StyleConfig>(customStyle);

  useEffect(() => {
    setLocalStyle(customStyle);
  }, [customStyle]);

  const handleChange = (key: keyof StyleConfig, value: any) => {
    setLocalStyle(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setCustomStyle(localStyle);
    onCancel();
  };

  const handleReset = () => {
    resetCustomStyle();
    onCancel();
  };

  return (
    <Modal
      title="自定义风格"
      open={visible}
      onCancel={onCancel}
      width={800}
      footer={[
        <Button key="reset" onClick={handleReset}>
          重置默认
        </Button>,
        <Button key="cancel" onClick={onCancel}>
          取消
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          保存
        </Button>
      ]}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={4}>基础颜色</Title>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <div style={{ marginBottom: 8 }}>主色调</div>
            <ColorPicker
              value={localStyle.primaryColor}
              onChange={(_, hex) => handleChange('primaryColor', hex)}
            />
          </Col>
          <Col span={8}>
            <div style={{ marginBottom: 8 }}>正文颜色</div>
            <ColorPicker
              value={localStyle.textColor}
              onChange={(_, hex) => handleChange('textColor', hex)}
            />
          </Col>
          <Col span={8}>
            <div style={{ marginBottom: 8 }}>背景颜色</div>
            <ColorPicker
              value={localStyle.bgColor}
              onChange={(_, hex) => handleChange('bgColor', hex)}
            />
          </Col>
        </Row>

        <Title level={4}>字体设置</Title>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <div style={{ marginBottom: 8 }}>正文字号: {localStyle.baseFontSize}px</div>
            <Slider
              min={13}
              max={18}
              value={localStyle.baseFontSize}
              onChange={(value) => handleChange('baseFontSize', value)}
            />
            <InputNumber
              min={13}
              max={18}
              value={localStyle.baseFontSize}
              onChange={(value) => handleChange('baseFontSize', value || 15)}
              style={{ marginTop: 8, width: '100%' }}
            />
          </Col>
          <Col span={8}>
            <div style={{ marginBottom: 8 }}>H2 字号: {localStyle.h2FontSize}px</div>
            <Slider
              min={20}
              max={30}
              value={localStyle.h2FontSize}
              onChange={(value) => handleChange('h2FontSize', value)}
            />
            <InputNumber
              min={20}
              max={30}
              value={localStyle.h2FontSize}
              onChange={(value) => handleChange('h2FontSize', value || 24)}
              style={{ marginTop: 8, width: '100%' }}
            />
          </Col>
          <Col span={8}>
            <div style={{ marginBottom: 8 }}>H3 字号: {localStyle.h3FontSize}px</div>
            <Slider
              min={18}
              max={26}
              value={localStyle.h3FontSize}
              onChange={(value) => handleChange('h3FontSize', value)}
            />
            <InputNumber
              min={18}
              max={26}
              value={localStyle.h3FontSize}
              onChange={(value) => handleChange('h3FontSize', value || 20)}
              style={{ marginTop: 8, width: '100%' }}
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={8}>
            <div style={{ marginBottom: 8 }}>行距: {localStyle.lineHeight}</div>
            <Slider
              min={1.4}
              max={2.0}
              step={0.1}
              value={localStyle.lineHeight}
              onChange={(value) => handleChange('lineHeight', value)}
            />
          </Col>
          <Col span={8}>
            <div style={{ marginBottom: 8 }}>段落间距: {localStyle.paragraphMargin}px</div>
            <Slider
              min={10}
              max={25}
              value={localStyle.paragraphMargin}
              onChange={(value) => handleChange('paragraphMargin', value)}
            />
            <InputNumber
              min={10}
              max={25}
              value={localStyle.paragraphMargin}
              onChange={(value) => handleChange('paragraphMargin', value || 16)}
              style={{ marginTop: 8, width: '100%' }}
            />
          </Col>
        </Row>

        <Title level={4}>引用块样式</Title>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <div style={{ marginBottom: 8 }}>边框颜色</div>
            <ColorPicker
              value={localStyle.quoteBorderColor}
              onChange={(_, hex) => handleChange('quoteBorderColor', hex)}
            />
          </Col>
          <Col span={8}>
            <div style={{ marginBottom: 8 }}>背景颜色</div>
            <ColorPicker
              value={localStyle.quoteBgColor}
              onChange={(_, hex) => handleChange('quoteBgColor', hex)}
            />
          </Col>
          <Col span={8}>
            <div style={{ marginBottom: 8 }}>圆角: {localStyle.quoteBorderRadius}px</div>
            <Slider
              min={0}
              max={12}
              value={localStyle.quoteBorderRadius}
              onChange={(value) => handleChange('quoteBorderRadius', value)}
            />
            <InputNumber
              min={0}
              max={12}
              value={localStyle.quoteBorderRadius}
              onChange={(value) => handleChange('quoteBorderRadius', value || 4)}
              style={{ marginTop: 8, width: '100%' }}
            />
          </Col>
        </Row>

        <Title level={4}>代码块样式</Title>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <div style={{ marginBottom: 8 }}>背景颜色</div>
            <ColorPicker
              value={localStyle.codeBgColor}
              onChange={(_, hex) => handleChange('codeBgColor', hex)}
            />
          </Col>
          <Col span={12}>
            <div style={{ marginBottom: 8 }}>圆角: {localStyle.codeBorderRadius}px</div>
            <Slider
              min={0}
              max={12}
              value={localStyle.codeBorderRadius}
              onChange={(value) => handleChange('codeBorderRadius', value)}
            />
            <InputNumber
              min={0}
              max={12}
              value={localStyle.codeBorderRadius}
              onChange={(value) => handleChange('codeBorderRadius', value || 4)}
              style={{ marginTop: 8, width: '100%' }}
            />
          </Col>
        </Row>
      </Space>
    </Modal>
  );
};

export default StylePanel;