# ERP-DEMO
A sleek employee management app built with Next.js and Supabase. Easily add, edit, and delete employee records with realtime syncing. Designed for simplicity and efficiency, it streamlines team management with a clean UI and serverless backend.

[![React](https://img.shields.io/badge/React-18.2-blue?logo=react)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?logo=tailwindcss)](https://tailwindcss.com/)
[![Chart.js](https://img.shields.io/badge/Chart.js-4.4-F5788D?logo=chartdotjs)](https://www.chartjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🌐 Live Demo  
👉 [Try TwinEnergy Now](https://github.com/shoaibahmed2755/Twinenergy)

---

## 🚀 Features

- 🔍 View a list of employees with search and pagination  
- ➕ Add new employees with name, email, and role  
- ✏️ Edit existing employees inline  
- 🗑️ Delete employees easily  
- ⚡ Realtime updates using Supabase backend  
- 🧑‍💻 Built with React (Next.js 13), TypeScript, and Tailwind CSS  

---

## 🖼️ Screenshots

| Advanced Dashboard | AI Insights (Coach) | Life Tips |
|------------|-------------|-----|
| ![Dashboard](https://github.com/shoaibahmed2755/Twinenergy/blob/main/AdvanceDashboard.png) | ![AI Insights](https://github.com/shoaibahmed2755/Twinenergy/blob/main/AI%20Coach.png) | ![Life Tips](https://github.com/shoaibahmed2755/Twinenergy/blob/main/Life%20Tips.png) |

---

## 🧩 Project Structure

```
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
```

---

## ⚙️ Installation

```bash
git clone https://github.com/<your-username>/employee-manager.git
cd employee-manager
npm install
npm run dev
```

Then open in your browser:
```
http://localhost:3000
```

---

## 🔑 Environment Variables

Create a `.env` file in your project root and add:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get your keys from:
- [Google AI Studio (Gemini)](https://makersuite.google.com/app/apikey)
- [Google Cloud Console (Maps)](https://console.cloud.google.com/)

---

## 🧑‍💻 How to Use

1.Go to /dashboard/employees to see the employee list.
2.Click Add Employee to add a new record.
3.Click Edit next to any employee to update their details.
4.Use the Delete button to remove an employee.
5.All changes sync instantly with Supabase backend.

---

## 🛠️ Built With

- ⚛️ Next.js 13 — React framework with App Router
- 🗃️ Supabase — Open-source Firebase alternative backend
- 🎨 Tailwind CSS — Utility-first CSS framework
- 💻 TypeScript — Static typing for improved developer experience
- ⚡ React Hooks — Manage state and side effects
- 🤖 **Google Gemini API** — AI insights
- 
---

## 📦 Deployment

```bash
npm run dev
```

Deploy easily on:
- **Vercel**
- **Netlify**
- **Firebase Hosting**

---

## 👨‍💻 Contributors

| Name | Role | Photo | LinkedIn |
|------|------|--------|-----------|
| **Shoaib Ahmed** | Developer & Designer | ![Shoaib Ahmed](https://github.com/shoaibahmed2755/Twinenergy/blob/main/Contri/Shoaib.png) | [LinkedIn](https://www.linkedin.com/in/shoaib-ahmed-b05973274/) |

---

## 🤝 Contributing

```bash
git fork https://github.com/<your-username>/employee-manager.git
git checkout -b feature-name
git commit -m "Add new feature"
git push origin feature-name
```

Then open a **Pull Request** on GitHub.

---

## 📜 License

This project is licensed under the **MIT License**.  
You’re free to use, modify, and share it responsibly.

---

## 🌟 Acknowledgments

- Google Gemini API for AI insights  
- Chart.js & Recharts for beautiful data visualization  
- Tailwind CSS for stunning and quick design  
- The open-source community for constant inspiration  

---

### 💚 ERP-DEMO — Streamline Your Team Management  
> *“Effortless employee management with a modern, serverless stack.”*

# Commit & Push in CMD
git add README.md
git commit -m "Added enhanced README with visuals, CSV example, and live demo link"
git push origin main

