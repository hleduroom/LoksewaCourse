CREATE TABLE "service" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	CONSTRAINT "service_title_unique" UNIQUE("title")
);
--> statement-breakpoint
ALTER TABLE "course" ADD COLUMN "service_id" uuid;--> statement-breakpoint
ALTER TABLE "course" ADD CONSTRAINT "course_service_id_service_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."service"("id") ON DELETE set null ON UPDATE no action;