export interface PasswordServicePort {
	hash(password: string): Promise<string>
	areSimilar(inputPassword: string, hashedPassword: string): Promise<boolean>
	areDifferent(inputPassword: string, hashedPassword: string): Promise<boolean>
}
