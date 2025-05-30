import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import { authContext } from "../context/AuthContext";
import HashLoader from "react-spinners/HashLoader";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: result.data,
          token: result.token,
          role: result.role
        }
      });

      console.log(result, "Dữ liệu đăng nhập");

      setLoading(false);

      if (result.role === "admin") {
        navigate("/");
      } else {
        navigate("/home");
      }

      toast.success(result.message);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold  mb-10">
          Xin chào! <span className="text-primaryColor">Chào mừng</span> trở lại
        </h3>
        <form action="" className="py-4 md:py-0" onSubmit={submitHandler}>
          <div className="mb-5">
            <input
              type="email"
              name="email"
              placeholder="Nhập email của bạn !"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full py-3 text-[16px] border-b border-solid border-[#0066ff61] focus:outline-none placeholder:text-textColor  cursor-pointer"
            />
          </div>
          <div className="mb-5">
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu !"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full py-3 text-[16px] border-b border-solid border-[#0066ff61] focus:outline-none placeholder:text-textColor cursor-pointer"
            />
          </div>
          <div className="mt-7">
            <button
              type="submit"
              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
            >
              {loading ? (
                <HashLoader size={25} color="#fff" />
              ) : (
                "Đăng nhập"
              )}
            </button>
          </div>
          <p className="mt-5 text-textColor text-center">
            Bạn chưa có tài khoản ?{" "}
            <Link to="/register" className="text-primaryColor font-medium ml-1">
              Đăng ký
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
