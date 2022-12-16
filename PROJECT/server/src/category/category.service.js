const validate = require("../validate");
const Category = require("./Category");

class CategoryService {
  Cateogory;
  constructor(Category) {
    this.Cateogory = Category;
  }

  async add(parent_name, child_name) {
    if (!(await validate(child_name))) {
      throw new Error("Name is required");
    }
    const child = new this.Cateogory({ name: child_name });
    const parent = await this.Cateogory.findOne({
      name: parent_name,
    });
    if (!parent) {
      child.isParent = true;
      await child.save();
      return child;
    }
    await child.save();
    parent.children.push(child);
    await parent.save();
    return parent;
  }

  async delete(name) {
    if (!(await validate(name))) {
      throw new Error("Name is required");
    }
    const category = await this.Cateogory.findOne({ name });
    if (!category) {
      throw new Error("Category not found");
    }
    for (let id of category.children) {
      if (await this.Cateogory.exists({ _id: id })) {
        throw new Error("First delete all children");
      }
    }
    const parents = await this.Cateogory.find({
      children: { $in: [category._id] },
    });
    if (parents && parents.length) {
      for (let parent of parents) {
        await this.Cateogory.findByIdAndUpdate(parent._id, {
          $pullAll: { children: [category._id] },
        });
      }
    }
    await category.remove();
    return true;
  }

  async edit(name, new_name) {
    if (!(await validate(name, new_name))) {
      throw new Error("Name is required");
    }
    const category = await this.Cateogory.findOne({ name });
    if (!category) {
      throw new Error("No category found");
    }
    category.name = new_name;
    await category.save();
    return category;
  }

  async fetchJSON() {
    const categories = await this.Cateogory.find({});

    const parents = categories.filter((item) => item.isParent);

    let categoryJSON = {};

    const populate = async (id) => await this.Cateogory.findById(id);

    const addToJSON = async (json, children) => {
      for (let child of children) {
        json[child.name] = {};
        if (child.children.length > 0) {
          const children = await Promise.all(child.children.map(populate));
          await addToJSON(json[child.name], children);
        }
      }
    };

    await addToJSON(categoryJSON, parents);

    return categoryJSON;
  }
}

module.exports = new CategoryService(Category);
