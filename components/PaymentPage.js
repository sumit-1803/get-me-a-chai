"use client";

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { fetchuser, fetchpayments, initiate } from '../app/actions/useractions';
import { useSearchParams } from 'next/navigation';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PaymentPage = ({ username }) => {
    const [paymentform, setPaymentform] = useState({});
    const [currentUser, setcurrentUser] = useState({});
    const [payments, setpayments] = useState([]);
    const searchParams = useSearchParams();

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (searchParams.get('paymentdone') === 'true') {
            toast('🦄 Payment has been made', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    }, [searchParams]);

    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
    };

    const getRandomFloat = () => {
        return Math.floor(Math.random() * (1000 - 1) + 1);
    };

    const getData = async () => {
        try {
            // Fetch user details from the API using the username
            const response = await fetch(`/api/profile?username=${username}`, {
                method: 'GET',
            });

            // Check if the response is OK
            if (!response.ok) {
                throw new Error('Failed to fetch user details');
            }

            // Parse the response body to get the user data
            const userData = await response.json();

            // Update the state with the user data
            setcurrentUser(userData);
            setPaymentform((prevState) => ({
                ...prevState,
                name: userData.name,
                email: userData.email,
                profilePicture: userData.profilePicture,
                // Add any other fields you want to prefill
            }));

            // Fetch payments for the user
            const dbpayments = await fetchpayments(username);
            setpayments(dbpayments);

            // Log the data for debugging purposes
            // console.log(userData, dbpayments);
        } catch (error) {
            // Handle any errors that occur during the fetch process
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const loadRazorpayScript = () => {
            return new Promise((resolve) => {
                const script = document.createElement("script");
                script.src = "https://checkout.razorpay.com/v1/checkout.js";
                script.onload = () => resolve(true);
                script.onerror = () => resolve(false);
                document.body.appendChild(script);
            });
        };

        loadRazorpayScript();
    }, []);

    const handlePayment = async () => {
        try {
            // Ensure amount is properly initialized
            const amount = parseFloat(paymentform.amount) * 100; // Convert to paise (100 paise = 1 INR)
            const userId = currentUser._id; // Assuming currentUser has _id
            const orderDetails = {
                amount: amount,
                userId: userId,
            };

            // Create Razorpay order on the frontend (no backend needed)
            const response = await fetch('/api/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderDetails),
            });

            if (!response.ok) {
                throw new Error('Failed to create payment order');
            }

            const orderData = await response.json();
            const { id, amount: orderAmount, currency } = orderData; // Renamed variable to avoid shadowing

            // Initialize Razorpay checkout
            const options = {
                key: process.env.RAZORPAY_KEY_ID, // Your Razorpay key ID from environment variables
                amount: orderAmount, // Use the amount returned from the backend
                currency: "INR", // Ensure this is INR
                order_id: id,
                name: currentUser.name,
                description: 'Payment for Dev', // Dynamic description
                image: currentUser.profilePicture,
                handler: function (response) {
                    // Handle success response
                    toast.success('Payment successful!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                },
                prefill: {
                    name: paymentform.name,
                    email: paymentform.email,
                },
                notes: {
                    message: paymentform.message,
                },
                theme: {
                    color: "#161341",
                },
                method: "UPI",
            };


            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.error("Payment error:", error);
            toast.error('Error initiating payment!');
        }
    };

    const router = useRouter();

    return (
        <>
            {/* Toast container for notifications */}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            {/* Conditional rendering based on `currentUser.username` */}
            {currentUser.username === undefined ? (
                // Render the red message
                <div className="flex flex-col items-center mt-10 p-6 rounded-xl shadow-md">
                    <img
                        src="https://img.freepik.com/free-vector/404-error-page-found_24908-59520.jpg?t=st=1733504404~exp=1733508004~hmac=4c421a418d8cb6672fb9fc78a0201d297253afae0e4ba14beb7deceb9ebb0605&w=740"
                        alt="User not found"
                        className="w-80 h-80 mb-4"
                    />
                    <p className="text-lg font-bold text-white">User Not Found</p>
                    <p className="text-sm text-gray-500 mt-2">
                        Please contact support or check your enrollment status.
                    </p>
                </div>

            ) : (
                // Render all other content if `currentUser.username` is defined
                <>
                    <div className="animate-fadeIn cover w-full bg-red-50 relative">
                        <img
                            className="object-cover max-h-64 w-full shadow-blue-700 shadow-sm"
                            src={currentUser?.coverPicture}
                            alt="Cover Image"
                        />
                        <div className="absolute -bottom-20 right-[46%] overflow-hidden border-white border-2 rounded-full size-32">
                            <img
                                className="rounded-full size-32"
                                width={128}
                                height={128}
                                src={currentUser?.profilePicture || 'default-profile-pic.jpg'}
                                alt="Profile"
                            />
                        </div>
                    </div>

                    <div className="animate-fadeIn container mx-auto mt-14 py-14">
                        <h1 className="text-center font-bold text-3xl">
                            Payment Page for {username}
                        </h1>

                        <div className="info flex justify-center items-center my-8 flex-col">
                            <div>@{currentUser?.username}</div>
                            <div className="font-bold text-lg">
                                Let's get some chai for {currentUser?.name}
                            </div>
                            <div className="text-slate-600 flex space-x-2">
                                <p>{getRandomFloat()} members,</p>
                                <p>{getRandomFloat()} posts,</p>
                                <p>{getRandomFloat()} solutions</p>
                            </div>
                            <p>{payments.length} Payments. {currentUser?.name} has raised ₹{payments.reduce((a, b) => a + b.amount, 0)}</p>
                        </div>

                        <div className="payment flex justify-center gap-3 mt-11">
                            <div className="supporters w-1/2 bg-slate-900 rounded-lg text-white p-10">
                                <h2 className="text-2xl font-bold my-5">Supporters</h2>
                                <ul className="mx-5 text-lg">
                                    {payments.length === 0 && <li>No payments yet</li>}
                                    {payments.map((payment, index) => (
                                        <li key={index} className="my-4 flex gap-2 items-center">
                                            <img width={33} src="https://img.icons8.com/?size=100&id=HmQQr0jYHZxu&format=png&color=000000" alt="user avatar" />
                                            <span>
                                                {payment.name} donated
                                                <span className="font-bold">₹{payment.amount}</span> with a message &quot;{payment.message}&quot;
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="makePayment w-1/2 bg-slate-900 rounded-lg text-white p-10">
                                <h2 className="text-2xl font-bold my-5">Make a Payment</h2>
                                <div className="flex gap-2 flex-col">
                                    <div>
                                        <input
                                            onChange={handleChange}
                                            name="name"
                                            type="text"
                                            className="w-full p-3 rounded-lg bg-slate-800"
                                            placeholder="Enter Name"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            onChange={handleChange}
                                            value={paymentform.message || ''}
                                            name="message"
                                            type="text"
                                            className="w-full p-3 rounded-lg bg-slate-800"
                                            placeholder="Enter Message"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            onChange={handleChange}
                                            value={paymentform.amount || ''}
                                            name="amount"
                                            type="text"
                                            className="w-full p-3 rounded-lg bg-slate-800"
                                            placeholder="Enter Amount"
                                        />
                                    </div>
                                    <button
                                        onClick={handlePayment}
                                        className="my-5 py-3 px-7 bg-[#3730a3] hover:bg-[#3720a3] rounded-xl text-xl font-bold"
                                    >
                                        Pay Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );

};

export default PaymentPage;
