import SearchButton from "./SearchButton";

const Navigation = ({ setSearch, handleSubmit, city, date }) => {
  const today = String(new Date(date * 1000)).substring(4, 15);
  return (
    <nav className="grid grid-cols-1 gap-5 md:grid-cols-[3fr_1fr] ">
      <div className="flex flex-row-reverse items-center justify-between md:flex-row md:justify-start">
        <div className="text-[2rem] md:text-[1rem]">
          <button
            type="button"
            className="bg-black-100 h-[50px] w-[50px] cursor-pointer rounded-full border-none object-contain text-center"
          >
            <i className="fa-solid fa-desktop"></i>
          </button>
        </div>
        <p className="block text-[2rem] md:hidden ">{today}</p>
        <SearchButton setSearch={setSearch} handleSubmit={handleSubmit} />
      </div>
      <div className="flex flex-row items-center justify-between">
        {city ? (
          <div className="text-[2rem] md:text-[1rem]">
            <i className="fa-solid fa-location-dot "></i>

            <p className="font-poppins ml-3 inline">
              {city.country}, <span className="text-gray-400">{city.name}</span>
            </p>
          </div>
        ) : (
          <div className="text-[2rem] md:text-[1rem]">
            <i className="fa-solid fa-location-dot"></i>

            <p className="font-poppins ml-3 inline">
              Country, <span className="text-gray-400">City</span>
            </p>
          </div>
        )}
        <div className="bg-black-100  rounded-[2rem] text-[2rem] md:text-[1rem]">
          <button className="bg-black-100 h-[50px] w-[50px] cursor-pointer rounded-full border-none object-contain text-center">
            <i className="fa-solid fa-moon"></i>
          </button>
          <button className="bg-black-100 h-[50px] w-[50px] cursor-pointer rounded-full border-none object-contain text-center">
            <i className="fa-regular fa-sun"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
