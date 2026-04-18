import { Building2, MapPin, Euro, Maximize } from 'lucide-react';
import { motion } from 'framer-motion';

const PropertyCard = ({ property }: any) => (
  <motion.div whileHover={{ y: -5 }} className="glass glass-card">
    <div style={{ height: '200px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Building2 size={48} style={{ opacity: 0.2 }} />
    </div>
    <h3 style={{ marginBottom: '0.5rem' }}>{property.title}</h3>
    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
      <MapPin size={14} />
      {property.location}
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Euro size={14} style={{ color: 'var(--primary)' }} />
        <span>{property.price.toLocaleString()}</span>
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
  const dummyProperties = [
    { id: 1, title: 'Modern Villa', location: 'Barcelona, Spain', price: 1200000, size: 350 },
    { id: 2, title: 'Skyline Apartment', location: 'Madrid, Spain', price: 450000, size: 85 },
    { id: 3, title: 'Luxury Penthouse', location: 'Valencia, Spain', price: 850000, size: 140 },
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <header style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Property Listings</h1>
        <p style={{ color: 'var(--text-muted)' }}>Manage and showcase your portfolio</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        {dummyProperties.map(p => <PropertyCard key={p.id} property={p} />)}
      </div>
    </div>
  );
};

export default Properties;
