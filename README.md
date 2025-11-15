#  **EquiTrust AI Framework**  
### EquiTrust AI: Intelligent Approval. Equitable Future. 

<div align="center">
  <!-- <img src="https://placehold.co/1600x500/0f172a/dbeafe?text=EquiTrust+AI+Framework" alt="EquiTrust Banner"/> -->
  <img width="524" height="524" alt="image" src="https://github.com/user-attachments/assets/821c6dda-7efb-4ced-bf75-e5971de928a3" />

</div>

<br/>

---

#  **✨ Welcome to EquiTrust AI — The Future of Trustworthy Banking ✨**

EquiTrust AI Framework is a **full-stack, humanized, explainable, and regulator-ready** financial decisioning system, built right in your browser.  

It’s designed to **empower customers**, **increase trust in AI**, and **give regulators full transparency**—all while offering a delightful, warm, and friendly user experience 🎨.

This is a **live, working prototype** demonstrating:

### 🔥 **1. XFE — The Explainability-First Engine**  
### 🔐 **2. DCI — The Decentralized Customer Control Interface**  
### 📜 **3. AFL — The Audit & Fairness Ledger**

**Built with ❤️ by Honey Priya.**

---

<div align="center">
 <img width="1024" height="1024" alt="image" src="https://github.com/user-attachments/assets/4b867f07-9fce-432b-b778-1fbdf3bdbb6c" />


</div>

---

# 🧭 **Table of Contents**

- 🎯 [Project Vision](#-project-vision)
- 🏗️ [Architecture Overview](#️-architecture-overview)
- ⚙️ [Tech Stack](#-tech-stack)
- 🚀 [Getting Started](#-getting-started)
- 🎨 [The Experience — A Humanized UI](#-the-experience--a-humanized-ui)
- 🧠 [The Engine — How The AI Works (XFE)](#-the-engine--how-the-ai-works-xfe)
- 🔐 [The Control — Your Data, Your Rules (DCI)](#-the-control--your-data-your-rules-dci)
- 📜 [The Ledger — Radical Transparency (AFL)](#-the-ledger--radical-transparency-afl)
- 📊 [Screenshots & Walkthrough](#-screenshots--walkthrough)
- 🤝 [Creator](#-creator)
- 📄 [License](#-license)

---

# 🎯 **Project Vision**

> 💡 *“AI decisions should feel like a conversation, not a verdict. They should be fair, transparent, and always in your control.”*

EquiTrust AI simulates a **Retail Loan Decision System** where an AI decides:  
✔️ **Approve**  
✔️ **Deny**  
✔️ **Refer**  

But unlike a typical banking AI, **EquiTrust reveals everything**:

- **Why** the model decided what it decided, in plain English.  
- **How** your data contributed, shown in a simple, visual chart.  
- **What** data the AI is (and is not) allowed to use, controlled by you.  
- **Full auditability** for regulators, logged with every decision.  

It is the perfect demo platform for **ethical AI in finance**.

---

# 🏗️ **Architecture Overview**

This entire prototype runs **100% in the browser**. No backend, no servers, no friction. It's a powerful demonstration of how complex AI governance can be simulated and understood in a lightweight, accessible package.

```
/ (React Application)
├── components/
│   ├── Auth.tsx             (Secure Login/Signup UI)
│   ├── LoanApplication.tsx  (Interactive Simulator)
│   ├── DecisionView.tsx     (Explanation & Chart)
│   ├── ControlPanel.tsx     (User Consent Toggles)
│   └── AuditLogView.tsx     (Regulator's Ledger)
│
└── services/
    └── aiService.ts         (The Simulated AI Brain 🧠)
```

---

# ⚙️ **Tech Stack**

### 🎨 **Frontend & Logic**
- **React 19** + **TypeScript**  
- **Vite** for a lightning-fast development experience  
- **TailwindCSS** for beautiful, utility-first styling  
- **Recharts** for interactive data visualization
- All AI, decisioning, and logging logic is handled client-side.

---

# 🚀 **Getting Started**

This project is built to be incredibly simple to run.

### 🔧 **Installation**
No complex setup needed. Just clone the repository.

```bash
git clone https://github.com/your-repo/equitrust-ai-framework
cd equitrust-ai-framework
```

### ▶️ **Running the App**
Simply open the `index.html` file in any modern web browser.

> ✨ **That's it!** The application will be live and fully interactive.

---

# 🎨 **The Experience — A Humanized UI**

### 🌟 Pages Included

### 🟦 **1. Secure & Welcoming Auth**
- A clean, modern, and animated sign-in and sign-up experience.
- The perfect, trustworthy front door to the application.

<div align="center">
  <img width="1024" height="535" alt="image" src="https://github.com/user-attachments/assets/224263aa-6dad-43ff-9af2-c2ec187653c7" />

</div>

---

### 🟩 **2. Interactive Loan Simulator**
- A friendly 5-input form using sliders, not boring text boxes.
- Encourages experimentation: "What if my income was higher?"
- “We’ll help guide you” messaging throughout.

<div align="center">
 <img width="1024" height="1024" alt="image" src="https://github.com/user-attachments/assets/996ba4e5-57d8-428a-86ca-852414d6a899" />

</div>

---

### 🟨 **3. The Decision & Explanation View (XFE)**
- A big, clear, color-coded decision banner. No ambiguity.
- Conversational text that explains the *story* behind the decision.
- An interactive chart showing exactly how each factor helped or hurt.

<div align="center">
  <img width="1531" height="945" alt="image" src="https://github.com/user-attachments/assets/8d4bf236-ee79-4c4a-bc2b-3ba6e1bba282" />


</div>

---

### 🟧 **4. The Customer Control Panel (DCI)**
- **Your Data. Your Control.**
- Simple, clear toggle switches for every piece of data the AI can use.
- An **"Explain My AI Profile"** button that translates the AI's internal assessment of you into plain English.
  <img width="1725" height="959" alt="image" src="https://github.com/user-attachments/assets/d8016c6e-71b4-4d3f-8153-6154ba3f877f" />



---

# 🧠 **The Engine — How The AI Works (XFE)**

The `aiService.ts` file simulates the entire backend. Every decision returns a clear, structured object:

✔ **The AI's Final Decision**
✔ **A Natural Language Explanation (Top 3 Factors)**
✔ **A Feature Contribution Breakdown (for the chart)**

```json
{
  "decision": "Approved",
  "naturalLanguageExplanation": "Congratulations! The key factor was your excellent credit score...",
  "featureContributions": [
    { "name": "Credit Score", "impact": 175 },
    { "name": "Annual Income", "impact": 40 },
    { "name": "Debt-to-Income", "impact": -20 },
    { "name": "Existing Products", "impact": 20 }
  ]
}
```

---

# 🔐 **The Control — Your Data, Your Rules (DCI)**

Before the AI model runs, the system performs a crucial check:
✔ It looks at the user’s consent settings from the Control Panel.
✔ It dynamically includes or excludes data from the calculation based on those settings.
✔ The impact of your choices is immediately visible in the next simulation you run.

---

# 📜 **The Ledger — Radical Transparency (AFL)**

Every simulation is logged immutably in the "Regulator Log" view. This demonstrates complete accountability.

```json
{
  "timestamp": "10/7/2024, 3:33:11 PM",
  "customerId": "CUST-12345",
  "decision": "Referred",
  "explanation": "Your application requires a bit more review...",
  "inputParameters": {
    "creditScore": 720,
    "income": 80000
    ...
  },
  "biasCheckResult": true
}
```

# 🤝 **Creator**

This project was envisioned, designed, and built by **Honey Priya** for the hackathon.

---

# 📄 **License**

This project is licensed under the **MIT License**. Feel free to explore, modify, and build upon this vision.
