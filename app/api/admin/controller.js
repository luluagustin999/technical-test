const { Admin } = require("../../db/models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  signin: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const checkAdmin = await Admin.findOne({ where: { email: email } });

      if (checkAdmin) {
        const checkPassword = bcrypt.compareSync(password, checkAdmin.password);

        if (checkPassword) {
          const token = jwt.sign(
            {
              admin: {
                id: checkAdmin.id,
                name: checkAdmin.name,
                email: checkAdmin.email,
              },
            },
            "secretketjwt"
          );
          res.status(200).json({ message: "Berhasil login", token: token });
        } else {
          res.status(403).json({ message: "Invalid password" });
        }
      } else {
        res.status(403).json({ message: "Invalid email" });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  signup: async (req, res, next) => {
    try {
      const { name, email, password, confirmPassword } = req.body;

      if (password != confirmPassword) {
        res
          .status(403)
          .json({ message: "Password tidak sama dengan confirm password" });
      }

      const checkEmail = await Admin.findOne({ where: { email: email } });
      if (checkEmail) {
        return res.status(403).json({ message: "Email sudah terdaftar" });
      }

      const admin = await Admin.create({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
      });

      delete admin.dataValues.password;

      res.status(200).json({
        message: "Berhasil sign up",
        data: admin,
      });
    } catch (err) {
      next(err);
    }
  },
};
