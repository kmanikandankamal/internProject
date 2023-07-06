class AddEntity {
  constructor(Model) {
    this.Model = Model;
  }

  async addItem(req, res) {
    try {
      const data = req.body;
      const item = new this.Model(data);
      const existingItem = await this.Model.findOne(data);

      if (existingItem) {
        return res.status(409).json({
          message: `${this.Model.modelName} already exists`,
          item: existingItem,
        });
      }
      await item.save();
      res.status(201).json({
        message: `${this.Model.modelName} details added successfully`,
        item: item,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: `Failed to add ${this.Model.modelName} details` });
    }
  }
}

module.exports = AddEntity;
