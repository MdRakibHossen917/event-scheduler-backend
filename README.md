# Mini Event Scheduler with AI Categorization

## Project Overview
This is a full-stack event scheduler application that allows users to create, view, archive, and delete events.  
Events are automatically categorized as **Work**, **Personal**, or **Other** based on simple AI keyword matching logic.  
The frontend is built with React and Tailwind CSS, while the backend uses Node.js, Express, and TypeScript.

---
## Features
- Create, view, archive, and delete events  
- Events are automatically categorized as Work, Personal, or Other based on AI-like keyword logic  
- Responsive UI built with Tailwind CSS  

---

## API Endpoints

| Method | Endpoint       | Description                               |
|--------|----------------|-------------------------------------------|
| GET    | `/events`      | Retrieve all events sorted by date and time |
| POST   | `/events`      | Create a new event with automatic category assignment |
| PUT    | `/events/:id`  | Archive an event (set archived status to true)  |
| DELETE | `/events/:id`  | Delete an event permanently               |

---

## Setup Instructions

### Backend Setup
```bash
cd server
npm install
npm run dev    # Starts backend server at http://localhost:5000
