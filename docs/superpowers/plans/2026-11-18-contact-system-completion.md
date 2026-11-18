# Contact System Completion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the Contact.tsx form to use honest mailto fallback, remove fake success state, correct privacy/security claims, verify business information, add E2E tests, and update documentation.

**Architecture:** The contact form currently simulates submission with a 1.5s timeout and shows a fake success toast. We replace this with: (1) client-side validation, (2) if config.isPlaceholder=true show a warning and don't auto-submit, (3) if verified email exists, generate a properly encoded mailto: link with all form data and open it, (4) clearly tell the user they must send the email themselves, (5) never show "Message sent" without actual delivery confirmation, (6) remove false privacy/storage claims and dead links.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript 6.1, Tailwind CSS 4, Motion (Framer Motion), Playwright for E2E.

**Spec:** Task requirements from GitHub issue #3 (pasted in session), CLAUDE.md, existing Contact.tsx, config.ts, QA_REPORT.md, AUDIT_REPORT.md.

## Global Constraints

- Never display "Message sent" without actual delivery confirmation (from issue #3)
- No automatic form clearing after simulated submission (from issue #3)
- Support properly encoded mailto draft when verified recipient exists (from issue #3)
- Clearly explain user must send email draft themselves (from issue #3)
- If config.isPlaceholder is true, do not silently direct to placeholder address (from issue #3)
- Keep architecture ready for actual backend but don't introduce paid providers/secrets without authorization (from issue #3)
- Remove false data-storage statement (from issue #3)
- Remove dead privacy link or replace with actual policy (from issue #3)
- Treat honeypot as client-side filtering, not server-side protection (from issue #3)
- Don't claim spam protection that doesn't exist (from issue #3)
- Response time: 1–2 business days; Business hours: 9am–6pm CET; USD budget ranges (from issue #3)
- Placeholder email and social links must be clearly marked (from issue #3)
- Centralize configurable values in config.ts or remove unverified claims (from issue #3)
- Preserve jellyfish and existing visual identity (from issue #3)
- Work on branch claude/fable-5-2-build, no force-push (from issue #3)
- Run: npm run lint, npm run typecheck, npm run build, npm run test (from issue #3)
- Browser verification at 390×844, 768×1024, 1440×900, 1920×1080 (from issue #3)
- Update README.md, QA_REPORT.md, AUDIT_REPORT.md (from issue #3)
- Commit and push changes, update PR #2, don't merge (from issue #3)

## Review Focus

1. **Placeholder email used silently** — If `config.isPlaceholder === true` and user submits, the form must not open a mailto to the placeholder address. Test: submit form when isPlaceholder=true, verify no mailto opens, warning shown instead.

2. **Fake success state shown** — The "Message sent" toast must never appear without actual delivery confirmation (which we don't have). Test: submit valid form, verify "Message sent" toast does NOT appear.

3. **Form data silently discarded** — After mailto opens or warning shown, form data must remain filled in. Test: submit form, verify fields still contain user's input.

4. **Privacy/storage claims** — The footer text "By submitting, you agree we may store this information..." must be removed or corrected. Test: verify this text is absent or corrected.

5. **Dead privacy link** — The "Privacy notice" link pointing to `#` must be removed or replaced with real policy. Test: verify link is removed or points to real policy.

6. **Honeypot misrepresentation** — Code comments say "server-side protection" but it's client-only. Test: verify honeypot check is documented as client-side only.

7. **mailto encoding** — All form fields must be properly URL-encoded in the mailto body. Test: submit form with special characters (newlines, &, =, %, spaces), verify mailto body is correctly encoded.

8. **Config-driven business info** — Response time, business hours, budget ranges must come from config.ts or be removed. Test: verify these values are centralized.

## Task List

### Task 1: Update config.ts with contact-related configuration

**Files:**
- Modify: `src/lib/config.ts`

**Interfaces:**
- Consumes: existing config object
- Produces: contactConfig object with verifiedEmail, isPlaceholder, responseTime, businessHours, privacyPolicyUrl

- [ ] **Step 1: Add contact configuration to config.ts**

```typescript
// Add to config object:
contact: {
  verifiedEmail: 'hello@rtsolutions.dev',  // Only used when isPlaceholder: false
  isPlaceholder: true,
  responseTime: '1–2 business days',
  businessHours: 'Mon–Fri, 9am–6pm CET',
  privacyPolicyUrl: '',  // Empty = no policy yet
} as const,
```

- [ ] **Step 2: Run typecheck to verify**
Run: `npm run typecheck`
Expected: PASS

- [ ] **Step 3: Commit**
```bash
git add src/lib/config.ts
git commit -m "config: add contact configuration with placeholder flag"
```

### Task 2: Rewrite Contact.tsx form submission logic

**Files:**
- Modify: `src/components/sections/Contact.tsx`

**Interfaces:**
- Consumes: config from `@/lib/config`
- Produces: handleSubmit that validates, checks placeholder, generates mailto, opens it, shows appropriate UI feedback (no fake success)

- [ ] **Step 1: Write failing test for new behavior** (in tests/contact.spec.ts - create if needed)
```typescript
// Test: form validation rejects empty required fields
// Test: form validation accepts valid input
// Test: when isPlaceholder=true, submit shows warning not mailto
// Test: when isPlaceholder=false, submit opens mailto with encoded data
// Test: form data persists after submit (no auto-clear)
// Test: "Message sent" toast never appears
```

- [ ] **Step 2: Run test to verify it fails**
Run: `npx playwright test tests/contact.spec.ts --project=chromium`
Expected: FAIL (tests don't exist or fail against current implementation)

- [ ] **Step 3: Implement new handleSubmit in Contact.tsx**

Key changes:
1. Remove `formState: 'success'` state entirely
2. Remove `setFormState('success')` and form clearing on line 53-54
3. In handleSubmit after validation:
   - If `config.contact.isPlaceholder` → show inline warning "Contact details are placeholders. Please email us directly at [email] or update config."
   - Else → generate mailto: with all form data URL-encoded, open via `window.location.href = mailtoUrl`
   - Show toast: "Email draft opened in your default mail client. Please review and send it yourself."
   - Do NOT clear form data
   - Do NOT show "Message sent" state
4. Update UI: replace success state with a transient toast/notification (using Motion AnimatePresence)
5. Remove false privacy statement: "By submitting, you agree we may store this information..."
6. Remove dead privacy link `<a href="#">Privacy notice</a>`
7. Update honeypot comment: "client-side filtering only" not "server-side protection"
8. Keep architecture ready for backend: leave commented fetch example but clearly marked as future work

- [ ] **Step 4: Run test to verify it passes**
Run: `npx playwright test tests/contact.spec.ts --project=chromium`
Expected: PASS

- [ ] **Step 5: Run lint and typecheck**
Run: `npm run lint && npm run typecheck`
Expected: PASS

- [ ] **Step 6: Commit**
```bash
git add src/components/sections/Contact.tsx tests/contact.spec.ts
git commit -m "contact: replace fake submission with honest mailto fallback"
```

### Task 3: Update business information display in Contact.tsx

**Files:**
- Modify: `src/components/sections/Contact.tsx`

**Interfaces:**
- Consumes: config.contact.responseTime, config.contact.businessHours
- Produces: Updated UI showing centralized values

- [ ] **Step 1: Replace hardcoded "1–2 business days" with config.contact.responseTime**
- [ ] **Step 2: Replace hardcoded "Mon–Fri, 9am–6pm CET" with config.contact.businessHours**
- [ ] **Step 3: Verify budget ranges in form match config.budgetRanges (already centralized)**
- [ ] **Step 4: Verify project types match config.projectTypes (already centralized)**
- [ ] **Step 5: Run typecheck**
Run: `npm run typecheck`
Expected: PASS

- [ ] **Step 6: Commit**
```bash
git add src/components/sections/Contact.tsx
git commit -m "contact: centralize business info display from config"
```

### Task 4: Add comprehensive E2E tests for contact form

**Files:**
- Create: `tests/contact.spec.ts`

**Interfaces:**
- Consumes: Contact.tsx, config.ts
- Produces: Playwright tests covering all requirements

- [ ] **Step 1: Write test file with these test cases:**

```typescript
test('form validation rejects empty required fields', async ({ page }) => { ... })
test('form validation rejects invalid email format', async ({ page }) => { ... })
test('form validation rejects message under 50 chars', async ({ page }) => { ... })
test('form validation accepts valid input', async ({ page }) => { ... })
test('placeholder config shows warning, does not open mailto', async ({ page }) => { ... })
test('verified config opens mailto with URL-encoded data', async ({ page }) => { ... })
test('mailto body contains all form fields correctly encoded', async ({ page }) => { ... })
test('form data persists after submit (no auto-clear)', async ({ page }) => { ... })
test('no fake success toast appears', async ({ page }) => { ... })
test('no false storage claim in footer text', async ({ page }) => { ... })
test('no dead privacy link', async ({ page }) => { ... })
test('honeypot field exists and is hidden', async ({ page }) => { ... })
```

- [ ] **Step 2: Run tests to verify they pass**
Run: `npx playwright test tests/contact.spec.ts --project=chromium`
Expected: PASS (all tests)

- [ ] **Step 3: Commit**
```bash
git add tests/contact.spec.ts
git commit -m "test: add comprehensive contact form E2E tests"
```

### Task 5: Run full verification suite

**Files:** (verification only)

- [ ] **Step 1: Run lint**
Run: `npm run lint`
Expected: PASS (0 errors)

- [ ] **Step 2: Run typecheck**
Run: `npm run typecheck`
Expected: PASS (0 errors)

- [ ] **Step 3: Run production build**
Run: `npm run build`
Expected: PASS (clean build, no warnings)

- [ ] **Step 4: Run all E2E tests**
Run: `npm run test`
Expected: PASS (all 19+ tests including new contact tests)

- [ ] **Step 5: Capture viewport screenshots**
Run: `npx playwright test tests/capture-screenshots.spec.ts --project=chromium`
Expected: PASS (4/4 fresh screenshots)

- [ ] **Step 6: Commit**
```bash
git add -A
git commit -m "verify: all checks pass after contact system completion"
```

### Task 6: Update documentation (README.md, QA_REPORT.md, AUDIT_REPORT.md)

**Files:**
- Modify: `README.md`
- Modify: `docs/QA_REPORT.md`
- Modify: `docs/AUDIT_REPORT.md`

**Interfaces:**
- Consumes: verification results from Task 5
- Produces: Updated documentation with current status

- [ ] **Step 1: Update README.md** — Update verification checklist, known limitations, contact form description
- [ ] **Step 2: Update QA_REPORT.md** — Add contact form test results, update verification commands, update sign-off
- [ ] **Step 3: Update AUDIT_REPORT.md** — Mark contact form issues as resolved, update defect list
- [ ] **Step 4: Commit**
```bash
git add README.md docs/QA_REPORT.md docs/AUDIT_REPORT.md
git commit -m "docs: update README, QA_REPORT, AUDIT_REPORT after contact completion"
```

### Task 7: Push to branch and update PR #2

**Files:** (git operations)

- [ ] **Step 1: Push to claude/fable-5-2-build**
Run: `git push origin claude/fable-5-2-build`
Expected: Success (no force-push)

- [ ] **Step 2: Verify PR #2 updated**
Check GitHub PR #2 shows new commits
Expected: PR updated with new commits

- [ ] **Step 3: Report completion with evidence**
Provide: branch, commit SHAs, PR URL, command outputs, test results, known limitations, remaining owner decisions