const { Note } = require('../models')

class JournalController {

    static async addJournal (req,res,next) {
        try {
            const { user } = res.locals
            const {notes} = req.body
            if(user) {
                let adding = await Note.create({
                    UserId: user.id,
                    notes,
                    status: 'Journal Added'
                })
                if(adding) {
                    res.status(200).json(adding.dataValues)
                }
            } else {
                res.status(400).send('User not found')
            }
            
        } catch (error) {
            next(error)
        }
    }

    static async getByID (req,res,next) {
        try {
            const { user } = res.locals
            const {id} = req.params
            if(user) {
                let find = await Note.findOne({where: {
                    UserId: user.id,
                    id
                }})
                if(find) {
                    res.status(200).json(find.dataValues)
                } else {
                    res.status(400).send('Journal not found')
                }
            } else {
                res.status(400).send('User not found')
            }
            
        } catch (error) {
            next(error)
        }
    }

    static async getAll (req,res,next) {
        try {
            const { user } = res.locals
            if(user) {
                let find = await Note.findAll({where: {
                    UserId: user.id,
                },order: [['id', 'ASC']]})
                if(find) {
                    res.status(200).json(find)
                }
            } else {
                res.status(400).send('User not found')
            }
            
        } catch (error) {
            next(error)
        }
    }

    static async updateJournal (req,res,next) {
        try {
            const { user } = res.locals
            const {id} = req.params
            const {notes} = req.body
            if(user) {
                let find = await Note.findOne({where: {
                    UserId: user.id,
                    id
                }})
                if(find) {
                    let update = await Note.update({notes}, { where: {
                        UserId: user.id,
                        id
                    }})
                    if(update) {
                        let result = await Note.findOne({where: {
                            UserId: user.id,
                            id
                        }})
                        res.status(200).json(result.dataValues)
                    }
                } else {
                    res.status(400).send('Journal not found')
                }
            } else {
                res.status(400).send('User not found')
            }
            
        } catch (error) {
            next(error)
        }
    }

    static async deleteByID (req,res,next) {
        try {
            const { user } = res.locals
            const {id} = req.params
            if(user) {
                let find = await Note.findOne({where: {
                    UserId: user.id,
                    id
                }})
                if(find) {
                    let deleting = await Note.destroy({where: {
                        UserId: user.id,
                        id
                    }})

                    if(deleting){
                        res.status(200).json({message: 'Journal Deleted'})
                    }
                    
                } else {
                    res.status(400).send('Journal not found')
                }
            } else {
                res.status(400).send('User not found')
            }
            
        } catch (error) {
            next(error)
        }
    }
}

module.exports = JournalController