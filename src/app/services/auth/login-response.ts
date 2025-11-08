import { UserProfile } from "./user-profile";

export interface LoginResponse {
	auth: {
		jwtToken: string,
		expiration: string
	},
	profile: UserProfile
}
