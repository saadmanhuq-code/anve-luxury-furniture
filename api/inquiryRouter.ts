import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { inquiries } from "@db/schema";

export const inquiryRouter = createRouter({
  submit: publicQuery
    .input(
      z.object({
        name: z.string().trim().min(2, "Please share your full name").max(255),
        email: z.string().trim().email("A valid email lets us reply").max(320),
        phone: z.string().trim().max(60).optional().or(z.literal("")),
        inquiryType: z.enum(["private_client", "trade_designer", "press", "other"]),
        projectType: z.string().trim().max(120).optional().or(z.literal("")),
        budget: z.string().trim().max(60).optional().or(z.literal("")),
        location: z.string().trim().max(255).optional().or(z.literal("")),
        message: z.string().trim().min(10, "A few words about your project").max(5000),
      }),
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const [res] = await db.insert(inquiries).values({
        name: input.name,
        email: input.email,
        phone: input.phone || null,
        inquiryType: input.inquiryType,
        projectType: input.projectType || null,
        budget: input.budget || null,
        location: input.location || null,
        message: input.message,
      });
      return { ok: true as const, id: Number(res.insertId) };
    }),
});
