// index.ts
import express from "express";
import router from "./routes";
import dbConnection from "./db-connection"; 


dbConnection();

const app = express();
const port = process.env.PORT || 3000;
const currentDate = new Date().toISOString().split('T')[0];
app.use(express.json());
app.use(router);

app.get("/", (req, res) => {
  const currentDate = new Date().toDateString(); 
  res.status(200).send({
    status: "success",
    message: "Hello World",
    data: {
        date: currentDate,
    },
    
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
