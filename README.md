# Api Tokopedia Play


## Database Structure

**Collection User**
```
[
	{
	_id:  "64c219a75eadf975dbe85de2",
	username:"james32",
	password:"mypassword",
	avatar:"https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg"
	}
]
```


**Collection Video**
```
[
	{
	_id:  "64c2178d5172e47351801427",
	urlImageThumb:  "https://img.youtube.com/vi/PKg-HPFISoE/sddefault.jpg",
	product_id:["64c2178c5172e47351801420", "64c21784e24084a279c42495"], //contains specified _ids belonging to the product associated with the video
	comment_id:["64c21a7bd3df1d812c9f88ef"] //contains specified _ids belonging to the comment associated with the video
	}
]
```


**Collection Product**
```
[
	{
	_id:"64c2178c5172e47351801420",
	linkProduct:  "https://www.tokopedia.com/guardian-officia/kahf-oil-acne-care-face-wash-100ml?extParam=ivf%3Dfalse&src=topads",
	title:"KAHF OIL&ACNE CARE FACE WASH 100ML",
	price:30500
	}
]
```

**Collection Comment**
```
[
	{
	_id:"64c21a7bd3df1d812c9f88ef",
	username:  "james32",
	comment:  "Nyaman di muka,ga bikin kering",
	timestamp:  "2023-07-27T07:19:23.204+00:00"
	}
]
```

# API Structure

- server.js
- app/
  - v1/
    - config/
      - config.js
    - business/
      - models/
        - video.model.js
        - product.model.js
        - comment.model.js
        - user.model.js
       - services/
	      - video.service.js
	      - product.service.js
	      - comment.service.js
	      - user.service.js
    - data/
        - seeds/
          - videos.js
          - products.js
          - comments.js
          - users.js
        - connections/
          - db.connection.js
    - presentation/
      - controllers/
        - video.controller.js
        - product.controller.js
        - comment.controller.js
        - auth.controller.js
       - middlewares/
         - auth.middleware.js
      - routes/
        - routes.js

Explanation:

-   `server.js`: The main file to run the server and connect the application to a specific port.
-   `app/`: This folder contains all the application components.
-   `v1/`: The first version of the API. If you want to add different versions in the future, you can create additional folders like `v2/`.
-   `config/`: This folder contains the application configuration files, such as environment variables, etc.
-   `business/`: This folder contains the business logic of the application, including the model definitions and database operations.
-   `models/`: This folder contains files that define the data models used in the application. These models describe the structure and schema of data stored in the database.
-    `services/`: This folder contains files that define the service layer for each data model. Each service file encapsulates the business logic related to that specific model.
-   `data/`: This folder contains data layer
-   `seeds/`: This folder contains seed data to populate the initial data into the database.
-   `presentation/`: This folder contains components related to the presentation or user interface of the application.
-   `controllers/`: This folder contains responsible for handling HTTP requests and responses. It acts as an interface between the outside world (clients making API requests) and the internal application logic.
-   `routes/`: This folder contains files that handle the API endpoints.

# List APIs

## **Video Thumbnail List**

 **GET /channels**

Returns all video's thumbnail in the system.

-   **URL Params**  
    None
-   **Data Params**  
    None
-   **Headers**  
    Content-Type: application/json
-   **Success Response:**
-   **Code:**  200  
    **Content:**

```
{
  videos: [
           {
	           videoId:<string>,
	           urlImageThumb:<string>
           },
           {
	           videoId:<string>,
	           urlImageThumb:<string>
           },
         ]
}
```

## **Product List**

 **GET /channel?videoId=**

Returns all products associated with the specified video.

-   **URL Params**  
    _Required:_  `videoId=[string]`
-   **Data Params**  
    None
-   **Headers**  
    Content-Type: application/json  
-   **Success Response:**
-   **Code:**  200  
    **Content:**

```
{
  products: [
           {
	           productId:<string>,
	           linkProduct:<string>,
	           title:<string>,
	           price:<string>
           },
           {
	           productId:<string>,
	           linkProduct:<string>,
	           title:<string>,
	           price:<string>
           },
         ]
}

```

-   **Error Response:**
    -   **Code:**  404  
        **Content:**  `{ message: "video not found" }`  
        Or
        **Code:**  404  
        **Content:**  `{ message: "products not found" }`  

## **Comment List**

 **GET /channels/comments?videoId=**

Returns all comments associated with the specified video.

-   **URL Params**  
    _Required:_  `videoId=[string]`
-   **Data Params**  
    None
-   **Headers**  
    Content-Type: application/json  
-   **Success Response:**
-   **Code:**  200  
    **Content:**

```
{
  comments: [
           {
	           username:<string>,
	           comment:<string>,
	           timestamp:<date>
           },
           {
	           username:<string>,
	           comment:<string>,
	           timestamp:<date>
           }
         ]
}

```

-   **Error Response:**
    -   **Code:**  500  
        **Content:**  `{ message: "Internal server error" }`  
    -   **Code:**  404  
        **Content:**  `{ message: "video not found" }`  
        Or
    -    **Code:**  404  
        **Content:**  `{ message: "comments not found" }` 

## **Submit Comment**

 **POST /channels/comments**

Creates a new comment in specified video and returns status success or fail.

-   **URL Params**  
    None
-   **Data Params**  
```
{
    username: string,
    comment: string,
    videoId: string
  }
```
-   **Headers**  
    Content-Type: application/json  
-   **Success Response:**
-   **Code:**  201  
    **Content:**

```
{
	success: true,
	fail: false         
}

```

-   **Error Response:**
    -   **Code:**  400  
        **Content:**  
```
{
	success: false,
	fail: true,
	message:  'videoId, username, and comment are required'
}

```
Or
-   **Code:**  401  
    **Content:**  `{ message: "You must login" }`

## **Search Product by Title**

 **GET /search?title=**

Creates a new comment in specified video and returns status success or fail.

-   **URL Params**  
    _Required:_  `videoId=[string]`
-   **Data Params**  
None
-   **Headers**  
    Content-Type: application/json  
-   **Success Response:**
-   **Code:**  200  
    **Content:**

```
{
  products: [
           {
	           productId:<string>,
	           linkProduct:<string>,
	           title:<string>,
	           price:<string>
           }
         ]
}

```

-   **Error Response:**
    -   **Code:**  404  
        **Content:**  `{ message: "No products found" }`
        
  ## **Register**
 **POST /register**

Creates a new User and returns the new object.

-   **URL Params**  
    None
-   **Headers**  
    Content-Type: application/json
-   **Data Params**

```
  {
    username: string,
    password: string,
    avatar:string || null
  }

```
-   **Success Response:**
-   **Code:**  201  
    **Content:**  `{ message:"new user registered" }`

-   **Error Response:**
    -   **Code:**  400  
        **Content:**  `{ message: "username already exists" }`

## **Login**
 **POST /login**

Login by registered username and password.

-   **URL Params**  
    None
-   **Headers**  
    Content-Type: application/json
-   **Data Params**

```
  {
    username: string,
    password: string
  }

```
-   **Success Response:**
-   **Code:**  200  
    **Content:**  `{ message:"Login success" }`

-   **Error Response:**
    -   **Code:**  401  
        **Content:**  `{ message: "Invalid credentials" }`

## Prerequisites 
Before running this project, make sure you have the following installed on your machine: 
- [Node.js](https://nodejs.org/en)
- [MongoDB](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/)

## How to Run


- Clone the repo and open the project.
	```
	git clone https://github.com/afiqbomboloni/tokopediaplay.git
	cd tokopediaplay
	```
- Install the dependencies
`npm install`

- Set up environment variables:
Create  `.env`  file
    
    You can copy the  `env.sample`  and change its values.
    ```
    cp env.sample .env
    ```
- Make your database:
Open your terminal,
    
   
    ```
    mongosh
    use tokopediaplay_db
    ```

-   Run the application in different terminal
    
    ```
    node server.js
    /or
    nodemon server.js
    ```
    The server will start  running  at http://localhost:8080
  ## How to Seed
  if you want to run the application, you can use the available seeders
    
- Run the file seeder to insert product data or delete it
	```
	npm run products:import
	npm run products:destroy
	```
- Run the file seeder to insert video data or delete it
	```
	npm run videos:import
	npm run videos:destroy


## Postman Collection
   [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/22889851-ddf645eb-e704-4bc9-9d17-7ee1bfcb803c?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D22889851-ddf645eb-e704-4bc9-9d17-7ee1bfcb803c%26entityType%3Dcollection%26workspaceId%3D8d0ca22d-7787-4b78-8e6f-a4f14b7dfa6a)