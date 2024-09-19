/* eslint-disable @next/next/no-img-element */
import Footer from "@/components/Footer";
import IndexNav from "@/components/index/IndexNav";
import ServiceTabsWithCountryCheck from "@/components/index/ServiceTabsWithCountryCheck";
const Store = () => {
  return (
    <div className="h-screen" suppressHydrationWarning>
      <div className="bg-base-200">
        <IndexNav />
        <ServiceTabsWithCountryCheck />
        <Footer />
      </div>
    </div>
  );
};

export default Store;
