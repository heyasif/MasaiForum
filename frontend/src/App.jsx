import { Provider } from "react-redux";
import AllRoutes from "./AllRoutes/Routes";
import { store } from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <AllRoutes />
      </div>
    </Provider>
  );
};
export default App;
