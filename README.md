# ShopEase

A full-stack e-commerce web
application built to practice 
software testing, API testing, 
database validation, and bug 
reporting.

## Features

- User registration and login
- Secure password hashing with bcrypt
- Product search and category filtering
- Product details and quantity management
- Shopping cart functionality
- Checkout and order confirmation
- REST API for authentication
- MySQL database integration

## Tech Stack

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- MySQL
- bcrypt
- Postman

## QA Testing

- Functional testing: 40 test cases
- API testing: 25 test cases
- Database testing: 8 test cases
- Total test cases: 73
- Passed: 73
- Failed: 0
- Pass rate: 100%
- Bugs found and fixed: 4

## Bugs Found and Fixed

1. No "No products found" message appeared for unsuccessful searches.
2. Product search ignored the selected category filter.
3. Invalid product URLs displayed the default Smartphone instead of an error.
4. Login API crashed when the password field was missing.

## Project Structure

- `public/` — Frontend files
- `server.js` — Express backend and API routes
- `package.json` — Node.js dependencies and project configuration
- `.gitignore` — Protects sensitive and unnecessary files
- `README.md` — Project documentation

## How to Run

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Create a `.env` file with the required database credentials.
4. Start the server with `node server.js`.
5. Open `http://localhost:3000` in a browser.

## QA Documentation

- Functional test cases
- API test cases
- Database validation tests
- Bug reports
- Test execution summary

## Project Purpose

ShopEase is a full-stack e-commerce 
project built to understand how an 
e-commerce website is developed and 
how its functionality can be tested. 
The project covers frontend 
development, backend APIs, database 
integration, authentication, shopping 
cart, checkout, and order 
confirmation, along with functional 
testing, API testing, database 
validation, bug reporting, and 
retesting.