export const UserRoleEnum = {
	artist: "artist",
	fan: "fan",
	admin: "admin",
} as const

export type UserRoleType = (typeof UserRoleEnum)[keyof typeof UserRoleEnum]
