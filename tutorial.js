//REST APIs & Diff Routes

app.get("/ab?c", (req, res) => {
  res.send("This Port is running on the get REST API");
});

app.get("/ab+c", (req, res) => {
  res.send("This Port is running on the get REST API");
});

app.get("/ab*cd", (req, res) => {
  res.send("This Port is running on the get REST API");
});

app.get("/a(bc)?d", (req, res) => {
  res.send("This Port is running on the get REST API");
});

app.get(/a/, (req, res) => {
  res.send("This Port is running on the get REST API");
});

app.get(/.*fly$/, (req, res) => {
  res.send("This Port is running on the get REST API");
});

app.post("/test/:userId/:Password", (req, res) => {
  console.log(req.params)
  res.send({firstName: "Priyanshu", lastName: "Singh"});
});

app.put("/test", (req, res) => {
  res.send("This Port is running on the put REST API");
});

app.patch("/test", (req, res) => {
  res.send("This Port is running on the patch REST API");
});

app.delete("/test", (req, res) => {
  res.send("This Port is running on the delete REST API");
});

app.use("/", (req,res) => {
    res.send("HELLO GUYS, JUICE PILA DO");
})

//middleWares and Error Handling

app.use("/admin", authAdmin);

app.get("/admin/getAllData", (req,res) => {
  res.send("Getting all the data");
})

app.get("/admin/deleteAllUser", (req,res)=>{
  res.send("Deleted the data");
})

app.post("/user/login", (req,res) => {
  res.send("logged in successfully");
})

app.get("/user", (err,req,res,next) => {
  try{
    throw new Error("AbrakaDabra")
    res.send("Welcome to user page");
  }
  catch(err){
    res.status(500).send("Error");
  }
})

app.get("/user/getData", authUser, (req,res) => {
  throw new Error("AbrakaDabra");
  res.send("getting the data");
})

app.get("/", (err,req,res,next)=> {
  res.status(500).send("error Occurs")
})
