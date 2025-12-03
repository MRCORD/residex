# 🚨 Residex: Incident Management Workshop

Welcome to **Vibe Coding: Mission Critical**.
You are the Lead Engineer for **Residex**, the incident management system used by high-end residential towers.

**The Situation:**
- Tenants use the app to report urgent issues (Leaks, Fire, Security).
- Building Managers use the dashboard to dispatch help.
- **CRITICAL ISSUE:** Managers are reporting "Ghost Incidents". They get a call from an angry tenant about a leak, but the dashboard shows nothing until they refresh the page 5 times.

**Your Mission:**
Fix the critical sync bug, secure the application, and implement AI-powered dispatching.

---

## 🛠️ Setup

1.  **Clone the Repository**
    ```bash
    git clone <YOUR_REPO_URL>
    cd residex
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run the App**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000).
    - **Top Half:** Tenant Reporting Form.
    - **Bottom Half:** Manager Dashboard (simulated dual-view).

---

## 👻 Exercise 1: The "Ghost Incident" (Debugging)

**The Problem:**
Submit a new incident as a tenant (e.g., "Water Leak in 404"). Look at the Manager Dashboard below. **It doesn't appear.**
You have to manually refresh the page to see it. In an emergency, this delay is unacceptable.

**The Vibe Coding Way:**
1.  Open `app/actions.ts` (Server Actions).
2.  Highlight the `submitIncident` function.
3.  **Prompt:**
    > "When I submit an incident, the dashboard doesn't update automatically. I have to refresh. Fix this by adding `revalidatePath` to the server action."

**Review:**
-   Did it add `revalidatePath('/')`?
-   **Test it:** Submit another incident. Does it appear instantly?

---

## 🛡️ Exercise 2: Security Breach (Refactoring)

**The Problem:**
Open `app/actions.ts`. It's a mess. The code that *deletes* incidents (Admin only) is in the same file as the code that *creates* incidents (Public).
If we're not careful, a tenant could accidentally call the delete function.

**The Vibe Coding Way:**
Separate concerns.

1.  Create `lib/services/tenant.ts` and `lib/services/admin.ts`.
2.  **Prompt:**
    > "Refactor `app/actions.ts`. Move the incident creation logic to `lib/services/tenant.ts`. Move the resolve/delete logic to `lib/services/admin.ts`. Keep the Server Actions as simple wrappers."

**Review:**
-   Is the dangerous logic isolated?
-   (Bonus) Ask AI: *"Add a check to ensure only Admins can call the delete service."*

---

## 🆘 Exercise 3: The Panic Button (New Feature)

**The Problem:**
In a fire or security event, filling out a form is too slow. Tenants need a "One-Tap" solution.

**The Vibe Coding Way:**
1.  Open `app/page.tsx`.
2.  **Prompt:**
    > "Create a 'SOS Button' component. It should be a large red circular button. When the user holds it down for 3 seconds, it should automatically submit a 'Critical' incident with the message 'EMERGENCY SOS'."

**Review:**
-   Does it have a progress ring or animation while holding?
-   Does it trigger the submission?

---

## 🤖 Exercise 4: AI Dispatcher (Smart Logic)

**The Problem:**
Managers are overwhelmed. They see "Smoke in hallway" and have to manually click "Assign to Fire Dept".

**The Vibe Coding Way:**
1.  Open `lib/services/admin.ts` (or wherever the logic lives).
2.  **Prompt:**
    > "Create a function `autoDispatch(incident)`. Use a mock AI call to analyze the description. If it contains words like 'fire', 'smoke', 'intruder', set priority to 'Critical' and assign to 'Emergency'. If 'leak', assign to 'Plumber'."

**Review:**
-   Submit a ticket: "There is a stranger in the lobby."
-   Does it auto-assign to "Security"?

---

## 🎓 Wrap Up

You have built a **Mission Critical** system.
1.  **Fixed** a real-time data sync bug.
2.  **Secured** the architecture by separating privileges.
3.  **Saved Lives** with the SOS button.
4.  **Automated** operations with AI.

This is Vibe Coding for the Enterprise. 🏢
