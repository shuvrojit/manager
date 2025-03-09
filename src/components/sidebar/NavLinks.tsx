import React from 'react';
import styled from 'styled-components';
import { NavItem, NavItemProps } from './NavItem';
import { AiOutlineHome } from 'react-icons/ai';
import { GoProject } from 'react-icons/go';
import { IoSettingsOutline } from 'react-icons/io5';

const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

interface NavLinksProps {
  collapsed?: boolean;
}

export const NavLinks: React.FC<NavLinksProps> = ({ collapsed = false }) => {
  const navItems: NavItemProps[] = [
    {
      icon: <AiOutlineHome size={20} />,
      label: 'Home',
      to: '/',
    },
    {
      icon: <GoProject size={20} />,
      label: 'Projects',
      to: '/projects',
    },
    {
      icon: <IoSettingsOutline size={20} />,
      label: 'Settings',
      to: '/settings',
    },
  ];

  return (
    <NavContainer>
      {navItems.map((item) => (
        <NavItem
          key={item.label}
          icon={item.icon}
          label={item.label}
          to={item.to}
          collapsed={collapsed}
        />
      ))}
    </NavContainer>
  );
};
