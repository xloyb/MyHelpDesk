

---

# **MyHelpDesk - Open Source HelpDesk & Management System**

**MyHelpDesk** is a multipurpose platform designed to streamline customer support with an integrated ticket management system, live chat, crypto exchange, and a built-in store. It offers extensive role-based functionalities for administrators, moderators, and users, enabling seamless management of support tickets, real-time communication, and more.

## Showcase
  
| ![Image 1](https://github.com/mydevify/MyHelpDesk/blob/main/public/showcase/Home_Dark.PNG?raw=true) | ![Image 2](https://github.com/mydevify/MyHelpDesk/blob/main/public/showcase/Home_Light.PNG?raw=true) |
|-------------------------|-------------------------|
| ![Image 3](https://github.com/mydevify/MyHelpDesk/blob/main/public/showcase/Ticket_Drak.PNG?raw=true)| ![Image 4](https://github.com/mydevify/MyHelpDesk/blob/main/public/showcase/Ticket_Light.PNG?raw=true) |
| ![Image 5](https://github.com/mydevify/MyHelpDesk/blob/main/public/showcase/c_Dark.PNG?raw=true)| ![Image 6](https://github.com/mydevify/MyHelpDesk/blob/main/public/showcase/c_Light.PNG?raw=true) |
| ![Image 7](https://github.com/mydevify/MyHelpDesk/blob/main/public/showcase/Store_Dark.PNG?raw=true)| ![Image 8](https://github.com/mydevify/MyHelpDesk/blob/main/public/showcase/Store_Light.PNG.PNG?raw=true) |
| ![Image 9](https://github.com/mydevify/MyHelpDesk/blob/main/public/showcase/ACP_Dark.PNG?raw=true)| ![Image 10](https://github.com/mydevify/MyHelpDesk/blob/main/public/showcase/ACP_Light.PNG?raw=true) |

---

## Features

### 1. **Ticket Management System**
- **Create, View, and Manage Tickets:** Users can submit and track support requests.
- **Ticket Status Updates:** Set ticket status as "Open," "Pending," or "Closed."
- **Download Chat History:** Export conversation logs in JSON format.
- **Internal Notes:** Support staff can add notes visible only to team members.
- **User Management:** Ban or unban users based on behavior.
- **Crypto Transactions:** Verify and track cryptocurrency transaction IDs directly within tickets.

### 2. **Real-Time Chat System**
- **WebSocket-based Chat:** Enables real-time, two-way communication between users and support staff.
- **Dynamic Ticket Updates:** Changes are reflected instantly on the user interface.
- **Discord Integration:** Receive real-time notifications on Discord for ticket creation and reviews.

### 3. **Built-in Store**
- **Service Categories:** Add, edit, or remove services and service categories.
- **Country-Specific Payment Restrictions:** Block or allow cryptocurrency payments based on user location.
- **Shoppy.gg Integration:** Payment processing via credit cards, PayPal, and cryptocurrencies.

### 4. **Crypto Exchange System**
- **Real-Time Price Updates:** View live cryptocurrency prices while managing exchanges.
- **Transaction Verifier:** Built-in verification system for crypto transactions.
- **Automated Process:** Streamlined ticket management for faster, more secure crypto transactions.

### 5. **Role-Based Panel Access**
- **Client Panel:** Submit tickets, track status, and download chat history.
- **Support Panel:** Manage tickets, view customer inquiries, and add internal notes.
- **Moderator Panel:** Manage user bans, tickets, and roles.
- **Admin Panel:** Full control over platform settings, store management, and role assignment.

## Technology Stack
- **Frontend:**
  - Next.js (v15 RC) with React for server-side rendering
  - DaisyUI and Tailwind CSS for styling
- **Backend:**
  - Prisma for database management (MySQL)
  - Clerk for user authentication and session management
  - WebSockets for real-time chat
  - Integration with Discord API for real-time alerts
- **Deployment:**
  - Vercel for hosting and deployment
  - CyberPanel for managing remote database access
  - Cloudflare for DNS and domain configuration

## Getting Started

### Prerequisites
- Node.js (>=16)
- MySQL database
- Prisma installed globally for database migrations
- Vercel account for deployment

### Installation
1. **Clone the Repository**
   ```bash
   git clone https://github.com/mydevify/MyHelpDesk.git
   cd MyHelpDesk
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Create a `.env` file and populate it with your credentials:
     - **Clerk API Keys** for authentication.
     - **Database credentials** for Prisma to manage MySQL.
   - Example `.env`:
     ```
     NEXT_PUBLIC_CLERK_FRONTEND_API=<Your Frontend API Key>
     CLERK_API_KEY=<Your Backend API Key>
     DATABASE_URL=mysql://<username>:<password>@<host>/<database_name>
     ```

4. **Database Setup**
   - Run the following command to set up the Prisma database:
     ```bash
     npx prisma migrate deploy
     npx prisma generate
     
     ```

Navigate to `public/DELETE_AFTER_SETUP/Insert_Tables_Info.sql`. Inside, you'll find the necessary data to populate your database, including role names, country names with their respective short codes, and bot account information. 

The bot account is used by the system to send an automated message when a user opens a ticket for the first time.

    To complete the setup:
    1. Copy the contents of this file.
    2. Paste it into the SQL terminal in phpMyAdmin.
    3. Execute the script, and you're all set!
---

5. **Run the Development Server**
   ```bash
   npm run dev
   ```

   Access the app at [http://localhost:3000](http://localhost:3000).

### Deployment
The project is optimized for deployment on **Vercel**. Follow these steps:
1. Connect your GitHub repository to Vercel.
2. Import your environment variables into Vercel settings.
3. Deploy the app by triggering a build with the command:
   ```bash
   npm run build
   ```

## Usage
Once deployed, users can:
- **Submit tickets** for support.
- **Engage in real-time chat** with support staff.
- **Make purchases** through the built-in store.
- **Track cryptocurrency exchanges** via a dedicated dashboard.

Admins can manage services, review tickets, control user access, and customize the platform based on their business needs.

## Contribution
Contributions are welcome! Please submit a pull request or open an issue if you'd like to contribute to the project.

## License
This project is open-source and available under the MIT License.

---

