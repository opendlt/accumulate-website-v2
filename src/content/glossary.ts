export const GLOSSARY: Record<string, string> = {
  identity:
    "A human-readable, hierarchical name (like acc://myorg.acme) that represents an organization, role, or system on the Accumulate network.",
  authority:
    "The set of key books and key pages that control what actions an identity can authorize, including thresholds and delegation.",
  threshold:
    "The M-of-N requirement on a key page: the number of key holders who must sign to approve a transaction.",
  delegation:
    "The ability for one authority to grant scoped, time-limited authorization to another identity without giving up control.",
  "key book":
    "A collection of key pages that together define the authorization policy for an identity.",
  "key page":
    "A set of keys with a specific threshold requirement. Key pages support rotation without losing authority continuity.",
  credit:
    "The unit of payment for transactions on Accumulate. Credits are purchased by burning ACME tokens and have a fixed USD value ($0.0001 each).",
  proof:
    "A cryptographic Merkle proof that verifies a transaction or state was included in the ledger, independently of any single validator.",
  ADI:
    "Accumulate Digital Identifier — a named identity on the network that can own accounts, key books, and sub-identities.",
};
