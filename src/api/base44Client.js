import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication required
export const base44 = createClient({
  appId: "6892058ac03f9a535b4f7648", 
  requiresAuth: true // Ensure authentication is required for all operations
});
