import DashboardCard from './DashboardCard';
import './CardGrid.css';

export default function CardGrid({ dashboards }) {
  return (
    <section className="grid">
      {dashboards.map((dashboard, index) => (
        <DashboardCard
          key={dashboard.id}
          title={dashboard.title}
          description={dashboard.description}
          url={dashboard.url}
          index={index}
        />
      ))}
    </section>
  );
}
