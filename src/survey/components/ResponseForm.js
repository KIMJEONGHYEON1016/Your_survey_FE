'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdCheckBoxOutlineBlank, MdOutlineCheckBox } from 'react-icons/md';
import Link from 'next/link';

const PageWrapper = styled.div`
  background-color: rgb(255, 255, 255);
  padding: 40px 0;
  font-family: 'SUIT', sans-serif;
  border-radius: 8px;
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.1),
    0 8px 24px rgba(0, 0, 0, 0.15);
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
  cursor: pointer;
  color: #333;
`;

const HiddenInput = styled.input`
  display: none;
`;

const IconWrapper = styled.span`
  font-size: 20px;
  display: flex;
  align-items: center;
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

const MessageBox = styled.div`
  text-align: center;
  padding: 64px 20px;
  font-size: 20px;
  font-weight: 600;
  color: #2e7d32;
`;

const LinkButton = styled.a`
  display: inline-block;
  margin-top: 24px;
  background: #00c853;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 16px;
  text-decoration: none;

  &:hover {
    background: #00b44a;
  }
`;

export default function ResponseForm({
  questions,
  answers,
  onChange,
  onSubmit,
  onSubmitted, // ✅ 콜백 추가
}) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    console.log('Debug questions:', questions);
  }, [questions]);

  const getAnswer = (questionId) =>
    answers.find((a) => a.questionId === questionId)?.response || '';

  const isSelected = (questionId, option) => {
    const res = getAnswer(questionId);
    return Array.isArray(res) ? res.includes(option) : res === option;
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

  const handleSubmit = () => {
    onSubmit(); // 응답 저장
    onSubmitted?.(); // ✅ 상위 컨테이너에 제출 완료 알림
    setIsSubmitted(true); // 내부 메시지용 상태
  };

  return (
    <PageWrapper>
      {isSubmitted ? (
        <FormWrapper>
          <MessageBox>
            응답해주셔서 감사합니다!
            <br />
            <Link href="/" passHref legacyBehavior>
              <LinkButton>설문지 생성하기</LinkButton>
            </Link>
          </MessageBox>
        </FormWrapper>
      ) : (
        <FormWrapper
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
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
                    const selected = isSelected(q.id, opt);
                    const disabled =
                      q.allowMultiple &&
                      q.multipleLimit != null &&
                      !selected &&
                      selectedCount >= q.multipleLimit;

                    return (
                      <OptionLabel key={optIdx}>
                        <HiddenInput
                          type={q.allowMultiple ? 'checkbox' : 'radio'}
                          name={`question-${q.id}`}
                          value={opt}
                          checked={selected}
                          disabled={disabled}
                          onChange={() =>
                            q.allowMultiple
                              ? handleMultiChange(q.id, opt)
                              : onChange(q.id, opt)
                          }
                        />
                        <IconWrapper>
                          {selected ? (
                            <MdOutlineCheckBox />
                          ) : (
                            <MdCheckBoxOutlineBlank />
                          )}
                        </IconWrapper>
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
      )}
    </PageWrapper>
  );
}
