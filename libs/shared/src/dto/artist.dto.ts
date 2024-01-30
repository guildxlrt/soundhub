import { GenresArray, IAnyObject, ProfileID } from "../types"

export class NewArtistDTO {
	readonly name: string
	readonly bio: string
	readonly members: string[]
	readonly genres: GenresArray

	constructor(name: string, bio: string, members: string[], genres: GenresArray) {
		this.name = name
		this.bio = bio
		this.members = members
		this.genres = genres
	}

	static createFromInput(data: IAnyObject) {
		return new NewArtistDTO(data?.["name"], data?.["bio"], data?.["members"], data?.["genres"])
	}
}

export class UpdateArtistDTO {
	readonly name: string
	readonly bio: string
	readonly members: string[]
	readonly genres: GenresArray
	readonly delAvatar: boolean

	constructor(
		name: string,
		bio: string,
		members: string[],
		genres: GenresArray,
		delAvatar: boolean
	) {
		this.name = name
		this.bio = bio
		this.members = members
		this.genres = genres
		this.delAvatar = delAvatar
	}

	static createFromInput(data: IAnyObject) {
		return new UpdateArtistDTO(
			data?.["name"],
			data?.["bio"],
			data?.["members"],
			data?.["genres"],
			data?.["delAvatar"]
		)
	}
}

export class ArtistDTO {
	readonly id: ProfileID | null
	readonly createdAt: Date
	readonly name: string
	readonly bio: string
	readonly members: string[]
	readonly genres: GenresArray
	readonly avatarPath: string | null

	constructor(
		id: ProfileID | null,
		createdAt: Date,
		name: string,
		bio: string,
		members: string[],
		genres: GenresArray,
		avatarPath: string | null
	) {
		this.id = id
		this.createdAt = createdAt
		this.name = name
		this.bio = bio
		this.members = members
		this.genres = genres
		this.avatarPath = avatarPath
	}

	static createFromData(data: IAnyObject) {
		return new ArtistDTO(
			data?.["id"],
			data?.["createdAt"],
			data?.["name"],
			data?.["bio"],
			data?.["members"],
			data?.["genres"],
			data?.["avatarPath"]
		)
	}
}

export class ArtistShortDTO {
	readonly id: ProfileID | null
	readonly name: string
	readonly bio: string
	readonly members: string[]
	readonly genres: GenresArray
	readonly avatarPath: string | null

	constructor(
		id: ProfileID | null,
		name: string,
		bio: string,
		members: string[],
		genres: GenresArray,
		avatarPath: string | null
	) {
		this.id = id
		this.name = name
		this.bio = bio
		this.members = members
		this.genres = genres
		this.avatarPath = avatarPath
	}

	static createFromData(data: IAnyObject) {
		return new ArtistShortDTO(
			data?.["id"],
			data?.["name"],
			data?.["bio"],
			data?.["members"],
			data?.["genres"],
			data?.["avatarPath"]
		)
	}
}

export class ArtistShortestDTO {
	readonly id: ProfileID | null
	readonly name: string
	readonly genres: GenresArray

	constructor(id: ProfileID | null, name: string, genres: GenresArray) {
		this.id = id
		this.name = name
		this.genres = genres
	}

	static createFromData(data: IAnyObject): ArtistShortestDTO {
		return new ArtistShortestDTO(data?.["id"], data?.["name"], data?.["genres"])
	}

	static createArrayFromData(data: IAnyObject[]): ArtistShortestDTO[] {
		return data.map((artist): ArtistShortestDTO => {
			return new ArtistShortestDTO(artist?.["id"], artist?.["name"], artist?.["genres"])
		})
	}
}
