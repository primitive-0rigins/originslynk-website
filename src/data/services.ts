export interface Service {
  id: string;
  name: string;
  shortLabel: string;
  price: string;
  priceNote: string;
  positioning: string;
  bestFor: string;
  builds: string;
  includes: string[];
  clientResponsibilities: string[];
  originsLynkResponsibilities: string[];
  excludes: string[];
  managed: boolean;
}

export const personalAgentSetup: Service = {
  id: 'personal-ai-agent-setup',
  name: 'Personal AI Agent Setup',
  shortLabel: 'You direct it.',
  price: '$750',
  priceNote: 'one-time',
  positioning: 'A role-specific AI work environment that you actively direct and supervise.',
  bestFor:
    'One professional who wants reusable help with recurring work and is comfortable starting each task and reviewing the result.',
  builds:
    'A configured work environment shaped around one role, its responsibilities, working preferences, and recurring tasks.',
  includes: [
    'Discovery focused on your role',
    'Configuration around your responsibilities and working preferences',
    'Business-specific operating instructions',
    'Two reusable client-run skills, task systems, or templates',
    'One compatible existing AI account',
    'Client training',
    '14 days of setup support',
  ],
  clientResponsibilities: [
    'Start every task',
    'Review the work',
    'Approve every consequential action',
  ],
  originsLynkResponsibilities: [
    'Complete the agreed setup and training',
    'Correct setup issues during the 14-day support period',
  ],
  excludes: [
    'Continuous operation or monitoring',
    'Dedicated managed infrastructure',
    'Unattended workflow guarantees',
    'Ongoing workflow maintenance',
  ],
  managed: false,
};

export const roleAutomationSystem: Service = {
  id: 'role-automation-system',
  name: 'Role Automation System',
  shortLabel: 'You operate it.',
  price: '$1,200',
  priceNote: 'one-time',
  positioning: 'A deeper role-based system with several implemented workflows that you continue to operate.',
  bestFor:
    'A professional with three or four defined workflows who wants a more connected system without outsourcing day-to-day operation.',
  builds:
    'A role-specific AI-agent configuration with several documented workflows and supported account connections where included in scope.',
  includes: [
    'Full role and workflow discovery',
    'Role-specific AI-agent configuration',
    'Three to four defined workflows',
    'Supported integrations when included in scope',
    'Scheduled or account-connected tasks where appropriate',
    'Workflow instructions and documentation',
    'Testing and client training',
    '30 days of setup support',
  ],
  clientResponsibilities: [
    'Operate the system',
    'Maintain required subscriptions and account access',
    'Review outputs and resolve account authorization requests',
  ],
  originsLynkResponsibilities: [
    'Deliver the agreed implementation',
    'Test and stabilize it during the 30-day support period',
  ],
  excludes: [
    'Indefinite operation or monitoring',
    'Ongoing maintenance unless separately purchased',
    'Dedicated managed infrastructure',
    'Guaranteed compatibility with every account or platform',
  ],
  managed: false,
};

export const managedAutomation: Service = {
  id: 'managed-automation-appliance',
  name: 'Managed Automation Appliance',
  shortLabel: 'We maintain it.',
  price: 'Starting at $2,800',
  priceNote: 'setup · plus $250/month',
  positioning: 'A dedicated managed workflow environment placed at your location and remotely maintained by OriginsLynk.',
  bestFor:
    'A business with established recurring work that needs a dedicated environment, ongoing monitoring, and defined maintenance.',
  builds:
    'An isolated workflow environment on an OriginsLynk-owned appliance dedicated to one client, with the initially agreed workflows implemented and tested.',
  includes: [
    'Dedicated OriginsLynk-owned appliance',
    'Isolated client environment and managed workflow engine',
    'Initial agreed workflow implementation',
    'Remote administration and automated monitoring',
    'Backup verification and routine maintenance',
    'Failure investigation',
    'Monthly service report and business-hours support',
    '30-day launch stabilization period',
    'Up to 30 minutes of minor workflow adjustments per month',
  ],
  clientResponsibilities: [
    'Provide power, internet, and reasonable physical access',
    'Maintain client-owned accounts and authorize access through approved onboarding',
    'Review consequential outputs unless a written authorization says otherwise',
    'Return the appliance when managed service ends',
  ],
  originsLynkResponsibilities: [
    'Own and remotely administer the dedicated appliance',
    'Monitor supported conditions and investigate detected failures during defined support periods',
    'Verify backups, perform routine maintenance, and provide the monthly report',
  ],
  excludes: [
    'New workflows, integrations, or major changes',
    'After-hours emergency response',
    'Guaranteed uptime or detection of every possible failure',
    'Third-party subscriptions and usage-based charges',
  ],
  managed: true,
};

export const services = [personalAgentSetup, roleAutomationSystem, managedAutomation];
