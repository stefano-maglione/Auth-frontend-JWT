export interface RegisterResponse {
  message: string;
}

export interface JwtPayload {
  sub: string; // Email (subject)
  role: string | string[]; // Role (could be a string or array of strings)
  fingerprint: string; // Hashed fingerprint value
  iat: number; // Issued at timestamp
  exp: number; // Expiration timestamp
}
