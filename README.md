SauceDemo Playwright Tests 🚀


Automated end-to-end tests for SauceDemo
 demonstrating UI automation, cross-browser testing, and performance evaluation using Playwright.

🔹 Highlights

Fully automated end-to-end UI tests for product and shopping workflows

Cross-browser execution: Chromium, Firefox, WebKit

Scenarios include:

Adding products to cart

Sorting and filtering products

Detecting slow-loading pages for specific users

HTML reports

Organized for scalability and CI/CD integration

💻 Installation

Clone the repository:

git clone https://github.com/nadjacelsalc/saucedemo-playwright-tests.git
cd saucedemo-playwright-tests


Install dependencies:

npm install


Install Playwright browsers:

npx playwright install

📂 Project Structure
saucedemo-playwright-tests/
│

├─ tests/                  # Test scripts by feature

├─ .github/workflows/      # CI/CD pipelines

├─ playwright.config.js    # Playwright configuration

├─ package.json            # Node.js dependencies

├─ playwright-report/      # HTML reports, screenshots, videos

├─ bug report.pdf          # Documented failed tests

└─ test plan.pdf           # Testing strategy and plan

▶ Running Tests

Run all tests:

npx playwright test


Run tests in a specific browser:

npx playwright test --project=chromium


Run a single test file:

npx playwright test tests/products.spec.js


View HTML reports:

npx playwright show-report

🛠 Known Test Cases

Test Case	Description	Status

TC-013	Cannot add product with broken image (problem_user)	Known issue

TC-014	Sorting Z-A does not reorder correctly (problem_user)	Known issue

TC-015	Products load slowly (performance_glitch_user)	Known issue



🚀 Skills Demonstrated

End-to-end test automation with Playwright

Cross-browser testing: Chromium, Firefox, WebKit

Debugging, logging, and failure reporting

Test documentation and structured bug reporting

Performance and usability testing for web application
