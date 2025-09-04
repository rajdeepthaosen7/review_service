# Shiwani E-mart — Frontend (Vite + React + Tailwind)

Flow: Registration → Login → **Products**.  
- Customers **cannot** add products or view other customers.  
- **Products page:** clickable product cards (no reviews inline).  
- **Product detail page:** single product view (no box), shows image, price, average **star** rating, and **all reviews**.  
- Star rating input with immediate optimistic update; then syncs with backend.

## Run
```bash
npm install
echo "VITE_API_BASE_URL=http://localhost:8080" > .env
npm run dev
```
# review_service
