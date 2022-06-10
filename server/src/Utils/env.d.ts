import { Secret } from "jsonwebtoken";

declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URI: string;
    PORT: Number;
    ACCESS_TOKEN_SECRET: Secret;
    REFRESH_TOKEN_SECRET: Secret;
  }
}
