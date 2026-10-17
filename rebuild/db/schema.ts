import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
export const reports = sqliteTable("reports", {id:text("id").primaryKey(), data:text("data").notNull(), expires:integer("expires").notNull()});
export const leads = sqliteTable("leads", {id:text("id").primaryKey(), name:text("name").notNull(), email:text("email").notNull(), phone:text("phone"), service:text("service").notNull(), region:text("region").notNull(), message:text("message").notNull(), created:integer("created").notNull(), status:text("status").notNull().default("new")});
export const limits = sqliteTable("limits", {key:text("key").primaryKey(), count:integer("count").notNull(), expires:integer("expires").notNull()});
