
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