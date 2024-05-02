import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { supabase } from '../Database/supabaseClient';

interface Props {}

export const Navbar = memo((props: Props) => {
  const { t, i18n } = useTranslation();
  const [token, setToken] = React.useState('');

  React.useEffect(() => {
    const fetchToken = async () => {
      const authToken = await supabase.auth.getSession();
      setToken(authToken?.data?.session?.access_token || '');
    };

    fetchToken();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    sessionStorage.clear();
    localStorage.clear();
    // navigate('/login');
  };

  return (
    <StyledNavbar>
      <div className="left">
        <h1>{t('My Shopping Store')}</h1>
      </div>
      <div className="right">
        <nav>
          <ul>
            <li>
              <a href="/">{t('Home')}</a>
            </li>
            <li>
              <a href="/create">{t('Create Item')}</a>
            </li>
            <li>
              {token ? (
                <a href="/login" onClick={handleLogout}>
                  {t('Logout')}
                </a>
              ) : (
                <a href="/login">{t('Login')}</a>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </StyledNavbar>
  );
});

const StyledNavbar = styled.div`
  background-color: #054ead;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left h1 {
    margin: 0;
    font-size: 1.5rem;
    text-align: center;
  }

  nav ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    text-align: center;
  }

  nav ul li {
    display: inline;
    margin: 0 10px;
  }

  nav ul li a {
    color: white;
    text-decoration: none;
    font-weight: bold;
  }

  nav ul li a:hover {
    text-decoration: underline;
  }
`;
