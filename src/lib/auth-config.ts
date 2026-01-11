// Server-side only auth configuration
// These values are NEVER exposed to the client

export const AUTH_CONFIG = {
  // In production, use proper auth like NextAuth.js with a database
  // These are read from server-only environment variables
  adminEmail: process.env.ADMIN_EMAIL || 'denuelinambao@gmail.com',
  adminPassword: process.env.ADMIN_PASSWORD || 'admin123', // Change this!
  
  // Session settings
  sessionDuration: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  cookieName: 'portfolio_session',
}

// Validate credentials (server-side only)
export function validateCredentials(email: string, password: string): boolean {
  return email === AUTH_CONFIG.adminEmail && password === AUTH_CONFIG.adminPassword
}
