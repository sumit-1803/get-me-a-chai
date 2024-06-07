"use client"

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { fetchuser, fetchpayments, initiate } from '../app/actions/useractions';
import { useSession } from 'next-auth/react';

const PaymentPage = ({ username }) => {
    const [paymentform, setPaymentform] = useState({});
    const [currentUser, setcurrentUser] = useState({});
    const [payments, setpayments] = useState([]);

    useEffect(() => {
        getData();
    }, []);

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

        const options = {
            key: process.env.NEXT_PUBLIC_KEY_ID, // Use process.env to access the environment variable
            amount: amount,
            currency: 'INR',
            name: 'Your Company Name',
            description: 'Test Transaction',
            handler: function (response) {
                console.log(response.razorpay_payment_id);
                // Handle the success response here
            },
            prefill: {
                name: paymentform.name || '', // Provide a default value if paymentform.name is undefined
                email: currentUser.email || '', // Provide a default value if currentUser.email is undefined
                contact: currentUser.phone || '', // Provide a default value if currentUser.phone is undefined
            },
            notes: {
                address: 'Razorpay Corporate Office',
            },
            theme: {
                color: '#3399cc',
            },
        };

        const rzp1 = new Razorpay(options);
        rzp1.on('payment.failed', function (response) {
            console.log(response.error);
            // Handle the failure response here
        });
        rzp1.open();
    };

    return (
        <div className='container mx-auto py-14'>
            <h1 className='text-center font-bold text-3xl'>
                Payment Page for {username}
            </h1>

            <div className='info flex justify-center items-center my-8 flex-col'>
                <div>@{username}</div>
                <div className='font-bold text-lg'>
                    CREATING ANIMATED ART FOR VTT'S
                </div>
                <div className='text-slate-600 flex space-x-2'>
                    <p>{getRandomFloat()} members,</p>
                    <p>{getRandomFloat()} posts,</p>
                    <p>{getRandomFloat()} solutions</p>
                </div>
            </div>

            <div className='payment flex justify-center gap-3 mt-11'>
                <div className='supporters w-1/2 bg-slate-900 rounded-lg text-white p-10'>
                    <h2 className='text-2xl font-bold my-5'>Supporters</h2>
                    <ul className='mx-5 text-lg'>
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
                            className="text-white w-32 bg-gradient-to-br from-purple-900 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
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
    );
};

export default PaymentPage;
