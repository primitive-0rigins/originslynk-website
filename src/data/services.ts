export interface Service {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  positioning: string;
  bestFor: string;
  includes: string[];
  excludes: string[];
  operatingModel: string;
  managed: boolean;
}

export const personalAssistantStarter: Service = {
  id: 'personal-ai-assistant-starter',
  name: 'Personal AI Assistant Setup',
  price: '$750',
  priceNote: 'one-time',
  positioning: 'A personal AI workspace configured around your role, language, and recurring work.',
  bestFor:
    'One professional who wants a capable assistant they start and supervise themselves.',
  includes: [
    'Setup on one computer using a compatible account you already own',
    'One personalized role and voice profile',
    'Organized working folders and reference structure',
    'Two reusable, guided workflows',
    'Basic approval and safety rules',
    '60 minutes of training',
    '14 days of stabilization support',
  ],
  operatingModel: 'You manually start tasks and review every output.',
  excludes: [
    'Work that runs without you',
    'A dedicated managed appliance',
    'Ongoing monitoring',
    'Backups',
    'Custom account connections',
    'Ongoing workflow maintenance',
  ],
  managed: false,
};

export const assistantRoleSystem: Service = {
  id: 'assistant-role-system',
  name: 'AI Workflow System',
  price: '$1,200',
  priceNote: 'one-time · 30 days of support included',
  positioning: 'A repeatable system built around several recurring parts of one role.',
  bestFor: 'Professionals ready to get more from the accounts they already pay for without outsourcing daily operation.',
  includes: [
    'Everything in Personal AI Assistant Setup',
    'Workflow discovery for one person and one role',
    'Four total role-specific workflows',
    'Scheduled work where your existing account supports it',
    'Up to two standard account connections',
    'Approval rules and a written operating guide',
    '90 minutes of training',
    '30 days of stabilization support',
  ],
  operatingModel: 'You own and operate the system; important outputs remain yours to approve.',
  excludes: [
    'A dedicated managed appliance',
    'Guaranteed always-available operation',
    'Continuous monitoring or infrastructure backups',
    'Multiple people or job roles',
    'Ongoing management after stabilization',
  ],
  managed: false,
};

export const managedAutomation: Service = {
  id: 'managed-automation',
  name: 'Managed Automation Appliance',
  price: 'From $2,800',
  priceNote: 'setup · then $250/month',
  positioning: 'A dedicated, always-available system for recurring work we monitor and maintain.',
  bestFor: 'A business with proven recurring work that should continue when no one remembers to start it.',
  includes: [
    'Everything in the AI Workflow System',
    'A dedicated appliance for your business',
    'Six total configured workflows',
    'Up to two actively running automations',
    'Human approval points where consequences matter',
    'Monitoring, configuration backups, and maintenance',
    'Testing, documentation, and launch training',
    '30 days of launch stabilization',
  ],
  operatingModel: 'OriginsLynk maintains the appliance; defined outputs still wait for human approval.',
  excludes: [
    'New workflows or substantial redesigns',
    'Additional people, departments, or locations',
    'Third-party subscriptions and usage charges',
    'Internet or power service',
    'Guaranteed uninterrupted operation',
    'High-risk or regulated decisions',
  ],
  managed: true,
};

export const services = [personalAssistantStarter, assistantRoleSystem, managedAutomation];
