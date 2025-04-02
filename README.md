# ExpressReactSSO

This project is designed to enable Single Sign-On (SSO) functionality across multiple platforms using Auth0.

## Project Structure

```
ExpressReactSSO/
├── Client/       # React client using Vite
├── Client2/      # Another React client using Vite
├── Server/       # Node.js/Express backend
```

## Installation and Running the Project

### Client (Client & Client2)
1. Navigate to the respective client folder:
   ```sh
   cd Client  # or cd Client2
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the development server:
   ```sh
   npm run dev
   ```

### Server
1. Navigate to the `Server` directory:
   ```sh
   cd Server
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   npm run dev
   ```

## Technologies Used
- **React (Vite)** - Frontend framework for building user interfaces.
- **Node.js/Express** - Backend server handling authentication and API requests.
- **Auth0** - Used for implementing Single Sign-On (SSO) authentication.

## Authentication
This project utilizes **Auth0** for managing authentication and SSO across multiple platforms. Ensure you have configured your Auth0 tenant properly and updated the necessary environment variables in both the client and server applications.

## Environment Variables
Create a `.env` file in both the **Client** and **Server** folders with the required Auth0 configuration details.

Example for Client:
```
VITE_AUTH0_DOMAIN=your-auth0-domain
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_AUTH0_AUDIENCE=your-auth0-audience
```

Example for Server:
```
AUTH0_DOMAIN=your-auth0-domain
AUTH0_CLIENT_ID=your-auth0-client-id
AUTH0_CLIENT_SECRET=your-auth0-client-secret
AUTH0_AUDIENCE=your-auth0-audience
```

