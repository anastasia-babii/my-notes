export enum ErrorMessages {
  Unauthorized = "Incorrect password or username.",
  UserAlreadyExists = "User already exist.",
  PasswordRequirements = "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 special character, and 1 number.",
  NoTokenProvided = "No token provided",
  InvalidTokenFormat = "Invalid token format",
  InvalidToken = "Invalid token",
  NoteNotFound = "Note not found",
  UserNotFound = "User not found. The requested user could not be located.",
}
