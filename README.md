INTRODUCTION

This health prototype backend features six services that can be found in the server/api/v1/services folder. 
These services all have an implementation class which strictly implements the contract specified in the specific
service. The implementation classes all depend on one or more Repository classes for creating, retrieving and updating patient and medical record from the database. These dependencies are injected into the class upon instantiation to avoid
creating unnecessary concrete objects.

These services include
- Appointment Service - which handles booking of health test appointments by patients. 
patients can book appointments while admin can view all appointments and update appointments
as well. Appointments are store on postgreSQL database.

- Consult Service - which handles doctor consultations by patients. patients can book a consultation with a doctor.
while admin can view all consultations and update consultations. Consultations are stored on postgreSQL.

- Health Test Service - handles creation and browsing of health tests. only admins can create health tests. patients can now browse available health tests so as to book an appointment. Health Tests are also stored on postgreSQL.

- Itura Service - Itura is a virtual assistant service that facilitates interactions. anyone can access the itura service endpoint.

- Medical Record Service - handles the creation of medical records which includes patient medical history, doctor's report 
and test results. only an admin can create, update and view all medical records. while a patient can only retrieve own medical record. Medical Records are store on the MongoDB database, with the specific patient ID from the postgreSQL database for easy reference and association. 

- Patient Service - handles the creation, login and update of patients. Patients are given a JWT token upon successful login to access protected routes (authentication and authorization). only an admin can view all registered patients.

PROJECT SETUP LOCALLY
- clone repository from github
- make sure docker is installed
- the project has a docker compose file that runs a postgres, mongo, health (this project) and  pgadmin services
- the commands to run the application can be found in the Makefile 
- the composeup command runs the docker compose file and starts up all defined services. For the health service which is this project, docker looks for a Dockerfile which is already in the root directory and builds the project image

CI/CD OVERVIEW
- the project features a ci/cd pipeline that triggers a build and deploy event from github to aws.
- first check out the uploaded source code from the github repository into the docker container using an existing github action.
- next configure aws credential using the aws identity and access management service. create a role that will be assumed by trusted entities
- next login to aws account using aws existing action. this is made possible by the role submitted in the above step
- next, noticed that the app.env was intentionally pushed to github because it will be prefilled with values gotten from aws secrets manager during the workflow. use the aws cli to access secrets stored on the aws secrets manager.
- finally, build and push docker image to amazon ECR. created a repository "health" on aws ECR where the image will be pushed to.

API DOCUMENTATION
The API documentation for the project can be found in the root directory - health.postman_collection.json
