import { z } from "zod";

export const topicSchema = z.object({
  prefix: z.string().regex(/^[A-Z]+$/),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  column: z.string().min(1),
  order: z.number().int(),
  /** 专题的复习资料 slug，对应 content/guides/<guide>.md */
  guide: z.string().regex(/^[a-z0-9-]+$/).optional(),
});

export const topicsFileSchema = z.array(topicSchema);

export const typedOptionSchema = z.object({
  key: z.string(),
  text: z.string(),
  correct: z.boolean(),
});

/**
 * 这里只约束形状。题型取值、选项数量等规则由校验器按 V1–V14 检查，
 * 这样报错能带上规则编号和题号。
 */
export const typedQuestionSchema = z.object({
  id: z.string(),
  type: z.string(),
  stem: z.string().optional(),
  options: z.array(typedOptionSchema).optional(),
  blankCount: z.number().optional(),
  blankOrder: z.enum(["ordered", "unordered"]).optional(),
});

export const typedChapterSchema = z.object({
  status: z.enum(["draft", "approved"]),
  questions: z.array(typedQuestionSchema),
});

export const typedTopicFileSchema = z.object({
  prefix: z.string(),
  chapters: z.record(z.string(), typedChapterSchema),
});

export const retiredIdsSchema = z.array(z.string());

export type TypedOption = z.infer<typeof typedOptionSchema>;
export type TypedQuestion = z.infer<typeof typedQuestionSchema>;
export type TypedChapter = z.infer<typeof typedChapterSchema>;
export type TypedTopicFile = z.infer<typeof typedTopicFileSchema>;
