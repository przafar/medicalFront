/* eslint-disable perfectionist/sort-imports */
import { useEffect } from 'react';
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import axios from 'axios';

export default function App() {

  // useEffect(() => {
  //   axios.get('http://192.168.110.136:3001/api/patients', {
  //     headers: {
  //       'Authorization': `Bearer ${localStorage.getItem('token')}`
  //     }
  //   })
  //     .then((res) => {
  //       console.log('Список пациентов загружен', res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log('Ошибка при загрузке пациентов:', err);
  //     })
  // })

  useScrollToTop();

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
