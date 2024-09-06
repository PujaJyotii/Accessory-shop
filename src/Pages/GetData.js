import { Button, Card, Form } from "react-bootstrap";
import classes from "./GetData.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAction } from "../Redux/ListSlice";
import { cartAction } from "../Redux/CartSlice";

function GetData() {
  const [nameP, setNameP] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageP, setImageP] = useState("");
  const [quantity, setQuantity] = useState("");
  let CartP = useSelector((state) => state.cart.cart);
  let ListProduct = useSelector((state) => state.list.list);
  const dispatch = useDispatch();
  async function SubmitHandler(e) {
    e.preventDefault();
    if (
      nameP.length === 0 ||
      description.length === 0 ||
      imageP.length === 0 ||
      +price <= 0 ||
      +quantity <= 0
    ) {
      return;
    }
    let obj = {
      nameP: nameP,
      description: description,
      price: price,
      quantity: quantity,
      imageP: imageP,
    };
    try {
      let resp = await fetch(
        "https://petshop-10b84-default-rtdb.firebaseio.com/Data.json",
        {
          method: "POST",
          body: JSON.stringify(obj),
          secureToken: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!resp.ok) {
        throw new Error("Post Error");
      }

      let data = await resp.json();
      console.log(data);
      dispatch(listAction.add({ ...obj, id: data.name }));
    } catch (error) {
      console.log(error);
    }

    setNameP("");
    setDescription("");
    setPrice("");
    setImageP("");
    setQuantity("");
  }
  useEffect(() => {
    async function getData() {
      let resp = await fetch(
        "https://petshop-10b84-default-rtdb.firebaseio.com/Data.json"
      );
      let data = await resp.json();
      let res = [];
      for (let key in data) {
        res.push({
          ...data[key],
          id: key,
        });
      }
      dispatch(listAction.get(res));
    }
    getData();
  }, [dispatch]);
  const DeleteHandler = async (el) => {
    let index = ListProduct.findIndex((item) => item.nameP === el.nameP);

    try {
      let resp = await fetch(
        `https://petshop-10b84-default-rtdb.firebaseio.com/Data/${ListProduct[index].id}.json`,
        {
          method: "DELETE",
          secureToken: { "Content-Type": "application/json" },
        }
      );
      if (!resp.ok) {
        throw new Error("Delete Error");
      }
      let data = await resp.json();
      console.log(data);
      dispatch(listAction.delete(el));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getData() {
      let resp = await fetch(
        "https://petshop-10b84-default-rtdb.firebaseio.com/cart.json"
      );
      let data = await resp.json();
      let res = [];
      for (let key in data) {
        res.push({
          ...data[key],
          id: key,
        });
      }
      dispatch(cartAction.get(res));
    }
    getData();
  }, [dispatch]);

  const EditHandler = async (el) => {
    setNameP(el.nameP);
    setImageP(el.imageP);
    setDescription(el.description);
    setPrice(el.price);
    setQuantity(el.quantity);
    let index = ListProduct.findIndex((item) => item.nameP === el.nameP);

    try {
      let resp = await fetch(
        `https://petshop-10b84-default-rtdb.firebaseio.com/Data/${ListProduct[index].id}.json`,
        {
          method: "DELETE",
          secureToken: { "Content-Type": "application/json" },
        }
      );
      if (!resp.ok) {
        throw new Error("Edit Error");
      }
      let data = await resp.json();
      console.log(data);
      dispatch(listAction.delete(el));
    } catch (error) {
      console.log(error);
    }

    dispatch(listAction.delete(el));
  };

  const UpdateHandler = async (item) => {
    let index = ListProduct.findIndex((el) => el.nameP === item.nameP);
    if (
      nameP.length === 0 ||
      description.length === 0 ||
      imageP.length === 0 ||
      +price <= 0 ||
      +quantity <= 0
    ) {
      return;
    }
    let obj = {
      nameP: nameP,
      description: description,
      imageP: imageP,
      price: price,
    };
    try {
      let resp = await fetch(
        `https://petshop-10b84-default-rtdb.firebaseio.com/Data/${ListProduct[index].id}.json`,
        {
          method: "PUT",
          body: JSON.stringify(obj),
          secureToken: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!resp.ok) {
        throw new Error("Update Error");
      }
      let data = await resp.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    dispatch(listAction.update({ item, obj }));
    setDescription("");
    setImageP("");
    setNameP("");
    setPrice("");
    setQuantity("");
  };

  const AddHandler = async (el) => {
    let index = CartP.findIndex((item) => item.nameP === el.nameP);
    let Index = ListProduct.findIndex((item) => item.nameP === el.nameP);
    try {
      if (index === -1) {
        let resp = await fetch(
          "https://petshop-10b84-default-rtdb.firebaseio.com/cart.json",
          {
            method: "POST",
            body: JSON.stringify(el),
            secureToken: { "Content-Type": "application/json" },
          }
        );
        if (!resp.ok) {
          throw new Error(resp.status);
        }
        let data = await resp.json();
        console.log(data);
        dispatch(cartAction.addC({ ...el, amount: 1, id: data.name }));
      } else {
        let obj = { ...CartP[index], amount: CartP[index].amount + 1 };
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
        dispatch(cartAction.addC(el));
      }
    } catch (error) {
      console.log(error);
    }

    try {
      if (ListProduct[Index].quantity > 1) {
        let obj = {
          ...ListProduct[Index],
          quantity: ListProduct[Index].quantity - 1,
        };
        let resp = await fetch(
          `https://petshop-10b84-default-rtdb.firebaseio.com/Data/${ListProduct[Index].id}.json`,
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
          `https://petshop-10b84-default-rtdb.firebaseio.com/Data/${ListProduct[Index].id}.json`,
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
  return (
    <>
      <Card className={classes.box}>
        <Card.Header>Data Entry</Card.Header>
        <Card.Body>
          <Form onSubmit={SubmitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name of Product</Form.Label>
              <Form.Control
                type="text"
                value={nameP}
                placeholder="Enter product's name"
                onChange={(e) => setNameP(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                placeholder="Describe product"
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicUrl">
              <Form.Label>Produt Image</Form.Label>
              <Form.Control
                type="url"
                placeholder="provide url"
                value={imageP}
                onChange={(e) => setImageP(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter Price"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter Quantity"
              />
            </Form.Group>

            <Button variant="dark" type="submit">
              Add Product
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <Card className={classes.box1}>
        <Card.Body>
          <ul>
            {ListProduct.map((el) => (
              <li key={el.nameP}>
                <div className={classes.value}>
                  <div>
                    <img
                      src={el.imageP}
                      alt="Accessories"
                      className={classes.imgss}
                    />
                  </div>
                  <div className={classes.box2}>
                    <div className={classes.name}>{el.nameP}</div>
                    <div className={classes.description}>{el.description}</div>
                    <div>Rs.{el.price}</div>
                    <div>Quantity:{el.quantity}</div>
                  </div>
                </div>
                <div className={classes.btns}>
                  <Button
                    variant="outline-dark"
                    style={{ margin: "2px" }}
                    onClick={() => EditHandler(el)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-dark"
                    style={{ margin: "2px" }}
                    onClick={() => UpdateHandler(el)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outline-dark"
                    style={{ margin: "2px" }}
                    onClick={() => DeleteHandler(el)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outline-dark"
                    style={{ margin: "2px" }}
                    onClick={() => AddHandler(el)}
                  >
                    Add Product
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>
    </>
  );
}

export default GetData;
