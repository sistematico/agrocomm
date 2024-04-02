CREATE TABLE `cities` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`state_id` integer,
	FOREIGN KEY (`state_id`) REFERENCES `states`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `movies` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`release_year` integer
);
--> statement-breakpoint
CREATE TABLE `states` (
	`id` integer PRIMARY KEY NOT NULL,
	`abbr` text,
	`name` text
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text,
	`username` text NOT NULL,
	`password` text NOT NULL,
	`created_at` text DEFAULT '2024-04-02T18:14:43.409Z' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `nameIdx` ON `states` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);