CREATE TABLE "muxData" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"is_published" boolean DEFAULT true NOT NULL,
	"chapter_id" uuid,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "muxData" ADD CONSTRAINT "muxData_chapter_id_chapter_id_fk" FOREIGN KEY ("chapter_id") REFERENCES "public"."chapter"("id") ON DELETE set null ON UPDATE no action;