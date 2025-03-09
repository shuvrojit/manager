import React from 'react';
import styled from 'styled-components';
import { AiFillStar } from 'react-icons/ai';

const Container = styled.div<{ collapsed?: boolean }>`
  display: flex;
  align-items: center;
  padding: ${(props) => (props.collapsed ? '16px 0' : '16px 20px')};
  gap: 12px;
  justify-content: ${(props) => (props.collapsed ? 'center' : 'flex-start')};
`;

const Logo = styled.div`
  width: 24px;
  height: 24px;
  background-color: #8470ff;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  font-size: 16px;
`;

const Title = styled.h1<{ collapsed?: boolean }>`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: white;
  display: ${(props) => (props.collapsed ? 'none' : 'block')};
`;

interface LogoSectionProps {
  title: string;
  collapsed?: boolean;
}

export const LogoSection: React.FC<LogoSectionProps> = ({ title, collapsed = false }) => {
  return (
    <Container collapsed={collapsed}>
      <Logo>
        <AiFillStar size={16} />
      </Logo>
      <Title collapsed={collapsed}>{title}</Title>
    </Container>
  );
};
