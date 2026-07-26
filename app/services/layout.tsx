export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "#FAFAFA",
        minHeight: "100vh",
        color: "#1D1D1F",
        fontFamily: "var(--font-display), -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
      }}
    >
      {children}
    </div>
  );
}
