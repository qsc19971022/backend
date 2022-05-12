const express = require('express');
const router = express.Router();
const Role = require('../db/model/roleModel');
const {resData: resTool} = require('../utils/common');
const ObjectId = require('mongoose').mongo.ObjectId;

const { customLabels } = require('../config/config');
const options = {
  page: 1,
  limit: 10,
  customLabels,
};

router.get('/list', async (req, res) => {
  try {
    const result = await Role.paginate({}, options);
    console.log(result);
    console.log(await Role.count());
    return res.json(resTool.resSuccess(result));
  } catch (err) {
    return res.json(resTool.resError(err));
  }
});

router.post('/getMenuAuthority', async (req, res) => {
  try {
    // const result = await Role.findOne({ _id: req.body._id}).lean();
    let result = await Role.aggregate([
      {
        $match: {
          _id: ObjectId(req.body._id)
        }
      },
      {
       $lookup: {
         from: "menus",
         localField: "menusId",
         foreignField: "_id",
         as: "menus"
       }
     }
    ]);
    return res.json(resTool.resSuccess(result[0]));
  } catch (err) {
    return res.json(resTool.resError(err));
  }
});

router.post('/setMenuAuthority', async (req, res) => {
  try {
    const result = await Role.findByIdAndUpdate(req.body._id, { menusId: req.body.menusId });
    console.log(result);
    return res.json(resTool.resSuccess(result));
  } catch (err) {
    return res.json(resTool.resError(err));
  }
});

router.post('/save', async (req, res) => {
  const role = new Role(req.body);
  let result = Object.create(null);
  try {
    result = await role.save();
    return res.json(resTool.resSuccess(result));
  } catch (err) {
    return res.json(resTool.resError(err, result));
  }
})

router.post('/update', async (req, res) => {
  const { _id, name, status } = req.body;
  try {
    const result = await Role.findByIdAndUpdate(_id, { name, status })
    return res.json(resTool.resSuccess(result));
  } catch (err) {
    return res.json(resTool.resError(err));
  }
})
//
router.post('/del', async (req, res) => {
  try {
    const result = await Role.findByIdAndDelete(req.body._id);
    return res.json(resTool.resSuccess(result));
  } catch (err) {
    return res.json(resTool.resError(err));
  }
})

router.post('/changeStatus', async (req, res) => {
  const { _id, status } = req.body;
  try {
    const result = await Role.findByIdAndUpdate(_id, { status })
    return res.json(resTool.resSuccess(result));
  } catch (err) {
    return res.json(resTool.resError(err));
  }
})



module.exports = router;
