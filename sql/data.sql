DROP TABLE agenda; DROP TABLE note; DROP TABLE person;

CREATE TABLE person(
    id              SERIAL          PRIMARY KEY,
    username        VARCHAR(50)     UNIQUE          NOT NULL,
    password        VARCHAR(100)                    NOT NULL
);

CREATE TABLE note(
    id              SERIAL          PRIMARY KEY,
    person_id       INT             REFERENCES person(id),
    title           VARCHAR(100),
    creationDate    DATE,
    content         VARCHAR(10000)
);

CREATE TABLE agenda(
    id              SERIAL          PRIMARY KEY,
    note_id         INT             REFERENCES note(id),
    item            VARCHAR(200)
);


CREATE USER tony WITH PASSWORD 'super3005';
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO tony;
GRANT USAGE , SELECT ON ALL SEQUENCES IN SCHEMA public TO tony;
