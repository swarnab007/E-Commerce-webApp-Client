const Category = require("../models/category.model.js");
const slugify = require("slugify");

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        message: "Name is required",
      });
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({
        message: "Category already exists",
      });
    }
    const category = await Category.create({
      name,
      slug: slugify(name),
    });
    res.status(201).json({
      success: true,
      category,
      message: "Category created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: "Can not create category",
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      {
        new: true,
      }
    );
    return res.status(200).json({
      success: true,
      category,
      message: "Category updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Can not update category",
    });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    return res.status(200).json({
      success: true,
      categories,
      message: "Categories fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Can not get categories",
    });
  }
};

exports.getSingleCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    return res.status(200).json({
      success: true,
      category,
      message: "Category fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Can not get the category",
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Can not delete category",
    });
  }
}