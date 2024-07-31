/* eslint-disable perfectionist/sort-imports */
import { useEffect } from 'react';
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';

export default function App() {

  useEffect(() => {
    fetch('http://192.168.110.136:3001/api/patients')
      .then((res) => {
        console.log('Список пациентов загружен', res.headers);
      })
      .catch((err) => {
        alert('Ошибка при загрузке пациентов:', err);
      })
  })

  useScrollToTop();

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
