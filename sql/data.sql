DROP TABLE person_event; DROP TABLE event; DROP TABLE agenda; DROP TABLE note; DROP TABLE person;

CREATE TABLE person(
    id              SERIAL          PRIMARY KEY,
    username        VARCHAR(50)     UNIQUE,
    password        VARCHAR(100)
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

CREATE TABLE event(
    id              SERIAL          PRIMARY KEY,
    eventDate       DATE,
    startTime       TIME,
    eventName       VARCHAR(150)
);

CREATE TABLE person_event(
    id              SERIAL          PRIMARY KEY,
    user_id         INT             REFERENCES person(id),
    event_id        INT             REFERENCES event(id)
);

CREATE USER tony WITH PASSWORD 'super3005';
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO tony;
GRANT USAGE , SELECT ON ALL SEQUENCES IN SCHEMA public TO tony;
