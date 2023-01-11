import { Button } from "antd";
import { AiOutlineRight } from "react-icons/ai";
import { BiSad } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import "./auth.css";
const Page404 = () => {
  const navigate = useNavigate();
  const goBack = () => navigate("/");
  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full overflow-hidden">
      <div className="flex flex-row gap-4 items-center justify-center w-full bg-sky-500 text-white shadow-lg h-28">
        <BiSad className="sad-roll text-7xl w-24" />
        <p className="font-bold text-xs sm:text-base !m-0 !p-0">
          Sorry, we couldn't find the page you were looking for.
        </p>
      </div>
      <Button
        onClick={goBack}
        icon={<AiOutlineRight className="mt-[2px]" />}
        className="flex flex-row-reverse justify-center items-center gap-x-2"
        size="large"
        type="primary"
        htmlType="submit"
      >
        Go Back
      </Button>
    </div>
  );
};

export default Page404;
