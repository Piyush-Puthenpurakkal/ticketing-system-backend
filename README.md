# Hubly CRM Backend

An Express.js REST API powering the Hubly ticketing & chat system, with MongoDB data store.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Deploying to Render](#deploying-to-render)
- [License](#license)

---

### Features

- User registration, login & JWT-based auth
- Profile update (`PUT /api/auth/update-profile`) & delete (`DELETE /api/auth/delete-profile`)
- Ticket creation, listing & status updates
- Chat message storage per ticket
- Team management (assign members)
- Analytics endpoint for ticket stats
- Widget settings CRUD

### Prerequisites

- Node.js ≥ 14.x
- npm (or Yarn)
- MongoDB Atlas (or local MongoDB)

### Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-org/backend-settings.git
   cd backend-settings
   ```
