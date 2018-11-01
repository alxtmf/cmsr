
describe("basic tests", function () {
    const Sequelize = require('sequelize');
    const sequelize = new Sequelize('CMSR', 'postgres', 'postgres', {
        host: 'localhost',
        dialect: 'postgres',
        operatorsAliases: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });
    const viberId = 'Fg0PzdflNiISC2ztCsjEGQ==';

    beforeAll(function() {
        sequelize.authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
    });

    it("balance slice selected not object", function () {
        const dateCreate = new Date(2018, 9, 27, 21, 25, 35, 0);
        sequelize.query('SELECT * FROM ' +
            'main.max_slice_rooms_balance_info($viberId, $dateCreate) ',
            { bind: { viberId: viberId, dateCreate: dateCreate }, type: sequelize.QueryTypes.SELECT }
        ).then(mrbi => {
            console.log(mrbi);
            expect(mrbi).not.toBeUndefined(mrbi);
        })

    });

    it("balance slice selected", function () {
        const dateCreate = new Date(2018, 9, 27, 21, 25, 35, 0);
        const SliceRoomBalanceInfoModel = require('../model/balance/SliceRoomBalanceInfo');
        const SliceRoomBalanceInfo = SliceRoomBalanceInfoModel(sequelize, Sequelize);

        sequelize.query('SELECT * FROM ' +
            'main.max_slice_rooms_balance_info($viberId, $dateCreate) ',
            {   bind: { viberId: viberId,
                      dateCreate: dateCreate
                },
                type: sequelize.QueryTypes.SELECT,
                mapToModel: true,
                model: SliceRoomBalanceInfo
            }
        ).then(mrbi => {
            console.log(mrbi);
            expect(mrbi).not.toBeUndefined(mrbi);
        })
    });
});