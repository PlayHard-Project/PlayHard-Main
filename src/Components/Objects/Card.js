import Card from "react-bootstrap/Card";


function BasicCard({ item }) {
  return (
    <Card
      style={{
        width: 300,
        height: 300,
        border: "1px solid rgb(49, 54, 61)",
        backgroundColor: "#fff",
        color: "#000",
      }}
    >
      <Card.Img variant="top" src={item?.image} />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>{item.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default BasicCard;