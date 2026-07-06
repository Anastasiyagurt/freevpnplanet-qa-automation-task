export function generateTestEmail(prefix = "qa.automation"): string {
  const timestamp = Date.now();
  return `${prefix}.${timestamp}@mailinator.com`;
}
