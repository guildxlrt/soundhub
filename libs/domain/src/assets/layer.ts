export abstract class EntityLayer {
	id: number | undefined
	createdAt?: Date

	constructor(id: number | undefined, createdAt?: Date) {
		this.id = id
		this.createdAt = createdAt
	}
}
