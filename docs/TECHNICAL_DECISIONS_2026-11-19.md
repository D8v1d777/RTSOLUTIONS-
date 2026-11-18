# Technical Decisions — Independent Quality Pass (19 November 2026)

## 1. Keep the active build as the integration base

**Decision:** Branch from the deployed `claude/fable-5-2-build` head and target that branch with a separate PR.

**Reason:** The repository's `main` branch is still the original documentation base, while PR #2 already carries the full website implementation. Targeting `main` from another branch based on the active build would duplicate the entire implementation in a second PR. The isolated quality branch keeps the diff reviewable and leaves the existing PR untouched.

## 2. Generate robots metadata from the configured origin

**Decision:** Replace the hard-coded public `robots.txt` with `src/app/robots.ts` using `MetadataRoute.Robots`.

**Reason:** The live robots file pointed to an unrelated `rtsolutions.dev` host and blocked `/_next/`. The generated route derives the sitemap URL from `NEXT_PUBLIC_SITE_URL` or the verified production fallback, and leaves public rendering assets crawlable. This follows the current Next.js metadata file convention: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots

## 3. Keep the sitemap to real documents

**Decision:** List only the home page.

**Reason:** The site is a single-page site. Section fragments are in-page navigation targets, not distinct documents to submit to crawlers. This follows the Next.js sitemap convention: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap

## 4. Declare a canonical URL

**Decision:** Set `alternates.canonical: '/'` against the existing `metadataBase`.

**Reason:** The live page had no canonical link. Using the existing environment-aware metadata base avoids introducing a second source of truth.

## 5. Treat form values as presentation labels at the email boundary

**Decision:** Resolve project type, budget, and timeline keys through the central config before constructing the mailto subject/body.

**Reason:** Machine keys are useful for state and tests, but a person receiving the draft should see “Custom Website”, “$25k – $50k”, and “1–3 months”, not `website`, `25-50`, and `1-3`.

## 6. Preserve custom validation while exposing native semantics

**Decision:** Add `required` attributes and autocomplete values, and use `noValidate` so the existing inline error UI remains in control.

**Reason:** Visible asterisks and JavaScript validation alone do not communicate required state to assistive technology. The form keeps its existing custom error associations while exposing the semantic constraints.

## 7. Remove claims that are not evidenced or agreed

**Decision:** Replace numeric coverage, toolchain, compliance, staffing, access, and support guarantees with scope-aware descriptions of the studio's working principles.

**Reason:** The build brief explicitly prohibits fabricated business claims. A capability statement should describe an approach; it must not imply a verified SLA, certification, stack commitment, staffing model, or support entitlement that the owner has not confirmed.

## 8. Remove unpublished destinations instead of simulating disabled links

**Decision:** Keep only the working “Selected Work” footer link until real case-study destinations exist.

**Reason:** An anchor with `href="#"` is still a navigable link even when marked `aria-disabled`. Omitting unavailable destinations is more truthful and keyboard-safe than presenting dead controls.


## 9. Scope the mobile toggle visibility without touching global design tokens

**Decision:** Keep the existing mobile breakpoint, but add a component-scoped CSS Module rule that hides the mobile toggle from 768px upward.

**Reason:** The global `.site-mobile-toggle` rule sets `display: grid` after Tailwind utilities are imported. That rule overrode `md:hidden`, so a second hamburger appeared beside the full navigation at tablet and desktop widths. The higher-specificity CSS Module rule fixes the visibility defect without changing the hero, design tokens, or global composition.

## 10. Close the mobile menu on Escape and restore focus

**Decision:** When the mobile menu is open, Escape closes it and returns focus to the menu trigger.

**Reason:** The menu already supported pointer and link activation, but keyboard users had no direct dismissal key. Focus restoration gives the user a predictable place to continue navigating after the menu closes.

## 11. Remove an unused, unverified social handle

**Decision:** Remove the unused `twitterHandle: '@rtsolutions'` value from the central config.

**Reason:** No verified Twitter/X profile was supplied and the field had no code consumer. Keeping an unverified handle in the shared config could accidentally become public metadata in a later change.
