# Supabase Setup for AlBuraq Products

This guide will walk you through setting up Supabase to enable permanent CRUD operations for the AlBuraq admin dashboard.

## 1. Create a Supabase Account and Project

1. Go to [Supabase](https://supabase.com/) and sign up for a free account if you don't have one already.
2. Once logged in, click on "New Project" to create a new project.
3. Fill in the project details:
   - **Name**: AlBuraq (or any name you prefer)
   - **Database Password**: Create a strong password and save it securely
   - **Region**: Choose the region closest to your users
4. Click "Create New Project" and wait for the project to be created (this may take a few minutes).

## 2. Set Up the Products Table

1. In your Supabase project dashboard, navigate to the "Table Editor" in the left sidebar.
2. Click "New Table" to create a new table with the following settings:
   - **Name**: products
   - **Enable Row Level Security (RLS)**: Yes (we'll configure policies later)
   - **Columns**:
     - `id` (type: text, primary key)
     - `name` (type: text, not null)
     - `category` (type: text, not null)
     - `description` (type: text, not null)
     - `image` (type: text, not null)
     - `features` (type: json, not null)
     - `images` (type: json)
   - Click "Save" to create the table

## 3. Configure Environment Variables

1. In your Supabase project dashboard, go to "Settings" (gear icon) in the left sidebar, then "API".
2. You'll find your project URL and anon/public key. Copy these values.
3. Update the `.env` file in your project root with these values:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 4. Set Up Row Level Security (RLS) Policies

To secure your data, you should set up RLS policies:

1. In your Supabase project dashboard, go to "Authentication" > "Policies".
2. Find your "products" table and click "New Policy".
3. For a simple setup, you can create the following policies:

### Read Policy (for all users)

- **Policy Name**: Allow reads for all
- **Policy Definition**: Using the policy wizard, select "Enable read access for all users"

### Write Policies (for authenticated users only)

For a more secure setup, you should create policies that only allow authenticated users to modify data. However, since we're using a simplified authentication approach in this project, you can use the following policy for now:

- **Policy Name**: Allow full access for all users
- **Policy Definition**: Using the policy wizard, select "Enable insert, update, delete for all users"

**Note**: In a production environment, you would want to create more restrictive policies based on user roles and authentication.

## 5. Testing Your Setup

1. Restart your development server
2. Log in to the admin dashboard
3. Try adding, editing, and deleting products
4. Verify that the changes persist even after refreshing the page or restarting the server
5. You can also check the Supabase Table Editor to see the data being stored

## Troubleshooting

- If you encounter CORS errors, make sure your Supabase project has the correct URL settings in Project Settings > API > CORS.
- If data isn't being saved, check the browser console for error messages and verify your Supabase credentials.
- If you need to reset your data, you can use the "Clear Products Data" function in the admin dashboard, or manually truncate the table in Supabase.

## Next Steps

For a more robust implementation, consider:

1. Implementing proper authentication with Supabase Auth
2. Setting up more granular RLS policies
3. Adding image uploads to Supabase Storage
4. Implementing real-time updates with Supabase Realtime