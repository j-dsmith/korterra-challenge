import { z } from "zod";

export const repoSchema = z.object({
  items: z.array(
    z.object({
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
      license: z
        .object({
          name: z.string(),
        })
        .nullable(),
    })
  ),
});

export type Repo = z.infer<typeof repoSchema>["items"][number];
