import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from 'react-i18next';

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
            <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
            <p className="text-gray-700 mb-4">
              We're sorry, an unexpected error has occurred. Please try refreshing the page or contact support if the issue persists.
            </p>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              onClick={() => window.location.reload()}
            >
              Refresh Page
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
  const { t } = useTranslation();

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
