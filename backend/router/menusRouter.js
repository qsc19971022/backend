const express = require('express');
const router = express.Router();
const Menus = require('../db/model/menusModel');
const {resData: resTool} = require('../utils/common');

router.get('/list', async (req, res) => {
  let result = await Menus.find().lean();
  if (result.length > 0) {
    result.map(item => { item.path = item.name })
  }
  return res.json(resTool.resSuccess(result));
});

router.post('/save', async (req, res) => {
  const menus = new Menus(req.body);
  let result = Object.create(null);
  try {
    result = await menus.save();
    return res.json(resTool.resSuccess(result));
  } catch (err) {
    return res.json(resTool.resError(err, result));
  }
})

router.post('/update', async (req, res) => {
  const { _id, type, meta, parentId, component, name, sort, hidden, path } = req.body;
  try {
    const result = await Menus.findByIdAndUpdate( _id, {type, component, meta, parentId, name, sort, hidden, path })
    return res.json(resTool.resSuccess(result));
  } catch (err) {
    return res.json(resTool.resError(err));
  }
})

router.post('/del', async (req, res) => {
  try {
    const result = await Menus.findByIdAndDelete(req.body._id);
    return res.json(resTool.resSuccess(result));
  } catch (err) {
    return res.json(resTool.resError(err));
  }
})



module.exports = router;
