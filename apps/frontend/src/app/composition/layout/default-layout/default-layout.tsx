import React from 'react';
  
type DefaultLayoutProps = {
  children: React.ReactNode;
};

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-screen text-foreground bg-background relative">
        {children}
    </div>
  );
};

export { DefaultLayout };

