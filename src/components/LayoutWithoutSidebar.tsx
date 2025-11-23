import { ReactNode } from "react";

interface LayoutWithoutSidebarProps {
  children: ReactNode;
}

export function LayoutWithoutSidebar({ children }: LayoutWithoutSidebarProps) {
  return (
    <div className="min-h-screen w-full bg-background">
      {children}
    </div>
  );
}

