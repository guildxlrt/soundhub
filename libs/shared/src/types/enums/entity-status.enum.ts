export const PublicationStatusEnum = {
	draft: "draft",
	public: "public",
	private: "private",
	archived: "archived",
} as const

export type PublicationStatusType =
	(typeof PublicationStatusEnum)[keyof typeof PublicationStatusEnum]

export const UserStatusEnum = {
	draft: "draft",
	invited: "invited",
	active: "active",
	suspended: "suspended",
	archived: "archived",
} as const

export type UserStatusType = (typeof UserStatusEnum)[keyof typeof UserStatusEnum]
