import React from 'react';
import styled from 'styled-components';
import { BsThreeDots } from 'react-icons/bs';

const ProfileContainer = styled.div<{ collapsed?: boolean }>`
  display: flex;
  align-items: center;
  padding: ${(props) => (props.collapsed ? '16px 0' : '16px 20px')};
  justify-content: ${(props) => (props.collapsed ? 'center' : 'flex-start')};
  border-top: 1px solid #2a2a2a;
`;

const Avatar = styled.div<{ url: string }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-position: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 10px;
    height: 10px;
    background-color: #10b981;
    border: 2px solid #1e1e1e;
    border-radius: 50%;
  }
`;

const UserInfo = styled.div<{ collapsed?: boolean }>`
  margin-left: 12px;
  flex: 1;
  display: ${(props) => (props.collapsed ? 'none' : 'block')};
`;

const Tooltip = styled.div`
  position: absolute;
  left: 100%;
  margin-left: 10px;
  background: #2a2a2a;
  padding: 10px;
  border-radius: 6px;
  white-space: nowrap;
  pointer-events: none;
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

const TooltipName = styled.div`
  color: white;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
`;

const TooltipEmail = styled.div`
  color: #a7a7a7;
  font-size: 12px;
`;

const UserName = styled.div`
  color: white;
  font-size: 14px;
  font-weight: 500;
`;

const UserEmail = styled.div`
  color: #a7a7a7;
  font-size: 12px;
`;

const MoreButton = styled.button`
  background: none;
  border: none;
  color: #a7a7a7;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
`;

interface UserProfileProps {
  name: string;
  email: string;
  avatarUrl: string;
  collapsed?: boolean;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  name,
  email,
  avatarUrl,
  collapsed = false,
}) => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <ProfileContainer
      collapsed={collapsed}
      onMouseEnter={() => collapsed && setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <Avatar url={avatarUrl} />
      <UserInfo collapsed={collapsed}>
        <UserName>{name}</UserName>
        <UserEmail>{email}</UserEmail>
      </UserInfo>
      {!collapsed && (
        <MoreButton>
          <BsThreeDots size={16} />
        </MoreButton>
      )}
      {collapsed && showTooltip && (
        <Tooltip>
          <TooltipName>{name}</TooltipName>
          <TooltipEmail>{email}</TooltipEmail>
        </Tooltip>
      )}
    </ProfileContainer>
  );
};
