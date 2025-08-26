# School Menu Expo app

The School Menu app is a mobile app built with [Expo](https://expo.dev) that displays the weekly lunch menu for a particular school. The app uses the Nutrislice API to fetch menu data.

## Overview

### Tech

| Technology                   | Description                                                    |
| ---------------------------- | -------------------------------------------------------------- |
| Expo                         | React Native framework                                         |
| Expo Router                  | Routing and navigation                                         |
| Fetch API                    | Network requests                                               |
| React Query                  | Data fetching and caching                                      |
| Jest                         | A library for handling gestures in React Native applications   |
| React Native Testing Library | A library for building animations in React Native applications |
| MSW                          | Mocking network requests                                       |
| ESLint                       | Code linting                                                   |
| Prettier                     | Code formatting                                                |

### ESLint & Prettier

ESLint and Prettier are used to enforce consistent code style and maintain code quality.

ESLint rules are defined in the `.eslint.config.js` file and include:

- `react-native/no-unused-styles` to catch any unused styles
- `simple-import-sort/imports` to sort imports for consistency
- `unused-imports/no-unused-imports` to remove any unused imports

Prettier rules are defined in the `.prettierrc` file.

### Features & Functionality

- Fetches current week's menu data from the Nutrislice API
  - API only returns a week's data as part of the response
  - API request format:
    ```
    https://dbqschools.api.nutrislice.com/menu/api/weeks/school/{school}/menu-type/lunch/{year}/{month}/{day}/
    ```
- Displays a list of menu data as pressable cards on the index screen
  - Filters out weekends
- Navigates to a detail screen when card is pressed
- Detail screen displays nutritional ionformation for each menu item including calories, carbs, fat, and protein
- Users can navigate back to the index screen using the back button

### Screenshots

<img src="./assets/screenshots/List%20screen.png" width="200"/>
<img src="./assets/screenshots/Detail%20screen.png" width="200"/> 
<img src="./assets/screenshots/Error%20screen.png" width="200"/>

### Not Yet Implemented

- Full accessibility support and accessibility testing
- E2E testing for user flows
- Design System

### Feature Enhancements

- [ ] Ability to change week
- [ ] Ability to view monthly menu
- [ ] Ability to change school
- [ ] Ability to select multiple schools (for parents with children in different schools)
- [ ] Calendar integration to add menu to shared calendars
- [ ] Dark/light/system theme support

## Getting started

### Prerequisites

- Node (v18+)
- npm
  - another package manager may be used, but I used npm for this project
- Expo CLI
  - Installed by running `npm install -g expo-cli`
- iOS Simulator
- Android Emulator

### Running the project

1. Clone the repository

   ```
   git clone https://github.com/itaha/school-menu.git
   cd school-menu
   ```

2. Navigate to the project directory

   ```
   cd school-menu
   ```

3. Install dependencies

   ```bash
   npm install
   ```

4. Start development server

   ```bash
   npm run start
   ```

5. To run the app on iOS simulator, follow the instructions on the terminal.

   ```
   › Press i │ open iOS simulator
   ```

   Note: If not already installed, this will prompt you to install an updated version of Expo Go on your emulator.

6. To run the app on the Android emulator, follow the instructions on the terminal.

   ```bash
   Press a │ open Android
   ```

## Testing

Tests are written using [Jest](https://jestjs.io), [React Native Testing Library](https://callstack.github.io/react-native-testing-library/) and [MSW](https://mswjs.io), for mocking network requests.

Tests are located in `__tests__` directories within the folders containing the code being tested. For example, tests for the `app/index.tsx` file would be located in the `app/__tests__` directory, based on guidance from Expo [documentation](https://docs.expo.dev/develop/unit-testing/#structure-your-tests).

> Note: When using Expo Router, do not put your test files inside the app directory. All files inside your app directory must be either routes or layout files. Instead, use the **tests** directory or a separate directory.

### Running tests

To run the tests, run the following command in the terminal:

```bash
npm run test
```

This will run the tests in the terminal and generate a coverage report in the `coverage` directory and output a coverage summary in the terminal.
