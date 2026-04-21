import { useState, useEffect } from 'react';
import { Plus, Search, Filter, Loader2 } from 'lucide-react';
import api from '../services/api';
import { Lead } from '../types/lead';

const Leads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLead, setNewLead] = useState({ name: '', email: '', phone: '', budget: '', preferences: '' });

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await api.get('/leads');
      setLeads(response.data);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddLead = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/leads', {
        ...newLead,
        budget: newLead.budget ? parseFloat(newLead.budget) : undefined
      });
      setIsModalOpen(false);
      setNewLead({ name: '', email: '', phone: '', budget: '', preferences: '' });
      fetchLeads();
    } catch (error) {
      console.error('Error adding lead:', error);
    }
  };

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem' }}>Lead Management</h1>
          <p style={{ color: 'var(--text-muted)' }}>Capture and track potential clients</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={20} />
          Add Lead
        </button>
      </header>

      {/* Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div className="glass glass-card" style={{ maxWidth: '500px', width: '90%', padding: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Add New Lead</h2>
            <form onSubmit={handleAddLead}>
              <div className="input-group">
                <label>Full Name</label>
                <input type="text" value={newLead.name} onChange={e => setNewLead({...newLead, name: e.target.value})} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group">
                  <label>Email</label>
                  <input type="email" value={newLead.email} onChange={e => setNewLead({...newLead, email: e.target.value})} />
                </div>
                <div className="input-group">
                  <label>Phone</label>
                  <input type="text" value={newLead.phone} onChange={e => setNewLead({...newLead, phone: e.target.value})} />
                </div>
              </div>
              <div className="input-group">
                <label>Budget ($)</label>
                <input type="number" value={newLead.budget} onChange={e => setNewLead({...newLead, budget: e.target.value})} />
              </div>
              <div className="input-group">
                <label>Preferences</label>
                <textarea 
                  value={newLead.preferences} 
                  onChange={e => setNewLead({...newLead, preferences: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'white', minHeight: '80px' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button type="button" className="btn" onClick={() => setIsModalOpen(false)} style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="glass glass-card" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search leads by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'white' }}
          />
        </div>
        <button className="btn" style={{ background: 'var(--glass)' }}>
          <Filter size={18} />
          Filters
        </button>
      </div>

      <div className="glass" style={{ overflow: 'hidden' }}>
        {isLoading ? (
          <div style={{ padding: '4rem', textAlign: 'center' }}>
            <Loader2 className="animate-spin" size={40} style={{ margin: '0 auto', marginBottom: '1rem' }} />
            <p>Loading leads...</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: 'rgba(255,255,255,0.03)' }}>
              <tr>
                <th style={{ padding: '1.2rem' }}>Name</th>
                <th>Status</th>
                <th>Contact</th>
                <th>Budget</th>
                <th>AI Score</th>
                <th>Agent</th>
                <th style={{ textAlign: 'right', paddingRight: '1.2rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map(lead => (
                <tr key={lead.id} style={{ borderTop: '1px solid var(--glass-border)' }}>
                  <td style={{ padding: '1.2rem' }}>
                    <div style={{ fontWeight: 500 }}>{lead.name}</div>
                    <small style={{ color: 'var(--text-muted)' }}>Source: {lead.source || 'N/A'}</small>
                  </td>
                  <td>
                    <span style={{ 
                      padding: '0.3rem 0.8rem', 
                      borderRadius: '20px', 
                      fontSize: '0.8rem', 
                      background: lead.status === 'QUALIFIED' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(99, 102, 241, 0.1)', 
                      color: lead.status === 'QUALIFIED' ? '#10b981' : '#6366f1' 
                    }}>
                      {lead.status}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.9rem' }}>
                    <div>{lead.phone || '-'}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{lead.email || ''}</div>
                  </td>
                  <td>{lead.budget ? `$${lead.budget.toLocaleString()}` : '-'}</td>
                  <td>
                    <div style={{ width: '100px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden', marginTop: '4px' }}>
                      <div style={{ width: `${lead.aiScore || 0}%`, height: '100%', background: (lead.aiScore || 0) > 70 ? '#10b981' : (lead.aiScore || 0) > 40 ? '#f59e0b' : '#ef4444' }} />
                    </div>
                    <small>{lead.aiScore || 0}%</small>
                  </td>
                  <td><small>{lead.agent?.name || 'Unassigned'}</small></td>
                  <td style={{ textAlign: 'right', paddingRight: '1.2rem' }}>
                     <button className="btn" style={{ padding: '0.4rem', border: 'none' }}>•••</button>
                  </td>
                </tr>
              ))}
              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No leads found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Leads;
