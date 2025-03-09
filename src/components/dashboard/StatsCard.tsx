import styled from 'styled-components';
import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  color?: string;
}

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Title = styled.h3`
  color: #64748b;
  font-size: 0.875rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Value = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-top: 0.5rem;
`;

const Trend = styled.span<{ isPositive: boolean }>`
  font-size: 0.875rem;
  color: ${({ isPositive }) => (isPositive ? '#10b981' : '#ef4444')};
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const IconWrapper = styled.div<{ color: string }>`
  width: 2rem;
  height: 2rem;
  border-radius: 8px;
  background: ${({ color }) => `${color}15`};
  color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function StatsCard({ title, value, icon: Icon, trend, color = '#6366f1' }: StatsCardProps) {
  return (
    <Card>
      <Title>
        <IconWrapper color={color}>
          <Icon className="w-5 h-5" />
        </IconWrapper>
        {title}
      </Title>
      <Value>{value}</Value>
      {trend !== undefined && (
        <Trend isPositive={trend > 0}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </Trend>
      )}
    </Card>
  );
}
