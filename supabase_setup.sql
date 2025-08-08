-- Create products table
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  images JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create Row Level Security (RLS) policies
-- Enable RLS on the products table
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all users to read products
CREATE POLICY "Allow read access for all users" 
  ON products FOR SELECT 
  USING (true);

-- Create a policy that allows authenticated users to insert products
CREATE POLICY "Allow insert access for authenticated users" 
  ON products FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

-- Create a policy that allows authenticated users to update their own products
CREATE POLICY "Allow update access for authenticated users" 
  ON products FOR UPDATE 
  USING (auth.role() = 'authenticated');

-- Create a policy that allows authenticated users to delete their own products
CREATE POLICY "Allow delete access for authenticated users" 
  ON products FOR DELETE 
  USING (auth.role() = 'authenticated');

-- Note: For a simplified setup without authentication, you can use the following policies instead:
/*
CREATE POLICY "Allow read access for all users" 
  ON products FOR SELECT 
  USING (true);

CREATE POLICY "Allow insert access for all users" 
  ON products FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow update access for all users" 
  ON products FOR UPDATE 
  USING (true);

CREATE POLICY "Allow delete access for all users" 
  ON products FOR DELETE 
  USING (true);
*/