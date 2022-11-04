INSERT INTO users (id, name, user_tag, password, email)
VALUES (1, 'Bob', 'bob1234', '1111', 'abc@gmail.com'),
       (2, 'Jon', 'jon1932', '2222', 'xyz@email.com'),
       (3, 'Lily', 'lily4535', '3333', 'cap@marvel.com'),
       (4, 'Alex', 'alex123', '1111', 'alex@gmail.com'),
       (5, 'Marta', 'marta123', '1111', 'marta@gmail.com');


INSERT INTO followers (id, follower_id, followed_id)
values (1, 1, 2),
       (2, 1, 4),
       (3, 2, 1),
       (4, 3, 4),
       (5, 3, 5),
       (6, 4, 1);
