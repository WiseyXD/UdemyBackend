const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://WiseyXD:Qwerty88**@testcluster.hbkxnkx.mongodb.net/udemyDB")

const AdminSchema = new mongoose.Schema({
    username : String,
    password : String,
})

const UserSchema = new mongoose.Schema({
    username : String,
    password : String,
})

const CourseSchema = new mongoose.Schema({
    title : String,
    description : String,
    author : String,
    domain : String,
    imageLink : String,
    price : Number,
    id : String,
})

const CartSchema = new mongoose.Schema({
    username : String,
    course : CourseSchema,
})

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);
const Cart = mongoose.model("Cart" , CartSchema);

module.exports = {
    Admin,
    User,
    Course,
    Cart
}