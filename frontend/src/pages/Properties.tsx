import { useState, useEffect } from 'react';
import { Building2, MapPin, DollarSign, Maximize, Search, Loader2, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../services/api';

const PropertyCard = ({ property }: any) => (
  <motion.div whileHover={{ y: -5 }} className="glass glass-card">
    <div style={{ height: '200px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      {property.images && property.images.length > 0 ? (
        <img src={property.images[0]} alt={property.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <Building2 size={48} style={{ opacity: 0.2 }} />
      )}
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>{property.title}</h3>
      <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', color: 'var(--primary)' }}>{property.type}</span>
    </div>
    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
      <MapPin size={14} />
      {property.location}
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.5rem', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <DollarSign size={14} style={{ color: 'var(--primary)' }} />
        <span style={{ fontWeight: 600 }}>{property.price.toLocaleString()}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Maximize size={14} style={{ color: 'var(--primary)' }} />
        <span>{property.size} m²</span>
      </div>
    </div>
    <button className="btn btn-primary" style={{ width: '100%' }}>View Details</button>
  </motion.div>
);

const Properties = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    minPrice: '',
    maxPrice: ''
  });

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const fetchProperties = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.type) params.append('type', filters.type);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      
      const response = await api.get(`/properties?${params.toString()}`);
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProperties = properties.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Property Listings</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage and showcase your portfolio</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={20} />
          List Property
        </button>
      </header>

      <div className="glass glass-card" style={{ marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', padding: '1rem' }}>
        <div style={{ flex: 2, minWidth: '300px', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search by title or location..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'white' }}
          />
        </div>
        <select 
          value={filters.type}
          onChange={(e) => setFilters({...filters, type: e.target.value})}
          style={{ padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'white', outline: 'none' }}
        >
          <option value="" style={{ background: '#111' }}>All Types</option>
          <option value="RESIDENTIAL" style={{ background: '#111' }}>Residential</option>
          <option value="COMMERCIAL" style={{ background: '#111' }}>Commercial</option>
        </select>
      </div>

      {isLoading ? (
        <div style={{ padding: '4rem', textAlign: 'center' }}>
          <Loader2 className="animate-spin" size={40} style={{ margin: '0 auto', marginBottom: '1rem' }} />
          <p>Finding properties...</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {filteredProperties.map(p => <PropertyCard key={p.id} property={p} />)}
          {filteredProperties.length === 0 && (
            <div style={{ gridColumn: '1 / -1', padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              No properties found matching your criteria.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Properties;
