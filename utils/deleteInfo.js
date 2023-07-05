class DeleteInfo {
  constructor(model) {
    this.model = model;
  }

  async deleteInfo(req, res) {
    try {
      const { id } = req.params;
      const entity = await this.model.findByIdAndDelete(id);
      if (!entity) {
        return res
          .status(404)
          .json({ message: `${this.model.modelName} not found` });
      }
      res.status(200).json({
        message: `${this.model.modelName} deleted successfully`,
        entity,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${this.model.modelName} deleted successfully` });
    }
  }
}

module.exports = DeleteInfo;
