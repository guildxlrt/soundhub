export abstract class BaseEntity {
	readonly id: number
	readonly createdAt: Date

	constructor(id: number, createdAt: Date) {
		this.id = id
		this.createdAt = createdAt
	}
}
