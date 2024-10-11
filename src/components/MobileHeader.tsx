import React from 'react';
import { Menu } from 'lucide-react';

interface MobileHeaderProps {
  toggleSidebar: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="bg-white shadow-md py-3 px-4 flex items-center justify-center md:hidden">
      
      <img
        src="https://bohurupi.com/wp-content/uploads/2023/03/logo-update-bohurupi_1.svg"
        alt="Bohurupi Logo"
        className="h-8"
      />
    </header>
  );
};

export default MobileHeader;