
import { useOf } from '@storybook/addon-docs/blocks';
import React from 'react';

import LucideIcon from './LucideIcon';

export const ExtraNotes = () => {
  const resolvedOf = useOf( 'meta', ['story', 'meta']);


  const extraNotes = resolvedOf.type === "meta" ? (resolvedOf.preparedMeta.parameters.extraNotes || []) : [];

  if (extraNotes.length === 0) return null;

  return (
    <div className="bg-info-background border border-info-border rounded-md p-3" style={{
      margin: '24px 0',
    }}>
      <h3 className="text-lg font-bold text-info-foreground! flex items-center">
        <LucideIcon name="info" className="w-5 h-5 inline-block mr-2" />
        Things to know
      </h3>
      <div className="flex flex-col gap-2">
        {extraNotes.map((issue) => (
          <div className="px-2" key={issue.title}>
            <h4 className="font-bold">{issue.title}</h4>
            <p className="m-0!">{issue.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
