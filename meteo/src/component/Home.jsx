import { Button, Col, Container, Form, Row } from "react-bootstrap";

const Home = ({ city, setCity, setLat, setLon, setGoToDetails }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiKey = "f3b950654493390e72e68588e4ba13c4";
    const endpoint =
      "https://api.openweathermap.org/geo/1.0/direct?q=" +
      city +
      "&limit=1&appid=" +
      apiKey;

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("Errore nella fetch");
      }

      const data = await response.json();

      if (data.length === 0) {
        alert("Città non trovata. Riprova.");
        return;
      }

      setLat(data[0].lat);
      setLon(data[0].lon);

      setGoToDetails(true);
    } catch (error) {
      console.error("Errore:", error);
      alert("Si è verificato un errore. Riprova più tardi.");
    }
  };

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col xs={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Label htmlFor="città">Cerca la tua città</Form.Label>
            <Form.Control
              type="text"
              id="città"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              aria-describedby="inserisciCittà"
            />
            <Form.Text id="inserisciCittà" muted>
              Inserisci e ricerca la tua città! Tieniti aggiornato sul meteo!
            </Form.Text>
            <Button type="submit" className="m-3">
              Cerca
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
