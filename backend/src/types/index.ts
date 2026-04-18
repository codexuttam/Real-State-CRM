export type UserRole = 'ADMIN' | 'AGENT' | 'MANAGER';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CLOSED' | 'LOST';

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
  aiScore?: number;
  createdAt: Date;
  updatedAt: Date;
}

export type PropertyStatus = 'AVAILABLE' | 'SOLD' | 'RENTED';
export type PropertyType = 'RESIDENTIAL' | 'COMMERCIAL';

export interface Property {
  id: string;
  title: string;
  description?: string;
  location: string;
  price: number;
  size?: number;
  status: PropertyStatus;
  type: PropertyType;
  images: string[];
  agentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type DealStage = 'NEGOTIATION' | 'AGREEMENT' | 'CLOSED';

export interface Deal {
  id: string;
  title: string;
  stage: DealStage;
  amount: number;
  commission?: number;
  leadId: string;
  propertyId: string;
  agentId: string;
  createdAt: Date;
  updatedAt: Date;
}
