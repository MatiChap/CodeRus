module.exports = (sequelize, dataTypes) => {
    let alias = "Devs";
    let cols = { id:{
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    } , user_id: {
        type: dataTypes.INTEGER
    },
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
       },
       createdAt: {
        type: "TIMESTAMP",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      }

       

    };
    let config = {
        tableName:"dev",
        timestamps: true,
        
        
    }
    const Dev = sequelize.define(alias,cols,config);
    
    Dev.associate = function(models){
        Dev.belongsToMany(models.Users, {
            as: 'users',
            through: 'project_dev',
            foreignKey: 'dev_id',
            otherKey: 'user_id',
            timestamps: true,
        });

        Dev.belongsTo(models.Users,{
            as: 'user',
            foreignKey:'user_id',
            timestamps: true
        })
        
    };
    
    
    return Dev;
}
