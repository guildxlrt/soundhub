export const ItemStatusEnum = {
	draft: "draft",
	public: "public",
	private: "private",
	archived: "archived",
} as const

export type ItemStatusType = (typeof ItemStatusEnum)[keyof typeof ItemStatusEnum]

export const UserStatusEnum = {
	draft: "draft",
	invited: "invited",
	active: "active",
	suspended: "suspended",
	archived: "archived",
} as const

export type UserStatusType = (typeof UserStatusEnum)[keyof typeof UserStatusEnum]
