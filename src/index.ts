import app from "./app"
import connect from "./config/database";

const PORT = 3000;
// Kết nối tới csdl
connect()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})