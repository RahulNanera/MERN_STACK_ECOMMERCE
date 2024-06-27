const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();

const port = 4000;

app.use(express.json());
app.use(cors());

async function main() {
  await mongoose.connect("mongodb://localhost:27017/ECOMMERCE");
}

main()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  res.send("Hello World");
});

const uploadDir = path.join(__dirname, "upload/images");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

app.use("/upload/images", express.static(uploadDir));

app.post("/upload", upload.single("product"), (req, res) => {
  if (req.file) {
    res.json({
      Success: "Image Upload Success",
      image_url: `http://localhost:${port}/upload/images/${req.file.filename}`,
    });
  } else {
    res.json({ Error: "Image Upload Failed" });
  }
});

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

const Product = mongoose.model("Product", productSchema);

app.post("/get-product-details", async (req, res) => {
  const { productId } = req.body;

  const product = await Product.findById(productId);

  if (!product) return res.json({ Success: "false" });

  res.json(product);
});

app.post("/addproduct", async (req, res) => {
  const { id, name, category, new_price, old_price, image } = req.body;

  const product = new Product({
    id,
    name,
    category,
    new_price,
    old_price,
    image,
  });
  await product.save();
  res.json({ Success: "product added successfully" });
});

app.post("/removeproduct", async (req, res) => {
  const removedProduct = await Product.findOneAndDelete({ id: req.body.id });
  res.json(removedProduct);
});

app.get("/allproducts", async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// Create schema for user //

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cartData: {
    type: Map,
    of: Number,
    default: {},
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

app.post("/signup", async (req, res) => {
  try {
    let check = await User.findOne({ email: req.body.email });
    if (check) {
      return res.json({ errors: "User already registered" });
    }

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      cartData: {},
    });
    await user.save();

    const data = {
      user: {
        id: user._id,
      },
    };

    const token = jwt.sign(data, "secret_ecom");
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      const comparePassword = req.body.password === user.password;
      if (comparePassword) {
        const data = {
          user: {
            id: user._id,
          },
        };
        const token = jwt.sign(data, "secret_ecom");
        res.json({ token });
      } else {
        res.json({ errors: "Wrong Password" });
      }
    } else {
      res.json({ errors: "Wrong email" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.json({ errors: "Please authenticate using valid token" });
  }
  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch (error) {
    console.log(error);
  }
};

app.post("/addtocart", fetchUser, async (req, res) => {
  try {
    const userData = await User.findById(req.user.id);
    if (!userData) return res.json({ errors: "User not found" });

    const itemId = req.body.itemId;
    userData.cartData.set(itemId, (userData.cartData.get(itemId) || 0) + 1);
    await userData.save();

    res.json({ message: "Item added to cart" });
  } catch (error) {
    console.log(error);
  }
});

app.post("/removefromthecart", fetchUser, async (req, res) => {
  try {
    const userData = await User.findById(req.user.id);
    if (!userData) return res.json({ errors: "User not found" });

    const itemId = req.body.itemId;
    if (userData.cartData.get(itemId) > 0) {
      userData.cartData.set(itemId, userData.cartData.get(itemId) - 1);
    }
    await userData.save();

    res.json({ message: "Item removed from cart" });
  } catch (error) {
    console.log(error);
  }
});

app.get("/cart", fetchUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.json({ errors: "User not found" });

    res.json(user.cartData);
  } catch (error) {
    console.log(error);
  }
});

app.get("/popularinwomen", async (req, res) => {
  try {
    let products = await Product.find({ category: "women" });
    let popularinwomen = products.slice(-4);
    res.json(popularinwomen);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/newcollection", async (req, res) => {
  try {
    let products = await Product.find();
    let newcollection = products.slice(-8);
    res.json(newcollection);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/related", async (req, res) => {
  try {
    const products = await Product.find();
    const relatedproducts = products.slice(-4);
    res.json(relatedproducts);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
