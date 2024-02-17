import { IFullLabel, ILabelName, LabelID, ItemStatusEnum, ItemStatusType } from "Shared"
import { dbClient } from "../database"
import { Label, LabelsBackendRepos } from "Domain"
import { DatabaseErrorHandler } from "../utils"

export class LabelsImplement implements LabelsBackendRepos {
	private label = dbClient.label

	async create(data: Label): Promise<boolean> {
		try {
			const { creationDate, name, bio, country, website, logoPath } = data

			return await this.label
				.create({
					data: {
						status: ItemStatusEnum.public,
						creationDate: creationDate,
						name: name,
						bio: bio,
						country: country,
						website: website,
						logoPath: logoPath,
					},
				})
				.then(() => {
					return true
				})
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async edit(data: Label): Promise<boolean> {
		try {
			const { id, creationDate, name, bio, country, website, logoPath } = data

			return await this.label
				.update({
					where: { id: id as number },
					data: {
						creationDate: creationDate,
						name: name,
						bio: bio,
						country: country,
						website: website,
						logoPath: logoPath,
					},
				})
				.then(() => {
					return true
				})
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async setStatus(data: { id: number; status: ItemStatusType }): Promise<boolean> {
		try {
			const { id, status } = data

			return await this.label
				.update({
					where: { id: id as number },
					data: {
						status: status,
					},
				})
				.then(() => {
					return true
				})
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async get(id: LabelID): Promise<IFullLabel> {
		try {
			return await this.label.findUniqueOrThrow({
				where: { id: id },
			})
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async search(country: string): Promise<ILabelName[]> {
		try {
			return await this.label.findMany({
				where: { country: country },
				select: {
					id: true,
					name: true,
				},
			})
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async checkRights(id: number): Promise<boolean> {
		try {
			return await this.label
				.findUnique({
					where: {
						id: id,
						status: ItemStatusEnum.draft || ItemStatusEnum.public,
					},
				})
				.then((data) => {
					if (!data) return false
					else return true
				})
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async getLogoPath(id: LabelID): Promise<string | null> {
		try {
			const { logoPath } = await this.label.findUniqueOrThrow({
				where: {
					id: id,
				},
				select: {
					logoPath: true,
				},
			})
			return logoPath
		} catch (error) {
			throw DatabaseErrorHandler.handle(error).setMessage("error to get image path")
		}
	}

	async setLogoPath(path: string | null, id: LabelID): Promise<boolean> {
		try {
			await this.label.update({
				where: {
					id: id,
				},
				data: {
					logoPath: path,
				},
			})
			return true
		} catch (error) {
			throw DatabaseErrorHandler.handle(error).setMessage("error to get image path")
		}
	}
}
