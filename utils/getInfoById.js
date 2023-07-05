class GetInfoByID {
  constructor(model) {
    this.model = model;
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const entity = await this.model.findById(id);
      if (!entity) {
        return res
          .status(404)
          .json({ message: `${this.model.modelName} not found` });
      }
      res.status(200).json(entity);
    } catch (error) {
      res
        .status(500)
        .json({ message: `Failed to fetch ${this.model.modelName}` });
    }
  }
}

module.exports = GetInfoByID;
