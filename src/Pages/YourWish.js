import { Button, Card, Form } from "react-bootstrap";
import classes from "./YourWish.module.css";
import { useState } from "react";

function YourWish() {
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [imageI, setImageI] = useState("");
  const [switchS, setSwitchS] = useState(false);
  const [loadingD, setLoadingD] = useState(null);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (email.length === 0 || description.length === 0 || imageI.length === 0) {
      return;
    }
    let obj = {
      email: email,
      description: description,
      imageI: imageI,
      switchS: switchS,
    };
    try {
      let resp = await fetch(
        "https://petshop-10b84-default-rtdb.firebaseio.com/userDemand.json",
        {
          method: "POST",
          body: JSON.stringify(obj),
          secureToken: { "Content-Type": "application/json" },
        }
      );
      if (!resp.ok) {
        throw new Error("POST DESIGN ERROR");
      }

      setLoadingD(
        "We got your data,we will mail you details of future communication...❤️"
      );

      let data = await resp.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setEmail("");
    setDescription("");
    setImageI("");
    setSwitchS(false);
    setTimeout(() => {
      setLoadingD(null); // Reset loadingD to hide the message
    }, 5000);
  };

  return (
    <Card className={classes.box}>
      <Card.Header>Lets customize your ideas</Card.Header>

      {loadingD && <Card.Body>{loadingD}</Card.Body>}

      <Card.Body>
        <Form onSubmit={SubmitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description of your idea</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter Your detailed idea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicUrl">
            <Form.Label>Rough sketch</Form.Label>
            <Form.Control
              type="url"
              placeholder="provide url"
              value={imageI}
              onChange={(e) => setImageI(e.target.value)}
            />
          </Form.Group>

          <Form.Check // prettier-ignore
            type="switch"
            id="custom-switch"
            label="Can we use your idea for creating something"
            checked={switchS}
            onChange={(e) => setSwitchS(e.target.value)}
          />

          <Button variant="dark" type="submit">
            Submit
          </Button>
        </Form>
      </Card.Body>
      <Card.Footer className="text-muted" style={{ textAlign: "center" }}>
        Let's add creativity to your idea.
      </Card.Footer>
    </Card>
  );
}
export default YourWish;
