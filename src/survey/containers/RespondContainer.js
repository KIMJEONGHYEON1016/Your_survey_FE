'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getSurveyByToken, submitSurveyAnswer } from '@/survey/apis/apisurvey';
import ResponseForm from '@/survey/components/ResponseForm';

const Wrapper = styled.section`
  max-width: 700px;
  margin: 0 auto;
  padding: 32px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 32px;
`;

const RespondContainer = ({ token }) => {
  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false); // ✅ 제출 상태 관리

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const result = await getSurveyByToken(token);
        setSurvey(result);
        setAnswers(result.questions.map((q) => ({ questionId: q.id, response: '' })));
      } catch (err) {
        alert('설문 정보를 불러올 수 없습니다.');
      }
    };

    fetchSurvey();
  }, [token]);

  const handleChange = (questionId, value) => {
    setAnswers((prev) =>
      prev.map((a) => (a.questionId === questionId ? { ...a, response: value } : a))
    );
  };

  const handleSubmit = async () => {
    try {
      await submitSurveyAnswer(token, { answers });
      alert('응답이 저장되었습니다.');
    } catch (err) {
      alert('응답 제출 실패');
    }
  };

  if (!survey) return <div></div>;

  return (
    <Wrapper>
      {!isSubmitted && <Title>{survey.title}</Title>}

      <ResponseForm
        questions={survey.questions}
        answers={answers}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onSubmitted={() => setIsSubmitted(true)} // ✅ 제출 완료 콜백
      />
    </Wrapper>
  );
};

export default RespondContainer;
