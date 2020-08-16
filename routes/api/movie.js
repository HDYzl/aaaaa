let express = require('express')
let router = express.Router()
let mgdb = require('../../utils/mgdb')

router.get('/:moviename', (req, res, next) => {
  if (req.query._id) {
    res.redirect(`/api/movie/${req.params.moviename}/${req.params._id}`)
    return;
  }



  //查询列表
  let collectionName = req.params.moviename;//要操作的集合
  let { _page, _limit, _sort, q } = req.query;


  mgdb.findList({
    collectionName,_page,_limit,_sort,q
  }).then(
    result => res.send(result)
  ).catch(
    err => res.send(err)
  )


})






router.get('/:moviename/:_id', (req, res, next) => {
  //处理详情
  let collectionName=req.params.moviename;
  let _id = req.params._id;

  mgdb.findDetail({
    collectionName,_id
  }).then(
    result => res.send(result)
  ).catch(
    err=>res.send(err)
  )

})

module.exports = router;