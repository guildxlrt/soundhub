export class EntityId {
	readonly value: number

	private constructor(value: number) {
		this.value = value
	}

	public static create(value: number) {
		if (Number.isInteger(value)) {
			return new EntityId(value)
		} else {
			throw Error("invalid value")
		}
	}
}
