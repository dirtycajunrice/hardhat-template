export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PRIVATE_KEY: `0x${string}`;
    }
  }
}