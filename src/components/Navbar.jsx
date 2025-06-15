function Navbar() {
  const cities = [
    {
      id: 1,
      name: "Lucknow",
    },
    {
      id: 2,
      name: "Raebareli",
    },
    {
      id: 3,
      name: "Pune",
    },
    {
      id: 4,
      name: "Mumbai",
    },
    {
      id: 5,
      name: "Prayagraj",
    },
  ];
  return (
    <div className="flex items-center justify-around my-6">
      {cities.map((city) => (
        <button key={city.id} className="text-white text-lg font-medium">
          {city.name}
        </button>
      ))}
    </div>
  );
}

export default Navbar;
