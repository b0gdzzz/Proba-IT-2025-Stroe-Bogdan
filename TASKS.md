# Pimp Your Grill - 1 Week Implementation Plan

**Deadline:** December 7, 2024, 23:59  
**Days Remaining:** 5 days

---

## ✅ What You Already Have
- [x] Project structure (frontend + backend)
- [x] MongoDB connection
- [x] User schema (email, password, username, profilePicture, bio, role)
- [x] Basic frontend (navbar, homepage, browse page)
- [x] CORS configured
- [x] Frontend-backend connection working

---

## 🎯 Core Requirements (MUST HAVE)

### Day 1 (Dec 2-3) - Authentication & Database
- [x] **Backend: Auth System**
  - [x] Install bcrypt for password hashing
  - [x] Install jsonwebtoken for JWT
  - [x] Create auth controller (register, login, logout)
  - [x] Create auth routes
  - [x] Add JWT middleware for protected routes
  - [x] Add JWT_SECRET to .env
  - [x] Update User model with name and phone fields
- [x] **Backend: Grill Model**
  - [x] Rename "Note" model to "Grill"
  - [x] Update schema: name, description, imageUrl, likes, creator (ref User)
  - [x] Update all routes from /api/notes to /api/grills
  - [x] Create grillsController with CRUD + like + leaderboard
  - [x] Test all endpoints (register, login, create grill, like, leaderboard) ✅
- [ ] **Frontend: Register Page**
  - [ ] Create register form (name, phone, email, password, confirm password)
  - [ ] Form validation
  - [ ] Connect to backend register endpoint
  - [ ] Success/error messages
- [ ] **Frontend: Login Page**
  - [ ] Create login form (email, password)
  - [ ] Connect to backend login endpoint
  - [ ] Store JWT in localStorage
  - [ ] Redirect to profile on success

### Day 2 (Dec 3) - Profile & Posting
- [ ] **Backend: Profile Endpoints**
  - [ ] GET /api/users/profile (get logged-in user data)
  - [ ] GET /api/users/:id/grills (get user's grills)
- [ ] **Frontend: Profile Page**
  - [ ] User info card (name, email, phone)
  - [ ] Display user's posted grills in grid
  - [ ] "Post a Grill" button
- [ ] **Frontend: Post Grill Modal**
  - [ ] Modal component with form (name, description)
  - [ ] Connect to backend POST /api/grills
  - [ ] Success/error handling
  - [ ] Refresh grill list after posting
- [ ] **Backend: Grill Endpoints**
  - [ ] POST /api/grills (create new grill)
  - [ ] GET /api/grills (get all grills)
  - [ ] GET /api/grills/:id (get single grill)

### Day 3 (Dec 4) - Voting & Leaderboard
- [ ] **Backend: Voting System**
  - [ ] Add "likes" array to Grill schema (array of user IDs)
  - [ ] POST /api/grills/:id/like (toggle like)
  - [ ] Ensure user can only like once per grill
  - [ ] Update like count
- [ ] **Frontend: Like Button**
  - [ ] MIC button on each grill card
  - [ ] Toggle between pink (unliked) and brown (liked)
  - [ ] Update like count in real-time
  - [ ] Only allow logged-in users to like
- [ ] **Backend: Leaderboard**
  - [ ] GET /api/grills/leaderboard (top 3 by likes)
- [ ] **Frontend: Leaderboard Section**
  - [ ] "THE BEST GRILLS" section on Best Grills page
  - [ ] Display top 3 grills
  - [ ] Show like counts

### Day 4 (Dec 5) - Best Grills Page & Search
- [ ] **Frontend: Best Grills Page**
  - [ ] "Grills for pimps" section (all grills)
  - [ ] "THE BEST GRILLS" section (top 3)
  - [ ] Grid layout for grills
  - [ ] Each grill card: image, name, description, likes, MIC button
- [ ] **Frontend: Grill Detail Modal**
  - [ ] Click on grill card opens modal
  - [ ] Show full details
  - [ ] Like button in modal
- [ ] **Frontend: Stateful Navbar**
  - [ ] Show Login/Register when logged out
  - [ ] Show Profile/Logout when logged in
  - [ ] Highlight active page

### Day 5 (Dec 6) - Polish & Testing
- [ ] **Frontend: Responsive Design**
  - [ ] Test on mobile, tablet, desktop
  - [ ] Fix any layout issues
  - [ ] Ensure all pages are responsive
- [ ] **Frontend: Error Handling**
  - [ ] Loading states for all API calls
  - [ ] Error messages for failed requests
  - [ ] Form validation messages
- [ ] **Backend: Authorization**
  - [ ] Protect routes (only logged-in users can post/like)
  - [ ] Users can only edit/delete their own grills
- [ ] **Testing**
  - [ ] Test register/login flow
  - [ ] Test posting grills
  - [ ] Test voting system
  - [ ] Test leaderboard updates
- [ ] **README**
  - [ ] How to run the app
  - [ ] Features implemented
  - [ ] What you learned

### Day 6 (Dec 7) - Final Touches & Submission
- [ ] **Bug Fixes**
  - [ ] Fix any remaining bugs
  - [ ] Test all features one more time
- [ ] **Code Cleanup**
  - [ ] Remove console.logs
  - [ ] Clean up commented code
  - [ ] Ensure consistent formatting
- [ ] **Deployment Prep**
  - [ ] Make repo public
  - [ ] Final README update
  - [ ] Add screenshots to README
- [ ] **Submit before 23:59!**

---

## 🌟 Bonus Features (If Time Permits)

### Priority 1 (High Value)
- [ ] Image upload for grills (drag & drop or file select)
- [ ] Edit/delete own grills from profile
- [ ] Limited MICI per user (e.g., 10 votes total)

### Priority 2 (Medium Value)
- [ ] Forgot password functionality
- [ ] Admin role can delete any grill
- [ ] Sort grills by date/likes

### Priority 3 (Nice to Have)
- [ ] Sign in with Google
- [ ] User can change profile picture
- [ ] Comments on grills

---

## 📊 Daily Time Allocation

**Day 1:** 6-8 hours (Auth + Database)  
**Day 2:** 6-8 hours (Profile + Posting)  
**Day 3:** 6-8 hours (Voting + Leaderboard)  
**Day 4:** 6-8 hours (Best Grills Page)  
**Day 5:** 4-6 hours (Polish + Testing)  
**Day 6:** 2-4 hours (Final touches)

**Total:** ~35-45 hours over 6 days
