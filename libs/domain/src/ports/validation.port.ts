export interface ValidationServicePort {
	email(email: string): boolean
	password(password: string): boolean
}
