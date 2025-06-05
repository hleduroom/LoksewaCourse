CREATE TABLE "video" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"url" text NOT NULL,
	"size" integer NOT NULL,
	"public_id" text NOT NULL,
	"duration" numeric(2) NOT NULL,
	"chapter_id" uuid,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "video" ADD CONSTRAINT "video_chapter_id_chapter_id_fk" FOREIGN KEY ("chapter_id") REFERENCES "public"."chapter"("id") ON DELETE set null ON UPDATE no action;