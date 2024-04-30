// This is all for routing and all. like App.js in react

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from 'styles/global-styles';
import { HomePage } from './pages/HomePage/Loadable';
import { useTranslation } from 'react-i18next';
import { Signup } from './pages/Signup/Loadable';
import { Login } from './pages/Login/Loadable';
import { Create } from './pages/Create/Loadable';
import { Navbar } from './pages/Navbar/Loadable';
import { supabase } from './pages/Database/supabaseClient';
import { useEffect, useState } from 'react';

export function App() {
  const { i18n } = useTranslation();
  const [shopping, setShopping] = useState([]);

  async function getShopping() {
    const { data, error } = await supabase.from('shoppingcart').select();
    // console.log(data)
    if (error) {
      console.error('Error fetching shopping data: ', error);
      return;
    }
    if (data) {
      // console.log(data)
      setShopping(data as never[]);
      // console.log(shopping,"fghjk")
    }
  }
  useEffect(() => {
    getShopping();
  }, []);

  useEffect(() => {
    // console.log(shopping,"all items");
  }, [shopping]);

  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<HomePage getShopping={getShopping} shopping={shopping} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}
