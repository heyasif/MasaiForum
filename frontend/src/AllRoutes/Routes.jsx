import { Routes, Route } from 'react-router-dom';
import NavBar from '../NavBar';
import SignInSide from '../components/SignIn';
import SignUp from '../components/SingUp';
const AllRoutes = () => {
    return (
        <div>
            <NavBar/>
            <Routes>
                <Route path="/" element={ <div>Home</div>}/>
                <Route path="/login" element={<SignInSide />} />
                <Route path="/signup" element={<SignUp/>} />
           </Routes>
        </div>
    );
};
export default AllRoutes;