# 🤖 Phase 2 – Warn + Case System (MongoDB)

Extend the existing Discord.js v14 moderation bot by implementing a full warning and case tracking system using MongoDB (mongoose).

---

## 📁 Create Folder

Create a new folder:

models/

---

## 📦 Install Dependency

Make sure mongoose is installed:

npm install mongoose

---

## 🔐 Update .env

Add:

MONGO_URI=mongodb://127.0.0.1:27017/modbot

---

## ⚙️ Modify index.js

- Import mongoose
- Connect to MongoDB on startup

Example:

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

---

## 📁 Create Models

### models/Warn.js

- Schema fields:
  - userId (String)
  - guildId (String)
  - reason (String)
  - moderator (String)
  - date (Date, default now)

---

### models/Case.js

- Schema fields:
  - caseId (Number)
  - action (String)
  - userId (String)
  - moderator (String)
  - reason (String)
  - guildId (String)
  - date (Date, default now)

---

## 📁 Create Commands (commands/moderation)

Create the following files:

- warnings.js
- unwarn.js
- case.js
- cases.js
- reason.js

---

## ⚠️ warnings.js

- Slash command: /warnings
- Input: user
- Fetch all warnings from MongoDB
- Display list

---

## ❌ unwarn.js

- Slash command: /unwarn
- Inputs:
  - user
  - index (number)
- Delete specific warning

---

## 📂 case.js

- Slash command: /case
- Input: case ID
- Fetch case data and display:
  - action
  - user
  - reason

---

## 📚 cases.js

- Slash command: /cases
- Input: user
- Show all cases for that user

---

## ✏️ reason.js

- Slash command: /reason
- Inputs:
  - case ID
  - new reason
- Update case reason

---

## 🔁 Modify Existing warn.js

Update warn.js to:

1. Save warning to MongoDB (Warn model)
2. Create a case entry (Case model)
3. Auto-increment caseId based on existing count

---

## 📡 Behavior Rules

- All commands must use SlashCommandBuilder
- All options must include setDescription()
- Use async/await
- Use try/catch for DB operations
- Only allow mods (ManageMessages permission)

---

## 🚀 After Setup

Run:

node deploy.js

---

## 🎯 Goal

Create a fully functional warning and case system similar to advanced Discord moderation bots, using MongoDB for persistent storage.