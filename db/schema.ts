import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/mysql-core";

export const inquiries = mysqlTable("inquiries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 60 }),
  inquiryType: mysqlEnum("inquiry_type", [
    "private_client",
    "trade_designer",
    "press",
    "other",
  ]).notNull(),
  projectType: varchar("project_type", { length: 120 }),
  budget: varchar("budget", { length: 60 }),
  location: varchar("location", { length: 255 }),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = typeof inquiries.$inferInsert;
