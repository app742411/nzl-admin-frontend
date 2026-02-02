// components/GridBackground.jsx
export default function GridBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <div
        className="
          absolute inset-0
          bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),
              linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)]
          bg-[size:64px_64px]
        "
      />
    </div>
  );
}
