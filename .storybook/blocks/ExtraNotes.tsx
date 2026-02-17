
import { useOf } from '@storybook/addon-docs/blocks';
import React from 'react';

import { cn } from '../../src/lib/utils';

import LucideIcon from './LucideIcon';

type ExtraNotesKind = 'success' | 'warning' | 'error' | 'info';

const backgroundClasses: Record<ExtraNotesKind, string> = {
  success: "bg-success-background border-success-border",
  warning: "bg-warning-background border-warning-border",
  error: "bg-error-background border-error-border",
  info: "bg-info-background border-info-border",
}

const foregroundClasses: Record<ExtraNotesKind, string> = {
  success: "text-success-foreground!",
  warning: "text-warning-foreground!",
  error: "text-error-foreground!",
  info: "text-info-foreground!",
}

const icons: Record<ExtraNotesKind, string> = {
  success: "check-circle",
  warning: "alert-triangle",
  error: "x-circle",
  info: "info",
}

export const ExtraNotes = () => {
  const resolvedOf = useOf( 'meta', ['story', 'meta']);

  const extraNotes = (resolvedOf.type === "meta" ? (resolvedOf.preparedMeta.parameters.extraNotes || []) : []) as { title: string; description: string; kind?: ExtraNotesKind; }[];

  if (extraNotes.length === 0) return null;

  return (
    <>
        {extraNotes.map((issue) => {
          const kind = issue.kind ?? 'info';

          return (
            <div className={cn(
              "border rounded-md p-3",
              backgroundClasses[kind]
            )} style={{
              margin: '24px 0',
            }} key={issue.title}>
              <h3 className={cn(
                "text-lg font-bold flex items-center",
                foregroundClasses[kind],
              )}>
                <LucideIcon name={icons[kind]} className="w-5 h-5 inline-block mr-2" />
                {issue.title}
              </h3>
              <div className="flex flex-col gap-2">
                <div className="px-2">
                  {/** biome-ignore lint/security/noDangerouslySetInnerHtml: html docs */}
                  <p className="m-0!" dangerouslySetInnerHTML={{
                    __html: issue.description
                  }}></p>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};
