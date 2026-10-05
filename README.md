# Salesforce Audit

A read-only audit of the client's production Salesforce org, covering license and capacity use and $0 use-case recommendations.

- **Report:** [Salesforce-License-and-Use-Case-Audit.md](Salesforce-License-and-Use-Case-Audit.md), as of 2026-10-05
- **Evidence:** [evidence/](evidence/). These are the query definitions (`q1.txt`–`q4.txt`, one `label ||| kind ||| query` per line) and the read-only collector (`collect.js`).

To re-run the collector (it makes GET requests only), use the Node bundled with the Salesforce CLI:

```
node evidence/collect.js evidence/q1.txt r1.json
```

Raw results are written to `evidence/raw/`, which is git-ignored because it contains identifying org data. Don't commit it.
