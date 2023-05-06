const Navigation = ({ setSearch, handleSubmit }) => {
  return (
    <nav className="navigation">
      <div className="nav-wrapper">
        <div>
          <button>Mode</button>
        </div>
        <div>
          <i></i>
          <p>
            <span>City</span>, Country
          </p>
        </div>
      </div>

      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input
            name="country"
            placeholder="Please enter the country"
            onChange={(e) => setSearch(e.target.value)}
            className="input-box"
          />
          <button className="input-box">Submit</button>
        </form>
      </div>
      <div className="nav-wrapper">
        <button className="nav-button">Dark</button>
        <button className="nav-button">Lang</button>
      </div>
    </nav>
  );
};

export default Navigation;
