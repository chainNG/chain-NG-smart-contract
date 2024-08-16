import AOS from 'aos';
import "aos/dist/aos.css";

const TextFade = ({ animation, children, style, isSpan = false }) => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      {isSpan ? (
        <span data-aos={animation} className={`${style}`}>
          {children}
        </span>
      ) : (
        <div data-aos={animation} className={`${style}`}>
          {children}
        </div>
      )}
    </>
  );
};

export default TextFade;

