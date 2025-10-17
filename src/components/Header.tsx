import React from "react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onRefresh?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onRefresh }) => {
  return (
    <header className="sticky top-0 z-10 w-full bg-white border-b shadow-sm backdrop-blur-md bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <img
            src="https://www.innoscripta.com/innoscripta-logo-blue.svg"
            alt="Logo"
          />
        </div>

        {onRefresh && (
          <Button
            onClick={onRefresh}
            variant="secondary"
            className="text-sm sm:text-base"
          >
            Refresh
          </Button>
        )}
      </div>
    </header>
  );
};
