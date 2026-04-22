import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Briefcase, TrendingUp, DollarSign, Loader2, BarChart as BarIcon, Zap, ArrowRight, Star, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import api from '../services/api';
import { Lead } from '../types/lead';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#a855f7', '#06b6d4'];

const StatCard = ({ icon, label, value, subValue, color }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass glass-card"
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
      <div style={{ padding: '0.8rem', background: `${color || 'var(--primary)'}15`, borderRadius: '12px', color: color || 'var(--primary)' }}>
        {icon}
      </div>
      {subValue && (
        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
          {subValue}
        </span>
      )}
    </div>
    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{label}</p>
    <h2 style={{ fontSize: '1.8rem', marginTop: '0.5rem' }}>{value}</h2>
  </motion.div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [reportData, setReportData] = useState<any>(null);
  const [leadStats, setLeadStats] = useState<any>(null);
  const [recentInsights, setRecentInsights] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    // Auto-refresh every 60 seconds
    const interval = setInterval(fetchDashboardData, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [salesRes, statsRes, leadsRes] = await Promise.all([
        api.get('/reports/sales'),
        api.get('/reports/leads'),
        api.get('/leads?take=5&orderBy=recent')
      ]);
      setReportData(salesRes.data);
      setLeadStats(statsRes.data);
      setRecentInsights(leadsRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
        <Loader2 className="animate-spin" size={48} color="var(--primary)" />
        <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Syncing with AI Agent...</p>
      </div>
    );
  }

  const stats = [
    { label: 'Total Leads', value: leadStats?.totalLeads || 0, icon: <Users size={24} />, color: '#6366f1' },
    { label: 'Closed Revenue', value: `$${(reportData?.summary?.totalRevenue || 0).toLocaleString()}`, icon: <DollarSign size={24} />, subValue: 'Collected Cash', color: '#10b981' },
    { label: 'Pipeline Value', value: `$${(reportData?.summary?.pipelineValue || 0).toLocaleString()}`, icon: <Briefcase size={24} />, subValue: 'Expected Sales', color: '#f59e0b' },
    { label: 'Conv. Rate', value: leadStats?.conversionRate || '0%', icon: <TrendingUp size={24} />, color: '#ef4444' },
  ];


  const agentData = Object.entries(reportData?.agentPerformance || {}).map(([name, data]: any) => ({
    name,
    revenue: data.revenue,
    pipeline: data.pipeline
  }));

  const pieData = leadStats?.statusCounts?.map((status: any) => ({
    name: status.status,
    value: status._count
  }));

  return (
    <div style={{ padding: '2rem' }}>
      <header style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>AI Agent Command Center</h1>
          <p style={{ color: 'var(--text-muted)' }}>Real-time intelligence and pipeline analytics</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button 
            onClick={() => { setIsLoading(true); fetchDashboardData(); }}
            className="btn" 
            style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', color: 'white' }}
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
            Sync AI
          </button>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', background: 'rgba(16, 185, 129, 0.1)', padding: '0.5rem 1rem', borderRadius: '30px', color: '#10b981', fontSize: '0.8rem' }}>
            <div className="pulse" style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%' }} />
            Live Connection Active
          </div>
        </div>
      </header>

      <div className="dashboard-grid">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        {/* Main Charts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Performance Chart */}
          <div className="glass glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              <BarIcon size={20} color="var(--primary)" />
              <h3 style={{ margin: 0 }}>Agent Performance: Closed vs. Pipeline</h3>
            </div>
            <div style={{ height: '300px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={agentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val / 1000}k`} />
                  <Tooltip 
                    contentStyle={{ background: 'rgba(20,20,20,0.9)', border: '1px solid var(--glass-border)', borderRadius: '10px' }}
                    itemStyle={{ color: 'white' }}
                  />
                  <Legend />
                  <Bar dataKey="revenue" name="Closed Revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="pipeline" name="Expected (Pipeline)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {/* Status Pie */}
            <div className="glass glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>Lead Status</h3>
              <div style={{ height: '200px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {pieData?.map((_: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: 'rgba(20,20,20,0.9)', border: 'none', borderRadius: '10px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Hot Leads Summary */}
            <div className="glass glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <Star size={18} color="#f59e0b" />
                <h3 style={{ fontSize: '1rem', margin: 0 }}>Top Prospects</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {recentInsights.filter(l => (l.aiScore || 0) > 80).slice(0, 3).map(lead => (
                  <div key={lead.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{lead.name}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Budget: ${lead.budget?.toLocaleString()}</div>
                    </div>
                    <div style={{ padding: '0.2rem 0.6rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '10px', fontSize: '0.8rem' }}>
                      {lead.aiScore}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI Smart Feed */}
        <div className="glass glass-card" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', maxHeight: '700px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <Zap size={20} color="#10b981" />
            <h3 style={{ margin: 0 }}>Smart Insights Feed</h3>
          </div>
          
          <div style={{ overflowY: 'auto', flex: 1, paddingRight: '0.5rem' }}>
            {recentInsights.map((lead) => (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                key={lead.id} 
                style={{ padding: '1rem 0', borderBottom: '1px solid var(--glass-border)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{lead.name}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{lead.source}</span>
                </div>
                {lead.aiSummary ? (
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4', margin: '0 0 0.5rem 0' }}>
                    ✨ {lead.aiSummary}
                  </p>
                ) : (
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>Waiting for AI enrichment...</p>
                )}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <div style={{ width: '40px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                      <div style={{ width: `${lead.aiScore}%`, height: '100%', background: '#10b981', borderRadius: '2px' }} />
                    </div>
                    <span style={{ fontSize: '0.7rem' }}>{lead.aiScore}%</span>
                  </div>
                  <button 
                    onClick={() => navigate('/leads')}
                    style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                  >
                    View Deal <ArrowRight size={12} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
