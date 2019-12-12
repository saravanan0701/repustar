export interface ILoginRequest {
  username: String;
  password: String;
}

export interface ILoginResponse {
  token: String;
  user: String;
}