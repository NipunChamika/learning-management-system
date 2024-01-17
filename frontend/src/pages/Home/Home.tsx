import { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { isLoggedIn } = useUserContext();

  const navigate = useNavigate();
  const [isCheckingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      setCheckingAuth(false);
    }
  }, [isLoggedIn]);

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Home</h1>
    </>
  );
};

export default Home;
