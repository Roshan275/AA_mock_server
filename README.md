# Account Aggregator(AA) Backend

This repository contains the mock Account Aggregator (AA) backend for the Lumi.ai project.

The AA backend:
* Stores financial data mapped to user email
* Exposes pull-based APIs for the main server
* Mimics real Account Aggregator behavior
* Does not perform classification or analytics

## Tech Stack
Node.js |
Express.js |
MongoDB (Mongoose)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the server:

   ```bash
   node src\server.js
   ```

The server will run on:

```
http://localhost:4000
```

## Project Structure
```bash
src/
  controllers/
    aa.controller.js
    data.controller.js

  models/
    AccountSnapshot.js
    EarnerSnapshot.js

  routes/
    aa.routes.js
    data.routes.js

  app.js
  server.js
```

## API Routes

Base path:
```bash
/api/aa
```

## POST /api/aa/ingest/student
* Stores student deposit transaction data in the AA database.
* Used only for seeding or mocking bank-side ingestion.
* Not called by the frontend or main server during runtime.

Request Body
```bash
{
  "email": "student@demo.com",
  "data": { /* student transaction JSON */ }
}
```
Behavior
* Stores student transaction snapshot
* Maps data using email as unique identifier

## POST /api/aa/ingest/earner

Stores earner financial data in the AA database.

Called once per financial instrument type.

Request Body
```bash
{
  "email": "earner@demo.com",
  "fiType": "deposit",
  "data": { /* earner FI JSON */ }
}
```

Supported fiType
* deposit
* recurring_deposit
* term_deposit
* mutual_funds

Behavior
* Stores FI data as raw snapshot
* No classification or processing performed

## GET /api/aa/data/student
Pull API used by the Lumi.ai main server.

Returns student transaction snapshot.

Query Parameters

* email – student email

Example
```bash
GET /api/aa/data/student?email=student@demo.com
```
Behavior
* Fetches latest student transaction snapshot
* Returns raw transaction JSON

## GET /api/aa/data/earner/deposit
Pull API for earner deposit transactions.

Used for salary and expense ingestion.

Query Parameters

* email – earner email

Example
```bash
GET /api/aa/data/earner/deposit?email=earner@demo.com
```

## GET /api/aa/data/earner/recurring-deposit
Pull API for Recurring Deposit (RD) snapshot.

Example
```bash
GET /api/aa/data/earner/recurring-deposit?email=earner@demo.com
```

## GET /api/aa/data/earner/term-deposit
Pull API for Term Deposit (FD) snapshot.

Example
```bash
GET /api/aa/data/earner/term-deposit?email=earner@demo.com
```

## GET /api/aa/data/earner/mutual-funds
Pull API for Mutual Fund snapshot.

Example
```bash
GET /api/aa/data/earner/mutual-funds?email=earner@demo.com
```

## Design Notes
* Email is used as the unique AA identity key.
* AA backend never pushes data.
* All data is pulled explicitly by the main server.
* No role logic, classification, or vector processing exists here.

### Usage in Lumi.ai Architecture
```bash
Main Server  --->  AA Backend  --->  MongoDB
```
Main server decides when and what to pull.

AA backend only acts as a secure data vault.
