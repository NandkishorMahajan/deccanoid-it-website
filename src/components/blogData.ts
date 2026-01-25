export type BlogContentBlock =
  | { type: 'h2'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] };

export type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  readTime: string;
  date: string;
  featured: boolean;
  gradient: string;
  featuredImage: string;
  content: BlogContentBlock[];
};

export const blogPosts: BlogPost[] = [
  /* ===================== 1 ===================== */
  {
    id: 1,
    title: 'The Future of AI in Enterprise: 2026 Trends and Predictions',
    excerpt:
      'A pragmatic look at how enterprises are adopting AI—what’s real, what’s hype, and how to build durable AI capability.',
    category: 'AI & Machine Learning',
    tags: ['AI', 'Strategy', 'Enterprise'],
    readTime: '8 min read',
    date: 'Jan 05, 2026',
    featured: true,
    gradient: 'from-blue-600 to-cyan-500',
    featuredImage: '/blog-01.svg',
    content: [
      { type: 'h2', text: 'Enterprise AI has moved beyond pilots' },
      {
        type: 'p',
        text:
          'By 2026, AI is no longer limited to innovation labs. Enterprises are embedding AI into core workflows such as customer support, forecasting, and internal knowledge systems.',
      },
      { type: 'h2', text: 'Where AI is delivering real value' },
      {
        type: 'ul',
        items: [
          'AI copilots for engineering and operations',
          'Customer service automation with human fallback',
          'Predictive analytics for demand and supply chains',
          'Fraud detection and security monitoring',
        ],
      },
      { type: 'h2', text: 'Data quality over model complexity' },
      {
        type: 'p',
        text:
          'Most failed AI initiatives suffer from poor data foundations. Clean, governed, and accessible data has become a bigger differentiator than advanced model architectures.',
      },
      { type: 'h2', text: 'AI governance and risk management' },
      {
        type: 'p',
        text:
          'Enterprises are formalizing AI governance frameworks to address bias, compliance, auditability, and security risks.',
      },
      { type: 'h2', text: 'What leaders should focus on next' },
      {
        type: 'p',
        text:
          'The most successful organizations treat AI as a long-term capability, not a one-time project, investing in people, platforms, and processes together.',
      },
    ],
  },

  /* ===================== 2 ===================== */
  {
    id: 2,
    title: 'Cloud Migration Best Practices: A Complete Guide',
    excerpt:
      'From discovery to cutover—an enterprise-ready migration playbook that avoids downtime, surprise costs, and security gaps.',
    category: 'Cloud Computing',
    tags: ['Cloud', 'Migration', 'Architecture'],
    readTime: '12 min read',
    date: 'Jan 03, 2026',
    featured: true,
    gradient: 'from-purple-600 to-pink-500',
    featuredImage: '/blog-02.svg',
    content: [
      { type: 'h2', text: 'Cloud migration is a business initiative' },
      {
        type: 'p',
        text:
          'Successful migrations align with outcomes like agility, resilience, and cost transparency—not just infrastructure changes.',
      },
      { type: 'h2', text: 'Discovery and assessment phase' },
      {
        type: 'ul',
        items: [
          'Application inventory and dependencies',
          'Compliance and regulatory constraints',
          'Cost baseline analysis',
          'Risk categorization',
        ],
      },
      { type: 'h2', text: 'Designing a scalable landing zone' },
      {
        type: 'p',
        text:
          'A strong landing zone includes identity, networking, logging, security, and governance controls from day one.',
      },
      { type: 'h2', text: 'Migration execution strategies' },
      {
        type: 'p',
        text:
          'Wave-based execution with rollback plans reduces risk and allows teams to refine patterns incrementally.',
      },
      { type: 'h2', text: 'Post-migration optimization' },
      {
        type: 'p',
        text:
          'Continuous cost optimization, performance tuning, and security hardening are critical after workloads go live.',
      },
    ],
  },

  /* ===================== 3 ===================== */
  {
    id: 3,
    title: 'Zero Trust Security: What It Really Means in Practice',
    excerpt:
      'A real-world blueprint for Zero Trust—identity-first controls, least privilege, and continuous verification without slowing teams down.',
    category: 'Security',
    tags: ['Zero Trust', 'IAM', 'Compliance'],
    readTime: '7 min read',
    date: 'Dec 28, 2025',
    featured: true,
    gradient: 'from-red-600 to-orange-500',
    featuredImage: '/blog-03.svg',
    content: [
      { type: 'h2', text: 'Zero Trust begins with identity' },
      {
        type: 'p',
        text:
          'Identity is the new perimeter. Users, devices, and workloads must be continuously verified before access is granted.',
      },
      { type: 'h2', text: 'Core Zero Trust principles' },
      {
        type: 'ul',
        items: [
          'Never trust, always verify',
          'Least privilege access',
          'Continuous risk evaluation',
          'Assume breach',
        ],
      },
      { type: 'h2', text: 'Network segmentation strategies' },
      {
        type: 'p',
        text:
          'Micro-segmentation limits lateral movement and reduces blast radius during incidents.',
      },
      { type: 'h2', text: 'Operationalizing Zero Trust' },
      {
        type: 'p',
        text:
          'Automation, centralized policy management, and visibility are required to scale Zero Trust effectively.',
      },
    ],
  },

  /* ===================== 4 ===================== */
  {
    id: 4,
    title: 'Building Scalable Microservices Architecture',
    excerpt:
      'Patterns and trade-offs for microservices that scale: boundaries, contracts, observability, and failure containment.',
    category: 'Software Development',
    tags: ['Microservices', 'Kubernetes', 'Reliability'],
    readTime: '10 min read',
    date: 'Dec 22, 2025',
    featured: true,
    gradient: 'from-green-600 to-teal-500',
    featuredImage: '/blog-04.svg',
    content: [
      { type: 'h2', text: 'Design services around business domains' },
      {
        type: 'p',
        text:
          'Well-defined service boundaries reduce coupling and enable independent scaling and deployment.',
      },
      { type: 'h2', text: 'Communication patterns' },
      {
        type: 'ul',
        items: [
          'REST or gRPC for synchronous calls',
          'Event-driven messaging for resilience',
          'Clear API versioning',
        ],
      },
      { type: 'h2', text: 'Observability is essential' },
      {
        type: 'p',
        text:
          'Metrics, logs, and traces provide the visibility needed to operate distributed systems reliably.',
      },
      { type: 'h2', text: 'Failure handling strategies' },
      {
        type: 'p',
        text:
          'Timeouts, retries, and circuit breakers prevent cascading failures across services.',
      },
    ],
  },

  /* ===================== 5 ===================== */
  {
    id: 5,
    title: 'IoT and Edge Computing: The Perfect Partnership',
    excerpt:
      'How edge computing reduces latency, improves reliability, and unlocks smarter IoT workloads at scale.',
    category: 'IoT',
    tags: ['Edge', 'IoT', 'Data'],
    readTime: '7 min read',
    date: 'Dec 18, 2025',
    featured: true,
    gradient: 'from-indigo-600 to-blue-500',
    featuredImage: '/blog-05.svg',
    content: [
      { type: 'h2', text: 'Why edge computing matters' },
      {
        type: 'p',
        text:
          'Edge processing reduces latency and keeps critical workloads running even during connectivity disruptions.',
      },
      { type: 'h2', text: 'Common edge use cases' },
      {
        type: 'ul',
        items: [
          'Real-time monitoring and alerts',
          'Local automation and control',
          'Bandwidth optimization',
        ],
      },
      { type: 'h2', text: 'Security at the edge' },
      {
        type: 'p',
        text:
          'Secure device identity, firmware integrity, and OTA updates are critical for edge environments.',
      },
      { type: 'h2', text: 'Managing edge fleets' },
      {
        type: 'p',
        text:
          'Centralized monitoring and lifecycle management are required for large-scale edge deployments.',
      },
    ],
  },

  /* ===================== 6 ===================== */
  {
    id: 6,
    title: 'Data Analytics ROI: Measuring Success',
    excerpt:
      'Move beyond vanity metrics—how to measure analytics impact with credible business KPIs and adoption signals.',
    category: 'Data & Analytics',
    tags: ['Analytics', 'KPIs', 'Data Platform'],
    readTime: '9 min read',
    date: 'Dec 15, 2025',
    featured: true,
    gradient: 'from-yellow-600 to-orange-500',
    featuredImage: '/blog-06.svg',
    content: [
      { type: 'h2', text: 'Analytics must drive decisions' },
      {
        type: 'p',
        text:
          'Analytics initiatives succeed when they improve real business decisions, not just dashboard views.',
      },
      { type: 'h2', text: 'Adoption metrics that matter' },
      {
        type: 'ul',
        items: [
          'Active users and repeat usage',
          'Time-to-insight',
          'Decision coverage',
        ],
      },
      { type: 'h2', text: 'Measuring business impact' },
      {
        type: 'p',
        text:
          'Revenue growth, cost reduction, and risk mitigation are stronger indicators of analytics ROI.',
      },
      { type: 'h2', text: 'Building trust in data' },
      {
        type: 'p',
        text:
          'Data quality, freshness, and lineage improve confidence and long-term adoption.',
      },
    ],
  },

  /* ===================== 7 ===================== */
  {
    id: 7,
    title: 'DevOps Without Drama: A Practical CI/CD Blueprint',
    excerpt:
      'Standardize delivery with pipelines, environments, and guardrails that make releases boring—in the best way.',
    category: 'DevOps',
    tags: ['CI/CD', 'Automation', 'SRE'],
    readTime: '8 min read',
    date: 'Dec 10, 2025',
    featured: true,
    gradient: 'from-blue-600 to-cyan-500',
    featuredImage: '/blog-07.svg',
    content: [
      { type: 'h2', text: 'Make the happy path the default' },
      {
        type: 'p',
        text:
          'CI/CD pipelines should make secure, reliable delivery the easiest option for teams.',
      },
      { type: 'h2', text: 'Core CI/CD components' },
      {
        type: 'ul',
        items: [
          'Automated testing and quality gates',
          'Immutable artifacts',
          'Progressive delivery strategies',
        ],
      },
      { type: 'h2', text: 'Reducing deployment risk' },
      {
        type: 'p',
        text:
          'Canary and blue-green deployments help catch issues before full rollout.',
      },
      { type: 'h2', text: 'Observability in pipelines' },
      {
        type: 'p',
        text:
          'Telemetry integrated into delivery pipelines improves feedback and reliability.',
      },
    ],
  },

  /* ===================== 8 ===================== */
  {
    id: 8,
    title: 'Ransomware Readiness: A Checklist That Works',
    excerpt:
      'What to do before an incident: backups, segmentation, response drills, and executive-ready communication plans.',
    category: 'Security',
    tags: ['Ransomware', 'BCP', 'Resilience'],
    readTime: '6 min read',
    date: 'Dec 06, 2025',
    featured: true,
    gradient: 'from-red-600 to-orange-500',
    featuredImage: '/blog-08.svg',
    content: [
      { type: 'h2', text: 'Assume compromise' },
      {
        type: 'p',
        text:
          'Ransomware defenses must assume that some controls will eventually fail.',
      },
      { type: 'h2', text: 'Preventive controls' },
      {
        type: 'ul',
        items: [
          'Network segmentation',
          'Least privilege access',
          'Email and endpoint protection',
        ],
      },
      { type: 'h2', text: 'Backup strategy' },
      {
        type: 'p',
        text:
          'Immutable, offline backups with regular restore testing are critical.',
      },
      { type: 'h2', text: 'Incident response readiness' },
      {
        type: 'p',
        text:
          'Runbooks, tabletop exercises, and executive communication plans reduce chaos during incidents.',
      },
    ],
  },

  /* ===================== 9 ===================== */
  {
    id: 9,
    title: 'Modernizing Legacy Apps: Strangler Pattern Done Right',
    excerpt:
      'Incrementally modernize without big-bang rewrites—how to replace parts safely while keeping the business running.',
    category: 'Software Development',
    tags: ['Modernization', 'Architecture', 'Legacy'],
    readTime: '9 min read',
    date: 'Nov 30, 2025',
    featured: true,
    gradient: 'from-purple-600 to-pink-500',
    featuredImage: '/blog-09.svg',
    content: [
      { type: 'h2', text: 'Why legacy modernization fails' },
      {
        type: 'p',
        text:
          'Big-bang rewrites introduce high risk and long delivery timelines.',
      },
      { type: 'h2', text: 'Strangler pattern basics' },
      {
        type: 'ul',
        items: [
          'Incremental replacement',
          'Traffic routing at the edge',
          'Gradual decommissioning',
        ],
      },
      { type: 'h2', text: 'Data migration strategy' },
      {
        type: 'p',
        text:
          'Data ownership and synchronization must be planned carefully.',
      },
      { type: 'h2', text: 'Measuring modernization success' },
      {
        type: 'p',
        text:
          'Lead time, reliability, and cost efficiency are better indicators than code rewrite percentage.',
      },
    ],
  },

  /* ===================== 10 ===================== */
  {
    id: 10,
    title: 'Observability 101: From Logs to Business Signals',
    excerpt:
      'Get past “we have dashboards” and build observability that shortens incidents and improves customer experience.',
    category: 'Reliability',
    tags: ['Observability', 'SLOs', 'Monitoring'],
    readTime: '7 min read',
    date: 'Nov 24, 2025',
    featured: true,
    gradient: 'from-green-600 to-teal-500',
    featuredImage: '/blog-10.svg',
    content: [
      { type: 'h2', text: 'Beyond the three pillars' },
      {
        type: 'p',
        text:
          'Logs, metrics, and traces are necessary but insufficient without context and correlation.',
      },
      { type: 'h2', text: 'Defining meaningful SLOs' },
      {
        type: 'ul',
        items: [
          'User-centric metrics',
          'Clear error budgets',
          'Actionable alerts',
        ],
      },
      { type: 'h2', text: 'Reducing alert fatigue' },
      {
        type: 'p',
        text:
          'High-signal alerts focus on symptoms first, not noisy metrics.',
      },
      { type: 'h2', text: 'Linking telemetry to business outcomes' },
      {
        type: 'p',
        text:
          'Observability is most valuable when it connects technical health to customer impact.',
      },
    ],
  },

  /* ===================== 11 ===================== */
  {
    id: 11,
    title: 'FinOps Fundamentals: Cutting Cloud Costs Without Cutting Quality',
    excerpt:
      'A disciplined approach to cost governance—rightsizing, commitments, and accountability across teams.',
    category: 'Cloud Computing',
    tags: ['FinOps', 'Cost', 'Cloud'],
    readTime: '6 min read',
    date: 'Nov 18, 2025',
    featured: true,
    gradient: 'from-indigo-600 to-blue-500',
    featuredImage: '/blog-11.svg',
    content: [
      { type: 'h2', text: 'Why FinOps matters' },
      {
        type: 'p',
        text:
          'Cloud cost optimization requires collaboration between finance, engineering, and operations.',
      },
      { type: 'h2', text: 'Core FinOps practices' },
      {
        type: 'ul',
        items: [
          'Cost allocation and tagging',
          'Rightsizing and autoscaling',
          'Usage visibility',
        ],
      },
      { type: 'h2', text: 'Balancing cost and performance' },
      {
        type: 'p',
        text:
          'Cost reduction should never compromise reliability or customer experience.',
      },
      { type: 'h2', text: 'Building accountability' },
      {
        type: 'p',
        text:
          'Clear ownership and shared metrics drive sustainable cost optimization.',
      },
    ],
  },

  /* ===================== 12 ===================== */
  {
    id: 12,
    title: 'Secure SDLC: Shifting Left Without Slowing Delivery',
    excerpt:
      'Integrate security into development with automation, guardrails, and developer-friendly tooling.',
    category: 'Security',
    tags: ['AppSec', 'SDLC', 'DevSecOps'],
    readTime: '8 min read',
    date: 'Nov 12, 2025',
    featured: true,
    gradient: 'from-red-600 to-orange-500',
    featuredImage: '/blog-12.svg',
    content: [
      { type: 'h2', text: 'Security as a developer experience' },
      {
        type: 'p',
        text:
          'Security tools must integrate seamlessly into developer workflows to be effective.',
      },
      { type: 'h2', text: 'Shifting security left' },
      {
        type: 'ul',
        items: [
          'Static and dependency scanning',
          'Secrets detection',
          'Automated remediation guidance',
        ],
      },
      { type: 'h2', text: 'Policy as code' },
      {
        type: 'p',
        text:
          'Policy-as-code enables consistent, automated security enforcement across environments.',
      },
      { type: 'h2', text: 'Measuring AppSec success' },
      {
        type: 'p',
        text:
          'Reduced vulnerabilities in production and faster remediation times are key success metrics.',
      },
    ],
  },
];
