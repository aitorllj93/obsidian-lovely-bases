
export type LayoutIds = {
  ns: string;
  container: string;
  content: string;
  title: string;
  icon: string;
  counter: string;
  expandedView: string;
}

export const getLayoutIds = (ns: string): LayoutIds => {
  return {
    ns,
    container: `facets-container-${ns}`,
    content: `facets-content-${ns}`,
    title: `facets-title-${ns}`,
    icon: `facets-icon-${ns}`,
    counter: `facets-count-${ns}`,
    expandedView: `facets-expanded-view-${ns}`,
  }
}
