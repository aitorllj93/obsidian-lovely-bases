import type { BasesEntry, BasesEntryGroup } from "obsidian";

import { aBasesEntry } from "../../__mocks__/aBasesEntry";
import { aFile } from "../../__mocks__/aFile";
import { toBasesEntryGroups } from "../utils";

export const TASKS_ENTRIES: BasesEntry[] = [
  aBasesEntry(
    {
      file: aFile(
        { basename: "Setup project structure" },
        "Define folders, modules and initial architecture for the project.",
      ),
    },
    {
      status: "open",
      sectionTitle: "Open",
      color: "#205FA6",
      icon: "circle-dashed",
      banner: "https://picsum.photos/seed/photo_1/200/300",
    },
  ),
  aBasesEntry(
    {
      file: aFile(
        { basename: "Design card layout API" },
        "Design a flexible API for card layouts and configuration options.",
      ),
    },
    {
      status: "open",
      sectionTitle: "Open",
      color: "#205FA6",
      icon: "circle-dashed",
      banner: "https://picsum.photos/seed/photo_2/200/300",
    },
  ),
  aBasesEntry(
    {
      file: aFile(
        { basename: "Implement media resolver" },
        "Create a resolver to determine how different media types are rendered.",
      ),
    },
    {
      status: "open",
      sectionTitle: "Open",
      color: "#205FA6",
      icon: "circle-dashed",
      banner: "https://picsum.photos/seed/photo_3/200/300",
    },
  ),
  aBasesEntry(
    {
      file: aFile(
        { basename: "Refactor useUrlMediaType hook" },
        "Refactor hook to properly detect image, video and audio URLs.",
      ),
    },
    {
      status: "open",
      sectionTitle: "Open",
      color: "#205FA6",
      icon: "circle-dashed",
      banner: "https://picsum.photos/seed/photo_4/200/300",
    },
  ),

  aBasesEntry(
    {
      file: aFile(
        { basename: "Add drag & drop to kanban" },
        "Implement drag and drop behavior for kanban columns and cards.",
      ),
    },
    {
      status: "in-progress",
      sectionTitle: "In progress",
      color: "#BC5215",
      icon: "loader-2",
      banner: "https://picsum.photos/seed/photo_5/200/300",
    },
  ),
  aBasesEntry(
    {
      file: aFile(
        { basename: "Persist BasesEntry updates" },
        "Ensure BasesEntry changes are persisted correctly to disk.",
      ),
    },
    {
      status: "in-progress",
      sectionTitle: "In progress",
      color: "#BC5215",
      icon: "loader-2",
      banner: "https://picsum.photos/seed/photo_6/200/300",
    },
  ),
  aBasesEntry(
    {
      file: aFile(
        { basename: "Optimize image background blur" },
        "Improve performance and visual quality of blurred background images.",
      ),
    },
    {
      status: "in-progress",
      sectionTitle: "In progress",
      color: "#BC5215",
      icon: "loader-2",
      banner: "https://picsum.photos/seed/photo_7/200/300",
    },
  ),
  aBasesEntry(
    {
      file: aFile(
        { basename: "Fix autoplay regression" },
        "Investigate and fix autoplay behavior after recent changes.",
      ),
    },
    {
      status: "in-progress",
      sectionTitle: "In progress",
      color: "#BC5215",
      icon: "loader-2",
      banner: "https://picsum.photos/seed/photo_8/200/300",
    },
  ),
  aBasesEntry(
    {
      file: aFile(
        { basename: "Implement lazy mount strategy" },
        "Avoid mounting heavy media components until strictly necessary.",
      ),
    },
    {
      status: "in-progress",
      sectionTitle: "In progress",
      color: "#BC5215",
      icon: "loader-2",
      banner: "https://picsum.photos/seed/photo_9/200/300",
    },
  ),

  aBasesEntry(
    {
      file: aFile(
        { basename: "Create stacked alpha video demo" },
        "Build a demo showcasing stacked alpha video rendering.",
      ),
    },
    {
      status: "done",
      sectionTitle: "Done",
      color: "#67800B",
      icon: "check",
      banner: "https://picsum.photos/seed/photo_10/200/300",
    },
  ),
  aBasesEntry(
    {
      file: aFile(
        { basename: "Add TitlePosition outside option" },
        "Add a new TitlePosition option rendered outside the container.",
      ),
    },
    {
      status: "done",
      sectionTitle: "Done",
      color: "#67800B",
      icon: "check",
      banner: "https://picsum.photos/seed/photo_11/200/300",
    },
  ),
  aBasesEntry(
    {
      file: aFile(
        { basename: "Hide scrollbar utility" },
        "Create a Tailwind utility to hide scrollbars while keeping overflow.",
      ),
    },
    {
      status: "done",
      sectionTitle: "Done",
      color: "#67800B",
      icon: "check",
      banner: "https://picsum.photos/seed/photo_12/200/300",
    },
  ),
  aBasesEntry(
    {
      file: aFile(
        { basename: "Implement media type cache" },
        "Add caching layer to avoid re-detecting media types repeatedly.",
      ),
    },
    {
      status: "done",
      sectionTitle: "Done",
      color: "#67800B",
      icon: "check",
      banner: "https://picsum.photos/seed/photo_13/200/300",
    },
  ),
  aBasesEntry(
    {
      file: aFile(
        { basename: "Improve focus scroll behavior" },
        "Refine focus and scroll interactions to avoid layout jumps.",
      ),
    },
    {
      status: "done",
      sectionTitle: "Done",
      color: "#67800B",
      icon: "check",
      banner: "https://picsum.photos/seed/photo_14/200/300",
    },
  ),

  aBasesEntry(
    {
      file: aFile(
        { basename: "Integrate Watchmode API" },
        "Connect plugin with Watchmode API for streaming availability.",
      ),
    },
    {
      status: "blocked",
      sectionTitle: "Blocked",
      color: "#5D409D",
      icon: "ban",
      banner: "https://picsum.photos/seed/photo_15/200/300",
    },
  ),
  aBasesEntry(
    {
      file: aFile(
        { basename: "Cross-reference TMDB data" },
        "Merge TMDB metadata with external streaming sources.",
      ),
    },
    {
      status: "blocked",
      sectionTitle: "Blocked",
      color: "#5D409D",
      icon: "ban",
      banner: "https://picsum.photos/seed/photo_16/200/300",
    },
  ),
  aBasesEntry(
    {
      file: aFile(
        { basename: "Sync external streaming metadata" },
        "Keep external streaming metadata in sync with local notes.",
      ),
    },
    {
      status: "blocked",
      sectionTitle: "Blocked",
      color: "#5D409D",
      icon: "ban",
      banner: "https://picsum.photos/seed/photo_17/200/300",
    },
  ),

  aBasesEntry(
    {
      file: aFile(
        { basename: "Rewrite legacy card component" },
        "Consider rewriting legacy card component with new architecture.",
      ),
    },
    {
      status: "wont-do",
      sectionTitle: "Won't do",
      color: "#AF3029",
      icon: "shield-ban",
      banner: "https://picsum.photos/seed/photo_18/200/300",
    },
  ),
  aBasesEntry(
    {
      file: aFile(
        { basename: "Add experimental hover glow v1" },
        "Prototype an experimental hover glow visual effect.",
      ),
    },
    {
      status: "wont-do",
      sectionTitle: "Won't do",
      color: "#AF3029",
      icon: "shield-ban",
      banner: "https://picsum.photos/seed/photo_19/200/300",
    },
  ),
  aBasesEntry(
    {
      file: aFile(
        { basename: "Support deprecated embed format" },
        "Evaluate support for deprecated embed formats in parser.",
      ),
    },
    {
      status: "wont-do",
      sectionTitle: "Won't do",
      color: "#AF3029",
      icon: "shield-ban",
      banner: "https://picsum.photos/seed/photo_20/200/300",
    },
  ),
];

export const TASK_ENTRIES_GROUPED: BasesEntryGroup[] = toBasesEntryGroups(
  TASKS_ENTRIES,
  'note.status',
);
