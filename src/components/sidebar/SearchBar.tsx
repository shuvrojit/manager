import React from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div<{ collapsed?: boolean }>`
  position: relative;
  margin-bottom: 20px;
  display: flex;
  justify-content: ${(props) => (props.collapsed ? 'center' : 'flex-start')};
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  padding: 12px;
  color: #a7a7a7;
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #2a2a2a;
  }
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
  color: white;
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

const SearchInput = styled.input<{ collapsed?: boolean }>`
  display: ${(props) => (props.collapsed ? 'none' : 'block')};
  width: 100%;
  background-color: #2a2a2a;
  border: none;
  border-radius: 6px;
  padding: 12px 12px 12px 40px;
  color: white;
  font-size: 14px;

  &::placeholder {
    color: #a7a7a7;
  }

  &:focus {
    outline: none;
    background-color: #333333;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #a7a7a7;
`;

interface SearchBarProps {
  collapsed?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ collapsed = false }) => {
  const [showTooltip, setShowTooltip] = React.useState(false);
  return (
    <SearchContainer collapsed={collapsed}>
      {collapsed ? (
        <SearchButton
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
              stroke="#A7A7A7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {showTooltip && <Tooltip>Search</Tooltip>}
        </SearchButton>
      ) : (
        <>
          <SearchIcon>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                stroke="#A7A7A7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </SearchIcon>
          <SearchInput collapsed={collapsed} placeholder="Search" />
        </>
      )}
    </SearchContainer>
  );
};
