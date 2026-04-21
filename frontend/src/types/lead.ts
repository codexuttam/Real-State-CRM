export enum LeadStatus {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
  QUALIFIED = 'QUALIFIED',
  CLOSED = 'CLOSED',
  LOST = 'LOST'
}

export interface Lead {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  budget?: number;
  preferences?: string;
  status: LeadStatus;
  source?: string;
  agentId?: string;
  agent?: {
    name: string;
    email: string;
  };
  aiScore?: number;
  createdAt: string;
  updatedAt: string;
}
