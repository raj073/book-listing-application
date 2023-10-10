# Application Name: Book Listing Application

# Live Link:

# Application Routes

# Main Part:

# User

- api/v1/auth/signup (POST) (Create User or Signup)
- api/v1/auth/signin (POST) (Signin)
- api/v1/users (GET) (Get All User)
- api/v1/users/528cec23-fc30-42ea-8337-71e34d725f17 (GET) (Get a Single User)
- api/v1/users/528cec23-fc30-42ea-8337-71e34d725f17 (PATCH) (Update a Single User)
- api/v1/users/528cec23-fc30-42ea-8337-71e34d725f17 (DELETE) (Delete a Single User)

# Category

- api/v1/categories/create-category (POST) (Create a Book Category)
- api/v1/categories (GET) (Get All Category)
- api/v1/categories/b72ff9a3-62b7-4647-81fa-5fb040276ee7 (Single GET) (Get a Single Category)
- api/v1/categories/90b2e144-9c21-43e4-916a-a9b00b8befe5 (PATCH) (Update a Single Category)
- api/v1/categories/b72ff9a3-62b7-4647-81fa-5fb040276ee7 (DELETE) (Delete a Single Category)

# Books

- api/v1/books/create-book (POST) (Create a Book - Only for Admin)
- api/v1/books (GET) (Get All Books)
- api/v1/books/b72ff9a3-62b7-4647-81fa-5fb040276ee7/category (GET) (Get Books By CategoryId)
- api/v1/books/66a43176-ea76-4a88-b697-a183b994803e (GET) (Get a Single Book)
- api/v1/books/66a43176-ea76-4a88-b697-a183b994803e (PATCH) (Update a Single Book - Only Allowed for Admin)
- api/v1/books/66a43176-ea76-4a88-b697-a183b994803e (DELETE) (Delete a Single Book - Only Allowed for Admin)

# Orders

- api/v1/orders (POST Method) (Create Order - Only Allowed for Customer)
- api/v1/orders (GET Method) (Get all Order for specific Customers → Only Specific Customers)

# Bonus Part

- api/v1/orders/a3699384-6876-48fb-93e5-914445de7538 (Get) (Get single order by Id → Only for specific customer and admins)
- api/v1/profile (GET) (Get User Profile Data → Only for specific user (customer and admin))
