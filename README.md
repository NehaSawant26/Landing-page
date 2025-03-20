## Responsive website
This project is a responsive landing page built using React.js. It includes a hero section, service cards, a pricing table, and a debounced search bar that fetches and displays user data from an external API. The search bar filters the user data and shows the respective service and pricing information dynamically.

## Technologies Used

- React.js (for creating UI)
- TailwindCSS (for responsive design)

### Instructions to Run the Application

1. **Clone the Repository**:

   Clone the repository to your local machine using the following command:

   ```bash
   git clone https://github.com/NehaSawant26/Landing-page.git
   cd Landing-page

2. **Install Dependencies**

    If you are using npm:
    ```bash
    npm install 

    If you are using yarn:
    ```bash
    yarn install

2. **Start Development Server**
   
    To run the application locally, execute the following command:
    ```bash
    npm start 

    or using yarn:
    ```bash
    yarn start

## API

This project uses JSONPlaceholder as the source of user data.

API Endpoint: https://jsonplaceholder.typicode.com/users

## Additional Dependencies

- axios: Used to fetch data from the API.
- react-scroll: For smooth scrolling functionality.

## Performance Optimization

- Lazy Loading: Images are lazy-loaded for better performance.
- Debounced Search: The search input uses a debouncing technique to avoid unnecessary API calls while typing.