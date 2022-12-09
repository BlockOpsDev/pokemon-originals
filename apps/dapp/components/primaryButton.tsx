// button component interface
interface Props {
  message: string;
  isEnabled: boolean;
  isLoading: boolean;
  onClick?: () => void;
}

// button component
const Button: React.FC<Props> = ({
  message,
  isLoading,
  isEnabled,
  onClick = () => {},
}) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg w-36 h-10 m-6 flex items-center justify-center ${
        isEnabled && !isLoading
          ? "bg-blue-600 text-white hover:bg-blue-700"
          : "bg-gray-600 text-gray-400"
      }`}
      disabled={!isEnabled}
      onClick={onClick}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v1a7 7 0 00-7 7h1z"
          ></path>
        </svg>
      ) : (
        message
      )}
    </button>
  );
};

export default Button;
