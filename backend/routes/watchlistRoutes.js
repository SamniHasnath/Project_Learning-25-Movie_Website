const express   = require('express');
const router    = express.Router();
const wlCtrl    = require('../controllers/watchlistController');
const auth      = require('../middleware/authMiddleware');

router.get('/',              auth, wlCtrl.getAll);
router.post('/',             auth, wlCtrl.add);
router.delete('/:movieId',   auth, wlCtrl.remove);

module.exports = router;
