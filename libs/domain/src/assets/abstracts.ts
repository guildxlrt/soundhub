export abstract class EntityLayer {
	readonly id: number
	readonly createdAt: Date

	constructor(id: number, createdAt: Date) {
		this.id = id
		this.createdAt = createdAt
	}
}

export interface InputLayer<D> {
	readonly data: D
}

export interface OutputLayer<D> {
	readonly data: D
	error?: {
		status: number
		message: string
	}
}
