class InfraError implements Error {
  _internal_error: any;

  constructor(err: any) {
    this._internal_error = err;
  }

  get message(): string {
    return `Infrastructure  error: ${this._internal_error}`;
  }

  get name(): string {
    return 'Infrastructure Error';
  }
}

class NotFound implements Error {
  _search_value: any;

  constructor(search_value: any) {
    this._search_value = search_value;
  }

  get message(): string {
    return `Result not found: ${this._search_value}`;
  }

  get name(): string {
    return 'NotFoundError';
  }
}

class InvalidRole implements Error {
  message: string;
  name = 'Invalid Role';

  constructor(role: string) {
    this.message = `Invalid Role: ${role}`;
  }
}

export { InfraError, NotFound, InvalidRole };
