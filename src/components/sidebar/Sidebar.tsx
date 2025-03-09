import React, { useState } from 'react';
import { AiOutlineLeft } from 'react-icons/ai';
import styled from 'styled-components';
import { LogoSection } from './LogoSection';
import { NavLinks } from './NavLinks';
import { UserProfile } from './UserProfile';

const SidebarContainer = styled.aside<{ collapsed: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.collapsed ? '80px' : '280px')};
  height: 100vh;
  background-color: #1e1e1e;
  color: #a7a7a7;
  font-family: 'Inter', sans-serif;
  overflow: hidden;
  transition: width 0.3s ease;
  z-index: 50;
`;

const ToggleButton = styled.button<{ collapsed: boolean }>`
  position: absolute;
  right: -12px;
  top: 20px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #2a2a2a;
  border: 2px solid #1e1e1e;
  color: #a7a7a7;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  padding: 0;
  transform: ${(props) => (props.collapsed ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.3s ease;

  &:hover {
    background: #3a3a3a;
  }
`;

const NavSection = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

interface SidebarProps {
  onCollapse: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onCollapse }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = (value: boolean) => {
    setCollapsed(value);
    onCollapse(value);
  };

  return (
    <SidebarContainer collapsed={collapsed}>
      <ToggleButton collapsed={collapsed} onClick={() => handleCollapse(!collapsed)}>
        <AiOutlineLeft size={16} />
      </ToggleButton>
      <LogoSection title="Untitled" collapsed={collapsed} />
      <NavSection>
        <NavLinks collapsed={collapsed} />
      </NavSection>
      <UserProfile
        name="Brooklyn Simmons"
        email="brooklyn@simmons.com"
        avatarUrl="https://i.pravatar.cc/40"
        collapsed={collapsed}
      />
    </SidebarContainer>
  );
};

export default Sidebar;
