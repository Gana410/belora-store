export const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
export const isValidPhone = (value) => /^\+?[0-9\s().-]{7,18}$/.test(value.trim()) && value.replace(/\D/g, "").length >= 7;
export const isValidPostal = (value) => /^[A-Za-z0-9][A-Za-z0-9\s-]{2,9}$/.test(value.trim());
