INSERT INTO person (username, password) VALUES ('tester', 'password1');

INSERT INTO note (person_id, title, creationDate, content) VALUES
((SELECT id FROM person WHERE username = 'tester'),
'Sunday June 25',
CURRENT_DATE,
'Alright were doing alot of things this week.');

INSERT INTO note (person_id, title, creationDate, content) VALUES
((SELECT id FROM person WHERE username = 'tester'),
'Sunday June 24',
CURRENT_DATE,
'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.');
