DROP TABLE IF EXISTS db_health CASCADE;

CREATE TABLE db_health (
  service_name TEXT PRIMARY KEY,
  status TEXT NOT NULL CHECK (status IN ('healthy', 'degraded', 'down'))
);

INSERT INTO db_health (service_name, status)
VALUES ('database', 'healthy');