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

## Installation

To set up the project on your local machine, follow these steps:

### 1. Clone the Repository

Clone the repository from GitHub and navigate into the project directory:

```bash
git clone https://github.com/your-username/reqres-playwright-tests-js.git
cd reqres-playwright-tests-js

### 2. Install npm
