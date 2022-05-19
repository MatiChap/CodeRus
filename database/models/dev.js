module.exports = (sequelize, dataTypes) => {
    let alias = "Devs";
    let cols = { id:{
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    } ,
       name: {
           type: dataTypes.STRING
           
       },
       description: {
           type: dataTypes.STRING
       },
       picture: {
           type: dataTypes.STRING
       },
       age: {
           type: dataTypes.STRING
       },
       nationality: {
           type: dataTypes.STRING
       }

       

    };
    let config = {
        tableName:"dev",
        timestamps: false
        
    }
    const Dev = sequelize.define(alias,cols,config);
    
    Dev.associate = function(models){
        Dev.belongsToMany(models.Users, {
            as: 'users',
            through: 'project_dev',
            foreignKey: 'dev_id',
            otherKey: 'user_id',
            timestamps: false,
        })
    };
    
    
    return Dev;
}
