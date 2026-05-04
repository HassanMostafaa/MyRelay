\echo 'Running database schema...'

\i src/db/extensions.sql
\i src/db/utils/types/user-role.sql
\i src/db/utils/types/set-updated-at.sql
\i src/db/tables/users.sql
\i src/db/tables/tickets.sql
\i src/db/tables/health.sql

\echo 'Database schema finished.'bun db:seed