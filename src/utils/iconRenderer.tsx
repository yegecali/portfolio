import React from "react";
import * as FaIcons from "react-icons/fa6";

type IconName = keyof typeof FaIcons;

export const renderIcon = (iconName: string): React.ReactNode => {
  const Icon = FaIcons[iconName as IconName] as React.ComponentType<{ size?: number; className?: string }>;

  if (!Icon) {
    return <span className="icon-placeholder">📦</span>;
  }

  return <Icon size={48} className="project-icon-svg" />;
};

export const getIconComponent = (iconName: string) => {
  return FaIcons[iconName as IconName] as React.ComponentType<{ size?: number; className?: string }> || null;
};
