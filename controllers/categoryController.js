import Category from '../schema/categorySchema.js';

// CREATE
export const createCategory = async (req, res) => {
  const newCategory = new Category(req.body);
  try {
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE
export const updateCategory = async (req, res) => {
  try {
    const updatedcategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      { new: true }
    );
    res.status(200).json(updatedcategory);
  } catch (err) {
    res.status(500).json(err);
  }
};

//DELETE CATEGORY
export const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);

    res.status(200).json('Category deleted');
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET BY ID
export const getCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

// GET ALL
export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};
