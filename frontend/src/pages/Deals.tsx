import { MoreHorizontal, Plus } from 'lucide-react';

const KanbanColumn = ({ title, count, deals }: any) => (
  <div style={{ flex: 1, minWidth: '300px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', padding: '0 0.5rem' }}>
      <h3 style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        {title}
        <span style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {count}
        </span>
      </h3>
      <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><Plus size={18} /></button>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {deals.map((deal: any) => (
        <div key={deal.id} className="glass glass-card" style={{ padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
             <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--primary)' }}>{deal.type}</span>
             <MoreHorizontal size={16} style={{ color: 'var(--text-muted)' }} />
          </div>
          <p style={{ fontWeight: 500, fontSize: '0.95rem', marginBottom: '1rem' }}>{deal.title}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '1rem', fontWeight: 600 }}>€{deal.value}</span>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>
               {deal.agent[0]}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Deals = () => {
  const columns = [
    { title: 'Negotiation', count: 3, deals: [
      { id: 1, title: 'Villa Del Mar Sale', value: '1.2M', type: 'Residential', agent: 'JS' },
      { id: 2, title: 'Office Space Rental', value: '12K', type: 'Commercial', agent: 'AK' }
    ]},
    { title: 'Agreement', count: 1, deals: [
      { id: 3, title: 'Penthouse Heights', value: '850K', type: 'Residential', agent: 'JS' }
    ]},
    { title: 'Closed', count: 12, deals: [
      { id: 4, title: 'Old City Loft', value: '320K', type: 'Residential', agent: 'MK' }
    ]}
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem' }}>Deal Pipeline</h1>
          <p style={{ color: 'var(--text-muted)' }}>Track transactions through closing</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={20} />
          New Deal
        </button>
      </header>

      <div style={{ display: 'flex', gap: '2rem', overflowX: 'auto', paddingBottom: '2rem' }}>
        {columns.map(col => <KanbanColumn key={col.title} {...col} />)}
      </div>
    </div>
  );
};

export default Deals;
