import OtherCities from "./OtherCities";
const CitiesAndMap = ({ data, cityData, weather }) => {
  const GOOGLE_API_KEY = import.meta.env.REACT_API_KEY_GOOGLE;
  const mapURL = `
  https://maps.googleapis.com/maps/api/staticmap?key=${GOOGLE_API_KEY}&zoom=5&format=png&markers=${data[0]?.name}|${data[1]?.name}|${data[2]?.name}|${data[3]?.name}|${data[4]?.name}&maptype=roadmap&style=element:geometry%7Ccolor:0x212121&style=element:labels%7Cvisibility:off&style=element:labels.icon%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0x757575&style=element:labels.text.stroke%7Ccolor:0x212121&style=feature:administrative%7Celement:geometry%7Ccolor:0x757575%7Cvisibility:off&style=feature:administrative.country%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:administrative.land_parcel%7Cvisibility:off&style=feature:administrative.locality%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&style=feature:administrative.neighborhood%7Cvisibility:off&style=feature:landscape%7Celement:geometry.fill%7Ccolor:0x262428%7Cvisibility:on&style=feature:poi%7Cvisibility:off&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:poi.park%7Celement:geometry%7Ccolor:0x181818&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:poi.park%7Celement:labels.text.stroke%7Ccolor:0x1b1b1b&style=feature:road%7Cvisibility:off&style=feature:road%7Celement:geometry.fill%7Ccolor:0x2c2c2c&style=feature:road%7Celement:labels.icon%7Cvisibility:off&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x8a8a8a&style=feature:road.arterial%7Celement:geometry%7Ccolor:0x373737&style=feature:road.highway%7Celement:geometry%7Ccolor:0x3c3c3c&style=feature:road.highway.controlled_access%7Celement:geometry%7Ccolor:0x4e4e4e&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:transit%7Cvisibility:off&style=feature:transit%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:water%7Celement:geometry%7Ccolor:0x000000&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x3d3d3d&size=480x360

  `;
  return (
    <>
      <section>
        <h3>Global map</h3>
        <div className="h-4/5 w-full">
          {cityData ? (
            <img
              src={mapURL}
              alt="map"
              className="h-full w-full object-cover"
            ></img>
          ) : null}
        </div>
      </section>
      <section>
        <div>
          <h3>Other large cities</h3>
        </div>
        {weather.map((city) => (
          <OtherCities weatherData={city} key={city.city.name} />
        ))}
      </section>
    </>
  );
};

export default CitiesAndMap;
