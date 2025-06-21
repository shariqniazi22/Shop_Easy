//write me helper functions in JavaScript that provide utility functions for formatting dates, generating unique IDs, and validating email addresses
export const Helpers = {
  formatDate: (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  },

  generateUniqueId: () => {
    return "id-" + Math.random().toString(36).substr(2, 16);
  },

  validateEmail: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  },
};
// Usage example:
// console.log(Helpers.formatDate('2023-10-01')); // Output: October 1, 2023
// console.log(Helpers.generateUniqueId()); // Output: id-abc123xyz456
// console.log(Helpers.validateEmail('
