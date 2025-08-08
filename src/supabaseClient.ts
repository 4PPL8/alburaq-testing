// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// Log environment variables for debugging
console.log('Environment variables in supabaseClient.ts:');
console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('VITE_SUPABASE_ANON_KEY exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
console.log('VITE_SUPABASE_ANON_KEY length:', import.meta.env.VITE_SUPABASE_ANON_KEY ? import.meta.env.VITE_SUPABASE_ANON_KEY.length : 0);

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing from .env. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.');
  console.error('Current values - URL:', supabaseUrl, 'Key exists:', !!supabaseAnonKey);
  // In a production app, you might want to prevent the app from loading or show a critical error message.
}

// Create a fallback client if environment variables are missing
let supabase;
try {
  // Ensure URL is properly formatted
  if (supabaseUrl && supabaseAnonKey) {
    // Make sure URL has proper protocol
    const formattedUrl = supabaseUrl.startsWith('http') ? supabaseUrl : `https://${supabaseUrl}`;
    console.log('Creating Supabase client with URL:', formattedUrl);
    console.log('Supabase key format check - starts with "ey":', supabaseAnonKey.startsWith('ey'));
    
    try {
      // Create Supabase client with additional options for better error handling
      supabase = createClient(formattedUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
        global: {
          fetch: (...args) => fetch(...args),
          headers: { 'X-Client-Info': 'AlBuraq Web App' }
        }
      });
      console.log('Supabase client created successfully');
      
      // Test the connection with better error handling
      console.log('Testing Supabase connection...');
      setTimeout(() => {
        supabase.from('products').select('count', { count: 'exact', head: true })
          .then(({ count, error }) => {
            if (error) {
              console.error('Supabase connection test failed:', error);
              console.warn('Will continue with local storage fallback');
            } else {
              console.log('Supabase connection test successful, products count:', count);
            }
          })
          .catch(err => {
            console.error('Supabase connection test exception:', err.message || err);
            console.warn('Network error detected. Will continue with local storage fallback');
            // Log additional details for debugging
            if (err.code) console.error('Error code:', err.code);
            if (err.status) console.error('Status:', err.status);
          });
      }, 500); // Small delay to ensure client is fully initialized
    } catch (clientError) {
      console.error('Error creating Supabase client instance:', clientError);
      throw clientError;
    }
  } else {
    // Create a dummy client that logs operations instead of executing them
    console.warn('Creating dummy Supabase client due to missing credentials');
    supabase = {
      from: (table) => ({
        select: (query) => {
          console.log(`Missing credentials: Attempted to select from ${table}`, query);
          return Promise.resolve({ data: [], error: new Error('Supabase credentials not configured') });
        },
        insert: (data) => {
          console.log(`Missing credentials: Attempted to insert into ${table}`, data);
          return Promise.resolve({ data: null, error: new Error('Supabase credentials not configured') });
        },
        update: (data) => {
          console.log(`Missing credentials: Attempted to update ${table}`, data);
          return Promise.resolve({ data: null, error: new Error('Supabase credentials not configured') });
        },
        delete: () => {
          console.log(`Missing credentials: Attempted to delete from ${table}`);
          return Promise.resolve({ data: null, error: new Error('Supabase credentials not configured') });
        },
      }),
      // Add auth stub to prevent errors when auth methods are called
      auth: {
        onAuthStateChange: () => ({ data: {}, error: null }),
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      }
    };
  }
} catch (error) {
  console.error('Error creating Supabase client:', error?.message || error);
  if (error instanceof Error) {
    console.error('Error name:', error.name);
    console.error('Error stack:', error.stack);
  }
  
  // Create a more informative dummy client as fallback
  console.warn('Creating fallback client for offline/error mode');
  supabase = {
    from: (table) => ({
      select: (query) => {
        console.log(`Offline mode: Attempted to select from ${table}`, query);
        return Promise.resolve({ data: [], error: new Error('Using offline mode: Supabase connection failed') });
      },
      insert: (data) => {
        console.log(`Offline mode: Attempted to insert into ${table}`, data);
        return Promise.resolve({ data: null, error: new Error('Using offline mode: Supabase connection failed') });
      },
      update: (data) => {
        console.log(`Offline mode: Attempted to update ${table}`, data);
        return Promise.resolve({ data: null, error: new Error('Using offline mode: Supabase connection failed') });
      },
      delete: () => {
        console.log(`Offline mode: Attempted to delete from ${table}`);
        return Promise.resolve({ data: null, error: new Error('Using offline mode: Supabase connection failed') });
      },
    }),
    // Add auth stub to prevent errors when auth methods are called
    auth: {
      onAuthStateChange: () => ({ data: {}, error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    }
  };
}

export { supabase };