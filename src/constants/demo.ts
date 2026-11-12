/**
 * Demo mode: sample job listings, verification codes shown on screen and a
 * simulated checkout (nothing is charged, no email is sent).
 */
export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
export const DEMO_LOGIN = { email: "maya.patel@demo.careerseal.app", password: "CareerSeal@2026" };
export const DEMO_CODE_KEY = "cs_demo_code";

export const rememberDemoCode = (code?: string) => {
  try {
    if (code) sessionStorage.setItem(DEMO_CODE_KEY, code);
  } catch {}
};
export const readDemoCode = () => {
  try {
    return sessionStorage.getItem(DEMO_CODE_KEY) || "";
  } catch {
    return "";
  }
};
