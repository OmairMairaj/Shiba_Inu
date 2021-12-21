import React from "react";
import { useHistory,Link} from "react-router-dom";

function Error({ user, setLoginUser }) {
  const history = useHistory();
  return (
    <>
      <h1>
        Looks like you are lost. Head back to <Link to="/"> Home </Link>{" "}
      </h1>
      <h1>
        You can also Login again by clicking{" "}
        <span
          onClick={() => {
            sessionStorage.clear();
            history.push("/");
          }}
          style={{cursor:"pointer",color:"blue",fontSize:"30px"}}
        >
          HERE
        </span>
      </h1>
    </>
  );
}

export default Error;
