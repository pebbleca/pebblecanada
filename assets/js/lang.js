/**
 * Pebble Canada — Bilingual (EN / FR) Language Switcher
 * Attach data-i18n="key"          → sets textContent
 *      data-i18n-html="key"       → sets innerHTML
 *      data-i18n-placeholder="key"→ sets placeholder attribute
 * Language preference is stored in localStorage.
 */
(function () {
  'use strict';

  /* ─── Translation Dictionary ─────────────────────────────────────────── */
  var T = {
    en: {

      /* ── Accessibility ── */
      'skip-nav': 'Skip to main content',

      /* ── Navigation (shared) ── */
      'nav-home':              'home',
      'nav-home-label':        'Back to home page',
      'nav-technology':        'technology',
      'nav-technology-label':  'Explore our solutions',
      'nav-workforce':         'workforce',
      'nav-workforce-label':   'View our workforce services',
      'nav-defence':           'defence',
      'nav-defence-label':     'Capability overview',
      'nav-logistics':         'logistics',
      'nav-logistics-label':   'Explore our supply solutions',
      'nav-about':             'about',
      'nav-about-label':       'Learn more about us',
      'nav-contact':           'contact',
      'nav-contact-label':     'Get in touch',
      'hamburger-label':       'menu',
      'footer-copy':           'Copyright \u00a9 2026 Pebble CA Inc. All rights reserved.',

      /* ── Index / Home ── */
      'slide1-title':   'Technology <br>Automation &amp; AI',
      'slide1-btn':     'Explore our solutions',
      'slide2-title':   'Workforce &amp;<br>Capability Solutions',
      'slide2-btn':     'View our workforce services',
      'slide3-title':   'Defence &amp;<br>Advanced Systems',
      'slide3-btn':     'Capability overview',
      'slide4-title':   'Logistics &amp;<br>Supply Chain',
      'slide4-btn':     'Explore our supply solutions',
      'swiper-prev':    'prev',
      'swiper-next':    'next',

      /* ── About ── */
      'about-page-header': 'About Pebble Canada',
      'about-page-desc':   'A Canada-focused organization advancing capability across technology, logistics, defence, and workforce.',
      'about-p1':  '<strong>Pebble Canada</strong> is a Canada founded, globally active solutions organization supporting complex programs across technology, logistics and supply chains, defence capability, and workforce delivery for energy and critical minerals.',
      'about-p2':  'Established in <strong>2025</strong>, Pebble Canada was formed to address a recurring gap seen across both public and private sector initiatives: strong strategy and investment intent, but insufficient execution capacity in high consequence operating environments. From day one, the organization was designed around delivery discipline, operational accountability, and the ability to scale capability rapidly across borders and sectors.',
      'about-p3':  'Today, Pebble Canada operates with a <strong>global footprint</strong>, supported by a network of <strong>hundreds of consultants, specialists, and delivery professionals</strong> spanning North America, Europe, Asia, and emerging markets. This distributed model allows us to deploy the right expertise at the right time, while maintaining centralized governance, quality control, and client accountability.',
      'about-p4':  'We work with government organizations, prime contractors, infrastructure developers, energy operators, manufacturers, and technology providers who operate under real constraints: regulatory oversight, security expectations, labour shortages, supply chain volatility, and tight delivery timelines. Our role is to convert complexity into structured, auditable, and repeatable execution.',
      'about-pillars-h3':  'Our Four Pillars',
      'about-tech-h4':     'Technology, Automation &amp; AI',
      'about-tech-p1':     'Pebble Canada delivers applied technology solutions focused on operational enablement rather than experimentation. Our work spans automation, data platforms, analytics, and AI driven decision support, implemented with security, governance, and adoption in mind.',
      'about-tech-p2':     'We help organizations modernize systems, improve visibility, and reduce manual overhead while ensuring technology aligns with regulatory, privacy, and operational realities.',
      'about-log-h4':      'Logistics &amp; Supply Chain',
      'about-log-p1':      'We design and operate resilient supply chains for trade exposed, infrastructure heavy, and mission critical environments. Our logistics capability supports procurement, international trade corridors, supplier diversification, and end to end delivery coordination.',
      'about-log-p2':      'Pebble Canada emphasizes traceability, continuity planning, and execution visibility to support both operational performance and stakeholder confidence.',
      'about-def-h4':      'Defence &amp; Advanced Systems',
      'about-def-p1':      'Pebble Canada supports defence readiness through structured procurement support, sustainment coordination, and advanced capability integration. Engagements range from essential equipment and services through emerging systems and platforms.',
      'about-def-p2':      'Our approach reflects the realities of defence environments: interoperability requirements, security constraints, lifecycle planning, and compliance driven delivery.',
      'about-wf-h4':       'Workforce &amp; Capability Solutions',
      'about-wf-p1':       'We deliver workforce and capability solutions for energy, oil, and critical minerals across exploration, construction, operations, and downstream activities. This includes skilled labour deployment, technical specialists, and project based workforce mobilization.',
      'about-wf-p2':       'Pebble Canada integrates workforce planning with safety standards, labour compliance, and operational continuity to support long term capability, not just short term staffing.',
      'about-how-h3':      'How We Operate',
      'about-how-p1':      'Pebble Canada operates with a delivery model designed for environments where scrutiny is high and failure is not an option. Our operating principles are consistent across sectors and geographies.',
      'about-how-li1':     'Centralized governance with distributed execution',
      'about-how-li2':     'Compliance aware delivery aligned to regulatory and contractual obligations',
      'about-how-li3':     'Security, privacy, and data discipline embedded by design',
      'about-how-li4':     'Clear reporting, audit readiness, and documentation standards',
      'about-how-li5':     'Long term partnerships built on performance and trust',
      'about-eval-h3':     'What Clients and Partners Evaluate',
      'about-eval-p1':     'Organizations engaging Pebble Canada often conduct extensive background research and due diligence. Our structure, processes, and documentation are designed to support common evaluation criteria across public and private sector engagements.',
      'about-eval-li1':    'Governance, accountability, and escalation frameworks',
      'about-eval-li2':    'Supply chain integrity, vendor due diligence, and continuity planning',
      'about-eval-li3':    'Workforce screening, safety practices, and role based deployment',
      'about-eval-li4':    'Information handling, access control, and responsible data use',
      'about-eval-li5':    'Quality assurance, performance tracking, and delivery transparency',
      'about-eval-p2':     'Pebble Canada exists to be a dependable execution partner in environments where outcomes matter, reputations are on the line, and delivery must stand up to scrutiny long after project completion.',

      /* ── Technology ── */
      'tech-page-header':  'Technology, Automation &amp; AI',
      'tech-page-desc':    'Applied AI and automation built for measurable outcomes in Canada.',
      'tech-p1':           '<strong>Pebble Canada</strong> delivers technology, automation, and artificial intelligence solutions that strengthen Canadian productivity, operational resilience, and digital capability in regulated and mission critical environments.',
      'tech-whatwedo-h3':  'What We Do',
      'tech-whatwedo-p1':  'We design and implement applied AI and automation that integrates with existing systems to reduce manual workload, improve decision quality, and create repeatable operational performance. Our work emphasizes responsible and secure AI adoption aligned with Canadian expectations around privacy, governance, and resilience.',
      'tech-ai-h4':        'AI transformation',
      'tech-ai-p1':        'AI foundations, AI agents, and intelligent automation programs that move from pilots to operational value with clear governance and control.',
      'tech-edp-h4':       'Enterprise data platform',
      'tech-edp-p1':       'Centralized data platforms that strengthen governance, improve scalability, and enable faster, more confident decision making.',
      'tech-dew-h4':       'Data engineering and warehousing',
      'tech-dew-p1':       'Data integration, processing, and storage solutions that make analytics reliable and ready for AI driven workflows.',
      'tech-rd-h4':        'Reporting and dashboards',
      'tech-rd-p1':        'Interactive dashboards that convert complex operational data into clear insight and action for teams and leaders.',
      'tech-sel-h3':       'Selected Work and Services',
      'tech-pebbleai-p1':  'Enterprise services spanning AI transformation, data platforms, data engineering, warehousing, data management, reporting and dashboards, and training, delivered on the Microsoft technology stack.',
      'tech-mbc-p1':       'A marketplace initiative that connects customers to Canadian made products and businesses, strengthening domestic supplier discovery and participation.',
      'tech-eco-h3':       "Aligned with Canada\u2019s AI Ecosystem Priorities",
      'tech-eco-p1':       "Pebble Canada aligns its delivery approach with the Government of Canada\u2019s direction for a strong, trusted, and adoption driven artificial intelligence ecosystem. We support practical AI deployment in organisations, responsible governance, and secure implementation that can scale across programmes and major projects.",
      'tech-adopt-h4':     'AI adoption and productivity',
      'tech-adopt-p1':     'Applied AI and automation that moves beyond pilots into operational use, strengthening productivity, service delivery, and decision support in regulated environments.',
      'tech-trust-h4':     'Trust, safety, and governance',
      'tech-trust-p1':     'Governance oriented delivery that emphasizes transparency, risk management, and accountability, aligned with emerging Canadian expectations for trustworthy AI systems.',
      'tech-dom-h4':       'Domestic capability and sovereign compute awareness',
      'tech-dom-p1':       'Architecture and delivery practices that support Canadian capability building and readiness for domestic AI compute and infrastructure initiatives, helping clients plan for secure and scalable AI.',
      'tech-sc-h4':        'AI for supply chains and industry',
      'tech-sc-p1':        'Operational analytics and automation that strengthen supply chain visibility and performance, aligned with Canada\u2019s adoption focus across key industries.',
      'tech-outcomes-h3':  'Outcomes',
      'tech-outcome1':     'Responsible and secure AI adoption',
      'tech-outcome2':     'Automation that improves productivity and service delivery',
      'tech-outcome3':     'Data visibility that strengthens planning and oversight',
      'tech-outcome4':     'Canadian capability building through practical delivery',

      /* ── Workforce ── */
      'wf-page-header':    'Workforce &amp; Capability Solutions',
      'wf-page-desc':      'Skilled labour readiness for energy, rare earth, and critical minerals.',
      'wf-p1':             '<strong>Pebble Canada</strong> delivers workforce and capability solutions supporting the Canadian energy sector and the rare earth and critical minerals value chain. We enable skilled labour readiness and operational capacity in high compliance, remote, and project driven environments.',
      'wf-readiness-h3':   'Energy and Critical Minerals Workforce Readiness',
      'wf-readiness-p1':   'We support workforce planning and deployment across extraction, processing, logistics, and supporting infrastructure. Our approach aligns skills, roles, and readiness with operational requirements and Canadian expectations for safety, compliance, and performance.',
      'wf-sld-h4':         'Skilled labour deployment',
      'wf-sld-p1':         'Deployment models that support project execution and ongoing operations, including remote and rotational environments.',
      'wf-wp-h4':          'Workforce planning',
      'wf-wp-p1':          'Role planning and capability alignment to support productivity, safety, and reliability through the project lifecycle.',
      'wf-sc-h4':          'Safety and compliance',
      'wf-sc-p1':          'Workforce support shaped by Canadian regulatory, safety, and site standards appropriate for energy and resource operations.',
      'wf-cm-h4':          'Critical minerals capability',
      'wf-cm-p1':          'Support for workforce capacity across strategic resource supply chains including rare earth minerals and critical minerals projects.',
      'wf-offshore-h3':    'Offshore Subcontract Workforce Model',
      'wf-offshore-p1':    'Pebble Canada also provides offshore subcontract workforce solutions designed to support Canadian energy, infrastructure, and critical minerals projects through scalable and compliant labour supply. Our model enables clients to access qualified personnel efficiently while maintaining operational control, safety standards, and regulatory compliance.',
      'wf-offshore-p2':    'We work alongside prime contractors and workforce partners to supply pre vetted, certified, and deployment ready personnel across a range of operational roles. This approach allows organisations to respond quickly to project demand, seasonal surges, and specialised skill requirements without increasing long term fixed overhead.',
      'wf-sub-h4':         'Subcontract workforce deployment',
      'wf-sub-p1':         'Flexible subcontract staffing models supporting short term, rotational, and long term project needs across energy and resource operations.',
      'wf-rv-h4':          'Recruitment and vetting',
      'wf-rv-p1':          'Workforce screening, credential verification, and compliance checks aligned with Canadian safety, labour, and site requirements.',
      'wf-remote-h4':      'Remote and high compliance readiness',
      'wf-remote-p1':      'Personnel prepared for remote, industrial, and high compliance environments, including rotation based deployments and site specific standards.',
      'wf-wms-h4':         'Workforce management support',
      'wf-wms-p1':         'Mobilisation coordination, readiness planning, and ongoing workforce support to ensure continuity, performance, and alignment with project objectives.',
      'wf-where-h3':       'Where We Support',
      'wf-where1':         'Oil and gas, power, and emerging energy projects',
      'wf-where2':         'Rare earth minerals and critical minerals mining and processing',
      'wf-where3':         'Resource logistics and supporting infrastructure',
      'wf-where4':         'Remote and northern operations where readiness matters',

      /* ── Workforce — International Delivery Capability ── */
      'wf-partner-h3':         'International Workforce Delivery Capability',
      'wf-partner-p1':         'Pebble Canada extends its workforce delivery capability across international corridors through specialist partnerships with over three decades of operational experience in energy, construction, and resource sector deployment. This capability supports Canadian-led projects requiring skilled and semi-skilled labour at scale, across a broad range of trade categories and operational environments.',
      'wf-partner-p2':         'Through established delivery partnerships, Pebble Canada provides access to an active candidate database of over <strong>13,000 vetted professionals</strong> across skilled and semi-skilled trade categories, with delivery pipelines spanning South Asia, the Middle East, and North Africa. The underlying recruitment infrastructure is built around compliance, credential verification, and rapid mobilization \u2014 aligned with the operational standards that Canadian energy and resource projects require.',
      'wf-partner-proj1-h4':   'Energy sector workforce programs',
      'wf-partner-proj1-p':    'Workforce mobilization for gas transmission, power generation, and downstream energy infrastructure, including operations, maintenance, and technical support roles across project and operational phases.',
      'wf-partner-proj2-h4':   'Construction and civil infrastructure',
      'wf-partner-proj2-p':    'Labour supply for large-scale civil, structural, and mechanical construction programs, covering a broad range of certified trades from rigging and welding to instrumentation and heavy equipment operation.',
      'wf-partner-proj3-h4':   'Mining and resource extraction',
      'wf-partner-proj3-p':    'Skilled workforce support for mineral extraction, processing, and site operations — including roles across subsurface, surface, and logistics functions in remote and technically demanding environments.',
      'wf-partner-proj4-h4':   'International corridor delivery',
      'wf-partner-proj4-p':    'End-to-end workforce coordination for projects operating across multiple jurisdictions, with compliance, mobilization, and documentation support aligned to international labour and immigration requirements.',

      /* ── Defence ── */
      'def-page-header':   'Defence &amp; Advanced Systems',
      'def-page-desc':     'From essential procurement to advanced drone enabled capability.',
      'def-p1':            '<strong>Pebble Canada</strong> supports defence readiness as a supply and delivery partner across a full spectrum of requirements, from essential procurement and field support items to advanced systems and emerging technologies. Our focus is to be solicitation ready for Government of Canada opportunities and to deliver reliably at scale for major programmes and operational needs.',
      'def-core-h3':       'From Core Procurement to Advanced Capability',
      'def-core-p1':       'We support requirements ranging from uniforms and foundational equipment to systems integration and drone enabled capability. We align our approach with tendering practices and common solicitation formats such as Invitation to Tender, Request for Proposal, and Request for Quotation, with the documentation discipline needed to respond to mandatory requirements, evaluation criteria, and delivery schedules.',
      'def-ufg-h4':        'Uniforms and field gear',
      'def-ufg-p1':        'Procurement support for uniforms, apparel, field equipment, and operational support items focused on quality, reliability, and fit for purpose.',
      'def-oss-h4':        'Operational support and sustainment',
      'def-oss-p1':        'Supply and coordination for readiness enabling items and systems that support training, logistics, and sustainment needs.',
      'def-asi-h4':        'Advanced systems integration',
      'def-asi-p1':        'Integration oriented support for modern systems with emphasis on interoperability, reliability, and lifecycle considerations.',
      'def-duc-h4':        'Drone and unmanned capability',
      'def-duc-p1':        'Support for unmanned and autonomous solutions including drone technology for surveillance, training, logistics support, and operational use cases.',
      'def-readiness-h3':  'Procurement Readiness',
      'def-readiness-p1':  'Pebble Canada structures its defence work to support competitive bidding and contract delivery. We can participate in opportunities published through SAP Ariba and respond to solicitation documents with disciplined schedules, compliance tracking, and clear deliverables. Where appropriate, we can support subcontracting, teaming, and prime contractor execution models.',
      'def-srs-h4':        'Solicitation response support',
      'def-srs-p1':        'Bid preparation inputs including compliance matrices, requirement traceability, submission checklists, and supporting documentation for technical and management criteria.',
      'def-sosa-h4':       'Standing offers and supply arrangements',
      'def-sosa-p1':       'Support for recurring procurement models including standing offers and supply arrangements, with the ability to fulfil call ups and deliver consistent service levels across repeat requirements.',
      'def-ssf-h4':        'Scalable supply fulfilment',
      'def-ssf-p1':        'Scalable sourcing, warehousing coordination, and delivery planning to support large orders, staged rollouts, and multi location distribution.',
      'def-sci-h4':        'Supply chain integrity',
      'def-sci-p1':        'Vendor coordination, inspection readiness, and traceable documentation to support quality, acceptance, and sustainment requirements over the contract lifecycle.',
      'def-cc-h3':         'Capability Coverage',
      'def-cc-p1':         'We support a wide range of defence procurement needs, including uniforms, apparel, field gear, operational equipment, logistics enabling items, and advanced systems. For unmanned and autonomous solutions, we support integration oriented use cases such as surveillance, training, logistics support, and operational enablement, with an emphasis on reliability, interoperability, and compliant delivery.',
      'def-principles-h3': 'Our Delivery Principles',
      'def-principle1':    'Procurement-compliant delivery and bid readiness aligned with Government of Canada standards',
      'def-principle2':    'Clear compliance documentation and evaluation criteria alignment',
      'def-principle3':    'System interoperability and seamless operational integration',
      'def-principle4':    'Lifecycle sustainment planning and technology upgrade pathways',
      'def-principle5':    'Secure operations and comprehensive supply chain integrity',
      'def-principle6':    'Quality assurance and acceptance readiness at every stage',

      /* ── Logistics ── */
      'log-page-header':   'Logistics &amp; Supply Chain',
      'log-page-desc':     'International trade focused supply chain resilience and coordination.',
      'log-p1':            '<strong>Pebble Canada</strong> provides supply chain and logistics solutions built around international trade, enabling Canadian organisations to move goods and materials reliably across global corridors and complex markets. We support trade expansion westward into Europe and eastward into Asia, including China, by improving continuity, visibility, and delivery performance across long distance routes.',
      'log-intl-h3':       'International Trade Focused Supply Chains',
      'log-intl-p1':       'We support end to end coordination across sourcing, multimodal transport, warehousing, distribution, and trade documentation. Our objective is to improve visibility, continuity, and resilience across routes connecting Canada with European markets and Indo-Pacific trade corridors, including Asia and China, while maintaining the documentation discipline required for cross border trade.',
      'log-tcp-h4':        'Trade corridor planning',
      'log-tcp-p1':        'Route and modality planning across air, ocean, and multimodal networks designed to reduce disruption and improve delivery performance.',
      'log-sup-h4':        'Supplier coordination',
      'log-sup-p1':        'Supplier and vendor coordination that supports predictable lead times, quality assurance, and continuity for international sourcing.',
      'log-cr-h4':         'Continuity and resilience',
      'log-cr-p1':         'Operational continuity planning that accounts for global volatility, capacity constraints, and dependency risks.',
      'log-vr-h4':         'Visibility and reporting',
      'log-vr-p1':         'Digital visibility approaches that support tracking, performance monitoring, and faster issue resolution across supply networks.',
      'log-corridors-h3':  'Trade Expansion Corridors: Europe and Asia',
      'log-corridors-p1':  "Pebble Canada supports Canada\u2019s trade diversification objectives by strengthening the logistics and supply chain foundations required for reliable global trade. As Canada expands commercial engagement across Europe and re engages key overseas markets, including China, we help organizations design, adapt, and operate resilient supply chains that reduce single market dependency. Pebble Canada provides end to end logistics coordination, supplier diversification support, and trade ready supply chain execution, ensuring goods, services, and technologies move efficiently, compliantly, and securely across borders in support of Canada\u2019s evolving trade relationships.",
      'log-west-h4':       'Westbound: Europe market access',
      'log-west-p1':       'Support for Europe facing movements through ocean and air freight networks, with coordination across suppliers, freight forwarders, ports, and distribution partners. We help clients manage longer transit cycles, tighter delivery windows, and complex documentation so outbound trade can scale with confidence.',
      'log-east-h4':       'Eastbound: Asia and China corridors',
      'log-east-p1':       'Logistics coordination for Indo-Pacific supply chains, including high volume sourcing and export lanes connected to China. We focus on continuity planning, capacity management, and rapid exception handling to reduce disruption risk and protect schedule integrity for international customers.',
      'log-tdr-h4':        'Trade documentation readiness',
      'log-tdr-p1':        'Process readiness that supports consistent commercial documentation workflows, shipment visibility, and proactive coordination with carriers and partners to reduce avoidable delays and shipment holds.',
      'log-vctr-h4':       'Visibility and control tower reporting',
      'log-vctr-p1':       'Practical reporting and escalation pathways that help teams track shipments, monitor performance, and resolve issues early across multi jurisdiction routes, including ocean, air, and multimodal moves.',
      'log-focus-h3':      'Core Focus Areas',
      'log-focus1':        'International logistics coordination across ocean and air freight',
      'log-focus2':        'Supply chain planning and performance monitoring',
      'log-focus3':        'Trade documentation readiness and operational support',
      'log-focus4':        'Inventory strategy and continuity planning',
      'log-focus5':        'Supplier diversification and dependency risk reduction',

      /* ── Contact ── */
      'contact-page-header': "Let\u2019s work together",
      'contact-page-desc':   'Reach out to explore partnerships across our four pillars.',
      'contact-office-h6':   'the office',
      'contact-tel-h6':      'telephone',
      'contact-email-h6':    'email',
      'contact-form-h6':     'Get in touch',
      'contact-name-ph':      'Your name',
      'contact-email-ph':     'Email address',
      'contact-subject-ph':   'Subject',
      'contact-message-ph':   'Your message',
      'contact-send':         'Send',
      'contact-name-label':   'Your name',
      'contact-email-label':  'Email address',
      'contact-subject-label':'Subject',
      'contact-message-label':'Your message'
    },

    fr: {

      /* ── Accessibility ── */
      'skip-nav': 'Passer au contenu principal',

      /* ── Navigation (shared) ── */
      'nav-home':              'accueil',
      'nav-home-label':        "Retour \u00e0 l\u2019accueil",
      'nav-technology':        'technologie',
      'nav-technology-label':  'D\u00e9couvrez nos solutions',
      'nav-workforce':         "main-d\u2019\u0153uvre",
      'nav-workforce-label':   "Voir nos services de main-d\u2019\u0153uvre",
      'nav-defence':           'd\u00e9fense',
      'nav-defence-label':     'Aper\u00e7u des capacit\u00e9s',
      'nav-logistics':         'logistique',
      'nav-logistics-label':   "D\u00e9couvrez nos solutions d\u2019approvisionnement",
      'nav-about':             '\u00e0 propos',
      'nav-about-label':       'En savoir plus sur nous',
      'nav-contact':           'contact',
      'nav-contact-label':     'Nous contacter',
      'hamburger-label':       'menu',
      'footer-copy':           'Copyright \u00a9 2026 Pebble CA Inc. Tous droits r\u00e9serv\u00e9s.',

      /* ── Index / Home ── */
      'slide1-title':   'Technologie <br>Automatisation et IA',
      'slide1-btn':     'D\u00e9couvrez nos solutions',
      'slide2-title':   "Main-d\u2019\u0153uvre &amp;<br>Solutions de capacit\u00e9",
      'slide2-btn':     "Voir nos services de main-d\u2019\u0153uvre",
      'slide3-title':   'D\u00e9fense &amp;<br>Syst\u00e8mes avanc\u00e9s',
      'slide3-btn':     'Aper\u00e7u des capacit\u00e9s',
      'slide4-title':   "Logistique &amp;<br>Cha\u00eene d\u2019approvisionnement",
      'slide4-btn':     "D\u00e9couvrez nos solutions d\u2019approvisionnement",
      'swiper-prev':    'pr\u00e9c',
      'swiper-next':    'suiv',

      /* ── About ── */
      'about-page-header': '\u00c0 propos de Pebble Canada',
      'about-page-desc':   "Une organisation ax\u00e9e sur le Canada, d\u00e9veloppant des capacit\u00e9s en technologie, logistique, d\u00e9fense et main-d\u2019\u0153uvre.",
      'about-p1':  "<strong>Pebble Canada</strong> est une organisation de solutions fond\u00e9e au Canada, active \u00e0 l\u2019\u00e9chelle mondiale, soutenant des programmes complexes en technologie, logistique et cha\u00eenes d\u2019approvisionnement, capacit\u00e9s de d\u00e9fense, et d\u00e9ploiement de main-d\u2019\u0153uvre pour l\u2019\u00e9nergie et les min\u00e9raux critiques.",
      'about-p2':  "Fond\u00e9e en <strong>2025</strong>, Pebble Canada a \u00e9t\u00e9 cr\u00e9\u00e9e pour combler un \u00e9cart r\u00e9current observ\u00e9 dans les initiatives des secteurs public et priv\u00e9\u00a0: une strat\u00e9gie solide et une intention d\u2019investissement, mais une capacit\u00e9 d\u2019ex\u00e9cution insuffisante dans des environnements op\u00e9rationnels \u00e0 enjeux \u00e9lev\u00e9s. D\u00e8s le premier jour, l\u2019organisation a \u00e9t\u00e9 con\u00e7ue autour de la discipline de livraison, de la responsabilit\u00e9 op\u00e9rationnelle et de la capacit\u00e9 \u00e0 d\u00e9ployer rapidement des ressources \u00e0 travers les fronti\u00e8res et les secteurs.",
      'about-p3':  "Aujourd\u2019hui, Pebble Canada op\u00e8re avec une <strong>pr\u00e9sence mondiale</strong>, soutenue par un r\u00e9seau de <strong>centaines de consultants, sp\u00e9cialistes et professionnels de la livraison</strong> couvrant l\u2019Am\u00e9rique du Nord, l\u2019Europe, l\u2019Asie et les march\u00e9s \u00e9mergents. Ce mod\u00e8le distribu\u00e9 nous permet de d\u00e9ployer la bonne expertise au bon moment, tout en maintenant une gouvernance centralis\u00e9e, un contr\u00f4le de la qualit\u00e9 et une responsabilit\u00e9 envers les clients.",
      'about-p4':  "Nous travaillons avec des organisations gouvernementales, des entrepreneurs principaux, des d\u00e9veloppeurs d\u2019infrastructure, des op\u00e9rateurs d\u2019\u00e9nergie, des fabricants et des fournisseurs de technologie qui op\u00e8rent sous de vraies contraintes\u00a0: surveillance r\u00e9glementaire, exigences de s\u00e9curit\u00e9, p\u00e9nuries de main-d\u2019\u0153uvre, volatilit\u00e9 des cha\u00eenes d\u2019approvisionnement et d\u00e9lais de livraison serr\u00e9s. Notre r\u00f4le est de convertir la complexit\u00e9 en une ex\u00e9cution structur\u00e9e, auditable et reproductible.",
      'about-pillars-h3':  'Nos quatre piliers',
      'about-tech-h4':     'Technologie, Automatisation et IA',
      'about-tech-p1':     "Pebble Canada fournit des solutions technologiques appliqu\u00e9es ax\u00e9es sur l\u2019activation op\u00e9rationnelle plut\u00f4t que sur l\u2019exp\u00e9rimentation. Notre travail couvre l\u2019automatisation, les plateformes de donn\u00e9es, l\u2019analyse et le support d\u00e9cisionnel bas\u00e9 sur l\u2019IA, mis en \u0153uvre avec la s\u00e9curit\u00e9, la gouvernance et l\u2019adoption \u00e0 l\u2019esprit.",
      'about-tech-p2':     "Nous aidons les organisations \u00e0 moderniser leurs syst\u00e8mes, am\u00e9liorer la visibilit\u00e9 et r\u00e9duire la charge manuelle tout en veillant \u00e0 ce que la technologie s\u2019aligne sur les r\u00e9alit\u00e9s r\u00e9glementaires, de confidentialit\u00e9 et op\u00e9rationnelles.",
      'about-log-h4':      "Logistique et cha\u00eene d\u2019approvisionnement",
      'about-log-p1':      "Nous concevons et op\u00e9rons des cha\u00eenes d\u2019approvisionnement r\u00e9silientes pour des environnements expos\u00e9s au commerce, \u00e0 forte infrastructure et \u00e0 mission critique. Notre capacit\u00e9 logistique soutient l\u2019approvisionnement, les corridors commerciaux internationaux, la diversification des fournisseurs et la coordination de livraison de bout en bout.",
      'about-log-p2':      "Pebble Canada met l\u2019accent sur la tra\u00e7abilit\u00e9, la planification de la continuit\u00e9 et la visibilit\u00e9 de l\u2019ex\u00e9cution pour soutenir \u00e0 la fois la performance op\u00e9rationnelle et la confiance des parties prenantes.",
      'about-def-h4':      'D\u00e9fense et syst\u00e8mes avanc\u00e9s',
      'about-def-p1':      "Pebble Canada soutient la pr\u00e9paration \u00e0 la d\u00e9fense gr\u00e2ce \u00e0 un soutien \u00e0 l\u2019approvisionnement structur\u00e9, une coordination de soutien et une int\u00e9gration de capacit\u00e9s avanc\u00e9es. Les engagements vont des \u00e9quipements et services essentiels aux syst\u00e8mes et plateformes \u00e9mergents.",
      'about-def-p2':      "Notre approche refl\u00e8te les r\u00e9alit\u00e9s des environnements de d\u00e9fense\u00a0: exigences d\u2019interop\u00e9rabilit\u00e9, contraintes de s\u00e9curit\u00e9, planification du cycle de vie et livraison ax\u00e9e sur la conformit\u00e9.",
      'about-wf-h4':       "Main-d\u2019\u0153uvre et solutions de capacit\u00e9",
      'about-wf-p1':       "Nous fournissons des solutions de main-d\u2019\u0153uvre et de capacit\u00e9 pour l\u2019\u00e9nergie, le p\u00e9trole et les min\u00e9raux critiques \u00e0 travers l\u2019exploration, la construction, les op\u00e9rations et les activit\u00e9s en aval. Cela comprend le d\u00e9ploiement de main-d\u2019\u0153uvre qualifi\u00e9e, de sp\u00e9cialistes techniques et la mobilisation de main-d\u2019\u0153uvre bas\u00e9e sur des projets.",
      'about-wf-p2':       "Pebble Canada int\u00e8gre la planification des effectifs avec les normes de s\u00e9curit\u00e9, la conformit\u00e9 du travail et la continuit\u00e9 op\u00e9rationnelle pour soutenir une capacit\u00e9 \u00e0 long terme, pas seulement une dotation \u00e0 court terme.",
      'about-how-h3':      'Comment nous op\u00e9rons',
      'about-how-p1':      "Pebble Canada op\u00e8re avec un mod\u00e8le de livraison con\u00e7u pour les environnements o\u00f9 l\u2019examen est rigoureux et l\u2019\u00e9chec n\u2019est pas une option. Nos principes op\u00e9rationnels sont coh\u00e9rents \u00e0 travers les secteurs et les g\u00e9ographies.",
      'about-how-li1':     'Gouvernance centralis\u00e9e avec ex\u00e9cution distribu\u00e9e',
      'about-how-li2':     'Livraison conforme aux r\u00e9glementations, align\u00e9e sur les obligations contractuelles',
      'about-how-li3':     'S\u00e9curit\u00e9, confidentialit\u00e9 et discipline des donn\u00e9es int\u00e9gr\u00e9es par conception',
      'about-how-li4':     'Rapports clairs, pr\u00e9paration aux audits et normes de documentation',
      'about-how-li5':     'Partenariats \u00e0 long terme fond\u00e9s sur la performance et la confiance',
      'about-eval-h3':     "Ce qu\u2019\u00e9valuent les clients et partenaires",
      'about-eval-p1':     "Les organisations engageant Pebble Canada effectuent souvent des recherches approfondies et une diligence raisonnable. Notre structure, nos processus et notre documentation sont con\u00e7us pour soutenir les crit\u00e8res d\u2019\u00e9valuation communs dans les engagements des secteurs public et priv\u00e9.",
      'about-eval-li1':    'Cadres de gouvernance, de responsabilit\u00e9 et d\u2019escalade',
      'about-eval-li2':    "Int\u00e9grit\u00e9 de la cha\u00eene d\u2019approvisionnement, diligence raisonnable des fournisseurs et planification de la continuit\u00e9",
      'about-eval-li3':    "S\u00e9lection de la main-d\u2019\u0153uvre, pratiques de s\u00e9curit\u00e9 et d\u00e9ploiement bas\u00e9 sur les r\u00f4les",
      'about-eval-li4':    "Gestion de l\u2019information, contr\u00f4le d\u2019acc\u00e8s et utilisation responsable des donn\u00e9es",
      'about-eval-li5':    'Assurance qualit\u00e9, suivi des performances et transparence de la livraison',
      'about-eval-p2':     "Pebble Canada existe pour \u00eatre un partenaire d\u2019ex\u00e9cution fiable dans des environnements o\u00f9 les r\u00e9sultats comptent, les r\u00e9putations sont en jeu et la livraison doit r\u00e9sister \u00e0 l\u2019examen bien apr\u00e8s l\u2019ach\u00e8vement du projet.",

      /* ── Technology ── */
      'tech-page-header':  'Technologie, Automatisation et IA',
      'tech-page-desc':    'IA appliqu\u00e9e et automatisation pour des r\u00e9sultats mesurables au Canada.',
      'tech-p1':           "<strong>Pebble Canada</strong> fournit des solutions de technologie, d\u2019automatisation et d\u2019intelligence artificielle qui renforcent la productivit\u00e9 canadienne, la r\u00e9silience op\u00e9rationnelle et les capacit\u00e9s num\u00e9riques dans des environnements r\u00e9glement\u00e9s et \u00e0 mission critique.",
      'tech-whatwedo-h3':  'Ce que nous faisons',
      'tech-whatwedo-p1':  "Nous concevons et mettons en \u0153uvre de l\u2019IA appliqu\u00e9e et de l\u2019automatisation qui s\u2019int\u00e8grent aux syst\u00e8mes existants pour r\u00e9duire la charge de travail manuelle, am\u00e9liorer la qualit\u00e9 des d\u00e9cisions et cr\u00e9er une performance op\u00e9rationnelle reproductible. Notre travail met l\u2019accent sur l\u2019adoption responsable et s\u00e9curis\u00e9e de l\u2019IA, align\u00e9e sur les attentes canadiennes en mati\u00e8re de confidentialit\u00e9, de gouvernance et de r\u00e9silience.",
      'tech-ai-h4':        "Transformation par l\u2019IA",
      'tech-ai-p1':        "Fondations d\u2019IA, agents d\u2019IA et programmes d\u2019automatisation intelligente qui passent des projets pilotes \u00e0 la valeur op\u00e9rationnelle avec une gouvernance et un contr\u00f4le clairs.",
      'tech-edp-h4':       "Plateforme de donn\u00e9es d\u2019entreprise",
      'tech-edp-p1':       'Plateformes de donn\u00e9es centralis\u00e9es qui renforcent la gouvernance, am\u00e9liorent la scalabilit\u00e9 et permettent une prise de d\u00e9cision plus rapide et plus confiante.',
      'tech-dew-h4':       "Ing\u00e9nierie des donn\u00e9es et entrep\u00f4t de donn\u00e9es",
      'tech-dew-p1':       "Solutions d\u2019int\u00e9gration, de traitement et de stockage des donn\u00e9es qui rendent les analyses fiables et pr\u00eates pour les flux de travail pilot\u00e9s par l\u2019IA.",
      'tech-rd-h4':        'Rapports et tableaux de bord',
      'tech-rd-p1':        'Tableaux de bord interactifs qui convertissent les donn\u00e9es op\u00e9rationnelles complexes en informations et actions claires pour les \u00e9quipes et les dirigeants.',
      'tech-sel-h3':       'Travaux et services s\u00e9lectionn\u00e9s',
      'tech-pebbleai-p1':  "Services d\u2019entreprise couvrant la transformation par l\u2019IA, les plateformes de donn\u00e9es, l\u2019ing\u00e9nierie des donn\u00e9es, l\u2019entrep\u00f4t de donn\u00e9es, la gestion des donn\u00e9es, les rapports et tableaux de bord, et la formation, fournis sur la pile technologique Microsoft.",
      'tech-mbc-p1':       "Une initiative de march\u00e9 qui connecte les clients aux produits et entreprises fabriqu\u00e9s au Canada, renfor\u00e7ant la d\u00e9couverte et la participation des fournisseurs nationaux.",
      'tech-eco-h3':       "Align\u00e9 sur les priorit\u00e9s de l\u2019\u00e9cosyst\u00e8me d\u2019IA du Canada",
      'tech-eco-p1':       "Pebble Canada aligne son approche de livraison sur la direction du gouvernement du Canada pour un \u00e9cosyst\u00e8me d\u2019intelligence artificielle solide, fiable et ax\u00e9 sur l\u2019adoption. Nous soutenons le d\u00e9ploiement pratique de l\u2019IA dans les organisations, la gouvernance responsable et la mise en \u0153uvre s\u00e9curis\u00e9e pouvant \u00e9voluer \u00e0 travers les programmes et les grands projets.",
      'tech-adopt-h4':     "Adoption de l\u2019IA et productivit\u00e9",
      'tech-adopt-p1':     "IA appliqu\u00e9e et automatisation qui vont au-del\u00e0 des projets pilotes vers l\u2019utilisation op\u00e9rationnelle, renfor\u00e7ant la productivit\u00e9, la prestation de services et le support d\u00e9cisionnel dans les environnements r\u00e9glement\u00e9s.",
      'tech-trust-h4':     'Confiance, s\u00e9curit\u00e9 et gouvernance',
      'tech-trust-p1':     "Livraison ax\u00e9e sur la gouvernance qui met l\u2019accent sur la transparence, la gestion des risques et la responsabilit\u00e9, align\u00e9e sur les attentes canadiennes \u00e9mergentes pour des syst\u00e8mes d\u2019IA dignes de confiance.",
      'tech-dom-h4':       'Capacit\u00e9 nationale et sensibilisation \u00e0 l\u2019informatique souveraine',
      'tech-dom-p1':       "Pratiques d\u2019architecture et de livraison qui soutiennent le d\u00e9veloppement des capacit\u00e9s canadiennes et la pr\u00e9paration aux initiatives nationales d\u2019infrastructure et d\u2019informatique d\u2019IA, aidant les clients \u00e0 planifier une IA s\u00e9curis\u00e9e et \u00e9volutive.",
      'tech-sc-h4':        "IA pour les cha\u00eenes d\u2019approvisionnement et l\u2019industrie",
      'tech-sc-p1':        "Analytique op\u00e9rationnelle et automatisation qui renforcent la visibilit\u00e9 et la performance de la cha\u00eene d\u2019approvisionnement, align\u00e9es sur l\u2019orientation d\u2019adoption du Canada dans les industries cl\u00e9s.",
      'tech-outcomes-h3':  'R\u00e9sultats',
      'tech-outcome1':     "Adoption responsable et s\u00e9curis\u00e9e de l\u2019IA",
      'tech-outcome2':     'Automatisation qui am\u00e9liore la productivit\u00e9 et la prestation de services',
      'tech-outcome3':     'Visibilit\u00e9 des donn\u00e9es qui renforce la planification et la surveillance',
      'tech-outcome4':     'D\u00e9veloppement des capacit\u00e9s canadiennes par la livraison pratique',

      /* ── Workforce ── */
      'wf-page-header':    "Main-d\u2019\u0153uvre et solutions de capacit\u00e9",
      'wf-page-desc':      "Pr\u00e9paration de la main-d\u2019\u0153uvre qualifi\u00e9e pour l\u2019\u00e9nergie, les terres rares et les min\u00e9raux critiques.",
      'wf-p1':             "<strong>Pebble Canada</strong> fournit des solutions de main-d\u2019\u0153uvre et de capacit\u00e9 soutenant le secteur \u00e9nerg\u00e9tique canadien et la cha\u00eene de valeur des terres rares et des min\u00e9raux critiques. Nous assurons la pr\u00e9paration de la main-d\u2019\u0153uvre qualifi\u00e9e et la capacit\u00e9 op\u00e9rationnelle dans des environnements \u00e0 haute conformit\u00e9, \u00e9loign\u00e9s et ax\u00e9s sur les projets.",
      'wf-readiness-h3':   "\u00c9nergie et min\u00e9raux critiques \u2014 pr\u00e9paration de la main-d\u2019\u0153uvre",
      'wf-readiness-p1':   "Nous soutenons la planification et le d\u00e9ploiement des effectifs dans l\u2019extraction, le traitement, la logistique et l\u2019infrastructure de soutien. Notre approche aligne les comp\u00e9tences, les r\u00f4les et la pr\u00e9paration sur les exigences op\u00e9rationnelles et les attentes canadiennes en mati\u00e8re de s\u00e9curit\u00e9, de conformit\u00e9 et de performance.",
      'wf-sld-h4':         "D\u00e9ploiement de main-d\u2019\u0153uvre qualifi\u00e9e",
      'wf-sld-p1':         "Mod\u00e8les de d\u00e9ploiement qui soutiennent l\u2019ex\u00e9cution de projets et les op\u00e9rations continues, y compris les environnements \u00e9loign\u00e9s et rotatifs.",
      'wf-wp-h4':          'Planification des effectifs',
      'wf-wp-p1':          'Planification des r\u00f4les et alignement des capacit\u00e9s pour soutenir la productivit\u00e9, la s\u00e9curit\u00e9 et la fiabilit\u00e9 tout au long du cycle de vie du projet.',
      'wf-sc-h4':          'S\u00e9curit\u00e9 et conformit\u00e9',
      'wf-sc-p1':          "Soutien \u00e0 la main-d\u2019\u0153uvre fa\u00e7onn\u00e9 par les r\u00e9glementations canadiennes, les normes de s\u00e9curit\u00e9 et les standards de site appropri\u00e9s aux op\u00e9rations \u00e9nerg\u00e9tiques et de ressources.",
      'wf-cm-h4':          'Capacit\u00e9 en min\u00e9raux critiques',
      'wf-cm-p1':          "Soutien \u00e0 la capacit\u00e9 de main-d\u2019\u0153uvre \u00e0 travers les cha\u00eenes d\u2019approvisionnement en ressources strat\u00e9giques, y compris les terres rares et les projets de min\u00e9raux critiques.",
      'wf-offshore-h3':    "Mod\u00e8le de main-d\u2019\u0153uvre sous-trait\u00e9e \u00e0 l\u2019\u00e9tranger",
      'wf-offshore-p1':    "Pebble Canada fournit \u00e9galement des solutions de main-d\u2019\u0153uvre sous-trait\u00e9e \u00e0 l\u2019\u00e9tranger con\u00e7ues pour soutenir les projets canadiens d\u2019\u00e9nergie, d\u2019infrastructure et de min\u00e9raux critiques par le biais d\u2019une offre de main-d\u2019\u0153uvre \u00e9volutive et conforme. Notre mod\u00e8le permet aux clients d\u2019acc\u00e9der efficacement \u00e0 du personnel qualifi\u00e9 tout en maintenant le contr\u00f4le op\u00e9rationnel, les normes de s\u00e9curit\u00e9 et la conformit\u00e9 r\u00e9glementaire.",
      'wf-offshore-p2':    "Nous travaillons aux c\u00f4t\u00e9s des entrepreneurs principaux et des partenaires de main-d\u2019\u0153uvre pour fournir du personnel pr\u00e9-v\u00e9rifi\u00e9, certifi\u00e9 et pr\u00eat au d\u00e9ploiement dans une gamme de r\u00f4les op\u00e9rationnels. Cette approche permet aux organisations de r\u00e9pondre rapidement \u00e0 la demande de projets, aux pointes saisonni\u00e8res et aux exigences de comp\u00e9tences sp\u00e9cialis\u00e9es sans augmenter les frais fixes \u00e0 long terme.",
      'wf-sub-h4':         "D\u00e9ploiement de main-d\u2019\u0153uvre sous-trait\u00e9e",
      'wf-sub-p1':         "Mod\u00e8les de dotation en personnel sous-trait\u00e9e flexibles soutenant les besoins \u00e0 court terme, rotatifs et \u00e0 long terme dans les op\u00e9rations \u00e9nerg\u00e9tiques et de ressources.",
      'wf-rv-h4':          'Recrutement et v\u00e9rification',
      'wf-rv-p1':          "S\u00e9lection de la main-d\u2019\u0153uvre, v\u00e9rification des accréditations et contr\u00f4les de conformit\u00e9 align\u00e9s sur les exigences canadiennes en mati\u00e8re de s\u00e9curit\u00e9, de travail et de site.",
      'wf-remote-h4':      'Pr\u00e9paration pour les environnements \u00e9loign\u00e9s et hautement r\u00e9glement\u00e9s',
      'wf-remote-p1':      "Personnel pr\u00e9par\u00e9 pour les environnements \u00e9loign\u00e9s, industriels et \u00e0 haute conformit\u00e9, y compris les d\u00e9ploiements rotatifs et les normes sp\u00e9cifiques aux sites.",
      'wf-wms-h4':         "Soutien \u00e0 la gestion de la main-d\u2019\u0153uvre",
      'wf-wms-p1':         "Coordination de la mobilisation, planification de la pr\u00e9paration et soutien continu \u00e0 la main-d\u2019\u0153uvre pour assurer la continuit\u00e9, la performance et l\u2019alignement avec les objectifs du projet.",
      'wf-where-h3':       'O\u00f9 nous intervenons',
      'wf-where1':         "P\u00e9trole et gaz, \u00e9nergie et projets \u00e9nerg\u00e9tiques \u00e9mergents",
      'wf-where2':         "Extraction et traitement des terres rares et des min\u00e9raux critiques",
      'wf-where3':         "Logistique des ressources et infrastructure de soutien",
      'wf-where4':         "Op\u00e9rations \u00e9loign\u00e9es et nordiques o\u00f9 la pr\u00e9paration est essentielle",

      /* ── Workforce — Capacité de livraison internationale (FR) ── */
      'wf-partner-h3':         'Capacit\u00e9 de livraison internationale de main-d\u2019\u0153uvre',
      'wf-partner-p1':         'Pebble Canada \u00e9tend sa capacit\u00e9 de livraison de main-d\u2019\u0153uvre \u00e0 travers des corridors internationaux gr\u00e2ce \u00e0 des partenariats sp\u00e9cialis\u00e9s forts de plus de trois d\u00e9cennies d\u2019exp\u00e9rience op\u00e9rationnelle dans les secteurs de l\u2019\u00e9nergie, de la construction et du d\u00e9ploiement dans le secteur des ressources. Cette capacit\u00e9 soutient les projets dirig\u00e9s par des Canadiens n\u00e9cessitant de la main-d\u2019\u0153uvre qualifi\u00e9e et semi-qualifi\u00e9e \u00e0 grande \u00e9chelle.',
      'wf-partner-p2':         'Gr\u00e2ce \u00e0 des partenariats de livraison \u00e9tablis, Pebble Canada donne acc\u00e8s \u00e0 une base de donn\u00e9es active de plus de <strong>13\u00a0000 professionnels v\u00e9rifi\u00e9s</strong> dans des cat\u00e9gories de m\u00e9tiers qualifi\u00e9s et semi-qualifi\u00e9s, avec des pipelines de livraison couvrant l\u2019Asie du Sud, le Moyen-Orient et l\u2019Afrique du Nord. L\u2019infrastructure de recrutement sous-jacente est fond\u00e9e sur la conformit\u00e9, la v\u00e9rification des accréditations et la mobilisation rapide \u2014 align\u00e9e sur les normes op\u00e9rationnelles requises par les projets canadiens d\u2019\u00e9nergie et de ressources.',
      'wf-partner-proj1-h4':   "Programmes de main-d\u2019\u0153uvre dans le secteur \u00e9nerg\u00e9tique",
      'wf-partner-proj1-p':    "Mobilisation de la main-d\u2019\u0153uvre pour la transmission de gaz, la production d\u2019\u00e9lectricit\u00e9 et les infrastructures \u00e9nerg\u00e9tiques en aval.",
      'wf-partner-proj2-h4':   'Construction et infrastructure civile',
      'wf-partner-proj2-p':    "Fourniture de main-d\u2019\u0153uvre pour des programmes de construction civile, structurelle et m\u00e9canique \u00e0 grande \u00e9chelle.",
      'wf-partner-proj3-h4':   "Exploitation mini\u00e8re et extraction de ressources",
      'wf-partner-proj3-p':    "Soutien en main-d\u2019\u0153uvre qualifi\u00e9e pour l\u2019extraction min\u00e9rale, le traitement et les op\u00e9rations sur site.",
      'wf-partner-proj4-h4':   'Livraison dans les corridors internationaux',
      'wf-partner-proj4-p':    "Coordination de bout en bout de la main-d\u2019\u0153uvre pour les projets op\u00e9rant dans plusieurs juridictions.",

      /* ── Defence ── */
      'def-page-header':   'D\u00e9fense et syst\u00e8mes avanc\u00e9s',
      'def-page-desc':     "De l\u2019approvisionnement essentiel aux capacit\u00e9s avanc\u00e9es par drone.",
      'def-p1':            "<strong>Pebble Canada</strong> soutient la pr\u00e9paration \u00e0 la d\u00e9fense en tant que partenaire d\u2019approvisionnement et de livraison sur un spectre complet d\u2019exigences, allant de l\u2019approvisionnement essentiel et des articles de soutien sur le terrain aux syst\u00e8mes avanc\u00e9s et aux technologies \u00e9mergentes. Notre objectif est d\u2019\u00eatre pr\u00eat \u00e0 r\u00e9pondre aux appels d\u2019offres du gouvernement du Canada et de livrer de mani\u00e8re fiable \u00e0 grande \u00e9chelle pour les grands programmes et les besoins op\u00e9rationnels.",
      'def-core-h3':       "De l\u2019approvisionnement de base aux capacit\u00e9s avanc\u00e9es",
      'def-core-p1':       "Nous soutenons des exigences allant des uniformes et \u00e9quipements fondamentaux \u00e0 l\u2019int\u00e9gration de syst\u00e8mes et aux capacit\u00e9s par drone. Nous alignons notre approche sur les pratiques d\u2019appel d\u2019offres et les formats courants de sollicitation tels que l\u2019invitation \u00e0 soumissionner, la demande de propositions et la demande de cotation.",
      'def-ufg-h4':        '\u00c9quipements de terrain et uniformes',
      'def-ufg-p1':        "Soutien \u00e0 l\u2019approvisionnement pour les uniformes, v\u00eatements, \u00e9quipements de terrain et articles de soutien op\u00e9rationnel ax\u00e9s sur la qualit\u00e9, la fiabilit\u00e9 et l\u2019ad\u00e9quation \u00e0 l\u2019usage.",
      'def-oss-h4':        'Soutien op\u00e9rationnel et maintien en puissance',
      'def-oss-p1':        "Approvisionnement et coordination pour les articles et syst\u00e8mes permettant la pr\u00e9paration, qui soutiennent les besoins de formation, de logistique et de maintien en puissance.",
      'def-asi-h4':        'Int\u00e9gration de syst\u00e8mes avanc\u00e9s',
      'def-asi-p1':        "Soutien orient\u00e9 vers l\u2019int\u00e9gration de syst\u00e8mes modernes en mettant l\u2019accent sur l\u2019interop\u00e9rabilit\u00e9, la fiabilit\u00e9 et les consid\u00e9rations de cycle de vie.",
      'def-duc-h4':        'Capacit\u00e9s de drones et v\u00e9hicules non habit\u00e9s',
      'def-duc-p1':        "Soutien aux solutions non habit\u00e9es et autonomes, y compris la technologie de drones pour la surveillance, la formation, le soutien logistique et les cas d\u2019utilisation op\u00e9rationnels.",
      'def-readiness-h3':  "Pr\u00e9paration \u00e0 l\u2019approvisionnement",
      'def-readiness-p1':  "Pebble Canada structure son travail de d\u00e9fense pour soutenir les appels d\u2019offres comp\u00e9titifs et la livraison de contrats. Nous pouvons participer aux opportunit\u00e9s publi\u00e9es via SAP Ariba et r\u00e9pondre aux documents de sollicitation avec des \u00e9ch\u00e9anciers disciplin\u00e9s, un suivi de la conformit\u00e9 et des livrables clairs.",
      'def-srs-h4':        "Soutien \u00e0 la r\u00e9ponse aux appels d\u2019offres",
      'def-srs-p1':        "Contributions \u00e0 la pr\u00e9paration des offres, notamment les matrices de conformit\u00e9, la tra\u00e7abilit\u00e9 des exigences, les listes de v\u00e9rification de soumission et la documentation justificative pour les crit\u00e8res techniques et de gestion.",
      'def-sosa-h4':       'Offres permanentes et arrangements d\u2019approvisionnement',
      'def-sosa-p1':       "Soutien aux mod\u00e8les d\u2019approvisionnement r\u00e9currents, y compris les offres permanentes et les arrangements d\u2019approvisionnement, avec la capacit\u00e9 de r\u00e9pondre aux appels et de fournir des niveaux de service constants.",
      'def-ssf-h4':        "Ex\u00e9cution d\u2019approvisionnement \u00e9volutive",
      'def-ssf-p1':        "Approvisionnement \u00e9volutif, coordination de l\u2019entrep\u00f4t et planification de la livraison pour soutenir les grandes commandes, les d\u00e9ploiements \u00e9chelonn\u00e9s et la distribution multi-sites.",
      'def-sci-h4':        "Int\u00e9grit\u00e9 de la cha\u00eene d\u2019approvisionnement",
      'def-sci-p1':        "Coordination des fournisseurs, pr\u00e9paration \u00e0 l\u2019inspection et documentation tra\u00e7able pour soutenir la qualit\u00e9, l\u2019acceptation et les exigences de maintien en puissance sur le cycle de vie du contrat.",
      'def-cc-h3':         'Couverture des capacit\u00e9s',
      'def-cc-p1':         "Nous soutenons un large \u00e9ventail de besoins d\u2019approvisionnement de d\u00e9fense, notamment les uniformes, v\u00eAtements, \u00e9quipements de terrain, \u00e9quipements op\u00e9rationnels, articles de logistique et syst\u00e8mes avanc\u00e9s. Pour les solutions non habit\u00e9es et autonomes, nous soutenons des cas d\u2019utilisation orient\u00e9s vers l\u2019int\u00e9gration tels que la surveillance, la formation, le soutien logistique et l\u2019activation op\u00e9rationnelle.",
      'def-principles-h3': 'Nos principes de livraison',
      'def-principle1':    "Livraison conforme \u00e0 l\u2019approvisionnement et pr\u00e9paration aux soumissions align\u00e9es sur les normes du gouvernement du Canada",
      'def-principle2':    "Documentation de conformit\u00e9 claire et alignement des crit\u00e8res d\u2019\u00e9valuation",
      'def-principle3':    "Interop\u00e9rabilit\u00e9 des syst\u00e8mes et int\u00e9gration op\u00e9rationnelle transparente",
      'def-principle4':    "Planification du maintien en puissance du cycle de vie et voies de mise \u00e0 niveau technologique",
      'def-principle5':    "Op\u00e9rations s\u00e9curis\u00e9es et int\u00e9grit\u00e9 compl\u00e8te de la cha\u00eene d\u2019approvisionnement",
      'def-principle6':    "Assurance qualit\u00e9 et pr\u00e9paration \u00e0 l\u2019acceptation \u00e0 chaque \u00e9tape",

      /* ── Logistics ── */
      'log-page-header':   "Logistique et cha\u00eene d\u2019approvisionnement",
      'log-page-desc':     "R\u00e9silience et coordination de la cha\u00eene d\u2019approvisionnement ax\u00e9es sur le commerce international.",
      'log-p1':            "<strong>Pebble Canada</strong> fournit des solutions de cha\u00eene d\u2019approvisionnement et de logistique ax\u00e9es sur le commerce international, permettant aux organisations canadiennes de d\u00e9placer des biens et des mat\u00e9riaux de mani\u00e8re fiable \u00e0 travers les corridors mondiaux et les march\u00e9s complexes.",
      'log-intl-h3':       "Cha\u00eenes d\u2019approvisionnement ax\u00e9es sur le commerce international",
      'log-intl-p1':       "Nous soutenons la coordination de bout en bout \u00e0 travers l\u2019approvisionnement, le transport multimodal, l\u2019entrep\u00f4t, la distribution et la documentation commerciale. Notre objectif est d\u2019am\u00e9liorer la visibilit\u00e9, la continuit\u00e9 et la r\u00e9silience \u00e0 travers les routes reliant le Canada aux march\u00e9s europ\u00e9ens et aux corridors commerciaux indo-pacifiques.",
      'log-tcp-h4':        'Planification des corridors commerciaux',
      'log-tcp-p1':        "Planification des routes et des modalit\u00e9s \u00e0 travers les r\u00e9seaux a\u00e9rien, oc\u00e9anique et multimodal con\u00e7ue pour r\u00e9duire les perturbations et am\u00e9liorer les performances de livraison.",
      'log-sup-h4':        'Coordination des fournisseurs',
      'log-sup-p1':        "Coordination des fournisseurs qui soutient des d\u00e9lais pr\u00e9visibles, l\u2019assurance qualit\u00e9 et la continuit\u00e9 pour l\u2019approvisionnement international.",
      'log-cr-h4':         'Continuit\u00e9 et r\u00e9silience',
      'log-cr-p1':         "Planification de la continuit\u00e9 op\u00e9rationnelle qui tient compte de la volatilit\u00e9 mondiale, des contraintes de capacit\u00e9 et des risques de d\u00e9pendance.",
      'log-vr-h4':         'Visibilit\u00e9 et rapports',
      'log-vr-p1':         "Approches de visibilit\u00e9 num\u00e9rique qui soutiennent le suivi, le contr\u00f4le des performances et une r\u00e9solution plus rapide des probl\u00e8mes \u00e0 travers les r\u00e9seaux d\u2019approvisionnement.",
      'log-corridors-h3':  "Corridors d\u2019expansion commerciale\u00a0: Europe et Asie",
      'log-corridors-p1':  "Pebble Canada soutient les objectifs de diversification commerciale du Canada en renfor\u00e7ant les fondements logistiques et de cha\u00eene d\u2019approvisionnement n\u00e9cessaires \u00e0 un commerce mondial fiable. Alors que le Canada \u00e9largit son engagement commercial \u00e0 travers l\u2019Europe et renoue avec des march\u00e9s cl\u00e9s \u00e0 l\u2019\u00e9tranger, y compris la Chine, nous aidons les organisations \u00e0 concevoir, adapter et op\u00e9rer des cha\u00eenes d\u2019approvisionnement r\u00e9silientes.",
      'log-west-h4':       "Vers l\u2019ouest\u00a0: acc\u00e8s au march\u00e9 europ\u00e9en",
      'log-west-p1':       "Soutien aux mouvements vers l\u2019Europe via les r\u00e9seaux de fret maritime et a\u00e9rien, avec coordination aupr\u00e8s des fournisseurs, transitaires, ports et partenaires de distribution. Nous aidons les clients \u00e0 g\u00e9rer des cycles de transit plus longs, des fen\u00eatres de livraison plus serr\u00e9es et une documentation complexe.",
      'log-east-h4':       "Vers l\u2019est\u00a0: corridors Asie et Chine",
      'log-east-p1':       "Coordination logistique pour les cha\u00eenes d\u2019approvisionnement indo-pacifiques, y compris les couloirs d\u2019approvisionnement \u00e0 volume \u00e9lev\u00e9 et d\u2019exportation connect\u00e9s \u00e0 la Chine. Nous nous concentrons sur la planification de la continuit\u00e9, la gestion des capacit\u00e9s et la gestion rapide des exceptions.",
      'log-tdr-h4':        'Pr\u00e9paration \u00e0 la documentation commerciale',
      'log-tdr-p1':        "Pr\u00e9paration des processus qui soutient des flux de travail de documentation commerciale coh\u00e9rents, la visibilit\u00e9 des exp\u00e9ditions et la coordination proactive avec les transporteurs et partenaires.",
      'log-vctr-h4':       'Visibilit\u00e9 et rapports de la tour de contr\u00f4le',
      'log-vctr-p1':       "Voies de rapports pratiques et d\u2019escalade qui aident les \u00e9quipes \u00e0 suivre les exp\u00e9ditions, surveiller les performances et r\u00e9soudre les probl\u00e8mes rapidement \u00e0 travers les routes multi-juridictions.",
      'log-focus-h3':      "Domaines d\u2019intervention principaux",
      'log-focus1':        "Coordination logistique internationale \u00e0 travers le fret maritime et a\u00e9rien",
      'log-focus2':        "Planification de la cha\u00eene d\u2019approvisionnement et suivi des performances",
      'log-focus3':        'Pr\u00e9paration \u00e0 la documentation commerciale et soutien op\u00e9rationnel',
      'log-focus4':        "Strat\u00e9gie d\u2019inventaire et planification de la continuit\u00e9",
      'log-focus5':        "Diversification des fournisseurs et r\u00e9duction des risques de d\u00e9pendance",

      /* ── Contact ── */
      'contact-page-header': 'Travaillons ensemble',
      'contact-page-desc':   'Contactez-nous pour explorer des partenariats \u00e0 travers nos quatre piliers.',
      'contact-office-h6':   'le bureau',
      'contact-tel-h6':      't\u00e9l\u00e9phone',
      'contact-email-h6':    'courriel',
      'contact-form-h6':     'Nous contacter',
      'contact-name-ph':      'Votre nom',
      'contact-email-ph':     'Adresse courriel',
      'contact-subject-ph':   'Sujet',
      'contact-message-ph':   'Votre message',
      'contact-send':         'Envoyer',
      'contact-name-label':   'Votre nom',
      'contact-email-label':  'Adresse courriel',
      'contact-subject-label':'Sujet',
      'contact-message-label':'Votre message'
    }
  };

  /* ─── Engine ─────────────────────────────────────────────────────────── */
  function applyLang(lang) {
    var dict = T[lang] || T.en;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.textContent = dict[key];
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (dict[key] !== undefined) el.setAttribute('placeholder', dict[key]);
    });

    document.documentElement.setAttribute('lang', lang);

    try { localStorage.setItem('pebble-lang', lang); } catch (e) {}

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
  }

  /* ─── Styles ─────────────────────────────────────────────────────────── */
  var style = document.createElement('style');
  style.textContent = [
    '.lang-toggle{display:flex;align-items:center;gap:2px;margin-left:12px;}',
    '.lang-btn{background:none;border:1px solid rgba(255,255,255,0.45);color:inherit;',
    'padding:3px 9px;cursor:pointer;font-size:11px;letter-spacing:1px;',
    'text-transform:uppercase;transition:background 0.2s,border-color 0.2s;font-family:inherit;}',
    '.lang-btn.active{background:rgba(130,40,207,0.75);border-color:#8228cf;color:#fff;}',
    '.lang-btn:hover:not(.active){border-color:#8228cf;}'
  ].join('');
  document.head.appendChild(style);

  /* ─── Init ───────────────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    var nav = document.querySelector('.ms-nav');
    if (nav) {
      var toggle = document.createElement('div');
      toggle.className = 'lang-toggle';
      toggle.setAttribute('aria-label', 'Language / Langue');
      toggle.innerHTML =
        '<button class="lang-btn" data-lang="en" aria-label="English">EN</button>' +
        '<button class="lang-btn" data-lang="fr" aria-label="Français">FR</button>';
      nav.appendChild(toggle);
      toggle.querySelectorAll('.lang-btn').forEach(function (btn) {
        btn.addEventListener('click', function () { applyLang(btn.getAttribute('data-lang')); });
      });
    }

    var saved = 'en';
    try { saved = localStorage.getItem('pebble-lang') || 'en'; } catch (e) {}
    applyLang(saved);
  });
})();
