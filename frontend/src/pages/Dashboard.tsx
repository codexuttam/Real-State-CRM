import { useState, useEffect } from 'react';
import { Users, Briefcase, TrendingUp, DollarSign, Loader2, PieChart as PieIcon, BarChart as BarIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import api from '../services/api';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#a855f7', '#06b6d4'];

const StatCard = ({ icon, label, value, trend, color }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass glass-card"
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
      <div style={{ padding: '0.8rem', background: `${color || 'var(--primary)'}15`, borderRadius: '12px', color: color || 'var(--primary)' }}>
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
  const [reportData, setReportData] = useState<any>(null);
  const [leadStats, setLeadStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [salesRes, leadRes] = await Promise.all([
          api.get('/reports/sales'),
          api.get('/reports/leads')
        ]);
        setReportData(salesRes.data);
        setLeadStats(leadRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
        <Loader2 className="animate-spin" size={48} color="var(--primary)" />
        <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Calculating metrics...</p>
      </div>
    );
  }

  const stats = [
    { label: 'Total Leads', value: leadStats?.totalLeads || 0, icon: <Users size={24} />, trend: '+12%', color: '#6366f1' },
    { label: 'Conversion Rate', value: leadStats?.conversionRate || '0%', icon: <TrendingUp size={24} />, trend: '+2%', color: '#10b981' },
    { label: 'Active Deals', value: reportData?.summary?.dealCount || 0, icon: <Briefcase size={24} />, trend: '+8%', color: '#f59e0b' },
    { label: 'Total Revenue', value: `$${(reportData?.summary?.totalRevenue || 0).toLocaleString()}`, icon: <DollarSign size={24} />, trend: '+24%', color: '#ef4444' },
  ];

  const agentData = Object.entries(reportData?.agentPerformance || {}).map(([name, data]: any) => ({
    name,
    revenue: data.revenue,
    deals: data.deals
  }));

  const pieData = leadStats?.statusCounts?.map((status: any) => ({
    name: status.status,
    value: status._count
  }));

  return (
    <div style={{ padding: '2rem' }}>
      <header style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Dashboard Overview</h1>
        <p style={{ color: 'var(--text-muted)' }}>Real-time performance metrics</p>
      </header>

      <div className="dashboard-grid">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div className="glass glass-card" style={{ minHeight: '450px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <BarIcon size={20} color="var(--primary)" />
            <h3 style={{ margin: 0 }}>Agent Performance (Revenue)</h3>
          </div>
          <div style={{ height: '320px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={agentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val / 1000}k`} />
                <Tooltip 
                  contentStyle={{ background: 'rgba(20,20,20,0.9)', border: '1px solid var(--glass-border)', borderRadius: '10px' }}
                  itemStyle={{ color: 'white' }}
                />
                <Bar dataKey="revenue" fill="var(--primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="glass glass-card" style={{ minHeight: '450px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <PieIcon size={20} color="var(--secondary)" />
            <h3 style={{ margin: 0 }}>Lead Status Distribution</h3>
          </div>
          <div style={{ height: '320px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData?.map((_: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ background: 'rgba(20,20,20,0.9)', border: '1px solid var(--glass-border)', borderRadius: '10px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
            {pieData?.map((entry: any, index: number) => (
              <div key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: COLORS[index % COLORS.length] }} />
                <span>{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
