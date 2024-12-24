import { ApplicationError, ErrorTypes } from '../errors';

export class DatabaseError extends ApplicationError {
  constructor(message: string, raw: unknown) {
    super({ type: ErrorTypes.DATABASE, message, raw });
  }
}

export class ConnectionError extends DatabaseError {
  constructor(raw: unknown) {
    super('Failed to connect to database', raw);
  }
}

export class QueryError extends DatabaseError {
  constructor(raw: unknown) {
    super('Failed ot execute query', raw);
  }
}
