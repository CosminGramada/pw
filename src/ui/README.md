# UI tests

On top of the API Tests the end-to-end UI tests are taking care of validating that the UI performs as expected from an end user point of view.

Tooling:

 1. [playwright](https://github.com/Microsoft/playwright)

It allows the identification of the HTML elements on the page and the interaction with them through actions like a normal user would do (click, type text, selecting from a drop-down, etc).

The UI tests are validating:

  - a user can login to the web application and validates that the correct user metadata is displayed
  - validating business scenarios like adding books through all the methods:
    - searching by ISBN
    - importing from a CSV file
    - adding it manually by providing all details
  - tests are being run in a headful browser to better simulate an end user behaviour and, if needed, can be switched to a headless one
  - test runner is included and along with an additional `allure` package the test results output is in an HTML format allowing the review of the failed tests along with steps taken in the UI and screenshots.
  - the HTML format report can be downloaded for every pipeline as a job artifact
  - parallelization is achieved by default based on the number of CPU cores available and can be further controlled, if needed, through the number of `workers`.
 

 ## Running the UI tests
 1. Clone the project
 2. Run `npm install` to install locally the needed packages
 3. Run the tests
    - the tests can be ran locally by running `npm run test:ui`. This approach will execute all the UI tests and display the results in the command line and also in an HTML format
    - debugging a single test file can be achieved using VisualStudio Code, opening the test file and using the Run functionality

 ## Technical debt and known issues
 Technical debts and known issues are being tracked and logged to be picked up when they're ready.

 Current known issues can be found under the following label: Cosmin-Gramada~UI