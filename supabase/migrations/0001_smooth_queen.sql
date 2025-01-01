/*
  # Create mutual funds tracking tables

  1. New Tables
    - `mutual_funds`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `scheme_code` (text, unique per user)
      - `scheme_name` (text)
      - `nav` (decimal)
      - `peak_nav` (decimal)
      - `last_updated` (timestamp)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `mutual_funds` table
    - Add policies for authenticated users to manage their own data
*/

CREATE TABLE mutual_funds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  scheme_code text NOT NULL,
  scheme_name text NOT NULL,
  nav decimal(10,4) DEFAULT 0,
  peak_nav decimal(10,4) DEFAULT 0,
  last_updated timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, scheme_code)
);

ALTER TABLE mutual_funds ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own mutual funds"
  ON mutual_funds
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);