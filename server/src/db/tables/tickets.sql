DROP TABLE IF EXISTS tickets CASCADE;
DROP TYPE IF EXISTS ticket_status CASCADE;

CREATE TYPE ticket_status AS ENUM (
  'open',
  'assigned',
  'resolved',
  'closed'
);

CREATE TABLE tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  created_by_user_id UUID NOT NULL
    REFERENCES users(id)
    ON DELETE CASCADE,

  assigned_agent_id UUID
    REFERENCES users(id)
    ON DELETE SET NULL,

  subject TEXT,
  description TEXT NOT NULL,

  status ticket_status NOT NULL DEFAULT 'open',

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  resolved_at TIMESTAMPTZ,
  closed_at TIMESTAMPTZ,

  CONSTRAINT tickets_subject_trim_check
    CHECK (subject IS NULL OR subject = trim(subject)),

  CONSTRAINT tickets_description_not_empty_check
    CHECK (char_length(trim(description)) > 0)
);

CREATE INDEX tickets_created_by_user_id_idx
  ON tickets(created_by_user_id);

CREATE INDEX tickets_assigned_agent_id_idx
  ON tickets(assigned_agent_id);

CREATE INDEX tickets_status_idx
  ON tickets(status);

CREATE INDEX tickets_created_at_idx
  ON tickets(created_at DESC);