
type Props = {
  children: React.ReactNode;
  isEmbedded: boolean;
  style?: React.CSSProperties;
  embeddedStyle?: React.CSSProperties;
}

export function Container({ children, isEmbedded, style, embeddedStyle }: Props) {
  return (
    <div
      className="lovely-bases"
      style={{
        height: "100%",
        width: "100%",
        ...(style ?? {}),
        ...(isEmbedded ? { ...embeddedStyle } : {}),
      }}
    >
      {children}
    </div>
  );
}
