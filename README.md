## Message from the Author

In case there is no need to keep the design, I decided to use a template with Tailwind CSS and make changes via technical documentation. If it is necessary to create everything from scratch, I might have made a mistake.

## Setup

To set up the project locally, follow these steps:

1. **Clone the repository**:
   git clone https://github.com/yourusername/invoicesapp.git
   cd invoicesapp

2. npm install

3. npm run dev

4. For login: username - admin@tempmail.com, password - admin

## Invoices Management

- The application fetches invoices data from the server and displays it in a list.
- Clicking on an invoice opens a popup with detailed information.

## User Authentication

- The login form validates user credentials using Zod.
- On successful login, the authentication token is stored in local storage.
- The token is used for subsequent requests to fetch invoices data.

## Token Storage

- The authentication token is stored in local storage.
- **Note**: Storing tokens in local storage is not a best practice due to security concerns. Consider using HTTP-only cookies for better security.
- For local storage, ensure the token has a short expiration time to mitigate risks.

## Code Structure

- **src/components**: Contains React components.
- **src/features**: Contains Redux slices and React Query hooks.
- **src/hooks**: Contains custom hooks.
- **src/types**: Contains TypeScript type definitions.
- **src/utils**: Contains utility functions.
