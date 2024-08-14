import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        const smoothScrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Add smooth behavior for scrolling
            });
        };

        smoothScrollToTop();
    }, [pathname]);

    return null;
};

export default ScrollToTop;