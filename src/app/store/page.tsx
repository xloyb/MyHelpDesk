/* eslint-disable @next/next/no-img-element */
import styles from "@/app/main.module.css";
import Footer from "@/components/Footer";
import IndexNav from "@/components/index/IndexNav";
import Services from "@/components/index/Services";
import Script from "next/script"; // Import the Script component

const Store = () => {
  return (
    <div className='h-screen'>
      <Script src="https://shoppy.gg/api/embed.js" strategy="lazyOnload" />
      <div className="bg-base-200">
        <IndexNav />
        <Services />
        <Footer />
      </div>
    </div>
  );
};

export default Store;
