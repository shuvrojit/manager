import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import { useState } from 'react';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  background-color: #ffffff;
  position: relative;
`;

const ContentContainer = styled.div<{ sidebarCollapsed: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: ${({ sidebarCollapsed }) => (sidebarCollapsed ? '80px' : '280px')};
  transition: margin-left 0.3s ease;
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem;
  background-color: #ffffff;
`;

const Footer = styled.footer`
  padding: 1rem;
  text-align: center;
  color: #666;
  font-size: 0.875rem;
  border-top: 1px solid #eee;
`;

export function MainLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <LayoutContainer>
      <Sidebar onCollapse={(collapsed: boolean) => setSidebarCollapsed(collapsed)} />
      <ContentContainer sidebarCollapsed={sidebarCollapsed}>
        <Main>
          <Outlet />
        </Main>
        <Footer>
          <p>&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
        </Footer>
      </ContentContainer>
    </LayoutContainer>
  );
}
