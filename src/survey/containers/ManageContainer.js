'use client';

import React, { useEffect, useState } from 'react';
import { getSurveyResult } from '@/survey/apis/apisurvey';
import SurveyResultViewer from '@/survey/components/SurveyResultViewer';

const ManageContainer = ({ token }) => {
  const [survey, setSurvey] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const result = await getSurveyResult(token);
        setSurvey(result);
      } catch (err) {
        alert('설문 결과를 불러올 수 없습니다.');
      }
    };

    fetchResult();
  }, [token]);

  if (!survey) return <div></div>;

  return <SurveyResultViewer survey={survey} />;
};

export default ManageContainer;
