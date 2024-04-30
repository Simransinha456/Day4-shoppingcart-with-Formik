import React, { useState } from 'react';
import styled from 'styled-components';
import { supabase } from '../Database/supabaseClient'; // Remove .ts extension
import { useNavigate } from 'react-router-dom';

interface Props {}

export const Create: React.FC<Props> = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Insert data into supabase
    const { data, error } = await supabase
      .from('shoppingcart')
      .insert([{ name, image: imageUrl }]);

    if (error) {
      console.error('Error inserting:', error);
    } else {
      console.log('Inserted:', data);
      navigate('/');
    }
  };

  return (
    <StyledWrapper>
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
