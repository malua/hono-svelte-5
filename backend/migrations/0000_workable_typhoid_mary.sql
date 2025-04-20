CREATE TABLE `entries` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`websiteUrl` text DEFAULT '',
	`githubUrl` text DEFAULT '',
	`created_at` integer DEFAULT current_timestamp NOT NULL,
	`updated_at` integer DEFAULT current_timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE `entries_to_tags` (
	`entryId` text NOT NULL,
	`tagId` text NOT NULL,
	PRIMARY KEY(`entryId`, `tagId`),
	FOREIGN KEY (`entryId`) REFERENCES `entries`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tagId`) REFERENCES `tags`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text DEFAULT '' NOT NULL,
	`email` text NOT NULL,
	`hashedPassword` text NOT NULL,
	`isAdmin` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT current_timestamp NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);