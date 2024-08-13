/* eslint-disable @next/next/no-img-element */
import CheckCountry from "@/components/CheckCountry";
import Footer from "@/components/Footer";
import IndexNav from "@/components/index/IndexNav";
import Services from "@/components/index/Services";
import Test from "@/components/test";
import Script from "next/script"; 

const Store = () => {
  return (
    <div className="h-screen" suppressHydrationWarning>
      <Script src="https://shoppy.gg/api/embed.js" strategy="lazyOnload" />
      <div className="bg-base-200">
        <IndexNav />
        <button
          style={{
            background: "#2f2f2f",
            width: "100%",
            maxWidth: "200px",
            marginTop: "-20px"
          }}
          data-shoppy-product="2Dh6TwY"
        >
          crypto
        </button>

        <button
          style={{
            background: "#2f2f2f",
            width: "100%",
            maxWidth: "200px",
            marginTop: "-20px"
          }}
          data-shoppy-product="oORWBGB"
        >PP</button>
        <CheckCountry/>
        {/* <Test/>
        <Services /> */}
        <Footer />
      </div>
    </div>
  );
};

export default Store;
