import { motion } from "motion/react";
import BodyImage from "../../imports/Body.png";

interface Organ {
  name: string;
  infection: number;
  // We are ignoring the hardcoded color from the state now
  // because we want the color to be 100% dynamic based on the infection rate.
}

interface BodyMapProps {
  organs: Organ[];
}

export default function BodyMap({ organs }: BodyMapProps) {
  // Safe lookup for the organ data
  const getOrgan = (name: string) => {
    return organs.find((o) => o.name === name) || { name, infection: 0 };
  };

  // The Dynamic Rule Engine for Colors & Status
  const getStatus = (infection: number) => {
    if (infection === 0)
      return { color: "#22C55E", grad: "url(#green-grad)", text: "HEALTHY" };
    if (infection < 66)
      return { color: "#EAB308", grad: "url(#yellow-grad)", text: "INFECTED" };
    return { color: "#EF4444", grad: "url(#red-grad)", text: "CRITICAL" };
  };

  // Reusable Hitbox Component to keep the code clean
  const OrganHitbox = ({
    cx,
    cy,
    r,
    organ,
  }: {
    cx: string;
    cy: string;
    r: string;
    organ: Organ;
  }) => {
    const status = getStatus(organ.infection);

    return (
      <g>
        <motion.circle
          cx={cx}
          cy={cy}
          r={r}
          fill={status.grad}
          stroke={status.color}
          strokeWidth="4"
          animate={organ.infection > 0 ? { scale: [1, 1.03, 1] } : {}}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        {/* Dynamic Text Centered Inside */}
        <text
          x={cx}
          y={Number(cy) - 5}
          fill={status.color}
          fontSize="22"
          fontWeight="bold"
          textAnchor="middle"
          style={{ fontFamily: "monospace" }}
        >
          {organ.infection}%
        </text>
        <text
          x={cx}
          y={Number(cy) + 20}
          fill={status.color}
          fontSize="12"
          textAnchor="middle"
          style={{ fontFamily: "monospace", letterSpacing: "2px" }}
        >
          {status.text}
        </text>
      </g>
    );
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Static Background Image */}
      <img
        src={BodyImage}
        alt="Host Body"
        className="w-full h-auto opacity-70"
      />

      {/* SVG Overlay */}
      <svg
        className="absolute top-0 left-0 w-full h-full"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Gradient Definitions for the internal glow */}
        <defs>
          <radialGradient id="green-grad">
            <stop offset="50%" stopColor="#22C55E" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#22C55E" stopOpacity="0.4" />
          </radialGradient>
          <radialGradient id="yellow-grad">
            <stop offset="50%" stopColor="#EAB308" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#EAB308" stopOpacity="0.4" />
          </radialGradient>
          <radialGradient id="red-grad">
            <stop offset="50%" stopColor="#EF4444" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#EF4444" stopOpacity="0.4" />
          </radialGradient>
        </defs>

        {/* Brain */}
        <OrganHitbox cx="500" cy="160" r="90" organ={getOrgan("BRAIN")} />

        {/* Lymph Nodes (Left & Right share the same data) */}
        <OrganHitbox cx="410" cy="340" r="45" organ={getOrgan("LYMPH NODES")} />
        <OrganHitbox cx="590" cy="340" r="45" organ={getOrgan("LYMPH NODES")} />

        {/* Lungs (Left & Right share the same data) */}
        <OrganHitbox cx="370" cy="500" r="85" organ={getOrgan("LUNGS")} />
        <OrganHitbox cx="630" cy="500" r="85" organ={getOrgan("LUNGS")} />

        {/* Heart */}
        <OrganHitbox cx="500" cy="620" r="60" organ={getOrgan("HEART")} />

        {/* Gut */}
        <OrganHitbox cx="500" cy="850" r="90" organ={getOrgan("GUT")} />
      </svg>
    </div>
  );
}
