# 🔥 Pimp Your Grill

Salut! Acesta este proiectul meu pentru perioada de mentorat din cadrul departamentului de IT din LSAC. Pimp your grill nu este doar o simpla aplicatie web, este o intreaga comunitate de studenti care incearca sa gaseasca timp sa petreaca timp pretios impreuna, unde? La gratarele pline de carne buna si bautura.<3

## 📋 Descriere

**Pimp Your Grill** este o aplicație web full-stack care le permite studentilor să:

- 📸 Posteze cele mai tari gratare.
- ❤️ Sa dea MICI pentru gratarele preferate, aratandu-si dorinta pentru participare.
- 🏆 Concureze pentru cel mai tare si mare gratar al lunii.
- 👤 Gestioneze propriul profil de chef pregatar si posteaza cele mai tari gratare

## 🛠️ Tehnologii Folosite

### Backend

- **Node.js** & **Express.js** - Server și API REST
- **MongoDB** - Bază de date NoSQL
- **JWT** - Autentificare și autorizare
- **bcrypt** - Cryptare parole

### Frontend

- **React 18** - Librărie JavaScript pentru construirea interfețelor interactive
- **React Router** - Navigare intre pagini
- **Axios** - Client HTTP pentru comunicarea cu API-ul
- **Vite** - Build tool and server
- **CSS3** - Styling si design

## 📦 Instalare și Rulare

### Prerequisite

- Node.js (v16 sau mai nou)
- MongoDB (local sau Atlas)

### 1. Clonează repository-ul

git clone https://github.com/b0gdzzz/Proba-IT-2025-Stroe-Bogdan.git
cd Proba-IT-2025-Stroe-Bogdan

### 2. Configurează Backend-ul

cd backend
npm install

Creează fișierul `.env` în directorul `backend`:

In .env:
MONGODB_URI=mongodb://localhost:27017/pimp-your-grill
JWT_SECRET=your-secret-key-here
PORT=3000

Pornește serverul:

npm run dev

Backend-ul va rula pe `http://localhost:3000`

### 3. Configurează Frontend-ul

Deschide un nou terminal:

cd frontend
npm install

Pornește aplicația:

npm run dev2

Frontend-ul va rula pe `http://localhost:5174`

## 🚀 Funcționalități Principale

### 🔐 Autentificare

- Înregistrare utilizatori noi
- Login cu email și parolă
- Sesiuni persistente cu JWT
- Logout

### 👤 Profil Utilizator

- Avatar personalizat cu inițiala numelui
- Statistici: număr grătare, total like-uri, medie like-uri
- Badge-uri de realizări (Primul Grătar, 5 Grătare, 10 Grătare, 50 Like-uri)
- Informații de contact
- Colecția personală de grătare

### 🍖 Gestionare Grătare

- Postare grătare noi
- Editare grătare existente (daca esti creator sau admin)
- Ștergere grătare
- Like/Unlike grătare
- Vizualizare detalii complete în modal

### 🌐 Explorare

- **Browse**: Vezi toate grătarele din comunitate in browse grills
- **Leaderboard**: Top 3 grătare cu cele mai multe like-uri
- Design responsive

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
- **Modal system** pentru vizualizare/editare grătare

# Creat de:
**Bogdan Stroe**

- GitHub: [@b0gdzzz](https://github.com/b0gdzzz)
