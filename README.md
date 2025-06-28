# React Blog App 📝

A modern, production-ready blog application built with React, featuring authentication, rich text editing, and cloud storage capabilities.

## Check it Out
[React Blog App Link](https://viditasingh.github.io/)

## 🚀 Features

- **User Authentication**: Secure login/signup system with Appwrite
- **Rich Text Editor**: TinyMCE integration for content creation
- **Post Management**: Create, read, update, and delete blog posts
- **Image Upload**: Featured image support with cloud storage
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **State Management**: Redux Toolkit for predictable state updates
- **Protected Routes**: Authentication-based route protection
- **Modern UI**: Clean and intuitive user interface
- **SEO Friendly**: Proper HTML structure and meta tags

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and development server
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Redux Toolkit** - State management
- **React Hook Form** - Form handling

### Backend & Services
- **Appwrite** - Backend-as-a-Service for authentication and database
- **TinyMCE** - Rich text editor
- **HTML React Parser** - HTML content parsing

### Development Tools
- **ESLint** - Code linting
- **Bun** - Fast package manager
- **Vite** - Hot module replacement and fast builds

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Header/          # Navigation header
│   ├── Footer/          # Page footer
│   ├── LoadingPage/     # Loading state component
│   ├── Post-form/       # Post creation/editing form
│   └── container/       # Layout containers
├── pages/               # Page components
│   ├── Home.jsx         # Homepage
│   ├── AllPosts.jsx     # Posts listing
│   ├── AddPost.jsx      # Create new post
│   ├── EditPost.jsx     # Edit existing post
│   ├── Post.jsx         # Single post view
│   ├── MyPosts.jsx      # User's posts
│   ├── Login.jsx        # Login page
│   ├── Signup.jsx       # Registration page
│   ├── About.jsx        # About page
│   └── Contact.jsx      # Contact page
├── appwrite/            # Backend service configurations
│   ├── appwriteconfig.js # Database and storage services
│   └── auth.js          # Authentication service
├── store/               # Redux store configuration
│   ├── store.js         # Store setup
│   └── authSlice.js     # Authentication state
└── config/              # App configuration
    └── config.js        # Environment variables
```

## 🔧 Configuration

### Appwrite Configuration

1. Create an Appwrite project
2. Set up authentication (enable email/password)
3. Create a database and collection with the required attributes
4. Create a storage bucket for file uploads
5. Configure permissions for authenticated users

### TinyMCE Setup

1. Sign up for a TinyMCE account
2. Get your API key from the dashboard
3. Add the API key to your environment variables

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` for design system changes
- Update components in `src/components/` for UI modifications
- Customize global styles in `src/index.css`

### Features
- Add new pages in `src/pages/`
- Extend the Redux store in `src/store/`
- Modify Appwrite services in `src/appwrite/`

## 🔐 Security Features

- Protected routes with authentication
- Server-side validation through Appwrite
- Secure file uploads with type validation
- Environment variable protection
- User session management

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- Desktop computers
- Tablets
- Mobile devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Join our community discussions

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - The web framework used
- [Appwrite](https://appwrite.io/) - Backend services
- [TinyMCE](https://www.tiny.cloud/) - Rich text editor
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Vite](https://vitejs.dev/) - Build tool

---

Made with ❤️ by Vidita Singh
