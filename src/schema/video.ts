import {
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

// Services
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).unique().notNull(),
});

// Levels
export const levels = pgTable("levels", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  serviceId: integer("service_id")
    .references(() => services.id)
    .notNull(),
});

// Videos
export const videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).unique().notNull(),
  title: text("title").notNull(),
  description: text("description"),
  thumbnail: text("thumbnail"),
  previewVideoUrl: text("preview_video_url"),
  subscription: varchar("subscription", { length: 10 }).notNull(), // 'free' or 'paid'
  price: varchar("price", { length: 50 }),
  tutor: jsonb("tutor").notNull(), // { name, avatar, bio }
  rating: integer("rating"),
  students: integer("students"),
  totalLectures: integer("total_lectures"),
  totalDuration: varchar("total_duration", { length: 50 }),
  chapters: jsonb("chapters").notNull(), // [{ title, duration, videoUrl }]
  levelId: integer("level_id")
    .references(() => levels.id)
    .notNull(),
});
