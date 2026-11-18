import { test, expect } from '@playwright/test';

// Import the pure function for unit testing
import { buildMailtoUrl } from '@/components/sections/Contact';

test.describe('Contact Form - Unit Tests', () => {
  const formData = {
    name: 'Test User',
    email: 'test@example.com',
    projectType: 'website',
    budget: '25-50',
    timeline: '1-3',
    message: 'This is a test message with special chars: & = % ? # and Unicode: Ω 雪',
    website: '', // honeypot
  };

  test('buildMailtoUrl generates correct URL with all fields', () => {
    const verifiedEmail = 'hello@rtsolutions.dev';
    const url = buildMailtoUrl(formData, verifiedEmail);

    expect(url).toContain('mailto:hello@rtsolutions.dev');
    expect(url).toContain('subject=Project%20Inquiry%3A%20Custom%20Website');
    expect(url).toContain('Name%3A%20Test%20User');
    expect(url).toContain('Email%3A%20test%40example.com');
    expect(url).toContain('Project%20Type%3A%20Custom%20Website');
    expect(url).toContain('Budget%20Range%3A%20%2425k%20%E2%80%93%20%2450k');
    expect(url).toContain('Timeline%3A%201%E2%80%933%20months');
    expect(url).toContain('Project%20Details%3A');
    const parsed = new URL(url);
    expect(parsed.protocol).toBe('mailto:');
    expect(parsed.pathname).toBe(verifiedEmail);
    const params = new URLSearchParams(parsed.search);
    expect(params.get('subject')).toBe('Project Inquiry: Custom Website');
    expect(params.get('body')).toContain('Name: Test User');
    expect(params.get('body')).toContain('Email: test@example.com');
    expect(params.get('body')).toContain('Project Type: Custom Website');
    expect(params.get('body')).toContain('Budget Range: $25k – $50k');
    expect(params.get('body')).toContain('Timeline: 1–3 months');
    expect(params.get('body')).toContain('special chars: & = % ? # and Unicode: Ω 雪');
  });

  test('buildMailtoUrl handles missing optional fields', () => {
    const data = { ...formData, budget: '', timeline: '' };
    const verifiedEmail = 'hello@rtsolutions.dev';
    const url = buildMailtoUrl(data, verifiedEmail);

    expect(url).toContain('Budget%20Range%3A%20Not%20specified');
    expect(url).toContain('Timeline%3A%20Not%20specified');
  });

  test('buildMailtoUrl uses verified email from config', () => {
    const verifiedEmail = 'verified@company.com';
    const url = buildMailtoUrl(formData, verifiedEmail);

    expect(url).toContain('mailto:verified@company.com');
    expect(url).not.toContain('hello@rtsolutions.dev');
  });
});

test.describe('Contact Form - E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
  });

  test('form validation rejects empty required fields', async ({ page }) => {
    await page.click('button[type="submit"]');

    // Check that required field errors appear
    await expect(page.locator('#name-error')).toBeVisible();
    await expect(page.locator('#email-error')).toBeVisible();
    await expect(page.locator('#projectType-error')).toBeVisible();
    await expect(page.locator('#message-error')).toBeVisible();
  });

  test('form validation rejects invalid email format', async ({ page }) => {
    // Use fill for speed, but type email to trigger validation
    await page.fill('input[name="name"]', 'Test User');
    await page.click('input[name="email"]');
    await page.keyboard.type('not-an-email', { delay: 50 });
    await page.selectOption('select[name="projectType"]', 'website');
    await page.fill('textarea[name="message"]', 'This is a test message for the contact form validation that is long enough to pass minimum length requirements.');

    // Verify form is filled
    await expect(page.locator('input[name="email"]')).toHaveValue('not-an-email');
    await expect(page.locator('input[name="name"]')).toHaveValue('Test User');

    // Click submit
    await page.click('button[type="submit"]');

    // Wait for validation to run
    await page.waitForTimeout(1000);

    // Check if button changed to "Preparing..." (submitting state)
    const submitButton = page.locator('button[type="submit"]');
    const buttonText = await submitButton.textContent();
    console.log('Button text after submit:', buttonText);

    // The form should NOT submit due to invalid email - button should NOT show "Preparing..."
    expect(buttonText).not.toContain('Preparing');

    // Form data should persist
    await expect(page.locator('input[name="email"]')).toHaveValue('not-an-email');
    await expect(page.locator('input[name="name"]')).toHaveValue('Test User');
  });

  test('form validation rejects message under 50 chars', async ({ page }) => {
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.selectOption('select[name="projectType"]', 'website');
    await page.fill('textarea[name="message"]', 'Too short');
    await page.click('button[type="submit"]');

    await expect(page.locator('#message-error')).toBeVisible();
    await expect(page.locator('#message-error')).toContainText('min 50 chars');
  });

  test('form validation accepts valid input', async ({ page }) => {
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.selectOption('select[name="projectType"]', 'website');
    await page.fill('textarea[name="message"]', 'This is a test message for the contact form validation that is definitely long enough to pass.');

    // Submit button should be enabled
    await expect(page.locator('button[type="submit"]')).toBeEnabled();
  });

  test('placeholder config shows warning, does not open mailto', async ({ page }) => {
    // Fill valid form data
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.selectOption('select[name="projectType"]', 'website');
    await page.fill('textarea[name="message"]', 'This is a test message for the contact form validation that is definitely long enough to pass.');

    // Listen for navigation (mailto would cause navigation)
    const navigationPromise = page.waitForEvent('framenavigated', { timeout: 2000 }).catch(() => null);

    await page.click('button[type="submit"]');

    // Wait for the placeholder warning to appear
    await expect(page.locator('text=Contact details are placeholders')).toBeVisible({ timeout: 5000 });

    // Verify no navigation occurred (mailto not opened)
    const navigation = await navigationPromise;
    expect(navigation).toBeNull();

    // Dismiss warning to check form data persists
    await page.click('button:has-text("Dismiss")');
    await page.waitForTimeout(300);

    // Form data should persist - not cleared
    await expect(page.locator('input[name="name"]')).toHaveValue('Test User');
    await expect(page.locator('input[name="email"]')).toHaveValue('test@example.com');
  });

  test('form data persists after submit (no auto-clear)', async ({ page }) => {
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.selectOption('select[name="projectType"]', 'website');
    await page.fill('textarea[name="message"]', 'This is a test message for the contact form validation that is definitely long enough to pass.');

    await page.click('button[type="submit"]');

    // Wait for placeholder warning (since config.isPlaceholder is true)
    await expect(page.locator('text=Contact details are placeholders')).toBeVisible({ timeout: 5000 });

    // Dismiss warning to check form data
    await page.click('button:has-text("Dismiss")');
    await page.waitForTimeout(300);

    // Form data should persist - not cleared
    await expect(page.locator('input[name="name"]')).toHaveValue('Test User');
    await expect(page.locator('input[name="email"]')).toHaveValue('test@example.com');
    await expect(page.locator('select[name="projectType"]')).toHaveValue('website');
    await expect(page.locator('textarea[name="message"]')).toHaveValue('This is a test message for the contact form validation that is definitely long enough to pass.');
  });

  test('no fake success toast appears', async ({ page }) => {
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.selectOption('select[name="projectType"]', 'website');
    await page.fill('textarea[name="message"]', 'This is a test message for the contact form validation that is definitely long enough to pass.');

    await page.click('button[type="submit"]');

    // Wait for placeholder warning
    await expect(page.locator('text=Contact details are placeholders')).toBeVisible({ timeout: 5000 });

    // Verify "Message sent" toast does NOT appear
    await expect(page.locator('text=Message sent')).not.toBeVisible();
    await expect(page.locator('text=Thanks for reaching out')).not.toBeVisible();
    await expect(page.locator('text=Send another message')).not.toBeVisible();
  });

  test('placeholder contact notice explains that no message is sent', async ({ page }) => {
    await expect(page.getByText('No verified recipient is configured. Your draft stays in this open page only; leaving or refreshing clears it. Nothing is sent or stored by RTSOLUTIONS.')).toBeVisible();
  });

  test('placeholder mode labels the submit action honestly', async ({ page }) => {
    await expect(page.locator('#contact button[type="submit"]')).toHaveText('Review contact status');
    await expect(page.locator('#contact')).toContainText('No verified contact address is published yet.');
  });

  test('no false storage claim in footer text', async ({ page }) => {
    // Check that the old false storage claim is gone
    await expect(page.locator('text=By submitting, you agree we may store this information')).not.toBeVisible();
    await expect(page.locator('text=No marketing lists. No third parties.')).not.toBeVisible();
  });

  test('no dead privacy link', async ({ page }) => {
    // Check that the old privacy link in the contact form footer is gone
    // The old code had: <a href="#">Privacy notice</a> right after the form submit button
    const contactForm = page.locator('#contact form');
    const privacyLink = contactForm.locator('a[href="#"]');
    await expect(privacyLink).toHaveCount(0);
  });

  test('honeypot field exists and is hidden', async ({ page }) => {
    const honeypot = page.locator('input[name="website"]');
    await expect(honeypot).toBeHidden();
    await expect(honeypot).toHaveAttribute('tabIndex', '-1');
    await expect(honeypot).toHaveAttribute('autoComplete', 'off');
    await expect(honeypot).toHaveAttribute('aria-hidden', 'true');
  });

  test('form options are data-driven from config - project types', async ({ page }) => {
    // Check that project type options match config
    const options = await page.locator('select[name="projectType"] option').allTextContents();
    expect(options).toContain('Custom Website');
    expect(options).toContain('Web Application');
    expect(options).toContain('Desktop Application');
    expect(options).toContain('Multiple / Not Sure');
  });

  test('form options are data-driven from config - budget ranges', async ({ page }) => {
    // Check that budget options match config
    const options = await page.locator('select[name="budget"] option').allTextContents();
    expect(options).toContain('$10k – $25k');
    expect(options).toContain('$25k – $50k');
    expect(options).toContain('$50k – $100k');
    expect(options).toContain('$100k+');
    expect(options).toContain('Prefer to discuss');
  });

  test('form options are data-driven from config - timelines', async ({ page }) => {
    // Check that timeline options match config
    const options = await page.locator('select[name="timeline"] option').allTextContents();
    expect(options).toContain('ASAP');
    expect(options).toContain('1–3 months');
    expect(options).toContain('3–6 months');
    expect(options).toContain('6+ months');
    expect(options).toContain('Flexible');
  });

  test('unverified response time and business hours are not presented as commitments', async ({ page }) => {
    await expect(page.locator('#contact').getByText('Response Time')).toHaveCount(0);
    await expect(page.locator('#contact').getByText('Work Hours')).toHaveCount(0);
    await expect(page.locator('#contact').getByText('1–2 business days')).toHaveCount(0);
    await expect(page.locator('#contact').getByText('Mon–Fri, 9am–6pm CET')).toHaveCount(0);
  });

  test('placeholder notice visible in info column when config.isPlaceholder is true', async ({ page }) => {
    // Check for placeholder notice in info column - use more specific selector
    await expect(page.locator('#contact').locator('text=Placeholder contact details — replace with verified info in config').first()).toBeVisible();
  });

  test('placeholder mode never exposes unverified email links or addresses', async ({ page }) => {
    await expect(page.locator('#contact a[href^="mailto:"]')).toHaveCount(0);
    await expect(page.locator('footer a[href^="mailto:"]')).toHaveCount(0);
    await expect(page.getByText('hello@rtsolutions.dev')).toHaveCount(0);
    await expect(page.getByText('No verified contact address is published yet.')).toBeVisible();
  });
});