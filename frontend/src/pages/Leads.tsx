import { Plus, Search, Filter } from 'lucide-react';

const Leads = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem' }}>Lead Management</h1>
          <p style={{ color: 'var(--text-muted)' }}>Capture and track potential clients</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={20} />
          Add Lead
        </button>
      </header>

      <div className="glass glass-card" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search leads by name or email..." 
            style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'white' }}
          />
        </div>
        <button className="btn" style={{ background: 'var(--glass)' }}>
          <Filter size={18} />
          Filters
        </button>
      </div>

      <div className="glass" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: 'rgba(255,255,255,0.03)' }}>
            <tr>
              <th style={{ padding: '1.2rem' }}>Name</th>
              <th>Status</th>
              <th>Contact</th>
              <th>Budget</th>
              <th>Agent</th>
              <th style={{ textAlign: 'right', paddingRight: '1.2rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map(i => (
              <tr key={i} style={{ borderTop: '1px solid var(--glass-border)' }}>
                <td style={{ padding: '1.2rem' }}>
                  <div style={{ fontWeight: 500 }}>Lead Client #{i}</div>
                  <small style={{ color: 'var(--text-muted)' }}>Source: Website</small>
                </td>
                <td>
                  <span style={{ padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', background: i % 2 === 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(99, 102, 241, 0.1)', color: i % 2 === 0 ? '#10b981' : '#6366f1' }}>
                    {i % 2 === 0 ? 'Qualified' : 'New'}
                  </span>
                </td>
                <td style={{ fontSize: '0.9rem' }}>+123 456 789</td>
                <td>$450,000</td>
                <td><small>Unassigned</small></td>
                <td style={{ textAlign: 'right', paddingRight: '1.2rem' }}>
                   <button className="btn" style={{ padding: '0.4rem', border: 'none' }}>•••</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leads;
