export interface ValidationServicePort {
	email(email: string): Promise<boolean>
	password(password: string): Promise<boolean>
}
