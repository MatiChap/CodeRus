import React from "react";
import { useState, useEffect, useRef } from "react";
import "../assets/css/app.css";

function Home() {
  const [users, setUsers] = useState();
  const [devs, setDevs] = useState();
  const [projects, setProjects] = useState();
  const [devPic, setDevPic] = useState();

  useEffect(() => {
    function usersData() {
      fetch("http://localhost:4000/usersapi")
        .then((response) => response.json())
        .then((data) => setUsers(data.data));
    }
    function devsData() {
      fetch("http://localhost:4000/devsapi")
        .then((response) => response.json())
        .then((data) => setDevs(data.data));
    }
    function projectsData() {
      fetch("http://localhost:4000/projectapi")
        .then((response) => response.json())
        .then((data) => setProjects(data.data));
    }

    function getDevPic(){
        setDevPic('localhost/4000'+ projects[0].devs.picture )
    }

    usersData();
    devsData();
    projectsData();
    
    console.log(users)
    console.log(devs)
    console.log(projects);
    
  }, []);

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <img src="http://localhost:4000/img/Logo.png"></img><h1 className="h3 mb-0 text-gray-800"> Dashboard</h1>
      </div>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    {" "}
                    Total Users in Database
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {" "}
                    {users && <>{users.length}</>}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    {" "}
                    Total Connections done on CodeRus
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {projects && <>{projects.length}</>}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Total amount of Developers in Database
                  </div>
                  <div className="h5 mb-0 font-weight-bold">
                    {devs && <>{devs.length}</>}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-user-check fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img src="http://localhost:4000/img/tinyLogo.png"></img>
        <div className="row">
          <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">
                 - Last User Registered in Data Dase -
                </h6>
              </div>
                
              <div className="card-body">
                 <div className="text-center">
                 
                 <div className="text-xs font-weight-bold text-success text-uppercase mb-1" >
                    {" "}
                    <ul style={{ color: "black", fontWeight: "lighter", textAlign:"left" }}>{users && <> <li>ID: {users[0].id}</li> <li>USERNAME: {users[0].username} </li> <li>E-MAIL: {users[0].email}</li><li>PHONE: {users[0].phone}</li>  <li>COUNTRY: {users[0].nationality} </li><li>AGE: {users[0].age} </li><li>CREATED AT: {users[0].createdAt}</li>
                    </>}</ul>
                  </div>
                  
                  
                  </div>
               
              </div>
            </div>
          </div>
        </div>
        <img src="http://localhost:4000/img/tinyLogo.png"></img>
        <div className="row">
          <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary text-success">
                 - Last Connection in Data Dase -
                </h6>
              </div>
              <div className="card-body">
                <div className="text-center">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1" >
                    {" "}
                    <p style={{ color: "black", fontWeight: "lighter", textAlign:"left" }}>{projects && <> <ul><li> CONNECTION BETWEEN DEVELOPER {projects[0].devs.name} AND USER {projects[0].users.username}</li><li>CONNECTION TIME: {projects[0].createdAt}</li><li> USER RATING: {projects[0].devRating}/10</li> <li>USER COMMENT: {projects[0].devComment}</li><li>SUCCESSFUL: {projects[0].success}</li></ul></>}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img src="http://localhost:4000/img/tinyLogo.png"></img>
        <div className="row">
          <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary text-warning">
                 - Last Developer in Data Dase -
                </h6>
              </div>
              <div className="card-body">
                <div className="text-center">
                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                       <ul style={{color : "black", fontWeight: "lighter", textAlign:"left"}}> {devs && <> <li> NAME: {devs[0].name}</li><li>COUNTRY: {devs[0].nationality}</li><li>ID: {devs[0].id}</li>
                       <li> PROFILE PICTURE:</li><img style={{maxHeight:'300px', border:'black solid 4px'}}
                    className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                    src={"http://localhost:4000" + devs[0].picture}
                  ></img>
                  <li>DESCRIPTION: {devs[0].description}</li></>}</ul>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
        
      </div>
    
  );
}

export default Home;
