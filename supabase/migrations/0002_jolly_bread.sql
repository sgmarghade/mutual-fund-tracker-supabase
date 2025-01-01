/*
  # Add buying NAV field

  1. Changes
    - Add `buying_nav` column to `mutual_funds` table
    - Default value set to NULL to indicate no purchase price entered
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'mutual_funds' AND column_name = 'buying_nav'
  ) THEN
    ALTER TABLE mutual_funds ADD COLUMN buying_nav decimal(10,4) DEFAULT NULL;
  END IF;
END $$;