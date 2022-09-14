### Setup

1. (Windows) Open TaskManager, and make the process `MySQL80` is running.
2. Open MySQLWorkbench, and run the following command to create the required database:

        CREATE database local_profiles_api;
3. Refresh the schemas page to confirm the database was created.
4. In the terminal, cd into to `...\src\local-api`, and run:

        npm run watch
5. Leave the server running.
6. Whenever you make changes to the backend code, kill all terminals, open a new one, and do `npm run watch` again to update the server.