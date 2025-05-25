'use client';

import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
  background-color: #ddf5ddc0; 
  min-height: 100vh;
  padding: 40px 0;
  font-family: 'SUIT', sans-serif;
`;


const Wrapper = styled.section`
  max-width: 700px;
  margin: 0 auto;
  background: #fff;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
`;

const QuestionCard = styled.div`
  margin-bottom: 32px;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
`;

const QuestionTitle = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: #212121;
  margin-bottom: 16px;
`;

const AnswerList = styled.ul`
  padding-left: 20px;
  list-style: disc;
`;

const StatLabel = styled.div`
  font-size: 14px;
  margin-bottom: 4px;
  color: #555;
`;

const StatBar = styled.div`
  height: 10px;
  background: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
`;

const StatFill = styled.div`
  height: 100%;
  background: #00c853;
  width: ${(props) => props.percent}%;
  transition: width 0.4s ease;
`;

const SurveyResultViewer = ({ survey }) => {
  if (!survey) return null;

  return (
    <PageWrapper>
      <Wrapper>
        <Title>📊 {survey.title} - 결과</Title>

        {survey.questions.map((q, idx) => (
          <QuestionCard key={idx}>
            <QuestionTitle>
              {idx + 1}. {q.content}
            </QuestionTitle>

            {q.type === 'MULTIPLE_CHOICE' &&
              Object.entries(q.optionStats).map(([opt, count], i) => {
                const total = Object.values(q.optionStats).reduce((a, b) => a + b, 0);
                const percent = total > 0 ? (count / total) * 100 : 0;

                return (
                  <div key={i} style={{ marginBottom: '16px' }}>
                    <StatLabel>
                      {opt} - {count}명
                    </StatLabel>
                    <StatBar>
                      <StatFill percent={percent} />
                    </StatBar>
                  </div>
                );
              })}

            {q.type === 'SHORT_TEXT' && (
              <AnswerList>
                {q.shortAnswers.map((ans, i) => (
                  <li key={i}>- {ans}</li>
                ))}
              </AnswerList>
            )}
          </QuestionCard>
        ))}
      </Wrapper>
    </PageWrapper>
  );
};

export default SurveyResultViewer;
