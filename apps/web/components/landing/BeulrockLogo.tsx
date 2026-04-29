import Image from "next/image";

interface BeulrockLogoProps {
  className?: string;
  showSubtitle?: boolean;
}

export default function BeulrockLogo({ className = "", showSubtitle = true }: BeulrockLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Image - letakkan file logo.png di folder public/ */}
      <div className="relative h-10 w-10 flex-shrink-0">
        <Image
          src="/logo.png" // ← GANTI dengan nama file PNG lo
          alt="Beulrock Logo"
          width={40}
          height={40}
          className="object-contain"
          priority
        />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-extrabold tracking-wider text-white">
          BEULROCK<span className="text-beulrock-red text-glow-red"> EXECUTOR</span>
        </span>
        {showSubtitle && (
          <span className="text-[10px] text-gray-500 tracking-[0.2em] uppercase">
            Execute with Power & Precision
          </span>
        )}
      </div>
    </div>
  );
}