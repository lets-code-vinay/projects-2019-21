# vehicle-Portal (**_rentmecar.com_**)

Project done by _Vinay Maurya_

Deployed URL: https://rentmecar7.herokuapp.com

# Contributors

- Vinay Maurya

# About Our Project:

●	Most of students, Job-seekers, workers and tourists face problems in other cities for transportation for a short span or days.
●	For temporary period no one wants to purchase vehicle. They seek vehicle on rent in good condition and at low price with or without driver.
●	On other hand most of people have their vehicle which are idle or not in use for long time. 
●	Here they can put their vehicle on rent to genuine customers and can earn some handsome amount.
●	RentMe-Car is a platform trying to solve this problem by an application that is properly moderated by admin and provides seamless service at both ends
●	RentMe-Car has all the necessary specifications to meet the challenges of Vehicle-owners and the vehicle-seekers on rent.


## Users of Application

| Role              | Rights                                                                                                                                             |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| API Generator     | Maintenance of API                                                                                                                                 |
| App Administrator | Keep an eye on users activity, Block the unwanted ones                                                                                             |
| Owner      | Post vehicles, Delete vehicles, Update vehicles, Update Profile, Photo Upload, change password, Forgot Password, view all posted vehicles, view all opted out vehicles |
| Customer        | Accept vehicles, Update Profile, Upload Profile Pic, Reset Password, Forgot Password, view all available vehicles              |

### End Points of APIs

1.  Owner's ROUTES

    - Registering owner Account

      > POST https://rentmecacr7.herokuapp.com/api/user/register

    - Owner Account Activation

      > GET https://rentmecar7.herokuapp.com/api/accountactivation/{Activation-Token}?user={Role}

    - Logging into owner Account

      > POST https://rentmecar7.herokuapp.com/api/user/login/

    - Posting a vehicle by owner

      > POST https://rentmecar7.herokuapp.com/api/owner/postingvehicle

    - Showing owner his own posted vehicles

      > GET https://rentmecar7.herokuapp.com/api/vehicleowner/vehiclespostedtilldate/{Page Number}/

    - Vehicle updation by owner Account

      > PATCH https://rentmecar7.herokuapp.com/api/vehicleowner/udpatingvehicle/{vehicle Id}/

    - Vehicel Deletion by owner

      > DELETE https://rentmecar7.herokuapp.com/api/vehicelowner/deletingvehicel/{vehicel Id}/

    - Uploading Profile Picture

      > PATCH https://rentmecar7.herokuapp.com/api/owner/uploadprofilepicture

    - udpating profile
      > PATCH https://rentmecar7.herokuapp.com/api/owner/editprofile


       * updating editing  password
          > PATCH https://rentmecar7.herokuapp.com/api/owner/editpassword

       * Logging out from owner Account
          > DELETE https://rentmecar7.herokuapp.com/api/owner/logout/


       * forgot passsword sending system generated password
          >  POST https://rentmecar7.herokuapp.com/api/user/forgotpassword

2.  customer's ROUTES

    - Register customer Account

      > POST https://rentmecar7.herokuapp.com/api/user/register

    - Account Activation
      > GET https://rentmecar7.herokuapp.com/api/accountactivation/{Activation Token}?user=
             {Role}

    - Login into customer Account
      > POST https://rentmecar7.herokuapp.com/api/user/login

    - showing all vehicles which are available
       > GET https://rentmecar7.herokuapp.com/api/customer/vehicelsearch/allavailablevehicles/{Page Number}/


       * filtering vehicels 
          > GET https://rentmecar7.herokuapp.com/api/customer/vehicelsearch/filter/{Page Number}?category={name/color/}

       * showing single vehicle by vehicleId
          > GET https://rentmecar7.herokuapp.com/api/customer/vehicelsearch/byvehicleId/{vehicle Id}/

       * vehicle Accepting by customer
            > PATCH https://rentmecar7.herokuapp.com/api/customer/vehicelsearch/byvehicleid/{vehicle Id}/isaccepted

       * showing vehicles accepted by customer till date
            > GET https://rentmecar7.herokuapp.com/api/customer/vehiclesacceptedtilldate/{Page Number}

       *  Uploading Profile Picture
            > PATCH https://rentmecar7.herokuapp.com/api/customer/uploadprofilepicture

       * udpating profile
            > PATCH https://rentmecar7.herokuapp.com/api/customer/editprofile

       * Edit password
            > PATCH https://rentmecar7.herokuapp.com/api/customer/editpassword


       * Logging out from customer Account
           > DELETE https://rentmecar7.herokuapp.com/api/customer/logout

       * forgot passsword sending system generated password
            > POST https://rentmecar7.herokuapp.com/api/user/forgotpassword

3.  Admin Routes

    - Logging In from App Administrator Account

      > POST https://rentmecar7.herokuapp.com/api/user/login

    - view all available(including blocked) vehicles

      > GET https://rentmecar7.herokuapp.com/api/admin/allavailablevehicles/{Page Number}

    - view all accepted vehicles

      > GET https://rentmecar7.herokuapp.com/api/admin/allacceptedvehicles/{Page Number}

    - view all owners

      > GET https://rentmecar7.herokuapp.com/api/admin/allowners/{Page Number}

    - view all customers

      > GET https://rentmecar7.herokuapp.com/api/admin/allcustomers/1

    - Blocking Unwanted App User(s) or Unwanted vehicle(s)

      > PATCH https://rentmecar7.herokuapp.com/api/admin/{User/vehicle Id}/isblocked/?model={Role}

    - logout from Administrator Account
      > DELETE https://rentmecar7.herokuapp.com/api/admin/logout/

# Features :

### \* REGISTRAION & LOGIN Related

---

1.  Email Verification for Registration.
2.  Only Unique Account Creation allowed (Aadhaar Number based Uniqueness).
3.  Editing Password (After login).
4.  Resetting Passwords (System Generated Password via mail).

### \* USER's Related

---

1.  vehicle owner can Post, Edit, view and Delete his posts.
2.  vehicle customer can view, filter, search and accept vehicles.
3.  Admin can be watchfull towards his users and vehicles posted also can BLOCK unwanted vehicles and Users even.
4.  Instant notification Via mail to both vehicle owner and vehicle customer.
5.  Profile Updation (Limited to Profile Picture, Contact Number and Address Change)

### \* vehicles Related

---

1. **Aggregations** :
   - a. vehicle Count.
   - b. Sorting (as per Most Recent Update).
   - c. Filteration (_As per Different category and preferences_).
   - d. Searching (_On the basis of keyword and location_) .
   - e. Pagination (_10 vehicles per page_).
2. _View vehicles_.
3. _Block vehicles_ (By Admin only).

# Technologies used:

---

- Nodemailer (_To send system generated emails_)
- Multer + Cloudinary (_Converting System Image into URL_)
- Express Js (_Framework for node Js_)
- Json Web token (_For Authentication_)
- Bcrypt Js (_For Hashing_)
- Helmet (_To Secure all Headings and Status_)
- Compressor (_To compress the size of the data_)
- Mongoose (_To Connect to NoSQL Database_)
- Mark Down (_To Make our read me file look better_)

# Future Goals :

      1. Denial of vehicle after acceptance from owner side and also from customer side.
      2. Location Mapping
      3. Online Payment Wallet (To avail Our commission)
      4. Customer's grievance Support System
      5. Mobile Application Implementation
      6. Mobile OTP for login
      7. Login Via Google/ Facebook/ Insta/ Twitter
      8. Background Verification
      9. GPS tracking
