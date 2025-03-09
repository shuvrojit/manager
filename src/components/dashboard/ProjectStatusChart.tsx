import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import styled from 'styled-components';
import { Project } from '../../data/types';

interface StatusData {
  name: string;
  value: number;
  color: string;
}

const ChartContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  height: 300px;
`;

const Title = styled.h3`
  color: #1e293b;
  font-size: 1.125rem;
  margin: 0 0 1rem;
`;

const Legend = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;
`;

const LegendColor = styled.div<{ color: string }>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 2px;
  background: ${({ color }) => color};
`;

const STATUS_COLORS = {
  active: '#10b981',
  completed: '#6366f1',
  'on-hold': '#f59e0b',
  cancelled: '#ef4444',
};

export function ProjectStatusChart({ projects }: { projects: Project[] }) {
  const data: StatusData[] = Object.entries(
    projects.reduce<Record<string, number>>((acc, project) => {
      acc[project.status] = (acc[project.status] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({
    name,
    value: value as number,
    color: STATUS_COLORS[name as keyof typeof STATUS_COLORS],
  }));

  return (
    <ChartContainer>
      <Title>Project Status Distribution</Title>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [`${value} Projects`, 'Count']}
            contentStyle={{
              backgroundColor: 'white',
              border: 'none',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              borderRadius: '8px',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <Legend>
        {data.map((item) => (
          <LegendItem key={item.name}>
            <LegendColor color={item.color} />
            {item.name.charAt(0).toUpperCase() + item.name.slice(1)} ({item.value})
          </LegendItem>
        ))}
      </Legend>
    </ChartContainer>
  );
}
