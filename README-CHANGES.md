# 🧩 ResumeEco – Frontend Module

## 📘 Project Overview

**ResumeEco** is a next-generation **Resume Building & Career Ecosystem** designed for students and professionals.  
The platform enables users to **generate dynamic, verified resumes automatically** based on real achievements from internships, courses, hackathons, and projects.

This module represents the **Frontend Trial Task** focusing on **resume preview, customization, and real-time visualization** using **React + TypeScript**.

---

## 🎯 Trial Task Objective

As part of the **Resume System – Trial Task**, the goal was to conceptualize and implement one core frontend component for the ecosystem:
> **Frontend Development – Design a modern UI for the resume preview and customization page.**

---

## 🛠️ Approach & Implementation

### 🔹 Core Components Developed

#### 1. **Resume Preview System**
- Real-time visualization of resume data in a professional layout.
- Modular and customizable sections:
  - Personal Information  
  - Summary  
  - Experience  
  - Projects  
  - Education  
  - Skills  
  - Achievements  
- Print-optimized layout for **ATS-friendly** PDF generation.

#### 2. **Customization Interface**
- Interactive dialog to personalize resume appearance.
- **Theme selection:** Professional Blue, Modern Purple, Classic Black, Tech Green.  
- **Font & spacing controls:** adjustable typography and layout density.  
- **Section toggles:** show/hide resume sections.  
- **Editable personal details:** name, title, contact info, etc.

#### 3. **Responsive Design System**
- **Mobile-first approach** with Tailwind CSS.  
- Supports **dark/light mode**.  
- Fully accessible with **ARIA labels** and keyboard navigation.

---

## 🧩 Technical Architecture


src/
├── components/ # Reusable UI elements (dialogs, sections, form controls)
│ └── resume/ # Resume-specific components (CustomizeDialog, ResumePreview)
├── hooks/ # Reusable React hooks (use-mobile, use-toast)
├── lib/ # Utility functions
├── pages/ # Page routes (Dashboard, Resume, Start, etc.)
├── types/ # TypeScript definitions
│ └── resume.ts
├── index.css # Design system & print styles
└── main.tsx # App entry point


---

## 🎨 Design System

### 🎨 Color Palette (HSL-based)
| Purpose | Color | Description |
|----------|--------|-------------|
| Primary | `hsl(217 91% 60%)` | Brand identity (Blue) |
| Accent | `hsl(189 94% 43%)` | Highlight / Teal |
| Neutral | Scalable grayscale | Backgrounds & text |

### 🖋️ Typography
- **Font Family:** `Inter` for a clean, modern appearance.  
- **Hierarchy:** Clear heading levels with balanced contrast.  
- **Print Optimization:** Clean one-column layout for ATS compliance.

### 🧭 Interactive Elements
- Smooth hover transitions & micro-animations.
- Consistent button, input, and dialog styling.
- Accessible focus indicators for all controls.

---

## 🚀 Key Features

1. **Real-Time Resume Customization**
   - Live preview updates instantly as users modify inputs.
   - Instant theme switching and font adjustments.
   - Toggle visibility of resume sections.

2. **Professional Print Optimization**
   - ATS-friendly PDF output.
   - Semantic HTML structure for easy parsing.
   - Page-break-safe layout for multi-page resumes.

3. **Modular Architecture**
   - Independent reusable components.
   - Props-based configuration for customization.
   - TypeScript interfaces ensure type safety and reusability.

---

## 🧰 Tools & Technologies Used

| Category | Tools |
|-----------|-------|
| **Frontend Framework** | React 18 with TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS, CSS Custom Properties |
| **Icons** | Lucide React |
| **UI System** | Custom components inspired by shadcn/ui |
| **Code Quality** | ESLint, TypeScript type checking |
| **Routing** | React Router |
| **State Management** | React Query + local state |

---

## 🔗 Integration Readiness

### 📡 API Integration Points (Planned)
- Personal info management
- Resume customization persistence
- Achievement data fetching
- PDF generation service

### 🔄 Data Flow Example
```typescript
interface ResumeData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: string[];
  customization: ResumeCustomization;
}



**🪜 Installation & Setup**

# Clone the repository
git clone https://github.com/your-username/resumeeco-frontend.git

# Navigate to project folder
cd ecosystem-resume-builder-main

# Install dependencies
npm install

# Run development server
npm run dev


**🏗️ Build for Production**

npm run build

**🧪 Lint & Format**

npm run lint

**📄 Documentation**

Component-level documentation within src/components/

TypeScript interfaces in src/types/

Print & theme design rules in index.css

Follows accessible and scalable UI principles

**🧠 Evaluation Alignment**

| Criteria                         | Implementation                        |
| -------------------------------- | ------------------------------------- |
| **Creativity & Problem Solving** | Modern design, modular system         |
| **Code Quality**                 | TypeScript + ESLint + Tailwind        |
| **Integration Readiness**        | Defined API endpoints and data models |
| **Documentation**                | This detailed README + code comments  |
| **Timely Submission**            | Delivered within 3–4 days             |
