import { useOf } from '@storybook/addon-docs/blocks';
import React from 'react';

import LucideIcon from './LucideIcon';

/**
 * A block that displays the story name or title from the of prop
 * - if a story reference is passed, it renders the story name
 * - if a meta reference is passed, it renders the stories' title
 * - if nothing is passed, it defaults to the primary story
 */
export const Title = () => {
  const resolvedOf = useOf( 'meta', ['story', 'meta']);

  switch (resolvedOf.type) {
    case 'story': {
      return <h1>{resolvedOf.story.name}</h1>;
    }
    case 'meta': {
      const title = resolvedOf.preparedMeta.title.split('/').pop();
      const icon = resolvedOf.preparedMeta.parameters.docs.icon;

      return <h1 className="flex items-center">
        {icon && <LucideIcon name={icon} className="w-8 h-8 inline-block mr-2" />}
        {title}
      </h1>;
    }
  }
  return null;
};
