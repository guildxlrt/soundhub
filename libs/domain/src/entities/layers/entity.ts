export abstract class EntityLayer {
	readonly id: number | null
	readonly createdAt?: Date

	constructor(id: number | null) {
		this.id = id
		this.createdAt = new Date()
	}
}
