export * from "./CatchError";
export * from "./tokens";
export * from "./passwordValidator";

export const getRandomKey = () => Math.random().toString(36).slice(2);
