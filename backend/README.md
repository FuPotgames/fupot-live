# FuPotLive Backend REST APIs

These are all the fupot-live backend APIs for the frontend stack to interact with our end users.
<br/><br/>
# Owner APIs
  **Create Group**
----
  This API is reponsible for Owners to create a game room.

* **URL**

  http://localhost:8000/api/fupot/create-group

* **Method:** `POST` 

* **Header Params**

    `Authorization = Token XXXXX`

* **Body Params**

    `name = [string]`<br/>

* **Success Response:**
  
  * If the Group already exists..

    * **Code:** 200 <br />
    * **Content:** 

    ```json
    {
        "Group already exists"
    }
    ```
  
  * If the Group doesn't exist yet..

    * **Code:** 200 <br />
    * **Content:** 
    ```json
    {
      "id": 7,
      "name": "Subway",
      "owner": 3,
      "user": []
    }
    ```
 
* **Error Response:**
    
  * If the user is not authorized with the token
    
    * **Code:** 401 Unauthorized <br />
    * **Content:** 
    ```json
    {
        "detail": "Authentication credentials were not provided."
    }
    ```
    <br/><br/>

**Get Groups**
----
  This API is reponsible for Owners to retrieve all their created groups.

* **URL**

  http://localhost:8000/api/fupot/get-groups

* **Method:** `GET` 

* **Header Params**

    `Authorization = Token XXXXX`

* **Success Response:**
  
  * This grabs all the groups created by the owners

    * **Code:** 200 <br />
    * **Content:** 

    ```json
    [
      {
          "id": 5,
          "name": "BigBrisket",
          "owner": 3,
          "user": []
      },
      {
          "id": 7,
          "name": "Taco Bell",
          "owner": 3,
          "user": []
      },
      {
          "id": 8,
          "name": "Subway",
          "owner": 3,
          "user": []
      },
      {
          "id": 9,
          "name": "Burger King",
          "owner": 3,
          "user": [
              1
          ]
      }
    ]
    ```
 
* **Error Response:**
    
  * If the user is not authorized with the token
    
    * **Code:** 401 Unauthorized <br />
    * **Content:** 
    ```json
    {
        "detail": "Authentication credentials were not provided."
    }
    ```
    <br/><br/>    
  
**Create Game**
----
  This API is reponsible for Owners to create a game room.

* **URL**

  http://localhost:8000/api/fupot/create-game

* **Method:** `POST` 

* **Header Params**

    `Authorization = Token XXXXX`

* **Body Params**

    `group_id = [integer]`<br/>
    `location = [integer],[integer]`

* **Success Response:**
  
  * If the Game hasn't finished yet..

    * **Code:** 200 <br />
    * **Content:** 

    ```json
    {
        "Game Room already exists, please finish the game first!!"
    }
    ```
  
  * If the Game has finished

    * **Code:** 200 <br />
    * **Content:** 
    ```json
    {
      "id": 9,
      "game_ended": false,
      "location": "12,12333",
      "group_id": 5,
      "owner": 1,
      "join_user": []
    }
    ```
 
* **Error Response:**
    
  * If the user is not authorized with the token
    
    * **Code:** 401 Unauthorized <br />
    * **Content:** 
    ```json
    {
        "detail": "Authentication credentials were not provided."
    }
    ```
    <br/><br/>
# User APIs
  **Join Group**
----
  This API is reponsible for players to join a group, then players could join the game room.

* **URL**

  http://localhost:8000/api/fupot/join-group

* **Method:** `POST`

* **Header Params**

    `Authorization = Token XXXXX`

* **Body Params**

    `group_id = [integer]`

* **Success Response:**
  
  * Joins the user to a specific group

    * **Code:** 200 <br />
    * **Content:** 

    ```json
    {
      "id": 9,
      "name": "Burger King",
      "owner": 3,
      "user": [
          1
      ]
    }
    ```
 
* **Error Response:**
    
  * If the user is not authorized with the token
    
    * **Code:** 401 Unauthorized <br />
    * **Content:** 
    ```json
    {
        "detail": "Authentication credentials were not provided."
    }
    ```

**Get Joined Groups**
----
  This API is reponsible for players to retrieve all the joined groups.

* **URL**

  http://localhost:8000/api/fupot/get-joined-groups

* **Method:** `GET`

* **Header Params**

    `Authorization = Token XXXXX`

* **Success Response:**
  
  * Gets all the groups associated with the user

    * **Code:** 200 <br />
    * **Content:** 

    ```json
    [
      {
          "id": 9,
          "name": "Burger King",
          "owner": 3,
          "user": [
              1
          ]
      }
    ]
    ```
 
* **Error Response:**
    
  * If the user is not authorized with the token
    
    * **Code:** 401 Unauthorized <br />
    * **Content:** 
    ```json
    {
        "detail": "Authentication credentials were not provided."
    }
    ```

**Join Game**
----
  This API is reponsible for players to join a game room. It can be used to see if a player could join a game room or not.

* **URL**

  http://localhost:8000/api/fupot/join-game

* **Method:** `POST`
  
*  **URL Params**

    Haven't Implemented location yet.

   `location = [integer],[integer]` 

* **Header Params**

    `Authorization = Token XXXXX`

* **Body Params**

    `group_id = [integer]`

* **Success Response:**
  
  * If the Game hasn't ended..

    * **Code:** 200 <br />
    * **Content:** 

    ```json
    {
        "id": 7,
        "game_ended": false,
        "group_id": 2,
        "owner": 1,
        "join_user": [
            2,
            3
        ]
    }
    ```
  
  * If the Game has ended

    * **Code:** 200 <br />
    * **Content:** 
    ```json
    { 
        "Game has ended come back later" 
    }
    ```
 
* **Error Response:**
    
  * If the user is not authorized with the token
    
    * **Code:** 401 Unauthorized <br />
    * **Content:** 
    ```json
    {
        "detail": "Authentication credentials were not provided."
    }
    ```
