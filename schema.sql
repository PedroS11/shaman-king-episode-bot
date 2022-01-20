CREATE TABLE Episode (
  episode INT PRIMARY KEY NOT NULL,
  url TEXT,
  rawSent INT,
  subbedSent INT);

INSERT INTO Episode (episode, url, rawSent, subbedSent) VALUES (38, "http://watchshamanking.com/shaman-king-2021-episode-38-subbed", 1, 1);
INSERT INTO Episode (episode, url, rawSent, subbedSent) VALUES (39, "http://watchshamanking.com/shaman-king-2021-episode-39-subbed", 0, 0);
