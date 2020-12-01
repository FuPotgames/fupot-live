# FuPotLive Backend REST APIs

These are all the fupot-live backend APIs for the frontend stack to interact with our end users.
<br/><br/>
# Account APIs
  **Registration**
----
  This API is reponsible for registering owners and users.

* **URL**

  http://localhost:8000/api/account/register

* **Method:** `POST` 

* **Header Params**

    `Authorization = Token XXXXX`

* **Body Params**

    `username: khanc`<br/>
    `email: tahmidahmed1000@gmail.com`<br/>
    `password: khan123`<br/>
    `password2: khan123`<br/>
    `phone_number: 5672234121`<br/>

* **Success Response:**
  
  * If the account already exists, then it just going to return this response

    * **Code:** 200 <br />
    * **Content:** 

    ```json
    {
      "email": [
          "account with this email already exists."
      ],
      "username": [
          "account with this username already exists."
      ]
    }
    ```

    * If Registration is Successful its going to return that reponse and now the user has to confirm the verification link to validate their account

    * **Code:** 200 <br />
    * **Content:** 

    ```json
    {
      "response": "successfully registered new user.",
      "email": "tahmidahmed1000@gmail.com",
      "username": "khanc",
      "phone_number": "5672234121",
      "token": "53c87902105ed4ae69abe2be6609e799036bbf5f"
    }
    ```
    <br/>

**Login**
----
  This API is reponsible for logging in users and owners.

* **URL**

  http://localhost:8000/api/account/login

* **Method:** `POST`

* **Success Response:**
  
  * If the user/owner is successfully logged in

    * **Code:** 200 <br />
    * **Content:** 

    ```json
    {
      "token": "53c87902105ed4ae69abe2be6609e799036bbf5f",
      "username": "khanc",
      "email": "tahmidahmed1000@gmail.com",
      "phone_number": "5672234121",
      "verified": false
    }
    ```
 
* **Error Response:**
    
  * If the user provide incorrect credentials
    
    * **Code:** 401 Unauthorized <br />
    * **Content:** 
    ```json
    {
      "non_field_errors": [
          "Unable to log in with provided credentials."
      ]
    }
    ```
  <br/>

**Resend Confirmation Email**
----
  This API is reponsible for resending confirmation email just in case the owner/user didn't receive the confirmation email

* **URL**

  http://localhost:8000/resend-confirm_email/

* **Method:** `GET`

* **Header Params**

    `Authorization = Token XXXXX`

* **Body Params**

    `email = <email>` <br/>

* **Success Response:**
  
  * If this is the correct user, whose verified status is not active

    * **Code:** 200 <br />
    * **Content:** 

    ```json
    {
      "response": "Successfully sent another confimation email"
    }
    ```
  * If this is not the right user/owner requesting the confirmation email

    * **Code:** 200 <br />
    * **Content:** 

    ```json
    {
      "response": "You don't have permission to send confirm email"
    }
    ```
  <br/>

**Account Properties**
----
  This API is just return username and email for the specified user

* **URL**

  http://localhost:8000/api/account/account-properties

* **Method:** `GET`

* **Header Params**

    `Authorization = Token XXXXX`

* **Success Response:**

    * **Code:** 200 <br />
    * **Content:** 

    ```json
    {
      "pk": 3,
      "email": "tahmidahmed1000@gmail.com",
      "username": "khanc"
    }
    ```
    <br/>

**Update Account Properties**
----
  This API is changes the username of the user and email

* **URL**

  http://localhost:8000/resend-confirm_email/

* **Method:** `PATCH`

* **Header Params**

    `Authorization = Token XXXXX`

* **Body Params**

    `username: tom [optional]`<br/>
    `email: tom1000@gmail.com [optional]` <br/>
    `old_email: tahmidahmed1000@gmail.com`

* **Success Response:**
  
  * If this is the correct old_email, then..

    * **Code:** 200 <br />
    * **Content:** 

    ```json
    {
      "response": "Account Update success"
    }
    ```
  * If the token is different compared to the current old_email, then..

    * **Code:** 200 <br />
    * **Content:** 

    ```json
    {
      "response": "You don't have permission to change that"
    }
    ```
  <br/>

# Owner APIs
  **Create Group**
----
  This API is reponsible for owners to create their group 

* **URL**

  http://localhost:8000/api/fupot/create-group

* **Method:** `POST`

* **Header Params**

    `Authorization = Token XXXXX`

* **Body Params**

    `name: Subway`<br/>
    `address: 3958 Fettler Park Dr, Dumfries, VA 22025`<br/>
    `establishment_type: restaurant`<br/>
    `latitude: 38.584717076157126`<br/>
    `longitude: -77.3309118635760`

* **Success Response:**
  
  * If the group is successfully created, then..

    * **Code:** 200 <br />
    * **Content:** 

    ```json
    {
      "id": 12,
      "name": "Subway",
      "address": "3958 Fettler Park Dr, Dumfries, VA 22025",
      "establishment_type": "restaurant",
      "email": "tahmidahmed1000@gmail.com",
      "phone_number": "5672234121",
      "latitude": 38.584717076157126,
      "longitude": -77.330911863576,
      "owner": 3,
      "user": []
    }
    ```

    * If the group is already created, then..

    * **Code:** 200 <br />
    * **Content:** 

    ```json
    [
      {
          "model": "fupot.group",
          "pk": 12,
          "fields": {
              "name": "Subway",
              "address": "3958 Fettler Park Dr, Dumfries, VA 22025",
              "establishment_type": "restaurant",
              "email": "tahmidahmed1000@gmail.com",
              "phone_number": "5672234121",
              "latitude": 38.584717076157126,
              "longitude": -77.330911863576,
              "owner": 3,
              "user": []
          }
      },
      {
          "reponse": "Group already exists with this owner"
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

  <br/>

**Edit Group**
----
  This API is reponsible for owners to edit their group properties

* **URL**

  http://localhost:8000/api/fupot/edit-group/<group_id>

* **Method:** `PATCH`

* **Header Params**

    `Authorization = Token XXXXX`

* **Body Params**

    `name: Subway [optional]`<br/>
    `address: 3958 Fettler Park Dr, Dumfries, VA 22025 [optional]`<br/>
    `establishment_type: restaurant [optional]`<br/>
    `latitude: 38.584717076157126 [optional]`<br/>
    `longitude: -77.3309118635760 [optional]`

* **Success Response:**
  
  * If the edit is successfull, then its just going to return the edited response

    * **Code:** 200 <br />
    * **Content:** 

    ```json
    {
      "id": 12,
      "name": "Subway",
      "address": "3958 Fettler Park Dr, Dumfries, VA 22025",
      "establishment_type": "restaurant",
      "email": "tahmidahmed1000@gmail.com",
      "phone_number": "5672234121",
      "latitude": 38.584717076157126,
      "longitude": -77.330911863576,
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


  <br/>

**Create Question**
----
  This API is reponsible for owners to create question

* **URL**

  http://localhost:8000/api/fupot/create-question

* **Method:** `POST`

* **Header Params**

    `Authorization = Token XXXXX`

* **Body Params**

    `title: Potao`<br/>
    `prompt: What is potato`<br/>
    `starts_at: 08:51 PM`<br/>
    `ends_at: 20:31:22`<br/>
    `has_winner: True [Default to False]`<br/>
    `answers_1: Kaou`<br/>
    `answers_2: Jaos`<br/>
    `group: 12`<br/>
    `location: 133,22`<br/>
    `answers_3: Pos`<br/>
    `answers_4: kjkjs`<br/>
    `correct_answer: jaos`

* **Success Response:**
  
  * If the create question is successful, then..

    * **Code:** 200 <br />
    * **Content:** 

    ```json
    {
      "id": 6,
      "bg_img": null,
      "title": "Potao",
      "prompt": "What is potato",
      "starts_at": "08:51 PM",
      "ends_at": "20:31:22",
      "closed": false,
      "has_winner": true,
      "num_submissions": 0,
      "sent": true,
      "answers_1": "Kaou",
      "answers_2": "Jaos",
      "answers_3": "Pos",
      "answers_4": "kjkjs",
      "correct_answer": "jaos",
      "location": "133,22",
      "group": 12,
      "owner": 3
    }
    ```

    * If the create question is not successful, then..

    * **Code:** 200 <br />
    * **Content:** 

    ```json
    {
      "reponse": "title, prompt, starts_at, ends_at, answers_1, answers_2,answers_3, answers_4, correct_answer, location are required "
    }
    ```
    <br/>



**Edit Question**
----
  This API is reponsible for owners to create question

* **URL**

  http://localhost:8000/api/fupot/edit-question/<question_id>

* **Method:** `PATCH`

* **Header Params**

    `Authorization = Token XXXXX`

* **Body Params**

    `title: Potao [optional]`<br/>
    `prompt: What is potato [optional]`<br/>
    `starts_at: 08:51 PM [optional]`<br/>
    `ends_at: 20:31:22 [optional]`<br/>
    `has_winner: True [Default to False] [optional]`<br/>
    `answers_1: Kaou [optional]`<br/>
    `answers_2: Jaos [optional]`<br/>
    `group: 12`<br/>
    `location: 133,22 [optional]`<br/>
    `answers_3: Pos [optional]`<br/>
    `answers_4: kjkjs [optional]`<br/>
    `correct_answer: jaos [optional]`

* **Success Response:**
  
  * If the edit question is successful, then it just return the edited question

    * **Code:** 200 <br />
    * **Content:** 

    ```json
    {
      "id": 6,
      "bg_img": null,
      "title": "Potao",
      "prompt": "What is potato",
      "starts_at": "08:51 PM",
      "ends_at": "20:31:22",
      "closed": false,
      "has_winner": true,
      "num_submissions": 0,
      "sent": true,
      "answers_1": "Kaou",
      "answers_2": "Jaos",
      "answers_3": "Pos",
      "answers_4": "kjkjs",
      "correct_answer": "jaos",
      "location": "133,22",
      "group": 12,
      "owner": 3
    }
    ```
    <br/>

**Get Owner Questions**
----
  This API is reponsible for getting all the questions for the owner

* **URL**

  http://localhost:8000/api/fupot/get-owner-questions

* **Method:** `GET`

* **Header Params**

    `Authorization = Token XXXXX`

* **Success Response:**
  
  * If the request is success, then..

    * **Code:** 200 <br />
    * **Content:** 

    ```json
    [
      {
          "id": 4,
          "bg_img": null,
          "title": "Mind",
          "prompt": "What Would You Rather Throw Away: Love Or Money?",
          "starts_at": "19:31:22",
          "ends_at": "20:31:22",
          "closed": false,
          "has_winner": true,
          "num_submissions": 0,
          "sent": true,
          "answers_1": "Kaou",
          "answers_2": "Jaos",
          "answers_3": "Pos",
          "answers_4": "kjkjs",
          "correct_answer": "jaos",
          "location": "133,22",
          "group": 12,
          "owner": 3
      },
      {
          "id": 5,
          "bg_img": null,
          "title": "Places",
          "prompt": "What's The Most Beautiful Place You've Ever Seen?",
          "starts_at": "19:31:22",
          "ends_at": "20:31:22",
          "closed": false,
          "has_winner": true,
          "num_submissions": 0,
          "sent": true,
          "answers_1": "Kaou",
          "answers_2": "Jaos",
          "answers_3": "Pos",
          "answers_4": "kjkjs",
          "correct_answer": "jaos",
          "location": "133,22",
          "group": 12,
          "owner": 3
      },
      {
          "id": 6,
          "bg_img": null,
          "title": "tets",
          "prompt": "What's The Strangest Thing In Your Refrigerator?",
          "starts_at": "08:51:00",
          "ends_at": "20:31:22",
          "closed": false,
          "has_winner": true,
          "num_submissions": 0,
          "sent": true,
          "answers_1": "Kaou",
          "answers_2": "Jaos",
          "answers_3": "Pos",
          "answers_4": "kjkjs",
          "correct_answer": "jaos",
          "location": "133,22",
          "group": 12,
          "owner": 3
      },
      {
          "id": 7,
          "bg_img": null,
          "title": "Ho",
          "prompt": "What's The Strangest Thing In Your Refrigerator?",
          "starts_at": "08:51:00",
          "ends_at": "20:31:22",
          "closed": false,
          "has_winner": true,
          "num_submissions": 0,
          "sent": true,
          "answers_1": null,
          "answers_2": "Jaos",
          "answers_3": "Pos",
          "answers_4": "kjkjs",
          "correct_answer": "jaos",
          "location": "133,22",
          "group": 12,
          "owner": 3
      }
    ]
    ```
    <br/>

**Check Answers, Notify Users,clear and Store Results**
----
  This API is reponsible for checking answers for a particular question, and notifying all the winners and losers, as well as storing results in the database

* **URL**

  http://localhost:8000/api/fupot/notify_results/<group_id>

* **Method:** `DELETE`

* **Header Params**

    `Authorization = Token XXXXX`

* **Body Params**

    `winner_title: Congrats..`
    `loser_title: Sorry,`
    `question_id: 9`
    `winner_body: You Won!!`
    `loser_body: Better luck next time`
    `extra_data: [optional]`

* **Success Response:**
  
  * If the request is successful, then..

    * **Code:** 200 <br />
    * **Content:** 

    ```json
    {
      "reponse": "Successfully checked the answer for that question, notified users who won and loss and stored them in the database",
      "Winner": "Adam Smith"
    }
    ```
    <br/>



**Notify/Send Messages To a Group**
----
  This API is reponsible for group owners to send messages/notification to their individual group

* **URL**

  http://localhost:8000/api/fupot/notify-group/<group_id>

* **Method:** `POST`

* **Header Params**

    `Authorization = Token XXXXX`

* **Body Params**

    `title: New Promotions!!`
    `body: Come try our new Dessert!!`
    `extra_data: none`

* **Success Response:**
  
  * Notification/Store Message Sent Success, then..

    * **Code:** 200 <br />
    * **Content:** 

    ```json
    {
      "id": 8,
      "message": "Come try our new Dessert!!",
      "created_at": "2020-12-01T03:32:07.685428Z",
      "owner": 3,
      "group": 12
    }
    ```
    <br/>



**Create Owner Statistics**
----
  This API is reponsible for owners to have their statistics setup after their registration in the database

* **URL**

  http://localhost:8000/api/fupot/create-owner-statistics

* **Method:** `POST`

* **Header Params**

    `Authorization = Token XXXXX`

* **Success Response:**
  
  * Success Statistics Setup for Owner..

    * **Code:** 200 <br />
    * **Content:** 

    ```json
    {
      "id": 1,
      "question_asked": 0,
      "prizes_issued": 0,
      "owner": 3
    }
    ```
    <br/>



**Update Owner Statistics**
----
  This API is reponsible for updating owner statistics one at a time or multiple

* **URL**

  http://localhost:8000/api/fupot/update-owner-statistics/<group_id>

* **Method:** `PATCH`

* **Header Params**

    `Authorization = Token XXXXX`

* **Body Params**

    Increment whatever integer value is passed on the body into the database

    `question_asked: 2`
    `prizes_issued: 0`

* **Success Response:**
  
  * At update success, then..

    * **Code:** 200 <br />
    * **Content:** 

    ```json
    {
      "id": 1,
      "question_asked": 2,
      "prizes_issued": 0,
      "owner": 3
    }
    ```
    <br/>



**Get Owner Statistics**
----
  This API is reponsible for getting owner statistics

* **URL**

  http://localhost:8000/api/fupot/get-owner-statistics

* **Method:** `GET`

* **Header Params**

    `Authorization = Token XXXXX`

* **Success Response:**
  
  * Retreive Owner Statistics Success..

    * **Code:** 200 <br />
    * **Content:** 

    ```json
    [
      {
          "id": 1,
          "question_asked": 2,
          "prizes_issued": 0,
          "owner": 3
      }
    ]
    ```
    <br/>



# User APIs
  **Search Groups**
----
  This API is reponsible for searching,filtering and ordering groups and retrieve the results as a paginated list

  Search by name,address,username

* **URL**

  http://localhost:8000/api/fupot/search-groups?search=club&ordering=-latitude

* **Method:** `GET`

* **Header Params**

    `Authorization = Token XXXXX`

* **Success Response:**
  
  * If search results are found, then..

    * **Code:** 200 <br />
    * **Content:** 

    ```json
    {
      "count": 2,
      "next": null,
      "previous": null,
      "results": [
          {
              "id": 6,
              "name": "Popeys",
              "address": "16603 Telescope Ln",
              "establishment_type": "Club",
              "email": null,
              "phone_number": null,
              "latitude": 1.2333333,
              "longitude": -6.22222,
              "owner": 1,
              "user": [
                  2,
                  1
              ]
          },
          {
              "id": 3,
              "name": "Subway",
              "address": "5890 Kingstowne Center, Alexandria, VA 22315",
              "establishment_type": "Club",
              "email": null,
              "phone_number": null,
              "latitude": 38.775819446901636,
              "longitude": -77.13599838145205,
              "owner": 1,
              "user": [
                  2,
                  1
              ]
          }
      ]
    }
    ```

  <br/>

**Join Group**
----
  This API is reponsible for users to join specific group

* **URL**

  http://localhost:8000/api/fupot/join-group

* **Method:** `POST`

* **Header Params**

    `Authorization = Token XXXXX`

* **Body Params**

    `group_id: <integer>`

* **Success Response:**
  
  * If the join group is successful, then..

    * **Code:** 200 <br />
    * **Content:** 

    ```json
    {
      "id": 12,
      "name": "SPecialTest",
      "address": "3958 Fettler Park Dr, Dumfries, VA 22025",
      "establishment_type": "restaurant",
      "email": "tahmidahmed1000@gmail.com",
      "phone_number": "5672234121",
      "latitude": 38.584717076157126,
      "longitude": -77.330911863576,
      "owner": 3,
      "user": [
          2,
          1,
          3
      ]
    }
    ```
    <br/>

**Get Joined Groups**
----
  This API is reponsible for retreiving all the joined groups by the user

* **URL**

  http://localhost:8000/api/fupot/get-joined-groups

* **Method:** `GET`

* **Header Params**

    `Authorization = Token XXXXX`

* **Success Response:**
  
  * Fetch all the joined groups, then..

    * **Code:** 200 <br />
    * **Content:** 

    ```json
    [
      {
          "id": 12,
          "name": "SPecialTest",
          "address": "3958 Fettler Park Dr, Dumfries, VA 22025",
          "establishment_type": "restaurant",
          "email": "tahmidahmed1000@gmail.com",
          "phone_number": "5672234121",
          "latitude": 38.584717076157126,
          "longitude": -77.330911863576,
          "owner": 3,
          "user": [
              2,
              1,
              3
          ]
      }
    ]
    ```
    <br/>

**Get Group Questions**
----
  This API is responsible for getting group specific questions by the group id

* **URL**

  http://localhost:8000/api/fupot/get-user-questions

* **Method:** `GET`

* **Header Params**

    `Authorization = Token XXXXX`

* **Body Params**

    `group: <integer>`

* **Success Response:**
  
  * Fetch questions by group id, then..

    * **Code:** 200 <br />
    * **Content:** 

    ```json
    [
      {
          "id": 9,
          "bg_img": null,
          "title": "Test QUES",
          "prompt": "what is what?",
          "starts_at": "03:00:00",
          "ends_at": "03:00:00",
          "closed": false,
          "has_winner": true,
          "num_submissions": 0,
          "sent": false,
          "answers_1": "pot",
          "answers_2": "sot",
          "answers_3": "cot",
          "answers_4": "mot",
          "correct_answer": "mot",
          "location": "43,66",
          "group": 12,
          "owner": 3
      }
    ]
    ```
    <br/>

**Answer Question**
----
  This API is responsible for users to answer question

* **URL**

  http://localhost:8000/api/fupot/answer-question

* **Method:** `POST`

* **Header Params**

    `Authorization = Token XXXXX`

* **Body Params**

    `answer: Cheetah`
    `group: 12`
    `question: 9`

* **Success Response:**
  
  * If the answer request is successful, then..

    * **Code:** 200 <br />
    * **Content:** 

    ```json
    {
      "id": 4,
      "username": "gjg",
      "answer": "mot",
      "created_at": "04:44:21.040149",
      "correct": false,
      "group": 12,
      "question": 9,
      "user": 3
    }
    ```
    <br/>

**Create User Statistics**
----
  This API is reponsible for users to have their statistics setup after their registration in the database

* **URL**

  http://localhost:8000/api/fupot/create-user-statistics

* **Method:** `POST`

* **Header Params**

    `Authorization = Token XXXXX`

* **Success Response:**
  
  * Success Statistics Setup for User..

    * **Code:** 200 <br />
    * **Content:** 

    ```json
    {
      "id": 1,
      "questions_answered": 0,
      "groups_joined": 0,
      "prizes_won": 0,
      "user": 3
    }
    ```
    <br/>



**Update User Statistics**
----
  This API is reponsible for updating user statistics one at a time

* **URL**

  http://localhost:8000/api/fupot/update-user-statistics/<group_id>

* **Method:** `PATCH`

* **Header Params**

    `Authorization = Token XXXXX`

* **Body Params**

    Increment whatever integer value is passed on the body into the database,
    Note: Update one value at a time

    `questions_answered: 1`
    `groups_joined: 2`
    `prizes_won: 4`

* **Success Response:**
  
  * At update success, then..

    * **Code:** 200 <br />
    * **Content:** 

    ```json
    {
      "id": 1,
      "questions_answered": 2,
      "groups_joined": 4,
      "prizes_won": 12,
      "user": 3
    }
    ```
    <br/>



**Get User Statistics**
----
  This API is reponsible for getting user statistics

* **URL**

  http://localhost:8000/api/fupot/get-user-statistics

* **Method:** `GET`

* **Header Params**

    `Authorization = Token XXXXX`

* **Success Response:**
  
  * Retreive User Statistics Success..

    * **Code:** 200 <br />
    * **Content:** 

    ```json
    [
      {
          "id": 1,
          "questions_answered": 2,
          "groups_joined": 4,
          "prizes_won": 12,
          "user": 3
      }
    ]
    ```
    <br/>




**Get Result Status**
----
  This API is reponsible for getting result status of a question after the answer is checked

* **URL**

  http://localhost:8000/api/fupot/get-result-status

* **Method:** `GET`

* **Header Params**

    `Authorization = Token XXXXX`

* **Success Response:**
  
  * Retreive Result Status..

    * **Code:** 200 <br />
    * **Content:** 

    ```json
    [
      {
          "id": 5,
          "question": "what is what?",
          "correct_answer": "mot",
          "user_answer": "mot",
          "correct": true,
          "group_instance": 12,
          "user": 3
      },
      {
          "id": 7,
          "question": "what is what?",
          "correct_answer": "mot",
          "user_answer": "mot",
          "correct": true,
          "group_instance": 12,
          "user": 3
      }
    ]
    ```
    <br/>



**Delete Individual Result Status**
----
  This API is reponsible for deleting specific notification win/loss status

* **URL**

  http://localhost:8000/api/fupot/remove-status/<result_status_id>

* **Method:** `DELETE`

* **Header Params**

    `Authorization = Token XXXXX`

* **Success Response:**
  
  * On Delete:

    * **Code:** 200 <br />
    * **Content:** 

    ```json
    {
      "response": "Status removed!"
    }
    ```
    <br/>



# General APIs

**Store Device Token For Notification**
----
  This API is reponsible for storing notification token

* **URL**

  http://localhost:8000/api/fupot/notification

* **Method:** `POST`

* **Header Params**

    `Authorization = Token XXXXX`

* **Body Params**

    `registration_id: 7797797999`<br/>
    `name: 769uij`<br/>
    `type: android`

* **Success Response:**
  
  * Notification Store Success, then..

    * **Code:** 200 <br />
    * **Content:** 

    ```json
    {
      "id": 8,
      "name": "769uij",
      "active": true,
      "date_created": "2020-12-01T03:25:49.152936Z",
      "device_id": null,
      "registration_id": "7797797999",
      "type": "android",
      "user": 3
    }
    ```
    <br/>

**Get Group Messages**
----
  This API is reponsible for getting group messages

* **URL**

  http://localhost:8000/api/fupot/get-group-messages

* **Method:** `GET`

* **Header Params**

    `Authorization = Token XXXXX`

* **Success Response:**
  
  * Retreive Group Messages by group id..

    * **Code:** 200 <br />
    * **Content:** 

    ```json
    [
      {
          "id": 7,
          "message": "Come try our new Dessert!!",
          "created_at": "2020-12-01T03:32:02.512413Z",
          "owner": 3,
          "group": 12
      },
      {
          "id": 8,
          "message": "Come try our new Dessert!!",
          "created_at": "2020-12-01T03:32:07.685428Z",
          "owner": 3,
          "group": 12
      }
    ]
    ```
    <br/>