const mongoose = require("mongoose");
const {Schema} = mongoose;

main()
.then(()=> {
    console.log("Connection Successful");
})
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDema");
}

const orderSchema = new Schema({
    item: String,
    price: Number,
});

const CustomerSchema = new Schema({
    name: String,
    orders:[
        {
            type: Schema.Types.ObjectId,
            ref: "Order",
        },
    ],
});

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

//Functions
const findCustomer = async () => {
    let result = await Customer.find({}).populate("orders");
    console.log(result[0]);
};

const addCust = async() => {
    let newCust = new Customer({
        name: "Jagruti Shardul"
    });

    let newOrder = new Order({
        item: Pizza,
        price: 250
    });

    newCust.orders.push(newOrder);

    await newOrder.save();
    await newCust.save();

    console.log("added new customer");
};

addCust();

