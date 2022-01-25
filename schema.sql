CREATE TABLE Episode (
  episode INT PRIMARY KEY NOT NULL,
  url TEXT,
  rawSent INT,
  subbedSent INT);

INSERT INTO Episode (episode, url, rawSent, subbedSent) VALUES (40, "http://watchshamanking.com/shaman-king-2021-episode-40-subbed", 1, 1);
