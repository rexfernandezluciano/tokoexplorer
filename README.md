<!-- @format -->

# Toko Explorer

A block explorer for TokoChain, built with React.js.

This project aims to provide a user-friendly interface for exploring the TokoChain blockchain. We welcome contributions from the community to help improve and
expand its functionality.

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/rexfernandezluciano/tokoexplorer.git
   cd tokoexplorer
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Start the Development Server:**

   ```bash
   npm start
   ```

   This will start the application and open it in your browser at `http://localhost:3000`.

## Prerequisites

- **Node.js:** Version 22 or higher. You can download it from [https://nodejs.org/](https://nodejs.org/).
- **npm:** (Usually included with Node.js)
- **React.js:** Version 19.1 or higher. This will be installed as a dependency when you run `npm install`.

## Contributing

We encourage contributions to Toko Explorer! Here's how you can help:

- **Report Bugs:** If you find a bug, please create a new issue on GitHub with a clear description of the problem and steps to reproduce it.
- **Suggest Enhancements:** Have an idea for a new feature or improvement? Create a new issue to discuss it.
- **Submit Pull Requests:** If you've fixed a bug or implemented a new feature, submit a pull request. Please follow these guidelines:
  - **Branching:** Create a new branch for your changes, based on the `main` branch. Use a descriptive name for your branch (e.g., `fix-typo`,
    `add-transaction-filtering`).
  - **Code Style:** Follow the existing code style. Consider using a linter and formatter to ensure consistency.
  - **Testing:** Write unit tests for your changes whenever possible.
  - **Commit Messages:** Write clear and concise commit messages.
  - **Pull Request Description:** Provide a detailed description of your changes in the pull request. Explain the problem you're solving or the feature you're
    adding.

## Project Structure

Understanding the project structure can help you navigate the codebase and contribute more effectively. Here's a brief overview:

- `src/`: Contains the main source code for the application.
  - `client/`: Base API Client.
  - `config/`: App configurations (e.g. firebase).
  - `contents/`: Static assets files.
  - `components/`: Reusable React components.
  - `pages/`: React components representing different pages of the application (e.g., home page, block details page, transaction details page).
  - `router/`: Code for interacting with the TokoChain blockchain (e.g., fetching block data, transaction data).
  - `utils/`: Utility functions.
- `index.js`: Main application file.
- `RootLayout.jsx`: Base App Layout.
- `public/`: Contains static assets, such as images and the `index.html` file.
- `package.json`: Contains project metadata and dependencies.

## Further Development

Here are some potential areas for future development:

- **Transaction Filtering:** Allow users to filter transactions by address, type, or other criteria.
- **Address Details Page:** Create a page to display detailed information about a specific address, including its balance and transaction history.
- **Real-time Updates:** Implement real-time updates using WebSockets to display new blocks and transactions as they are added to the blockchain.
- **Improved Search Functionality:** Enhance the search functionality to allow users to search for blocks, transactions, and addresses more easily.
- **Mobile Responsiveness:** Ensure that the application is responsive and works well on mobile devices.

We look forward to your contributions!
