import React, { useState } from "react";

const cities = ["Mumbai",
  "azerbaijan",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Ahmedabad",
  "Chennai",
  "Kolkata",
  "Surat",
  "Pune",
  "Jaipur",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Indore",
  "Thane",
  "Bhopal",
  "Visakhapatnam",
  "Pimpri-Chinchwad",
  "Patna",
  "Vadodara",
  "Ghaziabad",
  "Ludhiana",
  "Agra",
  "Nashik",
  "Faridabad",
  "Meerut",
  "Rajkot",
  "Kalyan",
  "Vasai",
  "Varanasi",
  "Srinagar",
  "Aurangabad",
  "Dhanbad",
  "Amritsar",
  "Navi Mumbai",
  "Prayagraj",
  "Ranchi",
  "Howrah",
  "Jabalpur",
  "Gwalior",
  "Noida",
  "Jodhpur",
  "Coimbatore",
  "Vijayawada",
  "Madurai",
  "Guwahati",
  "Chandigarh",
  "Hubli",
  "Mysore",
  "Tirupati",
  "Kochi",
  "Thiruvananthapuram",
  "Goa",
  "Udaipur",
  "Shimla",
  "Manali",
  "Haridwar",
  "Rishikesh",
  "Dehradun",
  "Ooty",
  "Kodaikanal",
  "Pondicherry",
  "Andaman",
  "Lakshadweep",

  // ---------------- WORLD ----------------
  "New York",
  "London",
  "Paris",
  "Tokyo",
  "Singapore",
  "Dubai",
  "Bangkok",
  "Sydney",
  "Melbourne",
  "Toronto",
  "Los Angeles",
  "San Francisco",
  "Chicago",
  "Berlin",
  "Rome",
  "Barcelona",
  "Amsterdam",
  "Seoul",
  "Hong Kong",
  "Istanbul",
  "Doha",
  "Cape Town",
  "Rio de Janeiro",
  "Mexico City",
  "Cairo",
  "Athens",
  "Vienna",
  "Prague",
  "Budapest",
  "Zurich",
  "Geneva"
];

function LocalAutocomplete({ onSelect }) {
  const [query, setQuery] = useState("");
  const [showList, setShowList] = useState(false);

  const filteredCities =
    query.length > 0
      ? cities.filter((city) =>
          city.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  const handleSelect = (city) => {
    setQuery(city);
    setShowList(false);
    onSelect(city);
  };

  return (
    <div className="relative">
      <input
        type="text"
        className="p-3 rounded w-full text-black"
        placeholder="Search destination..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowList(true);
        }}
      />

      {showList && filteredCities.length > 0 && (
        <ul className="absolute bg-white text-black w-full rounded shadow-md max-h-52 overflow-auto z-50">
          {filteredCities.map((city, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-200 cursor-pointer border-b"
              onClick={() => handleSelect(city)}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LocalAutocomplete;
