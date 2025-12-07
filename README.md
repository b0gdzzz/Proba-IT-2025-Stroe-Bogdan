Mi s-a facut rau si n-am putut sa fac un read me, il fac maine cand ma trezesc si ii dau push

# 🔥 Pimp Your Grill

O platformă comunitară dedicată pasionaților de grătar, unde utilizatorii pot să-și împărtășească rețetele și setupurile de grătar, să dea like-uri și să concureze în clasament.

## 📋 Descriere

**Pimp Your Grill** este o aplicație web full-stack care permite utilizatorilor să:

- 📸 Posteze și să vizualizeze grătare
- ❤️ Dea like la grătarele preferate
- 🏆 Concureze în clasamentul comunității
- 👤 Gestioneze propriul profil și colecție de grătare
- 🎨 Exploreze grătarele postate de comunitate

## 🛠️ Tehnologii Folosite

### Backend

- **Node.js** & **Express.js** - Server și API REST
- **MongoDB** - Bază de date NoSQL
- **Mongoose** - ODM pentru MongoDB
- **JWT** - Autentificare și autorizare
- **bcrypt** - Hash-uire parole

### Frontend

- **React 19** - Library UI
- **React Router** - Navigare
- **Axios** - Cereri HTTP
- **Vite** - Build tool și dev server
- **CSS3** - Styling cu animații custom

## 📦 Instalare și Rulare

### Prerequisite

- Node.js (v16 sau mai nou)
- MongoDB (local sau Atlas)
- npm sau yarn

### 1. Clonează repository-ul

```bash
git clone https://github.com/b0gdzzz/Proba-IT-2025-Stroe-Bogdan.git
cd Proba-IT-2025-Stroe-Bogdan
```

### 2. Configurează Backend-ul

```bash
cd backend
npm install
```

Creează fișierul `.env` în directorul `backend`:

```env
MONGODB_URI=mongodb://localhost:27017/pimp-your-grill
JWT_SECRET=your-secret-key-here
PORT=3000
```

Pornește serverul:

```bash
npm run dev
```

Backend-ul va rula pe `http://localhost:3000`

### 3. Configurează Frontend-ul

Deschide un nou terminal:

```bash
cd frontend
npm install
```

Pornește aplicația:

```bash
npm run dev
```

Frontend-ul va rula pe `http://localhost:5174`

## 🚀 Funcționalități Principale

### 🔐 Autentificare

- Înregistrare utilizatori noi
- Login cu email și parolă
- Sesiuni persistente cu JWT
- Logout securizat

### 👤 Profil Utilizator

- Avatar personalizat cu inițiala numelui
- Statistici: număr grătare, total like-uri, medie like-uri
- Badge-uri de realizări (Primul Grătar, 5 Grătare, 10 Grătare, 50 Like-uri)
- Informații de contact
- Colecția personală de grătare

### 🍖 Gestionare Grătare

- Postare grătare noi cu imagine
- Editare grătare existente
- Ștergere grătare
- Like/Unlike grătare
- Vizualizare detalii complete în modal

### 🌐 Explorare

- **Browse**: Vezi toate grătarele din comunitate
- **Leaderboard**: Top 3 grătare cu cele mai multe like-uri
- Filtrare după creator
- Design responsive cu decorații animate

### 🎨 Design

- Temă crem și maro (#fdf8f3, #721d08)
- Animații fluide (float, flicker, rotate)
- Decorații de fundal (cercuri, flăcări, icoane mâncare)
- Mobile-friendly cu meniu hamburger
- Iconițe SVG custom pentru like-uri

## 📁 Structura Proiectului

```
Proba-IT-2025-Stroe-Bogdan/
├── backend/
│   ├── src/
│   │   ├── Config/
│   │   │   └── db.js              # Configurare MongoDB
│   │   ├── controllers/
│   │   │   ├── authController.js  # Autentificare
│   │   │   ├── grillsController.js # CRUD grătare
│   │   │   └── usersController.js  # Utilizatori
│   │   ├── middleware/
│   │   │   └── auth.js             # JWT middleware
│   │   ├── models/
│   │   │   ├── grill.js            # Model Grătar
│   │   │   └── user.js             # Model User
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── grillsRoutes.js
│   │   │   └── usersRoutes.js
│   │   └── server.js               # Entry point
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   ├── mic_facut.svg          # Icon like activ
│   │   └── mic_nefacut.svg        # Icon like inactiv
│   ├── src/
│   │   ├── components/
│   │   │   ├── Footer.jsx
│   │   │   ├── GrillDetailsModal.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── PostGrillModal.jsx
│   │   ├── pages/
│   │   │   ├── BrowseGrillsPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── LeaderboardPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── services/
│   │   │   └── api.js              # Axios config
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints

### Autentificare

- `POST /api/auth/register` - Înregistrare utilizator nou
- `POST /api/auth/login` - Autentificare
- `GET /api/auth/profile` - Profil utilizator curent

### Grătare

- `GET /api/grills` - Toate grătarele
- `GET /api/grills/leaderboard` - Top 3 grătare
- `GET /api/grills/:id` - Detalii grătar
- `POST /api/grills` - Creare grătar nou (auth)
- `PUT /api/grills/:id` - Actualizare grătar (auth)
- `DELETE /api/grills/:id` - Ștergere grătar (auth)
- `POST /api/grills/:id/like` - Toggle like (auth)

### Utilizatori

- `GET /api/users/:userId/grills` - Grătarele unui utilizator

## 🎯 Caracteristici Tehnice

- **Autentificare JWT** cu token persistat în localStorage
- **Protected routes** - redirecționare automată către login
- **Responsive design** - breakpoint la 768px
- **Optimistic UI updates** pentru like-uri
- **Error handling** comprehensiv
- **Loading states** pentru toate operațiunile async
- **Modal system** pentru vizualizare/editare grătare
- **Agregare MongoDB** pentru clasament (sortare după număr like-uri)

## 👨‍💻 Dezvoltator

**Bogdan Stroe**

- GitHub: [@b0gdzzz](https://github.com/b0gdzzz)

## 📄 Licență

Acest proiect a fost creat pentru Proba IT 2025.

---

Dezvoltat cu ❤️ și 🔥 pentru comunitatea de grătăriști!
