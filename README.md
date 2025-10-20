# ERP-DEMO
A sleek employee management app built with Next.js and Supabase. Easily add, edit, and delete employee records with realtime syncing. Designed for simplicity and efficiency, it streamlines team management with a clean UI and serverless backend.

---

## 🚀 Features

- 🔍 View a list of employees with search and pagination  
- ➕ Add new employees with name, email, and role  
- ✏️ Edit existing employees inline  
- 🗑️ Delete employees easily  
- ⚡ Realtime updates using Supabase backend  
- 🧑‍💻 Built with React (Next.js 13), TypeScript, and Tailwind CSS  

---

## 🗂️ Project Structure
src/
│
├── app/
│ ├── dashboard/
│ │ ├── employees/
│ │ │ ├── page.tsx # Employee list page
│ │ │ ├── [id]/edit.tsx # Edit employee page
│ │ │ └── new.tsx # Add new employee page
│
├── lib/
│ └── supabaseClient.ts # Supabase client setup
│
├── components/
│ ├── EmployeeForm.tsx # Reusable employee form component
│ └── EmployeeList.tsx # Employee list component
│
└── styles/
└── globals.css # Tailwind CSS global styles


---

## ⚙️ Installation

```bash
git clone https://github.com/<your-username>/employee-manager.git
cd employee-manager
npm install
npm run dev

Open in your browser at: http://localhost:3000

🔑 Environment Variables

Create a .env.local file in your project root with:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

Get these from your Supabase dashboard
.

🧑‍💻 How to Use

Go to /dashboard/employees to see the employee list.

Click Add Employee to add a new record.

Click Edit next to any employee to update their details.

Use the Delete button to remove an employee.

All changes sync instantly with Supabase backend.

📦 Deployment

Build your production app:
