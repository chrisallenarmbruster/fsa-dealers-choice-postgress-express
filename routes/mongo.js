const router = require("express").Router()

router.get("/", (req, res, next) => {
  try {
    res.status(200).send("Hello from Mongo root!")
  } catch {
    next(new Error("Could not find or retrieve items."))
  }
})

module.exports = router
