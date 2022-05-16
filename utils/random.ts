export const random = (min = 0, max = 1) =>
    Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + min);
