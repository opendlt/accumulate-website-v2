export const NAV_ITEMS = [
  { label: "Use Cases", href: "/use-cases" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Ecosystem", href: "/ecosystem" },
  { label: "Progress", href: "/progress" },
  { label: "Pilot", href: "/pilot" },
  { label: "Docs", href: "/docs" },
  { label: "Security", href: "/security" },
] as const;

export const UTILITY_NAV = [
  { label: "About", href: "/about" },
  { label: "Network Status", href: "/network-status" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_LINKS = {
  product: [
    { label: "Use Cases", href: "/use-cases" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Pilot", href: "/pilot" },
    { label: "Security", href: "/security" },
  ],
  developers: [
    { label: "Documentation", href: "/docs" },
    { label: "Quickstart", href: "/docs#quickstart" },
    { label: "GitLab", href: "https://gitlab.com/accumulatenetwork" },
    { label: "SDKs", href: "/docs#sdks" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Ecosystem", href: "/ecosystem" },
    { label: "Whitepaper", href: "https://accumulatenetwork.io/whitepaper/" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
  ],
} as const;

export const TRUST_BOUNDARY_CHECKLIST = [
  {
    id: "multi-org",
    label: "Multiple organizations must approve or attest to the same record",
  },
  {
    id: "no-single-admin",
    label: "No single party can be the system administrator",
  },
  {
    id: "authority-changes",
    label: "Authority changes constantly (vendors, turnover, rotations)",
  },
  {
    id: "independent-verification",
    label: "Audits/investigations require independent verification",
  },
  {
    id: "durable-proof",
    label: "Evidence must remain valid after systems, vendors, or teams are gone",
  },
] as const;

export const PILOT_TRACKS = [
  {
    id: "vendor-authority",
    title: "Vendor / Contractor Authority",
    outcome: "Verifiable delegation windows across vendors and systems.",
    exampleWorkflow: "Vendor access window approvals.",
    href: "/use-cases/vendor-authority",
  },
  {
    id: "treasury-controls",
    title: "Treasury & Multi-Entity Controls",
    outcome: "Threshold approvals and delegation for high-value actions.",
    exampleWorkflow: "Release approvals for payouts.",
    href: "/use-cases/treasury-controls",
  },
  {
    id: "coalition-delegation",
    title: "Government / Coalition Delegation",
    outcome: "Federated authority without a single administrator.",
    exampleWorkflow: "Delegated approval for shared operations.",
    href: "/use-cases/coalition-delegation",
  },
] as const;

export const CREDIT_PRICING = [
  { operation: "Create Identity (ADI)", usd: "$5.00" },
  { operation: "Create Token Account", usd: "$0.25" },
  { operation: "Create Data Account", usd: "$0.25" },
  { operation: "Create Key Book", usd: "$1.00" },
  { operation: "Create Key Page", usd: "$1.00" },
  { operation: "Send Tokens", usd: "$0.03" },
  { operation: "Update Key Page", usd: "$0.03" },
  { operation: "Write Data", usd: "$0.001" },
  { operation: "Sign Transaction", usd: "$0.0001" },
] as const;

export const PILOT_TIMELINE = [
  {
    phase: 1,
    label: "Days 1–3",
    title: "Model & encode",
    description:
      "Identity map (org → sites → vendors → roles). Authority policies, thresholds, delegation scopes, and recovery rules.",
  },
  {
    phase: 2,
    label: "Days 4–7",
    title: "Integrate one workflow",
    description:
      "Integration reference + event/proof outputs. Verification checklist for auditors.",
  },
  {
    phase: 3,
    label: "Week 2",
    title: "Run, measure & report",
    description:
      "Prove the value in production. Pilot report with ROI measures. Rollout plan for additional sites/vendors/workflows.",
  },
] as const;

export const EXTERNAL_LINKS = {
  gitlab: "https://gitlab.com/accumulatenetwork",
  docs: "https://docs.accumulatenetwork.io",
  whitepaper: "https://accumulatenetwork.io/whitepaper/",
  explorer: "https://explorer.accumulatenetwork.io",
  discord: "https://discord.gg/accumulate",
} as const;

export const COMMUNITY_LINKS = [
  { label: "Discord", href: "https://discord.gg/accumulate" },
  { label: "Telegram", href: "https://t.me/accaboreas" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/accumulatenetwork" },
  { label: "Medium", href: "https://medium.com/@accumulate" },
  { label: "Instagram", href: "https://www.instagram.com/accumulatehq/" },
] as const;

export const COMMUNITY_PARTNERS = [
  {
    name: "DeFi Devs",
    role: "Lead Community Developer",
    description:
      "Part of the Inveniam Capital Partners ecosystem and one of the largest blockchain patent holders in the United States. Lead community developers for the Accumulate protocol.",
    href: "https://defidevs.io",
  },
  {
    name: "De Facto",
    role: "Bridge & Explorer Originator",
    description:
      "Blockchain development and consulting organization. Originators of the Accumulate Bridge and Explorer, and active supporters of the AccuFi project.",
    href: "https://github.com/DeFacto-Team",
  },
  {
    name: "Inveniam",
    role: "Data Infrastructure Partner",
    description:
      "Provides validated private market asset data via an Accumulate-powered bridge to Chainlink's data oracles. Leverages ADIs for data organization, provenance, and execution.",
    href: "https://www.inveniam.io",
  },
  {
    name: "OpenDLT",
    role: "Open-Source Tooling & SDKs",
    description:
      "Maintains idiomatic client libraries in Python, Dart, and Rust, along with SDKs, the DevNet startup pack, and open-source infrastructure for the Accumulate ecosystem.",
    href: "https://opendlt.org",
  },
  {
    name: "Kompendium",
    role: "Community Wallet & Tools",
    description:
      "Builders of the Accu2 wallet and community-driven tools that expand usability and accessibility across the Accumulate network.",
    href: "https://kompendium.co",
  },
  {
    name: "OperateCrypto",
    role: "Infrastructure & Operations",
    description:
      "Provides operational infrastructure and tooling for blockchain networks, supporting the Accumulate ecosystem with reliable node and network services.",
    href: "https://www.operatecrypto.com/PubStatic/Sites/OperateCrypto/index.html",
  },
  {
    name: "MicroPay Technologies",
    role: "Payment Solutions",
    description:
      "Building micropayment and payment processing solutions leveraging Accumulate's credit-based model and identity infrastructure.",
    href: "https://micropaytechnologies.com",
  },
  {
    name: "Cybitron",
    role: "Ecosystem Partner",
    description:
      "Technology partner contributing to the growth and adoption of the Accumulate network through specialized blockchain solutions.",
    href: "https://cybitron.com",
  },
] as const;

export const ROADMAP_SHIPPED = [
  {
    title: "MainNet Improvements",
    description:
      "Ongoing protocol improvements including enhanced partition architecture, faster finality, and improved validator coordination.",
  },
  {
    title: "Accumulate Bridge Launch",
    description:
      "Decentralized bridge enabling token transfers between Accumulate and multiple EVM chains including Ethereum, Base, Arbitrum, and BSC.",
  },
  {
    title: "Multi-Language SDK Support",
    description:
      "Full SDK availability across Dart, Rust, C#, Python, and JavaScript for broad developer accessibility.",
  },
  {
    title: "Accu2 Wallet",
    description:
      "Second-generation community wallet by Kompendium with its own API, notification, and web-auth services.",
  },
  {
    title: "Accu Light Mobile Wallet",
    description:
      "Production-ready open-source mobile wallet using secure on-device storage, ideal for developers and lightweight use.",
  },
  {
    title: "Accumulate Studio",
    description:
      "Developer studio by OpenDLT for onboarding and building on Accumulate with full support for Dart, Rust, C#, Python, and JavaScript SDKs.",
  },
] as const;

export const ROADMAP_IN_PROGRESS = [
  {
    title: "EVM Support",
    description:
      "Expanding Accumulate's compatibility with EVM-based chains to enable broader cross-chain interoperability and smart contract integration.",
  },
  {
    title: "Genialt",
    description:
      "Joint venture delivering verifiable AI on blockchain — AI credential registry, execution governance, and anchored ML pipelines built on Accumulate.",
  },
  {
    title: "AccuFi",
    description:
      "DeFi infrastructure and services built on the Accumulate network, supported by De Facto.",
  },
  {
    title: "Certen",
    description:
      "Cross-chain governance and institutional control layer for enterprise and consortia use cases.",
  },
  {
    title: "MicroPay",
    description:
      "Micropayment and payment processing solutions leveraging Accumulate's credit-based model and identity infrastructure.",
  },
] as const;

export const ROADMAP_PLANNED = [
  {
    title: "Authrix",
    description:
      "W3C-compliant, cross-chain identity and credential framework built on Accumulate L0 — decentralized identifiers, verifiable credentials, and selective-disclosure privacy.",
  },
  {
    title: "Infrix",
    description:
      "WASM-based smart-contract and verifiable-compute layer connected to Accumulate's identity and data framework with cross-chain support.",
  },
  {
    title: "Advanced Delegation Controls",
    description:
      "Fine-grained delegation with time-bound scopes, conditional approvals, and hierarchical authority constraints.",
  },
  {
    title: "Enterprise Key Management APIs",
    description:
      "APIs for integrating Accumulate's key management with enterprise HSMs, vault systems, and identity providers.",
  },
  {
    title: "Expanded DID / Verifiable Credential Support",
    description:
      "Broader W3C DID method support and verifiable credential issuance directly from Accumulate identities.",
  },
  {
    title: "New Bridge Integrations",
    description:
      "Additional bridge deployments connecting Accumulate to more Layer 1 and Layer 2 ecosystems.",
  },
] as const;

export const ROADMAP_AIPS = [
  {
    number: 50,
    title: "User-Specified Transaction Fees",
    status: "Draft" as const,
    description:
      "Allows users to specify custom transaction fees, enabling tokenized application-layer fee mechanisms operating in parallel with credits.",
  },
  {
    number: 51,
    title: "How Fees Are Handled for Issuing Credits",
    status: "Draft" as const,
    description:
      "Defines the fee model for credit issuance, clarifying how transaction costs are handled when converting to credits.",
  },
  {
    number: 52,
    title: "Anchor Design",
    status: "Draft" as const,
    description:
      "Proposes improvements to the anchoring architecture for cross-chain security and verification.",
  },
  {
    number: 53,
    title: "Mining Signature Type",
    status: "Draft" as const,
    description:
      "Introduces a new signature type to support mining-based consensus mechanisms within the protocol.",
  },
  {
    number: 54,
    title: "Ethereum Data Entry",
    status: "Draft" as const,
    description:
      "Enables writing Ethereum-originated data entries into Accumulate, expanding cross-chain data interoperability.",
  },
  {
    number: 55,
    title: "Automatic Credit Conversion",
    status: "Draft" as const,
    description:
      "Automates the conversion process for credits, reducing friction for enterprise users and sponsored transactions.",
  },
  {
    number: 57,
    title: "Fee Sponsorship",
    status: "Draft" as const,
    description:
      "Separates transaction initiator from fee payer, allowing enterprises to sponsor transaction costs while users retain authorization.",
  },
] as const;
