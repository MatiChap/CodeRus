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
       created_at: {
           type: dataTypes.DATE
        
       },
       updated_at: {
           type: dataTypes.DATE
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
       }
    };
    let config = {
        tableName:"user",
        timestamps: false
        
    }
    const User = sequelize.define(alias,cols,config);

    User.associate = function(models){
        User.belongsToMany(models.Devs, {
            as: 'devs',
            through: 'project_dev',
            foreignKey: 'user_id',
            otherKey: 'dev_id',
            timestamps: false,
        })
    };
    
    return User;
}