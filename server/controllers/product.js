import Product from '../models/product.js';
import slugify from 'slugify';
import fs from 'fs';

export const getProducts = async (req, res) =>{
    try {
        const product = await Product.find({}).select("-photo").limit(12).sort({createdAt:-1});

        res.json(product);
    } catch (err) {
        
    }
}
export const getProduct = async (req, res) =>{
    try {
        const product = await Product.findOne({slug:req.params.slug}).select("-photo").populate("category");

        res.json(product);
    } catch (err) {
        
    }
}

export const productPhoto = async (req, res) =>{
    try {
        const product = await Product.findById(req.params.id).select("photo");
        if(product.photo.data){
            res.set("Content-Type", product.photo.contentType);
            return res.send(product.photo.data);
        }
    } catch (err) {
        
    }
}
export const createProduct = async (req, res) =>{
    try {
        const {name, description, price, category, quantity, shipping} = req.fields;
        const {photo} = req.files;

        switch (true) {
            case !name.trim():
                res.json({error:"Name is required!"});
            case !description.trim():
                res.json({error:"Description is required!"});
            case !price.trim():
                res.json({error:"Price is required!"});
            case !quantity.trim():
                res.json({error:"Quantity is required!"});
            case !category.trim():
                res.json({error:"Category is required!"});
            case !shipping.trim():
                res.json({error:"Shipping is required!"});
            case !photo && photo.size > 1000000:
                res.json({error:"File size must be less than 1mb"});

        }

        // res.json({name, description, price, category, quantity, shipping, photo});

        const product = await new Product({...res.fields, slug:slugify(name)});

        if(photo){
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();

        res.json(product)

    } catch (err) {
        
    }
}
export const updateProduct = async (req, res) =>{
    try {
        const {name, description, price, category, quantity, shipping} = req.fields;
        const {photo} = req.files;

        switch (true) {
            case !name.trim():
                res.json({error:"Name is required!"});
            case !description.trim():
                res.json({error:"Description is required!"});
            case !price.trim():
                res.json({error:"Price is required!"});
            case !quantity.trim():
                res.json({error:"Quantity is required!"});
            case !category.trim():
                res.json({error:"Category is required!"});
            case !shipping.trim():
                res.json({error:"Shipping is required!"});
            case !photo && photo.size > 1000000:
                res.json({error:"File size must be less than 1mb"});
        }


        const product = await Product.findByIdAndUpdate(req.params.id, {...req.fields, slug:slugify(name)}, {new:true});

        if(photo){
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();

        res.json(product)
        
    } catch (err) {
        
    }
}
export const deleteProduct = async (req, res) =>{
    try {
        const product = await Product.findByIdAndRemove(req.params.id);
        return res.json({error:"Delete successfully!"})
    } catch (err) {
        
    }
}