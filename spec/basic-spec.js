
describe("check if test work", function () {
    it("should test work", function () {
        var product = 2 * 3;
        expect(product).toBe(6);
    });
});

describe("test db connection", function () {
    it("connection success", function () {
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

        sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
    });
});
//Fg0PzdflNiISC2ztCsjEGQ==

describe("test select balance slice query", function () {    it("balance slice selected", function () {
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

    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });

    const viberId = 'Fg0PzdflNiISC2ztCsjEGQ==';
    const dateCreate = new Date(2018, 9, 27, 21, 25, 35, 0);
    // sequelize.query('SELECT * FROM ' +
    //     'main.max_slice_rooms_balance_info($viberId, $dateCreate) ',
    //     { bind: { viberId: viberId, dateCreate: dateCreate }, type: sequelize.QueryTypes.SELECT }
    // ).then(mrbi => {
    //     console.log(mrbi)
    // })

    const SliceRoomBalanceInfoModel = require('../model/balance/SliceRoomBalanceInfo');
    const SliceRoomBalanceInfo = SliceRoomBalanceInfoModel(sequelize, Sequelize);

    sequelize.query('SELECT * FROM ' +
        'main.max_slice_rooms_balance_info($viberId, $dateCreate) ',
        {   bind: { viberId: viberId, dateCreate: dateCreate },
            type: sequelize.QueryTypes.SELECT,
            mapToModel: true,
            model: SliceRoomBalanceInfo
        }
    ).then(mrbi => {
        console.log(mrbi)
    })
});
});