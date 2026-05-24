const express   = require('express');
const router    = express.Router();
const favCtrl   = require('../controllers/favoriteController');
const auth      = require('../middleware/authMiddleware');

router.get('/',              auth, favCtrl.getAll);
router.post('/',             auth, favCtrl.add);
router.delete('/:movieId',   auth, favCtrl.remove);

module.exports = router;
