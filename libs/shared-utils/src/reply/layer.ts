export interface ReplyLayer<D> {
	readonly data?: D | undefined
	error?: {
		status: number
		message: string
	}
}
