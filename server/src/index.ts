import app from "./app"
import connect from "./config/database";
import 'reflect-metadata';

const PORT = 3000;
// Kết nối tới csdl
connect()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})