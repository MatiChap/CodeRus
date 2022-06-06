module.exports = (sequelize, dataTypes) => {
    let alias = "Projects";
    let cols = { id:{
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    } ,
       user_id: {
           type: dataTypes.INTEGER
           
       },
       dev_id: {
           type: dataTypes.INTEGER
       },
       success: {
           type: dataTypes.INTEGER
       },
       ongoing: {
           type:dataTypes.INTEGER
       },
       
       devComment: {
           type: dataTypes.STRING
       },
       
       devRating: {
           type: dataTypes.INTEGER
       },
       projectName: {
           type: dataTypes.STRING
       },
       createdAt: {
        type: "TIMESTAMP",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      }
    };
    let config = {
        tableName:"project_dev",
        timestamps: true,
        
        
    }
    const Project = sequelize.define(alias,cols,config);

    Project.associate = function(models){
        Project.belongsTo(models.Users, {
            as: 'users',
            foreignKey: 'user_id',
            timestamps: true,
        });
        Project.belongsTo(models.Devs,
            {
                as: 'devs',
                foreignKey: 'dev_id',
                timestamps:true,

            })
    };
    
    return Project;
}