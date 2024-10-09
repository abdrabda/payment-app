# Running using docker

The application can be executed using docker. A docker compose file is located in the root directory. 

Run the following command from the folder's root directory
```bash
docker-compose up
```

From the browser open: http://localhost


# Docker not available

If docker is not available, the frontend and backend has to be executed separately.

Run the frontend app from the frontend's directory. The frontend is accessible on port 4200 (i.e.: http://localhost:4200)

```bash
npm install
ng serve
```

Run the backend app from the backend's directory. The backend is accessible on port 8080 (i.e.: http://localhost:8080)

```bash
mvn spring-boot:run
```





