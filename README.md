# Bookstore
Web application that allows users to browse **a catalog of books consumed from a database**, log in and make a purchase.

## The challenge

Users should be able to:

- Access book details like title, author, description, price, and cover image.
- Search and filter books by genre.
- Sign up, log in, and stay authenticated across sessions.
- Add books to a cart, view cart contents, and remove items.
- View past orders stored in Firebase and also delete order history.
- Enjoy a mobile-friendly design with a hamburger menu for navigation on smaller screens, and responsive design on any device.

### Built with
- **Firebase Authentication:** Users can securely create accounts and log in using email and password, with session management ensuring they remain logged in across visits. Authenticated actions, like viewing the cart or placing orders, are restricted to logged-in users.
- **Firebase Realtime Database:** Users can save and retrieve items in their cart, and view their order history to review past purchases. Real-time updates ensure that the book catalog, cart contents, and orders are refreshed automatically without manual page reloads.
- **React Hooks:** Use of useState, useEffect and useContext to manage local and global state in the application.
- **Context API & Reducer:** To manage the global state of pokemon and bookmarks, a Context + Reducer pattern is used, allowing the automatic update of the catalog and the list - of bookmarks in real time.
- **React Router DOM:** Efficient route management to navigate between the different sections of the application without interruptions.
- **Vite:** For a fast development environment, optimizing load and compilation time.
  
### check the web site by clicking on this link:

**https://database-books-ecommerce.web.app/**

### Video demo:

https://github.com/user-attachments/assets/a2dbe509-131a-463a-9f5a-6ea3ed5d8cfe

https://github.com/user-attachments/assets/8e6ff0ed-2360-4274-be43-9cbc30fa0728



