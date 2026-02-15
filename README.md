# Jobshell

A modern job application tracking web application that helps users stay organized during their job search journey.

- [Live Link](jobshell.kodee.no)

## 📋 Overview

Jobshell is a simple yet powerful tool that allows users to register and track job applications throughout the entire hiring process. Keep all your job opportunities organized in one place and never miss an update.

## Features

- **Job Application Tracking**: Register and monitor all your job applications
- **Real-time Updates**: Stay informed about your application status
- **User-friendly Interface**: Clean and intuitive design for seamless navigation
- **Secure Authentication**: Firebase-powered user authentication
- **Responsive Design**: Works perfectly on desktop and mobile devices

## Tech Stack

- **[React](https://react.dev/)** (v19.2.0) - UI library
- **[Vite](https://vite.dev/)** (v7.2.4) - Build tool and dev server
- **[TypeScript](https://www.typescriptlang.org/)** (v5.9.3) - Type safety
- **[Zustand](https://zustand-demo.pmnd.rs/)** (v5.0.11) - State management
- **[Firebase](https://firebase.google.com/)** (v12.9.0) - Backend services (Auth, Database)
- **[React Router](https://reactrouter.com/)** (v7.13.0) - Navigation
- **[React Hook Form](https://react-hook-form.com/)** (v7.71.1) - Form handling
- **[Zod](https://zod.dev/)** (v4.3.6) - Schema validation
- **[React Icons](https://react-icons.github.io/react-icons/)** (v5.5.0) - Icon library

## Installation

1. Clone the repository:

```bash
https://github.com/AHB-7/jobs.git
cd jobshell
```

2. Install dependencies:

```bash
npm install
```

3. Set up Firebase:
    - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
    - Enable Authentication and Firestore Database
    - Copy your Firebase configuration
    - Create a `.env` file in the root directory and add your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:

```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```

jobs/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   ├── firebase/       # Firebase configuration and services
│   ├── constants/      # Constants and configuration
│   ├── types/          # TypeScript type definitions
│   ├── App.tsx         # Root component
│   ├── App.css         # Global styles
│   └── main.tsx        # Application entry point
├── public/             # Static assets
├── dist/               # Production build output
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
├── vercel.json         # Vercel deployment config
└── README.md           # Project documentation

```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

- [Alan Brim ](kodee.no)
- [LinkedIn](https://www.linkedin.com/in/alanbrim/)

## Acknowledgments

- Built with modern React best practices
- Inspired by the need for better job application tracking
- Thanks to all the open-source libraries that made this possible

---

# **Note**: This project is currently in development. Features and documentation may change.

# Jobshell

A modern job application tracking web application that helps users stay organized during their job search journey.

- [Live Link](https://jobshell.kodee.no/)

## 📋 Overview

Jobshell is a simple yet powerful tool that allows users to register and track job applications throughout the entire hiring process. Keep all your job opportunities organized in one place and never miss an update.

## Features

- **Job Application Tracking**: Register and monitor all your job applications
- **Real-time Updates**: Stay informed about your application status
- **User-friendly Interface**: Clean and intuitive design for seamless navigation
- **Secure Authentication**: Firebase-powered user authentication
- **Responsive Design**: Works perfectly on desktop and mobile devices

## Tech Stack

- **[React](https://react.dev/)** (v19.2.0) - UI library
- **[Vite](https://vite.dev/)** (v7.2.4) - Build tool and dev server
- **[TypeScript](https://www.typescriptlang.org/)** (v5.9.3) - Type safety
- **[Zustand](https://zustand-demo.pmnd.rs/)** (v5.0.11) - State management
- **[Firebase](https://firebase.google.com/)** (v12.9.0) - Backend services (Auth, Database)
- **[React Router](https://reactrouter.com/)** (v7.13.0) - Navigation
- **[React Hook Form](https://react-hook-form.com/)** (v7.71.1) - Form handling
- **[Zod](https://zod.dev/)** (v4.3.6) - Schema validation
- **[React Icons](https://react-icons.github.io/react-icons/)** (v5.5.0) - Icon library

## Installation

1. Clone the repository:

```bash
https://github.com/AHB-7/jobs.git
cd jobshell
```

2. Install dependencies:

```bash
npm install
```

3. Set up Firebase:
    - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
    - Enable Authentication and Firestore Database
    - Copy your Firebase configuration
    - Create a `.env` file in the root directory and add your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:

```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```

jobs/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   ├── firebase/       # Firebase configuration and services
│   ├── constants/      # Constants and configuration
│   ├── types/          # TypeScript type definitions
│   ├── App.tsx         # Root component
│   ├── App.css         # Global styles
│   └── main.tsx        # Application entry point
├── public/             # Static assets
├── dist/               # Production build output
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
├── vercel.json         # Vercel deployment config
└── README.md           # Project documentation

```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

- [Alan Brim ](https://kodee.no/)
- [LinkedIn](https://www.linkedin.com/in/alanbrim/)

## Acknowledgments

- Built with modern React best practices
- Inspired by the need for better job application tracking
- Thanks to all the open-source libraries that made this possible

---

**Note**: This project is currently in development. Features and documentation may change.
