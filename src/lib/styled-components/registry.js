'use client';

import React, { useMemo } from 'react';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { useServerInsertedHTML } from 'next/navigation';

export default function StyledComponentsRegistry({ children }) {
  const [sheet] = useMemo(() => {
    const sheet = new ServerStyleSheet();
    return [sheet];
  }, []);

  useServerInsertedHTML(() => {
    const styles = sheet.getStyleElement();
    return <>{styles}</>;
  });

  return (
    <StyleSheetManager sheet={sheet.instance}>
      {children}
    </StyleSheetManager>
  );
}
