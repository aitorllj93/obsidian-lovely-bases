
type Props = {
  children: React.ReactNode;
  isEmbedded: boolean;
  embeddedStyles?: React.CSSProperties;
}

export function Container({ children, isEmbedded, embeddedStyles }: Props) {
  return (
    <div
      className="lovely-bases"
      style={{
        height: "100%",
        width: "100%",
        ...(isEmbedded ? { ...embeddedStyles } : {}),
      }}
    >
      {children}
    </div>
  );
}
