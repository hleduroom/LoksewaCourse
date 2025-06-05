import { relations } from "drizzle-orm";
import {
  boolean,
  decimal,
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  role: text("role"),
  banned: boolean("banned"),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  impersonatedBy: text("impersonated_by"),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

// COURSE SPECIFIC TABLES
export const category = pgTable("category", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").unique().notNull(),
  description: text("description"),
});
export const categoryRelations = relations(category, ({ many }) => ({
  courses: many(course),
}));
export const serviceTable = pgTable("service", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").unique().notNull(),
  description: text("description"),
  icon: varchar("icon", { length: 255 }).notNull().default("BookOpen"),

});
export const serviceTableRelations = relations(serviceTable, ({ many }) => ({
  courses: many(course),
}));

export const course = pgTable(
  "course",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    description: text("description"),
    content: text("content"),
    price: numeric("price"),
    thumbnailUrl: text("thumbnail_url"),
    thumbnailPublicId: text("thumbnail_public_id"),
    isPublished: boolean("is_published").default(false).notNull(),

    // NOT NULL
    categoryId: uuid("category_id").references(() => category.id, {
      onDelete: "set null",
    }),
    serviceId: uuid("service_id").references(() => serviceTable.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at").$defaultFn(
      () => /* @__PURE__ */ new Date()
    ),
    updatedAt: timestamp("updated_at").$defaultFn(
      () => /* @__PURE__ */ new Date()
    ),
  },
  (t) => [unique().on(t.title, t.categoryId)]
);
export const courseRelations = relations(course, ({ one, many }) => ({
  category: one(category, {
    fields: [course.categoryId],
    references: [category.id],
  }),
  service: one(serviceTable, {
    fields: [course.serviceId],
    references: [serviceTable.id],
  }),
  attachments: many(attachment),
  chapters: many(chapter),
  subscriptions: many(subscription),
}));

export const attachment = pgTable("attachment", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  url: text("url").notNull(),
  courseId: uuid("course_id")
    .references(() => course.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
export const attachmentRelations = relations(attachment, ({ one }) => ({
  course: one(course, {
    fields: [attachment.courseId],
    references: [course.id],
  }),
}));

export const chapter = pgTable(
  "chapter",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    description: text("description"),
    content: text("content"),
    videoUrl: text("video_url"),
    position: integer("position").notNull(),
    isPublished: boolean("is_published").default(false).notNull(),
    isFree: boolean("is_free").default(false).notNull(),

    courseId: uuid("course_id")
      .references(() => course.id, { onDelete: "cascade" })
      .notNull(),
    createdAt: timestamp("created_at").$defaultFn(
      () => /* @__PURE__ */ new Date()
    ),
    updatedAt: timestamp("updated_at").$defaultFn(
      () => /* @__PURE__ */ new Date()
    ),
  },
  (t) => [unique().on(t.title, t.courseId)]
);
export const chapterRelations = relations(chapter, ({ one, many }) => ({
  course: one(course, {
    fields: [chapter.courseId],
    references: [course.id],
  }),
  videos: many(video),
  muxData: many(muxData),
  userProgress: many(userProgress),
}));
export const muxData = pgTable("muxData", {
  id: uuid("id").primaryKey().defaultRandom(),
  playbackId: text("playback_id"),
  assetId: text("asset_id").notNull(),
  isPublished: boolean("is_published").default(true).notNull(),

  chapterId: uuid("chapter_id").references(() => chapter.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});
export const muxDataRelations = relations(muxData, ({ one }) => ({
  chapter: one(chapter, {
    fields: [muxData.chapterId],
    references: [chapter.id],
  }),
}));

export const video = pgTable("video", {
  id: uuid("id").primaryKey().defaultRandom(),

  assetId: text("asset_id").notNull().unique(),
  publicId: text("public_id").notNull().unique(),
  url: text("url").notNull(),
  secureUrl: text("secure_url").notNull(),
  playbackUrl: text("playback_url").notNull(),
  folder: text("folder").notNull(),
  duration: decimal("duration", {
    mode: "number",
    precision: 10,
    scale: 2,
  }).notNull(),
  format: text("format").notNull(),
  size: decimal("size", { mode: "number", precision: 10, scale: 2 }).notNull(),
  width: integer("width"),
  height: integer("height"),

  isPublished: boolean("is_published").default(false).notNull(),
  chapterId: uuid("chapter_id").references(() => chapter.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});
export const videoRelations = relations(video, ({ one }) => ({
  chapter: one(chapter, {
    fields: [video.chapterId],
    references: [chapter.id],
  }),
}));

// USER SPECIFIC
export const userProgress = pgTable(
  "user_progress",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    isCompleted: boolean("is_completed").default(false).notNull(),

    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    chapterId: uuid("chapter_id")
      .references(() => chapter.id, { onDelete: "cascade" })
      .notNull(),
    createdAt: timestamp("created_at").$defaultFn(
      () => /* @__PURE__ */ new Date()
    ),
    updatedAt: timestamp("updated_at").$defaultFn(
      () => /* @__PURE__ */ new Date()
    ),
  },
  (t) => [unique().on(t.userId, t.chapterId)]
);
export const userProgressRelations = relations(userProgress, ({ one }) => ({
  chapter: one(chapter, {
    fields: [userProgress.chapterId],
    references: [chapter.id],
  }),
}));

export const subscription = pgTable(
  "subscription",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    startDate: timestamp("start_date").notNull(),
    endDate: timestamp("end_date").notNull(),
    isActive: boolean("is_active").default(true).notNull(),

    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    courseId: uuid("course_id")
      .references(() => course.id, { onDelete: "cascade" })
      .notNull(),
    transactionId: uuid("transaction_id")
      .references(() => transaction.id, { onDelete: "cascade" })
      .notNull(),
    createdAt: timestamp("created_at").$defaultFn(() => new Date()),
    updatedAt: timestamp("updated_at").$defaultFn(() => new Date()),
  },
  (t) => [unique().on(t.userId, t.courseId)]
);
export const subscriptionRelations = relations(subscription, ({ one }) => ({
  user: one(user, { fields: [subscription.userId], references: [user.id] }),
  course: one(course, {
    fields: [subscription.courseId],
    references: [course.id],
  }),
  transaction: one(transaction, {
    fields: [subscription.transactionId],
    references: [transaction.id],
  }),
}));

export const transaction = pgTable("transaction", {
  id: uuid("id").primaryKey().defaultRandom(),
  amount: numeric("amount").notNull(),
  status: text("status").default("completed").notNull(),

  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  courseId: uuid("course_id")
    .references(() => course.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()),
});
export const transactionRelations = relations(transaction, ({ one }) => ({
  user: one(user, { fields: [transaction.userId], references: [user.id] }),
  course: one(course, {
    fields: [transaction.courseId],
    references: [course.id],
  }),
}));

// QUIZ SPECIFIC TABLES
export const quiz = pgTable("quiz", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  content: text("content"),
  isFree: boolean("is_free").default(false).notNull(),
  isPublished: boolean("is_published").default(false).notNull(),

  courseId: uuid("course_id")
    .references(() => course.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()),
});

export const quizRelations = relations(quiz, ({ one, many }) => ({
  course: one(course, {
    fields: [quiz.courseId],
    references: [course.id],
  }),
  questions: many(quizQuestion),
  attempts: many(quizAttempt),
}));

export const quizQuestion = pgTable("quiz_question", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  explanation: text("explanation"),
  options: text("options").array().notNull(),
  correctAnswer: text("correct_answer").notNull(),

  quizId: uuid("quiz_id")
    .references(() => quiz.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()),
});

export const quizQuestionRelations = relations(
  quizQuestion,
  ({ one, many }) => ({
    quiz: one(quiz, {
      fields: [quizQuestion.quizId],
      references: [quiz.id],
    }),
    answers: many(quizAttemptAnswer),
  })
);

export const quizAttempt = pgTable("quiz_attempt", {
  id: uuid("id").primaryKey().defaultRandom(),
  score: integer("score").default(0).notNull(),

  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  quizId: uuid("quiz_id")
    .references(() => quiz.id, { onDelete: "cascade" })
    .notNull(),

  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  duration: integer("duration").notNull(),

  createdAt: timestamp("created_at").$defaultFn(() => new Date()),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()),
});

export const quizAttemptRelations = relations(quizAttempt, ({ one, many }) => ({
  quiz: one(quiz, {
    fields: [quizAttempt.quizId],
    references: [quiz.id],
  }),
  user: one(user, {
    fields: [quizAttempt.userId],
    references: [user.id],
  }),
  answers: many(quizAttemptAnswer),
}));

export const quizAttemptAnswer = pgTable("quiz_attempt_answer", {
  id: uuid("id").primaryKey().defaultRandom(),
  isCorrect: boolean("is_correct").notNull(),
  selectedOption: text("selected_option").notNull(),

  attemptId: uuid("attempt_id")
    .references(() => quizAttempt.id, { onDelete: "cascade" })
    .notNull(),
  questionId: uuid("question_id")
    .references(() => quizQuestion.id, { onDelete: "cascade" })
    .notNull(),

  createdAt: timestamp("created_at").$defaultFn(() => new Date()),
});

export const quizAttemptAnswerRelations = relations(
  quizAttemptAnswer,
  ({ one }) => ({
    attempt: one(quizAttempt, {
      fields: [quizAttemptAnswer.attemptId],
      references: [quizAttempt.id],
    }),
    question: one(quizQuestion, {
      fields: [quizAttemptAnswer.questionId],
      references: [quizQuestion.id],
    }),
  })
);

export const schema = { user, session, account, verification };
