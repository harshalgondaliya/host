// Fix for OrderDetails.jsx

// The current import that's causing problems:
// import skyberryImage from "../../assets/images/products/Skyberry.webp";

// This should be changed to match the exact case of the file in the filesystem:
import skyberryImage from "../../assets/images/products/Skyberry.webp";

// The case of the first letter matters in some operating systems and deployment environments
// Make sure all other image imports also match the exact case of the files 