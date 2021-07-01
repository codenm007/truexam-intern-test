# Welcome to OnlineTutor platform !

  

  

### Postman Documentation Link : [Click here](https://documenter.getpostman.com/view/12866660/TzkzpJSV)
  
### Schema design Link : [Click here](https://dbdiagram.io/d/60dc1951dd6a59714825f48f)
  

## Features suported by the apis:
- Create Student Accounts
- Create Instructor Accounts
- Instructor can add /remove /get students in class.
- Instructors can create an Image editing task for students in class.
-  Instructor can get student edited image and grade it from 1-5
- Students has access to their class tasks.
- Students can download the source image and upload it back after editing.
- Students can check stats across submissions that they do.
  
  

## Important Info

  

#### Demo heroku server link [here. ](https://truexam.herokuapp.com/)

  

>  1.  **Get into the cloned folder and tye**  `npm i`.

  

>  2.  **Rename the demo.env to .env and enter the imortant env details** .

  

>  3.  **Restore the database from the dump file or use knex migrations for fresh tables** .

  

>  4.  **Start the server by**  `npm start`

  

>  5.  **The server will be running on** http://localhost:8081/

  
>  5.  **Want to start in dev mode then type**  `npm run dev`

  

## Design and Stacks  Used:

  

 - **NodeJS :** 
 - Very lightweight server.

    - Can run on Single thread processor , so no need of expensive hosting.
    - Non-blocking I/O (can process a huge no of simultaneous concurrent request )

 - **ExpressJS**
   - Good support of MRC (Model Router Controller ) pattern so that
   readability of code should not be an issue during scaling.

    - Good support of middlewares and template engines like ejs or pugjs.
    - Unopinionated, minimalist web framework.

- **PostgreSQL (Due to the data in the site looks structured)**
     - Good integration with GraphQL engines (If needed in future).
      - Support of JSONB.
       - Handles concurreny better.
       - Highly extensible as it can support numerous data types including geometric/GIS, network address types, JSONB, native UUID, timezone-aware timestamps

- **S3 storage.**
     - Scale to Tb's if needed so storage would'nt be an issue during scaling.
     - HIghly available and cost effective.
     - CDN integration is also easy accross different providers.
     

  

**Some info about developer:**

  

  

**Dev By : Nilanjan Majumdar**

  

  

LinkedIn: https://www.linkedin.com/in/majumdarnilanjan/

  

Github: https://github.com/codenm007