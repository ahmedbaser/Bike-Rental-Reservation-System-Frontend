# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```




                                  Frontend Code Summary

                           Bike Rental Reservation System Frontend

1. State Management with Redux
Reducers:

# authReducer.ts: 
Manages authentication state, including user authentication status, token, and user data. Handles login, logout, and related errors.

# bikeReducer.ts: 
Manages bike data, including fetching, creating, updating, and deleting bikes. Handles bike detail retrieval and error states.

# couponReducer.ts: 
Manages coupon data, including fetching, creating, updating, and deleting coupons. Handles related errors and loading states.

# rentalReducer.ts: 
Manages rental data, distinguishing between paid and unpaid rentals. Handles booking, fetching, and payment of rentals.

# userReducer.ts: 
Manages user profile data and user management for admins. Handles profile updates, user fetching, deletion, promotion, and error states.

# Store Configuration (store.ts):

Configures the Redux store with reducers for managing authentication, bikes, coupons, rentals, and users.
Initializes preloaded state with authentication token and sets up initial state values.

2. Routing and Application Layout
# App.tsx:
Router Setup: Utilizes BrowserRouter to handle routing across the application.
# Routes:
# Public Routes: 
Includes paths like /, /about, /login, /signup, /bikes, /bikes/:bikeId, /payment/:rentalId, /coupons, /privacy-policy, /terms-of-service, and /contact-us.
# Private Routes: 
Protected routes requiring user authentication, such as /dashboard, /profile, /rental-management, and /bike-management.

# Admin Routes: 
Restricted to admin users, including /admin/dashboard, /admin/user-management, /admin/bike-management, /admin/rental-management, and /admin/coupon-management.

# Layout: 
Uses Navbar and Footer components to provide consistent navigation and footer across the application. The main content area adjusts based on the current route.

3. Components and Pages
# Public Pages:

# HomePage: 
Displays the homepage with key sections.

# AboutPage: 
Provides information about the application.

# LoginPage: 
Handles user login with validation.

# SignUpPage: 
Manages user registration with form validation.

# BikeListingPage: 
Lists all available bikes with filtering and sorting options.

# BikeDetailPage: 
Shows detailed information about a selected bike and includes a booking button.

# PaymentPage: 
Handles payment processes for rentals.

# CouponsPage: 
Displays available coupons.

# Protected Pages:

# UserDashboard: 
User-specific dashboard with relevant information and functionality.

# ProfilePage: 
Allows users to view and update their profile information.

# MyRentalsPage: 
Displays the user's rental history and status.

# Admin Pages:

# AdminDashboard: 
Admin view with overall control and management options.

# UserManagement: 
Manages users, including viewing, deleting, and promoting users.

# BikeManagement: 
Allows admins to manage bike inventory, including creating, updating, and deleting bikes.

# ReturnBikePage: 
Admin functionality for processing returned bikes.

# CouponManagementPage: 
Admin functionality for managing coupons.

# Additional Components:

# AppFooter: 
Footer component for additional links and information.
PrivacyPolicy and TermsOfService: Display privacy policies and terms of service.
ContactUs: Provides a contact form for user inquiries.
PrivateRoute and AdminRoute: Components for protecting routes based on user authentication and role.


                                                 Technologies Used

# React: 
# Redux: 
# Redux Toolkit: 
# Reducers: 
# BrowserRouter: 
# TypeScript:
# Tailwind CSS: 
# Ant Design:
# Axios: 
# React Hook Form: 
# Custom Hooks and Components: 
  

# UserPassword and Email
Email:user222@gmail.com
Password:User222 or you can signUp new user in signUp section

# AdminPassword and Email
Email:Admin222@gmail.com
Password:Admin222

# Stripe Information
CardNumber: 4242 4242 4242 4242
MM:12
YY:24
CVC:123
ZIP:12345
















