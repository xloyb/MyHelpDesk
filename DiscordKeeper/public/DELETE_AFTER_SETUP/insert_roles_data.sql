-- insert_roles_data.sql

INSERT INTO Role (name, description) VALUES ('Client', 'Client role, regular user');
INSERT INTO Role (name, description) VALUES ('Support', 'Support role, support only, NO DEALS');
INSERT INTO Role (name, description) VALUES ('Mod', 'Moderator role, moderation duties');
INSERT INTO Role (name, description) VALUES ('Admin', 'Administrator role, full access');

INSERT INTO user (id, email, avatar, cover, name, userid, roleId) VALUES
('user_2kHN1lJ3j7KO2jDsVksym31QhoG', 'contactxloy@gmail.com', 'https://images.clerk.dev/oauth_google/img_2kHN1lJ3j7KO2jDsVksym31QhoG', '/img/noCover.png', 'xloy', NULL, 4);

INSERT INTO user (id, email, avatar, cover, name, userid, roleId) VALUES 
('user_2kHNEANVluU3lEr7KsHABBTrwMH', 'louayeverywhere@gmail.com', 'https://www.gravatar.com/avatar?d=mp', '/img/noCover.png', 'louay', NULL, 1);
