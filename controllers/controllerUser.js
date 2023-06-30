const { User, Like, Post, Tag, Profile } = require("../models");
const { Op } = require("sequelize");
const hasLike = require("../helpers/hasLike");
const sumNetWorth = require("../helpers/sumNetWorth");

class Controller {
  static userFeeds(req, res) {
    let { sort } = req.params;
    let { filter } = req.query;
    // console.log(filter);
    if (filter == undefined) filter = "";
    if (sort == undefined) sort = "id";
    if (req.session.username == undefined || req.session.role != "user")
      res.redirect("/?message=Login first");
    else {
      Post.findAll({
        where: { title: { [Op.iLike]: `%${filter}%` } },
        order: [[`${sort}`, "DESC"]],
      })
        .then((data) => {
          res.render("user/userPosts", { data });
        })
        .catch((err) => {
          res.send(err);
        });
    }
  }
  static add(req, res) {
    const { id } = req.params;
    if (req.session.username == undefined || req.session.role != "user")
      res.redirect("/?message=Login first");
    else {
      Post.findAll({
        where: {
          id: id,
        },
      })
        .then((data) => {
          res.render("user/userViewPost", { data });
        })
        .catch((err) => {
          res.send(err);
        });
    }
  }
  static addPost(req, res) {
    const { id } = req.params;
    if (req.session.username == undefined || req.session.role != "user")
      res.redirect("/?message=Login first");
    else {
      Post.findAll({
        where: {
          id: id,
        },
      })
        .then((data) => {
          res.render("user/userViewPost", { data });
        })
        .catch((err) => {
          res.send(err);
        });
    }
  }
  static viewPost(req, res) {
    const { id } = req.params;
    const UserId = req.session.UserId;
    if (req.session.username == undefined || req.session.role != "user")
      res.redirect("/?message=Login first");
    else {
      let dataPostView;
      Post.findAll({
        where: {
          id: id,
        },
        include: { model: Tag },
      })
        .then((dataPost) => {
          // console.log(dataPostView,`data post view`);
          dataPostView = dataPost;
          return Like.findAll({ where: { PostId: id } });
        })
        .then((dataLike) => {
          // console.log(dataPostView,`data post view`);
          res.render("user/userViewPost", {
            dataPostView,
            dataLike,
            UserId,
            hasLike,
          });
        })
        .catch((err) => {
          res.send(err);
        });
    }
  }
  static like(req, res) {
    const { PostId, TagId, UserId } = req.params;
    // console.log("skmmsmssm", req.params);
    if (req.session.username == undefined || req.session.role != "user")
      res.redirect("/?message=Login first");
    else {
      Like.create({ UserId: UserId, PostId: PostId, TagId: TagId })
        .then((data) => {
          // res.redirect(`../../../viewPost/${PostId}`);
          console.log(data, `ini di like user`);
          res.redirect(`../../../viewPost/${PostId}`)
        })
        .catch((err) => {
          console.log(err);
          res.send(err);
        });
    }
  }
  static userTags(req, res) {
    const { id } = req.params;
    if (req.session.username == undefined || req.session.role != "user")
      res.redirect("/?message=Login first");
    else {
      Tag.findAll({})
        .then((data) => {
          res.render("user/userTags", { data });
        })
        .catch((err) => {
          res.send(err);
        });
    }
  }
  static userAddPost(req, res) {
    const { TagId } = req.params;
    const { errors } = req.query
    if (req.session.username == undefined || req.session.role != "user")
      res.redirect("/?message=Login first");
    else {
      res.render("user/userAddPost", { TagId, errors });
    }
  }
  static userAddPostPost(req, res) {
    const UserId = req.session.UserId
    // console.log(UserId, `ini user id`);
    const { title, TagId, imgUrl, content } = req.body;
    if (req.session.username == undefined || req.session.role != "user")
      res.redirect("/?message=Login first");
    else {
      Post.create({
        title: title,
        imgUrl: imgUrl,
        TagId: TagId,
        content: content,
        UserId: UserId
      })
        .then((data) => {
          res.redirect("/user");
        })
        .catch((err) => {
          if(err.name == "SequelizeValidationError") {
            let temp = err.errors.map(el => el.message)
            // console.log(temp,` ini eror`);
            res.redirect(`/user/post/add/${TagId}?errors=${temp}`)
          }
          // res.send(err);
        });
    }
  }
  static account(req, res) {
    let userId = req.session.UserId
    let dataUser;
    let dataPost;
    // console.log(userId,` ini user id`);
    if (req.session.username == undefined || req.session.role != "user")
      res.redirect("/?message=Login first");
    else {
      User.findAll({
        where: {
          id: userId
        }
      })
      .then(data => {
        // console.log(data,`ini controler user`);
        dataUser = data
        return Post.findAll({
          where: {
            UserId: userId
          },
          include: {
            model: Tag
          }
        })
      })
      .then(data2 => {
        // console.log(data2,`ini controler user`);
        dataPost = data2
        return Like.findAll({
          where: {
            UserId: userId
          },
          include: {
            model: Tag
          }
        })
      })
      .then(data3 => {
        // console.log(data3,`ini controler user cek data3`);
        // res.send(`ini masuk ke account`)
        res.render("user/userAccount", {dataUser, dataPost, data3, sumNetWorth})
        // res.render("user/userAccount", {data3, dataPost, dataUser, sumNetWorth})
      })
      .catch(err => {
        res.send(`err`)
      })
    }
  }
  static accountUpdate(req, res) {
    const { id } = req.params
    const { errors } = req.query
    Profile.findAll({
      where: {
        UserId: id
      }
    })
    .then((data) => {
      console.log(data, `ini di dalam controller`);
      res.render("user/updateAccount", {data, errors})
    })
    .catch((err) => {
      res.send(err)
    })
  }
  static accountUpdatePost(req, res) {
    const {firstName, lastName, birthDate, gender} = req.body
    const {id} = req.params
    // console.log(id, `ini id`);
    // console.log(req.body,`ini req body`)
    // console.log( req.session.UserId, `ini req session`);
    console.log(req.body,` ini req `);
    Profile.update({
      firstName: firstName,
      lastName: lastName,
      birthDate: birthDate,
      gender: gender
    },{   
      where: {
        UserId: id
      }
    })
    .then((user) => {
      res.redirect('/user/account')
    })
    .catch((err) => {
      if(err.name == "SequelizeValidationError") {
        let temp = err.errors.map(el => el.message)
        // console.log(temp,` ini eror`);
        res.redirect(`/user/account/${id}?errors=${temp}`)
      } else {
        res.send('err')
      }
    })
  }
}
module.exports = Controller;
