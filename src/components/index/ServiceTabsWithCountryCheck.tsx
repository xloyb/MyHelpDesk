"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

interface Category {
  id: number;
  name: string;
}

interface Service {
  id: number;
  categoryId: number;
  image: string;
  title: string;
  description: string;
  price: number;
  amount: number;
  buyOrSellType: string;
  ShoppyCode: string;
  ShoppyCodeNoCrypto: string;
}

async function fetchCountry() {
  const response = await fetch("/api/getCountry");
  const data = await response.json();
  console.log("Get Country Logged Data:", data);
  return data.country_code;
}

async function checkCountryEnabled(countryCode: string) {
  const response = await fetch(
    `/api/countries/checkcountrystatus?country_code=${countryCode}`
  );
  const data = await response.json();
  console.log("checkcountrystatus Logged Data:", data);
  return data.isEnabled;
}

function ServiceTabsWithCountryCheck() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [countryStatus, setCountryStatus] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const countryCode = await fetchCountry();
        const isEnabled = await checkCountryEnabled(countryCode);
        setCountryStatus(isEnabled);
      } catch (error) {
        console.error("Failed to fetch country status:", error);
        setCountryStatus(null);
      } finally {
        setLoading(false);
      }

      try {
        const categoriesResponse = await axios.get("/api/categories");
        setCategories(categoriesResponse.data);
        setActiveCategory(categoriesResponse.data[0]?.id || null);

        const servicesResponse = await axios.get("/api/services");
        setServices(servicesResponse.data);
      } catch (error) {
        console.error("Error fetching categories or services:", error);
      }
    }

    fetchData();
  }, []);


  const renderServicesForCategory = (categoryId: number) => {
    return services
      .filter((service) => service.categoryId === categoryId)
      .map((service) => (
        <div
          key={service.id}
          className="mt-6 card card-compact shadow-xl w-auto m-2 bg-base-100"
        >
          <figure>
            <div
              style={{
                width: "100%",
                position: "relative",
                paddingBottom: "56.25%",
              }}
            >
              <Image
                src={`/uploads/${service.image}`}
                alt={service.title}
                layout="fill"
                objectFit="contain"
              />
            </div>
          </figure>
          <div className="card-body">
            <h2 className="card-title">{service.title}</h2>
            <p>{service.buyOrSellType}</p>
            {/* <p>
            {countryStatus === null || countryStatus === undefined
              ? <span>ShoppyCode :</span>
              : countryStatus
              ? <span>ShoppyCode :</span>
              : <span>ShoppyCodeNoCrypto: </span>}
            {countryStatus === null || countryStatus === undefined
              ? service.ShoppyCode
              : countryStatus
              ? service.ShoppyCode
              : service.ShoppyCodeNoCrypto}
          </p> */}

            <div className="card-actions justify-end">
              <p className="text-lg font-bold leading-10">
                ${service.price.toFixed(2)}
              </p>
              <button
                className="btn btn-primary"
                data-shoppy-product={
                  countryStatus === null || countryStatus === undefined
                    ? service.ShoppyCode
                    : countryStatus
                    ? service.ShoppyCode
                    : service.ShoppyCodeNoCrypto
                }
              >
                Buy
              </button>

              {/* <button
                className="btn btn-primary"
                data-shoppy-product={service.ShoppyCode}
              >
                Buy
              </button> */}
              <Link href={`/c/`}>
                <button className="btn btn-primary">Contact</button>
              </Link>
            </div>
          </div>
        </div>
      ));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="mt-4">
        <Script src="https://shoppy.gg/api/embed.js"/>
      <div className="tabs tabs-lifted px-6 mx-6">
        {categories.map((category) => (
          <a
            key={category.id}
            className={`tab tab-lifted ${
              activeCategory === category.id ? "tab-active" : ""
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </a>
        ))}
      </div>
      <div className="content-center bg-base-200 card mx-6 mt-5 md:pt-4 px-6">
        <div className="content-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-base-200 card mx-6 mt-5 md:pt-4 px-6">
          {activeCategory && renderServicesForCategory(activeCategory)}
        </div>
      </div>
    </div>
  );
}

export default ServiceTabsWithCountryCheck;
