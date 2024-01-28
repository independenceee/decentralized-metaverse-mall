import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

function useGSAP(duration: number = 2, offset: number = 104) {
    const handleScrollPy = (redirect: string) => {
        gsap.to(window, { duration: duration, scrollTo: { y: redirect, offsetY: offset } });
    };

    return {
        handleScrollPy,
    };
}
export default useGSAP;
