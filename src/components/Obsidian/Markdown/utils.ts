

const removeFrontmatter = (markdown: string) =>
  markdown.replace(/^---\n[\s\S]*?\n---\n?/, "");

export const getContentToRender = (
  markdown: string,
  maxLength: number,
  showEllipsis: boolean,
) => {
  const content = removeFrontmatter(markdown);
  return (
    content.slice(0, maxLength) +
    (showEllipsis && content.length > maxLength ? "..." : "")
  );
};
