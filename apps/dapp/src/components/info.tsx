import React from "react";

const Info: React.FC<{ title: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <div className="mb-4 w-full">
      <div className="text-sm font-bold font-poppins text-left text-secondary-text mb-2">
        {title}
      </div>
      <div className="rounded-lg w-full h-full font-roboto text-black bg-card-bg p-3">
        {children}
      </div>
    </div>
  );
};

export default Info;
