const { CourseCategory } = require("../../db/models");


module.exports = {
  getAllCategories: async (req, res, next) => {
    try {
      const categories = await CourseCategory.findAll({
        attributes: ["id", "name"],
      });

      res.status(200).json({
        message: "Success mendapatkan semua data course category",
        data: categories,
      });
    } catch (err) {
      next(err);
    }
  },

  getByIdCategories: async (req, res, next) => {
    try {
      const { id } = req.params;
      const categories = await CourseCategory.findOne({
        where: {
          id: id,
        },
        attributes: ["id", "name"],
      });

      res.status(200).json({
        message: "Success mendapatkan data course category",
        data: categories,
      });
    } catch (err) {
      next(err);
    }
  },

  createCategories: async (req, res, next) => {
    try {
      const { name } = req.body;

      const categories = await CourseCategory.create({ name: name });

      res.status(201).json({
        message: "Success menambahkan data course category",
        data: categories,
      });
    } catch (err) {
      next(err);
    }
  },

  updateCategories: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const checkCategory = await CourseCategory.findOne({
        where: {
          id: id,
        },
      });

      const categories = await checkCategory.update({ name: name });
      res.status(200).json({
        message: "Success mengubah data course category",
        data: categories,
      });
    } catch (err) {
      next(err);
    }
  },

  deleteCategories: (req, res, next) => {
    CourseCategory.findOne({
      where: { id: req.params.id },
    }).then((coursecategory) => {
        if(coursecategory) {
            coursecategory.destroy();

            res.status(200).json({
                message: 'Success menghapus data course category',
                data: coursecategory
            })
        }
    })
    .catch((err) => next(err));
  },
};
