# 🛍️ Mini E-commerce Web App

A simple full-stack e-commerce application built with:

- **Frontend**: React.js + MUI (Material UI)
- **Backend**: Node.js + Express + MongoDB
- **Authentication**: JWT with bcrypt for secure login and registration
- **Authorization**: Role-based access for `admin` and `user`

---

## 📦 Features

### ✅ Core Functionality

- User registration & login with role selection (`admin` or `user`)
- Product management (CRUD) for admin
- Category management for admin
- Dashboard with product stats and charts
- Public product listing & details page
- Filterable product list
- Responsive, modern UI with MUI components

---

## 🚀 Demo

📦 **Live URL** (Optional): _Not hosted yet_

🧪 **Demo Admin Login**:
Username: admin2
Password: Admin123



## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/mini-ecommerce.git
cd mini-ecommerce
2. Install Dependencies

Backend
cd backend
npm install

Frontend
cd ../frontend
npm install

3. Configure Environment Variables
Create a .env file inside the backend folder with the following:

env

PORT=5000
MONGO_URI=mongodb://localhost:27017/mini-ecommerce
JWT_SECRET=your_jwt_secret

4. Run the App
Start Backend
cd backend
npm start

Start Frontend
cd ../frontend
npm start
Frontend runs at: http://localhost:3000

Backend runs at: http://localhost:5000

📘 API Overview
🔐 Auth Endpoints
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login existing user

📦 Product Endpoints
Method	Endpoint	Access	Description
GET	/api/products	Public	List all products
GET	/api/products/:id	Public	Get product by ID
POST	/api/products	Admin	Create product
PUT	/api/products/:id	Admin	Update product
DELETE	/api/products/:id	Admin	Delete product

📂 Category Endpoints
Method	Endpoint	Access	Description
GET	/api/categories	Admin	List all categories
POST	/api/categories	Admin	Create category
PUT	/api/categories/:id	Admin	Update category
DELETE	/api/categories/:id	Admin	Delete category

👮 Role-Based Access
Admin: Full access to products, categories, dashboard

User: Can view product list and product details

🔐 Middleware on the backend restricts API access using JWT + role verification.

📝 Assumptions & Tradeoffs
Users can select their role (admin or user) on registration for testing/demo purposes.

Product images are stored as plain URLs.

No cart or payment system implemented.

Filtering is simple (client-side); no search/pagination yet.

💡 Future Enhancements
Add cart & checkout flow

Upload product images

Implement search and pagination

User profile page

Deployment to Vercel (frontend) and Render/Heroku (backend)

📁 Folder Structure
pgsql
Copy
Edit
mini-ecommerce/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── controllers/
│   └── server.js
├── frontend/
│   ├── components/
│   ├── pages/
│   └── App.jsx
├── .gitignore
├── README.md
└── package.json