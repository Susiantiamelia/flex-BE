var express = require('express');
var router = express.Router();
const JournalController = require('../controllers/JournalController')
const Auth = require('../middlewares/authentication')

/* GET home page. */
router.get('/', Auth.authentication, JournalController.getAll);
router.get('/:id', Auth.authentication, JournalController.getByID)
router.post('/add', Auth.authentication, JournalController.addJournal)
router.put('/:id', Auth.authentication, JournalController.updateJournal)
router.delete('/:id', Auth.authentication, JournalController.deleteByID)

module.exports = router;
