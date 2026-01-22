import { useObsidian } from "@/components/Obsidian/Context";

import { translate } from "./translate";
import type { Namespace, NamespacedTranslationKey } from "./types";

export const useTranslation = <N extends Namespace>(namespace: N) => {
	const { locale } = useObsidian();

  const t = (key: NamespacedTranslationKey<N>) => translate(locale, namespace, key);


	return { t, locale };
};

