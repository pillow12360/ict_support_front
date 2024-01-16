import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function HomeButton() {
  let navigate = useNavigate();
  function handleClick() {
    navigate("/");
  }
  return (
    <button className="btn btn-primary" onClick={handleClick}>
      홈으로 돌아가기
    </button>
  );
}
export default HomeButton;
