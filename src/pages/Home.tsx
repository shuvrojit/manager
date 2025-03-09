import styled from 'styled-components';
import { Activity, Users, Briefcase, TrendingUp } from 'lucide-react';
import { StatsCard } from '../components/dashboard/StatsCard';
import { ProjectStatusChart } from '../components/dashboard/ProjectStatusChart';
import { BudgetChart } from '../components/dashboard/BudgetChart';
import { projects } from '../data/projects';

const DashboardGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  padding: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ChartGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  padding: 0 1.5rem 1.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: #1e293b;
  margin: 1.5rem;
`;

const calculateStats = () => {
  const activeProjects = projects.filter((p) => p.status === 'active').length;
  const totalBudget = projects.reduce((sum, p) => sum + (p.budget || 0), 0);
  const avgProgress = Math.round(
    projects.reduce((sum, p) => sum + p.progress, 0) / projects.length
  );
  const highPriorityProjects = projects.filter((p) => p.priority === 'high').length;

  return {
    activeProjects,
    totalBudget,
    avgProgress,
    highPriorityProjects,
  };
};

export function HomePage() {
  const stats = calculateStats();

  return (
    <div>
      <Title>Project Dashboard</Title>

      <DashboardGrid>
        <StatsCard
          title="Active Projects"
          value={stats.activeProjects}
          icon={Activity}
          trend={15}
          color="#10b981"
        />
        <StatsCard title="Total Teams" value="5" icon={Users} color="#6366f1" />
        <StatsCard
          title="Total Budget"
          value={`$${stats.totalBudget.toLocaleString()}`}
          icon={Briefcase}
          trend={8}
          color="#f59e0b"
        />
        <StatsCard
          title="Avg. Progress"
          value={`${stats.avgProgress}%`}
          icon={TrendingUp}
          trend={5}
          color="#ef4444"
        />
      </DashboardGrid>

      <ChartGrid>
        <ProjectStatusChart projects={projects} />
        <BudgetChart projects={projects} />
      </ChartGrid>

      {/* Recent Activity Section */}
      <div style={{ padding: '0 1.5rem 1.5rem' }}>
        <div
          style={{
            background: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
          }}
        >
          <h3 style={{ color: '#1e293b', fontSize: '1.125rem', margin: '0 0 1rem' }}>
            Recent Projects
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {projects
              .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
              .slice(0, 5)
              .map((project) => (
                <div
                  key={project.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    background: '#f8fafc',
                  }}
                >
                  <div
                    style={{
                      width: '0.5rem',
                      height: '0.5rem',
                      borderRadius: '50%',
                      background:
                        project.status === 'active'
                          ? '#10b981'
                          : project.status === 'completed'
                            ? '#6366f1'
                            : '#f59e0b',
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: 0, color: '#1e293b', fontSize: '0.875rem' }}>
                      {project.name}
                    </h4>
                    <p style={{ margin: '0.25rem 0 0', color: '#64748b', fontSize: '0.75rem' }}>
                      Started on {new Date(project.startDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div
                    style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      background: project.priority === 'high' ? '#fee2e2' : '#f1f5f9',
                      color: project.priority === 'high' ? '#ef4444' : '#64748b',
                    }}
                  >
                    {project.priority}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
