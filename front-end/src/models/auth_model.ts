export interface Auth {
  token: string
}

export class AuthenticationForm {
  constructor(
    public username: string,
    public password: string,
  ) {  }
}