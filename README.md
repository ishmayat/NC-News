# Northcoders News API

Setting Up Local Development Environment
Since environment variables are excluded from Git for security reasons, you'll need to create separate files to connect to the databases locally. Here's how to set them up:

1. Create Environment Files:

Create two new files in the root directory of your project:

.env.test
.env.development
Important: Remember to add these files to your .gitignore file to prevent accidental commits.

2. Configure Environment Variables:

Open each .env file and add a single line following the format:

PGDATABASE=<your_database_name>
Replace <your_database_name> with the actual database name you want to use for that environment. You can find the database names specified in the /db/setup.sql file.

3. Running the Project:

Once you've created the environment files and configured them with the appropriate database names, you can run your project using the provided npm scripts.

---

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
