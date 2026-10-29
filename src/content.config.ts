import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { alumniLoader } from './loaders/alumni';

const link = z.string().url().or(z.literal(''));

const alumni = defineCollection({
  loader: alumniLoader(),
  schema: z.object({
    name: z.string(),
    batch: z.string(), // e.g. "2021-25"
    degree: z.string(), // e.g. "BS Geoinformatics"
    role: z.string(),
    organization: z.string(),
    sector: z.enum(['Government', 'Private', 'NGO / UN', 'Academia', 'Freelance', 'Student']),
    city: z.string(),
    country: z.string(),
    lat: z.number(),
    lng: z.number(),
    linkedin: link.optional(),
    github: link.optional(),
    portfolio: link.optional(),
    email: z.string().optional(),
    photo: z.string().optional(),
    mentor: z.boolean().default(false),
    featured: z.boolean().default(false),
    skills: z.array(z.string()).default([]),
    advice: z.string().optional(),
    province: z.string().optional(),
    orcid: z.string().optional(),
    cv: link.optional(),
    publications: z.array(z.object({
      title: z.string(),
      venue: z.string().optional(),
      year: z.coerce.string().optional(),
      url: link.optional(),
    })).default([]),
    education: z.array(z.object({
      institution: z.string(),
      degree: z.string().optional(),
      program: z.string().optional(),
      start: z.coerce.string().optional(),
      end: z.coerce.string().optional(),
    })).default([]),
    experience: z.array(z.object({
      title: z.string(),
      organization: z.string().optional(),
      start: z.coerce.string().optional(),
      end: z.coerce.string().optional(),
      current: z.boolean().default(false),
      description: z.string().optional(),
    })).default([]),
    projects: z.array(z.object({
      title: z.string(),
      description: z.string().optional(),
      url: link.optional(),
      repo: link.optional(),
      tags: z.array(z.string()).default([]),
    })).default([]),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    type: z.enum(['story', 'tutorial', 'news', 'interview']),
    date: z.coerce.date(),
    author: z.string(),
    summary: z.string(),
    cover: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const roadmaps = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/roadmaps' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number().default(99),
    demand: z.enum(['High', 'Medium', 'Growing']),
    tools: z.array(z.string()),
    roles: z.array(z.string()).default([]),      // job titles this track leads to
    employers: z.array(z.string()).default([]),  // who hires for it in Pakistan and remotely
    stages: z.array(
      z.object({
        name: z.string(),
        duration: z.string(),
        outcome: z.string().optional(),          // what you can do once the stage is done
        skills: z.array(z.string()),
        project: z.string().optional(),          // the one deliverable that proves the stage
        resources: z.array(z.object({
          label: z.string(),
          url: z.string().url(),
          kind: z.enum(['course', 'book', 'docs', 'video', 'tool', 'certificate', 'data']).default('course'),
          cost: z.enum(['free', 'free to audit', 'paid', 'free for students']).default('free'),
          hours: z.string().optional(),          // honest time estimate, e.g. "30 h"
          gives: z.string().optional(),          // the skill you walk away with
        })).default([]),
      }),
    ),
  }),
});

// Downloadable items: software, datasets, templates. All pass through /download/[id].
const resources = defineCollection({
  loader: file('./src/content/resources.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    kind: z.enum(['software', 'dataset', 'template']),
    category: z.string(),
    description: z.string(),
    version: z.string().optional(),
    size: z.string().optional(),
    os: z.array(z.string()).default([]),
    license: z.string(),
    homepage: link.optional(),
    tutorial: link.optional(),
    // Society mirrors. Empty means "official download only" and no /download gate is built.
    downloads: z.array(z.object({ label: z.string(), url: z.string().url(), size: z.string().optional() })).default([]),
    host: z.string().default('Google Drive'),
    updated: z.string(),
    image: z.string().optional(),
    about: z.array(z.string()).default([]),
    requirements: z.array(z.string()).default([]),
    licensing: z.string().optional(),
  }),
});

const links = defineCollection({
  loader: file('./src/content/links.json'),
  schema: z.object({
    id: z.string(),
    category: z.enum(['scholarship', 'course', 'job', 'certification']),
    title: z.string(),
    provider: z.string(),
    url: z.string().url(),
    description: z.string(),
    deadline: z.string().optional(),
    location: z.string().optional(),
    cost: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const projects = defineCollection({
  loader: file('./src/content/projects.json'),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    students: z.array(z.string()),
    supervisor: z.string(),
    year: z.number(),
    domain: z.string(),
    abstract: z.string(),
    tools: z.array(z.string()).default([]),
    report: link.optional(),
  }),
});

const events = defineCollection({
  loader: file('./src/content/events.json'),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    date: z.string(),
    venue: z.string(),
    description: z.string(),
    url: link.optional(),
  }),
});

const cabinet = defineCollection({
  loader: file('./src/content/cabinet.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    position: z.string(),
    session: z.string(),
    linkedin: link.optional(),
  }),
});

export const collections = { alumni, posts, roadmaps, resources, links, projects, events, cabinet };
