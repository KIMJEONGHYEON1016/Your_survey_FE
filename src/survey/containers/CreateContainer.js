'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import SurveyForm from '@/survey/components/SurveyForm';
import SurveyResultBox from '@/survey/components/SurveyResultBox';
import { createSurvey } from '@/survey/apis/apisurvey';

const Wrapper = styled.section`
  max-width: 700px;
  margin: 0 auto;
  padding: 32px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 32px;
`;

const CreateContainer = () => {
  const [form, setForm] = useState({
    title: '',
    questions: [{ content: '', type: 'SHORT_TEXT', options: [] }],
  });

  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    try {
      const res = await createSurvey(form);
      setResult(res);
    } catch (err) {
      alert('설문 생성 실패');
    }
  };

  return (
    <Wrapper>

      {!result && (
        <SurveyForm form={form} setForm={setForm} onSubmit={handleSubmit} />
      )}

      {result && (
        <SurveyResultBox
          responseUrl={result.responseUrl}
          ownerUrl={result.ownerUrl}
        />
      )}
    </Wrapper>
  );
};

export default React.memo(CreateContainer);
