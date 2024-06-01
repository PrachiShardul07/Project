const mongoose = require("mongoose");
const {Schema} = mongoose;

main().then(()=> {
    console.log("Connection Successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDema');
}

const userSchema = new Schema({
    username: String,
    address: [
        {
            _id: false,
            location: String,
            city: String,
    },
],
});

const User = mongoose.model("User", userSchema);

const addUsers = async() => {
    let user1 = new User ( {
        username : "sherlockholmes",
        address: [{
            location: "221B Bkaer Street",
            city: "London"
        }]
    });

    user1.address.push({location: "P32 WallStreet", city: "London"});
    let result = await user1.save();
    console.log(result);
}

addUsers();