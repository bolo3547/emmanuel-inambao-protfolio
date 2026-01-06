# Prof. Emmanuel Inambao - Engineering Portfolio

A world-class professional portfolio showcasing expertise in Electronic Engineering, IoT, Robotics, and Full-Stack Development.

## 🚀 Overview

This portfolio is designed to demonstrate real-world engineering capabilities to:
- **Investors** - Showcasing innovation and scalable solutions
- **Engineering Clients** - Demonstrating technical depth and project delivery
- **Universities** - Academic and research collaboration potential
- **Industrial Partners** - Automation and IoT integration expertise

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **UI Library:** React 18
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Language:** TypeScript

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles & Tailwind utilities
│   ├── layout.tsx       # Root layout with SEO metadata
│   └── page.tsx         # Main portfolio page
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx   # Navigation with mobile menu
│   │   └── Footer.tsx   # Footer with links
│   ├── sections/
│   │   ├── Hero.tsx     # Hero with CTA buttons
│   │   ├── About.tsx    # About with core values
│   │   ├── Skills.tsx   # Grouped skill cards
│   │   ├── Projects.tsx # Featured projects
│   │   ├── Education.tsx # Mentorship programs
│   │   ├── Gallery.tsx  # Image gallery with lightbox
│   │   └── Contact.tsx  # Contact form & info
│   ├── ui/
│   │   ├── Button.tsx   # Reusable button component
│   │   ├── ProjectCard.tsx # Project display card
│   │   ├── SectionWrapper.tsx # Animation wrapper
│   │   └── SkillBadge.tsx # Skill tag component
│   └── index.ts         # Component exports
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   ```
   http://localhost:3000
   ```

### Admin Login 🔐

- Visit `http://localhost:3000/admin/login` to access the admin area.
- Default credentials are defined in `src/lib/auth.tsx` (for development). You can override them by setting `NEXT_PUBLIC_ADMIN_EMAIL` and `NEXT_PUBLIC_ADMIN_PASSWORD` in your environment.
- The admin area is protected client-side (localStorage-based session), suitable for prototype workflows. For production use, replace with server-side authentication (e.g., NextAuth.js) and secure cookies.

### Build for Production

```bash
npm run build
npm start
```

## ✨ Features

### Design
- ✅ Dark theme with blue/gold accents
- ✅ Premium engineering aesthetic
- ✅ Mobile-first responsive design
- ✅ Clean typography and spacing
- ✅ Subtle Framer Motion animations

### Technical
- ✅ Next.js App Router
- ✅ TypeScript for type safety
- ✅ SEO optimized with meta tags
- ✅ Accessible (ARIA labels, contrast)
- ✅ Smooth scroll navigation
- ✅ Reusable components

### Sections
- ✅ Hero with animated entrance
- ✅ About with engineering philosophy
- ✅ Skills grouped by domain
- ✅ Projects with detailed case studies
- ✅ Education & mentorship programs
- ✅ Gallery with filterable grid
- ✅ Contact form (frontend)

## 📝 Customization

### Update Personal Information

1. **Contact details:** Edit `src/components/sections/Contact.tsx`
2. **Social links:** Edit `Footer.tsx` and `Contact.tsx`
3. **SEO metadata:** Edit `src/app/layout.tsx`

### Add Real Images

Replace placeholder images in:
- `src/components/sections/Gallery.tsx` - Add real image URLs
- `src/components/ui/ProjectCard.tsx` - Project images
- Add images to `public/images/` folder

### Add CV Download

1. Place your CV in `public/cv/emmanuel-inambao-cv.pdf`
2. The download button in Hero section will work automatically

### Connect Contact Form

Integrate the contact form with your preferred service:
- **Formspree:** Add form action URL
- **EmailJS:** Add API integration
- **Custom API:** Create API route in `src/app/api/contact/route.ts`

## 🎨 Color Scheme

```css
/* Primary Blue */
--primary-500: #3b82f6;
--primary-600: #2563eb;

/* Accent Gold */
--accent-400: #fbbf24;
--accent-500: #f59e0b;

/* Dark Background */
--dark-900: #0f172a;
--dark-950: #020617;
```

## 📱 Responsive Breakpoints

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in Vercel
3. Deploy automatically

### Other Platforms

Works with Netlify, Railway, or any Node.js hosting.

## 📄 License

This portfolio template is open for personal use.

## 👤 Author

**Prof. Emmanuel Inambao**  
Electronic Engineer | IoT & Robotics Developer | Full-Stack Systems Engineer  
📍 Lusaka, Zambia

---

*Built with precision and engineering excellence.*
