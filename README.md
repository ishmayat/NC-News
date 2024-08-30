Project Summary - # Northcoders News API
A project building the backend module of the Northcoders Bootcamp.

The project involved building an API for the purpose of accessing application data programmatically. The intention here was to mimic the building of a real world backend service (such as Reddit) which should provide this information to the front end architecture.

The database is PostgreSQL (PSQL), and interaction with it is carried out using node-postgres.

The project involved building of multiple endpoints that made use of Create, Read, Update, and Delete (CRUD)operations. Endpoints are listed below:

app.get("/api/topics", getAllTopics);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles", getAllArticles);
app.get("/api/articles/:article_id/comments", getCommentsByArticleId);
app.post("/api/articles/:article_id/comments", postCommentsByArticleId);
app.patch("/api/articles/:article_id", patchArticleByArticleId);
app.delete("/api/comments/:comment_id", deleteCommentByCommentId);

The project reinforced GitHub learning and utilised git branching and pull requests for code reviews. Merging of pull requests into the main branch was also performed.

Web Links
Link to the hosted version on Render https://issh-nc-news.onrender.com/api
PostgreSQL database is hosted on SupabaseL https://zxtiguqhfypnzklkkohr.supabase.co

Getting Started
Fork the repo in GitHub and clone using the git clone command in your terminal. CD into the file you have created and run the following commands:

install node package manager: install node-postgres: $ npm install pg install jest install supertest

To test run the terminal command: npm test psql \c nc_news OR \c nc_news_test SELECT \* from articles/comments/topics/users to check the database connection

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
