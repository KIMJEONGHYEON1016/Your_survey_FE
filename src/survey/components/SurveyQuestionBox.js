'use client';

import styled from 'styled-components';

const QuestionBox = styled.div`
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
`;

const QuestionTitle = styled.div`
  font-weight: 700;         
  font-size: 18px;           
  color: #212121;           
  line-height: 1.5;          
  margin-bottom: 12px;      
`;


const SurveyQuestionBox = ({ number, content, children }) => {
  return (
    <QuestionBox>
      <QuestionTitle>{number}. {content}</QuestionTitle>
      {children}
    </QuestionBox>
  );
};

export default SurveyQuestionBox;
