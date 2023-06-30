const { User, Like, Post, Tag , Profile} = require("../models");
const { Op } = require("sequelize");
class Controller {
  static logout(req, res) {
    req.session.destroy();
    res.redirect("/");
  }
  static login(req, res) {
    const { message } = req.query;
    res.render("login", { message });
  }
  static loginCheck(req, res) {
    let { email, password } = req.body;
    User.findAll({
      where: {
        email: email
      },
    })
      .then((data) => {
        // console.log(data, `ini data di controller`);
        let checkPass = User.bekrip(password, data[0].password)
        // if (data.length != 0) 
        console.log(checkPass);
        if (checkPass) {
          req.session.username = data[0].username;
          req.session.role = data[0].role;
          req.session.UserId = data[0].id;
          if (data[0].role == "user") res.redirect("user");
          else res.redirect("agent");
        } else {
          res.redirect("/?message=User not found T_T");
        }
      })
      .catch((err) => {
        res.redirect('/?message=User not found')
        // res.send(err);
      });
  }
  static register(req, res) {
    res.render("register")
  }
  static registerCheck(req, res) {
    const {username, password, email, role} = req.body
    let dataUserTemp;
    // console.log(req.body,` ini req `);
    User.create({
      username: username,
      password: password,
      email: email,
      role: role
    })
    .then((user) => {
      dataUserTemp = user
      return user
    })
    .then(() => {
      Profile.create({
        UserId: dataUserTemp.id
      })
      res.redirect('/')
    })
    .catch((err) => {
      res.send(err)
    })
  }
}
module.exports = Controller;
