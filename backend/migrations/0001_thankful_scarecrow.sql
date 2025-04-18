CREATE TABLE `software` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`tags` text DEFAULT '[]' NOT NULL,
	`websiteUrl` text DEFAULT '',
	`githubUrl` text DEFAULT '',
	`created_at` integer DEFAULT current_timestamp NOT NULL,
	`updated_at` integer DEFAULT current_timestamp NOT NULL
);
