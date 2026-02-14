
export type LayoutIds = {
  ns: string;
  container: string;
  content: string;
  title: string;
  icon: string;
  counter: string;
}

export const getLayoutIds = (ns: string): LayoutIds => {
  return {
    ns,
    container: `group-container-${ns}`,
    content: `group-content-${ns}`,
    title: `group-title-${ns}`,
    icon: `group-icon-${ns}`,
    counter: `group-count-${ns}`,
  }
}
