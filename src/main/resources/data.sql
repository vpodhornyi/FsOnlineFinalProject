INSERT INTO users (id, name, user_tag, password, email)
VALUES (1, 'Bob', 'bob1234', '1111', 'abc@gmail.com'),
       (2, 'Jon', 'jon1932', '2222', 'xyz@email.com'),
       (3, 'Lily', 'lily4535', '3333', 'cap@marvel.com'),
       (4, 'Alex', 'alex123', '1111', 'alex@gmail.com'),
       (5, 'Marta', 'marta123', '1111', 'marta@gmail.com');


INSERT INTO followers (follower_id, followed_id)
values (1, 2),
       (1, 4),
       (2, 1),
       (3, 4),
       (3, 5),
       (4, 1);

INSERT INTO tweets ( body, tweet_type, user_id)
values ('Bob test tweet', 'TWEET', 1),
       ( 'Jon test tweet', 'TWEET', 2),
       ( 'Lily test tweet', 'TWEET', 3),
       ( 'Marta tweet', 'TWEET', 4);

INSERT INTO tweet_actions (id, action_type, tweet_id, user_id)
values (1, 'LIKE', 1, 2),
       (2, 'LIKE', 1, 3),
       (3, 'BOOKMARK', 1, 4),
       (4, 'RETWEET', 3, 5),
       (5, 'BOOKMARK', 3, 2),
       (6, 'RETWEET', 4, 2),
       (7, 'LIKE', 4, 3);

INSERT INTO notifications (id, is_read, notification_type, tweet_id, initiator_id, receiver_id)
values
    (1, false, 'LIKE', 1, 2, 1),
    (2, false, 'LIKE', 1, 3, 1),
    (3, false, 'REPLY', 2, 4, 2),
    (4, false, 'LIKE', 3, 2, 3),
    (5, false, 'RETWEET', 4, 1, 4),
    (6, false, 'LIKE', 4, 3, 4);


INSERT INTO attachment_images (id, img_url, tweet_id)
values
    (1, 'https://shorturl.at/gqSZ9', 1),
    (2, 'https://shorturl.at/fHQRZ', 2),
    (3, 'https://shorturl.at/fGHM9', 3),
    (4, 'https://shorturl.at/dhmsM', 4);

INSERT INTO chats (id, title)
values (1, 'test chat 1'),
       (2, 'test chat 2');


INSERT INTO users_chats (user_id, chats_id)
values (1, 1),
       (2, 1),
       (3, 1),
       (4, 2),
       (5, 2);

INSERT INTO messages (id, text, chat_id, user_id)
values
    (1, 'test message 1', 1, 1),
    (2, 'test message 2', 1, 2),
    (3, 'test message 3', 1, 1),
    (4, 'test message 4', 1, 2),
    (5, 'test message 5', 1, 3),
    (6, 'test message 6', 1, 1),
    (7, 'test message 7', 2, 5),
    (8, 'test message 8', 2, 4),
    (9, 'test message 9', 2, 5),
    (10, 'test message 10', 2, 4);
ALTER TABLE ATTACHMENT_IMAGES
    ADD FOREIGN KEY (tweet_id) REFERENCES TWEETS (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE;