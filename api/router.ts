import { createRouter, publicQuery } from "./middleware";
import { inquiryRouter } from "./inquiryRouter";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  inquiry: inquiryRouter,
});

export type AppRouter = typeof appRouter;
