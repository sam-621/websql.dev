export class ApplicationError extends Error {
  constructor(options: Options) {
    console.log({
      type: options.type,
      message: options.message,
      raw: options.raw
    });

    super(options.message);
  }
}

export enum ErrorTypes {
  DATABASE = 'Database Error'
}

type Options = {
  type: ErrorTypes;
  message: string;
  raw?: unknown;
};
