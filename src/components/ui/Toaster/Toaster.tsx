import { ReactNode } from "react";
import { CiCircleCheck } from "react-icons/ci";

const iconList: { [key: string]: ReactNode } = {
  success: <CiCircleCheck className="text-3xl text-success-500" />,
  error: <CiCircleCheck className="text-3xl text-danger-500" />,
};

interface PropTypes {
  type: string;
  message: string;
}

const Toaster = (props: PropTypes) => {
  const { type, message } = props;
  return (
    <div
      role="alert"
      aria-label="toaster-label"
      className="fixed left-12 bottom-7 z-50 max-w-xs rounded-lg border border-gray-200 bg-white shadow-sm"
    >
      <div className="flex items-center gap-2 p-1">
        {iconList[type]}
        <p id="toaster-label" className="text-sm text-gray-700">
          {message}
        </p>
      </div>
    </div>
  );
};

export default Toaster;
