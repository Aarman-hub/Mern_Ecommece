import Category from '../models/category.js';
import Product from '../models/product.js';
import slugify from 'slugify';

export const getCategory = async (req, res) =>{
    try {
        const categroy = await Category.find({});

        res.json(categroy);
    } catch (err) {
        
    }
}
export const readcategroy = async (req, res) =>{
    try {
        const categroy = await Category.findOne({slug: req.params.slug});

        res.json(categroy);
    } catch (err) {
        
    }
}
export const createCategory = async (req, res) =>{
    try {
        const {name} = req.body;

        if(!name.trim()){
            return res.json({error:"Name is required!"})
        }
        const userCategory = await Category.findOne({name});
        
        if(userCategory){
            return res.json({error:"Category already aviable.!"});
        }

        const categroy = await new Category({name, slug:slugify(name)}).save();

        res.json(categroy);
    } catch (err) {
        res.status(400).json({error:"Something Wrong"});
    }
}
export const updateCategory = async (req, res) =>{
    try {
        const {name} = req.body;
        const {id} = req.params;
        const category = await Category.findByIdAndUpdate(id, {name, slug:slugify(name)}, {new:true});
        res.json(category)
    } catch (err) {
        
    }
}
export const deleteCategory = async (req, res) =>{
    try {
        const category = await Category.findByIdAndRemove(req.params.id);
        res.json(category);
    } catch (err) {
        
    }
}

export const productsByCategory = async (req, res) =>{
    try {
        const category = await Category.findOne({slug: req.params.slug});
        const products = await Product.find({category}).populate("category");

        res.json({
            category, 
            products
        });
    } catch (err) {
        console.log(err);
    }
}