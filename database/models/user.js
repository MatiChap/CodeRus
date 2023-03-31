module.exports = (sequelize, dataTypes) => {
    let alias = "Users";
    let cols = { id:{
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    } ,
       username: {
           type: dataTypes.STRING
           
       },
       email: {
           type: dataTypes.STRING
           
       },
       pass: {
           type: dataTypes.STRING
       },
       phone: {
           type: dataTypes.STRING
       },
       admin: {
           type: dataTypes.BOOLEAN
       },
       age: {
           type: dataTypes.STRING
       },
       nationality: {
           type: dataTypes.STRING
       },
       createdAt: {
        type: "TIMESTAMP",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      }
    };
    let config = {
        tableName:"user",
        timestamps: true,
        
        
    }
    const User = sequelize.define(alias,cols,config);

    User.associate = function(models){
        User.belongsToMany(models.Devs, {
            as: 'devs',
            through: 'project_dev',
            foreignKey: 'user_id',
            otherKey: 'dev_id',
            timestamps: true,
        })
        
    };
    
    return User;
}