'use client';

import React from 'react';
import styled from 'styled-components';
import { FiExternalLink, FiBarChart2 } from 'react-icons/fi';
import { QRCodeCanvas } from 'qrcode.react';

const PageWrapper = styled.div`
  background-color: rgb(255, 255, 255);
  padding: 40px 0;
  font-family: 'SUIT', sans-serif;
  border-radius: 8px;
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.1),
    0 8px 24px rgba(0, 0, 0, 0.15);
`;

const Box = styled.div`
  max-width: 640px;
  margin: 0 auto;
  background: #ffffff;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #2e7d32;
  margin-bottom: 32px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  line-height: 1.4;
`;

const SectionTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-top: 24px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #333;
`;

const LinkRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  word-break: break-word;
`;

const Code = styled.code`
  background: rgba(197, 240, 186, 0.77);
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 15px;
  flex: 1;
  font-family: 'SUIT', monospace;
`;

const CopyBtn = styled.button`
  background: #00c853;
  color: white;
  font-size: 14px;
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: #00b44a;
  }
`;

const QRWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
`;

const SurveyResultBox = ({ responseUrl, ownerUrl }) => {
  const fullUrl = (url) => location.origin + url;

  const copy = (url) => {
    const full = fullUrl(url);

    if (navigator.clipboard && location.protocol === 'https:') {
      navigator.clipboard.writeText(full)
        .then(() => alert('링크가 복사되었습니다!'))
        .catch(() => fallbackCopy(full));
    } else {
      fallbackCopy(full);
    }
  };

  const fallbackCopy = (text) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      const success = document.execCommand('copy');
      alert(success ? '링크가 복사되었습니다!' : '복사에 실패했습니다.');
    } catch {
      alert('복사에 실패했습니다.');
    }
    document.body.removeChild(textarea);
  };

  return (
    <PageWrapper>
      <Box>
        <Title>
          <span role="img" aria-label="success">✅</span>
          설문이 성공적으로 생성되었습니다!
        </Title>

        <SectionTitle><FiExternalLink /> 응답 링크</SectionTitle>
        <LinkRow>
          <Code>{fullUrl(responseUrl)}</Code>
          <CopyBtn onClick={() => copy(responseUrl)}>복사</CopyBtn>
        </LinkRow>
        <QRWrapper>
          <QRCodeCanvas value={fullUrl(responseUrl)} size={120} />
        </QRWrapper>

        <SectionTitle><FiBarChart2 /> 결과 조회 링크</SectionTitle>
        <LinkRow>
          <Code>{fullUrl(ownerUrl)}</Code>
          <CopyBtn onClick={() => copy(ownerUrl)}>복사</CopyBtn>
        </LinkRow>
        <QRWrapper>
          <QRCodeCanvas value={fullUrl(ownerUrl)} size={120} />
        </QRWrapper>
      </Box>
    </PageWrapper>
  );
};

export default SurveyResultBox;
