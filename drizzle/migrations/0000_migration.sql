CREATE TABLE public.form_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  form_type text NOT NULL CHECK (form_type IN ('contact','reservation','newsletter')),
  submission_key uuid NOT NULL UNIQUE,
  name text,
  email text NOT NULL,
  phone text,
  subject text,
  message text,
  reservation_date date,
  guests integer,
  email_status text NOT NULL DEFAULT 'pending',
  email_error text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.form_submissions TO service_role;
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;
CREATE INDEX form_submissions_email_created_idx ON public.form_submissions (email, form_type, created_at DESC);