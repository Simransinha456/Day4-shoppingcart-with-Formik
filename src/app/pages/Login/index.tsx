import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { Formik, Form, Field } from 'formik';
import { LoginValidation } from './LoginValidation';
import { useTranslation } from 'react-i18next';

interface Props {}

export const Login = memo((props: Props) => {
  const { t, i18n } = useTranslation();

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  return (
    <StyledDiv>
      <h2>{t('Login Form')}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginValidation}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          alert(JSON.stringify(values, null, 2));
          resetForm();
        }}
      >
        {({ errors }) => (
          <StyledForm>
            <StyledLabel htmlFor="name">{t('Name')}</StyledLabel>
            <StyledField type="text" name="name" />
            {errors.name && <StyledError>{errors.name}</StyledError>}
            <StyledLabel htmlFor="email">{t('Email')}</StyledLabel>
            <StyledField type="email" name="email" />
            {errors.email && <StyledError>{errors.email}</StyledError>}
            <StyledLabel htmlFor="password">{t('Password')}</StyledLabel>
            <StyledField type="password" name="password" />
            {errors.password && <StyledError>{errors.password}</StyledError>}
            <StyledButton type="submit">{t('Login')}</StyledButton>
            Don't have an account? <a href="/signup">Sign Up</a>
          </StyledForm>
        )}
      </Formik>
    </StyledDiv>
  );
});

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Avenir, sans-serif;
  background-color: #f0f0f0;
  height: 91vh;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledLabel = styled.label`
  margin-bottom: 10px;
  font-size: 1.2em;
  margin-bottom: -10px;
`;

const StyledField = styled(Field)`
  width: 400px;
  padding: 15px;
  margin: 8px;
  border-radius: 10px;
  border: 1px solid #ccc;
`;

const StyledError = styled.small`
  color: red;
  margin-top: -5px;
`;

const StyledButton = styled.button`
  width: 400px;
  padding: 15px;
  margin-top: 20px;
  border-radius: 10px;
  border: none;
  background-color: #1a4a8a;
  color: white;
  cursor: pointer;
  font-size: 1em;

  &:hover {
    background-color: #1a202c;
  }
`;
