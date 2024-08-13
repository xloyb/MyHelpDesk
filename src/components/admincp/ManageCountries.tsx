/* eslint-disable @next/next/no-img-element */
import { PrismaClient } from '@prisma/client';
import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import prisma from '@/lib/client';


interface Country {
  id: number;
  name: string;
  shortname: string;
  enabled: boolean;
}

const CountryTable: NextPage = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  // Fetch countries from the database
  useEffect(() => {
    const fetchCountries = async () => {
      const countriesData = await prisma.country.findMany();
      setCountries(countriesData);
    };

    fetchCountries();
  }, []);

  // Toggle the enabled status of a country
  const toggleEnabled = async (id: number, enabled: boolean) => {
    await prisma.country.update({
      where: { id },
      data: { enabled: !enabled },
    });
    setCountries(countries.map(country =>
      country.id === id ? { ...country, enabled: !enabled } : country
    ));
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Name</th>
            <th>Short Name</th>
            <th>Enabled</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => (
            <tr key={country.id}>
              <th>
                <label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={country.enabled}
                    onChange={() => toggleEnabled(country.id, country.enabled)}
                  />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={`https://countryflagsapi.com/png/${country.shortname.toLowerCase()}`}
                        alt={`${country.name} Flag`}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{country.name}</div>
                    <div className="text-sm opacity-50">{country.shortname}</div>
                  </div>
                </div>
              </td>
              <td>{country.shortname}</td>
              <td>{country.enabled ? 'Enabled' : 'Disabled'}</td>
              <th>
                <button className="btn btn-ghost btn-xs" onClick={() => toggleEnabled(country.id, country.enabled)}>
                  Toggle Enabled
                </button>
              </th>
            </tr>
          ))}
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Short Name</th>
            <th>Enabled</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default CountryTable;
