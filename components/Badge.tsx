import React from "react";

interface BadgeProps {
  variant: string;
  text: string;
}

const Badge: React.FC<BadgeProps> = ({ variant, text }) => {
  const badgeVariants = {
    blue: "text-[#56CCF2] border-[#56CCF2]",
    red: "text-[#EB5757] border-[#EB5757]",
  };
  return (
    <div
      className={
        "rounded-lg px-2 py-1 text-xs font-medium border-[1px] " +
        badgeVariants[variant]
      }
    >
      {text}
    </div>
  );
};

export default Badge;
