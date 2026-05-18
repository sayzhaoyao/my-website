"use strict";

const categories = [
  {
    name: "Product Research Tools",
    slug: "product-research-tools",
    intro: "Tools that help e-commerce sellers discover products, validate demand, and monitor competitors.",
    seoTitle: "Best Product Research Tools for E-commerce Sellers",
    seoDescription: "Compare product research tools for Shopify, Amazon, and cross-border e-commerce sellers.",
  },
  {
    name: "Listing Optimization Tools",
    slug: "listing-optimization-tools",
    intro: "Tools for writing, improving, and testing product listings, titles, descriptions, and bullet points.",
    seoTitle: "Best Listing Optimization Tools for Online Sellers",
    seoDescription: "Find listing optimization tools for Amazon, Shopify, Etsy, and independent stores.",
  },
  {
    name: "SEO and Keyword Tools",
    slug: "seo-keyword-tools",
    intro: "Tools for keyword research, search intent analysis, marketplace SEO, and organic growth.",
    seoTitle: "Best SEO and Keyword Tools for E-commerce",
    seoDescription: "Compare SEO and keyword tools for online stores and marketplace sellers.",
  },
  {
    name: "Ad Creative Tools",
    slug: "ad-creative-tools",
    intro: "Tools for creating product images, videos, ad variants, and visual assets for paid campaigns.",
    seoTitle: "Best Ad Creative Tools for E-commerce Brands",
    seoDescription: "Discover AI ad creative tools for product images, videos, and campaign assets.",
  },
  {
    name: "Email Marketing Tools",
    slug: "email-marketing-tools",
    intro: "Tools for abandoned cart flows, post-purchase campaigns, customer segmentation, SMS, and lifecycle marketing for online stores.",
    seoTitle: "Best Email Marketing Tools for E-commerce",
    seoDescription: "Compare e-commerce email and SMS marketing tools for retention, automation, segmentation, and repeat revenue.",
  },
  {
    name: "Customer Support Tools",
    slug: "customer-support-tools",
    intro: "Helpdesk, chatbot, and AI support tools for handling buyer questions and post-purchase support.",
    seoTitle: "Best Customer Support Tools for Online Stores",
    seoDescription: "Find support, chatbot, and helpdesk tools for Shopify and cross-border sellers.",
  },
  {
    name: "Analytics and Attribution Tools",
    slug: "analytics-attribution-tools",
    intro: "Tools for tracking store performance, marketing attribution, profit, and customer behavior.",
    seoTitle: "Best Analytics and Attribution Tools for E-commerce",
    seoDescription: "Compare analytics and attribution tools for online sellers and growth teams.",
  },
  {
    name: "Workflow Automation Tools",
    slug: "workflow-automation-tools",
    intro: "Automation tools that connect apps, sync data, trigger workflows, and reduce manual operations.",
    seoTitle: "Best Workflow Automation Tools for E-commerce",
    seoDescription: "Discover workflow automation tools for e-commerce operations and marketing teams.",
  },
];

const tools = [
  {
    name: "Shopify Magic",
    slug: "shopify-magic",
    categorySlugs: ["listing-optimization-tools", "ad-creative-tools"],
    websiteUrl: "https://www.shopify.com/magic",
    shortDescription: "AI features built into Shopify for generating commerce content and improving store workflows.",
    longDescription: "Shopify Magic is most useful when a merchant already works inside Shopify and wants AI help close to day-to-day store operations. Its practical value is convenience: product copy, content suggestions, and built-in commerce context are available without adding another standalone tool.\n\nIt is not the best choice for teams that want a flexible AI workspace across many platforms, marketplaces, or custom workflows. For a Shopify-first store, though, it can be a low-friction starting point for improving product descriptions and routine content tasks before paying for a separate AI content stack.",
    pricingModel: "freemium",
    freePlanAvailable: true,
    keyFeatures: ["AI content generation", "commerce workflow support", "native Shopify integration"],
    pros: ["Native to Shopify", "Easy for store owners to access", "Useful for product copy"],
    cons: ["Best suited to Shopify merchants", "Less flexible than standalone AI platforms"],
    bestFor: ["Shopify store owners", "Small e-commerce teams", "Merchants improving product copy"],
    scores: [5, 5, 5, 3, 2, 3],
    decisionSummary: "Use Shopify Magic when you already run on Shopify and want native AI help without adding another tool.",
    recommendedFor: ["New Shopify stores", "Merchants improving product descriptions", "Teams avoiding extra apps"],
    notRecommendedFor: ["Non-Shopify sellers", "Teams needing deep AI workflow customization"],
    affiliateDisclosure: "This review links to the official Shopify Magic page. Confirm current Shopify plan access and feature availability before relying on it.",
    sourceUrls: [
      "https://www.shopify.com/magic",
      "https://www.shopify.com/pricing",
    ],
    seoTitle: "Shopify Magic Review: Native AI Features for Shopify Stores",
    seoDescription: "Review Shopify Magic for store owners, including best use cases, native AI content help, limitations, pricing context, pros, cons, and alternatives.",
  },
  {
    name: "Klaviyo",
    slug: "klaviyo",
    categorySlugs: ["email-marketing-tools", "analytics-attribution-tools"],
    websiteUrl: "https://www.klaviyo.com/",
    shortDescription: "Email and SMS marketing platform for e-commerce brands that need segmentation, automations, and revenue reporting.",
    longDescription: "Klaviyo is a strong fit for stores that treat retention as a real growth channel, not just a monthly newsletter. Its biggest advantage is the depth of customer data, segmentation, and lifecycle automation that e-commerce teams can build around purchase behavior.\n\nFor a small store, Klaviyo can feel heavier than necessary. For a growing DTC brand with repeat-purchase potential, it gives marketers more room to build abandoned cart, welcome, winback, replenishment, and VIP flows. Before choosing it, model pricing with your real contact count and message volume because cost can rise as the list grows.",
    pricingModel: "freemium",
    freePlanAvailable: true,
    keyFeatures: ["Email automation", "SMS and mobile messaging", "Customer segmentation", "Revenue analytics", "E-commerce integrations", "Campaign and flow reporting"],
    pros: ["Strong e-commerce integrations", "Advanced segmentation", "Revenue-focused analytics", "Good fit for lifecycle marketing teams"],
    cons: ["Can become expensive as lists grow", "Requires setup effort for best results", "May be more complex than a simple newsletter tool"],
    bestFor: ["Scaling Shopify brands", "DTC retention teams", "Stores with repeat purchase behavior"],
    scores: [3, 3, 5, 5, 2, 4],
    decisionSummary: "Choose Klaviyo when retention is a major revenue channel and your team can maintain segmentation and lifecycle flows.",
    recommendedFor: ["Scaling DTC brands", "Retention marketers", "Stores with repeat purchase potential", "Teams that need deep segmentation"],
    notRecommendedFor: ["Very small lists", "Teams that only need a simple newsletter", "Stores without time to maintain flows"],
    affiliateDisclosure: "This review links to the official Klaviyo site. Confirm current pricing, plan limits, and channel availability before choosing.",
    sourceUrls: [
      "https://www.klaviyo.com/",
      "https://www.klaviyo.com/pricing",
      "https://help.klaviyo.com/hc/en-us/articles/360050759151",
    ],
    seoTitle: "Klaviyo Review for E-commerce: Features, Pricing Fit, and Alternatives",
    seoDescription: "Review Klaviyo for e-commerce email and SMS marketing, including best use cases, segmentation strengths, pricing tradeoffs, pros, cons, and alternatives.",
  },
  {
    name: "Gorgias",
    slug: "gorgias",
    categorySlugs: ["customer-support-tools"],
    websiteUrl: "https://www.gorgias.com/",
    shortDescription: "Customer support platform for e-commerce brands with automation and helpdesk workflows.",
    longDescription: "Gorgias is strongest for e-commerce support teams that need order, customer, and conversation context in the same workspace. It is a better fit when support tickets are frequent enough that macros, automation, and AI-assisted replies can reduce repetitive work without losing the commerce context agents need.\n\nFor a very small store, Gorgias may be more helpdesk than necessary. For a growing Shopify or DTC brand, it can become a central support layer for questions about orders, returns, product issues, and repeat buyer conversations. Before adopting it, compare pricing against your real ticket volume and check which automation features are included in the plan you would use.",
    pricingModel: "paid",
    freePlanAvailable: false,
    keyFeatures: ["Helpdesk", "AI automation", "Shopify support context", "Macros and workflows"],
    pros: ["Built for commerce support", "Strong Shopify context", "Good automation options"],
    cons: ["May be overkill for very small shops", "Pricing depends on support volume"],
    bestFor: ["Growing Shopify stores", "Support teams", "DTC brands"],
    scores: [4, 3, 5, 4, 1, 5],
    decisionSummary: "Choose Gorgias when support volume is high enough that Shopify context and automation can save real team time.",
    recommendedFor: ["Growing Shopify stores", "Support teams", "DTC brands with repeat tickets"],
    notRecommendedFor: ["Stores with low ticket volume", "Teams only needing basic live chat"],
    affiliateDisclosure: "This review links to the official Gorgias site. Confirm current pricing, plan limits, and supported integrations before choosing.",
    sourceUrls: [
      "https://www.gorgias.com/",
      "https://www.gorgias.com/pricing",
    ],
    seoTitle: "Gorgias Review for E-commerce: Helpdesk Fit, Automation, Pricing, and Alternatives",
    seoDescription: "Review Gorgias for e-commerce support teams, including helpdesk fit, automation strengths, pricing tradeoffs, pros, cons, and alternatives.",
  },
  {
    name: "Jungle Scout",
    slug: "jungle-scout",
    categorySlugs: ["product-research-tools", "analytics-attribution-tools"],
    websiteUrl: "https://www.junglescout.com/",
    shortDescription: "Amazon seller platform for product research, keyword tracking, and market intelligence.",
    longDescription: "Jungle Scout is built around Amazon seller research, especially product discovery, market validation, sales estimates, and keyword visibility. It is a strong fit when the main job is deciding what to sell on Amazon and whether a niche has enough demand to justify deeper sourcing work.\n\nThe data should be treated as directional rather than a guarantee. Teams still need to validate margin, supplier reliability, seasonality, reviews, and operational constraints. Jungle Scout is most valuable when it is part of a disciplined Amazon research workflow rather than a single-click product decision tool.",
    pricingModel: "paid",
    freePlanAvailable: false,
    keyFeatures: ["Product database", "Keyword research", "Sales estimates", "Supplier research"],
    pros: ["Focused on Amazon sellers", "Large product research dataset", "Useful market validation tools"],
    cons: ["Primarily Amazon-focused", "Data should be validated before decisions"],
    bestFor: ["Amazon sellers", "FBA operators", "Product research teams"],
    scores: [4, 3, 3, 3, 4, 3],
    decisionSummary: "Use Jungle Scout when product discovery and Amazon market validation are the central jobs.",
    recommendedFor: ["Amazon FBA sellers", "Product researchers", "Marketplace teams validating niches"],
    notRecommendedFor: ["Shopify-only brands", "Teams needing broad SEO or creative tools"],
    affiliateDisclosure: "This review links to the official Jungle Scout site. Confirm current pricing, data limits, and included seller tools before choosing.",
    sourceUrls: [
      "https://www.junglescout.com/",
      "https://www.junglescout.com/pricing/",
    ],
    seoTitle: "Jungle Scout Review for Amazon Sellers: Product Research, Pricing, and Alternatives",
    seoDescription: "Review Jungle Scout for Amazon product research, including best use cases, market validation strengths, pricing tradeoffs, pros, cons, and alternatives.",
  },
  {
    name: "Helium 10",
    slug: "helium-10",
    categorySlugs: ["product-research-tools", "seo-keyword-tools", "listing-optimization-tools"],
    websiteUrl: "https://www.helium10.com/",
    shortDescription: "Amazon seller software suite for product research, keywords, listings, and operations.",
    longDescription: "Helium 10 is a broad Amazon seller toolkit that goes beyond product discovery into keyword research, listing optimization, market tracking, and operational workflows. It is a better fit for sellers who want one suite to support several Amazon growth jobs instead of a narrow research database.\n\nBecause the platform is broad, the tradeoff is learning curve. New sellers may need time to decide which tools matter for their stage. Helium 10 is strongest when the team is actively improving Amazon listings, tracking keyword opportunities, and using data to refine product positioning.",
    pricingModel: "freemium",
    freePlanAvailable: true,
    keyFeatures: ["Keyword research", "Listing optimization", "Product research", "Market tracking"],
    pros: ["Broad Amazon seller toolkit", "Strong keyword workflows", "Useful for listing optimization"],
    cons: ["Feature-heavy for beginners", "Mainly centered on Amazon"],
    bestFor: ["Amazon sellers", "Marketplace teams", "Listing optimization workflows"],
    scores: [3, 4, 4, 4, 5, 3],
    decisionSummary: "Choose Helium 10 when you want a broader Amazon seller suite that covers research, keywords, and listing work.",
    recommendedFor: ["Amazon sellers", "Marketplace operators", "Listing optimization teams"],
    notRecommendedFor: ["Non-Amazon stores", "Users who only need a lightweight product database"],
    affiliateDisclosure: "This review links to the official Helium 10 site. Confirm current pricing, plan limits, and marketplace support before choosing.",
    sourceUrls: [
      "https://www.helium10.com/",
      "https://www.helium10.com/pricing/",
    ],
    seoTitle: "Helium 10 Review for Amazon Sellers: Research, Keywords, Pricing, and Alternatives",
    seoDescription: "Review Helium 10 for Amazon sellers, including product research, keyword workflows, listing optimization, pricing tradeoffs, pros, cons, and alternatives.",
  },
  {
    name: "Semrush",
    slug: "semrush",
    categorySlugs: ["seo-keyword-tools", "analytics-attribution-tools"],
    websiteUrl: "https://www.semrush.com/",
    shortDescription: "SEO and competitive research suite for keyword analysis, content planning, and traffic research.",
    longDescription: "Semrush is a broad SEO and competitive visibility suite for teams that want keyword research, site audits, content planning, competitor tracking, and reporting in one place. It is useful for e-commerce brands that are investing in organic search beyond basic product-page optimization.\n\nThe main tradeoff is scope. Semrush can support many marketing jobs, but that breadth also means teams need a clear workflow to avoid paying for features they rarely use. It is worth reviewing when SEO, content, paid search research, or competitor monitoring are active growth channels rather than side projects.",
    pricingModel: "paid",
    freePlanAvailable: false,
    keyFeatures: ["Keyword research", "Competitor analysis", "Site audits", "Content tools"],
    pros: ["Large SEO dataset", "Strong competitive analysis", "Useful beyond e-commerce"],
    cons: ["Can be expensive", "Broad toolset may require learning"],
    bestFor: ["SEO teams", "Content marketers", "Store owners investing in organic traffic"],
    scores: [3, 3, 4, 3, 5, 4],
    decisionSummary: "Choose Semrush when organic search and competitive analysis are important enough to justify a broad SEO suite.",
    recommendedFor: ["SEO teams", "Content-led stores", "Agencies"],
    notRecommendedFor: ["Stores not investing in SEO", "Teams needing only marketplace keyword data"],
    affiliateDisclosure: "This review links to the official Semrush site. Confirm current pricing, plan limits, and data access before choosing.",
    sourceUrls: [
      "https://www.semrush.com/",
      "https://www.semrush.com/pricing/",
    ],
    seoTitle: "Semrush Review for E-commerce: SEO Features, Pricing Fit, and Alternatives",
    seoDescription: "Review Semrush for e-commerce SEO and competitor research, including best use cases, pricing tradeoffs, pros, cons, and alternatives.",
  },
  {
    name: "Canva",
    slug: "canva",
    categorySlugs: ["ad-creative-tools"],
    websiteUrl: "https://www.canva.com/",
    shortDescription: "Design platform for creating product graphics, social visuals, ads, and marketing assets.",
    longDescription: "Canva is a practical design workspace for small commerce teams that need product graphics, social posts, simple ads, presentations, and brand assets without waiting on a dedicated designer for every task. Its main advantage is speed and accessibility for non-designers.\n\nThe tradeoff is creative distinctiveness. Template-based work can start to look generic if the team does not adapt layouts, imagery, and brand rules. Canva is best used for fast production and lightweight brand consistency, while high-performing ad concepts and custom campaign systems may still need stronger creative direction.",
    pricingModel: "freemium",
    freePlanAvailable: true,
    keyFeatures: ["Templates", "Brand kits", "AI design tools", "Social and ad creatives"],
    pros: ["Easy to use", "Large template library", "Good for non-designers"],
    cons: ["Templates can feel generic", "Advanced design control is limited"],
    bestFor: ["Small stores", "Marketing teams", "Social ad creative workflows"],
    scores: [5, 5, 4, 3, 1, 4],
    decisionSummary: "Use Canva when your team needs fast, good-enough marketing visuals without a design bottleneck.",
    recommendedFor: ["Small stores", "Social teams", "Non-designers producing marketing assets"],
    notRecommendedFor: ["Teams needing highly custom creative systems", "Pure performance ad testing workflows"],
    affiliateDisclosure: "This review links to the official Canva site. Confirm current plan features, brand kit limits, and commercial usage terms before choosing.",
    sourceUrls: [
      "https://www.canva.com/",
      "https://www.canva.com/pricing/",
    ],
    seoTitle: "Canva Review for E-commerce: Design Speed, Brand Assets, Pricing, and Alternatives",
    seoDescription: "Review Canva for e-commerce marketing design, including templates, brand assets, creative tradeoffs, pricing fit, pros, cons, and alternatives.",
  },
  {
    name: "Zapier",
    slug: "zapier",
    categorySlugs: ["workflow-automation-tools"],
    websiteUrl: "https://zapier.com/",
    shortDescription: "No-code automation platform for connecting apps and automating repetitive workflows.",
    longDescription: "Zapier is a practical automation layer for small teams that need apps to talk to each other without custom engineering. For e-commerce operations, it can help connect forms, spreadsheets, email tools, CRMs, helpdesks, order workflows, and internal alerts.\n\nThe best use case is repetitive work that is easy to define and valuable to remove. As workflows become more complex or high volume, teams should watch task usage, error handling, and ownership. Zapier is usually easiest to justify when it saves recurring manual operations work across several tools.",
    pricingModel: "freemium",
    freePlanAvailable: true,
    keyFeatures: ["App automation", "Triggers and actions", "Multi-step workflows", "AI automation"],
    pros: ["Large integration ecosystem", "No-code setup", "Useful for operations automation"],
    cons: ["Costs can increase with task volume", "Complex workflows may need careful monitoring"],
    bestFor: ["Small teams", "E-commerce operators", "Marketing automation"],
    scores: [4, 3, 5, 5, 1, 4],
    decisionSummary: "Choose Zapier when you need reliable no-code connections across many business apps.",
    recommendedFor: ["Small operations teams", "Marketing automation", "Teams connecting many SaaS tools"],
    notRecommendedFor: ["Highly technical workflows needing self-hosting", "Very high-volume automations with tight cost control"],
    affiliateDisclosure: "This review links to the official Zapier site. Confirm current pricing, task limits, and app support before choosing.",
    sourceUrls: [
      "https://zapier.com/",
      "https://zapier.com/pricing",
    ],
    seoTitle: "Zapier Review for E-commerce: Automation Fit, Pricing, and Alternatives",
    seoDescription: "Review Zapier for e-commerce and marketing automation, including workflow use cases, pricing tradeoffs, pros, cons, and alternatives.",
  },
  {
    name: "Triple Whale",
    slug: "triple-whale",
    categorySlugs: ["analytics-attribution-tools"],
    websiteUrl: "https://www.triplewhale.com/",
    shortDescription: "E-commerce analytics and attribution platform for tracking performance and profitability.",
    longDescription: "Triple Whale is built for e-commerce teams that need a clearer operating view across revenue, ad performance, attribution, and profitability. It is most useful when a store has enough paid acquisition activity that native ad platform reporting no longer gives the whole picture.\n\nThe platform is less compelling for very early stores without meaningful ad spend or complex channel mix. For DTC teams with recurring reporting work, Triple Whale can reduce spreadsheet sprawl and help media buyers, founders, and growth teams look at performance from a commerce-first dashboard.",
    pricingModel: "paid",
    freePlanAvailable: false,
    keyFeatures: ["Marketing attribution", "Dashboards", "Profit tracking", "Customer insights"],
    pros: ["Built for e-commerce", "Useful revenue dashboards", "Good for paid marketing teams"],
    cons: ["Best value for stores with ad spend", "Requires data setup"],
    bestFor: ["DTC brands", "Media buyers", "Growth teams"],
    scores: [3, 3, 5, 4, 1, 4],
    decisionSummary: "Use Triple Whale when paid media, revenue dashboards, and attribution are central to growth decisions.",
    recommendedFor: ["DTC growth teams", "Media buyers", "Stores with meaningful ad spend"],
    notRecommendedFor: ["Early stores without paid acquisition", "Teams needing simple behavior analytics only"],
    affiliateDisclosure: "This review links to the official Triple Whale site. Confirm current pricing, attribution features, and platform integrations before choosing.",
    sourceUrls: [
      "https://www.triplewhale.com/",
      "https://www.triplewhale.com/pricing",
    ],
    seoTitle: "Triple Whale Review for E-commerce: Analytics, Attribution, Pricing, and Alternatives",
    seoDescription: "Review Triple Whale for e-commerce analytics and attribution, including paid media reporting fit, pricing tradeoffs, pros, cons, and alternatives.",
  },
  {
    name: "Tidio",
    slug: "tidio",
    categorySlugs: ["customer-support-tools"],
    websiteUrl: "https://www.tidio.com/",
    shortDescription: "Live chat and AI chatbot platform for customer support and lead capture.",
    longDescription: "Tidio is a lightweight support and chat option for stores that want to add live chat, chatbot flows, and lead capture without rolling out a heavier helpdesk. It is a practical first step when the team needs faster buyer responses but does not yet have a large support operation.\n\nThe main risk is assuming automation will work well without tuning. Chatbots still need careful setup, useful answers, and escalation paths. Tidio is strongest for small stores that want approachable chat automation and lead capture before moving into a deeper commerce support platform.",
    pricingModel: "freemium",
    freePlanAvailable: true,
    keyFeatures: ["Live chat", "AI chatbot", "Helpdesk tools", "Lead capture"],
    pros: ["Easy to install", "Good for small stores", "Combines chat and automation"],
    cons: ["Advanced automation may require paid plans", "Needs tuning for support quality"],
    bestFor: ["Small stores", "Support teams", "Lead capture workflows"],
    scores: [5, 4, 4, 4, 1, 4],
    decisionSummary: "Choose Tidio when you want live chat and basic AI support without a heavy helpdesk rollout.",
    recommendedFor: ["Small stores", "Lead capture", "Teams starting with chat automation"],
    notRecommendedFor: ["Large support teams needing deep commerce helpdesk workflows"],
    affiliateDisclosure: "This review links to the official Tidio site. Confirm current pricing, conversation limits, and AI feature availability before choosing.",
    sourceUrls: [
      "https://www.tidio.com/",
      "https://www.tidio.com/pricing/",
    ],
    seoTitle: "Tidio Review for E-commerce: Live Chat, AI Chatbots, Pricing, and Alternatives",
    seoDescription: "Review Tidio for online stores, including live chat, AI chatbot fit, lead capture, pricing tradeoffs, pros, cons, and alternatives.",
  },
  {
    name: "Omnisend",
    slug: "omnisend",
    categorySlugs: ["email-marketing-tools"],
    websiteUrl: "https://www.omnisend.com/",
    shortDescription: "Email and SMS marketing automation platform for e-commerce stores that want approachable campaigns, forms, and workflows.",
    longDescription: "Omnisend is a practical option for stores that want e-commerce email automation without starting with a complicated power-user setup. It is especially useful when a team needs email campaigns, popups, basic segmentation, and SMS support in one marketing workspace.\n\nCompared with Klaviyo, Omnisend usually feels easier to approach for small teams. The tradeoff is that advanced lifecycle teams may eventually want deeper segmentation or analytics. Before choosing it, compare plans against your actual subscriber count, monthly email volume, and SMS needs.",
    pricingModel: "freemium",
    freePlanAvailable: true,
    keyFeatures: ["Email campaigns", "SMS campaigns", "Automation templates", "Popups and signup forms", "Segmentation", "E-commerce integrations"],
    pros: ["E-commerce focused", "Good automation templates", "Accessible for smaller teams", "Email and SMS can live in one workflow"],
    cons: ["Advanced segmentation may need paid tiers", "Template quality depends on setup", "Power users may prefer deeper analytics"],
    bestFor: ["Small online stores", "Early retention programs", "Teams launching email and SMS together"],
    scores: [4, 4, 4, 4, 2, 3],
    decisionSummary: "Choose Omnisend when you want approachable e-commerce email automation without starting with a power-user setup.",
    recommendedFor: ["Small stores", "Early retention programs", "Teams wanting email and SMS basics", "Merchants who value templates and fast setup"],
    notRecommendedFor: ["Advanced lifecycle teams needing deep segmentation", "Teams that already have a mature retention operation"],
    affiliateDisclosure: "This review links to the official Omnisend site. Confirm current pricing, plan limits, and SMS terms before choosing.",
    sourceUrls: [
      "https://www.omnisend.com/",
      "https://www.omnisend.com/pricing/",
      "https://support.omnisend.com/en/articles/3533018-omnisend-pricing-plans-2026",
    ],
    seoTitle: "Omnisend Review for E-commerce: Email, SMS, Pricing Fit, and Alternatives",
    seoDescription: "Review Omnisend for e-commerce email and SMS marketing, including use cases, automation templates, pricing tradeoffs, pros, cons, and alternatives.",
  },
  {
    name: "n8n",
    slug: "n8n",
    categorySlugs: ["workflow-automation-tools"],
    websiteUrl: "https://n8n.io/",
    shortDescription: "Workflow automation platform with self-hosting options and flexible integrations.",
    longDescription: "n8n is a flexible automation platform for teams that want more control than typical no-code connectors provide. It is especially appealing when technical operators need API workflows, data routing, custom logic, and self-hosting options for sensitive or complex processes.\n\nThe tradeoff is operational responsibility. n8n can be powerful, but teams need someone who can maintain workflows, monitor failures, and think through data handling. It is a better fit for automation-heavy teams than for merchants who want the fastest possible plug-and-play app connection.",
    pricingModel: "freemium",
    freePlanAvailable: true,
    keyFeatures: ["Workflow automation", "Self-hosting", "API integrations", "Data workflows"],
    pros: ["Flexible for technical teams", "Self-hosting available", "Good for custom automations"],
    cons: ["More technical than some no-code tools", "Requires workflow maintenance"],
    bestFor: ["Technical operators", "Automation-heavy teams", "Custom data workflows"],
    scores: [2, 5, 5, 5, 1, 3],
    decisionSummary: "Choose n8n when flexibility and self-hosting matter more than the simplest possible setup.",
    recommendedFor: ["Technical operators", "Automation-heavy teams", "Self-hosted workflows"],
    notRecommendedFor: ["Non-technical teams wanting plug-and-play automation"],
    affiliateDisclosure: "This review links to the official n8n site. Confirm current cloud pricing, self-hosting terms, and integration support before choosing.",
    sourceUrls: [
      "https://n8n.io/",
      "https://n8n.io/pricing/",
    ],
    seoTitle: "n8n Review for E-commerce Automation: Self-Hosting, Workflows, Pricing, and Alternatives",
    seoDescription: "Review n8n for e-commerce automation, including self-hosting fit, API workflows, maintenance tradeoffs, pricing context, pros, cons, and alternatives.",
  },
  {
    name: "Ahrefs",
    slug: "ahrefs",
    categorySlugs: ["seo-keyword-tools", "analytics-attribution-tools"],
    websiteUrl: "https://ahrefs.com/",
    shortDescription: "SEO platform for keyword research, backlink analysis, rank tracking, and competitive research.",
    longDescription: "Ahrefs is best known for SEO research, especially backlink analysis, keyword discovery, competitor research, and rank tracking. For content-led e-commerce brands, it can help identify category-page opportunities, comparison keywords, informational topics, and competitor pages that already earn search demand.\n\nIt is not an e-commerce-specific operating system, so the value depends on whether the team will actively use SEO research to plan content and improve pages. Ahrefs is easier to justify when organic search is a real acquisition channel and the team needs reliable research data rather than occasional keyword checks.",
    pricingModel: "paid",
    freePlanAvailable: false,
    keyFeatures: ["Keyword explorer", "Site explorer", "Rank tracking", "Content research"],
    pros: ["Strong SEO data", "Excellent backlink analysis", "Good competitive insights"],
    cons: ["Premium pricing", "Not e-commerce-specific"],
    bestFor: ["SEO teams", "Content-led stores", "Agencies"],
    scores: [3, 3, 4, 3, 5, 4],
    decisionSummary: "Use Ahrefs when backlink, keyword, and competitor research are core to your organic growth plan.",
    recommendedFor: ["SEO teams", "Agencies", "Content-led e-commerce brands"],
    notRecommendedFor: ["Stores not investing in SEO", "Teams needing marketplace-only data"],
    affiliateDisclosure: "This review links to the official Ahrefs site. Confirm current pricing, usage limits, and included SEO tools before choosing.",
    sourceUrls: [
      "https://ahrefs.com/",
      "https://ahrefs.com/pricing",
    ],
    seoTitle: "Ahrefs Review for E-commerce: Keyword Research, Backlinks, Pricing, and Alternatives",
    seoDescription: "Review Ahrefs for e-commerce SEO research, including keyword and backlink strengths, pricing tradeoffs, pros, cons, and alternatives.",
  },
  {
    name: "PageFly",
    slug: "pagefly",
    categorySlugs: ["listing-optimization-tools"],
    websiteUrl: "https://pagefly.io/",
    shortDescription: "Shopify page builder for landing pages, product pages, and conversion-focused layouts.",
    longDescription: "PageFly is a Shopify page builder for merchants who need more landing-page and product-page flexibility than their theme provides. It is useful when marketing teams want to launch campaign pages, test layouts, or build custom sections without waiting for full theme development.\n\nThe main tradeoff is performance and maintenance discipline. Page builders can help teams move quickly, but each page still needs mobile QA, page speed checks, and a clear ownership model. PageFly is best when speed of page production matters and the team is willing to review the output carefully.",
    pricingModel: "freemium",
    freePlanAvailable: true,
    keyFeatures: ["Shopify page builder", "Landing pages", "Templates", "Responsive editing"],
    pros: ["Shopify-focused", "Useful for custom landing pages", "No-code editing"],
    cons: ["Adds another app dependency", "Page performance should be monitored"],
    bestFor: ["Shopify merchants", "Landing page testing", "Conversion page design"],
    scores: [4, 4, 5, 3, 3, 3],
    decisionSummary: "Choose PageFly when Shopify landing pages and product-page experiments matter more than a custom-coded theme workflow.",
    recommendedFor: ["Shopify merchants", "Landing page testing", "Conversion page production"],
    notRecommendedFor: ["Teams with strict custom theme engineering workflows"],
    affiliateDisclosure: "This review links to the official PageFly site. Confirm current pricing, Shopify compatibility, and page limits before choosing.",
    sourceUrls: [
      "https://pagefly.io/",
      "https://pagefly.io/pages/pricing",
    ],
    seoTitle: "PageFly Review for Shopify: Landing Pages, Product Pages, Pricing, and Alternatives",
    seoDescription: "Review PageFly for Shopify page building, including landing-page use cases, conversion workflow fit, performance tradeoffs, pricing, pros, cons, and alternatives.",
  },
  {
    name: "AdCreative.ai",
    slug: "adcreative-ai",
    categorySlugs: ["ad-creative-tools"],
    websiteUrl: "https://www.adcreative.ai/",
    shortDescription: "AI platform for generating ad creatives, social posts, and marketing visuals.",
    longDescription: "AdCreative.ai is aimed at teams that need more ad variants than they can comfortably produce by hand. It can be useful when performance marketers want quick creative drafts, social post options, and campaign visuals to test across paid channels.\n\nThe important caveat is review quality. AI-generated creative still needs brand checks, claims review, offer accuracy, and performance analysis after launch. AdCreative.ai is strongest when it speeds up variant production inside an existing testing process rather than replacing creative strategy.",
    pricingModel: "paid",
    freePlanAvailable: false,
    keyFeatures: ["AI ad creatives", "Creative scoring", "Brand assets", "Social visuals"],
    pros: ["Focused on ad creative production", "Can generate many variants", "Useful for testing"],
    cons: ["Outputs still need human review", "Creative quality depends on inputs"],
    bestFor: ["Performance marketers", "Small brands needing creative volume", "Ad testing workflows"],
    scores: [4, 3, 3, 4, 1, 3],
    decisionSummary: "Use AdCreative.ai when your bottleneck is producing enough ad variants for testing.",
    recommendedFor: ["Performance marketers", "Brands testing paid ads", "Teams needing creative volume"],
    notRecommendedFor: ["Teams needing broad design work", "Brands without a review process for generated creative"],
    affiliateDisclosure: "This review links to the official AdCreative.ai site. Confirm current pricing, usage limits, and commercial terms before choosing.",
    sourceUrls: [
      "https://www.adcreative.ai/",
      "https://www.adcreative.ai/pricing",
    ],
    seoTitle: "AdCreative.ai Review for E-commerce Ads: Creative Variants, Pricing, and Alternatives",
    seoDescription: "Review AdCreative.ai for e-commerce ad creative production, including testing workflows, creative tradeoffs, pricing fit, pros, cons, and alternatives.",
  },
  {
    name: "Surfer SEO",
    slug: "surfer-seo",
    categorySlugs: ["seo-keyword-tools", "listing-optimization-tools"],
    websiteUrl: "https://surferseo.com/",
    shortDescription: "Content optimization platform for SEO briefs, writing, and on-page content scoring.",
    longDescription: "Surfer SEO is useful for teams that publish search-focused content and want a more repeatable briefing and optimization workflow. For e-commerce sites, it can support category content, comparison articles, buying guides, and educational pages that need clearer on-page structure.\n\nIts recommendations should not be treated as automatic truth. Search pages still need original judgment, product knowledge, and useful decision context. Surfer SEO is best when it helps editors build better briefs and check coverage, while humans keep control of positioning and usefulness.",
    pricingModel: "paid",
    freePlanAvailable: false,
    keyFeatures: ["Content editor", "SEO briefs", "SERP analysis", "Content scoring"],
    pros: ["Useful content optimization workflow", "Good for briefs and outlines", "SEO-focused recommendations"],
    cons: ["Not marketplace-specific", "Recommendations still need editorial judgment"],
    bestFor: ["Content teams", "SEO landing pages", "E-commerce blogs"],
    scores: [4, 3, 3, 3, 5, 3],
    decisionSummary: "Choose Surfer SEO when you publish SEO content and need repeatable briefs and on-page optimization checks.",
    recommendedFor: ["SEO content teams", "E-commerce blogs", "Landing page optimization"],
    notRecommendedFor: ["Marketplace-only sellers", "Teams not producing search content"],
    affiliateDisclosure: "This review links to the official Surfer SEO site. Confirm current pricing, usage limits, and included content tools before choosing.",
    sourceUrls: [
      "https://surferseo.com/",
      "https://surferseo.com/pricing/",
    ],
    seoTitle: "Surfer SEO Review for E-commerce Content: Briefs, Optimization, Pricing, and Alternatives",
    seoDescription: "Review Surfer SEO for e-commerce SEO content workflows, including briefs, content scoring, editorial tradeoffs, pricing, pros, cons, and alternatives.",
  },
  {
    name: "Postscript",
    slug: "postscript",
    categorySlugs: ["email-marketing-tools"],
    websiteUrl: "https://postscript.io/",
    shortDescription: "SMS marketing platform built for Shopify brands that want subscriber growth, automations, and two-way customer messaging.",
    longDescription: "Postscript is best viewed as an SMS-first retention platform for Shopify brands rather than a general email marketing suite. It is a stronger candidate when text messaging is expected to become a meaningful owned channel and the team can manage consent, campaign quality, and compliance.\n\nThe main reason to consider Postscript alongside Klaviyo or Omnisend is focus. If the brand wants deeper Shopify SMS workflows, subscriber growth tools, two-way conversations, and SMS-specific analytics, Postscript deserves a closer look. If the team only needs simple newsletters or basic email automation, it is probably too specialized.",
    pricingModel: "paid",
    freePlanAvailable: false,
    keyFeatures: ["SMS campaigns", "SMS automations", "Shopify integration", "Subscriber growth tools", "Two-way messaging", "SMS analytics"],
    pros: ["Shopify-focused", "Strong SMS marketing workflows", "Good for retention campaigns", "Built around SMS as a primary channel"],
    cons: ["SMS compliance matters", "Best for brands with enough traffic", "Not a complete replacement for an email platform"],
    bestFor: ["Shopify brands", "Retention marketers", "SMS lifecycle campaigns", "Stores with repeat buyers"],
    scores: [3, 3, 4, 4, 1, 4],
    decisionSummary: "Choose Postscript when SMS is a serious retention channel for your Shopify brand.",
    recommendedFor: ["Shopify brands", "SMS marketers", "Stores with repeat buyers", "Teams that want SMS-specific workflows"],
    notRecommendedFor: ["Stores without SMS consent strategy", "Teams only needing email", "Very early stores without enough traffic"],
    affiliateDisclosure: "This review links to the official Postscript site. Confirm current plan structure, usage billing, and compliance requirements before choosing.",
    sourceUrls: [
      "https://postscript.io/",
      "https://postscript.io/features",
      "https://help.postscript.io/hc/en-us/articles/4456807199259",
    ],
    seoTitle: "Postscript Review for Shopify SMS Marketing: Features and Alternatives",
    seoDescription: "Review Postscript for Shopify SMS marketing, including subscriber growth, automations, pricing fit, pros, cons, and alternatives.",
  },
  {
    name: "Replo",
    slug: "replo",
    categorySlugs: ["listing-optimization-tools", "ad-creative-tools"],
    websiteUrl: "https://www.replo.app/",
    shortDescription: "Landing page builder for Shopify teams creating custom product and campaign pages.",
    longDescription: "Replo is a Shopify-focused landing page builder for growth teams that need polished campaign pages, product storytelling pages, and reusable commerce sections without a full custom theme sprint. It is strongest when the team is actively testing offers, angles, or landing-page layouts.\n\nThe value depends on design discipline and QA. A visual builder can speed production, but conversion pages still need fast loading, mobile checks, clear messaging, and consistent brand rules. Replo is a better fit for Shopify teams with real page testing needs than for stores that rarely create custom campaign pages.",
    pricingModel: "paid",
    freePlanAvailable: false,
    keyFeatures: ["Shopify landing pages", "Reusable sections", "Campaign pages", "Visual editing"],
    pros: ["Strong for Shopify landing pages", "Good design flexibility", "Useful for campaign pages"],
    cons: ["Paid tool", "Needs design discipline for consistent pages"],
    bestFor: ["Shopify growth teams", "Landing page production", "Campaign testing"],
    scores: [4, 3, 5, 3, 3, 3],
    decisionSummary: "Use Replo when your Shopify team needs polished campaign pages without waiting on theme development.",
    recommendedFor: ["Shopify growth teams", "Campaign landing pages", "Conversion testing"],
    notRecommendedFor: ["Very small stores without page testing needs"],
    affiliateDisclosure: "This review links to the official Replo site. Confirm current pricing, Shopify support, and publishing limits before choosing.",
    sourceUrls: [
      "https://www.replo.app/",
      "https://www.replo.app/pricing",
    ],
    seoTitle: "Replo Review for Shopify: Landing Pages, Campaign Pages, Pricing, and Alternatives",
    seoDescription: "Review Replo for Shopify landing pages, including campaign production fit, design tradeoffs, pricing context, pros, cons, and alternatives.",
  },
  {
    name: "Hotjar",
    slug: "hotjar",
    categorySlugs: ["analytics-attribution-tools"],
    websiteUrl: "https://www.hotjar.com/",
    shortDescription: "Behavior analytics platform with heatmaps, recordings, surveys, and feedback tools.",
    longDescription: "Hotjar helps teams understand visitor behavior through heatmaps, session recordings, surveys, and feedback. For e-commerce sites, it is useful when analytics show a problem but the team needs qualitative context about what shoppers are seeing, missing, or struggling with.\n\nIt is not a replacement for revenue attribution or full product analytics. Hotjar works best as a conversion research layer: identify confusing pages, review checkout or product-page behavior, and collect user feedback before making design changes. Privacy settings and consent requirements should be reviewed before launch.",
    pricingModel: "freemium",
    freePlanAvailable: true,
    keyFeatures: ["Heatmaps", "Session recordings", "Surveys", "User feedback"],
    pros: ["Good qualitative insights", "Easy to understand behavior", "Useful for conversion research"],
    cons: ["Not a full attribution platform", "Privacy setup needs care"],
    bestFor: ["Store optimization", "UX research", "Conversion analysis"],
    scores: [5, 4, 4, 2, 2, 4],
    decisionSummary: "Use Hotjar when you need qualitative behavior insight to understand why shoppers do or do not convert.",
    recommendedFor: ["UX research", "Conversion analysis", "Small optimization teams"],
    notRecommendedFor: ["Teams needing full revenue attribution", "Stores unable to manage privacy settings"],
    affiliateDisclosure: "This review links to the official Hotjar site. Confirm current pricing, traffic limits, privacy settings, and feature availability before choosing.",
    sourceUrls: [
      "https://www.hotjar.com/",
      "https://www.hotjar.com/pricing/",
    ],
    seoTitle: "Hotjar Review for E-commerce: Heatmaps, Recordings, Pricing, and Alternatives",
    seoDescription: "Review Hotjar for e-commerce behavior analytics, including heatmaps, recordings, surveys, privacy tradeoffs, pricing, pros, cons, and alternatives.",
  },
  {
    name: "Loox",
    slug: "loox",
    categorySlugs: ["listing-optimization-tools"],
    websiteUrl: "https://loox.app/",
    shortDescription: "Shopify reviews and referrals app focused on photo reviews and social proof.",
    longDescription: "Loox is built for Shopify merchants that want to collect and display product reviews, especially visual reviews that add social proof to product pages. It can help stores make buyer feedback more visible at the point where shoppers are deciding whether to trust a product.\n\nThe platform is only as useful as the review collection process behind it. Stores still need post-purchase timing, clear review requests, moderation rules, and honest presentation. Loox is strongest for Shopify brands where product-page trust and customer-generated visuals can directly support conversion.",
    pricingModel: "paid",
    freePlanAvailable: false,
    keyFeatures: ["Photo reviews", "Referral tools", "Review widgets", "Shopify integration"],
    pros: ["Strong social proof features", "Easy Shopify integration", "Helpful for product pages"],
    cons: ["Shopify-focused", "Review quality depends on customer participation"],
    bestFor: ["Shopify stores", "Product page trust", "Review collection"],
    scores: [4, 4, 5, 3, 2, 3],
    decisionSummary: "Choose Loox when product-page social proof and visual reviews are important to conversion.",
    recommendedFor: ["Shopify stores", "Review collection", "Social proof workflows"],
    notRecommendedFor: ["Non-Shopify stores", "Teams that do not actively collect reviews"],
    affiliateDisclosure: "This review links to the official Loox site. Confirm current pricing, Shopify compatibility, and review display features before choosing.",
    sourceUrls: [
      "https://loox.app/",
      "https://loox.app/pricing",
    ],
    seoTitle: "Loox Review for Shopify: Photo Reviews, Referrals, Pricing, and Alternatives",
    seoDescription: "Review Loox for Shopify reviews and social proof, including photo review workflows, referral features, pricing tradeoffs, pros, cons, and alternatives.",
  },
];

const bestLists = [
  {
    title: "Best AI Tools for Shopify Stores",
    slug: "best-ai-tools-for-shopify-stores",
    categorySlug: "listing-optimization-tools",
    toolSlugs: ["shopify-magic", "klaviyo", "gorgias", "pagefly", "replo", "loox"],
    intro: "A practical shortlist of tools for Shopify merchants who want to improve content, retention, support, landing pages, and product-page trust.",
    selectionCriteria: ["Native Shopify fit", "Revenue impact", "Ease of implementation", "Automation value", "Editorial review required before production use"],
    verdict: "Start with tools that improve conversion and retention before adding complex analytics or automation.",
    seoTitle: "Best AI Tools for Shopify Stores",
    seoDescription: "Compare practical AI and growth tools for Shopify stores, including content, retention, support, landing pages, and social proof tools.",
  },
  {
    title: "Best Product Research Tools for Amazon Sellers",
    slug: "best-product-research-tools-for-amazon-sellers",
    categorySlug: "product-research-tools",
    toolSlugs: ["jungle-scout", "helium-10"],
    intro: "A focused shortlist for Amazon sellers validating product ideas, keyword demand, and marketplace opportunities.",
    selectionCriteria: ["Amazon-specific data", "Keyword workflows", "Market validation", "Listing support"],
    verdict: "Use product research data as a filter, then validate demand, margin, and competition with your own operating numbers.",
    seoTitle: "Best Product Research Tools for Amazon Sellers",
    seoDescription: "Compare product research tools for Amazon sellers, including Jungle Scout and Helium 10.",
  },
  {
    title: "Best Email Marketing Tools for E-commerce",
    slug: "best-email-marketing-tools-for-ecommerce",
    categorySlug: "email-marketing-tools",
    toolSlugs: ["klaviyo", "omnisend", "postscript"],
    intro: "A decision-focused shortlist for stores building abandoned cart flows, welcome series, post-purchase campaigns, winback emails, SMS programs, and customer retention systems.",
    selectionCriteria: [
      "E-commerce segmentation and purchase behavior data",
      "Automation templates for abandoned cart, welcome, winback, and post-purchase flows",
      "Shopify and commerce platform integrations",
      "Revenue reporting and campaign attribution",
      "SMS support, consent handling, and channel fit",
      "Ease of maintenance for a small marketing team",
    ],
    verdict: "Choose Klaviyo when retention is a major revenue channel and the team can manage deeper segmentation. Choose Omnisend when you want a faster, simpler email and SMS setup. Choose Postscript when Shopify SMS is the main channel to evaluate.",
    seoTitle: "Best Email Marketing Tools for E-commerce Stores",
    seoDescription: "Compare Klaviyo, Omnisend, and Postscript for e-commerce email marketing, SMS, automation, segmentation, retention, and revenue growth.",
  },
];

const comparisons = [
  {
    title: "Klaviyo vs Omnisend",
    slug: "klaviyo-vs-omnisend",
    toolASlug: "klaviyo",
    toolBSlug: "omnisend",
    summary: "Klaviyo is the stronger choice for brands that need advanced segmentation, customer data, and lifecycle reporting. Omnisend is usually easier for smaller stores that want email, SMS, popups, and automation templates without a heavy setup.",
    recommendation: "Choose Klaviyo if repeat purchase, segmentation, and revenue analytics are central to your retention strategy. Choose Omnisend if you need a simpler e-commerce marketing workspace that a small team can launch and maintain quickly.",
    featureNotes: [
      "Both support e-commerce email automation and campaign workflows",
      "Both can support SMS, but plan limits and channel costs should be checked before purchase",
      "Klaviyo is better suited to deeper customer segmentation and lifecycle analysis",
      "Omnisend is easier to approach for small stores that want templates, forms, and practical automation",
      "Neither tool removes the need for strong offers, deliverability hygiene, and ongoing flow maintenance",
    ],
    pricingNotes: "Both platforms can become more expensive as contacts and send volume grow. Model pricing with your actual subscriber count, expected monthly sends, and SMS usage before choosing.",
    verdict: "Klaviyo is the stronger power-user platform for retention teams; Omnisend is the more approachable starting point for many small and mid-sized stores.",
    seoTitle: "Klaviyo vs Omnisend: Which Is Better for E-commerce?",
    seoDescription: "Compare Klaviyo and Omnisend for e-commerce email marketing, automation, segmentation, SMS, and store growth.",
  },
  {
    title: "Helium 10 vs Jungle Scout",
    slug: "helium-10-vs-jungle-scout",
    toolASlug: "helium-10",
    toolBSlug: "jungle-scout",
    summary: "Helium 10 offers a broad Amazon seller toolkit across keywords, listings, and research. Jungle Scout is especially known for product research and market validation workflows.",
    recommendation: "Choose Helium 10 if you want a broad suite. Choose Jungle Scout if product discovery and validation are the main job.",
    featureNotes: ["Both focus heavily on Amazon sellers", "Helium 10 covers more listing and keyword workflows", "Jungle Scout is strong for product research workflows"],
    pricingNotes: "Review current plan limits before choosing because feature access can vary by tier.",
    verdict: "Helium 10 is broader; Jungle Scout is a focused product research pick.",
    seoTitle: "Helium 10 vs Jungle Scout: Amazon Seller Tool Comparison",
    seoDescription: "Compare Helium 10 and Jungle Scout for Amazon product research, keywords, listings, and seller workflows.",
  },
  {
    title: "Canva vs AdCreative.ai",
    slug: "canva-vs-adcreative-ai",
    toolASlug: "canva",
    toolBSlug: "adcreative-ai",
    summary: "Canva is a broad design platform for marketing assets, while AdCreative.ai is more focused on generating performance ad creative variants.",
    recommendation: "Choose Canva for general brand and content design. Choose AdCreative.ai when your priority is producing many paid ad creative variants for testing.",
    featureNotes: ["Canva has a broad template ecosystem", "AdCreative.ai is focused on ad generation", "Both still need human review for brand fit"],
    pricingNotes: "Canva has a generous free entry point; AdCreative.ai is more specialized and typically paid.",
    verdict: "Canva is the flexible design workspace; AdCreative.ai is the specialized ad creative generator.",
    seoTitle: "Canva vs AdCreative.ai: Which Creative Tool Should Stores Use?",
    seoDescription: "Compare Canva and AdCreative.ai for e-commerce ad creatives, social visuals, design templates, and creative testing.",
  },
];

const alternatives = [
  {
    title: "Best Klaviyo Alternatives",
    slug: "klaviyo-alternatives",
    primaryToolSlug: "klaviyo",
    alternativeToolSlugs: ["omnisend", "postscript"],
    intro: "Klaviyo is powerful, but not every store needs that much segmentation and lifecycle infrastructure on day one. Stores often compare alternatives when they want easier setup, a different SMS workflow, or a lower-friction retention stack.",
    whyLookForAlternatives: [
      "Pricing and complexity can increase as contact lists and message volume grow",
      "Smaller teams may prefer a simpler campaign and automation workflow",
      "SMS strategy may require a more focused Shopify SMS platform",
      "Some stores want templates and forms before deep segmentation",
    ],
    selectionCriteria: [
      "Email automation depth",
      "Ease of use for a small marketing team",
      "SMS support and consent workflow",
      "Shopify integration quality",
      "Reporting and attribution fit",
      "Migration effort from existing campaigns and flows",
    ],
    verdict: "Omnisend is the first Klaviyo alternative to review for smaller stores that want approachable email and SMS automation. Postscript is the focused alternative when Shopify SMS is the main reason you are comparing options.",
    seoTitle: "Best Klaviyo Alternatives for E-commerce Stores",
    seoDescription: "Compare Klaviyo alternatives for e-commerce email, SMS, automation, segmentation, and retention workflows.",
  },
  {
    title: "Best Jungle Scout Alternatives",
    slug: "jungle-scout-alternatives",
    primaryToolSlug: "jungle-scout",
    alternativeToolSlugs: ["helium-10"],
    intro: "Sellers often compare Jungle Scout alternatives when they need broader keyword, listing, and Amazon operations workflows.",
    whyLookForAlternatives: ["Need broader Amazon seller features", "Need listing optimization workflows", "Want a different keyword research workflow"],
    selectionCriteria: ["Product research", "Keyword tools", "Listing optimization", "Market tracking"],
    verdict: "Helium 10 is the most obvious alternative when you want a broader Amazon seller suite.",
    seoTitle: "Best Jungle Scout Alternatives for Amazon Sellers",
    seoDescription: "Compare Jungle Scout alternatives for Amazon product research, keyword workflows, and marketplace seller operations.",
  },
];

async function findFirst(uid, filters) {
  return strapi.documents(uid).findFirst({ filters });
}

async function createIfMissing(uid, filters, data, options = {}) {
  const existing = await findFirst(uid, filters);
  if (existing) {
    return existing;
  }

  return strapi.documents(uid).create({
    data,
    ...(options.publish ? { status: "published" } : {}),
  });
}

async function upsertPublished(uid, filters, data) {
  const existing = await findFirst(uid, filters);
  if (existing) {
    return strapi.documents(uid).update({
      documentId: existing.documentId,
      data,
      status: "published",
    });
  }

  return strapi.documents(uid).create({
    data,
    status: "published",
  });
}

async function upsertSampleTool(filters, data) {
  const existing = await findFirst("api::tool.tool", filters);

  if (existing) {
    return strapi.documents("api::tool.tool").update({
      documentId: existing.documentId,
      data,
      status: "published",
    });
  }

  return strapi.documents("api::tool.tool").create({
    data,
    status: "published",
  });
}

async function seedBestLists(categoryBySlug, toolBySlug) {
  for (const list of bestLists) {
    const category = categoryBySlug.get(list.categorySlug);
    const toolIds = list.toolSlugs.map((slug) => toolBySlug.get(slug)).filter(Boolean).map((tool) => tool.id);

    await upsertPublished(
      "api::best-list.best-list",
      { slug: { $eq: list.slug } },
      {
        title: list.title,
        slug: list.slug,
        intro: list.intro,
        selectionCriteria: list.selectionCriteria,
        verdict: list.verdict,
        seoTitle: list.seoTitle,
        seoDescription: list.seoDescription,
        category: category?.id ? { connect: [category.id] } : undefined,
        tools: toolIds.length ? { connect: toolIds } : undefined,
      }
    );
  }
}

async function seedComparisons(toolBySlug) {
  for (const comparison of comparisons) {
    const toolA = toolBySlug.get(comparison.toolASlug);
    const toolB = toolBySlug.get(comparison.toolBSlug);

    await upsertPublished(
      "api::comparison.comparison",
      { slug: { $eq: comparison.slug } },
      {
        title: comparison.title,
        slug: comparison.slug,
        summary: comparison.summary,
        recommendation: comparison.recommendation,
        featureNotes: comparison.featureNotes,
        pricingNotes: comparison.pricingNotes,
        verdict: comparison.verdict,
        seoTitle: comparison.seoTitle,
        seoDescription: comparison.seoDescription,
        toolA: toolA?.id ? { connect: [toolA.id] } : undefined,
        toolB: toolB?.id ? { connect: [toolB.id] } : undefined,
      }
    );
  }
}

async function seedAlternatives(toolBySlug) {
  for (const alternative of alternatives) {
    const primaryTool = toolBySlug.get(alternative.primaryToolSlug);
    const alternativeToolIds = alternative.alternativeToolSlugs
      .map((slug) => toolBySlug.get(slug))
      .filter(Boolean)
      .map((tool) => tool.id);

    await upsertPublished(
      "api::alternative.alternative",
      { slug: { $eq: alternative.slug } },
      {
        title: alternative.title,
        slug: alternative.slug,
        intro: alternative.intro,
        whyLookForAlternatives: alternative.whyLookForAlternatives,
        selectionCriteria: alternative.selectionCriteria,
        verdict: alternative.verdict,
        seoTitle: alternative.seoTitle,
        seoDescription: alternative.seoDescription,
        primaryTool: primaryTool?.id ? { connect: [primaryTool.id] } : undefined,
        alternativeTools: alternativeToolIds.length ? { connect: alternativeToolIds } : undefined,
      }
    );
  }
}

async function seedSampleData(strapi) {
  strapi.log.info("[seed] Checking sample data");

  const source = await createIfMissing(
    "api::source.source",
    { url: { $eq: "https://example.com/manual-seed" } },
    {
      name: "Manual MVP Seed",
      sourceType: "manual_submission",
      url: "https://example.com/manual-seed",
      permissionNotes: "Local sample data for MVP development. Replace with verified source records before production.",
      fetchFrequency: "manual",
      status: "active",
      lastCheckedAt: new Date().toISOString(),
    }
  );

  const categoryBySlug = new Map();
  const toolBySlug = new Map();

  for (const category of categories) {
    const entry = await upsertPublished(
      "api::category.category",
      { slug: { $eq: category.slug } },
      {
        ...category,
        indexable: true,
      }
    );
    categoryBySlug.set(category.slug, entry);
  }

  for (const tool of tools) {
    const categoryIds = tool.categorySlugs
      .map((slug) => categoryBySlug.get(slug))
      .filter(Boolean)
      .map((category) => category.id);

    const scoreValues = tool.scores || [];
    const entry = await upsertSampleTool(
      { slug: { $eq: tool.slug } },
      {
        name: tool.name,
        slug: tool.slug,
        editorialStatus: "published",
        websiteUrl: tool.websiteUrl,
        affiliateUrl: tool.affiliateUrl,
        affiliateDisclosure: tool.affiliateDisclosure,
        shortDescription: tool.shortDescription,
        longDescription: tool.longDescription || `${tool.shortDescription}\n\nThis sample entry is intended for local MVP development. Verify pricing, features, and affiliate details before publishing production content.`,
        pricingModel: tool.pricingModel,
        startingPrice: tool.startingPrice,
        freePlanAvailable: tool.freePlanAvailable,
        keyFeatures: tool.keyFeatures,
        pros: tool.pros,
        cons: tool.cons,
        bestFor: tool.bestFor,
        decisionSummary: tool.decisionSummary,
        easeOfUseScore: scoreValues[0],
        pricingValueScore: scoreValues[1],
        integrationScore: scoreValues[2],
        automationDepthScore: scoreValues[3],
        seoUsefulnessScore: scoreValues[4],
        supportQualityScore: scoreValues[5],
        recommendedFor: tool.recommendedFor,
        notRecommendedFor: tool.notRecommendedFor,
        sourceUrls: tool.sourceUrls || [tool.websiteUrl],
        lastImportedAt: new Date().toISOString(),
        lastReviewedAt: new Date().toISOString(),
        seoTitle: tool.seoTitle || `${tool.name} Review, Pricing, Features, and Alternatives`,
        seoDescription: tool.seoDescription || `Learn what ${tool.name} does, who it is best for, key features, pricing notes, pros, cons, and alternatives for e-commerce sellers.`,
        categories: categoryIds.length > 0 ? { connect: categoryIds } : undefined,
        sources: source.id ? { connect: [source.id] } : undefined,
      }
    );
    toolBySlug.set(tool.slug, entry);
  }

  await seedBestLists(categoryBySlug, toolBySlug);
  await seedComparisons(toolBySlug);
  await seedAlternatives(toolBySlug);

  await createIfMissing(
    "api::import-log.import-log",
    { notes: { $contains: "Initial local sample seed completed" } },
    {
      runStatus: "success",
      startedAt: new Date().toISOString(),
      finishedAt: new Date().toISOString(),
      recordsCreated: categories.length + tools.length + 1,
      recordsUpdated: 0,
      notes: "Initial local sample seed completed.",
      source: source.id ? { connect: [source.id] } : undefined,
    }
  );

  strapi.log.info(
    `[seed] Sample data ready: ${categories.length} categories, ${tools.length} tools, ${bestLists.length} best lists, ${comparisons.length} comparisons, ${alternatives.length} alternatives`
  );
}

module.exports = {
  seedSampleData,
};
