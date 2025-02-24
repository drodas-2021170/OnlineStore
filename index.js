import { initServer } from "./configs/app.js"
import { config } from "dotenv"
import { connect } from "./configs/mongo.js"
import { addDefaultCategory } from "./src/category/category.controller.js"
import { defaulttAdmin } from "./src/auth/auth.controller.js"

config()
initServer()
connect()

addDefaultCategory()
defaulttAdmin()