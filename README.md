# Used Car Dealership Web Application - Landon Stucki

## Project Description

This is a full-stack used car dealership web application built using Node.js, Express, EJS, and PostgreSQL. The application allows users to browse available vehicles, leave reviews, submit service requests, and contact the dealership.

The system includes role-based access control where employees and owners can manage inventory, users, and customer interactions through an admin dashboard.

---

## Live Deployment

https://used-car-dealership-landon.onrender.com

---

## Technology Stack

* Node.js
* Express.js
* EJS (server-side rendering)
* PostgreSQL
* express-session (authentication)
* bcrypt (password hashing)

---

## Database Schema (ERD)

![ERD](./docs/erd.png)

---

## User Roles

### Owner

* Full access to the system
* Manage vehicles, categories, users
* View and respond to contact messages
* Manage service requests

### Employee

* Manage vehicles
* View and update service requests
* Respond to contact messages

### Standard User

* Browse vehicles
* Submit service requests
* Contact dealership
* View their own messages and requests

---

## Core Features

### Vehicle System

* Browse vehicles by category
* View individual vehicle details
* Admin can add, edit, and delete vehicles


### Service Requests (Workflow System)

* Users submit service requests
* Requests move through stages:

  * Submitted
  * In Progress
  * Completed
* Admin can update status and add notes

### Contact System

* Guests and users can submit contact messages
* Admin can view all messages
* Admin can respond to messages
* Messages update status (open → closed)

### Admin Dashboard

* Central control panel for:

  * Adding/Removing Vehicles
  * Users (Owner Level)
  * Service requests
  * Contact messages

---

## Test Accounts

Use the following accounts to test functionality:

**Owner**

* Email: [owner@test.com](mailto:owner@test.com)

**Employee**

* Email: [employee@test.com](mailto:employee@test.com)

**User**

* Email: [user@test.com](mailto:user@test.com)

---

## Screenshots
![ERD](./docs/erd.png)
### Home Page
![Home Page](./docs/homepage.png)

## Known Limitations

* UI styling could be improved for mobile responsiveness
* Minimal CSS used.
* No email notifications for contact responses
* Some validation could be expanded further

---

## Author

Landon Stucki

---
