import { PrismaClient, UserRole, LeadStatus, PropertyStatus, PropertyType, DealStage } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting enhanced seeding...');

  // 1. Create/Update Admin
  const adminEmail = 'crm_admin@realstate.live';
  const hashedPassword = await bcrypt.hash('crm_secure_2026', 10);
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { password: hashedPassword },
    create: {
      email: adminEmail,
      name: 'CRM Super Admin',
      password: hashedPassword,
      role: UserRole.ADMIN,
    },
  });

  // 2. Create Properties
  const properties = [
    {
      title: 'Ocean View Villa',
      location: 'Malibu, CA',
      price: 2500000,
      type: PropertyType.RESIDENTIAL,
      status: PropertyStatus.AVAILABLE,
      amenities: 'Pool, Gym, Private Beach',
    },
    {
      title: 'Tech Hub Office Space',
      location: 'San Francisco, CA',
      price: 5400000,
      type: PropertyType.COMMERCIAL,
      status: PropertyStatus.AVAILABLE,
      amenities: 'High-speed Fiber, Modern Design',
    },
    {
      title: 'Skyline Penthouse',
      location: 'New York, NY',
      price: 1850000,
      type: PropertyType.RESIDENTIAL,
      status: PropertyStatus.AVAILABLE,
      amenities: 'Rooftop Terrace, Concierge',
    }
  ];

  for (const p of properties) {
    const existing = await prisma.property.findFirst({ where: { title: p.title } });
    if (!existing) {
      await prisma.property.create({
        data: { ...p, agentId: admin.id }
      });
    }
  }

  // 3. Create Smart Leads (Some already enriched)
  const leads = [
    {
      name: 'Robert Miller',
      email: 'robert@tech.com',
      phone: '555-0234',
      budget: 2000000,
      status: LeadStatus.QUALIFIED,
      source: 'Website',
      aiScore: 88,
      aiSummary: '✨ Very high intent. Looking for luxury villas in coastal areas. Remote tech executive.',
      agentId: admin.id
    },
    {
      name: 'Sarah Chen',
      email: 'schen@investment.org',
      phone: '555-0988',
      budget: 6000000,
      status: LeadStatus.CONTACTED,
      source: 'Referral',
      aiScore: 94,
      aiSummary: '✨ Institutional investor interested in prime commercial retail spaces. Prepared for immediate closing.',
      agentId: admin.id
    }
  ];

  const createdLeads = [];
  for (const l of leads) {
    const existing = await prisma.lead.findFirst({ where: { email: l.email } });
    if (!existing) {
      const lead = await prisma.lead.create({ data: l });
      createdLeads.push(lead);
    } else {
      createdLeads.push(existing);
    }
  }

  // 4. Create Deals
  const dbProps = await prisma.property.findMany();
  
  // Closed Deal
  await prisma.deal.create({
    data: {
      title: 'Malibu Villa Sale',
      amount: 2500000,
      commission: 75000,
      stage: DealStage.CLOSED,
      leadId: createdLeads[0].id,
      propertyId: dbProps[0].id,
      agentId: admin.id
    }
  });

  // Pipeline Deal (Negotiation)
  await prisma.deal.create({
    data: {
      title: 'Commercial HQ Lease',
      amount: 5400000,
      stage: DealStage.NEGOTIATION,
      leadId: createdLeads[1].id,
      propertyId: dbProps[1].id,
      agentId: admin.id
    }
  });

  console.log('Seeding finished successfully.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
