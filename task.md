### Login Page

1. [x] Create a simple login form with fields for \

   1. [x] email \
   2. [x] password \
   3. [x] remember me checkbox

2. [x] Add client side validations for both email and password fields as mandatory input and
       show validation message if not filled. Also add email validation for email input. You can
       use any libraries like formik or react hook form etc or add custom one your own
3. [x] Once form is submitted, generate token by using the fake Login API from
       “https://reqres.in/api/login” (only email and password provided in the api sample will work,
       Refer https://reqres.in/ for more info)
4. [x] If you get an error for wrong email or password, show a toast message for user
5. [x] If you get success response and token, you can
   1. [x] Store it on localstorage if the remember me checkbox is checked
   2. [x] Set the user as authenticated and redirect to country listing page
6. [x] When ever you refresh the page, you need to set user as authenticated if you have token
       available in localstorage (if you checked the remember me checkbox) and this login
       page should not be accessible for authenticated users
7. [x] If you don’t have token in local store and if you refresh the page from other 2 protected
       pages, user should be redirected to login page.

### Country Listing Page

1. [x] Fetch country list from “https://restcountries.com/v3.1/all” API and display the items in
       table. Refer https://restcountries.com/ for more information
2. [x] Table (you can use Syncfusion component if required for this) each row consists of 4
       columns (cca2,common name, capital, actions)
   1. [x] On clicking on the name cell, a popup should appear showing (common name in
          [English/native language] – official name in [English/native language])
   2. [x] Actions’ column consist of eye button icon clicking on it will navigate to details
          page.
3. [] Documentation of Syncfusion components https://ej2.syncfusion.com/react/documentation/introduction/

### Country Details Page

A simple page to display more information for the selected country. You can display below
information in a 2 column table format like below.

1. [x] Get details by calling the API - https://restcountries.com/v3.1/alpha/{alphaCode}
2. [x] The param alphaCode is cca3 in the API response and this need to be read from the route param

#### Note:

1. [x] For currencies, it should be `name - symbol` and if there are multiple currencies, should
       list all of them in multiple lines as shown an example below
2. [x] For Languages, it should be the name of the language and needed to separated with `|` if there are multiple languages.
