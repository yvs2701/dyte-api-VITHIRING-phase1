<a name="readme-top"></a>
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<a href="https://www.linkedin.com/in/yashv27/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"></img></a>
<a href="https://www.hackerrank.com/yvs2701"><img src="https://img.shields.io/badge/-Hackerrank-2EC866?style=for-the-badge&logo=HackerRank&logoColor=white" alt="hackerrank"></img></a>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![Product](https://raw.githubusercontent.com/yvs2701/dyte-api-VITHIRING-phase1/main/screenshots/ffcs-api-code.png?token=GHSAT0AAAAAAB5XUDQQFSLUINNI5AUDVC72ZAEM2ZA)

An api to simulate FFCS course registration offered in `Vellore Institute of Technology`, as a part of `Dyte` hiring process. This api follows guidelines and instructions given at: [Google Docs Link](https://docs.google.com/document/d/1G7_S_NHxhxvfEN0if9k0ahoXxE31qVhyXk6vmsjnvcA/edit).\
The testing tool can be found here: [Dyte python script](https://github.com/dyte-submissions/vit-hiring-2023-phase1-test).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get the project up and running follow these simple steps:

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/yvs2701/dyte-api-VITHIRING-phase1.git
   ```
   You can instead download the coedbase as an archive from the download code button.
   
2. Install dependencies
   ```sh
   npm install
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage
* Create a `.env` file and fill in the following secrets:
  - PORT_NO // for express server
  - DB_PORT
  - DB_HOST
  - DB_USER
  - DB_PASSWORD
  - DB_NAME
* To initialize or reset your database in Postgres, run:
  ```sh
  npm run init-db
  ```
* To run the server in development mode run the following command:
  ```sh
  npm run start
  ```

* The server provides the following routes:
    - `/admin/faculty` (POST): creates a new faculty resource.
    - `/admin/slot` (POST): creates a new slot resource along with timings.
    - `/admin/course` (POST): creates a new course resource which references slots and faculties.
    - `/admin/student` (POST): creates a student resource if no such resource exists. Otherwise returns same student resource everytime.
    - `/faculty/:id` (GET): returns a faculty resource.
    - `/course/:id` (GET): returns a course resource.
    - `/register` (POST): associates a student resource with course resource (many-to-many).
    - `timetable` (GET): fetches all the registered courses and their slots for the given student.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
