# Move37 Real-Time Polling App Backend

## 🧰 Tech Stack

- Node.js
- Express
- PostgreSQL
- Prisma
- Socket.IO

## 🚀 How to Run

1. Clone the repo
2. Create `.env` with your PostgreSQL credentials
3. Install dependencies:

    npm install

4. Run Prisma migration:

    npx prisma migrate dev --name init

5. Start the server:

    npm run dev

6. Test API routes with Postman or Curl


## WebSocket Events

- joinPoll – Join room to receive real-time results
- pollUpdate – Broadcast updated poll results


---


### 

