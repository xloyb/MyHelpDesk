
```
DiscordKeeper
├─ DiscordKeeper
│  ├─ .env
│  ├─ .eslintrc.json
│  ├─ commands
│  │  ├─ help.ts
│  │  ├─ ping.ts
│  │  ├─ setup.ts
│  │  ├─ t.ts
│  │  └─ test.ts
│  ├─ config.ts
│  ├─ next-env.d.ts
│  ├─ next.config.mjs
│  ├─ note.txt
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ postcss.config.mjs
│  ├─ prisma
│  │  ├─ migrations
│  │  │  ├─ 20240718154802_test
│  │  │  │  └─ migration.sql
│  │  │  └─ migration_lock.toml
│  │  └─ schema.prisma
│  ├─ public
│  │  ├─ data
│  │  │  └─ settings.json
│  │  ├─ DELETE_AFTER_SETUP
│  │  │  └─ insert_roles_data.sql
│  │  └─ img
│  │     ├─ accept.png
│  │     ├─ activity.png
│  │     ├─ addevent.png
│  │     ├─ addimage.png
│  │     ├─ addVideo.png
│  │     ├─ albums.png
│  │     ├─ comment.png
│  │     ├─ courses.png
│  │     ├─ date.png
│  │     ├─ emoji.png
│  │     ├─ events.png
│  │     ├─ friends.png
│  │     ├─ gift.png
│  │     ├─ groups.png
│  │     ├─ home.png
│  │     ├─ like.png
│  │     ├─ liked.png
│  │     ├─ link.png
│  │     ├─ lists.png
│  │     ├─ login.png
│  │     ├─ map.png
│  │     ├─ market.png
│  │     ├─ messages.png
│  │     ├─ more.png
│  │     ├─ news.png
│  │     ├─ noAvatar.png
│  │     ├─ notifications.png
│  │     ├─ people.png
│  │     ├─ poll.png
│  │     ├─ posts.png
│  │     ├─ reject.png
│  │     ├─ school.png
│  │     ├─ search.png
│  │     ├─ settings.png
│  │     ├─ share.png
│  │     ├─ stories.png
│  │     ├─ videos.png
│  │     └─ work.png
│  ├─ socket-server.js
│  ├─ src
│  │  ├─ app
│  │  │  ├─ admincp
│  │  │  │  ├─ discord
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ page.tsx
│  │  │  │  ├─ roles
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ settings
│  │  │  │  │  └─ page.tsx
│  │  │  │  └─ users
│  │  │  │     └─ page.tsx
│  │  │  ├─ api
│  │  │  │  ├─ comments
│  │  │  │  │  └─ route.ts
│  │  │  │  ├─ discord-bot
│  │  │  │  │  └─ interaction
│  │  │  │  │     └─ route.ts
│  │  │  │  └─ save-settings
│  │  │  │     └─ route.ts
│  │  │  ├─ c
│  │  │  │  ├─ crypto
│  │  │  │  │  ├─ page.tsx
│  │  │  │  │  └─ [id]
│  │  │  │  │     └─ page.tsx
│  │  │  │  ├─ page.tsx
│  │  │  │  └─ [token]
│  │  │  │     ├─ ClientChatPage.tsx
│  │  │  │     └─ page.tsx
│  │  │  ├─ chat
│  │  │  │  ├─ page.tsx
│  │  │  │  └─ [token]
│  │  │  │     └─ page.tsx
│  │  │  ├─ chatt
│  │  │  │  ├─ test_page.tsx
│  │  │  │  └─ [ticketId]
│  │  │  ├─ crypto
│  │  │  │  ├─ page.tsx
│  │  │  │  └─ [id]
│  │  │  │     └─ page.tsx
│  │  │  ├─ globals.css
│  │  │  ├─ icon.png
│  │  │  ├─ layout.tsx
│  │  │  ├─ main.module.css
│  │  │  ├─ modcp
│  │  │  │  └─ page.tsx
│  │  │  ├─ page.tsx
│  │  │  ├─ sign-in
│  │  │  │  └─ [[...sign-in]]
│  │  │  │     └─ page.tsx
│  │  │  └─ sign-up
│  │  │     └─ [[...sign-up]]
│  │  │        └─ page.tsx
│  │  ├─ components
│  │  │  ├─ admincp
│  │  │  │  └─ Discord_info.tsx
│  │  │  ├─ Announcement.tsx
│  │  │  ├─ Chat.tsx
│  │  │  ├─ ChatNavbar.tsx
│  │  │  ├─ CryptoList.tsx
│  │  │  ├─ CustomPages
│  │  │  │  ├─ 403.tsx
│  │  │  │  └─ 404.tsx
│  │  │  ├─ DownloadChat.tsx
│  │  │  ├─ Footer.tsx
│  │  │  ├─ index
│  │  │  │  ├─ Hero.tsx
│  │  │  │  ├─ IndexNav.tsx
│  │  │  │  ├─ Rectangular.tsx
│  │  │  │  └─ Services.tsx
│  │  │  ├─ mod
│  │  │  │  ├─ BanModal.tsx
│  │  │  │  └─ stats.tsx
│  │  │  ├─ MyChat.tsx
│  │  │  ├─ newticket.tsx
│  │  │  ├─ RolesTable.tsx
│  │  │  ├─ Settings.tsx
│  │  │  ├─ ShareTicketLink.tsx
│  │  │  ├─ Sidebar.tsx
│  │  │  ├─ ThemeToggle.tsx
│  │  │  ├─ TicketsTable.tsx
│  │  │  ├─ TicketStatusModal.tsx
│  │  │  ├─ User
│  │  │  │  └─ UserStats.tsx
│  │  │  ├─ UsersTable.tsx
│  │  │  ├─ VouchesTable.tsx
│  │  │  ├─ VouchModal.tsx
│  │  │  └─ WebSocketChat
│  │  │     └─ MyRealTimeChat.tsx
│  │  ├─ context.js
│  │  ├─ lib
│  │  │  ├─ actions.ts
│  │  │  ├─ ban.ts
│  │  │  ├─ client.ts
│  │  │  ├─ data.ts
│  │  │  ├─ role.ts
│  │  │  ├─ ticket.ts
│  │  │  ├─ user.ts
│  │  │  ├─ verify-token.ts
│  │  │  ├─ vouch.ts
│  │  │  └─ websocket-server.ts
│  │  ├─ middleware.ts
│  │  └─ pages
│  │     └─ _app.tsx
│  ├─ tailwind.config.ts
│  ├─ tsconfig.json
│  ├─ types
│  │  └─ index.ts
│  └─ utils
│     ├─ body-parser.ts
│     ├─ check-method.ts
│     ├─ discord-api.ts
│     ├─ getCommands.ts
│     ├─ getTsFiles.ts
│     ├─ sendAllVouchesToDiscord.ts
│     ├─ sendDiscordMessage.ts
│     ├─ sendTicketNotification.ts
│     ├─ sendVouchNotification.ts
│     ├─ ticketSetup.ts
│     └─ verify-discord-request.ts
└─ README.md

```