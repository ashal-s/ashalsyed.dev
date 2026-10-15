export function GridBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-background" />

      <div className="absolute inset-0 opacity-[0.4] overflow-hidden">
        <div
          className="absolute inset-[-64px] grid-drift"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--grid-line)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--grid-line)) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />
      </div>
    </div>
  );
}
