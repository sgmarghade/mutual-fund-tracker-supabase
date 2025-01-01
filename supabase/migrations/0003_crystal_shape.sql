/*
  # Update mutual fund fields

  1. Changes
    - Rename buying_nav to last_buying_nav
    - Add avg_buying_nav and total_units columns
  
  2. Data Migration
    - Copy existing buying_nav values to last_buying_nav
*/

-- Rename buying_nav to last_buying_nav
ALTER TABLE mutual_funds 
  RENAME COLUMN buying_nav TO last_buying_nav;

-- Add new columns
ALTER TABLE mutual_funds
  ADD COLUMN avg_buying_nav decimal(10,4) DEFAULT NULL,
  ADD COLUMN total_units decimal(10,4) DEFAULT NULL;