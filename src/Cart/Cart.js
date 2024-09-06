import { Button, Modal } from "react-bootstrap";
import classes from "./Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../Redux/CartSlice";
import { listAction } from "../Redux/ListSlice";

function Cart(props) {
  let CartP = useSelector((state) => state.cart.cart);
  const ListP = useSelector((state) => state.list.list);
  let dispatch = useDispatch();
  const decreaseHandler = async (el) => {
    let index = CartP.findIndex((item) => item.nameP === el.nameP);
    let Index = ListP.findIndex((item) => item.nameP === el.nameP);

    try {
      if (CartP[index].amount !== 1) {
        let obj = {
          ...CartP[index],
          amount: CartP[index].amount - 1,
        };
        let resp = await fetch(
          `https://petshop-10b84-default-rtdb.firebaseio.com/cart/${CartP[index].id}.json`,
          {
            method: "PUT",
            body: JSON.stringify(obj),
            secureToken: { "Content-Type": "application/json" },
          }
        );
        if (!resp.ok) {
          throw new Error(resp.status);
        }
        let data = await resp.json();
        console.log(data);
        dispatch(cartAction.decrease(el));
      } else {
        let resp = await fetch(
          `https://petshop-10b84-default-rtdb.firebaseio.com/cart/${CartP[index].id}.json`,
          {
            method: "DELETE",

            secureToken: { "Content-Type": "application/json" },
          }
        );
        if (!resp.ok) {
          throw new Error(resp.status);
        }
        let data = await resp.json();
        console.log(data);
        dispatch(cartAction.decrease(el));
      }
    } catch (error) {
      console.log(error);
    }

    try {
      if (Index !== -1) {
        let obj = {
          ...ListP[Index],
          quantity: ListP[Index].quantity + 1,
        };
        let resp = await fetch(
          `https://petshop-10b84-default-rtdb.firebaseio.com/Data/${ListP[Index].id}.json`,
          {
            method: "PUT",
            body: JSON.stringify(obj),
            secureToken: { "Content-Type": "application/json" },
          }
        );
        if (!resp.ok) {
          throw new Error(resp.status);
        }
        let data = await resp.json();
        console.log(data);

        dispatch(listAction.increment(el));
      } else {
        let obj = {
          ...CartP[index],
          quantity: 1,
        };
        let resp = await fetch(
          `https://petshop-10b84-default-rtdb.firebaseio.com/Data.json`,
          {
            method: "POST",
            body: JSON.stringify(obj),
            secureToken: { "Content-Type": "application/json" },
          }
        );
        if (!resp.ok) {
          throw new Error(resp.status);
        }
        let data = await resp.json();
        console.log(data);

        dispatch(listAction.add({ ...el, quantity: 1, id: data.name }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const increaseHandler = async (el) => {
    let index = CartP.findIndex((item) => item.nameP === el.nameP);
    let Index = ListP.findIndex((item) => item.nameP === el.nameP);
    try {
      console.log(CartP[index].amount, +CartP[index].quantity);
      if (+CartP[index].amount !== +CartP[index].quantity) {
        let obj = {
          ...CartP[index],
          amount: CartP[index].amount + 1,
        };
        let resp = await fetch(
          `https://petshop-10b84-default-rtdb.firebaseio.com/cart/${CartP[index].id}.json`,
          {
            method: "PUT",
            body: JSON.stringify(obj),
            secureToken: { "Content-Type": "application/json" },
          }
        );
        if (!resp.ok) {
          throw new Error(resp.status);
        }
        let data = await resp.json();
        console.log(data);
        dispatch(cartAction.increase(el));
      }
    } catch (error) {
      console.log(error);
    }
    try {
      if (ListP[Index].quantity > 1) {
        let obj = {
          ...ListP[Index],
          quantity: ListP[Index].quantity - 1,
        };
        let resp = await fetch(
          `https://petshop-10b84-default-rtdb.firebaseio.com/Data/${ListP[Index].id}.json`,
          {
            method: "PUT",
            body: JSON.stringify(obj),
            secureToken: { "Content-Type": "application/json" },
          }
        );
        if (!resp.ok) {
          throw new Error(resp.status);
        }
        let data = await resp.json();
        console.log(data);
      } else {
        let resp = await fetch(
          `https://petshop-10b84-default-rtdb.firebaseio.com/Data/${ListP[Index].id}.json`,
          {
            method: "DELETE",
            secureToken: { "Content-Type": "application/json" },
          }
        );
        if (!resp.ok) {
          throw new Error(resp.status);
        }
        let data = await resp.json();
        console.log(data);
      }
      dispatch(listAction.edit(el));
    } catch (error) {
      console.log(error);
    }
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
                {+el.quantity !== +el.amount && (
                  <span
                    className={classes.btn1}
                    onClick={() => increaseHandler(el)}
                  >
                    +
                  </span>
                )}
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
