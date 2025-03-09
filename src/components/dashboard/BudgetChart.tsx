import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
import { Project } from '../../data/types';

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

const formatBudget = (value: number) => {
  return `$${value.toLocaleString()}`;
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: 'white',
          padding: '0.75rem',
          border: 'none',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderRadius: '8px',
        }}
      >
        <p style={{ margin: 0, color: '#1e293b' }}>{payload[0].payload.name}</p>
        <p style={{ margin: '0.5rem 0 0', color: '#6366f1' }}>{formatBudget(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

export function BudgetChart({ projects }: { projects: Project[] }) {
  const data = projects
    .filter((project) => project.budget)
    .map((project) => ({
      name: project.name,
      budget: project.budget,
    }))
    .sort((a, b) => (b.budget || 0) - (a.budget || 0))
    .slice(0, 5); // Show top 5 projects by budget

  return (
    <ChartContainer>
      <Title>Top Project Budgets</Title>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={70}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12 }}
            tickFormatter={formatBudget}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="budget" fill="#818cf8" radius={[4, 4, 0, 0]} maxBarSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
