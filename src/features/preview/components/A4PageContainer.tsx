import React from 'react';

interface A4PageContainerProps {
  children: React.ReactNode;
  zoom?: number;
}

export const A4PageContainer: React.FC<A4PageContainerProps> = ({ children, zoom = 0.85 }) => {
  return (
    <div className="flex justify-center items-start w-full overflow-auto py-8 px-4">
      <div
        className="transition-transform duration-150 origin-top bg-white shadow-2xl rounded-sm print:shadow-none print:m-0 print:transform-none print-area"
        style={{
          width: '210mm',
          minHeight: '297mm',
          transform: `scale(${zoom})`,
          transformOrigin: 'top center',
        }}
      >
        {children}
      </div>
    </div>
  );
};
