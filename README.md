# BlockVote 🗳️

**BlockVote** is a secure, decentralized voting platform built with:

- 🧠 **Motoko** for the backend (on the Internet Computer)
- ⚛️ **React + Vite** for the frontend
- 🎨 **TailwindCSS** for UI styling
- 🛡️ **Internet Identity** for user authentication

---

## 📁 Project Structure

Blockvote/
├── blockvote_backend/ # Motoko canister logic
├── blockvote-frontend/ # Vite + React + Tailwind frontend
├── dfx.json # DFINITY config
├── .gitignore # Git exclusions
├── README.md # Project overview
└── package.json # Optional root-level NPM scripts



---

## 🔧 Setup Instructions

### 🖥 Backend (Motoko)

```bash
cd blockvote_backend
# Write or edit your Motoko logic in src/blockvote_backend.mo



🌐 Frontend (React + Vite)
cd blockvote-frontend
npm install
npm run dev

🚀 Build and Deploy
From the root folder:


# Build frontend
npm run build

# Deploy to local Internet Computer
dfx deploy


✨ Features
✅ Blockchain-based integrity

✅ Fast React frontend

✅ Real-time updates (via DFINITY)

✅ Secure authentication with Internet Identity

📜 License
MIT © 2025 MAYAAS Technologies