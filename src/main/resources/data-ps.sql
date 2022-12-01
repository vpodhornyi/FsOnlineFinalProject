INSERT INTO users (id, name, user_tag, password, email)
VALUES (1, 'Bob', 'bob1234', '1111', 'abc@gmail.com'),
       (2, 'Jon', 'jon1932', '2222', 'xyz@email.com'),
       (3, 'Lily', 'lily4535', '3333', 'cap@marvel.com'),
       (4, 'Alex', 'alex123', '1111', 'alex@gmail.com'),
       (5, 'Marta', 'jlaien324', '1111', 'wsq@gmail.com'),
       (6, 'Marta', 'adfafkk999', '1111', 'csdc@gmail.com'),
       (7, 'Marta', 'jwednq323', '1111', 'sde@gmail.com'),
       (8, 'Marta', 'dfkaslf994', '1111', 'vggrgv@gmail.com'),
       (9, 'Marta', 'daslrfnk333', '1111', 'cscsd@gmail.com'),
       (10, 'Marta', 'akdlcnj99', '1111', 'ujyj@gmail.com'),
       (11, 'Marta', 'ewdjqlnl123', '1111', 'fgff@gmail.com'),
       (12, 'Marta', 'kiutmde44', '1111', 'csfcfcr@gmail.com'),
       (13, 'Marta', 'fewqkimm66', '1111', 'scwxfw@gmail.com'),
       (14, 'Marta', 'qweflouhr22', '1111', 'edwff@gmail.com'),
       (15, 'Marta', 'ewkdionwc00', '1111', 'exewxf@gmail.com'),
       (16, 'Marta', 'wedwoqie0', '1111', 'rfegrtg@gmail.com');


INSERT INTO followers (follower_id, followed_id)
values (1, 2),
       (1, 4),
       (2, 1),
       (3, 4),
       (3, 5),
       (4, 1);

INSERT INTO tweets ( body, tweet_type, user_id)
values ( 'Bob test tweet', 'TWEET', 1),
       ( 'Jon test tweet', 'TWEET', 2),
       ( 'Lily test tweet', 'TWEET', 3),
       ('Marta tweet', 'TWEET', 4);

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


INSERT INTO users_chats (users_id, chats_id)
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