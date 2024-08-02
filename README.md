# Reqres API Testing with Playwright

This project demonstrates API testing using [Playwright](https://playwright.dev/) with JavaScript. It targets the [Reqres API](https://reqres.in/) and covers various test scenarios, including positive and negative cases, end-to-end workflows, and environment-specific configurations.

## Project Structure

```plaintext
reqres-playwright-tests-js/
│
├── tests/                    # Test files for Playwright
│   └── api.spec.js           # API test cases
│
├── .env.test                 # Environment variables for the Test environment
├── .env.stage                # Environment variables for the Stage environment
│
├── .gitignore                # Git ignore file
├── package.json              # Project metadata and dependencies
├── package-lock.json         # Dependency lock file
├── playwright.config.js      # Playwright configuration
├── README.md                 # Project documentation
└── node_modules/             # Installed packages (ignored)

Setup Environment
Prerequisites
Node.js (version 16.x or higher)
npm (usually comes with Node.js)
Installation
Clone the Repository:

bash
Copy code
git clone https://github.com/your-username/reqres-playwright-tests-js.git
cd reqres-playwright-tests-js
Install Dependencies:

bash
Copy code
npm install
Install Playwright Browsers:

bash
Copy code
npx playwright install
Configure Environment Variables:

Create .env.test and .env.stage files in the project's root directory with the following content:

.env.test

plaintext
Copy code
BASE_URL=https://reqres.in
EMAIL=eve.holt@reqres.in
PASSWORD=cityslicka
INVALID_PASSWORD=wrongpassword
.env.stage

plaintext
Copy code
BASE_URL=https://reqres.in
EMAIL=eve.holt@reqres.in
PASSWORD=cityslicka
INVALID_PASSWORD=wrongpassword
Run Tests
Running Tests in Different Environments
Test Environment:

bash
Copy code
NODE_ENV=test npx playwright test
Stage Environment:

bash
Copy code
NODE_ENV=stage npx playwright test
Generating Reports
By default, Playwright generates an HTML report in the playwright-report folder after test execution.

You can configure report settings in playwright.config.js if needed.