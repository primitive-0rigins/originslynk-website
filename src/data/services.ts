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
  diagnostic?: boolean;
}

export const healthCheck: Service = {
  id: 'automation-health-check',
  name: 'Automation Health Check',
  shortLabel: 'Know what to fix first.',
  price: 'Starting at $350',
  priceNote: 'fixed diagnostic price after a free fit call',
  positioning: 'A clear diagnosis for business automations that are unreliable, undocumented, or costing more than they should.',
  bestFor:
    'A business that already has automated work but cannot confidently explain what works, what fails, or what should happen next.',
  builds:
    'A plain-language inventory and workflow map, evidence-based findings, a cost review, and a prioritized keep, repair, rebuild, monitor, or retire plan.',
  includes: [
    'Review of up to three existing workflows on one automation platform',
    'One 60-minute discovery and screen-share session',
    'Safe, non-destructive testing when access and test data allow',
    'Review of failures, access, duplicate tools, subscriptions, and data risk',
    'Written findings and prioritized action plan',
    'One 30-minute results meeting',
    'Six total operator hours, with technical review stopping at cumulative hour five',
  ],
  clientResponsibilities: [
    'Provide authorized access, examples, and safe test data',
    'Identify the intended business result for each workflow',
    'Approve any separately quoted repair work',
  ],
  originsLynkResponsibilities: [
    'Preserve the existing setup while diagnosing it',
    'Explain findings in plain language and price repair separately',
  ],
  excludes: [
    'Production repairs or changes',
    'New workflows, migrations, or custom development',
    'Security penetration testing or compliance certification',
    'More than three workflows or more than one automation platform without a revised quote',
  ],
  managed: false,
  diagnostic: true,
};

export const tier1Setup: Service = {
  id: 'tier-1-intelligence-setup',
  name: 'Core System',
  shortLabel: 'You direct it.',
  price: '$750',
  priceNote: 'one-time',
  positioning: 'Two repeatable, client-started workflows built around one person’s real responsibilities.',
  bestFor:
    'One professional who wants reliable help with recurring work and is comfortable starting each task and reviewing the result.',
  builds:
    'A role-specific work environment with two reusable workflows, clear instructions, training, and safe operating boundaries.',
  includes: [
    'Discovery focused on one role and its recurring work',
    'Two client-started intelligence workflows',
    'Business-specific instructions and examples',
    'One user and one client-owned computer',
    'Quick-start guide and client training',
    '14 calendar days of defect stabilization and reasonable clarification',
  ],
  clientResponsibilities: [
    'Start every task',
    'Review the work',
    'Approve every consequential action',
  ],
  originsLynkResponsibilities: [
    'Complete the agreed setup and training',
    'Correct in-scope setup defects reported during the 14-day stabilization period',
  ],
  excludes: [
    'Continuous operation or monitoring',
    'Dedicated managed infrastructure',
    'Unattended workflow guarantees',
    'Ongoing workflow maintenance',
  ],
  managed: false,
};

export const tier2Setup: Service = {
  id: 'tier-2-intelligence-setup',
  name: 'Expanded System',
  shortLabel: 'You operate it.',
  price: '$1,200',
  priceNote: 'one-time',
  positioning: 'A connected role system with four total workflows for work that happens repeatedly.',
  bestFor:
    'A professional or small team with defined recurring work that should move between existing business accounts more consistently.',
  builds:
    'Everything in Tier 1, plus two scheduled or supported connected workflows—four total—with testing, documentation, and training.',
  includes: [
    'Everything included in Tier 1',
    'Four total cumulative workflows',
    'Supported account connections when included in scope',
    'Workflow instructions and documentation',
    'Testing and client training',
    '30 calendar days of defect stabilization and reasonable clarification',
  ],
  clientResponsibilities: [
    'Operate the system',
    'Maintain required subscriptions and account access',
    'Review outputs and resolve account authorization requests',
  ],
  originsLynkResponsibilities: [
    'Deliver the agreed implementation',
    'Correct in-scope setup defects reported during the 30-day stabilization period',
  ],
  excludes: [
    'OriginsLynk monitoring or routine operation',
    'Recurring maintenance; later repair requests are assessed and quoted separately',
    'Dedicated managed infrastructure',
    'Guaranteed compatibility with every account or platform',
  ],
  managed: false,
};

export const tier3Setup: Service = {
  id: 'tier-3-intelligence-setup',
  name: 'Managed System',
  shortLabel: 'We maintain it.',
  price: 'Starting at $2,800',
  priceNote: 'setup · required $250/month beginning day 31',
  positioning: 'Six total workflows in a dedicated business environment that OriginsLynk monitors and maintains.',
  bestFor:
    'A business with proven recurring work that needs a dedicated environment, ongoing monitoring, and defined maintenance.',
  builds:
    'Everything in Tiers 1 and 2, plus up to two managed workflows—six total—in a dedicated client environment.',
  includes: [
    'Everything included in Tiers 1 and 2',
    'Six total cumulative workflows',
    'Dedicated OriginsLynk-owned business appliance',
    'Remote administration and automated monitoring',
    'Backup verification, routine maintenance, and failure investigation',
    'Weekly review of appliance health, backup results, and workflow execution records',
    'Monthly service report and business-hours support',
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

export const implementationServices = [tier1Setup, tier2Setup, tier3Setup];
export const services = [healthCheck, ...implementationServices];
