import { Card, Image } from "react-bootstrap";
import classes from "./Information.module.css";

function Information() {
  return (
    <Card className={classes.box}>
      <Card.Header>Little things</Card.Header>
      <Card.Body>
        <Card.Title>Know about us</Card.Title>
        <Card.Text>
          "Little Things" is a charming small business owned by a talented and
          passionate Chartered Accountant who decided to turn her creative flair
          into a thriving boutique. The shop specializes in a unique collection
          of handcrafted accessories, scarves, and exquisitely hand-painted
          lamps. Each piece is a beautiful work of art, meticulously crafted
          with intricate patterns and vibrant colors that reflect the artistic
          soul behind the brand. What started as a simple passion project has
          grown into a beloved store that celebrates creativity, craftsmanship,
          and personal style. The success of Little Things is not just the
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHJepEFNrcFvL5GEmyv3d2OU40LBlfXpc-sQ&s"
            alt="An art"
            style={{
              height: "200px",
              width: "200px",
              margin: "3px",
              float: "left",
            }}
            rounded
          />
          result of the owner's vision but also due to the hard work and
          dedication of a group of skilled artisans who bring her ideas to life.
          These workers put their heart and soul into every product, whether
          it's the delicate craftsmanship of accessories or the fine
          brushstrokes on the lamps that make them stand out. Each scarf is
          carefully woven, and every lamp is hand-painted with designs that
          capture a sense of elegance and warmth. The workers are truly the
          backbone of the business, and their attention to detail ensures that
          every item sold in the shop is a unique piece that tells its own
          <Image
            src="https://www.shutterstock.com/image-photo/raxaul-nov-7-indian-man-260nw-1166222425.jpg"
            alt="An artist"
            style={{
              height: "200px",
              width: "200px",
              margin: "3px",
              float: "right",
            }}
            rounded
          />
          story. Customers are drawn to Little Things not only for its
          one-of-a-kind products but also for the personal connection they feel
          with the items. The shop is more than just a place to purchase
          beautiful things—it’s a space where people can find accessories and
          home décor items that resonate with their personal sense of style.
          Each product becomes a reflection of the customer’s personality,
          adding a special touch to their day-to-day life, whether it’s through
          a stylish scarf or a beautifully lit, hand-painted lamp.
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        "Style is a reflection of the everyday choices we make—it’s not just
        about fashion, but about wearing your individuality and expressing who
        you are through the things you love."
      </Card.Footer>
    </Card>
  );
}

export default Information;
