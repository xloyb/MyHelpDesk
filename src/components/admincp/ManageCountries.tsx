import { useState, useEffect } from 'react';
import axios from 'axios';

interface Country {
  id: number;
  name: string;
  shortname: string;
  enabled: boolean;
}

const CountryTable = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('/api/countries', {
          params: { page, search }, // Ensure search is included
        });
        setCountries((prev) => [...prev, ...response.data]);
        setHasMore(response.data.length > 0);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    

    fetchCountries();
  }, [page, search]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
    setCountries([]);
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  const toggleEnabled = async (id: number, currentStatus: boolean) => {
    try {
      await axios.post('/api/countries/toggle', { id, enabled: !currentStatus });
      setCountries(countries.map(c => c.id === id ? { ...c, enabled: !currentStatus } : c));
    } catch (error) {
      console.error('Error toggling enabled status:', error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <input
        type="text"
        placeholder="Search for a country..."
        value={search}
        onChange={handleSearch}
        className="input input-bordered mb-4"
      />
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
              <td>{country.name}</td>
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
      {hasMore && (
        <button onClick={loadMore} className="btn btn-primary mt-4">
          Show More
        </button>
      )}
    </div>
  );
};

export default CountryTable;
