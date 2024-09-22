// /* eslint-disable @next/next/no-img-element */
// import styles from "@/app/main.module.css";
// import Footer from "@/components/Footer";
// import Hero from "@/components/index/Hero";
// import IndexNav from "@/components/index/IndexNav";
// import Services from "@/components/index/Services";
// import ServiceTabsWithCountryCheck from "@/components/index/ServiceTabsWithCountryCheck";

// const Homepage = () => {
//   return (
//     <div className='h-screen' suppressHydrationWarning>
//       <div className="bg-base-200">
//         <IndexNav />

//         <Hero />
//         {/* <Services /> */}
//         <ServiceTabsWithCountryCheck/>
//         <Footer/>
//       </div>
//     </div>
//   );
// };

// export default Homepage;


"use client"
/* eslint-disable @next/next/no-img-element */
import styles from "@/app/main.module.css";
import Footer from "@/components/Footer";
import Hero from "@/components/index/Hero";
import IndexNav from "@/components/index/IndexNav";
import Services from "@/components/index/Services";
import ServiceTabsWithCountryCheck from "@/components/index/ServiceTabsWithCountryCheck";
import { useEffect, useState } from "react";

type settings = {
  sitename: string;
  announcement: string;
  offer: string;
  logo: string;
  theme: string;
  discordLogs: boolean; 
  exchangeSystem:  boolean;
  storeSystem:  boolean;
  ticketSystem:  boolean;
};

const Homepage = () => {
  const [Settings, setSettings] = useState<settings | null>(null);
  const FetchSiteSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      const data: settings = await response.json();
      setSettings(data);
    } catch (error) {
      console.error("Failed to fetch Site Settings:", error);
      
    }
  };

// FetchSiteSettings()


useEffect(() => {
  FetchSiteSettings()
  
}, []);
console.log("!Settings?.storeSystem",!Settings?.storeSystem)

// if(!Settings?.storeSystem){
//   return null;
// }
  return (
    <div className='h-screen' suppressHydrationWarning>
      <div className="bg-base-200">
        <IndexNav />

        <Hero />
        {/* <Services /> */}
        {Settings?.storeSystem && <ServiceTabsWithCountryCheck/>}
        
        <Footer/>
      </div>
    </div>
  );
};

export default Homepage;
