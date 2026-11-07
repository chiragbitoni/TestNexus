# TestNexus

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)](https://tailwindcss.com/)

**TestNexus** is an open-source interactive test analytics and telemetry dashboard designed for QA engineering and test automation teams. It transforms test execution outputs (from TestNG, Selenium, Playwright, Cypress) into actionable insights with grid filtering, PDF/Excel report exports, and detailed failure diagnostics.

---

## Features

- **Test Run Timeline:** Browse chronological test execution runs, total test durations, and pass/fail distributions.
- **Interactive FlexGrid:** Powered by Mescius Wijmo FlexGrid with column sorting, live search filtering, auto-row resizing, and status badge styling (Passed in green, Failed in red, Skipped in amber).
- **Export Capabilities:** Export full test runs with custom headers and styling to **Excel (`.xlsx`)** or **PDF** documents directly from the browser.
- **Diagnostics & Stack Traces:** Inspect exception stack traces, error messages, and execution durations (`timeMs` / `timeSpan`) per test case.
- **Resilient Data Ingestion:** Reads test telemetry from environment paths, local output directories (`target/test-results.json`), or bundled sample test data.

---

## Quick Start

### 1. Prerequisites
- **Node.js 20+**
- **npm** or **pnpm**

### 2. Installation
```bash
git clone https://github.com/chiragbitoni/TestNexus.git
cd TestNexus
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Connecting Your Test Automation Suite

TestNexus ingests standard test results in JSON format. For example, using the `TestResultListener` in [SeleniumJavaAutomationFramework](https://github.com/chiragbitoni/SeleniumJavaAutomationFramework), your test suite automatically emits:

```json
[
  {
    "Run ID": "run-001",
    "Execution Date": "2026-11-07 14:00:00",
    "Total Time": "00:01:25.430",
    "Total Test Cases": 15,
    "Test Cases": [
      {
        "testCaseId": "TC014",
        "testName": "TC014",
        "description": "TC014: Validate button enables after 5 seconds",
        "status": "PASSED",
        "timeMs": 5120,
        "message": "No errors"
      }
    ]
  }
]
```

Set the `TEST_RESULTS_PATH` environment variable to point to your suite's `test-results.json` file:
```bash
# Windows PowerShell
$env:TEST_RESULTS_PATH = "C:\path\to\target\test-results.json"
npm run dev
```

---

## License

This project is licensed under the [MIT License](LICENSE).
