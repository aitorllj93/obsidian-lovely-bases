
import type { MotionValue } from "motion/react";
import { createContext } from "react";

import type { variants } from "../types";


export const GridVariantContext = createContext<variants | undefined>(undefined);

export type ScrollContextType = {
	scrollX: MotionValue<number>;
	scrollY: MotionValue<number>;
};

export const ScrollContext = createContext<ScrollContextType | undefined>(undefined);
