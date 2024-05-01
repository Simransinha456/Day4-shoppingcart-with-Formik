import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { Formik, Form, Field } from 'formik';
import { SignupValidation } from './SignupValidation';
import { useTranslation } from 'react-i18next';
import { supabase } from '../Database/supabaseClient';

interface Props {}

export const Signup = memo((props: Props) => {
  const { t, i18n } = useTranslation();

  const initialValues = {
    name: '',
    email: '',
    password: '',
    cpassword: '',
  };

  const handleSubmit = async (values, { resetForm }) => {
    // console.log(values);
    alert(JSON.stringify(values, null, 2));
    resetForm();

    //supabase-------
    try {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: 'http://localhost:3000/login',
        },
      });
      console.log(data);
      if (error) {
        alert(error.message);
      } else {
        alert('success! check email for verification link');
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <StyledDiv>
      <h2>{t('Form Handling and Validation using Formik and Yup')}</h2>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={SignupValidation}
          onSubmit={handleSubmit}
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
              <StyledLabel htmlFor="cpassword">
                {t('Confirm Password')}
              </StyledLabel>
              <StyledField type="password" name="cpassword" />
              {errors.cpassword && (
                <StyledError>{errors.cpassword}</StyledError>
              )}
              <StyledButton type="submit">{t('Sign Up')}</StyledButton>
              Already have an account? <a href="/login">Login</a>
            </StyledForm>
          )}
        </Formik>
      </div>
    </StyledDiv>
  );
});

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: system-ui;
  background-color: #f0f0f0;
  height: 100vh;
  overflow: hidden;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;

const StyledLabel = styled.label`
  margin-bottom: 10px;
  font-size: 1.2em;
  margin-bottom: -5px;
`;

const StyledField = styled(Field)`
  width: 400px;
  padding: 10px;
  margin: 5px 0 20px;
  border-radius: 10px;
  border: 1px solid #ccc;
`;

const StyledError = styled.small`
  color: red;
  margin-top: -20px;
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
  font-size: 1rem;

  &:hover {
    background-color: #1a202c;
  }
`;
