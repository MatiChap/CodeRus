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
       userComment: {
           type: dataTypes.STRING
       },
       devComment: {
           type: dataTypes.STRING
       },
       userRating: {
           type: dataTypes.INTEGER
       },
       devRating: {
           type: dataTypes.INTEGER
       },
       projectName: {
           type: dataTypes.STRING
       }
    };
    let config = {
        tableName:"project_dev",
        timestamps: false
        
    }
    const Project = sequelize.define(alias,cols,config);
    
    return Project;
}