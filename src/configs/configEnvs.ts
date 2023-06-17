import dotenv from 'dotenv';

dotenv.config({});

class Config {
  public DATABASE_URL: string | undefined;
  public NODE_ENV: string | undefined;
  public JWT_TOKEN: string | undefined;
  public SECRET_KEY_COOKIE: string | undefined;
  public CLIENT_URL: string | undefined;
  public SERVER_PORT: string | undefined;
  public BASE_PATH: string | undefined;
  public SALT_ROUND: string | undefined;

  constructor() {
    this.DATABASE_URL = process.env.DATABASE_URL;
    this.NODE_ENV = process.env.NODE_ENV;
    this.JWT_TOKEN = process.env.JWT_TOKEN;
    this.SECRET_KEY_COOKIE = process.env.SECRET_KEY_COOKIE;
    this.CLIENT_URL = process.env.CLIENT_URL;
    this.SERVER_PORT = process.env.SERVER_PORT;
    this.BASE_PATH = process.env.BASE_PATH;
    this.SALT_ROUND = process.env.SALT_ROUND;
  }

  public validateConfig(): void {
    console.log(this);
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) {
        throw new Error(`Configuration ${key} is undefined`);
      }
    }
  }
}

export const config: Config = new Config();
