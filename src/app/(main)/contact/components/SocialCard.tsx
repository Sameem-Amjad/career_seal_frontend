import React from "react";

interface SocialCardProps {
  icon: React.ReactNode; // Accepts JSX elements
  link: string;
}

function SocialCard({ icon, link }: SocialCardProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="w-12 h-12 border border-gray-400 bg-custom-blue rounded-full hover:bg-gray-400 flex items-center justify-center transition duration-200"
    >
      {icon}
    </a>
  );
}

export default SocialCard;
