CREATE DATABASE songs;

CREATE TABLE songs (
  songs_id SERIAL PRIMARY KEY,
  era VARCHAR(100),
  name VARCHAR(100),
  notes VARCHAR(200),
  date_leaked DATE,
  type VARCHAR(100),
  currently_available VARCHAR(20),
  is_circulating VARCHAR(20),
  links VARCHAR(200)
);

COPY songs FROM '/Users/saul/Downloads/finalsjuice.csv' DELIMITER ',' CSV HEADER;
