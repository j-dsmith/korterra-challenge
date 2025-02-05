import { z } from "zod";

export const repositorySchema = z.object({
  id: z.number(),
  name: z.string(),
  html_url: z.string(),
  owner: z.object({
    login: z.string(),
  }),
  description: z.string().nullable(),
  stargazers_count: z.number(),
  forks_count: z.number(),
  open_issues_count: z.number(),
  language: z.string().nullable(),
  license: z
    .object({
      spdx_id: z.string(),
    })
    .nullable(),
});

export const repositoriesSchema = z.object({
  items: z.array(repositorySchema),
});

export type Repository = z.infer<typeof repositorySchema>;
