const { UserCourses } = require("../../db/models");

module.exports = {
  getAllUserCourse: async (req, res, next) => {
    try {
      const usercourse = await UserCourses.findAll({
        attributes: ["id", "user", "course"],
      });

      res.status(200).json({
        message: "Success ambil data User course",
        data: usercourse,
      });
    } catch (err) {
      next(err);
    }
  },

  getByIdUserCourse: async (req, res, next) => {
    try {
      const { id } = req.params;
      const usercourse = await UserCourses.findOne({
        where: {
          id: id,
        },
        attributes: ["user", "course"],
      });

      res.status(200).json({
        message: "Success Mendapatkan data",
        data: usercourse,
      });
    } catch (err) {
      next(err);
    }
  },

  createUserCourse: async (req, res, next) => {
    try {
      const { user, course } = req.body;

      const courseUser = await UserCourses.create({
        user: user,
        course: course,
      });

      res.status(201).json({
        message: "Success tambah data user course",
        data: courseUser,
      });
    } catch (err) {
      next(err);
    }
  },

  updateUserCourse: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { user, course } = req.body;

      const checkUserCourse = await UserCourses.findOne({
        where: { id: id },
      });

      const courseUser = await checkUserCourse.update({
        user: user,
        course: course,
      });

      res.status(201).json({
        message: "Success update data user course",
        data: courseUser,
      });
    } catch (err) {
      next(err);
    }
  },

  deleteUserCourse: (req, res, next) => {
    UserCourses.findOne({
      where: { id: req.params.id },
    })
      .then((usercourses) => {
        if (usercourses) {
          usercourses.destroy();

          res.status(200).json({
            message: "Success hapus user course",
            data: usercourses,
          });
        }
      })
      .catch((err) => next(err));
  },
};
