/* eslint-disable @next/next/no-img-element */
import styles from "@/app/main.module.css";
import Footer from "@/components/Footer";
import IndexNav from "@/components/index/IndexNav";
import Services from "@/components/index/Services";

const Store = () => {
  return (
    <div className='h-screen'>
      <div className="bg-base-200">
        <IndexNav />
        <Services />
        <Footer/>
      </div>
    </div>
  );
};

export default Store;
