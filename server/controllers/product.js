import Product from "../models/product.js";
import Category from '../models/category.js';
import slugify from "slugify";
import fs from "fs";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({})
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {}
};
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");

    res.json(product);
  } catch (err) {}
};

export const productPhoto = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).select("photo");
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.send(product.photo.data);
    }
  } catch (err) {}
};
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    // validation
    switch (true) {
      case !name.trim():
        return res.json({ error: "Name is required" });
      case !description.trim():
        return res.json({ error: "Description is required" });
      case !price:
        return res.json({ error: "Price is required" });
      case !category:
        return res.json({ error: "Category is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
      case !shipping.trim():
        return res.json({ error: "Shipping is required" });
      case photo && photo.size > 1000000:
        return res.json({ error: "Image should be less than 1mb in size" });
    }

    // create product
    const product = new Product({ ...req.fields, slug: slugify(name) });

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();

    res.json(product);
  } catch (err) {
    console.log(err);
  }
};
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name.trim():
        return res.json({ error: "Name is required" });
      case !description.trim():
        return res.json({ error: "Description is required" });
      case !price.trim():
        return res.json({ error: "Price is required" });
      case !category:
        return res.json({ error: "Category is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
      case !shipping.trim():
        return res.json({ error: "Shipping is required" });
      // case photo && photo.size > 1000000:
      //     return res.json({ error: "Image should be less than 1mb in size" });
    }

    // console.log({name, description, price, category, quantity, shipping, photo})

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    // await product.save();

    res.json(product);
  } catch (err) {}
};
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.id);
    return res.json({ error: "Delete successfully!" });
  } catch (err) {}
};

export const filteredProducts = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};

    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await Product.find(args);

    res.json(products);
  } catch (err) {}
};

export const productsCount = async (req, res) => {
  try {
    const total = await Product.find({}).estimatedDocumentCount();
    res.json(total);
  } catch (err) {
    console.log(err);
  }
};
export const listProducts = async (req, res) => {
  try {
    const perPage = 4;
    const page = req.params.page ? req.params.page : 1;

    const products = await Product.find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

export const searchProduct = async (req, res) =>{
    try {
        const { keyword } = req.params;
        const results = await Product.find({
        $or: [
            { name: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
        ],
        }).select("-photo");
        
        res.json(results);
    } catch (err) {
        
    }
}

export const relatedProduct = async (req, res) =>{
  try {
    const {productId, categoryId} = req.params;
    const related = await Product.find({
      category:categoryId,
      _id:{$ne: productId}
    })
    .select("-photo")
    .populate("category")
    .limit(3);
    res.json(related);
  } catch (err) {
    
  }
}

export const productByCategory = async (req, res) =>{
  try {
    const category = await Category.findOne({slug:req.params.slug});
    const products = await Product.find({category}).populate({category});


    res.json({
      category,
      products
    });
  } catch (err) {
    
  }
}