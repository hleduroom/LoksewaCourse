ALTER TABLE "video" ALTER COLUMN "size" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "video" ALTER COLUMN "duration" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "video" ADD COLUMN "asset_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "video" ADD COLUMN "secure_url" text NOT NULL;--> statement-breakpoint
ALTER TABLE "video" ADD COLUMN "playback_url" text NOT NULL;--> statement-breakpoint
ALTER TABLE "video" ADD COLUMN "folder" text NOT NULL;--> statement-breakpoint
ALTER TABLE "video" ADD COLUMN "format" text NOT NULL;--> statement-breakpoint
ALTER TABLE "video" ADD COLUMN "width" integer;--> statement-breakpoint
ALTER TABLE "video" ADD COLUMN "height" integer;--> statement-breakpoint
ALTER TABLE "video" ADD CONSTRAINT "video_asset_id_unique" UNIQUE("asset_id");--> statement-breakpoint
ALTER TABLE "video" ADD CONSTRAINT "video_public_id_unique" UNIQUE("public_id");