export type ServiceDetail = {
  slug: string;
  title: string;
  category: "Data" | "AI" | "Cloud Operations";
  excerpt: string;
  intro: string;
  summary: string;
  highlights: string[];
  outcomes: string[];
  pillars: { title: string; body: string }[];
};

const serviceCatalog: ServiceDetail[] = [
  {
    slug: "data",
    title: "Data",
    category: "Data",
    excerpt: "Data strategy, governance, and architectures that keep metrics trusted.",
    intro: "Data strategy, governance, and architectures that keep metrics trusted and teams aligned.",
    summary:
      "We establish operating models, stewardship, and semantic layers that turn data into a dependable business asset—so leaders get one version of the truth and teams can move faster.",
    highlights: [
      "Data strategy and operating model tied to business KPIs.",
      "Governance, lineage, and quality baselines for critical datasets.",
      "Semantic models and metrics layers that enable self-serve analytics.",
      "Adoption, training, and value measurement baked into delivery.",
    ],
    outcomes: [
      "Trusted metrics with clear ownership and SLAs.",
      "Faster analytics and decisions with self-serve guardrails.",
      "Reduced rework through standardized models and definitions.",
      "Visibility into value with usage and reliability dashboards.",
    ],
    pillars: [
      {
        title: "Strategy & operating model",
        body: "Target-state design, funding, and delivery rhythms that keep data work tied to business outcomes.",
      },
      {
        title: "Governance & quality",
        body: "Lineage, stewardship, and controls that make critical data reliable at scale.",
      },
      {
        title: "Semantic analytics",
        body: "Unified metrics, models, and BI standards that enable confident self-serve insights.",
      },
    ],
  },
  {
    slug: "data-migration",
    title: "Data Migration",
    category: "Data",
    excerpt: "Move data to modern platforms with zero-trust security and predictable cutovers.",
    intro: "Move data to modern platforms with zero-trust security, predictable cutovers, and cost control.",
    summary:
      "We plan, execute, and validate migrations to lakehouse and cloud platforms, combining automation, quality gates, and rollback plans to keep operations running.",
    highlights: [
      "Assessment, scope, and sequencing to reduce migration risk.",
      "Automated pipelines with validation, reconciliation, and lineage.",
      "Cutover playbooks with rollback and communication plans.",
      "FinOps and performance tuning to manage spend as you scale.",
    ],
    outcomes: [
      "Predictable migrations with minimal downtime.",
      "Validated data with reconciled counts and quality checks.",
      "Lower run costs through tuned storage and compute.",
      "Documented runbooks for future moves and expansions.",
    ],
    pillars: [
      {
        title: "Migration strategy",
        body: "Roadmaps, sequencing, and risk mitigation aligned to business milestones.",
      },
      {
        title: "Automation & quality",
        body: "Pipeline automation, validation, and reconciliation to keep trust high.",
      },
      {
        title: "Cutover readiness",
        body: "Communication, rollback plans, and monitoring for smooth go-lives.",
      },
    ],
  },
  {
    slug: "data-modelling",
    title: "Data Modelling",
    category: "Data",
    excerpt: "Business-aligned models that stay resilient and easy to evolve.",
    intro: "Business-aligned models that stay resilient, governed, and easy to evolve.",
    summary:
      "We design relational and semantic models that mirror real-world entities, support analytics, and keep downstream consumers confident in data definitions.",
    highlights: [
      "Domain-driven modeling aligned to business processes.",
      "Dimensional, semantic, and graph patterns where they fit best.",
      "Model catalogs with ownership, SLAs, and change controls.",
      "Performance and cost tuning for large-scale workloads.",
    ],
    outcomes: [
      "Models that scale with new products and markets.",
      "Fewer breaking changes through versioned contracts.",
      "Clear ownership for datasets and derived products.",
      "Reliable performance for analytics and ML consumers.",
    ],
    pillars: [
      {
        title: "Domain-driven design",
        body: "Models reflect business language and processes, reducing translation gaps.",
      },
      {
        title: "Semantic & metrics layers",
        body: "Reusable definitions that keep BI and ML consistent across teams.",
      },
      {
        title: "Governed change",
        body: "Versioning, review, and observability to keep models stable as they evolve.",
      },
    ],
  },
  {
    slug: "database-optimization-pipelining",
    title: "Database Optimization & Pipelining",
    category: "Data",
    excerpt: "Streamlined pipelines and tuned databases that stay fast under load.",
    intro: "Streamlined pipelines and tuned databases that stay fast under load.",
    summary:
      "We optimize schemas, queries, and pipelines for performance and reliability, adding observability so issues are caught before they impact users.",
    highlights: [
      "Workload analysis, indexing, and partitioning strategies.",
      "Streaming and batch pipelines with SLAs and autoscaling.",
      "Observability for latency, errors, and cost anomalies.",
      "Disaster recovery, backups, and high-availability patterns.",
    ],
    outcomes: [
      "Lower latency for analytics and applications.",
      "Predictable SLAs with automated scaling and alerting.",
      "Reduced run costs through tuned workloads.",
      "Hardened resilience with tested recovery plans.",
    ],
    pillars: [
      {
        title: "Performance engineering",
        body: "Query tuning, caching, and storage patterns tailored to your workloads.",
      },
      {
        title: "Reliable pipelines",
        body: "Idempotent jobs, retries, and monitoring to keep data fresh and accurate.",
      },
      {
        title: "Resilience & recovery",
        body: "Backup, DR, and chaos testing to prove systems work under stress.",
      },
    ],
  },
  {
    slug: "data-platform",
    title: "Data Platform",
    category: "Data",
    excerpt: "Modern lakehouse foundations with security, interoperability, and FinOps baked in.",
    intro: "Modern lakehouse foundations with security, interoperability, and FinOps baked in.",
    summary:
      "We architect and implement cloud data platforms—combining ingestion, storage, governance, and serving layers—so AI and analytics teams can build with confidence.",
    highlights: [
      "Platform blueprints across storage, compute, and governance.",
      "Streaming and batch ingestion with lineage and quality checks.",
      "Interoperability via APIs, event streams, and catalogs.",
      "FinOps dashboards and policies to manage platform spend.",
    ],
    outcomes: [
      "Elastic data platforms ready for AI/ML workloads.",
      "Faster delivery through golden paths and templates.",
      "Improved security posture with least-privilege defaults.",
      "Transparent cost management with enforced budgets.",
    ],
    pillars: [
      {
        title: "Architecture & blueprints",
        body: "Reference designs for storage, compute, governance, and access that accelerate build-out.",
      },
      {
        title: "Interoperability",
        body: "APIs, events, and catalogs that make data discoverable and usable across teams.",
      },
      {
        title: "FinOps & reliability",
        body: "Cost controls, observability, and SRE practices to keep platforms efficient and stable.",
      },
    ],
  },
  {
    slug: "data-centralization",
    title: "Data Centralization",
    category: "Data",
    excerpt: "Bring fragmented data into governed hubs without slowing teams down.",
    intro: "Bring fragmented data into governed hubs without slowing teams down.",
    summary:
      "We consolidate data from legacy, SaaS, and operational systems into unified stores with governance, privacy, and discoverability built in.",
    highlights: [
      "Source system discovery, mapping, and prioritization.",
      "Pipelines for SaaS, on-prem, and streaming sources.",
      "Metadata, lineage, and access controls for shared assets.",
      "Privacy, consent, and retention policies embedded in flows.",
    ],
    outcomes: [
      "Single, trusted hubs for analytics and ML.",
      "Faster onboarding of new sources with reusable patterns.",
      "Reduced shadow IT through governed access and catalogs.",
      "Compliance-ready data with clear retention and consent.",
    ],
    pillars: [
      {
        title: "Source onboarding",
        body: "Repeatable patterns to ingest, validate, and document new data sources.",
      },
      {
        title: "Governed sharing",
        body: "Role-based access, masking, and audit trails that satisfy security and compliance.",
      },
      {
        title: "Privacy by design",
        body: "Consent, retention, and minimization policies enforced in pipelines.",
      },
    ],
  },
  {
    slug: "asset-management",
    title: "Asset Management",
    category: "Data",
    excerpt: "Track, govern, and monetize data and AI assets across the enterprise.",
    intro: "Track, govern, and monetize data and AI assets across the enterprise.",
    summary:
      "We create catalogs, ownership models, and lifecycle management for data and ML assets, ensuring they stay discoverable, compliant, and valuable.",
    highlights: [
      "Asset cataloging with ownership, SLAs, and lineage.",
      "Lifecycle policies for creation, change, and retirement.",
      "Quality, usage, and cost metrics for asset health.",
      "Access governance and licensing for internal or external use.",
    ],
    outcomes: [
      "Full visibility into critical data and AI assets.",
      "Reduced duplication and better reuse across teams.",
      "Compliance-ready assets with clear stewards and controls.",
      "Better ROI tracking for data and model investments.",
    ],
    pillars: [
      {
        title: "Catalog & ownership",
        body: "Clear accountability with stewards, SLAs, and auditability for every asset.",
      },
      {
        title: "Lifecycle management",
        body: "Versioning, change controls, and retirement policies that keep assets healthy.",
      },
      {
        title: "Value & compliance",
        body: "Usage analytics, cost visibility, and licensing to maximize safe reuse.",
      },
    ],
  },
  {
    slug: "data-product-portal",
    title: "Data Product Portal",
    category: "Data",
    excerpt: "A storefront for governed data and AI products with clear ownership and SLAs.",
    intro: "A storefront for governed data and AI products with clear ownership and SLAs.",
    summary:
      "We build portals where teams can discover, request, and integrate data and AI products with confidence—complete with documentation, contracts, and observability.",
    highlights: [
      "Product catalog with documentation, schemas, and examples.",
      "Self-service access requests with policy enforcement.",
      "Usage analytics, reliability, and cost surfaced per product.",
      "Integration patterns for APIs, events, and files.",
    ],
    outcomes: [
      "Faster onboarding to data and AI products.",
      "Reduced one-off integrations through standardized access.",
      "Higher trust with transparent SLAs and reliability metrics.",
      "Better prioritization via product-level usage insights.",
    ],
    pillars: [
      {
        title: "Productized access",
        body: "Reusable contracts and documentation that make data products easy to consume.",
      },
      {
        title: "Governed self-service",
        body: "Policy-driven approvals, masking, and logging for every request.",
      },
      {
        title: "Observability",
        body: "Reliability, latency, and cost visibility at the product level.",
      },
    ],
  },
  {
    slug: "data-mining",
    title: "Data Mining",
    category: "Data",
    excerpt: "Pattern discovery and feature extraction that surface actionable signals.",
    intro: "Pattern discovery and feature extraction that surface actionable signals.",
    summary:
      "We mine structured and unstructured data to uncover patterns, build features, and deliver insights that feed dashboards, decisioning, and ML models.",
    highlights: [
      "Exploratory data analysis and hypothesis generation.",
      "Anomaly detection, clustering, and feature engineering.",
      "Privacy-aware handling of sensitive data during exploration.",
      "Operationalization of insights into dashboards and models.",
    ],
    outcomes: [
      "New revenue and efficiency opportunities grounded in data.",
      "Feature stores that accelerate downstream ML work.",
      "Reduced time-to-insight with reusable notebooks and pipelines.",
      "Compliant exploration with governed access and masking.",
    ],
    pillars: [
      {
        title: "Exploration & discovery",
        body: "Structured and unstructured analysis to surface patterns and hypotheses.",
      },
      {
        title: "Feature engineering",
        body: "Reusable features and signals packaged for analytics and ML teams.",
      },
      {
        title: "Operationalization",
        body: "Dashboards, alerts, and model inputs that turn discoveries into action.",
      },
    ],
  },
  {
    slug: "ai",
    title: "AI",
    category: "AI",
    excerpt: "Strategy, governance, and delivery for AI programs that ship safely.",
    intro: "Strategy, governance, and delivery for AI programs that ship safely and deliver value.",
    summary:
      "We help you prioritize AI use cases, build operating models, and deliver production-grade solutions with responsible AI guardrails from day one.",
    highlights: [
      "Use-case discovery, value sizing, and prioritization.",
      "Responsible AI: policy, privacy, safety, and red-teaming.",
      "Agent design, tool use, and prompt engineering standards.",
      "Operating model, training, and change management for adoption.",
    ],
    outcomes: [
      "A prioritized AI roadmap with measurable value targets.",
      "Reduced risk with governance, evaluation, and rollback plans.",
      "Reusable components that speed up future AI delivery.",
      "Teams enabled to run and improve AI products post-launch.",
    ],
    pillars: [
      {
        title: "Portfolio & roadmap",
        body: "Clear prioritization, business cases, and sequencing to maximize impact.",
      },
      {
        title: "Responsible AI",
        body: "Privacy, safety, fairness, and compliance built into design and delivery.",
      },
      {
        title: "Delivery & adoption",
        body: "Product, engineering, and change practices that get AI into production and kept there.",
      },
    ],
  },
  {
    slug: "data-science",
    title: "Data Science",
    category: "AI",
    excerpt: "Statistical modeling and experimentation to prove value quickly.",
    intro: "Statistical modeling, experimentation, and decision science to prove value quickly.",
    summary:
      "We frame hypotheses, build models, and run experiments that quantify impact—then package the insights into production-ready services.",
    highlights: [
      "Causal inference, forecasting, and optimization models.",
      "Experiment design, A/B testing, and uplift measurement.",
      "Feature stores and notebooks aligned to engineering standards.",
      "Deployment patterns for APIs, batch scoring, and dashboards.",
    ],
    outcomes: [
      "Validated impact with experiment-backed evidence.",
      "Models packaged for repeatable deployment and monitoring.",
      "Faster iteration through standardized tooling and features.",
      "Stakeholders aligned through clear storytelling and visuals.",
    ],
    pillars: [
      {
        title: "Hypothesis to model",
        body: "Well-framed problems, feature pipelines, and rigorous statistical methods.",
      },
      {
        title: "Experimentation",
        body: "Test design, guardrails, and analysis that quantify uplift and risk.",
      },
      {
        title: "Operational analytics",
        body: "APIs, dashboards, and alerts that put data science into daily decisions.",
      },
    ],
  },
  {
    slug: "machine-learning",
    title: "Machine Learning",
    category: "AI",
    excerpt: "Production ML with MLOps, observability, and continuous improvement.",
    intro: "Production ML with MLOps, observability, and continuous improvement.",
    summary:
      "We design, train, and deploy models with CI/CD, monitoring, and retraining loops so ML systems stay reliable and cost-effective over time.",
    highlights: [
      "Model development pipelines with CI/CD and testing.",
      "Monitoring for drift, bias, latency, and cost.",
      "Retraining workflows with human-in-the-loop where needed.",
      "Model registries, approvals, and rollout strategies.",
    ],
    outcomes: [
      "Reliable ML services with clear SLOs and playbooks.",
      "Reduced downtime via automated detection and rollback.",
      "Lower serving costs through optimization and autoscaling.",
      "Audit-ready models with lineage and approvals.",
    ],
    pillars: [
      {
        title: "MLOps foundations",
        body: "Pipelines, registries, and tests that keep models reproducible and deployable.",
      },
      {
        title: "Monitoring & guardrails",
        body: "Drift, bias, and performance observability with alerts and runbooks.",
      },
      {
        title: "Lifecycle management",
        body: "Retraining, canary rollouts, and approvals to manage change safely.",
      },
    ],
  },
  {
    slug: "foundation-models-transfer-learning",
    title: "Foundation Models & Transfer Learning",
    category: "AI",
    excerpt: "Adapt foundation models with efficient fine-tuning and evaluation.",
    intro: "Adapt foundation models with efficient fine-tuning, safety, and evaluation pipelines.",
    summary:
      "We select and adapt foundation models with transfer learning, applying efficient fine-tuning and evaluation to balance quality, latency, and cost.",
    highlights: [
      "Model selection against latency, cost, and license constraints.",
      "Parameter-efficient fine-tuning and domain adaptation.",
      "Evaluation harnesses with qualitative and quantitative metrics.",
      "Safety, privacy, and IP controls for enterprise deployment.",
    ],
    outcomes: [
      "Higher-quality outputs tuned to your domain.",
      "Reduced training cost with efficient fine-tuning methods.",
      "Transparent performance with reproducible evaluation.",
      "Deployment patterns that satisfy security and compliance.",
    ],
    pillars: [
      {
        title: "Model selection",
        body: "Benchmarking models against business and technical constraints.",
      },
      {
        title: "Efficient adaptation",
        body: "PEFT, adapters, and distillation to tune models without runaway cost.",
      },
      {
        title: "Evaluation & safety",
        body: "Automated and human evaluation with safety, privacy, and IP checks.",
      },
    ],
  },
  {
    slug: "computer-vision",
    title: "Computer Vision",
    category: "AI",
    excerpt: "Vision systems for detection, tracking, and quality control across environments.",
    intro: "Vision systems for detection, tracking, and quality control across environments.",
    summary:
      "We build and deploy vision models for inspection, monitoring, and automation—covering data pipelines, labeling, and edge or cloud deployment.",
    highlights: [
      "Data acquisition, labeling, and augmentation pipelines.",
      "Detection, segmentation, and tracking models tuned to your environment.",
      "Edge vs. cloud deployment patterns with latency targets.",
      "Human-in-the-loop review and continuous improvement loops.",
    ],
    outcomes: [
      "Higher accuracy in inspection and monitoring tasks.",
      "Reduced false positives through tailored models and feedback.",
      "Deployments that meet on-site latency and reliability needs.",
      "Operational playbooks for retraining and model updates.",
    ],
    pillars: [
      {
        title: "Data & labeling",
        body: "Collection, labeling, and augmentation pipelines that keep models learning from real-world conditions.",
      },
      {
        title: "Model design",
        body: "Architectures chosen for accuracy, speed, and hardware constraints.",
      },
      {
        title: "Deployment & feedback",
        body: "Edge/cloud deployments with monitoring and human review to improve over time.",
      },
    ],
  },
  {
    slug: "industry-4-0",
    title: "Industry 4.0",
    category: "AI",
    excerpt: "Connected operations with sensors, automation, and predictive intelligence.",
    intro: "Connected operations with sensors, automation, and predictive intelligence.",
    summary:
      "We modernize plants and supply chains with telemetry, analytics, and automation—linking OT and IT to boost uptime and throughput.",
    highlights: [
      "Sensor and IoT data integration with governance and security.",
      "Predictive maintenance, OEE analytics, and anomaly detection.",
      "Workflow automation and alerts in the flow of operations.",
      "Digital twins for scenario testing and optimization.",
    ],
    outcomes: [
      "Higher uptime and throughput with predictive insights.",
      "Reduced scrap and safety incidents through early warnings.",
      "Connected visibility across sites and lines.",
      "Standardized playbooks for new sites and assets.",
    ],
    pillars: [
      {
        title: "Connected data",
        body: "Secure ingestion and normalization of OT/IT data for analytics and AI.",
      },
      {
        title: "Predictive operations",
        body: "Models and dashboards that keep teams ahead of downtime and quality issues.",
      },
      {
        title: "Automation & twins",
        body: "Digital twins, alerts, and automated responses embedded into operations.",
      },
    ],
  },
  {
    slug: "digital-twin",
    title: "Digital Twin",
    category: "AI",
    excerpt: "Virtual replicas of assets and processes to simulate, predict, and optimize.",
    intro: "Virtual replicas of assets and processes to simulate, predict, and optimize.",
    summary:
      "We build digital twins that mirror real-world assets and operations, enabling scenario testing, predictive maintenance, and safer change management.",
    highlights: [
      "Data fusion from sensors, logs, and enterprise systems.",
      "Simulation models for what-if scenarios and capacity planning.",
      "Integration with control systems for feedback and automation.",
      "Visualization and storytelling for operators and leadership.",
    ],
    outcomes: [
      "Reduced downtime through predictive insights.",
      "Better decision-making with tested scenarios before change.",
      "Improved safety and compliance with controlled experiments.",
      "Reusable models for new assets and environments.",
    ],
    pillars: [
      {
        title: "Model fidelity",
        body: "Accurate representations of assets and processes grounded in real telemetry.",
      },
      {
        title: "Simulation & scenarios",
        body: "Stress tests, what-ifs, and capacity planning to guide decisions.",
      },
      {
        title: "Operational integration",
        body: "Dashboards and controls that connect twin insights to real-world actions.",
      },
    ],
  },
  {
    slug: "deep-learning",
    title: "Deep Learning",
    category: "AI",
    excerpt: "Advanced architectures tuned for complex signals, from time series to media.",
    intro: "Advanced architectures tuned for complex signals, from time series to media.",
    summary:
      "We design and train deep learning systems—transformers, CNNs, RNNs, and hybrids—optimized for your data, latency, and deployment constraints.",
    highlights: [
      "Architecture selection and experimentation for your modalities.",
      "Training pipelines with distributed compute and efficient tuning.",
      "Evaluation frameworks to balance quality, speed, and cost.",
      "Serving architectures for real-time or batch scenarios.",
    ],
    outcomes: [
      "State-of-the-art performance on key tasks.",
      "Reduced training and serving costs through optimization.",
      "Reproducible models with clear evaluation evidence.",
      "Deployment patterns that meet latency and reliability goals.",
    ],
    pillars: [
      {
        title: "Architecture & experimentation",
        body: "Systematic testing of architectures against your data and constraints.",
      },
      {
        title: "Training efficiency",
        body: "Data pipelines, distributed training, and optimization to control cost.",
      },
      {
        title: "Serving & monitoring",
        body: "APIs, batching, and observability to keep deep models reliable in production.",
      },
    ],
  },
  {
    slug: "large-language-models-rags",
    title: "Large Language Models & RAGs",
    category: "AI",
    excerpt: "LLM applications with retrieval, grounding, and evaluation built-in.",
    intro: "LLM applications with retrieval, grounding, and evaluation built-in.",
    summary:
      "We build LLM-powered experiences with retrieval-augmented generation, grounding, and tool use—paired with evaluation to keep answers accurate and safe.",
    highlights: [
      "Document processing, chunking, and vector search pipelines.",
      "Prompting, tool use, and orchestration patterns for complex tasks.",
      "Evaluation harnesses for correctness, safety, and latency.",
      "Redaction, access control, and audit logging for sensitive data.",
    ],
    outcomes: [
      "Higher answer quality with grounded, cited responses.",
      "Reduced hallucinations through evaluation and guardrails.",
      "Operational visibility into latency, cost, and usage.",
      "Safer deployments with privacy and compliance controls.",
    ],
    pillars: [
      {
        title: "Retrieval & grounding",
        body: "Pipelines that keep LLMs anchored to trusted, up-to-date data.",
      },
      {
        title: "Orchestration",
        body: "Agent and tool patterns that break down complex tasks reliably.",
      },
      {
        title: "Evaluation & safety",
        body: "Automated checks and human review that measure quality and mitigate risk.",
      },
    ],
  },
  {
    slug: "generative-ai-agentic-ai",
    title: "Generative AI & Agentic AI",
    category: "AI",
    excerpt: "Multi-step AI agents that take action with safety, oversight, and metrics.",
    intro: "Multi-step AI agents that take action with safety, oversight, and metrics.",
    summary:
      "We design agentic systems that plan, call tools, and act across workflows—instrumented with policies, approvals, and telemetry so they stay trustworthy.",
    highlights: [
      "Task decomposition, planning, and multi-tool orchestration.",
      "Guardrails for permissions, approvals, and human-in-the-loop.",
      "Cost, latency, and reliability monitoring per agent and tool.",
      "Change management, training, and adoption support.",
    ],
    outcomes: [
      "Higher automation with measurable quality and safety.",
      "Transparent agent behavior with logs and controls.",
      "Controlled spend with budgets and cost alerts.",
      "Teams equipped to govern and extend agents over time.",
    ],
    pillars: [
      {
        title: "Agent design",
        body: "Planning, memory, and tool strategies tailored to your workflows.",
      },
      {
        title: "Safety & oversight",
        body: "Role-based controls, approvals, and human review for risky steps.",
      },
      {
        title: "Telemetry & improvement",
        body: "Observability, evaluation, and retraining to keep agents performant.",
      },
    ],
  },
  {
    slug: "cloud-operations",
    title: "Cloud Operations",
    category: "Cloud Operations",
    excerpt: "Reliable, cost-aware cloud operations with SRE, security, and FinOps.",
    intro: "Reliable, cost-aware cloud operations with SRE, security, and FinOps.",
    summary:
      "We run and optimize cloud estates with observability, automation, and security—keeping services reliable while controlling spend.",
    highlights: [
      "SRE practices: SLOs, error budgets, and incident response.",
      "Infrastructure as code, automation, and golden paths.",
      "Cost management with budgets, alerts, and right-sizing.",
      "Security hardening, identity, and compliance controls.",
    ],
    outcomes: [
      "Higher reliability with clear SLOs and on-call discipline.",
      "Reduced cloud spend through optimization and governance.",
      "Faster delivery via templates and automated guardrails.",
      "Improved security posture with audited controls.",
    ],
    pillars: [
      {
        title: "SRE foundations",
        body: "SLOs, incident management, and runbooks that keep services healthy.",
      },
      {
        title: "Automation & IaC",
        body: "Golden paths, pipelines, and policy-as-code to standardize delivery.",
      },
      {
        title: "FinOps & security",
        body: "Spend visibility and security baselines aligned to compliance needs.",
      },
    ],
  },
  {
    slug: "microsoft-azure",
    title: "Microsoft Azure",
    category: "Cloud Operations",
    excerpt: "Azure architectures, governance, and operations tuned for data and AI.",
    intro: "Azure architectures, governance, and operations tuned for data and AI workloads.",
    summary:
      "We design and run Azure environments with landing zones, network and identity controls, and platform services optimized for data, analytics, and AI.",
    highlights: [
      "Landing zones with policy, identity, and network baselines.",
      "Azure Data Factory, Synapse, and Fabric implementations.",
      "AKS, App Service, and Functions for app and AI hosting.",
      "Cost and security governance with Azure Monitor and Defender.",
    ],
    outcomes: [
      "Azure estates that pass security and compliance reviews.",
      "Optimized spend with right-sized services and policies.",
      "Reliable data and AI platforms built on Azure best practices.",
      "Faster provisioning through templates and automation.",
    ],
    pillars: [
      {
        title: "Landing zones",
        body: "Policy, identity, and networking foundations that scale safely.",
      },
      {
        title: "Data & AI services",
        body: "Fabric, Synapse, ADF, and AKS patterns tailored to your workloads.",
      },
      {
        title: "Governance & monitoring",
        body: "Cost, security, and operational visibility via Azure-native tooling.",
      },
    ],
  },
  {
    slug: "amazon-web-services-aws",
    title: "Amazon Web Services (AWS)",
    category: "Cloud Operations",
    excerpt: "AWS blueprints for secure, cost-optimized data and AI workloads.",
    intro: "AWS blueprints for secure, cost-optimized data and AI workloads.",
    summary:
      "We build on AWS with secure landing zones, data and AI services, and automation that keep performance high while managing cost and compliance.",
    highlights: [
      "Control Tower, Organizations, and IAM guardrails.",
      "Data platforms on S3, Redshift, Glue, EMR, and Lake Formation.",
      "AI/ML with SageMaker, Bedrock, and containerized workloads.",
      "Observability and FinOps with CloudWatch, X-Ray, and budgets.",
    ],
    outcomes: [
      "Hardened AWS foundations with least-privilege access.",
      "Reliable data/AI stacks tuned for cost and performance.",
      "Faster delivery via IaC and golden patterns.",
      "Clear visibility into spend, reliability, and security posture.",
    ],
    pillars: [
      {
        title: "Foundations",
        body: "Landing zones, IAM, and networking configured for scale and security.",
      },
      {
        title: "Data & AI services",
        body: "Lakehouse, analytics, and ML stacks leveraging AWS managed services.",
      },
      {
        title: "Observability & FinOps",
        body: "Monitoring, tracing, and budgets that keep systems reliable and cost-effective.",
      },
    ],
  },
  {
    slug: "google-cloud-platform-gcp",
    title: "Google Cloud Platform (GCP)",
    category: "Cloud Operations",
    excerpt: "GCP-native data and AI platforms with secure, automated operations.",
    intro: "GCP-native data and AI platforms with secure, automated operations.",
    summary:
      "We design GCP environments leveraging BigQuery, Vertex AI, and GKE—paired with security, networking, and cost governance that scales with your teams.",
    highlights: [
      "Landing zones with IAM, VPC, and org policy baselines.",
      "Analytics on BigQuery with Dataflow, Dataproc, and Pub/Sub.",
      "AI/ML on Vertex AI with MLOps best practices.",
      "Operations, security, and cost visibility via Cloud Monitoring.",
    ],
    outcomes: [
      "Secure, compliant GCP foundations.",
      "High-performance analytics and AI pipelines on GCP services.",
      "Repeatable delivery through Terraform and CI/CD.",
      "Managed cost and reliability with native observability.",
    ],
    pillars: [
      {
        title: "Secure foundations",
        body: "IAM, networking, and org policies that keep environments compliant.",
      },
      {
        title: "Data & AI workloads",
        body: "BigQuery, Dataflow, and Vertex patterns tuned to your needs.",
      },
      {
        title: "Ops & cost control",
        body: "Monitoring, alerting, and budgets to maintain reliability and efficiency.",
      },
    ],
  },
  {
    slug: "databricks",
    title: "Databricks",
    category: "Cloud Operations",
    excerpt: "Lakehouse delivery on Databricks with governance, performance, and ML best practices.",
    intro: "Lakehouse delivery on Databricks with governance, performance, and ML best practices.",
    summary:
      "We implement Databricks platforms with Unity Catalog, Delta, and MLflow—ensuring governance, performance, and operational excellence across data and AI workloads.",
    highlights: [
      "Workspace design, Unity Catalog, and security model setup.",
      "Delta Lake architectures with streaming and batch pipelines.",
      "ML lifecycle with Feature Store, MLflow, and deployment patterns.",
      "Cost optimization for clusters, jobs, and storage.",
    ],
    outcomes: [
      "Governed lakehouse with audited access and lineage.",
      "High-performance pipelines leveraging Delta and Spark.",
      "MLOps practices standardized on Databricks tooling.",
      "Cost-efficient clusters with right-sizing and policies.",
    ],
    pillars: [
      {
        title: "Governance",
        body: "Unity Catalog, access models, and lineage to keep data secure and discoverable.",
      },
      {
        title: "Pipelines & performance",
        body: "Delta architectures, structured streaming, and tuning for reliable throughput.",
      },
      {
        title: "ML lifecycle",
        body: "Experimentation, registry, and deployment patterns with MLflow and Feature Store.",
      },
    ],
  },
  {
    slug: "snowflake",
    title: "Snowflake",
    category: "Cloud Operations",
    excerpt: "Snowflake platforms with data sharing, performance tuning, and governance.",
    intro: "Snowflake platforms with data sharing, performance tuning, and governance.",
    summary:
      "We design Snowflake environments with secure data sharing, performant warehouses, and governance patterns that keep costs in check while enabling AI-ready data.",
    highlights: [
      "Role-based access, masking, and data sharing setups.",
      "Warehouse sizing, clustering, and query optimization.",
      "Snowpark, streams, and tasks for pipelines and ML prep.",
      "Cost governance with monitoring and auto-suspend policies.",
    ],
    outcomes: [
      "Secure, shareable data with governed access controls.",
      "Faster queries with tuned warehouses and clustering.",
      "Pipelines and ML prep powered by Snowpark and tasks.",
      "Controlled spend through visibility and automation.",
    ],
    pillars: [
      {
        title: "Security & sharing",
        body: "Access models, masking, and shares that keep data protected yet usable.",
      },
      {
        title: "Performance",
        body: "Warehouse design and tuning to keep workloads fast and predictable.",
      },
      {
        title: "Ops & cost",
        body: "Monitoring, governance, and automation to prevent cost overruns.",
      },
    ],
  },
  {
    slug: "neo4j",
    title: "Neo4j",
    category: "Cloud Operations",
    excerpt: "Graph solutions on Neo4j for recommendations, fraud, and knowledge graphs.",
    intro: "Graph solutions on Neo4j for recommendations, fraud, and knowledge graphs.",
    summary:
      "We build graph data models and applications on Neo4j—covering data ingestion, Cypher optimization, and integration with analytics and AI workflows.",
    highlights: [
      "Graph schema design and migration from relational sources.",
      "Efficient Cypher queries, indexing, and caching strategies.",
      "Graph algorithms for recommendations, fraud, and entity resolution.",
      "Integration with APIs, BI, and LLM-based retrieval.",
    ],
    outcomes: [
      "Connected insights through graph-first modeling.",
      "Faster queries and lower latency for graph workloads.",
      "Ready-to-use graph features for ML and LLM applications.",
      "Operationalized graphs with monitoring and backup plans.",
    ],
    pillars: [
      {
        title: "Graph modeling",
        body: "Schemas that mirror relationships, enabling performant graph queries.",
      },
      {
        title: "Algorithms & features",
        body: "Built-in graph algorithms and embeddings that power downstream use cases.",
      },
      {
        title: "Integration & ops",
        body: "Pipelines, APIs, and monitoring that keep Neo4j reliable in production.",
      },
    ],
  },
  {
    slug: "dataiku",
    title: "Dataiku",
    category: "Cloud Operations",
    excerpt: "Dataiku platforms with governed projects, MLOps, and collaboration.",
    intro: "Dataiku platforms with governed projects, MLOps, and collaboration.",
    summary:
      "We implement Dataiku to accelerate governed analytics and ML—setting up projects, security, and CI/CD so teams can collaborate safely and ship faster.",
    highlights: [
      "Instance setup with security, roles, and connections.",
      "Project templates, flow standards, and data governance.",
      "MLOps with model registry, evaluation, and deployment patterns.",
      "Integration with git, CI/CD, and observability stacks.",
    ],
    outcomes: [
      "Faster project delivery with standardized templates.",
      "Governed collaboration across data and business teams.",
      "Reliable ML deployment with monitoring and approvals.",
      "Compliance-ready environments with audited access.",
    ],
    pillars: [
      {
        title: "Platform setup",
        body: "Secure instances, roles, and connections configured for your data landscape.",
      },
      {
        title: "Project standards",
        body: "Templates, flows, and governance that keep work consistent and auditable.",
      },
      {
        title: "MLOps",
        body: "Registries, approvals, and monitoring integrated with your CI/CD stack.",
      },
    ],
  },
];

const serviceTypes = new Set<ServiceDetail["category"]>([
  "Data",
  "AI",
  "Cloud Operations",
]);

const isServiceTypeEntry = (service: ServiceDetail): boolean =>
  serviceTypes.has(service.title as ServiceDetail["category"]);

export const services: ServiceDetail[] = serviceCatalog.filter(
  (service) => !isServiceTypeEntry(service),
);

export const homepageFeaturedServices = [
  "data-migration",
  "data-platform",
  "data-product-portal",
  "large-language-models-rags",
  "generative-ai-agentic-ai",
  "microsoft-azure",
];

export const servicesBySlug = services.reduce<Record<string, ServiceDetail>>(
  (acc, service) => {
    acc[service.slug] = service;
    return acc;
  },
  {},
);
