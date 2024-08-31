import { Link } from "react-router-dom";
import { useEffect } from "react";
import successIcon from "../assets/images/success.webp";

const CheckoutSuccess = () => {
    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls the page to the top when the component mounts
    }, []);

    return (
        <div className="bg-gray-100 h-screen">
            <div className="bg-white p-6 md:mx-auto">
                <div className="flex items-center justify-center ">
                    <img src={successIcon} className="w-32" alt="Success Icon" />
                </div>

                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                        Payment Done!
                    </h3>
                    <p className="text-gray-600 my-2">
                        Thank you for completing your secure online payment!
                    </p>
                    <p className="">Have a great day</p>
                    <div className="py-10 text-center">
                        <Link to='/home' className="px-12 bg-primaryColor text-white font-semibold py-3">
                            Go back to home!
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CheckoutSuccess;
