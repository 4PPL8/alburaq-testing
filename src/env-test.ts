// This file tests if environment variables are being loaded correctly

// Log the raw environment variables
console.log('Raw env variables:', {
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
});

// Check if they are defined
console.log('Are env variables defined:', {
  VITE_SUPABASE_URL: typeof import.meta.env.VITE_SUPABASE_URL !== 'undefined',
  VITE_SUPABASE_ANON_KEY: typeof import.meta.env.VITE_SUPABASE_ANON_KEY !== 'undefined',
});

// Check if they are non-empty strings
console.log('Are env variables non-empty strings:', {
  VITE_SUPABASE_URL: typeof import.meta.env.VITE_SUPABASE_URL === 'string' && import.meta.env.VITE_SUPABASE_URL.length > 0,
  VITE_SUPABASE_ANON_KEY: typeof import.meta.env.VITE_SUPABASE_ANON_KEY === 'string' && import.meta.env.VITE_SUPABASE_ANON_KEY.length > 0,
});