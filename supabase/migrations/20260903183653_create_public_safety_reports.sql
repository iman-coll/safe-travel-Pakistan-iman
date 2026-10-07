/*
# Create community safety reports

1. New Tables
- `safety_reports` stores community-submitted observations that help travelers understand local conditions.
- `id` unique report identifier.
- `area` city, road, or neighborhood name.
- `category` incident category such as security, road, or weather.
- `severity` low, medium, or high.
- `description` plain-language report details.
- `status` moderation state, defaulting to pending.
- `created_at` submission timestamp.

2. Security
- Row level security is enabled.
- Anonymous and signed-in visitors can read reports and submit new reports because this is intentionally shared community safety data.
- Updates and deletes are limited to signed-in users for future moderation workflows.

3. Important Notes
- Reports are advisory and should be independently verified before action.
- This is a single-tenant public safety board with no account requirement in the first release.
*/

CREATE TABLE IF NOT EXISTS public.safety_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  area text NOT NULL,
  category text NOT NULL,
  severity text NOT NULL DEFAULT 'medium',
  description text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.safety_reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read safety reports" ON public.safety_reports;
CREATE POLICY "Public can read safety reports"
  ON public.safety_reports FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Public can submit safety reports" ON public.safety_reports;
CREATE POLICY "Public can submit safety reports"
  ON public.safety_reports FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Signed in users can update safety reports" ON public.safety_reports;
CREATE POLICY "Signed in users can update safety reports"
  ON public.safety_reports FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Signed in users can delete safety reports" ON public.safety_reports;
CREATE POLICY "Signed in users can delete safety reports"
  ON public.safety_reports FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS safety_reports_area_idx ON public.safety_reports (area);
CREATE INDEX IF NOT EXISTS safety_reports_created_at_idx ON public.safety_reports (created_at DESC);
