type FullScreenMockupProps = {
  title: string;
  children: React.ReactNode;
};

export function FullScreenMockup({ title, children }: FullScreenMockupProps) {
  return (
    <div className="mb-12">
      <div className="mb-4">
        <h3 className="text-[#5DCAA5] text-xs tracking-[3px] mb-2">FULL SCREEN MOCKUP</h3>
        <p className="text-[#3d6b55] text-xs">{title}</p>
      </div>
      <div className="border-2 border-[#1D9E75] bg-[#050d0a] rounded-sm overflow-hidden relative">
        {/* Corner brackets */}
        <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-[#1D9E75] z-10" />
        <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-[#1D9E75] z-10" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-[#1D9E75] z-10" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-[#1D9E75] z-10" />

        {/* Scanline overlay */}
        <div className="absolute inset-0 pointer-events-none z-10" style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,180,120,0.012) 3px, rgba(0,180,120,0.012) 4px)'
        }} />

        {children}
      </div>
    </div>
  );
}
