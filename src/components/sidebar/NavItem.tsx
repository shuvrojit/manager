import React from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const NavItemContainer = styled.div<{ active?: boolean; collapsed?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${(props) => (props.collapsed ? '0' : '12px')};
  padding: ${(props) => (props.collapsed ? '12px 0' : '12px 14px')};
  justify-content: ${(props) => (props.collapsed ? 'center' : 'flex-start')};
  position: relative;
  border-radius: 6px;
  color: ${(props) => (props.active ? 'white' : '#a7a7a7')};
  background-color: ${(props) => (props.active ? '#2a2a2a' : 'transparent')};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #2a2a2a;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`;

const Label = styled.span<{ collapsed?: boolean }>`
  font-size: 14px;
  font-weight: 500;
  display: ${(props) => (props.collapsed ? 'none' : 'block')};
`;

const Tooltip = styled.div`
  position: absolute;
  left: 100%;
  margin-left: 10px;
  background: #2a2a2a;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
  animation: ${fadeIn} 0.2s ease;
  z-index: 100;

  &::before {
    content: '';
    position: absolute;
    left: -4px;
    top: 50%;
    transform: translateY(-50%);
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    border-right: 4px solid #2a2a2a;
  }
`;

const Badge = styled.div`
  background-color: #8470ff;
  color: white;
  font-size: 12px;
  font-weight: 500;
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: auto;
`;

export interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: string | number;
  collapsed?: boolean;
}

export const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  active = false,
  badge,
  collapsed = false,
}) => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <NavItemContainer
      active={active}
      collapsed={collapsed}
      onMouseEnter={() => collapsed && setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <IconWrapper>{icon}</IconWrapper>
      <Label collapsed={collapsed}>{label}</Label>
      {badge && !collapsed && <Badge>{badge}</Badge>}
      {collapsed && showTooltip && <Tooltip>{label}</Tooltip>}
    </NavItemContainer>
  );
};
