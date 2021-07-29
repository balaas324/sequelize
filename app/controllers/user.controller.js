const db = require("../models")
const User = db.users;
const Op = db.Sequelize.Op;

exports.create = (req, res)=>{
    if (!req.body.id) {
        res.status(400).send({
            message: "content can not be empty"
        })
    }

    const user = {
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        birthDay: req.body.birthDay
    }

    User.create(user)
        .then(data=>{
            res.send(data)
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message || "some error while creating"
            })
        })
}

exports.findAll = (req, res)=>{
    const lastName = req.query.lastName;

    User.findAll({ where: lastName ? { lastName: { [Op.like]: `%${lastName}%` } } : null})
        .then(data=>{
            res.send(data)
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message || "some error while find all users"
            })
        })
}

exports.findOne = (req, res)=>{
    const id = req.params.id;
    
    User.findByPk(id)
        .then(data=>{
            res.send(data)
        })
        .catch(err=>{
            res.status(500).send({
                message: " error finding the id=" + id
            })
        })
}

exports.update = (req, res)=>{
    const id = req.params.id

    User.update(req.body, { where: { id: id } })
        .then(num=>{
            if (num==1){
                res.send({
                    message: "user updated succesfully"
                })
            } else {
                res.send({
                    message: `cannot update user with id=${id} `
                })
            }
        })
        .catch(err=>{
            res.status(500).send({
                message: "error updating user with id=" + id
            })
        })
}

exports.delete = (req, res)=>{
    const id = req.params.id

    User.destroy({ where: { id: id } })
        .then(num=>{
            if (num==1) {
                res.send({
                    message: "user was deleted succesfully"
                })
            } else {
                res.send({
                    message: `cannot delete user with id=${id}.`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "could not delete user with id= " + id
            })
        })
}

