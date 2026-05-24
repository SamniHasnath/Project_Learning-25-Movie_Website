const express    = require('express');
const router     = express.Router();
const movieCtrl  = require('../controllers/movieController');
const auth       = require('../middleware/authMiddleware');
const adminOnly  = require('../middleware/adminMiddleware');

router.get('/',        movieCtrl.getAll);
router.get('/search',  movieCtrl.search);
router.get('/:id',     movieCtrl.getOne);

router.post('/',       auth, adminOnly, movieCtrl.create);
router.put('/:id',     auth, adminOnly, movieCtrl.update);
router.delete('/:id',  auth, adminOnly, movieCtrl.remove);

module.exports = router;
