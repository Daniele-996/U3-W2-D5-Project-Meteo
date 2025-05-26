import { useEffect, useState } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";

const Details = ({ lat, lon, city }) => {
  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const apiKey = "f3b950654493390e72e68588e4ba13c4";

  useEffect(() => {
    if (!lat || !lon) return;

    const getWeather = async () => {
      setIsLoading(true);
      setErrorMsg("");
      setWeatherData([]);

      try {
        const url =
          "https://api.openweathermap.org/data/2.5/forecast?lat=" +
          lat +
          "&lon=" +
          lon +
          "&appid=" +
          apiKey +
          "&units=metric&lang=it";

        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Errore nel caricamento dati meteo");
        }
        const json = await res.json();
        setWeatherData(json.list);
      } catch (e) {
        setErrorMsg(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    getWeather();
  }, [lat, lon]);

  if (!lat || !lon) {
    return (
      <Container>
        <p>Inserisci una località per vedere il meteo.</p>
      </Container>
    );
  }

  const previsionToday = weatherData.filter(function (_, i) {
    return i % 8 === 0;
  });

  return (
    <Container fluid>
      <Row className="justify-content-center my-4">
        <Col xs={12} sm={6} md={6} lg={6}>
          <h4>Oggi</h4>
          {isLoading && <p>Caricamento...</p>}
          {errorMsg && <p className="text-danger">{errorMsg}</p>}

          {previsionToday.length > 0 && (
            <Card className="cardToday">
              <Card.Img
                className="imgCard"
                variant="top"
                src={
                  "https://openweathermap.org/img/wn/" +
                  previsionToday[0].weather[0].icon +
                  "@2x.png"
                }
                alt={previsionToday[0].weather[0].description}
              />
              <Card.Body>
                <Card.Title>{city || "Località sconosciuta"}</Card.Title>
                <Card.Text>
                  Data: {new Date(previsionToday[0].dt * 1000).toLocaleString()}
                  <br />
                  Temp: {previsionToday[0].main.temp} °C
                  <br />
                  Meteo: {previsionToday[0].weather[0].description}
                  <br />
                  Umidità: {previsionToday[0].main.humidity}%
                  <br />
                  Vento: {previsionToday[0].wind.speed} m/s
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Col>

        <Col>
          <h4>Prossimi giorni</h4>
          <Row className="g-3">
            {previsionToday.slice(1).map(function (f) {
              return (
                <Col xs={12} sm={6} md={4} lg={3} key={f.dt}>
                  <Card className="cardNotToday">
                    <Card.Img
                      className="imgCard"
                      variant="top"
                      src={
                        "https://openweathermap.org/img/wn/" +
                        f.weather[0].icon +
                        "@2x.png"
                      }
                      alt={f.weather[0].description}
                    />
                    <Card.Body>
                      <Card.Title>
                        {new Date(f.dt * 1000).toLocaleDateString("it-IT", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                        })}
                      </Card.Title>
                      <Card.Text>
                        {f.weather[0].description}
                        <br />
                        {f.main.temp} °C
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Details;
