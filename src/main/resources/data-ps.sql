INSERT INTO users (id, avatar_img_url, key, name, user_tag, password, email)
VALUES (1, 'https://static.dezeen.com/uploads/2021/06/elon-musk-architect_dezeen_1704_col_0.jpg', '865234ad-6a92-11e7-8846-b05adad3f0ae', 'Bob', 'bob1234', '1111', 'abc@gmail.com'),
       (2, 'https://static.dezeen.com/uploads/2021/06/elon-musk-architect_dezeen_1704_col_0.jpg', '3fc2fb20-e743-49a9-96da-82ae6ea3c3fb', 'Jon', 'jon1932', '2222', 'xyz@email.com'),
       (3, 'https://static.dezeen.com/uploads/2021/06/elon-musk-architect_dezeen_1704_col_0.jpg', '1bb36c43-c9cc-44b9-a369-1eacf91334ad', 'Lily', 'lily4535', '3333', 'cap@marvel.com'),
       (4, 'https://static.dezeen.com/uploads/2021/06/elon-musk-architect_dezeen_1704_col_0.jpg', '1a7bfa66-9747-4e67-9098-e85dc79224a1', 'Alex', 'alex123', '1111', 'alex@gmail.com'),
       (5, 'https://static.dezeen.com/uploads/2021/06/elon-musk-architect_dezeen_1704_col_0.jpg', '22bac3b8-10eb-400b-aeea-652c8625905a', 'Marta', 'jlaien324', '1111', 'wsq@gmail.com'),
       (6, 'https://static.dezeen.com/uploads/2021/06/elon-musk-architect_dezeen_1704_col_0.jpg', 'a003b52f-a606-465b-9511-71d84018a1e6', 'Noah', 'adfafkk999', '1111', 'csdc@gmail.com'),
       (7, 'https://static.dezeen.com/uploads/2021/06/elon-musk-architect_dezeen_1704_col_0.jpg', 'a365dac1-bca4-4539-86d9-abb1462aeeed', 'Oliver', 'jwednq323', '1111', 'sde@gmail.com'),
       (8, 'https://static.dezeen.com/uploads/2021/06/elon-musk-architect_dezeen_1704_col_0.jpg', '6e05e52b-1e6f-47c3-a4dd-07f4fe6826ad', 'Amelia', 'dfkaslf994', '1111', 'vggrgv@gmail.com'),
       (9, 'https://static.dezeen.com/uploads/2021/06/elon-musk-architect_dezeen_1704_col_0.jpg', '9b8c90ac-83ff-45bb-9760-a05d1aeea848', 'Sophia', 'daslrfnk333', '1111', 'cscsd@gmail.com'),
       (10,'https://static.dezeen.com/uploads/2021/06/elon-musk-architect_dezeen_1704_col_0.jpg',  '9ee0c30a-809e-40cb-9042-a6e5d1ef37b3', 'Charlotte', 'akdlcnj99', '1111', 'ujyj@gmail.com'),
       (11,'https://static.dezeen.com/uploads/2021/06/elon-musk-architect_dezeen_1704_col_0.jpg',  '417716c5-88a1-4895-8fc1-676026b85dcc', 'Olivia', 'ewdjqlnl123', '1111', 'fgff@gmail.com'),
       (12,'https://static.dezeen.com/uploads/2021/06/elon-musk-architect_dezeen_1704_col_0.jpg',  '54a26843-9bab-4cd5-8afb-cebc533d5f2b', 'Harper', 'kiutmde44', '1111', 'csfcfcr@gmail.com'),
       (13,'https://static.dezeen.com/uploads/2021/06/elon-musk-architect_dezeen_1704_col_0.jpg',  'f969c0c6-4842-4778-b7fd-df5eb21f9caa', 'Theodore', 'fewqkimm66', '1111', 'scwxfw@gmail.com'),
       (14,'https://static.dezeen.com/uploads/2021/06/elon-musk-architect_dezeen_1704_col_0.jpg',  '7afa3c0a-06cb-4d77-b9a1-2267f5ebdd35', 'Emma', 'qweflouhr22', '1111', 'edwff@gmail.com'),
       (15,'https://static.dezeen.com/uploads/2021/06/elon-musk-architect_dezeen_1704_col_0.jpg',  '6021da07-933b-4870-97ea-c8f25e06d284', 'Liam', 'ewkdionwc00', '1111', 'exewxf@gmail.com'),
       (16,'https://static.dezeen.com/uploads/2021/06/elon-musk-architect_dezeen_1704_col_0.jpg',  'e9a18795-4db1-4983-8fe4-7c6b78e68fa3', 'Mia', 'wedwoqie0', '1111', 'rfegrtg@gmail.com');


INSERT INTO followers (follower_id, followed_id)
values (1, 2),
       (1, 4),
       (2, 1),
       (3, 4),
       (3, 5),
       (4, 1);

INSERT INTO tweets (id, key, body, tweet_type, user_id)
values (1, '4c85c829-f8c7-4505-8932-6dac1c9e01d4', 'Bob test tweet', 'TWEET', 1),
       (2, '992217dd-7c49-47a8-9a14-f4566c5d5648', 'Jon test tweet', 'TWEET', 2),
       (3, 'c9d2f623-967f-4aba-aefd-9f973c39441e', 'Lily test tweet', 'TWEET', 3),
       (4, '072983bb-fd71-4fb0-a43e-584d8f7f53ba', 'Marta tweet', 'TWEET', 4);

INSERT INTO tweet_actions (id, key, action_type, tweet_id, user_id)
values (1, 'e6b8be4a-cc42-47b9-8be4-5db08164bf30', 'LIKE', 1, 2),
       (2, 'cf6d3c40-e2a3-41d7-978e-d25f0a906d6f', 'LIKE', 1, 3),
       (3, '93d81c1b-0c98-4b23-a3f7-54a82793f929', 'BOOKMARK', 1, 4),
       (4, '0597ae45-aa82-4818-9653-6ccbd0e1e6ca', 'RETWEET', 3, 5),
       (5, 'd77a828d-2bfc-4c42-8d7d-7e345f75df12', 'BOOKMARK', 3, 2),
       (6, '234bca02-771b-4bdb-919a-32a9dd96d307', 'RETWEET', 4, 2),
       (7, '785a2e3b-a256-4b37-8ffe-ee6c4f7011f6', 'LIKE', 4, 3);

INSERT INTO notifications (id, key, is_read, notification_type, tweet_id, initiator_id, receiver_id)
values
    (1,'4b794df5-f4d2-40d9-bfb3-c97e3c910ea1', false, 'LIKE', 1, 2, 1),
    (2,'ac1e4f3c-e4a4-4712-8bd4-9dcd8a391770', false, 'LIKE', 1, 3, 1),
    (3,'32a034bf-1319-4d68-a304-89b407216d1c', false, 'REPLY', 2, 4, 2),
    (4,'53fde888-94b0-4e1f-9a30-debf5c161ca0', false, 'LIKE', 3, 2, 3),
    (5,'1fd9a3d1-2277-4e6e-98a4-fa4270a3b6dd', false, 'RETWEET', 4, 1, 4),
    (6,'d5b00f3e-e084-41d7-bf70-053e09fd3d9f', false, 'LIKE', 4, 3, 4);


INSERT INTO attachment_images (id, key, img_url, tweet_id)
values
    (1, '75606b31-ef91-4029-9e96-43937f17ae91', 'https://shorturl.at/gqSZ9', 1),
    (2, '35ecc0e9-f533-4480-9e2c-466834f31316', 'https://shorturl.at/fHQRZ', 2),
    (3, 'd200021f-b319-46dc-bb35-8cc9cbe76ed7', 'https://shorturl.at/fGHM9', 3),
    (4, '23d6a012-468f-41e2-8d9a-c3c9311560b6', 'https://shorturl.at/dhmsM', 4);

INSERT INTO chats (id, key, title)
values (1, '21744f36-8ab5-4d58-8829-7b0a976f27a8', 'test chat 1'),
       (2, '464d9bff-5d40-4550-b105-a84a78e4ce10', 'test chat 2'),
       (3, 'a0f8f2e3-8770-4fda-88a8-7d603f42e94c', 'test chat 3'),
       (4, '22253e3a-5226-4b99-8f30-97dc67f90ef9', 'test chat 4');


INSERT INTO users_chats (users_id, chats_id)
values (1, 1),
       (2, 1),
       (3, 1),
       (4, 2),
       (5, 2),
       (1, 3),
       (5, 3);

INSERT INTO messages (id, key, text, chat_id, user_id)
values
    (1, '0e4b72bc-ee31-4197-9d4c-adc0d65578ac', 'test message 1', 1, 1),
    (2, 'c804e414-1da2-42b8-a3e6-8a9f891020d4', 'test message 2', 1, 2),
    (3, '689ea033-396d-485d-adb4-15f4b643a88a', 'test message 3', 1, 1),
    (4, 'bc6759c7-0073-4a34-bc04-f009e7156349', 'test message 4', 1, 2),
    (5, 'c55c08c8-ba00-4a88-b201-8c61506ce86b', 'test message 5', 1, 3),
    (6, '56899daf-bcb7-4a3e-a409-1071d3aca331', 'test message 6', 1, 1),
    (7, '5e72fc18-8b6f-4653-86fd-083a4fcb681f', 'test message 7', 2, 5),
    (8, 'e476e9d3-7561-414b-8237-e92f89598271', 'test message 8', 2, 4),
    (9, '5f11c754-c50d-4be7-8b63-e367c89682c7', 'test message 9', 2, 5),
    (10, 'f91ad2d0-be79-44d0-8d3f-1fa22da7f978', 'test message 10', 2, 4);
ALTER TABLE ATTACHMENT_IMAGES
    ADD FOREIGN KEY (tweet_id) REFERENCES TWEETS (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE;
