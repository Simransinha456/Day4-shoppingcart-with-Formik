import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '../Database/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../Navbar/Loadable';

interface Props {
  getShopping: () => Promise<void>;
}

export const Create: React.FC<Props> = ({ getShopping }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const authToken = await supabase.auth.getSession();
      const token = authToken?.data?.session?.access_token;

      const dataToCreate = {
        name: name,
        image: imageUrl,
      };

      const response = await fetch(
        'https://fflcmvlwyzivjsgqxlzw.supabase.co/functions/v1/createitem',
        {
          headers: {
            accept: '*/*',
            'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
            apikey:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmbGNtdmx3eXppdmpzZ3F4bHp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQzODQzMzQsImV4cCI6MjAyOTk2MDMzNH0.HVHh7QM0w57rLTzDayn1ktEss_wrSi1ruOuhBxxSdQM', // Replace with your Supabase API key
            authorization: `Bearer ${token}`,
            // "priority": "u=1, i",
            'sec-ch-ua':
              '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'cross-site',
            'x-client-info': 'supabase-js-web/2.43.0',
          },
          referrer: 'http://localhost:3000/',
          referrerPolicy: 'strict-origin-when-cross-origin',
          body: JSON.stringify(dataToCreate),
          method: 'POST',
          mode: 'cors',
          credentials: 'omit',
        },
      );

      const data = await response.json();
      console.log(data);

      await getShopping();
      navigate('/'); // navigate to home page after creating data
    } catch (error) {
      console.error('Error creating data:', error);
    }
  };

  return (
    <StyledWrapper>
      <Navbar />
      <StyledHeading>Create item</StyledHeading>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          type="text"
          placeholder="Item name"
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <StyledInput
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={event => setImageUrl(event.target.value)}
        />
        <StyledButton type="submit">Submit</StyledButton>
      </StyledForm>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  background-color: #f0f0f0;
  height: 91vh;
  overflow: hidden;
`;

const StyledForm = styled.form`
  text-align: center;
`;

const StyledHeading = styled.h1`
  text-align: center;
  margin-top: 80px;
`;

const StyledInput = styled.input`
  display: block;
  margin: 0 auto 25px;
  padding: 20px;
  width: 40ch;
  border-radius: 10px;
  border: 1px solid #ccc;
`;

const StyledButton = styled.button`
  display: block;
  margin: 20px auto 0;
  padding: 15px 20px;
  border: none;
  border-radius: 10px;
  background-color: #054ead;
  font-size: 1rem;
  color: white;
  cursor: pointer;
  width: 15ch;

  &:hover {
    background-color: #1a202c;
  }
`;
