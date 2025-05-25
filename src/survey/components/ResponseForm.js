'use client';

import React, { useEffect } from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
  background-color: #e8f5e9;
  min-height: 100vh;
  padding: 40px 0;
  font-family: 'SUIT', sans-serif;
`;

const FormWrapper = styled.form`
  border-radius: 12px;
  max-width: 640px;
  margin: 0 auto;
  padding: 32px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const QuestionBox = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
`;

const QuestionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 12px;
`;

const LimitHint = styled.span`
  font-size: 13px;
  font-weight: 400;
  color: #777;
`;

const TextInput = styled.input`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
`;

const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
`;

const SubmitButton = styled.button`
  width: 100%;
  background: #00c853;
  color: white;
  padding: 14px 0;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  margin-top: 16px;

  &:hover {
    background: #00b44a;
  }
`;

export default function ResponseForm({
  questions,
  answers,
  onChange,
  onSubmit,
}) {
  useEffect(() => {
    console.log('Debug questions:', questions);
  }, [questions]);

  const getAnswer = (questionId) =>
    answers.find((a) => a.questionId === questionId)?.response || '';

  const isSelected = (questionId, option) => {
    const res = getAnswer(questionId);
    return Array.isArray(res) && res.includes(option);
  };

  const handleMultiChange = (questionId, option) => {
    const res = getAnswer(questionId);
    const selected = Array.isArray(res) ? [...res] : [];
    const index = selected.indexOf(option);
    if (index === -1) {
      selected.push(option);
    } else {
      selected.splice(index, 1);
    }
    onChange(questionId, selected);
  };

  const countSelected = (questionId) => {
    const res = getAnswer(questionId);
    return Array.isArray(res) ? res.length : 0;
  };

  return (
    <PageWrapper>
      <FormWrapper
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        {questions.map((q, idx) => (
          <QuestionBox key={q.id}>
            <QuestionTitle>
              <span>
                {idx + 1}. {q.content}
              </span>
              {q.allowMultiple && q.multipleLimit && (
                <LimitHint>최대 {q.multipleLimit}개 선택 가능</LimitHint>
              )}
            </QuestionTitle>

            {q.type === 'SHORT_TEXT' && (
              <TextInput
                type="text"
                value={getAnswer(q.id)}
                onChange={(e) => onChange(q.id, e.target.value)}
                placeholder="답변을 입력하세요"
              />
            )}

            {q.type === 'MULTIPLE_CHOICE' && (
              <OptionList>
                {q.options.map((opt, optIdx) => {
                  const selectedCount = countSelected(q.id);
                  const disabled =
                    q.allowMultiple &&
                    q.multipleLimit != null &&
                    !isSelected(q.id, opt) &&
                    selectedCount >= q.multipleLimit;

                  return (
                    <OptionLabel key={optIdx}>
                      {q.allowMultiple ? (
                        <input
                          type="checkbox"
                          name={`question-${q.id}`}
                          value={opt}
                          checked={isSelected(q.id, opt)}
                          disabled={disabled}
                          onChange={() => handleMultiChange(q.id, opt)}
                        />
                      ) : (
                        <input
                          type="radio"
                          name={`question-${q.id}`}
                          value={opt}
                          checked={getAnswer(q.id) === opt}
                          onChange={() => onChange(q.id, opt)}
                        />
                      )}
                      {opt}
                    </OptionLabel>
                  );
                })}
              </OptionList>
            )}
          </QuestionBox>
        ))}

        <SubmitButton type="submit">제출</SubmitButton>
      </FormWrapper>
    </PageWrapper>
  );
}
