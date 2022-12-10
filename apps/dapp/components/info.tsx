import React from "react";

//typescript for react children prop
//https://stackoverflow.com/questions/58123398/when-to-use-jsx-element-vs-reactnode-vs-reactelement

const Info: React.FC<{ title: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <div className="m-3 w-auto">
      <span className="text-sm font-bold text-center text-slate-300">
        {title}
      </span>
      <div className="rounded-lg w-full h-full text-gray-700 bg-slate-300 p-3">
        {children}
      </div>
    </div>
  );
};

export default Info;
