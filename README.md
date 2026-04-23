now # MyRelay

MyRelay is a ticket-based support platform with real-time chat per ticket.

The product has one app, one backend, and one database, but different users see different areas and actions depending on their role.

backend architecture using:

- Node.js or bun
- Express or `NestJS later`
- PostgreSQL
- Socket.IO
- Next.js
- Auth from scratch at app level
- Role-based permissions
- Real-time ticket chat

---

# Product idea

A user can create a support ticket with a description of their issue.

That ticket becomes a persistent record in the database and moves through a lifecycle:

- `open`
- `assigned`
- `resolved`
- `closed`

Each ticket can also have a live chat room attached to it.

The ticket itself is created and managed through normal HTTP APIs.

The chat attached to the ticket uses WebSockets through Socket.IO.

This means the app is a combination of:

- ticket management system
- real-time support communication tool
- role-based internal dashboard

---

# Main product flow

## 1. Landing page

The public landing page introduces MyRelay and gives users a clear path into the product.

### Purpose

- simple marketing entry
- explain what the product is
- redirect users into the app

### Suggested routes

- `/` → landing page
- `/login`
- `/register`
- `/app` → authenticated app area

### Landing page content

Keep it simple:

- product name
- one-line description
- CTA button to sign in or open app

Example direction:

> MyRelay  
> A real-time ticket and support workspace for teams.

---

# 2. Authentication

Authentication is part of the app and should be implemented directly in the backend, but kept intentionally simple.

## Goal

Learn practical app auth, not build a full auth platform.

## Initial auth scope

- register
- login
- logout
- fetch current authenticated user
- protect routes
- protect socket connections
- support role-based access

## Roles

There are 3 main roles:

- `user`
- `agent`
- `admin`

## User role

Can:

- register and log in
- create tickets
- view only their own tickets
- open their own ticket details
- join chat for their own ticket
- send messages on their own tickets

## Agent role

Can:

- log in
- access inbox
- view tickets they are allowed to handle
- join ticket chat rooms
- send replies
- assign tickets
- update ticket status

## Admin role

Can:

- access dashboard
- view all tickets
- view system-level stats
- view users and agents
- perform full management actions later

## Auth implementation notes

For v1, auth should stay small and boring:

- email + password
- password hashing with bcrypt
- JWT or cookie-based auth
- middleware for route protection
- middleware for role checks

Do not start with:

- forgot password
- social auth
- email verification
- 2FA
- advanced session management

---

# 3. App structure

The app is one product with different screens depending on role.

## Public routes

- `/`
- `/login`
- `/register`

## Authenticated user routes

- `/app/tickets`
- `/app/tickets/new`
- `/app/tickets/:ticketId`

## Authenticated agent routes

- `/app/inbox`
- `/app/inbox/:ticketId`

## Admin routes

- `/app/admin`
- `/app/admin/tickets`
- `/app/admin/users`
- `/app/admin/agents`

Same app, same backend, same database.

The difference is:

- what each role can access
- what each role can do
- which screens each role sees

---

# 4. Tickets domain

The ticket is the main business object.

A ticket is not just a message thread.

A ticket contains its own persistent details and can also have many chat messages attached to it.

## Ticket creation

A user creates a ticket using HTTP.

### Input

- `subject` → optional
- `description` → required

### On creation

The backend stores the ticket with metadata such as:

- creator user id
- current status
- assigned agent id if any
- timestamps
- maybe priority later
- maybe source later

### Default status

A new ticket starts as:

- `open`

## Ticket lifecycle

Main status flow:

- `open`
- `assigned`
- `resolved`
- `closed`

### Recommended behavior

For v1:

- ticket starts as `open`
- agent manually assigns ticket to self
- once assigned, ticket becomes `assigned`
- later agent can mark as `resolved`
- later ticket can be marked `closed`

Do not auto-assign just because an agent opened the room.

Viewing is not the same as ownership.

Manual assignment is cleaner.

---

# 5. Ticket detail view

When opening a ticket detail page, the app should load the ticket and its chat data separately.

## Ticket detail page should show

- ticket id
- subject
- description
- creator
- status
- assigned agent
- created time
- updated time

## Chat area should show

- message history
- message input
- live incoming messages
- system updates later if needed

## Important modeling rule

The ticket description belongs to the ticket.

It is not required to be stored as a normal chat message.

In the UI, it can be shown as:

- a ticket context section at the top
- a pinned case summary
- an intro block before the messages

This keeps the domain model clean.

---

# 6. Ticket chat with Socket.IO

Each ticket can have a live chat room.

The room exists so that the user and the assigned or viewing agent can communicate instantly.

## Core idea

- HTTP creates and manages the ticket
- Socket.IO powers live communication inside that ticket

## Room convention

Each room should be tied to a ticket id.

Example:

- `ticket:{ticketId}`

Possible future room patterns:

- `user:{userId}`
- `agent:{agentId}`

## Who can join a ticket room

### User

Can join only if the ticket belongs to them.

### Agent

Can join if they have permission to handle that ticket.

### Admin

Can join if full admin access is allowed.

## Main socket use cases

- user joins ticket room
- agent joins ticket room
- user sends message
- agent sends message
- both sides receive new messages instantly
- room receives status updates instantly
- room receives assignment updates instantly

## Suggested event names

### Client to server

- `ticket:join`
- `ticket:leave`
- `ticket:message:send`

### Server to client

- `ticket:message:new`
- `ticket:status:updated`
- `ticket:assigned`
- `ticket:user_joined`
- `ticket:user_left`

Optional later:

- `ticket:typing:start`
- `ticket:typing:stop`

## Important architecture rule

Do not make sockets the main source of truth.

### HTTP should handle

- create ticket
- list tickets
- fetch ticket detail
- fetch chat history
- assign ticket
- update ticket status

### Socket.IO should handle

- live room connection
- realtime message delivery
- live status broadcasts
- live assignment broadcasts
- typing or presence later

That split is important.

---

# 7. Inbox area

The inbox is mainly for agents.

This is the operational area where they manage tickets.

## Inbox responsibilities

- see available tickets
- see assigned tickets
- filter by status
- open a specific ticket
- assign ticket to self
- respond in chat
- update ticket status

## Example inbox ticket row

Each ticket preview can show:

- ticket id
- subject
- creator name or email
- current status
- assigned agent
- created time
- updated time
- last message preview later
- unread count later

## Main agent actions

- open ticket
- assign to me
- mark resolved
- mark closed

---

# 8. Admin dashboard

The admin dashboard is for system-level visibility.

This should not become a fake analytics platform in v1.

Keep it practical.

## Good v1 dashboard metrics

- total tickets
- open tickets
- assigned tickets
- resolved tickets
- closed tickets
- total users
- total agents
- currently connected clients
- maybe active ticket rooms

## Important note on naming

Be precise.

Do not show vague labels like:

- `connections`

Instead use clear labels like:

- `connected_clients`
- `connected_agents`
- `active_ticket_rooms`

---

# 9. Database design direction

PostgreSQL is the source of truth.

The database should model tickets and messages as separate but related things.

## Core tables

### `users`

Stores all authenticated app users.

Suggested columns:

- `id`
- `email`
- `password_hash`
- `display_name`
- `role`
- `created_at`
- `updated_at`

Possible later:

- `last_seen_at`
- `is_active`

---

### `tickets`

Stores the support case itself.

Suggested columns:

- `id`
- `subject`
- `description`
- `status`
- `created_by_user_id`
- `assigned_agent_id`
- `created_at`
- `updated_at`
- `resolved_at`
- `closed_at`

Possible later:

- `priority`
- `source`
- `category`

---

### `ticket_messages`

Stores live chat messages linked to a ticket.

Suggested columns:

- `id`
- `ticket_id`
- `sender_user_id`
- `sender_role`
- `content`
- `created_at`
- `updated_at`

Possible later:

- `message_type`
- `is_internal`
- `attachment_url`

---

## Relationships

- one user can create many tickets
- one agent can be assigned many tickets
- one ticket can have many messages
- each message belongs to one ticket
- each message is sent by one user

## Important modeling principle

A ticket is the case.

Messages are communication within that case.

Do not collapse both concepts into one thing.

---

# 10. API direction

This is a suggested v1 HTTP API structure.

## Auth

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/me`

## Tickets

- `POST /tickets`
- `GET /tickets`
- `GET /tickets/:ticketId`
- `PATCH /tickets/:ticketId/status`
- `PATCH /tickets/:ticketId/assign`

## Messages

- `GET /tickets/:ticketId/messages`

Main message sending can happen through sockets.

If needed later, an HTTP fallback route can exist too.

## Admin

- `GET /admin/stats`
- `GET /admin/tickets`
- `GET /admin/users`

---

# 11. Suggested frontend screens

## Public

- landing page
- login page
- register page

## User screens

- my tickets list
- create ticket form
- ticket detail with chat

## Agent screens

- inbox ticket list
- ticket detail with controls + chat

## Admin screens

- dashboard overview
- tickets summary
- users summary

---

# 12. Suggested v1 feature scope

This is the recommended first build scope.

## Authentication

- register
- login
- me
- logout
- role guards

## User side

- create ticket
- list own tickets
- view own ticket
- chat on ticket

## Agent side

- list tickets in inbox
- open ticket
- assign to self
- send messages
- update ticket status

## Admin side

- basic dashboard stats

## Realtime

- live chat per ticket
- live status update
- live assignment update

That is enough for a strong v1.

---

# 13. Suggested v2 features

Only after v1 is stable.

- typing indicators
- unread counts
- presence / online status
- internal agent notes
- search
- filters
- pagination improvements
- audit logs
- attachments

---

# 14. Suggested architecture direction

For the backend, prefer feature-based structure instead of splitting everything only by transport type.

Example direction:

```txt
src/
  modules/
    auth/
    tickets/
    messages/
    users/
    admin/
  socket/
  middleware/
  lib/
  app.ts
  server.ts
```
