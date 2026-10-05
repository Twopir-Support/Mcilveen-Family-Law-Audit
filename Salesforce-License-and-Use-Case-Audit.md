# Salesforce License, Capacity & Use Case Audit

| | |
|---|---|
| Audit date | 2026-10-05 |
| Org type | Production, Enterprise Edition |
| Mode | Strict read-only: SOQL SELECT, describe, Tooling API reads, metadata retrieve, REST `/limits`. No data or metadata was changed. |
| Evidence tags | **[VERIFIED]** from a query result · **[INFERRED]** reasoned from verified data · **[ASSUMPTION]** · **[NOT ACCESSIBLE]** query failed or no permission |

---

## 0. Executive Summary

- **What the client does:** The client is a family-law practice with two regional offices. It runs its whole client lifecycle in Salesforce: phone and web enquiries, conflict checks, paid consultations, retained matters, time recording, billing and cash receipts. About 29 licensed staff use it, mostly attorneys, paralegals and an intake/sales team. [VERIFIED]
- **Core record:** The **Matter** (the standard Opportunity object, renamed). It holds 27,848 records, with 2,541 created in the last 12 months (+4.8% year on year). Every consultation and retained case is a Matter, and billing, time and the case team all hang off it. [VERIFIED]
- **Top 3 opportunities (all $0):**
  1. Close out and clean the consultation pipeline. 13,250 "Consult Attended – Not Retained" Matters are still open and count as 100%-probability "Commit". 98% of not-retained consults in the last year have no lost reason recorded. [VERIFIED]
  2. Switch on the two Matter Paths that are already built but inactive, and add guided checklists for newly retained matters. [VERIFIED]
  3. Use the generative AI the org already owns. Einstein generative AI is enabled, but there are 0 prompt templates and 0 agents, against 100,000 Einstein Prompt Template and 100,000 Agentforce Coworker seats. That capacity could produce Matter summaries, consult follow-up drafts and an internal Matter assistant. [VERIFIED]
- **Total unused capacity:** 87 permission set licenses are provisioned, and most have 0 assigned. The ones that matter here are Pipeline Inspection (31), Sales Action Plans (31), Sales Engagement (100), Einstein Activity Capture (99 free), Conversation Insights (2,000), the Agentforce and Prompt Template families, and 62,620 External Apps Login seats. Core Salesforce seats are 93.5% used (29 of 31). [VERIFIED]
- **Capacity watch-outs:** Big Object rows are at 139.8% of the allowance (1,398,284 of 1,000,000). File storage is 67.9% used. [VERIFIED]

---

## 1. License & Capacity Snapshot

### 1A. User Licenses (seats)

| Name | Total | Used | Available | Utilization % | Expiry | Evidence tag |
|---|---|---|---|---|---|---|
| Salesforce | 31 | 29 | 2 | 93.5% | Not returned by API | [VERIFIED] |
| Chatter Free | 5,000 | 1 | 4,999 | 0.0% | Not returned by API | [VERIFIED] |
| Chatter External | 500 | 0 | 500 | 0.0% | Not returned by API | [VERIFIED] |
| External Apps Login | 62,620 | 0 | 62,620 | 0.0% | Not returned by API | [VERIFIED] |
| Identity | 100 | 0 | 100 | 0.0% | Not returned by API | [VERIFIED] |
| Einstein Agent | 601 | 0 | 601 | 0.0% | Not returned by API | [VERIFIED] |
| External Einstein Agent | 401 | 0 | 401 | 0.0% | Not returned by API | [VERIFIED] |
| Salesforce Integration | 5 | 0 | 5 | 0.0% | Not returned by API | [VERIFIED] |
| Guest User License | 25 | 3 | 22 | 12.0% | Not returned by API | [VERIFIED] |
| Analytics Cloud Integration User | 2 | 2 | 0 | 100.0% | Not returned by API | [VERIFIED] |
| Cloud Integration User | 1 | 1 | 0 | 100.0% | Not returned by API | [VERIFIED] |
| Sales Insights Integration User | 1 | 1 | 0 | 100.0% | Not returned by API | [VERIFIED] |
| SalesforceIQ Integration User | 1 | 1 | 0 | 100.0% | Not returned by API | [VERIFIED] |
| Customer Community Login | 0 | 0 | 0 | Disabled | Not returned by API | [VERIFIED] |
| B2BMA Integration User | 0 | 0 | 0 | Disabled | Not returned by API | [VERIFIED] |

### 1B. Permission Set / Feature Licenses (including AI / Agentforce)

This table shows the business-relevant subset of the 87 provisioned licenses. The full list is in Appendix A. Every expiry is 2028-01-30 unless the row says otherwise.

| Name | Total | Used | Available | Utilization % | Expiry | Evidence tag |
|---|---|---|---|---|---|---|
| Einstein Prompt Templates | 100,000 | 0 | 100,000 | 0.0% | 2028-01-30 | [VERIFIED] |
| Agentforce Coworker | 100,000 | 2 | 99,998 | 0.0% | 2028-01-30 | [VERIFIED] |
| Agentforce Coworker Setup | 100,000 | 2 | 99,998 | 0.0% | 2028-01-30 | [VERIFIED] |
| Agentforce Platform Developer and Admin | 100,000 | 2 | 99,998 | 0.0% | 2028-01-30 | [VERIFIED] |
| Agentforce Service Agent Builder | 10,000 | 2 | 9,998 | 0.0% | 2028-01-30 | [VERIFIED] |
| Agentforce Service Agent User | 200 | 0 | 200 | 0.0% | 2028-01-30 | [VERIFIED] |
| Agentforce Sales Coach | 200 | 0 | 200 | 0.0% | 2028-01-30 | [VERIFIED] |
| Agentforce Sales Coach User | 100,000 | 0 | 100,000 | 0.0% | 2028-01-30 | [VERIFIED] |
| Agentforce SDR Agent / SDR Access | 200 / 10,000 | 0 / 0 | 200 / 10,000 | 0.0% | 2028-01-30 | [VERIFIED] |
| Inbound Lead Generation Agent / Access | 1 / 1 | 0 / 0 | 1 / 1 | 0.0% | 2028-01-30 | [VERIFIED] |
| Task-Based Agents | 50 | 0 | 50 | 0.0% | 2028-01-30 | [VERIFIED] |
| Agent platform builder | 2,000 | 0 | 2,000 | 0.0% | 2028-01-30 | [VERIFIED] |
| Einstein Agent / Einstein Agent CWU | 31 / 31 | 0 / 0 | 31 / 31 | 0.0% | 2028-01-30 | [VERIFIED] |
| Einstein Conversation Insights Standard | 2,000 | 0 | 2,000 | 0.0% | 2028-01-30 | [VERIFIED] |
| Einstein for Service Innovations | 100,000 | 0 | 100,000 | 0.0% | 2028-01-30 | [VERIFIED] |
| Einstein AI Skills / AI Skills Manager | 1 / 100,000 | 0 / 0 | 1 / 100,000 | 0.0% | 2028-01-30 | [VERIFIED] |
| Einstein GPT Metadata Studio | 50 | 0 | 50 | 0.0% | 2028-01-30 | [VERIFIED] |
| Einstein Search | 31 | 1 | 30 | 3.2% | 2028-01-30 | [VERIFIED] |
| Standard Einstein Activity Capture User | 100 | 1 | 99 | 1.0% | 2028-01-30 | [VERIFIED] |
| Pipeline Inspection | 31 | 0 | 31 | 0.0% | 2028-01-30 | [VERIFIED] |
| Sales Action Plans | 31 | 0 | 31 | 0.0% | 2028-01-30 | [VERIFIED] |
| Sales Engagement Basic | 100 | 0 | 100 | 0.0% | 2028-01-30 | [VERIFIED] |
| Salesforce Forecasting | 31 | 0 | 31 | 0.0% | 2028-01-30 | [VERIFIED] |
| Account Plans | 31 | 0 | 31 | 0.0% | 2028-01-30 | [VERIFIED] |
| Sales Workspace User | 31 | 0 | 31 | 0.0% | 2028-01-30 | [VERIFIED] |
| Salesforce Meetings | 31 | 0 | 31 | 0.0% | 2028-01-30 | [VERIFIED] |
| CRM User | 31 | 3 | 28 | 9.7% | 2028-01-30 | [VERIFIED] |
| Sales Console User | 31 | 1 | 30 | 3.2% | 2028-01-30 | [VERIFIED] |
| Messaging User / Enhanced Chat User | 31 / 31 | 0 / 0 | 31 / 31 | 0.0% | 2028-01-30 | [VERIFIED] |
| Service Lightning Knowledge Manager | 31 | 0 | 31 | 0.0% | 2028-01-30 | [VERIFIED] |
| Macros Manager | 31 | 0 | 31 | 0.0% | 2028-01-30 | [VERIFIED] |
| Data Cloud | 200,000 | 0 | 200,000 | 0.0% | 2028-01-30 | [VERIFIED] |
| Tableau Next Limited Consumer | 100,010 | 0 | 100,010 | 0.0% | 2028-01-30 | [VERIFIED] |
| Sales Cloud Einstein for Partners | 1,000,000 | 0 | 1,000,000 | 0.0% | **2026-10-26** | [VERIFIED] |

### 1C. Platform Limits & Storage

| Name | Total | Used | Available | Utilization % | Expiry | Evidence tag |
|---|---|---|---|---|---|---|
| Data storage (MB) | 41,780 | 18,672 | 23,108 | 44.7% | n/a | [VERIFIED] |
| File storage (MB) | 76,828 | 52,175 | 24,653 | 67.9% | n/a | [VERIFIED] |
| Daily API requests | 131,000 | 548 | 130,452 | 0.4% | Daily | [VERIFIED] |
| Monthly API request entitlement | 3,930,000 | 78,029 | 3,851,971 | 2.0% | Monthly, to 2028-01-30 | [VERIFIED] |
| Daily async Apex executions | 250,000 | 450 | 249,550 | 0.2% | Daily | [VERIFIED] |
| Flow interviews without UI / month | 10,000,000,000 | 56,378 | ~10,000,000,000 | <0.01% | Monthly, to 2028-01-30 | [VERIFIED] |
| Scheduled flow runs / day | 250,000 | 0 | 250,000 | 0.0% | Daily | [VERIFIED] |
| Custom Big Object rows | 1,000,000 | 1,398,284 | −398,284 | **139.8%** | to 2028-01-30 | [VERIFIED] |
| Single emails / day | 5,000 | 1 | 4,999 | 0.0% | Daily | [VERIFIED] |
| Next Best Action requests / month | 5,000 | 0 (none reported) | 5,000 | 0.0% | Monthly, to 2028-01-30 | [VERIFIED] |
| Orchestration runs / year | 600 | 0 (none reported) | 600 | 0.0% | Yearly, to 2028-01-30 | [VERIFIED] |
| Platform events delivered / month | 750,000 | 47 | 749,953 | 0.0% | Monthly, to 2028-01-30 | [VERIFIED] |
| Agentforce / Einstein consumption credits | Not accessible | Not accessible | Not accessible | — | — | [NOT ACCESSIBLE] |

**Most valuable unused capacity:** The org has 100,000 Einstein Prompt Template seats and 100,000 Agentforce Coworker seats, and generative AI is already switched on, yet there are 0 prompt templates and 0 agents [VERIFIED]. It also has 31 Pipeline Inspection and 31 Sales Action Plans seats, all unassigned, that apply directly to the Matter.

---

## 2. Inferred Client Business Profile

- **Industry Domain:** Legal services. A family-law practice handling custody, divorce, separation agreements, domestic violence, child support, estate planning and probate. The top "Current Situation" values on Matters created in the last 12 months are Custody 814, Divorce (multiple issues) 488 and Separation Agreement 282. [VERIFIED]
- **Business Model:** Consumer legal services sold through a paid-consultation funnel and retained under initial and subsequent fee contracts. Billing options include flat-fee, minimum-fee, trust "pay as you go" and payment plans, shown by Matter fields such as Flat Fee Contract, Payment Plan and Prepaid Balance. Time is recorded and billed in an accounting package (13,625 billings and 12,060 cash receipts in 12 months). Lead sources are mainly paid search call ads, direct office calls, a reviews/messaging platform and the website. [VERIFIED] fields and counts · [INFERRED] business model
- **Core Business Record (and why):** The **Matter**, which is the standard Opportunity object renamed. [VERIFIED]
  - Its object, Contact Role and Team labels were all renamed to "Matter". [VERIFIED]
  - It carries the whole legal lifecycle: three conflict checks, consultation attorney and date, contract sent/signed/paid, judge, opposing parties and attorneys, Matter Management phase, trial and hearing results, and closed and file-destroy dates. It has 171 custom fields. [VERIFIED]
  - 61,900 Matter Contact Roles link clients, opposing parties, children, judges and opposing counsel. [VERIFIED]
  - A trigger creates an accounting project from each Matter: 21,781 of 22,088 projects are linked to a Matter. [VERIFIED]
  - It is the busiest business object created by users: 2,541 Matters in 12 months, plus 27,378 tasks and 8,494 events logged on Matters. [VERIFIED]
- **Core Workflow:** **Enquiry (Lead) → Conflict check → Consultation Matter (Consult Scheduled) → Consult Attended → Retained ⇒ Retention Matter + accounting project auto-created → Contract sent / signed / paid → Case phases (Intake → Pre-Discovery → Discovery → Mediation/Pre-Trial → Trial → Post-Trial / Appeal, or Non-Litigation) → Time recording & billing → Matter closed → File destroy date.** Not-retained consults go to Nurture or follow-up. [VERIFIED] stage, record type and phase values · [INFERRED] sequence
- **Key User Groups:** These are the 33 active internal users by role: Attorneys 12; Legal Secretaries/Paralegals 6; Legal Assistants 2; Intake/Sales 2; Accounting 2; Executives 2; IT 2; Reception 1; no role 4. All 29 Salesforce-licensed users logged in within the last 30 days. [VERIFIED]
- **Volume Indicators:** [VERIFIED]
  - **Matters:** 2,541 created in the last 12 months, against 2,425 in the prior 12 (+4.8%).
    - Consultations: 1,409
    - Retention: 564
    - Nurture: 568
  - **Monthly Matter creation:** 175–287.
  - **Retention ratio:** about 40% of consultations [INFERRED: 564 ÷ 1,409].
  - **Leads:** 12,871, against 9,210 in the prior 12 months (+39.8%).
    - Disqualified out: 70%
    - Converted: 8.7%
  - **Retained matters still open** (no closed date): 428. **Retained matters closed in the last 12 months:** 535.
  - **Other activity in the last 12 months:**
    - Time entries: 80,719
    - Emails: 20,989
    - Telephony call-flow records: 36,032
- **Systems & Integrations:** 49 installed packages. [VERIFIED] (package list) · [INFERRED] (usage notes below)
  - **Accounting and billing:** Accounting Seed
  - **Telephony and call tracking:** RingDNA / Revenue.io (36,032 call flows in 12 months), plus call-tracking and marketing-attribution fields
  - **Work management:** TaskRay
  - **E-signature:** DocuSign and Adobe Acrobat Sign
  - **Duplicate management:** Plauti Deduplicate and DupeCatcher, two overlapping tools
  - **Roll-ups:** Rollup Helper
  - **Documents:** NetDocuments (linked to the previous practice-management system, now migrated)
  - **Surveys:** TimbaSurveys and Simple Survey
  - **Website:** a client-payments site
  - **Connected services:** 21 connected apps and 3 named credentials (all for the dedupe vendor)

---

## 3. Prioritized Use Case Recommendations

### UC-01 – Activate guided Matter Paths for consultation and case phases
- **Priority:** P1
- **Business Pain Point:** Staff have no on-screen guide to what must happen at each consultation stage or case phase. Key steps are easy to miss, such as conflict checks, contract sent and signed, and initial payment received. Phase tracking is inconsistent: 26 retained matters from the last 24 months have no case phase.
- **Proposed Solution:** Two Paths are already built for the Matter, one for consultation stages and one for the "Matter Management" case phases, but neither is active. Review them, add key fields and short guidance for each step (for example "Before Retained: Initial Contract Sent, Amount, Signed date"), assign them to the Consultation and Retention record types, and activate them.
- **Target Business Benefit:** Fewer missed intake and contract steps, and faster onboarding for new paralegals. Target: every retained matter has a phase recorded, and the 26 blanks drop to 0.
- **Who Benefits:** Attorneys, Legal Secretaries/Paralegals, Legal Assistants, Intake/Sales.
- **License / Capacity Leveraged:** Path is included with the Salesforce user license (29 in use). $0 incremental.
- **Current Status Verification:** The PathAssistant query returned `Matter_Management` IsActive=false and `Consultation_Sales_Path` IsActive=false. The Path feature itself is switched on (`pathAssistantEnabled`=true). [VERIFIED]
- **Readiness:** Ready. Both Paths already exist and only need review and activation.
- **Effort:** S (<1 week)
- **Implementation Blueprint:**
  1. Open Setup → Path Settings, then review both Paths in a sandbox.
  2. For the Consultation record type, map each stage to 3–5 key fields: conflict results, consultation attorney and date, and expected retention date.
  3. For the Retention record type, base the Path on the "Matter Management" phase field and add key fields per phase (hearing dates, judge, results).
  4. Write one or two lines of "Guidance for Success" per step, in the firm's own words.
  5. Activate the Paths and add the Path component to the Matter record pages.
  6. Run a 15-minute walkthrough with paralegals and intake staff.

### UC-02 – Close out not-retained consultations and capture the reason
- **Priority:** P1
- **Business Pain Point:** The "Consult Attended – Not Retained" stage is set as **open, 100% probability, forecast category "Commit"**. As a result, 13,250 consultations going back to 2015 still sit open in the pipeline, all past their close date. Pipeline and forecast reports therefore overstate likely work. Lost reasons are also rarely recorded: 1,272 of 1,302 not-retained consults in the last 12 months (97.7%) have none. The firm cannot see why prospects don't retain.
- **Proposed Solution:** Correct the stage settings so a not-retained consult is treated as closed and lost. Make "Closed Lost Reason" required when a consult is marked not retained. Use a record-triggered Flow to move existing records that should already be closed. Add a "Why we didn't get retained" dashboard by practice area and lead source.
- **Target Business Benefit:** An accurate consultation pipeline and real retention-rate reporting. Target: every not-retained consult has a reason from go-live, and the historic backlog is cleared, so 13,250 false open records drop out of the pipeline.
- **Who Benefits:** Executives, Intake/Sales, Attorneys running consultations.
- **License / Capacity Leveraged:** Flow and validation rules are included with the Salesforce user license. Flow capacity is 56,378 of 10,000,000,000 monthly interviews used. $0 incremental.
- **Current Status Verification:** [VERIFIED]
  - **Stage settings:** the OpportunityStage query shows "Consult Attended – Not Retained" with IsClosed=false, probability 100 and forecast category "Commit".
  - **Open records:** 13,250 open Matters are at that stage.
  - **Existing validation:** none of the 9 active Matter validation rules requires the lost reason.
  - **Existing automation:** there is no record-triggered Flow on the Matter.
- **Readiness:** Needs Prep. The firm must agree whether "Not Retained" should close the record, given that a nurture follow-up process exists, and must approve a backlog clean-up. That clean-up is a data change and was not run in this audit.
- **Effort:** M (1–3 weeks)
- **Implementation Blueprint:**
  1. Agree the stage meanings with the intake lead, especially "Consult Attended – Not Retained" against "Not Retained".
  2. In a sandbox, mark the stage closed/lost (or map it to "Not Retained") with probability 0 and forecast category Omitted.
  3. Add a validation rule: Closed Lost Reason is required when the stage is not retained, with a "Do Not Follow Up" exception if required.
  4. Build a record-triggered Flow that sets follow-up tasks or nurture when a consult is not retained, replacing the matching legacy process.
  5. Run a supervised backlog update in sandbox, then production, with a backup export.
  6. Publish a retention-rate dashboard by practice area, lead source and consulting attorney.

### UC-03 – Pipeline Inspection for the consultation pipeline
- **Priority:** P1
- **Business Pain Point:** Leaders cannot easily see which consultations are moving, stalled or slipping each week. 13,154 open consultations have had no activity in 30 days.
- **Proposed Solution:** Turn on Pipeline Inspection for Matters once UC-02 is in place. Leaders and intake staff then get a weekly view of open consultations with changes in stage, close date and amount, highlighted "moved in / moved out" records, and quick filters by consulting attorney and office.
- **Target Business Benefit:** A weekly consultation review that takes minutes instead of report-building, and earlier follow-up on stalled consults. Target: open consults with no activity in 30 days fall week over week.
- **Who Benefits:** Executives, Intake/Sales, Attorneys.
- **License / Capacity Leveraged:** Pipeline Inspection PSL: 31 owned, 0 assigned. $0 incremental.
- **Current Status Verification:** Opportunity settings show `enablePipelineInspection`=false, and the Pipeline Inspection PSL has 0 of 31 used. [VERIFIED]
- **Readiness:** Needs Prep. It depends on UC-02, because otherwise the 13,250 false open records would flood the view.
- **Effort:** S (<1 week)
- **Implementation Blueprint:**
  1. Complete UC-02 so that only real open consultations remain.
  2. Enable Pipeline Inspection in Setup → Pipeline Inspection.
  3. Assign the Pipeline Inspection PSL to Executives, Intake/Sales and consulting Attorneys.
  4. Set the default list filters: Consultation record type, open, this quarter.
  5. Add the Pipeline Inspection button to the Matter list view.
  6. Agree a weekly 15-minute consultation review that uses the view.

### UC-04 – Standard onboarding checklists for newly retained matters (Action Plans)
- **Priority:** P1
- **Business Pain Point:** New-matter setup depends on old automated task rules and memory. On retained matters, the "Initial Contract Sent" and "Signed" dates are filled almost every time (only 1 blank each in 12 months), but the rest of onboarding is not standardised by matter type. Custody, divorce, separation agreement and estate planning each need different first steps. 2,168 tasks on Matters are overdue and still open.
- **Proposed Solution:** Create Action Plan templates per practice area: Custody, Divorce, Separation Agreement, Estate Planning and Probate. Each template creates a dated checklist on the Retention Matter, covering items such as engagement letter, conflict confirmation, retainer received, initial filings and client intake questionnaire. The plan is applied automatically by Flow when a Retention Matter is created.
- **Target Business Benefit:** A consistent, auditable onboarding for every new client. Target: fewer overdue onboarding tasks than the current 2,168 open overdue Matter tasks.
- **Who Benefits:** Legal Secretaries/Paralegals, Legal Assistants, Attorneys, Accounting (retainer steps).
- **License / Capacity Leveraged:** Sales Action Plans PSL: 31 owned, 0 assigned. $0 incremental.
- **Current Status Verification:** ActionPlanTemplate COUNT = 0, and the Sales Action Plans PSL has 0 of 31 used. One existing legacy process ("Tasks_Legal_Team_on_New_Retention_Matter") creates fixed tasks; it would be replaced, not duplicated. [VERIFIED]
- **Readiness:** Needs Prep. Paralegals need to define the checklist content for each practice area.
- **Effort:** M (1–3 weeks)
- **Implementation Blueprint:**
  1. Run a workshop with paralegals to list the first-30-day steps for the top 5 practice areas.
  2. Create one Action Plan template per practice area, with task owners and day offsets.
  3. Assign the Action Plans PSL to Attorneys, Paralegals and Legal Assistants.
  4. Build a record-triggered Flow that launches the matching plan on new Retention Matters based on "Current Situation".
  5. Deactivate the overlapping legacy task process after a parallel-run week.
  6. Add an "Onboarding progress" component to the Matter page.

### UC-05 – Move the legacy Matter processes to Flow
- **Priority:** P2
- **Business Pain Point:** Six business processes still run on Process Builder, a retired tool. They assign the additional attorney, create Retention and Nurture matters, set the close date, notify on nurture, create legal-team tasks and handle cancelled consults. There are also 39 older workflow rules on the Matter. That is harder to support, and when the core retention step breaks it is harder to troubleshoot.
- **Proposed Solution:** Rebuild the 6 active processes as record-triggered Flows, grouped into one "before save" and one "after save" Flow per object. Review the 39 workflow rules for overlap and migrate them using Salesforce's Migrate to Flow tool.
- **Target Business Benefit:** Lower support risk and faster saves on the Matter, plus one place to see all Matter automation. Target: 0 Process Builder processes remain active.
- **Who Benefits:** IT / Salesforce admin, and indirectly every Matter user.
- **License / Capacity Leveraged:** Flow is included with the Salesforce user license, and flow capacity is under 0.01% used. $0 incremental.
- **Current Status Verification:** FlowDefinitionView shows 6 active ProcessType=Workflow (Process Builder) processes and 10 inactive ones, and the Tooling API lists 39 workflow rules on the Matter. [VERIFIED] The process names all refer to Matter, retention or consult steps, which suggests they run on the Matter. [INFERRED] Whether the workflow rules are active could not be read through Tooling. [NOT ACCESSIBLE]
- **Readiness:** Ready, best done after UC-02 and UC-04 so the new Flows reflect the agreed process.
- **Effort:** M (1–3 weeks)
- **Implementation Blueprint:**
  1. Export the logic of each of the 6 active processes and the Matter workflow rules (via metadata retrieve).
  2. Run "Migrate to Flow" in a sandbox for each process.
  3. Consolidate the results into before-save and after-save Matter Flows, with entry conditions.
  4. Test retention, nurture creation and close-date scenarios with sample matters.
  5. Deploy, activate the Flows and deactivate the old processes in the same release.
  6. Document the Matter automation map for the admin team.

### UC-06 – Sales Engagement cadences for enquiry and consult follow-up
- **Priority:** P2
- **Business Pain Point:** Follow-up on enquiries and not-retained consults is manual. In the last 12 months, 1,079 not-retained consults were flagged for follow-up, 495 leads are still "Open" and 193 leads have had no activity at all.
- **Proposed Solution:** Turn on Sales Engagement (Basic) and build two cadences. "New enquiry" covers call, email and call on days 0, 1 and 3. "Consult not retained" covers a check-in email, a call and a final email. Intake staff work a daily "My Work" list instead of building their own reminders.
- **Target Business Benefit:** Faster, more consistent follow-up. Target: 0 untouched enquiries older than 2 days, and more follow-ups completed on not-retained consults.
- **Who Benefits:** Intake/Sales, Reception, Attorneys running consultations.
- **License / Capacity Leveraged:** Sales Engagement Basic PSL: 100 owned, 0 assigned. $0 incremental.
- **Current Status Verification:** The ActionCadence object is not available in the org (the query returned INVALID_TYPE), which means Sales Engagement is not enabled. The PSL shows 0 of 100 used. [VERIFIED]
- **Readiness:** Needs Prep. The email templates and the opt-out handling for consumer contacts need agreeing.
- **Effort:** M (1–3 weeks)
- **Implementation Blueprint:**
  1. Enable Sales Engagement and assign the PSL to Intake/Sales and Reception.
  2. Build the "New enquiry" cadence for Leads with call, email and wait steps.
  3. Build the "Consult not retained" cadence for the client Contact or Person Account.
  4. Auto-add records to cadences with a Flow, based on lead status or consult outcome.
  5. Set exit rules: lead converted, matter retained, or "Do Not Follow Up".
  6. Review completion rates monthly.

### UC-07 – Automatically log client emails and meetings on Matters (Einstein Activity Capture)
- **Priority:** P2
- **Business Pain Point:** Only 3,884 of 20,989 emails stored in the last 12 months (18.5%) are linked to a Matter. Client communication history on a matter is therefore incomplete unless staff log it by hand.
- **Proposed Solution:** Extend the existing Einstein Activity Capture setup, which currently covers 1 user, to attorneys and paralegals. Emails and calendar events with clients and opposing counsel then appear on the Matter's activity timeline automatically. Use exclusion rules for privileged or internal-only correspondence.
- **Target Business Benefit:** A complete communication timeline on each matter, and less manual logging. Target: a higher share of emails linked to Matters than the current 18.5%.
- **Who Benefits:** Attorneys, Legal Secretaries/Paralegals, Legal Assistants.
- **License / Capacity Leveraged:** Standard Einstein Activity Capture User PSL: 100 owned, 1 used, 99 available. $0 incremental.
- **Current Status Verification:** The PSL shows 1 of 100 used [VERIFIED]. The Activity Capture configuration (connected mailboxes, sharing) is not readable via the API [NOT ACCESSIBLE].
- **Readiness:** Needs Prep. Before rollout, the firm needs a confidentiality and privilege review, because captured emails are stored by Salesforce outside standard records and have reporting limits.
- **Effort:** S (<1 week) for the technical setup, plus policy review time.
- **Implementation Blueprint:**
  1. Confirm the firm's policy on capturing client email, including privilege, retention and the exclusion list.
  2. Review the current Activity Capture configuration in Setup.
  3. Create a configuration for Attorneys and Paralegals, with sharing set to "Don't share" or "Read only" as the policy requires.
  4. Add excluded domains and addresses (internal, court e-filing systems if wanted).
  5. Assign the PSL to the pilot group and connect their mailboxes.
  6. Check Matter timelines after 2 weeks, then expand.

### UC-08 – Revive the client portal for matter updates and document requests
- **Priority:** P3
- **Business Pain Point:** Clients can only get status updates and send documents by phone or email, which adds to staff workload. A client portal and a test portal exist, but both are offline: "Down for Maintenance" and "Under Construction".
- **Proposed Solution:** Rebuild the existing Experience Cloud client site on the External Apps Login license. Retained clients would see a simple "My Matter" page with phase, next hearing date and assigned team, plus secure document upload and a payment link to the existing payments site.
- **Target Business Benefit:** Fewer "what's happening on my case?" calls, and faster collection of client documents. Target: track the drop in status-update calls after launch.
- **Who Benefits:** Clients, Paralegals, Reception, Accounting.
- **License / Capacity Leveraged:** External Apps Login: 62,620 owned, 0 used. Experience Cloud page views: 1,000,000 per month, 0 used. $0 incremental.
- **Current Status Verification:** The Network query returned the client site as DownForMaintenance and the test portal as UnderConstruction. External Apps Login shows 0 of 62,620 used. [VERIFIED]
- **Readiness:** Needs Prep. It needs confirmation that the External Apps license allows access to the Matter data needed [ASSUMPTION: the Opportunity object may not be included, so a custom "Matter Status" object or record may be needed], plus a security and sharing design.
- **Effort:** L (>3 weeks)
- **Implementation Blueprint:**
  1. Confirm which objects the External Apps Login license can access, and design a client-safe "Matter Status" data shape.
  2. Rebuild the client site from the existing network in a sandbox, using the current template.
  3. Configure sharing so each client sees only their own matter (sharing sets on Contact or Account).
  4. Add pages for matter status, document upload (Files) and a link to the existing payment site.
  5. Run a security review with a test client account.
  6. Pilot with 10–20 retained clients, then roll out.

---

## 4. AI Use Case Recommendations

All of these cards run on AI entitlements the org already owns and has not activated. Einstein generative AI is switched on (`enableEinsteinGptPlatform`=true), and the org has 0 custom prompt templates and 0 agents [VERIFIED]. The AI consumption balance (Einstein Requests / Flex Credits) is not readable through the API [NOT ACCESSIBLE]. Every card below therefore includes "confirm the included consumption allowance" as a preparation step. Any use beyond that allowance is listed in Section 6.

### AI-01 – One-click Matter Summary for attorneys
- **Priority:** P1
- **Business Pain Point:** An attorney picking up a matter, or preparing for a hearing, has to read through up to 171 Matter fields, the contact roles (opposing party, children, judge, opposing counsel), notes and the activity history. On retained matters alone, 12,850 tasks were logged in 12 months.
- **Proposed Solution:** A Prompt Builder "Matter Summary" template shown on the Matter page. It produces a plain-English brief covering the client situation, parties and roles, current phase, upcoming hearing dates, contract and payment status, open tasks, and key notes ("Important Notes", "Lead Notes", "Settlement or Trial Notes"). The attorney reviews it before use, and it never sends anything automatically.
- **Target Business Benefit:** Less preparation time per matter review and faster hand-offs between attorneys and paralegals. Target: measure minutes saved per hearing-prep review in a 4-week pilot.
- **Who Benefits:** Attorneys, Legal Secretaries/Paralegals.
- **License / Capacity Leveraged:** Einstein Prompt Templates PSL: 100,000 owned, 0 assigned. $0 incremental within the included consumption allowance.
- **Current Status Verification:** Metadata listing returned 0 GenAiPromptTemplate records, and the Einstein Prompt Templates PSL shows 0 of 100,000 used. [VERIFIED]
- **Readiness:** Needs Prep. The firm needs to confirm its AI use policy for client data (the Einstein Trust Layer applies zero-retention and data masking [ASSUMPTION: standard Salesforce behaviour]) and the consumption allowance.
- **Effort:** S (<1 week)
- **Implementation Blueprint:**
  1. Confirm the AI use policy and the consumption allowance in Setup → Digital Wallet / Einstein usage.
  2. In Prompt Builder, create a Field Generation or Flex template grounded on the Matter, its Matter Contact Roles and open Tasks.
  3. Write the prompt with the firm's preferred headings: Situation, Parties, Phase, Next Dates, Money, Open Items.
  4. Test it on 20 sample matters in a sandbox and refine.
  5. Add the summary action to the Retention Matter page and assign the PSL to the pilot users.
  6. Collect attorney feedback after 4 weeks.

### AI-02 – AI-drafted follow-up email after a consultation
- **Priority:** P1
- **Business Pain Point:** 1,079 not-retained consults in the last 12 months were flagged for follow-up, and each follow-up email is written by hand. As a result, follow-up is slow and inconsistent.
- **Proposed Solution:** A Prompt Builder "Sales Email" template that drafts a personalised, compliant follow-up for the consulting attorney or intake staff. It uses the matter type ("Current Situation"), the consultation date and attorney, and the next step offered. Staff edit and send it themselves from the Matter. It also feeds the "Consult not retained" cadence in UC-06.
- **Target Business Benefit:** Follow-ups go out the same day instead of when staff have time. Target: track the retention rate of followed-up consults against the current ~40% overall consult-to-retention rate.
- **Who Benefits:** Intake/Sales, Attorneys running consultations.
- **License / Capacity Leveraged:** Einstein Prompt Templates PSL: 100,000 owned, 0 assigned. $0 incremental within the included consumption allowance.
- **Current Status Verification:** 0 prompt templates exist and 0 PSLs are assigned. There is no active email-drafting automation; the only consult-related automation creates a task on cancellation. [VERIFIED]
- **Readiness:** Needs Prep. It needs an approved tone and wording set, plus a legal-marketing compliance check by the firm.
- **Effort:** S (<1 week)
- **Implementation Blueprint:**
  1. Agree 2–3 example follow-up emails with the managing attorney as the style guide.
  2. Create a Sales Email prompt template grounded on the Matter and the client Contact.
  3. Add guardrails to the prompt: no legal advice, no outcome promises, and include the scheduling link.
  4. Test it on 20 past not-retained consults in a sandbox.
  5. Enable it in the email composer for Intake/Sales and Attorneys, and assign the PSL.
  6. Review the sent-email feedback monthly.

### AI-03 – Internal Matter assistant (Agentforce employee agent)
- **Priority:** P1
- **Business Pain Point:** Staff answer the same internal questions all day by clicking through records. "What's the next hearing on this matter?" "Has the contract been signed?" "Who is opposing counsel?" "What's still open?" 2,168 overdue tasks on Matters show that work slips through the cracks.
- **Proposed Solution:** An Agentforce employee agent inside Salesforce with three Matter topics. **Matter status** answers questions from Matter fields and contact roles. **My overdue items** lists the user's open tasks on their matters. **Create a follow-up task** drafts a task on a matter for the user to confirm. The agent is read-only, except for task creation with user confirmation.
- **Target Business Benefit:** Fewer clicks and searches per question and fewer missed follow-ups. Target: fewer overdue Matter tasks than the current 2,168.
- **Who Benefits:** Attorneys, Legal Secretaries/Paralegals, Legal Assistants, Reception.
- **License / Capacity Leveraged:** Agentforce Coworker: 100,000 owned, 2 used. Agentforce Platform Developer and Admin: 2 used (admin build access already exists). Einstein Agent user license: 601 owned, 0 used. $0 incremental within the included consumption allowance.
- **Current Status Verification:** BotDefinition 0, BotVersion 0, GenAiPlannerDefinition 0, GenAiFunctionDefinition 0, and the metadata lists for GenAiPlannerBundle, GenAiPlugin and Bot are all empty. No agent exists. [VERIFIED]
- **Readiness:** Needs Prep. It needs the consumption allowance confirmed, an agent-user permission design, and an AI use policy for client data.
- **Effort:** M (1–3 weeks)
- **Implementation Blueprint:**
  1. Confirm the consumption allowance and the AI use policy.
  2. In Agent Builder, create an employee agent with the three topics and clear instructions.
  3. Add standard actions (query records, summarise record) and one Flow action, "Create follow-up task on Matter", that requires confirmation.
  4. Restrict the agent's data access to Matters the user can already see (respect sharing).
  5. Test 30 real-world questions in a sandbox and tune the instructions.
  6. Activate it for a pilot group of paralegals, assign Agentforce Coworker, and expand after 4 weeks.

### AI-04 – Consultation practice with Agentforce Sales Coach
- **Priority:** P2
- **Business Pain Point:** Retention after consultation is about 40%, and new intake staff and associates learn the consultation conversation on the job.
- **Proposed Solution:** Use Agentforce Sales Coach to let intake staff and newer attorneys role-play a consultation from the Matter record, for example handling fee objections or explaining the process for a custody case, and get feedback on their approach.
- **Target Business Benefit:** Faster ramp-up for new intake staff and attorneys, and more consistent consultations. Target: track the retention rate of coached users against the baseline.
- **Who Benefits:** Intake/Sales, Associate Attorneys.
- **License / Capacity Leveraged:** Agentforce Sales Coach: 200 owned, 0 used. Agentforce Sales Coach User: 100,000 owned, 0 used. $0 incremental within the included consumption allowance.
- **Current Status Verification:** Both Sales Coach PSLs show 0 assigned, and no agents exist (BotDefinition 0). [VERIFIED]
- **Readiness:** Needs Prep. It needs to be confirmed that Sales Coach supports the renamed Matter (Opportunity) and custom record types [ASSUMPTION], and the consumption allowance must be confirmed.
- **Effort:** S (<1 week)
- **Implementation Blueprint:**
  1. Confirm feature availability and the consumption allowance in Setup.
  2. Enable Sales Coach and assign the PSLs to Intake/Sales and the associates.
  3. Configure the coaching context with practice-area talking points and fee-objection guidance.
  4. Pilot with 2–3 users on past consultation Matters.
  5. Review the feedback quality with the managing attorney.
  6. Roll out with a monthly practice session.

### AI-05 – Call insights on intake and consultation calls (Einstein Conversation Insights)
- **Priority:** P2
- **Business Pain Point:** There were 36,032 telephony call-flow records and 7,872 logged calls on Matters in the last 12 months, but nobody can see what was said, which objections came up, or which next steps were promised.
- **Proposed Solution:** Connect call recordings to Einstein Conversation Insights. It surfaces keywords (fees, custody, retainer), next steps and talk-time on the Matter, so intake leaders can coach from real calls.
- **Target Business Benefit:** Better coaching and better capture of next steps. Target: share of consult calls with logged next steps.
- **Who Benefits:** Intake/Sales, Executives.
- **License / Capacity Leveraged:** Einstein Conversation Insights Standard: 2,000 owned, 0 used. Conversation Insights Integration User: 10 owned, 0 used. $0 incremental.
- **Current Status Verification:** Both ECI PSLs show 0 assigned. No Service Cloud Voice or partner telephony seat is in use (Salesforce Voice Partner Telephony PSL 0 of 1). [VERIFIED]
- **Readiness:** Blocked until two things are confirmed: that the current telephony provider can feed recordings to ECI [ASSUMPTION: integration support not verified], and that call recording consent meets the firm's legal obligations.
- **Effort:** M (1–3 weeks)
- **Implementation Blueprint:**
  1. Confirm the telephony-to-ECI integration path and the recording-consent policy.
  2. Enable Einstein Conversation Insights and set up the recording provider connection.
  3. Define tracked keywords: fees, retainer, custody, deadlines, competitor firms.
  4. Assign the ECI PSLs to Intake/Sales and the reviewers.
  5. Add the call insights component to the Matter page.
  6. Hold a monthly coaching review using the insights.

### AI-06 – AI-drafted closing summary when a matter ends
- **Priority:** P3
- **Business Pain Point:** At closing, attorneys write "Closing Notes" and "Settlement or Trial Notes" by hand. 535 retained matters closed in the last 12 months. Many notes are inconsistent, which weakens future referrals, returning-client intake (returning clients were the source of 407 new Matters in 12 months) and file-retention reviews.
- **Proposed Solution:** A Prompt Builder field-generation template on "Closing Notes". It drafts a consistent closing summary from the phase history, trial and hearing results, contract and payment fields, and the final activities. The attorney edits and saves it.
- **Target Business Benefit:** Consistent closing records and faster intake when a former client returns. Target: every closed matter has a closing summary.
- **Who Benefits:** Attorneys, Paralegals, Intake (returning clients).
- **License / Capacity Leveraged:** Einstein Prompt Templates PSL: 100,000 owned, 0 assigned. $0 incremental within the included consumption allowance.
- **Current Status Verification:** 0 prompt templates exist [VERIFIED]. The only closing automation sets the close date ("Matter_Close_Date_Workflow") and writes no notes [VERIFIED].
- **Readiness:** Needs Prep, best after AI-01 is proven.
- **Effort:** S (<1 week)
- **Implementation Blueprint:**
  1. Agree the closing-summary headings with the attorneys.
  2. Create a Field Generation prompt template bound to "Closing Notes".
  3. Ground it on the Matter phase, results, contract and payment fields, and the last activities.
  4. Test it on 20 closed matters in a sandbox.
  5. Enable the field-generation button on the Retention Matter layout.
  6. Review its quality after 1 month.

---

## 5. Roadmap Summary Table

| ID | Use Case | Priority | Effort | License Used | Readiness |
|---|---|---|---|---|---|
| UC-01 | Activate guided Matter Paths | P1 | S | Salesforce user license (Path) | Ready |
| UC-02 | Close out not-retained consults and capture the reason | P1 | M | Salesforce user license (Flow, validation) | Needs Prep |
| UC-03 | Pipeline Inspection for consultations | P1 | S | Pipeline Inspection PSL (31 free) | Needs Prep |
| UC-04 | Onboarding checklists for retained matters | P1 | M | Sales Action Plans PSL (31 free) | Needs Prep |
| UC-05 | Move legacy Matter processes to Flow | P2 | M | Salesforce user license (Flow) | Ready |
| UC-06 | Follow-up cadences for enquiries and consults | P2 | M | Sales Engagement Basic PSL (100 free) | Needs Prep |
| UC-07 | Auto-log emails and meetings on Matters | P2 | S | Standard Einstein Activity Capture PSL (99 free) | Needs Prep |
| UC-08 | Revive the client portal | P3 | L | External Apps Login (62,620 free) | Needs Prep |
| AI-01 | One-click Matter Summary | P1 | S | Einstein Prompt Templates PSL (100,000 free) | Needs Prep |
| AI-02 | AI-drafted consultation follow-up email | P1 | S | Einstein Prompt Templates PSL (100,000 free) | Needs Prep |
| AI-03 | Internal Matter assistant (Agentforce) | P1 | M | Agentforce Coworker (99,998 free), Einstein Agent (601 free) | Needs Prep |
| AI-04 | Consultation practice with Sales Coach | P2 | S | Agentforce Sales Coach PSLs (200 / 100,000 free) | Needs Prep |
| AI-05 | Call insights on consultation calls | P2 | M | Einstein Conversation Insights PSL (2,000 free) | Blocked |
| AI-06 | AI-drafted matter closing summary | P3 | S | Einstein Prompt Templates PSL (100,000 free) | Needs Prep |

---

## 6. Future / Low-Priority Opportunities (outside current scope)

- **Agentforce SDR / Inbound Lead Generation agent for enquiries:** the licenses are owned (200 / 1) but cover Leads, not the core record. This could matter later, because leads grew 39.8% year on year and 70% are marked "Disqualified out".
- **Data Cloud (200,000 seats provisioned, 0 used) and Data Credits:** could unify telephony, marketing and accounting data. Consumption costs need scoping first.
- **AI use beyond the included Einstein / Agentforce consumption allowance:** if the pilots in Section 4 succeed at scale, extra Flex Credits may be needed.
- **Big Object rows over the allowance (139.8%):** raise this with the Salesforce account team before it becomes a compliance or add-on charge.
- **File storage at 67.9%:** an archive or offload plan (or extra storage) may be needed as documents grow.
- **Core Salesforce seats at 93.5% (2 spare):** plan seat purchases before the next hires.
- **Sales Cloud Einstein for Partners expires 2026-10-26:** no partner users exist, so the client probably doesn't need to renew it. Confirm that with the account team.
- **Knowledge, Messaging / Enhanced Chat and Omni-Channel:** licenses are owned (31 each, 0 used) but these are service features with no Case usage (0 Cases in 12 months). They may matter later for a client-facing chat or FAQ.
- **Tableau Next (100,010 seats) for practice-profitability dashboards:** combining Matters with accounting billing could be explored later.
- **Client demo / enablement plan:** run a 30-minute demonstration of UC-01, AI-01 and AI-03 in a sandbox for the managing attorneys before production rollout.

---

## Appendix A: Technical Evidence

### A.1 Method
- **Access:** The audit user was a System Administrator with View All Data and Modify All Data but **without** Query All Files [VERIFIED]. File-level SOQL counts are therefore limited to files that user can see: `SELECT COUNT() FROM ContentDocument` returned 367, while the record-count API reports 164,700. The record-count API figure is used for volumes.
- **Calls made (all read-only HTTP GET):**
  - REST `/query`
  - REST `/tooling/query`
  - `/sobjects` and `/sobjects/{Opportunity|Lead}/describe`
  - `/limits`
  - `/limits/recordCount`
  - `sf org list metadata`
  - `sf project retrieve start --target-metadata-dir` for Settings: EinsteinGpt, PathAssistant, Opportunity, Knowledge, Forecasting, Activities, OmniChannel and Case
- **Where the queries are stored:** Query definitions are in [`evidence/`](evidence/) (`q1.txt`–`q4.txt`), run by `evidence/collect.js`. Raw results are **not** committed because they contain identifying data (profile, site and network names).
- **"Last 12 months":** this uses SOQL `LAST_N_MONTHS:12`, which runs from the start of the month 12 months ago to today (2026-10-05).

### A.2 Key queries and results
| Ref | Query (abridged) | Result |
|---|---|---|
| L1 | `SELECT Name, TotalLicenses, UsedLicenses, Status FROM UserLicense` | 15 rows (Table 1A) |
| L2 | `SELECT MasterLabel, TotalLicenses, UsedLicenses, ExpirationDate, Status FROM PermissionSetLicense` | 87 rows (subset in Table 1B) |
| L3 | `SELECT MasterLabel, AmountUsed, CurrentAmountAllowed, Frequency FROM TenantUsageEntitlement` | 19 rows (Table 1C) |
| L4 | `GET /limits` | DataStorageMB 41,780 / 23,108 remaining; FileStorageMB 76,828 / 24,653; DailyApiRequests 131,000 / 130,452; DailyAsyncApexExecutions 250,000 / 249,550 |
| L5 | `SELECT COUNT(Id) FROM User WHERE IsActive=true AND UserPermissions<X>=true` | Knowledge 0, Marketing 5, Support 3, Flow 20, Offline 25, SF Content 23, Call Center 0 |
| L6 | `SELECT COUNT(Id) FROM User WHERE IsActive AND UserType='Standard' AND LastLoginDate=LAST_N_DAYS:30` | 29 |
| L7 | Active users grouped by role | Attorney 12, Legal Secretary/Paralegal 6, Legal Assistant 2, Sales 2, Executive 2, IT 2, Accounting 2, Reception 1, none 4 |
| B1 | `GET /sobjects/Opportunity/describe` | Label "Matter"; 210 fields, 171 custom |
| B2 | `GET /limits/recordCount` | Opportunity 27,848; Lead 46,597; Account 39,876; Contact 39,898; Task 668,495; Event 134,216; Log Time 612,934; Accounting projects 22,088; Billings 104,283; Case 4 |
| B3 | Matters by record type and stage, `CreatedDate=LAST_N_MONTHS:12` | Consultation 1,409 (Not Retained 1,302, Cancelled 91, Scheduled 9, Retained 7); Retention 564; Nurture 568 |
| B4 | Matters created in the prior 12 months | 2,425 (against 2,541 in the last 12) |
| B5 | Leads by status, last 12 months | 12,871 total; Disqualified out 9,005, Disqualified in 1,542, Qualified + converted 1,124, Open 495 |
| B6 | Leads created in the prior 12 months | 9,210 |
| B7 | `SELECT COUNT() FROM AcctSeed__Project__c WHERE AcctSeed__Opportunity__c != null` | 21,781 |
| B8 | `Current_Situation__c` top values, last 12 months | Custody 814, Divorce multiple issues 488, Separation Agreement 282, Domestic Violence 138, Child Support 106 |
| B9 | Matter Contact Roles by role | Opposing Party 24,919; Client 22,968; Child 4,953; Opposing Attorney 2,932; Judge 129 |
| B10 | Retention matters with `Matter_Closed_Date__c = null` | 428 (383 created in the last 24 months); closed in the last 12 months: 535 |
| B11 | Retention matters, last 24 months, by `Matter_Management__c` | Non-Litigation 202, Post-Trial 194, Pre-Discovery 167, Mediation/Pre-Trial 167, Trial 150, Discovery 132, Absolute Divorce 62, Intake 52, blank 26, Adoption 5, Appeal 1 |
| B12 | Installed packages (Tooling `InstalledSubscriberPackage`) | 49 |
| B13 | Active flows (`FlowDefinitionView`) | 116 active of 159; unmanaged Process Builder active 6, inactive 10; no record-triggered Flow on Matter |
| B14 | Active Apex triggers on Opportunity (unmanaged) | 3: project creation, opposing-party handling, push counter |
| B15 | Active validation rules on Opportunity (unmanaged) | 9 (conflict checks, consultation attorney/date, expected retention date); none on lost reason |
| G1 | `SELECT MasterLabel, IsClosed, IsWon, DefaultProbability, ForecastCategoryName FROM OpportunityStage` | "Consult Attended – Not Retained": IsClosed=false, 100, Commit |
| G2 | Open Matters by record type | Consultation 13,268; Nurture 81; Internal 5; Retention 1 |
| G3 | Open Matters, no activity in 30 days / not modified in 90 days / past close date | Consultation 13,154 / 12,903 / 13,268 |
| G4 | Open consultations by stage | Not Retained 13,250; Scheduled 13; Prospecting 5 |
| G5 | Not-retained consults, last 12 months, by `Closed_Lost_Reason__c` | blank 1,272 of 1,302 |
| G6 | Not-retained consults, last 12 months, `Follow_Up__c=true` | 1,079 |
| G7 | Tasks on Matters, last 12 months, by subtype | Call 7,872; Task 15,573; Email 3,933 |
| G8 | Open overdue Tasks on Matters | 2,168 |
| G9 | `EmailMessage` last 12 months: all / related to Matter | 20,989 / 3,884 |
| G10 | Leads, last 12 months, no activity ever | 193 |
| V1 | Tooling `PathAssistant` | Matter_Management IsActive=false; Consultation_Sales_Path IsActive=false |
| V2 | Settings retrieve | PathAssistant enabled=true; Opportunity `enablePipelineInspection`=false; EinsteinGpt `enableEinsteinGptPlatform`=true; Knowledge enabled=false; OmniChannel enabled=false |
| V3 | `SELECT COUNT() FROM ActionPlanTemplate` | 0 |
| V4 | `SELECT ... FROM BotDefinition` / `BotVersion`; Tooling `GenAiPlannerDefinition` / `GenAiFunctionDefinition` | 0 / 0 / 0 / 0 |
| V5 | `sf org list metadata` GenAiPromptTemplate / GenAiPlannerBundle / GenAiPlugin / Bot | all empty |
| V6 | `SELECT ... FROM Network` | Client site DownForMaintenance; test portal UnderConstruction; one other DownForMaintenance |
| V7 | AI permission set assignments (names like Einstein/Agent/GenAI/Prompt/Copilot/AI) | Only system permission sets assigned (1 each); no user-facing AI permission sets |

### A.3 Failed or inaccessible queries
These queries returned `INVALID_TYPE` or a "not supported" error, which shows the feature is not enabled:

| Query | Meaning |
|---|---|
| `KnowledgeArticleVersion` | Knowledge off; confirmed by settings |
| `ServiceChannel`, `QueueRoutingConfig`, `PresenceUserConfig` | Omni-Channel off |
| `Entitlement`, `SlaProcess` | Entitlements off |
| `ActionCadence` | Sales Engagement off |
| `OpportunityScore`, `LeadIntelligence` | Einstein scoring off |
| `ActivityMetric` | Activity metrics not available |
| `LiveChatDeployment` | Legacy chat off |
| `Territory2` | Territory Management off |
| `GenAiPromptTemplate` via SOQL / Tooling | Not queryable this way; metadata listing used instead |
| `PathAssistant` via SOQL | Queried via Tooling instead |

These failed for other reasons:

| Query | Reason |
|---|---|
| `OauthToken` grouped count | Aggregate not supported on that object |
| `EmailTemplate` grouped by FolderName | Field not groupable |
| `EmailServicesFunction.DeveloperName`, `MatchingRule.MatchingRuleStatus`, `AppMenuItem.DeveloperName`, `User.UserPermissionsLiveAgentUser` | Field not available |
| Workflow rule active status (Tooling `WorkflowRule`) | No status field [NOT ACCESSIBLE] |
| Einstein Activity Capture configuration | Not exposed by the API [NOT ACCESSIBLE] |
| Einstein / Agentforce consumption credit balance (Digital Wallet) | Not exposed via TenantUsageEntitlement [NOT ACCESSIBLE] |

### A.4 Assumptions
- Process Builder is a retired tool, per Salesforce's public retirement announcements. [ASSUMPTION]
- The Einstein Trust Layer's zero-retention and masking behaviour applies to prompt templates and agents. [ASSUMPTION]
- The External Apps Login license may not include the Opportunity object, so UC-08 may need a custom status object. [ASSUMPTION]
- Agentforce Sales Coach compatibility with the renamed Matter object, and the telephony integration for Conversation Insights, are not verified. [ASSUMPTION]
- "Retention ratio ≈ 40%" is Retention Matters created ÷ Consultation Matters created in the same 12 months. It is not a per-record conversion trace. [INFERRED]

### A.5 Write operations
None were run. No DML, deployments, permission or license assignments, or anonymous Apex. Changes proposed in this report (stage settings, backlog close-out, Path activation, Flow migration) are recommendations only, and must be approved and run by the client's team in a sandbox first.
