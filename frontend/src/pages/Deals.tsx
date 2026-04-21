import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Plus, Filter, MoreHorizontal, DollarSign } from 'lucide-react';
import api from '../services/api';

const STAGES = ['NEGOTIATION', 'AGREEMENT', 'CLOSED'];

const Deals = () => {
  const [deals, setDeals] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      const response = await api.get('/deals');
      setDeals(response.data);
    } catch (error) {
      console.error('Error fetching deals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onDragEnd = async (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    // Optimistically update UI
    const updatedDeals = Array.from(deals);
    const dealIndex = updatedDeals.findIndex(d => d.id === draggableId);
    if (dealIndex > -1) {
      updatedDeals[dealIndex].stage = destination.droppableId;
      setDeals(updatedDeals);
    }

    try {
      await api.patch(`/deals/${draggableId}/stage`, { stage: destination.droppableId });
    } catch (error) {
      console.error('Error updating deal stage:', error);
      fetchDeals(); // Revert on error
    }
  };

  if (isLoading) return <div style={{ padding: '2rem' }}>Loading deals pipeline...</div>;

  return (
    <div style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem' }}>Deal Pipeline</h1>
          <p style={{ color: 'var(--text-muted)' }}>Track transactions from negotiation to closure</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn" style={{ background: 'var(--glass)' }}>
            <Filter size={18} />
            Filters
          </button>
          <button className="btn btn-primary">
            <Plus size={20} />
            New Deal
          </button>
        </div>
      </header>

      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'flex', gap: '1.5rem', flex: 1, minHeight: 0 }}>
          {STAGES.map(stage => (
            <div key={stage} style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: '300px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', padding: '0 0.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                  {stage} <span style={{ marginLeft: '0.5rem', padding: '2px 8px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', fontSize: '0.8rem' }}>
                    {deals.filter(d => d.stage === stage).length}
                  </span>
                </h3>
              </div>

              <Droppable droppableId={stage}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      background: snapshot.isDraggingOver ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)',
                      borderRadius: '12px',
                      padding: '1rem',
                      flex: 1,
                      overflowY: 'auto',
                      transition: 'background 0.2s',
                      minHeight: '100px'
                    }}
                  >
                    {deals
                      .filter(d => d.stage === stage)
                      .map((deal, index) => (
                        <Draggable key={deal.id} draggableId={deal.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="glass glass-card"
                              style={{
                                ...provided.draggableProps.style,
                                padding: '1rem',
                                marginBottom: '1rem',
                                border: snapshot.isDragging ? '1px solid var(--primary)' : '1px solid var(--glass-border)',
                                boxShadow: snapshot.isDragging ? '0 8px 32px rgba(0,0,0,0.4)' : 'none',
                                transform: snapshot.isDragging ? provided.draggableProps.style?.transform + ' rotate(2deg)' : provided.draggableProps.style?.transform
                              }}
                            >
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>{deal.property.type}</span>
                                <MoreHorizontal size={14} style={{ color: 'var(--text-muted)' }} />
                              </div>
                              <h4 style={{ marginBottom: '1rem', fontSize: '1rem' }}>{deal.property.title}</h4>
                              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Client: {deal.lead.name}</p>
                              
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                                  <DollarSign size={14} />
                                  {deal.amount.toLocaleString()}
                                </div>
                                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: 'white' }}>
                                  {deal.agent.name.charAt(0)}
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Deals;
