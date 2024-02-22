<!---
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
--->

## Train-Ticket-Management:

Webpage(Frontend-UI) : [Train-Ticket-Management](https://trainticketm.netlify.app)
- **Tech stacks :** React js, Springboot, MySQL.
- **Frontend :** react.js, javascript, node.js, sass.css.
- **Backend :** springboot, jwt, swagger, eureka, axios, mysql.
  

**Want to run it localy !!!**
## Setup and run:
**For running complete project on localhost:**

*FRONTEND :* 
- In the root foolder

  ```bash
  npm install
  npm run dev
  ```
*BACKEND:* 
- Create the  database in my sql named
  - auth-service
  - user-service
  - station-service
  - train-service
  - ticket-service 
 
  ```bash
  create database `auth-service`;
  create database `user-service`;
  create database `station-service`;
  create database `train-service`;
  create database `ticket-service`;
  ```

- Open the e-ticket-management folder in intelliJ or any other springboot IDE **(JAVA21 is required)**. Run the main .java file in src/java/com/madeeasy/*.java  for all the services.

  OR,

  Go to the mvn-jar folder run all jar file individually 
    ```bash
    java -jar servicename-sevice-0.0.1-SNAPSHOT.jar
    ```
## Snapshot:
![Frontend-UI](https://github.com/Myself-Rohit-Dey/Train-Ticket-Management/assets/75258734/6c415d21-57f7-4f76-802d-c6288222a5b5)
