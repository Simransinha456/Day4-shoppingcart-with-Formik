/**
 *
 * Database
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';

interface Props {}

export const Database = memo((props: Props) => {
  const { t, i18n } = useTranslation();

  return <Div>{t('')}</Div>;
});

const Div = styled.div``;
