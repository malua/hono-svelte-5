ALTER TABLE `software` RENAME TO `entries`;--> statement-breakpoint
ALTER TABLE `softwares_to_tags` RENAME TO `entries_to_tags`;--> statement-breakpoint
ALTER TABLE `tag` RENAME TO `tags`;--> statement-breakpoint
ALTER TABLE `entries_to_tags` RENAME COLUMN "softwareId" TO "entryId";--> statement-breakpoint
DROP TABLE `post`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_entries_to_tags` (
	`entryId` text NOT NULL,
	`tagId` text NOT NULL,
	PRIMARY KEY(`entryId`, `tagId`),
	FOREIGN KEY (`entryId`) REFERENCES `entries`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tagId`) REFERENCES `tags`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_entries_to_tags`("entryId", "tagId") SELECT "entryId", "tagId" FROM `entries_to_tags`;--> statement-breakpoint
DROP TABLE `entries_to_tags`;--> statement-breakpoint
ALTER TABLE `__new_entries_to_tags` RENAME TO `entries_to_tags`;--> statement-breakpoint
PRAGMA foreign_keys=ON;