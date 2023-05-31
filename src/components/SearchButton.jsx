const SearchButton = ({ setSearch, handleSubmit }) => (
  <div className="bg-black-100 strech m-auto  hidden w-[80%] self-start rounded-[2rem] md:block ">
    <form
      className="  px-5 py-3"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <button className="mr-3">
        <i className="fa-solid fa-magnifying-glass "></i>
      </button>
      <input
        className="min-w-[80%] border-none bg-transparent text-white placeholder-gray-500 focus:outline-none"
        name="country"
        placeholder="Search city..."
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  </div>
);

export default SearchButton;
