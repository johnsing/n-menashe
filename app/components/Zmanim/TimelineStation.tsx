// components/TimelineStation.tsx
'use client';

import React from 'react';
import styled from 'styled-components';
import { FiRss } from 'react-icons/fi';

interface TimelineStationProps {
  label: string;
  time: string;
  status: 'past' | 'approaching' | 'future';
  countdownText?: string;
  isTomorrow?: boolean;
  icon?: React.ReactNode;
}

const StationCard = styled.div<{ $status: string }>`
  background: ${props => props.$status === 'approaching' ? '#f0fdf4' : 'var(--surface, #f3f4f6)'};
  border: 1px solid ${props => props.$status === 'approaching' ? '#86efac' : 'var(--border, #e5e7eb)'};
  border-radius: 16px;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;

  &:hover {
    background: var(--surface-hover, #e5e7eb);
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const IconWrapper = styled.div<{ $status: string }>`
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => {
    if (props.$status === 'approaching') return '#16a34a';
    if (props.$status === 'past') return '#dc2626';
    return '#9333ea';
  }};
`;

const LabelText = styled.h2`
  font-family: serif;
  font-style: italic;
  font-size: 1rem;
  font-weight: 400;
  color: var(--fg, #1a1a1a);
  letter-spacing: 0.02em;
  margin: 0;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: monospace;
`;

const CountdownSpan = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: #16a34a;
  margin-right: 4px;
`;

const TomorrowSpan = styled.span`
  font-size: 0.65rem;
  color: #9333ea;
  text-transform: uppercase;
  font-weight: 600;
  margin-right: 4px;
`;

const TimeText = styled.span<{ $status: string }>`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${props => {
    if (props.$status === 'approaching') return '#16a34a';
    if (props.$status === 'past') return '#dc2626';
    return 'var(--fg, #1a1a1a)';
  }};
`;

export default function TimelineStation({ label, time, status, countdownText, isTomorrow, icon }: TimelineStationProps) {
  return (
    <StationCard $status={status}>
      <LeftSection>
        <IconWrapper $status={status}>{icon}</IconWrapper>
        <LabelText>{label}</LabelText>
      </LeftSection>

      <RightSection>
        {status === 'approaching' && countdownText && (
          <CountdownSpan>({countdownText})</CountdownSpan>
        )}
        {isTomorrow && status !== 'approaching' && (
          <TomorrowSpan>(Tomorrow)</TomorrowSpan>
        )}
        <FiRss style={{ color: '#9ca3af', fontSize: '14px', transform: 'rotate(90deg)' }} />
        <TimeText $status={status}>{time}</TimeText>
      </RightSection>
    </StationCard>
  );
}