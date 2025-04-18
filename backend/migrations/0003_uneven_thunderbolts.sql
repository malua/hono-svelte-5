CREATE TABLE `softwares_to_tags` (
	`softwareId` text NOT NULL,
	`tagId` text NOT NULL,
	PRIMARY KEY(`softwareId`, `tagId`),
	FOREIGN KEY (`softwareId`) REFERENCES `software`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tagId`) REFERENCES `tag`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE `software` DROP COLUMN `tags`;