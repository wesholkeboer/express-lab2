// require the express module
import express from "express";

// create a new Router object
const pizzaRouter = express.Router();

pizzaRouter.get("/", (req, res) => {
  res.render("homepage");
});

pizzaRouter.get("/specialty", (req, res) => {
  const name: string = req.query.name as string;
  const price: string = parseInt(req.query.price as string).toFixed(2);
  res.render("specialty", { name, price });
});

pizzaRouter.get("/review-form", (req, res) => {
  res.render("review-form");
});

pizzaRouter.post("/review-summary", (req, res) => {
  const review = req.body;
  res.render("review-summary", { review });
});

pizzaRouter.get("/build-pizza", (req, res) => {
  const toppings: string[] = [
    "pepperoni",
    "sausage",
    "chcicken",
    "mushromms",
    "olive",
    "green peppers",
    "onion",
    "banana pepper",
    "anchovies",
    "pineAepples",
  ];
  res.render("build-pizza", { toppings });
});

pizzaRouter.post("/your-pizza", (req, res) => {
  const pizza = req.body;
  let price: number = 0;
  let message: string = "";
  let pizzaSize = "";
  let glutenMessage = "Not this time";
  if (pizza.gluten === "on") {
    price += 2;
    glutenMessage = "Yes";
  }
  let toppingsNumber: number = req.body.toppings;

  if (pizza.size === "small") {
    price += 7 + toppingsNumber * 0.5;
    pizzaSize = "Small";
  } else if (pizza.size === "medium") {
    price += 10 + toppingsNumber * 1;
    pizzaSize = "Medium";
  } else {
    price += 12 + toppingsNumber * 1.25;
    pizzaSize = "Large";
  }
  if (price >= 15) {
    message =
      "Because your order meets the $15.00 minimum, you get FREE DELIVERY!";
  }
  let newPrice = price.toFixed(2);
  res.render("your-pizza", {
    pizza,
    pizzaSize,
    toppingsNumber,
    newPrice,
    glutenMessage,
    message,
  });
});

export default pizzaRouter;
