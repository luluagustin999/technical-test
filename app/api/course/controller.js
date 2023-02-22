const { Course } = require("../../db/models");

module.exports = {
  getAllCourse: async (req, res, next) => {
    try {
      const course = await Course.findAll({
        attributes: ["id", "title", "coursecategory"],
      });

      res.status(200).json({
        message: "Success mendapatkan semua data course",
        data: course,
      });
    } catch (err) {
      next(err);
    }
  },

  getByIdCourse: async (req, res, next) => {
    try {
      const { id } = req.params;
      const course = await Course.findOne({
        where: {
          id: id,
        },
        attributes: ["title", "coursecategory"],
      });

      res.status(200).json({
        message: "Success mendapatkan data course",
        data: course,
      });
    } catch (err) {
      next(err);
    }
  },

  createCourse: async (req, res, next) => {
    try {
      const { title, coursecategory } = req.body;

      const course = await Course.create({
        title: title,
        coursecategory: coursecategory,
      });

      res.status(201).json({
        message: "Success menambahkan data course",
        data: course,
      });
    } catch (err) {
      next(err);
    }
  },

  updateCourse: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, coursecategory } = req.body;

      const checkCourse = await Course.findOne({
        where: { id: id },
      });

      const course = await checkCourse.update({
        title: title,
        coursecategory: coursecategory,
      });

      res.status(201).json({
        message: "Success mengubah data course",
        data: course,
      });
    } catch (err) {
      next(err);
    }
  },

  deleteCourse: (req, res, next) => {
    Course.findOne({
      where: { id: req.params.id },
    })
      .then((course) => {
        if (course) {
          course.destroy();

          res.status(200).json({
            message: "Success menghapus course",
            data: course,
          });
        }
      })
      .catch((err) => next(err));
  },
};
