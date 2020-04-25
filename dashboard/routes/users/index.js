const router = require('express').Router();
const client = require('../../proto-client/user.client')

router.get('/', (req, res) => {
    offset = req.query.offset;
    limit = req.query.limit;
    client.GetAllUsers({offset, limit}, (error, respond) => {
        res.json({error, respond});
    });
});

router.get('/get-parents-by-telegram', (req, res) => {
    telegram = req.query.telegram;
    client.GetParentsByTelegram({telegram}, (error, respond) => {
        res.json({error, respond});
    });
});

router.get('/get-children-by-telegram', (req, res) => {
    telegram = req.query.telegram;
    client.GetChildrenByTelegram({telegram}, (error, respond) => {
        res.json({error, respond});
    });
});

router.get('/get-role-by-email', (req, res) => {
    email = req.query.email;
    client.GetRoleByEmail({email}, (error, respond) => {
        res.json({error, respond});
    });
});

router.get('/get-role-by-telegram', (req, res) => {
    telegram = req.query.telegram;
    client.GetRoleByTelegram({telegram}, (error, respond) => {
        res.json({error, respond});
    });
});



router.post('/', (req, res) => {
    body = req.body;
    client.CreateUser({user: body}, (error, respond) => {
        res.json({error, respond});
    });
});




router.post('/relationship', (req, res) => {
    parentTelegram = req.body.parentTelegram;
    childTelegram = req.body.childTelegram;
    client.CreateRelationship({parentTelegram, childTelegram}, (error, respond) => {
        res.json({error, respond});
    });
});



router.put('/', (req, res) => {
    telegram = req.body.telegram;
    update = req.body.update;
    fields = req.body.fields;
    client.UpdateUser({telegram, update, fields}, (error, respond) => {
        res.json({error, respond});
    });
});

module.exports = router;
