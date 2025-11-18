export interface User {
id?: number; // optional for created users (JSONPlaceholder returns an id)
name: string;
email: string;
phone?: string;
username?: string;
website?: string;
}