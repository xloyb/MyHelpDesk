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


-- Insert Services
INSERT INTO Service (
  image, 
  title, 
  description, 
  price
) VALUES 
  ('https://i.imgur.com/r8Csusj.jpeg', 'Service 1', 'Description of Service 1', 10.99),
  ('https://i.imgur.com/r8Csusj.jpeg', 'Service 2', 'Description of Service 2', 20.99),
  ('https://i.imgur.com/r8Csusj.jpeg', 'Example Service', 'Example Description', 12.00),
  ('https://i.imgur.com/r8Csusj.jpeg', 'Example Service', 'Example Description', 12.00),
  ('https://i.imgur.com/r8Csusj.jpeg', 'Example Service', 'Example Description', 10.00),
  ('https://i.imgur.com/r8Csusj.jpeg', 'Example Service', 'Example Description', 12.00);
