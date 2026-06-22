# CocktailMasterFrontend

## Overview

**CocktailMasterFrontend** is a mobile application built with React Native and Expo for discovering, searching, and learning cocktail recipes. The app allows users to browse cocktails, filter by category, search by name or ingredients, view detailed instructions, and access animated preparation steps for supported drinks.

It also includes authentication flows for login and registration, with token storage handled securely on the device.

## Main Features

- Browse cocktails from the app's own cocktail catalog
- Search cocktails by name and ingredients
- Filter cocktails by type (e.g. alcoholic / virgin)
- View detailed cocktail information, ingredients, and preparation steps
- Open animated recipe walkthroughs for supported cocktails
- User authentication with login and registration

## Backend Repository

The API backend used by this frontend is hosted in the following repository:

- https://github.com/MolnarFerenc123/cocktail_master_backend

Make sure the backend is running before starting the frontend, or update the API base URL in [src/core/config.js](src/core/config.js) if your backend uses a different address.

## Technologies Used

- **React Native** – mobile app framework
- **Expo** – development and runtime environment for React Native apps
- **React Navigation** – screen navigation and tab navigation
- **Expo Secure Store** – secure local storage for auth tokens
- **React Native SVG** – rendering SVG-based animation assets
- **JavaScript / JSX** – app logic and UI components

## Project Structure

- `src/core` – app-wide config and theme settings
- `src/data` – data sources, DTOs, and repositories
- `src/domain` – entities and use cases
- `src/presentation` – screens, view models, context, and animation assets

## Prerequisites

Before running the project, make sure you have the following installed:

- Node.js (recommended latest LTS version)
- npm or yarn
- Expo CLI (optional, but can be used if you prefer)
- A mobile emulator/simulator, or the Expo Go app on your phone

## Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd CocktailMasterFrontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Project

Start the Expo development server:

```bash
npm start
```

You can then run the app with one of the following commands:

- For Android:
  ```bash
  npm run android
  ```

- For iOS:
  ```bash
  npm run ios
  ```

- For web:
  ```bash
  npm run web
  ```

## Configuration Notes

The frontend expects the backend API to be available at the URL defined in [src/core/config.js](src/core/config.js). By default, it uses the local development backend address configured for Expo.

If your backend runs on a different host or port, update the configuration accordingly before starting the app.

## License

This project is for educational/demo purposes unless otherwise specified by the repository owner.
