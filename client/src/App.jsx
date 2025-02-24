import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import Preloader
import Preloader from "./components/Preloader";

// Import Routes
import AppRoutes from "./routes/Routes.jsx";

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      {loading ? (
        <Preloader setLoading={setLoading} />
      ) : (
        <>
          <ToastContainer />
          <AppRoutes />
        </>
      )}
    </div>
  );
};

export default App;
