# RakshaSutraX: Incident Response Playbook 🚨



Table of Contents 📋

    1. Project Overview
    2. Features
    3. Prerequisites
    4. Installation
    5. Configuration
    6. Dependencies
    7. Usage
    8. Folder Structure
    9. Technologies Used
    10. Contributing
    11. License

Overview 📖

RakshaSutra is a robust, scalable Incident Response Playbook designed to help security teams efficiently handle cybersecurity incidents such as ransomware attacks, phishing campaigns, and malware outbreaks. Built with automation, structured workflows, and centralized tools, it streamlines response processes to minimize downtime and mitigate threats.

Features 🌟

  - Incident Response Automation: Predefined steps to respond to securityevents.
  - OAuth Integration: Secure login with Google OAuth.
  - Session Management: User sessions stored securely using MongoDB.
  - Dynamic UI: EJS templating for easy customization and layouts.
  - Scalable Database: MongoDB for incident data management.
  - Modular Design: Code organized for scalability and maintainability.

PREREQUISITES⚙️


    • Node.js (v14+ recommended)
    • MongoDB for data storage
    • API credentials for integrated tools (Google Authentication.)

INSTALLATION 🚀
   
1.Clone the Repository:

       git clone https://github.com/yourusername/rakshasutra-playbook.git

       # Navigate to the project directory
       cd rakshasutra-playbook

2.Install Dependencies:  
      
       npm install

 
Environment Configuration ⚙️

Create a .env file and add the required credentials:  

       MONGODB_URI = mongodb+srv://<username>:<password>@mongodburlhere

        GOOGLE_CLIENT_ID= YOUR_GOOGLE_ID_HERE
        GOOGLE_CLIENT_SECRET= YOUR_GOOGLE_CLIENT_SECRET_HERE
        GOOGLE_CALLBACK_URL=http://localhost:5000/google/callback  

        PORT=5000     

DEPENDENCIES 📦

Install the following packages:

            npm install connect-mongo dotenv ejs express express-ejs-layouts express-session method-override mongoose passport passport-google-oauth20

Install nodemon to automatically restart the server during changes:

        npm install -g nodemon

USAGE 🛠️ 

Run the server in development mode:

    nodemon app.js

Run the Application:   

       npm start
          
Access the Interface:

       http://localhost:5000

FOLDER STRUCTURE 📂       

     


       

