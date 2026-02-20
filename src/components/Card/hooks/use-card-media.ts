
import type { BasesEntry, BasesPropertyId } from 'obsidian';
import { useMemo } from 'react';

import { useObsidian } from '@/components/Obsidian/Context';

import { getCardMedia } from '../helpers/get-media';

export function useCardMedia(entry: BasesEntry, propertyId?: BasesPropertyId) {
  const { app } = useObsidian();
  return useMemo(() => {
    return getCardMedia(app, entry, propertyId);
  }, [entry, app, propertyId]);
}
