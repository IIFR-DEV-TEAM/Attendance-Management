
declare namespace App {
	interface Locals {
		user?: {
			id: string;
			name:string;
			email: string;
			isAdmin: boolean;
		} | null,
		token: string;
	}
}
