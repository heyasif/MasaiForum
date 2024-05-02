import { useSelector } from "react-redux";

const Private = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  // If user is not logged in, show a message to login
  if (!isLoggedIn) {
    return <div>Please login to access this page</div>;
  }

  // If user is logged in, render the children components
  return <>{children}</>;
};

export default Private;
