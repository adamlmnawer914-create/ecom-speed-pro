/**
 * Security Configuration for ECOM SPEED PRO Admin Dashboard
 * Restricts dashboard access exclusively to the official Desktop Application.
 */

export const DESKTOP_SECRET_TOKEN = "ESP_SECURE_DESKTOP_TOKEN_2026_9f8d1c7a4b";
export const ADMIN_EMERGENCY_PIN = "2026";

/**
 * Validates whether a token matches the desktop master secret or emergency PIN
 */
export function validateAdminToken(token?: string | null): boolean {
  if (!token) return false;
  const clean = token.trim();
  return clean === DESKTOP_SECRET_TOKEN || clean === ADMIN_EMERGENCY_PIN;
}

/**
 * Checks if an incoming Next.js API Request is authorized from the Desktop App
 */
export function isAuthorizedDesktopRequest(req: Request): boolean {
  const url = new URL(req.url);

  // Check custom desktop headers
  const authHeader = req.headers.get("x-desktop-auth-token") || req.headers.get("x-admin-token");
  if (authHeader && validateAdminToken(authHeader)) {
    return true;
  }

  // Check query parameter
  const queryToken = url.searchParams.get("token") || url.searchParams.get("desktop_token");
  if (queryToken && validateAdminToken(queryToken)) {
    return true;
  }

  // Check user-agent signature
  const userAgent = req.headers.get("user-agent") || "";
  if (userAgent.includes("EcomSpeedPro-Desktop-Application") || userAgent.includes("SecureAdminClient/9f8d1c7a4b")) {
    return true;
  }

  return false;
}
