
declare namespace App {
	interface Locals {
		user?: {
			id: string;
			firstname: string;
			lastname: string;
			email: string;
			isAdmin: boolean;
		} | null,
		token: string;
	}
}
