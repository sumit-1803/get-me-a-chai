"use client";

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { fetchuser, fetchpayments, initiate } from '../app/actions/useractions';
import { useSearchParams } from 'next/navigation';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import connectDB from '../app/db/connectDB';

const PaymentPage = ({ username }) => {
    const [paymentform, setPaymentform] = useState({});
    const [currentUser, setcurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [payments, setpayments] = useState([]);
    const searchParams = useSearchParams();

    connectDB();

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
        const { name, value } = e.target;
    
        if (name === "amount") {
            const numericValue = parseFloat(value);
    
            // Allow empty value for clearing the field
            if (value === "") {
                setPaymentform({ ...paymentform, [name]: value });
                return;
            }
    
            // Validate amount to be a positive number
            if (isNaN(numericValue) || numericValue <= 0) {
                toast.error("Please enter a valid positive amount!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                return;
            }
        }
    
        setPaymentform({ ...paymentform, [name]: value });
    };
    

    const getData = async () => {
        try {
            // Fetch user details from the API using the username
            const response = await fetch(`/api/profile?username=${username}`, {
                method: 'GET',
            });

            if (response.status === 404) {
                setcurrentUser(undefined); 
                setLoading(false);
                return;
            }

            

            // Check if the response is OK
            if (!response.ok) {
                throw new Error('Failed to fetch user details');
            }

            // Parse the response body to get the user data
            const userData = await response.json();

            // Update the state with the user data
            if( response.status === 200){
                setLoading(false);
                setcurrentUser(userData);
            }
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
            const amount = parseFloat(paymentform.amount) * 100; // Convert to paise (100 paise = 1 INR)
            const userId = currentUser._id; // Assuming currentUser has _id
            const orderDetails = {
                amount: amount,
                userId: userId,
            };

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
            const { id, amount: orderAmount, currency } = orderData;

            const options = {
                key: process.env.RAZORPAY_KEY_ID,
                amount: orderAmount,
                currency: "INR",
                order_id: id,
                name: currentUser.name,
                description: 'Payment for Dev',
                image: currentUser.profilePicture,
                handler: async function (paymentResponse) {
                    try {
                        // Payment success handler
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

                        const paymentDetails = {
                            username: currentUser.username,
                            paymentStatus: 'success',
                            lastPaymentDate: new Date().toISOString(),
                            amountPaid: paymentform.amount,
                        };

                        const updateUserResponse = await fetch(`/api/update-payment`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(paymentDetails),
                        });

                        if (!updateUserResponse.ok) {
                            throw new Error('Failed to update user data');
                        }

                        const updateData = await updateUserResponse.json();
                        console.log('User data updated:', updateData);

                        router.push('/success-page');  // Optionally redirect after success
                    } catch (error) {
                        console.error("Error updating user data:", error);
                        toast.error('Error updating user data!');
                    }
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
            {loading ? (
                <div className='flex justify-center items-center h-screen'><span>Loading...</span></div> 
            ) : currentUser === undefined ? (
                <div className="flex flex-col items-center mt-10 p-6 rounded-xl shadow-md">
                    <img
                        src="https://img.freepik.com/free-vector/404-error-page-found_24908-59520.jpg"
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
                            alt=""
                        />
                        <div className="absolute -bottom-20 right-[46%] overflow-hidden border-white border-2 rounded-full size-32">
                            <img
                                className="rounded-full size-32"
                                width={128}
                                height={128}
                                src={currentUser?.profilePicture || 'default-profile-pic.jpg'}
                                alt=""
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
                                Let&apos;s show some support for {currentUser?.name}
                            </div>
                            {/* <div className="text-slate-600 flex space-x-2">
                                <p>{0} members,</p>
                                <p>{0} posts,</p>
                                <p>{0} solutions</p>
                            </div> */}
                            <p>{currentUser.numOfPayments} Payments. {currentUser?.name} has raised ₹{currentUser.raisedMoney}</p>
                        </div>

                        <div className="payment flex flex-col md:flex-row justify-center gap-3 mt-11">
                            <div className="supporters w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-10">
                                <h2 className="text-2xl font-bold my-5">Raised Money</h2>
                                {/* <ul className="mx-5 text-lg">
                                    {payments.length === 0 && <li>No payments yet</li>}
                                    {payments.map((payment, index) => (
                                        <li key={index} className="my-4 flex gap-2 items-center">
                                            <img
                                                width={33}
                                                src="https://img.icons8.com/?size=100&id=HmQQr0jYHZxu&format=png&color=000000"
                                                alt="user avatar"
                                            />
                                            <span>
                                                {payment.name} donated
                                                <span className="font-bold"> ₹{payment.amount}</span> with a message &quot;{payment.message}&quot;
                                            </span>
                                        </li>
                                    ))}
                                </ul> */}
                                <h2 className='px-12 text-3xl text-bold'>{currentUser.raisedMoney} Rupees</h2>
                            </div>

                            <div className="makePayment w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-10">
                                <h2 className="text-2xl font-bold my-5">Make a Payment</h2>
                                <div className="flex gap-2 flex-col">
                                    <div>
                                        <input
                                            onChange={handleChange}
                                            name="name"
                                            type="text"
                                            className="w-full p-3 rounded-lg bg-slate-600 "
                                            placeholder="Enter Name"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            onChange={handleChange}
                                            value={paymentform.message || ""}
                                            name="message"
                                            type="text"
                                            className="w-full p-3 rounded-lg bg-slate-600 "
                                            placeholder="Enter Message"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            onChange={handleChange}
                                            value={paymentform.amount || ""}
                                            name="amount"
                                            type="text"
                                            className="w-full p-3 rounded-lg bg-slate-600 "
                                            placeholder="Enter Amount"
                                        />
                                    </div>
                                    <button
                                        onClick={handlePayment}
                                        disabled={!paymentform.name || !paymentform.amount}
                                        className={`my-5 py-3 px-7 rounded-xl text-xl font-bold ${!paymentform.name || !paymentform.amount
                                            ? "bg-gray-500 cursor-not-allowed"
                                            : "bg-[#3730a3] hover:bg-[#3720a3]"
                                            }`}
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
