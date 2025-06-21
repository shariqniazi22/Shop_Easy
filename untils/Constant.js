//write me constant file in JavaScript that exports a constant object with various configuration settings
export const Constants = {
  API_BASE_URL: "https://api.example.com",
  TIMEOUT: 5000,
  MAX_RETRIES: 3,
  STORAGE_KEY: "app_data",
  THEME: {
    LIGHT: "light",
    DARK: "dark",
  },
  DEFAULT_LANGUAGE: "en",
  SUPPORTED_LANGUAGES: ["en", "es", "fr", "de"],
  ITEMS_PER_PAGE: 20,
  ERROR_MESSAGES: {
    NETWORK_ERROR: "Network error, please try again later.",
    NOT_FOUND: "Requested resource not found.",
    UNAUTHORIZED: "You are not authorized to perform this action.",
  },
};
// Usage example:
//where should i import this file in my application?
// This file can be imported wherever needed in the application to access the configuration settings.
// import { Constants } from './utils/Constants';
// console.log(Constants.API_BASE_URL);
// console.log(Constants.THEME.LIGHT);
// console.log(Constants.ERROR_MESSAGES.NETWORK_ERROR);
// This file can be imported wherever needed in the application to access the configuration settings.
// This allows for easy management of configuration settings and ensures consistency across the application.
// It also makes it easier to update settings in one place without having to search through the codebase.
// This is particularly useful for settings that may change based on environment (development, production, etc.)
// This file can be imported wherever needed in the application to access the configuration settings.
// This allows for easy management of configuration settings and ensures consistency across the application.
// It also makes it easier to update settings in one place without having to search through the codebase.
// This is particularly useful for settings that may change based on environment (development, production, etc.)
// This file can be imported wherever needed in the application to access the configuration settings.
// This allows for easy management of configuration settings and ensures consistency across the application.
