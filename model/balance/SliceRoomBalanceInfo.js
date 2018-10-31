module.exports = (sequelize, type) => {
    return sequelize.define('SliceRoomBalanceInfo', {
        id: {
            type: type.BIGINT,
            primaryKey: true
        },
        id_room: type.BIGINT,
        date_create: type.DATE,
        sum: type.DECIMAL(15,2),
        room_name: type.STRING,
        user_id: type.BIGINT,
        user_name: type.STRING,
        user_code: type.STRING,
        viber_id: type.STRING,
    })
}