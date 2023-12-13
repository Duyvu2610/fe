import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "../MyButton";
import MyInput from "../MyInput";

function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorRePassword, setErrorRePassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    // Kiểm tra và cập nhật errorMessage cho userName
    e.preventDefault();
    if (userName.length === 0) {
      setErrorMessage("Vui lòng không bỏ trống trường này");
    } else {
      // Kiểm tra từng ký tự trong chuỗi nhập
      for (let i = 0; i < userName.length; i++) {
        const charCode = userName.charCodeAt(i);

        // Nếu ký tự có mã Unicode lớn hơn 127, là ký tự 2 byte trở lên
        if (charCode > 127) {
          setErrorMessage("Vui lòng chỉ nhập ký tự 1 byte.");
          break; // Sử dụng return để ngừng kiểm tra khi có lỗi
        } else {
          setErrorMessage(""); // Nếu không có lỗi, xóa thông báo
        }
      }
    }

    // Kiểm tra và cập nhật errorPassword cho password
    for (let i = 0; i < password.length; i++) {
      const charCode = password.charCodeAt(i);

      // Nếu ký tự có mã Unicode lớn hơn 127, là ký tự 2 byte trở lên
      if (charCode > 127) {
        setErrorPassword("Vui lòng chỉ nhập ký tự 1 byte.");
        break;
      } else {
        setErrorPassword("");
      }
    }
    // Kiểm tra điều kiện và đặt thông báo lỗi
    if (password.length <= 6) {
      setErrorPassword("Yêu cầu lớn hơn 6 kí tự");
    }
    if (password.length === 0) {
      setErrorPassword("Vui lòng không bỏ trống trường này");
    }
    // Nếu không có lỗi, tiến hành gửi yêu cầu đăng nhập
    if (!errorMessage && !errorPassword && userName && password) {
      try {
        // Thực hiện yêu cầu POST đến API với userName và password
        const response = await axios.post(
          "http://localhost:8080/api/v1/auth/login",
          {
            userName: userName,
            password: password,
          }
        );
        // Xử lý phản hồi từ API tại đây, ví dụ:
        console.log(response.data);
        sessionStorage.setItem("username", userName);
        navigate("/students");
      } catch (error) {
        setErrorPassword("Tài khoản hoặc mật khẩu không chính xác");
      }
    }
  };
  const handleRegister = async (e) => {
    // Kiểm tra và cập nhật errorMessage cho userName
    e.preventDefault();
    if (userName.length === 0) {
      setErrorMessage("Vui lòng không bỏ trống trường này");
    } else {
      // Kiểm tra từng ký tự trong chuỗi nhập
      for (let i = 0; i < userName.length; i++) {
        const charCode = userName.charCodeAt(i);

        // Nếu ký tự có mã Unicode lớn hơn 127, là ký tự 2 byte trở lên
        if (charCode > 127) {
          setErrorMessage("Vui lòng chỉ nhập ký tự 1 byte.");
          break; // Sử dụng return để ngừng kiểm tra khi có lỗi
        } else {
          setErrorMessage(""); // Nếu không có lỗi, xóa thông báo
        }
      }
    }

    // Kiểm tra và cập nhật errorPassword cho password
    for (let i = 0; i < password.length; i++) {
      const charCode = password.charCodeAt(i);

      // Nếu ký tự có mã Unicode lớn hơn 127, là ký tự 2 byte trở lên
      if (charCode > 127) {
        setErrorPassword("Vui lòng chỉ nhập ký tự 1 byte.");
        break;
      } else {
        setErrorPassword("");
      }
    }
    // Kiểm tra điều kiện và đặt thông báo lỗi
    if (password.length <= 6) {
      setErrorPassword("Yêu cầu lớn hơn 6 kí tự");
    }
    if (password.length === 0) {
      setErrorPassword("Vui lòng không bỏ trống trường này");
    }
    handleRePassword();

    // Nếu không có lỗi, tiến hành gửi yêu cầu đăng nhập
    if (password !== rePassword) setErrorRePassword("Mật khẩu phải trùng nhau");
    if (
      !errorMessage &&
      !errorPassword &&
      !errorRePassword &&
      userName &&
      password
    ) {
      try {
        // Thực hiện yêu cầu POST đến API với userName và password
        const response = await axios.post(
          "http://localhost:8080/api/v1/auth/register",
          {
            userName: userName,
            password: password,
          }
        );
        // Xử lý phản hồi từ API tại đây, ví dụ:
        console.log(response.data);
        setErrorRePassword("thanh cong");
      } catch (error) {
        setErrorRePassword("Tài khoản đã tồn tại");
      }
    }
  };
  const handleRePassword = () => {
    for (let i = 0; i < rePassword.length; i++) {
      const charCode = rePassword.charCodeAt(i);

      // Nếu ký tự có mã Unicode lớn hơn 127, là ký tự 2 byte trở lên
      if (charCode > 127) {
        setErrorRePassword("Vui lòng chỉ nhập ký tự 1 byte.");
        break;
      } else {
        setErrorRePassword("");
      }
    }
    // Kiểm tra điều kiện và đặt thông báo lỗi
    if (rePassword.length <= 6) {
      setErrorRePassword("Yêu cầu lớn hơn 6 kí tự");
    }
    if (rePassword.length === 0) {
      setErrorRePassword("Vui lòng không bỏ trống trường này");
    }
  };
  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleRePasswordChange = (e) => {
    setRePassword(e.target.value);
  };
  return (
    <div className="w-[450px]">
      <h2 className="uppercase text-lg text-center py-8 font-bold">
        {isRegister ? "Register" : "Login"}
      </h2>
      <form action="" className="flex flex-col">
        <div className="flex justify-between">
          <label htmlFor="userName">User Name:</label>
          <MyInput
            type="text"
            className="w-[60%] "
            name="userName"
            id="userName"
            maxLength={20}
            value={userName}
            onChange={handleUserNameChange}
          />
        </div>
        {errorMessage && (
          <p className="text-red-500 text-right">{errorMessage}</p>
        )}
        <div className="flex justify-between  mt-4">
          <label htmlFor="pw">Password:</label>
          <MyInput
            type="text"
            className="w-[60%]"
            name="pw"
            id="pw"
            maxLength={15}
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        {errorPassword && (
          <p className="text-red-500 text-right">{errorPassword}</p>
        )}
        {isRegister && (
          <div>
            <div className="flex justify-between  mt-4">
              <label htmlFor="pw">Password Confirm:</label>
              <MyInput
                type="text"
                className="w-[60%] "
                name="pw"
                id="pw"
                maxLength={15}
                value={rePassword}
                onChange={handleRePasswordChange}
              />
            </div>
            {errorRePassword && (
              <p className="text-red-500 text-right">{errorRePassword}</p>
            )}
          </div>
        )}
        {isRegister ? (
          <div className="ml-auto mt-6 flex">
            <MyButton
              onClick={(e) => {
                e.preventDefault();
                setErrorMessage("");
                setErrorPassword("");
                setErrorRePassword("");
                setIsRegister(false);
              }}
              className={`mr-4`}
            >
              Back
            </MyButton>
            <MyButton onClick={(e) => handleRegister(e)}>Register</MyButton>
          </div>
        ) : (
          <div className="ml-auto mt-6 flex">
            <MyButton onClick={(e) => handleLogin(e)} className={`mr-4`}>
              Login
            </MyButton>
            <MyButton
              onClick={(e) => {
                e.preventDefault();
                setErrorMessage("");
                setErrorPassword("");
                setIsRegister(true);
              }}
            >
              Register
            </MyButton>
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
