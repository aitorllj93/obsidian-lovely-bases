import type { BasesEntry, BasesEntryGroup } from "obsidian";
import { aBasesEntry } from "@/__mocks__/aBasesEntry";
import { aBasesEntryGroup } from "@/__mocks__/aBasesEntryGroup";
import { aFile } from "@/__mocks__/aFile";

export const RADAR_CHART_ENTRIES: BasesEntry[] = [
	aBasesEntry(
		{ file: aFile({ basename: "DAY 1" }) },
		{
			health: 88,
			food: 85,
			productivity: 90,
			happiness: 92,
			energy: 88,
			social: 82,
			sleep: 85,
			exercise: 88,
		},
	),
	aBasesEntry(
		{ file: aFile({ basename: "DAY 2" }) },
		{
			health: 65,
			food: 70,
			productivity: 75,
			happiness: 68,
			energy: 62,
			social: 55,
			sleep: 60,
			exercise: 65,
		},
	),
	aBasesEntry(
		{ file: aFile({ basename: "DAY 3" }) },
		{
			health: 35,
			food: 40,
			productivity: 38,
			happiness: 32,
			energy: 28,
			social: 35,
			sleep: 42,
			exercise: 38,
		},
	),
	aBasesEntry(
		{ file: aFile({ basename: "DAY 4" }) },
		{
			health: 72,
			food: 75,
			productivity: 78,
			happiness: 75,
			energy: 70,
			social: 68,
			sleep: 72,
			exercise: 75,
		},
	),
	aBasesEntry(
		{ file: aFile({ basename: "DAY 5" }) },
		{
			health: 55,
			food: 50,
			productivity: 58,
			happiness: 62,
			energy: 65,
			social: 70,
			sleep: 68,
			exercise: 60,
		},
	),
];

export const GROUPED_RADAR_ENTRIES: BasesEntryGroup[] = [
	aBasesEntryGroup("WEEK 1", [
		aBasesEntry(
			{ file: aFile({ basename: "DAY 1" }) },
			{
				health: 88,
				food: 85,
				productivity: 90,
				happiness: 92,
				energy: 88,
				social: 82,
				sleep: 85,
				exercise: 88,
			},
		),
		aBasesEntry(
			{ file: aFile({ basename: "DAY 2" }) },
			{
				health: 65,
				food: 70,
				productivity: 75,
				happiness: 68,
				energy: 62,
				social: 55,
				sleep: 60,
				exercise: 65,
			},
		),
	]),
	aBasesEntryGroup("WEEK 2", [
		aBasesEntry(
			{ file: aFile({ basename: "DAY 3" }) },
			{
				health: 35,
				food: 40,
				productivity: 38,
				happiness: 32,
				energy: 28,
				social: 35,
				sleep: 42,
				exercise: 38,
			},
		),
		aBasesEntry(
			{ file: aFile({ basename: "DAY 4" }) },
			{
				health: 72,
				food: 75,
				productivity: 78,
				happiness: 75,
				energy: 70,
				social: 68,
				sleep: 72,
				exercise: 75,
			},
		),
	]),
	aBasesEntryGroup("WEEK 3", [
		aBasesEntry(
			{ file: aFile({ basename: "DAY 5" }) },
			{
				health: 55,
				food: 50,
				productivity: 58,
				happiness: 62,
				energy: 65,
				social: 70,
				sleep: 68,
				exercise: 60,
			},
		),
	]),
];
