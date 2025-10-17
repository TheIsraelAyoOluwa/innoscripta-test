import { toast } from "react-toastify";

type TProps = {
  title?: string;
  message: string;
};

const Msg = ({ title, message }: TProps) => {
  const dismissAll = () => toast.dismiss();

  return (
    <div className="font-primary flex  space-x-2">
      {/* <img src={""} alt="Avatar" className="w-[35px] h-[35px]" /> */}

      <div>
        <p className="text-sm">{title}</p>
        <p className="text-xs text-gray-500 font-light">{message}</p>

        <p className="text-xs text-gray-400 font-light mt-1" onClick={dismissAll}>
          Dismiss
        </p>
      </div>
    </div>
  );
};

class ToastClass {
  success({ title, message }: TProps) {
    toast.success(<Msg message={message} title={title || "Success"} />, {
      icon: false,
      hideProgressBar: true,
      autoClose: 3000,
      pauseOnHover: false,
      style: {
        color: "#344054",
        background: "#fff",
        borderRadius: "4px",
        fontWeight: "500",
        maxWidth: "300px",
      },
    });
  }

  error(message: string) {
    toast.error(<Msg message={message} title={"Error"} />, {
      icon: false,
      hideProgressBar: true,
      autoClose: 3000,
      pauseOnHover: false,
      style: {
        color: "#344054",
        background: "#FEF2F2",
        borderRadius: "4px",
        fontWeight: "500",
        maxWidth: "300px",
      },
    });
  }
}

export const Toast = new ToastClass();
