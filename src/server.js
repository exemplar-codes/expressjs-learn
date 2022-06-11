const express = require("express");

const app = express();

// 1. Send raw string as response
// app.get("/", (req, res) => {
//   res.status(400);
//   res.end("hello, world");
// });

// 2. Make static server - just by adding a middleware to static folder
app.use(express.static("public")); // set up middleware

// 3. Use templating engine to dynamically render Views

app.set("views", "templates"); // a. specify path to template directory
app.set("view engine", "jsx"); // b. specify what template engine Express should use, and the language used
app.engine("jsx", require("express-engine-jsx")); // c. satisfy the language dependency using the module

app.get("/users", function (req, res) {
  res.locals.lang = "en"; // set data
  res.render("users", {
    // provide view to render and append more data (called locals)
    users: [{ name: "Max" }, { name: "Bob" }],
    bingos: [2, 20, 3],
  });
});

// 4. Form handling
// 4.1 send the form
app.get("/form", (req, res) => {
  res.send(`
        <form method="post" action="/form">
            <input name="str" />
        </form>
    `);
});
// 4.2 add middleware to read form data - i.e. x-www-form-urlencoded (which is different from raw data)
const bodyparser = require("body-parser"); // in built nodejs module
app.use(bodyparser.urlencoded({ extended: false }));

// 4.3 process form data
app.post("/form", (req, res) => {
  const input_attribute = "str";
  let output;
  try {
    console.log(req.body.str);
    output = req.body[input_attribute].split("").reverse().join("");
  } catch (e) {
    output = `${e}`;
  }

  res.send(output);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Express running on port ${port}`));
