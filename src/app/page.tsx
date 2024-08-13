/* eslint-disable @next/next/no-img-element */
import styles from "@/app/main.module.css";
import Footer from "@/components/Footer";
import Hero from "@/components/index/Hero";
import IndexNav from "@/components/index/IndexNav";
import Services from "@/components/index/Services";

const Homepage = () => {
  return (
    <div className='h-screen'>
      <div className="bg-base-200">
        <IndexNav />

        <Hero />
        <Services />
        <Footer/>
      </div>
    </div>
  );
};

export default Homepage;
