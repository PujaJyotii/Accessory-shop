import { Button, Modal } from "react-bootstrap";
import classes from "./Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../Redux/CartSlice";

function Cart(props) {
  let CartP = useSelector((state) => state.cart.cart);
  let dispatch = useDispatch();
  const decreaseHandler = (el) => {
    dispatch(cartAction.decrease(el));
  };

  const increaseHandler = (el) => {
    dispatch(cartAction.increase(el));
  };
  const totalA = CartP.reduce((total, item) => {
    return total + item.price * item.amount;
  }, 0);
  return (
    <Modal show={props.onShow} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body className={classes.box1}>
        <ul>
          {CartP.map((el) => (
            <li key={el.nameP}>
              <div>
                <img src={el.imageP} alt="Product" />
              </div>
              <div className={classes.smallerB}>
                <div>{el.nameP}</div>
                <div>{el.description}</div>
                <div>Rs.{el.price}</div>
              </div>
              <div className={classes.btns}>
                <span
                  className={classes.btn1}
                  onClick={() => increaseHandler(el)}
                >
                  +
                </span>
                <span>x{el.amount}</span>
                <span
                  className={classes.btn2}
                  onClick={() => decreaseHandler(el)}
                >
                  -
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Modal.Body>
      <div style={{ textAlign: "center", fontWeight: "bolder" }}>
        Total Amount:Rs.{totalA}
      </div>
      <Modal.Footer>
        <Button variant="dark" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="outline-dark">Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Cart;
