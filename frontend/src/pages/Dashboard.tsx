import { Users, Building2, Briefcase, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ icon, label, value, trend }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass glass-card"
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
      <div style={{ padding: '0.8rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', color: 'var(--primary)' }}>
        {icon}
      </div>
      <span style={{ color: 'var(--success)', fontSize: '0.8rem', display: 'flex', alignItems: 'center' }}>
        <TrendingUp size={14} style={{ marginRight: '4px' }} />
        {trend}
      </span>
    </div>
    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{label}</p>
    <h2 style={{ fontSize: '1.8rem', marginTop: '0.5rem' }}>{value}</h2>
  </motion.div>
);

const Dashboard = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <header style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Dashboard Overview</h1>
        <p style={{ color: 'var(--text-muted)' }}>Real-time performance metrics</p>
      </header>

      <div className="dashboard-grid">
        <StatCard icon={<Users size={24} />} label="Total Leads" value="128" trend="+12%" />
        <StatCard icon={<Building2 size={24} />} label="Active Properties" value="45" trend="+5%" />
        <StatCard icon={<Briefcase size={24} />} label="Deals In Pipeline" value="€2.4M" trend="+24%" />
        <StatCard icon={<Users size={24} />} label="Conversion Rate" value="18.5%" trend="+2%" />
      </div>

      <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div className="glass glass-card" style={{ height: '400px' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Revenue Trends</h3>
          <div style={{ height: '300px', display: 'flex', alignItems: 'flex-end', gap: '1rem', paddingBottom: '1rem' }}>
            {/* Simple Bar Chart Placeholder */}
            {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
              <div key={i} style={{ flex: 1, background: 'linear-gradient(to top, var(--primary), var(--secondary))', height: `${h}%`, borderRadius: '6px 6px 0 0', opacity: 0.8 }} />
            ))}
          </div>
        </div>
        <div className="glass glass-card">
          <h3 style={{ marginBottom: '1.5rem' }}>Recent Activities</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ display: 'flex', gap: '1rem', padding: '0.8rem', background: 'rgba(255,255,255,0.02)', borderRadius: '10px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', marginTop: '6px' }} />
                <div>
                  <p style={{ fontSize: '0.9rem' }}>Lead "John Doe" updated to <b>Qualified</b></p>
                  <small style={{ color: 'var(--text-muted)' }}>2 hours ago</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
