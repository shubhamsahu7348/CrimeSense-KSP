# CrimeSense AI — Karnataka Police Crime Intelligence & FIR Analytics Workspace

An AI-powered crime analytics, FIR investigation, and habitual offender tracking system built for police officers, investigators, and crime analysts.

---

## 🌟 Key Features

1. **Interactive FIR Management**: Search, filter, and inspect detailed FIR records (Crime Category, Station Jurisdiction, IPC/BNS Sections, Accused, Complainant, Evidence).
2. **Habitual Offender Profiling**: Track repeat offenders, modus operandi (M.O.) patterns, aliases, risk levels, and cross-district FIR linkages.
3. **Police Station Directory**: Monitor SHO details, contact details, active crime counts, and jurisdictional coverage across Karnataka districts.
4. **Analytics & Heatmap Dashboard**: Visual crime distribution by district, category breakdown, case resolution rates, and trend visualization.
5. **CrimeSense AI Assistant**:
   - Structured investigation reports with **Summary**, **Evidence**, **Insights**, and **Confidence**.
   - Gemini 2.5 / 3.6 Flash model integration.
   - **Local Database Intelligence Fallback**: If backend API keys or AI services are offline/unreachable during hackathons or field deployments, the system seamlessly falls back to a deterministic client/server database search synthesis engine.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide Icons, Recharts, Motion
- **Backend**: Node.js, Express.js
- **AI Engine**: `@google/genai` (Google Gemini API)
- **Deployment Targets**: Cloud Run, Node.js Container, Zoho Catalyst (AppSail / Functions)

---

## 🚀 Local Development Setup

### 1. Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 2. Environment Variables
Create a `.env` file in the project root:
```env
GEMINI_API_KEY=your_google_ai_studio_api_key_here
PORT=3000
```

### 3. Installation & Run
```bash
# Install dependencies
npm install

# Start development server (Frontend + Backend)
npm run dev
```

Open your browser at `http://localhost:3000`.

---

## ☁️ Deploying to Zoho Catalyst

### Step 1: Catalyst Project Setup
1. Log in to **Zoho Catalyst Console** and create a new project (e.g., `CrimeSense-AI`).
2. Choose **AppSail** or **Node.js Function/App** as your deployment target.

### Step 2: Environment Variable Configuration
In the Catalyst Console:
1. Navigate to **Environment Variables** under your AppSail/Server configuration.
2. Add the following key-value pair:
   - `GEMINI_API_KEY`: Your Google AI Studio API key.
3. Save and publish configuration.

### Step 3: Deployment Verification (`package.json`)
Ensure your `package.json` contains valid build and start scripts:
```json
{
  "scripts": {
    "dev": "tsx server.ts",
    "build": "vite build && esbuild server.ts --bundle --platform=node --format=cjs --packages=external --sourcemap --outfile=dist/server.cjs",
    "start": "node dist/server.cjs"
  }
}
```

---

## 🔍 Debugging "Failed to Communicate with AI Engine" Error

If you deploy to Zoho Catalyst and get an AI Engine error:

### 1. API Key Availability
- Ensure `GEMINI_API_KEY` is added in Zoho Catalyst Console under Environment Variables for the correct environment (Development vs Production).
- In Catalyst, environment variables set in Development do **not** automatically apply to Production unless deployed to Production.

### 2. Dynamic Port & Host Binding
- Ensure `server.ts` listens on `process.env.PORT` dynamically:
```ts
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
app.listen(PORT, '0.0.0.0', () => { ... });
```

### 3. Gemini Model Name Compatibility
- The app uses model fallback order: `gemini-2.5-flash`, `gemini-1.5-flash`, `gemini-2.0-flash`, `gemini-3.6-flash`. Ensure your API key has quota enabled for Gemini Flash models.

### 4. Built-in Resilience
- The system automatically triggers the **Local Search Engine Fallback** if the Gemini API call fails or if `GEMINI_API_KEY` is missing, ensuring your application always displays an official report even in offline/demo environments!

---

## 📡 Backend API Endpoints

| Endpoint | Method | Description |
| text | --- | --- |
| `/api/firs` | `GET`, `POST` | Retrieve all FIRs or register a new FIR |
| `/api/firs/:firNumber` | `GET` | Retrieve a specific FIR record |
| `/api/accused` | `GET` | Get repeat offender profiles |
| `/api/stations` | `GET` | Get police station directory |
| `/api/analytics` | `GET` | Get database metrics & crime breakdown |
| `/api/investigate` | `POST` | Submit query to AI Investigation Engine |

---

## 📄 License
Karnataka State Police Datathon 2026 Prototype.
