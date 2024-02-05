export const UserProfileEnum = {
	artist: "artist",
	fan: "fan",
	admin: "admin",
} as const

export type UserProfileType = (typeof UserProfileEnum)[keyof typeof UserProfileEnum]
