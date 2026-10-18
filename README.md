# Andzia Wedding 💍

A modern and elegant wedding website built to provide guests with a beautiful online experience and a convenient way to share wedding memories.

🔗 **Live Demo:** [View Website](https://angelika-i-patryk-wedding.vercel.app)

---

## ✨ Project Overview

Andzia Wedding is a wedding website designed with an elegant visual style and a focus on usability across desktop and mobile devices.

The application allows guests to upload photos and videos directly through the website. Uploaded files are stored in Google Drive.

The project is built with Next.js and TypeScript and deployed on Vercel.

## 🚀 Features

- Elegant, wedding-focused website design
- Responsive user interface
- Photo and video uploads
- Google Drive integration for file storage
- Google OAuth 2.0 integration for Google API access
- Cloudflare Turnstile bot protection
- Server-side file validation
- Production deployment with Vercel

## 🛠️ Tech Stack

- **Framework:** Next.js
- **Library:** React
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Cloud Storage:** Google Drive API
- **Authentication:** Google OAuth 2.0
- **Bot Protection:** Cloudflare Turnstile
- **Deployment:** Vercel
- **Version Control:** Git and GitHub

## ⚙️ Getting Started

### Prerequisites

- Node.js
- npm
- A Google Cloud project configured for Google Drive API access
- A Cloudflare Turnstile widget

### Installation

Clone the repository:

```bash
git clone https://github.com/AlexBialas/whitecode-wedding.git
```

Navigate to the project directory:

```bash
cd whitecode-wedding
```

Install dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root and configure the following variables:

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_DRIVE_FOLDER_ID=
GOOGLE_PROJECT_ID=
GOOGLE_REFRESH_TOKEN=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

Fill in the values using your own configuration. Never publish actual credentials or secret values.

### Run the Development Server

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Security

The application uses Cloudflare Turnstile to help protect the upload endpoint against automated abuse.

Uploaded files are validated on the server for supported file types and individual file size limits.

Sensitive configuration is managed through environment variables.

**Important:** Never commit `.env.local`, Google OAuth credentials, refresh tokens, or Turnstile secret keys to GitHub.

## 📂 Project Purpose

This project demonstrates practical experience with:

- Developing a full-stack web application
- Building a responsive user interface
- Integrating third-party APIs
- Implementing server-side file uploads
- Connecting an application to cloud storage
- Integrating Google OAuth 2.0
- Implementing bot protection
- Managing environment variables
- Deploying an application to a production environment

## 👩‍💻 Created by

**The White Code**

Web development and digital solutions.

---

_Built with Next.js and TypeScript._
