import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Building2, Briefcase, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();

  const links = [
    { to: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/leads', icon: <Users size={20} />, label: 'Leads' },
    { to: '/properties', icon: <Building2 size={20} />, label: 'Properties' },
    { to: '/deals', icon: <Briefcase size={20} />, label: 'Deals' },
  ];

  return (
    <div className="sidebar">
      <div className="logo" style={{ marginBottom: '3rem', padding: '0 1rem' }}>
        <h1 style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '1.8rem' }}>
          RealCRM
        </h1>
      </div>

      <nav style={{ flex: 1 }}>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `btn ${isActive ? 'btn-primary' : ''}`}
            style={{ width: '100%', marginBottom: '0.8rem', justifyContent: 'flex-start' }}
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <button onClick={logout} className="btn" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', width: '100%' }}>
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
