import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export default function Welcome() {
  const { user } = useContext(UserContext);

  return (
    <div className="col-md-4 offset-md-4 d-flex justify-content-center">
      <Card className="p-4 m-3">
        <Card.Img variant="top" src="/assets/avatar.png" />
        <Card.Body>
          <Card.Title>Welcome, {user.username}!</Card.Title>
          <Card.Text>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima
            accusamus odio.
          </Card.Text>
          <Link to="/">
            <Button variant="primary">Go to Home</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}
