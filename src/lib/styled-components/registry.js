'use client';

import React, { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

export function StyledComponentsRegistry({ children }) {
  const [sheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    try {
      const styles = sheet.getStyleElement();
      return <>{styles}</>;
    } finally {
      sheet.instance.seal(); // ✅ seal()이 중요: 누수 방지
    }
  });

  return <StyleSheetManager sheet={sheet.instance}>{children}</StyleSheetManager>;
}
