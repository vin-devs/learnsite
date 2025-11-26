# LearnHub - Ecommerce Platform for Digital Courses & Books

A modern, full-featured ecommerce platform for buying and learning digital courses and books. Built with Next.js 15, TypeScript, Tailwind CSS, and React.

## 🌟 Features

- **Comprehensive Product Catalog**: 20 diverse courses and 30 educational books across multiple categories
- **Advanced Search & Filtering**: Real-time search with category, price range, difficulty level, and rating filters
- **Shopping Cart Management**: Persistent cart state using Zustand with add/remove/quantity controls
- **User Authentication**: Complete auth system with login, registration, password reset, and session management
- **Multiple Payment Methods**: Integrated M-Pesa STK Push and PayPal checkout options
- **User Dashboard**: Protected dashboard with purchase history, download management, and progress tracking
- **Responsive Design**: Mobile-first design that works seamlessly across all devices
- **Course Management**: Detailed course pages with syllabi, learning outcomes, and instructor information
- **Book Library**: Rich book collection with descriptions, table of contents, and preview options

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **State Management**: Zustand (cart state)
- **Authentication**: Custom auth context with localStorage persistence
- **Form Handling**: React Hook Form + Zod validation
- **API**: Next.js Route Handlers
- **Charts**: Recharts (for analytics)

## 📁 Project Structure

\`\`\`
├── app/
│ ├── api/ # API routes for auth, checkout, search, orders
│ ├── auth/ # Authentication pages (login, register, forgot password)
│ ├── books/ # Books catalog page
│ ├── cart/ # Shopping cart page
│ ├── catalog/ # Full product catalog page
│ ├── checkout/ # Checkout flow with payment options
│ ├── courses/ # Courses catalog page
│ ├── dashboard/ # Protected user dashboard
│ ├── search/ # Search results page
│ ├── layout.tsx # Root layout with auth context
│ ├── page.tsx # Homepage
│ └── globals.css # Global styles and design tokens
├── components/
│ ├── shared/ # Reusable components (navbar, cards, etc.)
│ ├── checkout/ # Checkout-specific components
│ └── auth/ # Auth-specific components
├── contexts/
│ └── auth-context.tsx # User authentication context
├── store/
│ └── cart.ts # Zustand cart store
├── data/
│ └── seed.ts # Mock data for courses and books
├── lib/
│ ├── types.ts # TypeScript interfaces
│ └── utils.ts # Utility functions
└── public/ # Static assets and course/book images
\`\`\`

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/vin-devs/learnsite.git
   cd learnsite
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📖 Usage

### Browsing Products

- Visit the **Catalog** page to see all courses and books
- Use the **Search** feature with filters for category, price range, difficulty, and ratings
- Click on any product to view detailed information

### Shopping

- Click "Add to Cart" to add products to your shopping cart
- View and manage cart items from the cart icon in the navbar
- Proceed to checkout when ready

### Checkout & Payment

- Complete the checkout form with shipping and billing information
- Choose between M-Pesa or PayPal payment methods
- Confirm payment and receive order confirmation

### User Account

- **Register** for a new account with email and password
- **Login** to access your personal dashboard
- **View** your purchased courses and books
- **Download** course materials and books
- **Track** your learning progress

### Admin Testing

- Use test credentials to explore the authentication flow
- Mock payment options in checkout for testing different scenarios
- Access the dashboard to view order history and user profile

## 📊 Key Pages

| Page      | Path             | Description                                        |
| --------- | ---------------- | -------------------------------------------------- |
| Homepage  | `/`              | Hero section with featured products and categories |
| Catalog   | `/catalog`       | Full searchable product listing                    |
| Courses   | `/courses`       | Filtered course listing                            |
| Books     | `/books`         | Filtered book listing                              |
| Search    | `/search`        | Advanced search with filters                       |
| Cart      | `/cart`          | Shopping cart management                           |
| Checkout  | `/checkout`      | Payment processing                                 |
| Login     | `/auth/login`    | User login                                         |
| Register  | `/auth/register` | New user registration                              |
| Dashboard | `/dashboard`     | Protected user dashboard                           |

## 🔐 Authentication

The app uses a context-based authentication system with localStorage persistence:

- **Login/Register**: Create accounts with email and password
- **Password Reset**: Recover account access via email link
- **Protected Routes**: Dashboard and order pages require authentication
- **Session Management**: User sessions persist across page refreshes

## 💳 Payment Methods

### M-Pesa

- STK Push payment flow
- Phone number verification
- Transaction confirmation

### PayPal

- Secure PayPal checkout
- Multiple payment options
- Transaction tracking

## 🛒 Shopping Cart

Built with Zustand for efficient state management:

- Add/remove products
- Quantity adjustment
- Real-time total calculation
- Persistent cart state

## 🔍 Search & Filtering

Advanced search capabilities:

- **Full-text search** across titles, descriptions, and authors
- **Category filters** (programming, business, health, etc.)
- **Price range** filtering
- **Difficulty levels** (beginner, intermediate, advanced)
- **Rating filters** (4+, 4.5+, 5 stars)
- **Real-time suggestions** as you type

## 📱 Responsive Design

Mobile-first approach with breakpoints for:

- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)

## 🎨 Design System

Indigo-based color scheme with carefully selected typography:

- **Primary Color**: Indigo (#6366f1)
- **Accent Colors**: Green and red for actions
- **Neutrals**: Slate grays for backgrounds and borders
- **Typography**: Clean, readable fonts for optimal user experience

## 🧪 Testing Features

The app includes development testing modes:

- Mock payment success/failure scenarios
- Test user credentials
- Sample order data
- Development checkout confirmations

## 📝 Available Scripts

\`\`\`bash

# Development server

npm run dev

# Production build

npm run build

# Start production server

npm start

# Code linting

npm run lint
\`\`\`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is open source and available under the MIT License.

## 🔗 Links

- **Live Demo**:
  https://692178ec87d6fcf148f8e3c9--venerable-croquembouche-8306a5.netlify.app/

## 👨‍💻 Author

**Vincent Mutuku**

- GitHub: [@vin-devs](https://github.com/vin-devs)

---
