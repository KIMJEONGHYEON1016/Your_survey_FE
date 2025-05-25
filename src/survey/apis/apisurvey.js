import requestData from '@/survey/libs/requestData';

export const createSurvey = (data) => requestData('/api/survey', 'POST', data);

// 설문 정보 불러오기
export const getSurveyByToken = (token) =>
  requestData(`/api/survey/respond/${token}`);

// 설문 응답 제출
export const submitSurveyAnswer = (token, data) =>
  requestData(`/api/survey/respond/${token}`, 'POST', data);

export const getSurveyResult = (ownerToken) =>
  requestData(`/api/survey/manage/${ownerToken}`);
