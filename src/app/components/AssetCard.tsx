type AssetCardProps = {
  title: string;
  size: string;
  description: string;
  usage?: string;
  preview?: React.ReactNode;
};

export function AssetCard({ title, size, description, usage, preview }: AssetCardProps) {
  return (
    <div className="border border-[#1D9E75] bg-[#0a1f12] rounded-sm overflow-hidden">
      {/* Corner brackets */}
      <div className="relative">
        <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-[#1D9E75]" />
        <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-[#1D9E75]" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-[#1D9E75]" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-[#1D9E75]" />

        {/* Header */}
        <div className="bg-[#1D9E75] bg-opacity-30 px-4 py-2 border-b border-[#1D9E75]">
          <div className="flex justify-between items-center">
            <h3 className="text-[#e8f5f0] text-sm tracking-[2px] font-bold">{title}</h3>
            <span className="text-[#5DCAA5] text-sm">{size}</span>
          </div>
        </div>

        {/* Preview */}
        {preview && (
          <div className="p-4 bg-[#050d0a] min-h-32 flex items-center justify-center">
            {preview}
          </div>
        )}

        {/* Description */}
        <div className="p-4">
          <p className="text-[#5DCAA5] text-xs mb-3">{description}</p>
          {usage && (
            <div className="bg-[#050d0a] border border-[#1a3a2a] rounded-sm p-3 mt-3">
              <div className="text-[#5DCAA5] text-xs tracking-[2px] mb-1 font-bold">USAGE IN GODOT</div>
              <p className="text-[#5DCAA5] text-xs leading-relaxed">{usage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
