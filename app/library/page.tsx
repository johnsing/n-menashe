// components/PageHeader.tsx
'use client';

import React from 'react';
import styled from 'styled-components';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const HeaderContainer = styled.header`
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--fg, #1a1a1a);
  margin: 0 0 0.5rem 0;
`;

const Subtitle = styled.p`
  color: var(--muted, #6b7280);
  margin: 0;
  font-size: 0.95rem;
`;

export default function PageHeader({ title, subtitle, children }: PageHeaderProps) {
  return (
    <HeaderContainer className="page-header">
      <Title>{title}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      {children}
    </HeaderContainer>
  );
}