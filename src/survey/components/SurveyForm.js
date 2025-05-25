'use client';

import React from 'react';
import styled from 'styled-components';
import { FiPlus, FiPlusCircle, FiX, FiTrash2 } from 'react-icons/fi';

const PageWrapper = styled.div`
  background-color: #e8f5e9;
  min-height: 100vh;
  padding: 40px 0;
  font-family: 'SUIT', sans-serif;
`;

const SurveyContainer = styled.div`
  border-radius: 12px;
  padding: 32px;
  max-width: 640px;
  margin: 0 auto;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 20px;
  font-weight: bold;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 32px;
`;

const QuestionCardWrapper = styled.div`
  position: relative;
  margin-bottom: 64px;
`;

const QuestionCard = styled.div`
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const FloatingAddButton = styled.button`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -20px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const QuestionNumber = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const QuestionControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Select = styled.select`
  font-size: 13px;
  padding: 4px 8px;
  border-radius: 6px;
  background: #f0f0f0;
  border: 1px solid #ccc;
  height: 32px;
`;

const RemoveQuestionBtn = styled.button`
  background: none;
  border: none;
  color: #f44336;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    color: #d32f2f;
  }
`;

const QuestionInput = styled.input`
  width: 100%;
  padding: 10px 14px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-top: 12px;
`;

const OptionInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

const OptionInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const RemoveOptionBtn = styled.button`
  background: none;
  border: none;
  color: #999;
  font-size: 16px;
  margin-left: 8px;
  cursor: pointer;

  &:hover {
    color: #666;
  }
`;

const AddOptionBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e3f2fd;
  color: #2196f3;
  border: 1px solid #90caf9;
  font-size: 14px;
  padding: 10px;
  margin-top: 12px;
  border-radius: 6px;
  cursor: pointer;
  gap: 6px;

  &:hover {
    background: #bbdefb;
  }
`;

const ExtraControls = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
  gap: 12px;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    background-color: #ccc;
    border-radius: 24px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: 0.3s;
  }

  span::before {
    position: absolute;
    content: '';
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    border-radius: 50%;
    transition: 0.3s;
  }

  input:checked + span {
    background-color: #00c853;
  }

  input:checked + span::before {
    transform: translateX(20px);
  }
`;

const SubmitButton = styled.button`
  background: #00c853;
  color: white;
  padding: 14px 28px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  margin-top: 24px;

  &:hover {
    background: #00b44a;
  }
`;

const SurveyForm = ({ form, setForm, onSubmit }) => {
  const handleTitleChange = (e) => {
    setForm({ ...form, title: e.target.value });
  };

  const handleQuestionChange = (index, key, value) => {
    const updated = [...form.questions];
    updated[index][key] = value;

    if (key === 'type' && value === 'SHORT_TEXT') {
      updated[index].options = [];
      updated[index].allowMultiple = false;
      updated[index].multipleLimit = null;
    }

    setForm({ ...form, questions: updated });
  };

  const handleOptionChange = (qIdx, optIdx, value) => {
    const updated = [...form.questions];
    updated[qIdx].options[optIdx] = value;
    setForm({ ...form, questions: updated });
  };

  const addOption = (qIdx) => {
    const updated = [...form.questions];
    updated[qIdx].options.push('');
    setForm({ ...form, questions: updated });
  };

  const removeOption = (qIdx, optIdx) => {
    const updated = [...form.questions];
    updated[qIdx].options.splice(optIdx, 1);
    setForm({ ...form, questions: updated });
  };

  const addQuestion = () => {
    setForm({
      ...form,
      questions: [
        ...form.questions,
        {
          content: '',
          type: 'SHORT_TEXT',
          options: [],
          allowMultiple: false,
          multipleLimit: null,
        },
      ],
    });
  };

  const removeQuestion = (index) => {
    if (form.questions.length <= 1) {
      alert('질문은 최소 1개 이상이어야 합니다.');
      return;
    }
    const updated = [...form.questions];
    updated.splice(index, 1);
    setForm({ ...form, questions: updated });
  };

  return (
    <PageWrapper>
      <SurveyContainer>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <TitleInput
            type="text"
            placeholder="설문 제목을 입력하세요"
            value={form.title}
            onChange={handleTitleChange}
          />

          {form.questions.map((q, idx) => (
            <QuestionCardWrapper key={idx}>
              <QuestionCard>
                <QuestionHeader>
                  <QuestionNumber>{idx + 1}.</QuestionNumber>
                  <QuestionControls>
                    <Select
                      value={q.type}
                      onChange={(e) =>
                        handleQuestionChange(idx, 'type', e.target.value)
                      }
                    >
                      <option value="SHORT_TEXT">단답형</option>
                      <option value="MULTIPLE_CHOICE">선택형</option>
                    </Select>
                    {form.questions.length > 1 && (
                      <RemoveQuestionBtn
                        type="button"
                        onClick={() => removeQuestion(idx)}
                      >
                        <FiTrash2 />
                      </RemoveQuestionBtn>
                    )}
                  </QuestionControls>
                </QuestionHeader>

                <QuestionInput
                  type="text"
                  placeholder="질문 내용을 입력하세요"
                  value={q.content}
                  onChange={(e) =>
                    handleQuestionChange(idx, 'content', e.target.value)
                  }
                />

                {q.type === 'MULTIPLE_CHOICE' &&
                  q.options.map((opt, optIdx) => (
                    <OptionInputWrapper key={optIdx}>
                      <OptionInput
                        type="text"
                        value={opt}
                        placeholder={`선택지 ${optIdx + 1}`}
                        onChange={(e) =>
                          handleOptionChange(idx, optIdx, e.target.value)
                        }
                      />
                      <RemoveOptionBtn
                        type="button"
                        onClick={() => removeOption(idx, optIdx)}
                      >
                        <FiX />
                      </RemoveOptionBtn>
                    </OptionInputWrapper>
                  ))}

                {q.type === 'MULTIPLE_CHOICE' && (
                  <>
                    <AddOptionBtn type="button" onClick={() => addOption(idx)}>
                      <FiPlusCircle />
                      선택지 추가
                    </AddOptionBtn>

                    <ExtraControls>
                      <span>복수 선택</span>
                      <ToggleSwitch>
                        <input
                          type="checkbox"
                          checked={q.allowMultiple || false}
                          onChange={() =>
                            handleQuestionChange(
                              idx,
                              'allowMultiple',
                              !q.allowMultiple,
                            )
                          }
                        />
                        <span></span>
                      </ToggleSwitch>

                      {q.allowMultiple && (
                        <Select
                          value={q.multipleLimit ?? ''}
                          onChange={(e) =>
                            handleQuestionChange(
                              idx,
                              'multipleLimit',
                              e.target.value === ''
                                ? null
                                : Number(e.target.value),
                            )
                          }
                        >
                          <option value="">제한 없음</option>
                          {q.options.map((_, i) => (
                            <option key={i} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </Select>
                      )}
                    </ExtraControls>
                  </>
                )}
              </QuestionCard>

              {idx === form.questions.length - 1 && (
                <FloatingAddButton
                  type="button"
                  onClick={addQuestion}
                  title="질문 추가"
                >
                  <FiPlus />
                </FloatingAddButton>
              )}
            </QuestionCardWrapper>
          ))}

          <SubmitButton type="submit">설문 생성</SubmitButton>
        </form>
      </SurveyContainer>
    </PageWrapper>
  );
};

export default SurveyForm;
