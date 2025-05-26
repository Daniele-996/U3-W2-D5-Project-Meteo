import Card from "react-bootstrap/Card";

const Footer = () => {
  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>MyMeteo</Card.Title>
        <Card.Text>Grazie per aver navigato con Noi</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">since 2025 </Card.Footer>
    </Card>
  );
};

export default Footer;
