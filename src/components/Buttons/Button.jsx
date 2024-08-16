import { LoadingAnimation } from '../../assets/RenderedAssets';
import { Link } from 'react-router-dom';

const Button = ({
  value,
  textColor = "text-white",
  btnColor = "bg-secondary",
  type,
  click,
  disabled = false,
  isLoading,
  icon,
  url = "/",
}) => {
  return (
    <>
      {type == null ? (
        <Link
          to={`${url}`}
          className={`rounded-md ${btnColor} ${textColor} py-4 px-12 text-20 transition-all duration-500 ease-in-out hover:${btnColor}/40`}
        >
          {value}
        </Link>
      ) : (
        <button
          type={type}
          disabled={disabled}
          className={` ${
            isLoading ? "cursor-default" : "cursor-pointer"
          } h-[45px] w-[333px] ${btnColor} ${textColor} rounded-[50px] border-[1px] mt-[50px]  border-gray-700 flex justify-center items-center bold`}
          onClick={isLoading ? () => {} : click}
        >
          {icon === null ? null : (
            <img src={icon} alt="icon" className="mr-3" />
          )}
          {isLoading ? <LoadingAnimation /> : null}
          {value}
        </button>
      )}
    </>
  );
};

export default Button;

