"use client"

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { fetchuser, fetchpayments, initiate } from '../app/actions/useractions';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { ToastContainer, toast ,Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PaymentPage = ({ username }) => {
    const [paymentform, setPaymentform] = useState({});
    const [currentUser, setcurrentUser] = useState({});
    const [payments, setpayments] = useState([]);
    const searchParams = useSearchParams();
    // Remove the duplicate declaration of 'router'
    const { data: session } = useSession();

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (searchParams.get('paymentdone') == 'true') {
            
        
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
    router.push(`/${username}`)

    }, [])
    

    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
    };

    function getRandomFloat() {
        return Math.floor(Math.random() * (1000 - 1) + 1);
    }

    const getData = async () => {
        let u = await fetchuser(username);
        setcurrentUser(u);
        let dbpayments = await fetchpayments(username);
        setpayments(dbpayments);
        console.log(u, dbpayments);
    };

    const router = useRouter();

    const pay = async (amount) => {
        if (!currentUser) {
            console.error('User data is not loaded yet');
            return;
        }

        let a = await initiate(amount, username, paymentform);
        let orderId = a.id

        var options = {
            "key": currentUser.razorpayid,
            "amount": amount,
            "currency": 'INR',
            "name": 'Get Me a CHai',
            "description": 'Test Transaction',
            "order_id": orderId,
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            handler: function (response) {
                console.log(response.razorpay_payment_id);
                // Handle the success response here
            },
            prefill: {
                name: paymentform.name || 'Gaurav kumar', // Provide a default value if paymentform.name is undefined
                email: currentUser.email || 'gauravkumar@example.com', // Provide a default value if currentUser.email is undefined
                contact: currentUser.phone || '9000090000', // Provide a default value if currentUser.phone is undefined
            },
            notes: {
                address: 'Razorpay Corporate Office',
            },
            theme: {
                color: '#3399cc',
            },
        };

        const rzp1 = new Razorpay(options);
        rzp1.open();
    };

    

    return (
        <>
            {/* toast container for react */}
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
                theme="light"/>
            {/* Same as */}
            <ToastContainer />
            <Script src='https://checkout.razorpay.com/v1/checkout.js' ></Script>

            {/* cover pic and profile pic */}

            <div className='cover w-full bg-red-50 relative'>
                <img className='object-cover max-h-96 w-full h-[350] shadow-blue-700 shadow-sm ' src={currentUser.image} ></img>
                <div className='absolute -bottom-20 right-[46%] overflow-hidden border-white border-2 rounded-full size-32'>
                    <img className='rounded-full size-32' width={128} height={128} src={currentUser.image}></img>
                </div>

            </div>


            <div className='container mx-auto py-14'>
                <h1 className='text-center font-bold text-3xl'>
                    Payment Page for {username}
                </h1>

                <div className='info flex justify-center items-center my-8 flex-col'>
                    <div>@{currentUser.username}</div>
                    <div className='font-bold text-lg'>
                        Let's get some chai for {currentUser.name}
                    </div>
                    <div className='text-slate-600 flex space-x-2'>
                        <p>{getRandomFloat()} members,</p>
                        <p>{getRandomFloat()} posts,</p>
                        <p>{getRandomFloat()} solutions</p>
                    </div>
                    <p>{payments.length} Payments. {currentUser.name} has raised ₹{payments.reduce((a,b)=>a+b.amount,0)} </p>
                </div>

                <div className='payment flex justify-center gap-3 mt-11'>
                    <div className='supporters w-1/2 bg-slate-900 rounded-lg text-white p-10'>
                        <h2 className='text-2xl font-bold my-5'>Supporters</h2>
                        <ul className='mx-5 text-lg'>
                            {payments.length === 0 && <li>No payments yet</li>}
                            {payments.map((payment, index) => (
                                <li key={index} className='my-4 flex gap-2 items-center'>
                                    <img width={33} src='https://img.icons8.com/?size=100&id=HmQQr0jYHZxu&format=png&color=000000' alt='user avatar' />
                                    <span>
                                        {payment.name} donated
                                        <span className='font-bold'>${payment.amount}</span> with a message "{payment.message}"
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='makePayment w-1/2 bg-slate-900 rounded-lg text-white p-10'>
                        <h2 className='text-2xl font-bold my-5'>Make a Payment</h2>
                        <div className='flex gap-2 flex-col'>
                            <div>
                                <input
                                    onChange={handleChange}
                                    value={paymentform.name || ''}
                                    name='name'
                                    type='text'
                                    className='w-full p-3 rounded-lg bg-slate-800'
                                    placeholder='Enter Name'
                                />
                            </div>
                            <div>
                                <input
                                    onChange={handleChange}
                                    value={paymentform.message || ''}
                                    name='message'
                                    type='text'
                                    className='w-full p-3 rounded-lg bg-slate-800'
                                    placeholder='Enter Message'
                                />
                            </div>
                            <div>
                                <input
                                    onChange={handleChange}
                                    value={paymentform.amount || ''}
                                    name='amount'
                                    type='text'
                                    className='w-full p-3 rounded-lg bg-slate-800'
                                    placeholder='Enter Amount'
                                />
                            </div>
                            <button
                                onClick={() => pay(Number(paymentform.amount) * 100)}
                                type="button"
                                className="text-white w-32 bg-gradient-to-br from-purple-900 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2
                            disabled:from-purple-200" disabled={!paymentform.name || !paymentform.message || paymentform.amount?.length<1}
                            >
                                Pay Now!
                            </button>
                        </div>
                        {/* Or choose from these amounts */}
                        <div className='flex gap-2 mt-5'>
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => pay(1000)}>Pay ₹10</button>
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => pay(2000)}>Pay ₹20</button>
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => pay(3000)}>Pay ₹30</button>
                        </div>
                    </div>
                </div>
                <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
            </div>
        </>
    );
};

export default PaymentPage;
