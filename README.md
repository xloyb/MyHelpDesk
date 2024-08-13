
---

### **MyHelpDesk: Your Private and Secure Support  - V1.0 Stable**

**Description**: Originally known as DiscordKeeper, MyHelpDesk has grown into a comprehensive ticketing system that seamlessly integrates with Discord and other platforms like Telegram. It offers server administrators and moderators a robust solution for managing support requests, user roles, and server settings, all while emphasizing privacy and security. Additionally, MyHelpDesk features an integrated store, allowing users to **access all necessary tools and functionalities in one place**..

---

### **Technologies Used**

- **Next.js 15.0.0-rc.0 (turbo)**: Framework for building the server-rendered React application.
- **TypeScript**: Provides static type definitions for better development experience and code safety.
- **DaisyUI**: Tailwind CSS component library used for frontend styling.
- **Clerk Authentication**: Manages user sign-ups, sign-ins, and sessions.

---

### **Key Features**

1. **Built in Store**:
  - Add and manage services directly within the application.
  - Services are displayed on the index page for easy access and visibility.

2. **Ticket Management**:
   - *Create, View, and Manage Support Tickets*: Easily handle support requests with a user-friendly interface.
   - *Add Reviews*: Allow users to leave feedback on resolved tickets.
   - *Update Ticket Status*: Change the status of tickets to keep track of progress and resolutions.
   - *Download Chat History*: Export the entire chat history in JSON format for record-keeping and review.
   - *Check Crypto Transactions*: Verify and track crypto transaction IDs directly from the ticketing system.
   - *Add Notes for Staff*: Provide internal notes on tickets visible only to support staff.
   - *Copy Ticket URL*: Easily share or access the ticket via a direct link.
   - *Ban Users*: Restrict problematic users directly from the ticket interface.
   - *Anti-Spam (Cooldown)*: Prevent spam by enforcing cooldown periods between user actions.
   
3. **Real-Time Chat**: 
   - Engage in direct conversations with server members using WebSocket for real-time communication.

4. **Role Management**:
   - Assign and manage user roles within the server.

5. **Settings Management**:
   - Update server settings and configurations via a user-friendly admin panel.

6. **Discord Integration**:
   - Interact with Discord's API for real-time data access and display.

---

### **User Roles**

1. **Client**:
   - **Description**: Regular user.
   - **Permissions**:
     - Open tickets.
     - Manage ticket status.
     - Add reviews.
     - Download chat history in JSON format.
     - Check crypto transaction status from the site.

2. **Support**:
   - **Description**: Support role, no deals.
   - **Permissions**:
     - View client tickets and assist clients.
     - Add notes on tickets for other staff visibility.
     - Manage ticket status.

3. **Moderator**:
   - **Description**: Moderator role, with moderation duties.
   - **Permissions**:
     - All Support role permissions.
     - Ban users.

4. **Admin (Site Owner)**:
   - **Description**: Full access.
   - **Permissions**:
     - Access Admin Control Panel.
     - Manage users (promote users to different roles).
     - Manage site settings.
     - Manage Discord settings.
     - Manage roles.