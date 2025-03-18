import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import Preloader
import Preloader from "./components/Preloader";

// Import Routes
import AppRoutes from "./routes/Routes.jsx";

// Global Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("App Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-yellow-50 p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
            <p className="text-gray-700 mb-4">
              We're sorry, but there was an error in the application. Please try refreshing the page.
            </p>
            <button 
              onClick={() => this.setState({ hasError: false })}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
};

export default App;
