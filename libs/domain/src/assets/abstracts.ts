export abstract class EntityLayer {
	id: number
	createdAt?: Date

	constructor(id: number, createdAt?: Date) {
		this.id = id
		this.createdAt = createdAt
	}
}

export interface OutputLayer<D> {
	readonly data: D | undefined
	error?: {
		status: number
		message: string
	}
}
