import ChooseUs from "./page/ChooseUs";
import ContactUs from "./page/ContactUs";
import CouponsDiscounts from "./page/CouponsDiscounts";
import FeaturedBikes from "./page/FeaturedBikes";
import HeroSection from "./page/HeroSection"
import Testimonials from "./page/Testimonials";

const HomePage = () => {
    return(
        <div>
            <HeroSection/>
            <FeaturedBikes/>
            <Testimonials/>
            <ChooseUs/>
            <CouponsDiscounts/>
            <ContactUs/>
        </div>
    )
}

export default HomePage;
