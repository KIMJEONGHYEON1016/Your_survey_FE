'use client';

import React from 'react';
import styled from 'styled-components';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { FcBullish } from 'react-icons/fc';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
);

const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 40px 0;
  font-family: 'SUIT', sans-serif;
  background: linear-gradient(
    to bottom,
    #00c73c 0vh,
    #00c73c 13vh,
    #c5e9cd 13vh,
    #dbffe3 100vh
  );
  background-repeat: no-repeat;
  background-size: 100% 100%;
`;

const Wrapper = styled.section`
  max-width: 700px;
  margin: 0 auto;
  background: #fff;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 8px 24px rgba(0, 0, 0, 0.15);
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const QuestionWrapper = styled.div`
  margin-bottom: 48px;
`;

const QuestionTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #222;
`;

const ChartRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const ChartBox = styled.div`
  flex: 1;
  min-width: 300px;
  height: 300px;
`;

const AnswerListBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const AnswerLine = styled.div`
  font-size: 15px;
  color: #444;
  padding-left: 8px;
  border-left: 2px solid #a5d6a7;
`;

const LabelColors = [
  '#a8e6cf', // 민트
  '#b2ebf2', // 밝은 하늘
  '#c5e1a5', // 연녹색
  '#aed581', // 좀 더 진한 연두
  '#80cbc4', // 청록
  '#dcedc1', // 라이트 연두
  '#b3e5fc', // 파스텔 블루
  '#ffccbc', // 부드러운 살구
];

const SurveyResultViewer = ({ survey }) => {
  if (!survey) return null;

  return (
    <PageWrapper>
      <Wrapper>
        <Title>
          <FcBullish size={28} />
          {survey.title} - 결과
        </Title>

        {survey.questions.map((q, idx) => {
          if (q.type === 'MULTIPLE_CHOICE') {
            const labels = Object.keys(q.optionStats);
            const values = Object.values(q.optionStats);
            const backgroundColor = labels.map(
              (_, i) => LabelColors[i % LabelColors.length],
            );

            const barData = {
              labels,
              datasets: [
                {
                  label: '응답 수',
                  data: values,
                  backgroundColor,
                },
              ],
            };

            const doughnutData = {
              labels,
              datasets: [
                {
                  data: values,
                  backgroundColor,
                  borderWidth: 1,
                },
              ],
            };

            return (
              <QuestionWrapper key={idx}>
                <QuestionTitle>Q. {q.content}</QuestionTitle>

                <ChartRow>
                  <ChartBox>
                    <Bar
                      data={barData}
                      options={{
                        indexAxis: 'y',
                        responsive: true,
                        plugins: {
                          legend: { display: false },
                        },
                        scales: {
                          x: {
                            ticks: { precision: 0 },
                            beginAtZero: true,
                          },
                          y: {
                            ticks: { font: { size: 14 } },
                          },
                        },
                      }}
                    />
                  </ChartBox>

                  <ChartBox>
                    <Doughnut
                      data={doughnutData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'bottom',
                            labels: {
                              font: { size: 13 },
                            },
                          },
                        },
                        cutout: '60%',
                      }}
                    />
                  </ChartBox>
                </ChartRow>
              </QuestionWrapper>
            );
          }

          if (q.type === 'SHORT_TEXT') {
            return (
              <QuestionWrapper key={idx}>
                <QuestionTitle>Q. {q.content}</QuestionTitle>
                <AnswerListBox>
                  {q.shortAnswers.map((ans, i) => (
                    <AnswerLine key={i}>{ans}</AnswerLine>
                  ))}
                </AnswerListBox>
              </QuestionWrapper>
            );
          }

          return null;
        })}
      </Wrapper>
    </PageWrapper>
  );
};

export default SurveyResultViewer;
