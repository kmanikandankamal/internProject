class AddEntity {
  constructor(model) {
    this.model = model;
  }

  async addItem(req, res) {
    try {
      const data = req.body;
      const Item = new this.model(data);
      const existingItem = await this.model.findOne(data);
      console.log(data, existingItem);
      if (existingItem) {
        return res.status(409).json({
          message: `${this.model.modelName} already exists`,
          item: existingItem,
        });
      }
      await Item.save();
      res.status(201).json({
        message: `${this.model.modelName} details added successfully`,
        item: Item,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: `Failed to add ${this.model.modelName} details` });
    }
  }
}

module.exports = AddEntity;
