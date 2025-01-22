const express =  require("express");

const app = express();

app.use("/hello", (req, res) => {
    res.send("This Port is running on the HomePage");
});

app.use("/test", (req,res) => {
    res.send("This Port is running on the test Page");
})
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});