-- insert_roles_data.sql

INSERT INTO Role (name, description) VALUES ('Client', 'Client role, regular user');
INSERT INTO Role (name, description) VALUES ('Support', 'Support role, support only, NO DEALS');
INSERT INTO Role (name, description) VALUES ('Mod', 'Moderator role, moderation duties');
INSERT INTO Role (name, description) VALUES ('Admin', 'Administrator role, full access');

INSERT INTO user (id, email, avatar, cover, name, userid, roleId) VALUES
('user_2kHN1lJ3j7KO2jDsVksym31QhoG', 'contactxloy@gmail.com', 'https://images.clerk.dev/oauth_google/img_2kHN1lJ3j7KO2jDsVksym31QhoG', '/img/noCover.png', 'xloy', NULL, 4);

INSERT INTO user (id, email, avatar, cover, name, userid, roleId) VALUES 
('user_2kHNEANVluU3lEr7KsHABBTrwMH', 'louayeverywhere@gmail.com', 'https://www.gravatar.com/avatar?d=mp', '/img/noCover.png', 'louay', NULL, 1);

INSERT INTO user (id, email, avatar, cover, name, userid, roleId) VALUES 
('xLoy_BOT_AmrVYJiRO2kd', 'services@mydevify.com', 'https://www.mydevify.com/assets/index.494ac568.png', '/img/noCover.png', 'Support (Bot)', NULL, 1);


INSERT INTO Settings (
  sitename, 
  announcement, 
  offer, 
  logo, 
  theme, 
  discordLogs
) VALUES (
  'MyHelpDesk', 
  'We Love Cats', 
  'Special offer available!', 
  'https://mydevify.com/assets/xLoyMybb.5944be68.png', 
  'dark', 
  false
);




-- Insert a new category with a specific ID
INSERT INTO Category (id, name) 
VALUES (1, 'Cat1');




INSERT INTO Service (
  image, 
  title, 
  description, 
  price,
  categoryId,
  amount,
  buyOrSellType
) VALUES 
  ('https://i.imgur.com/r8Csusj.jpeg', 'Service 1', 'Description of Service 1', 10.99, 1, 50, 'buy'),
  ('https://i.imgur.com/r8Csusj.jpeg', 'Service 2', 'Description of Service 2', 20.99, 1, 30, 'sell'),
  ('https://i.imgur.com/r8Csusj.jpeg', 'Example Service 1', 'Example Description 1', 12.00, 1, 40, 'buy'),
  ('https://i.imgur.com/r8Csusj.jpeg', 'Example Service 2', 'Example Description 2', 15.00, 1, 25, 'sell'),
  ('https://i.imgur.com/r8Csusj.jpeg', 'Example Service 3', 'Example Description 3', 18.00, 1, 35, 'buy'),
  ('https://i.imgur.com/r8Csusj.jpeg', 'Example Service 4', 'Example Description 4', 22.00, 1, 20, 'sell');

