DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  email CITEXT NOT NULL UNIQUE,
  username TEXT NOT NULL UNIQUE,

  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,

  password_hash TEXT NOT NULL
    CHECK (char_length(trim(password_hash)) > 0),

  role user_role NOT NULL DEFAULT 'user',

  phone TEXT,
  country TEXT,
  city TEXT,
  date_of_birth DATE,
  address TEXT,
  avatar_url TEXT,

  email_verified BOOLEAN NOT NULL DEFAULT FALSE,
  phone_verified BOOLEAN NOT NULL DEFAULT FALSE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT users_username_length_check
    CHECK (char_length(trim(username)) BETWEEN 3 AND 30),

  CONSTRAINT users_username_trim_check
    CHECK (username = trim(username)),

  CONSTRAINT users_dob_check
    CHECK (date_of_birth IS NULL OR date_of_birth <= CURRENT_DATE)
);