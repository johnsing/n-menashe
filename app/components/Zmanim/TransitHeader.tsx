// components/TransitHeader.tsx
'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { FiMapPin, FiSearch } from 'react-icons/fi';

interface TransitHeaderProps {
  holiday: string;
  locationName: string;
  isTomorrow: boolean;
  onLocationSubmit: (cityName: string) => void;
  onUseGeo: () => void;
}

const HeaderContainer = styled.header`
  border-bottom: 1px solid var(--border, #e5e7eb);
  padding-bottom: 1.5rem;
  margin-bottom: 2rem;
`;

const TopRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const TitleGroup = styled.div``;

const LiveBadgeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PulseDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #9333ea;
`;

const SubtitleText = styled.span`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #9333ea;
  font-weight: 600;
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--fg, #1a1a1a);
  margin: 4px 0 0 0;
`;

const Description = styled.p`
  font-size: 0.875rem;
  color: var(--muted, #6b7280);
  margin: 4px 0 0 0;
`;

const ControlsGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  @media (min-width: 768px) {
    align-items: flex-end;
  }
`;

const LocationBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
  font-weight: 500;
  background: var(--surface, #f3f4f6);
  border: 1px solid var(--border, #e5e7eb);
  padding: 8px 14px;
  border-radius: 12px;
  color: var(--muted, #4b5563);
`;

const ChangeButton = styled.button`
  background: none;
  border: none;
  color: #9333ea;
  font-weight: 600;
  cursor: pointer;
  margin-left: 8px;
  &:hover { text-decoration: underline; }
`;

const GpsButton = styled.button`
  background: none;
  border: none;
  color: var(--muted, #9ca3af);
  font-size: 0.75rem;
  text-decoration: underline;
  cursor: pointer;
  margin-left: 4px;
  &:hover { color: #9333ea; }
`;

const SearchForm = styled.form`
  display: flex;
  gap: 8px;
`;

const SearchInput = styled.input`
  font-size: 0.75rem;
  padding: 6px 12px;
  border: 1px solid var(--border, #d1d5db);
  border-radius: 8px;
  background: var(--bg, #ffffff);
  color: var(--fg, #1a1a1a);
  &:focus { outline: 2px solid #9333ea; }
`;

const SearchSubmitBtn = styled.button`
  background: #9333ea;
  color: #ffffff;
  font-size: 0.75rem;
  padding: 6px 12px;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  &:hover { background: #7e22ce; }
`;

const HolidayBanner = styled.div`
  margin-top: 1rem;
  padding: 12px 16px;
  background: rgba(147, 51, 234, 0.08);
  border: 1px solid rgba(147, 51, 234, 0.2);
  border-radius: 12px;
  color: #7e22ce;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export default function TransitHeader({ 
  holiday, 
  locationName, 
  isTomorrow, 
  onLocationSubmit, 
  onUseGeo 
}: TransitHeaderProps) {
  const [inputVal, setInputVal] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      onLocationSubmit(inputVal.trim());
      setInputVal('');
      setIsSearching(false);
    }
  };

  return (
    <HeaderContainer>
      <TopRow>
        <TitleGroup>
          <LiveBadgeWrapper>
            <PulseDot />
            <SubtitleText>
              {isTomorrow ? "Tomorrow's Timetable" : "Live Timetable"}
            </SubtitleText>
          </LiveBadgeWrapper>
          <Title>Zmanim Train Line</Title>
          <Description>
            {isTomorrow ? "Schedule for tomorrow's halachic day." : "Chronological transit schedule for today's halachic day."}
          </Description>
        </TitleGroup>

        <ControlsGroup>
          <LocationBadge>
            <FiMapPin style={{ color: '#9333ea', fontSize: '16px' }} />
            <span>Location: <strong style={{ color: 'var(--fg)' }}>{locationName}</strong></span>
            <ChangeButton type="button" onClick={() => setIsSearching(!isSearching)}>
              {isSearching ? 'Cancel' : 'Change'}
            </ChangeButton>
            <GpsButton type="button" onClick={onUseGeo} title="Use GPS Location">
              GPS
            </GpsButton>
          </LocationBadge>

          {isSearching && (
            <SearchForm onSubmit={handleSubmit}>
              <SearchInput
                type="text"
                placeholder="Enter city (e.g., Jerusalem)"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
              />
              <SearchSubmitBtn type="submit">
                <FiSearch /> Go
              </SearchSubmitBtn>
            </SearchForm>
          )}
        </ControlsGroup>
      </TopRow>
      
      {holiday && (
        <HolidayBanner>
          <span>🌟</span>
          <span>{holiday}</span>
        </HolidayBanner>
      )}
    </HeaderContainer>
  );
}