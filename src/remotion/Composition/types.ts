export type ReelStory = {
  id?: string;
  name?: string;
  moduleExport?: unknown;
  parameters?: {
    reel?: {
      include?: boolean;
      order?: number;
    };
    docs?: {
      description?: {
        story?: string;
      };
    };
  };
}
