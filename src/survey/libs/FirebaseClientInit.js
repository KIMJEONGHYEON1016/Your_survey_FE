'use client'; // ✅ 브라우저에서만 실행

import { useEffect } from 'react';
import '../../../firebase'; // ✅ firebase.js에서 initializeApp만 실행하면 됨

export default function FirebaseClientInit() {
  useEffect(() => {
    console.log('📊 Firebase Analytics initialized in client.');
  }, []);
  
  return null;
}
