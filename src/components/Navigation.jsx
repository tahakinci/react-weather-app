const Navigation = ({ setSearch, handleSubmit, city }) => {
  return (
    <nav className="navigation">
      <div>
        <div className="inline padding-right-500">
          <button className="button">
            <i className="fa-solid fa-desktop"></i>
          </button>
        </div>

        {city ? (
          <div className="inline">
            <i className="fa-solid fa-location-dot inline"></i>

            <p className="inline padding-left-200">
              {city.country}, {city.name}
            </p>
          </div>
        ) : null}
      </div>

      <div className="input-box">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <button className="button">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          <input
            name="country"
            placeholder="Search city..."
            onChange={(e) => setSearch(e.target.value)}
            className="input-box"
          />
        </form>
      </div>
      <div className="mode-box">
        <button className="button">
          <i className="fa-solid fa-moon"></i>
        </button>
        <button className="button">
          <i className="fa-regular fa-sun"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
