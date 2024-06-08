"use client"
import { useSession,signIn,signOut } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchuser,updateProfile } from '../app/actions/useractions';

const Dashboard = () => {
    const {data:session ,update} = useSession();
    const router = useRouter();
    const [form, setform] = useState({});

    useEffect(() => {
        getData()
        if (!session) {
            router.push('/login');
        }
    }, [router, session]);

    const getData = async () => {
        let u = await fetchuser(session.user.name);
        setform(u);
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e)=>{
        update()
        let a = await updateProfile(e,session.user.name)
        alert("Profile Updated")
    }


    return (
        <div className='container mx-auto py-5'>
            <h1 className='text-center my-5 text-3xl font-bold'>Welcome to your Dashboard</h1>
            <form className="max-w-2xl mx-auto" action={handleSubmit}>
                <div className='my-2'>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input
                        value={form.name || ''}
                        onChange={handleChange}
                        type="text"
                        name='name'
                        id="name"
                        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                {/* input for email */}
                <div className="my-2">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input
                        value={form.email || ''}
                        onChange={handleChange}
                        type="email"
                        name='email'
                        id="email"
                        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                {/* input for username */}
                <div className='my-2'>
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                    <input
                        value={form.username?form.username: ''}
                        onChange={handleChange}
                        type="text"
                        name='username'
                        id="username"
                        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>

                <div className="my-2">
                    <label htmlFor="profilepic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Picture</label>
                    <input
                        value={form.profilepic?form.profilepic:''}
                        onChange={handleChange}
                        type="text"
                        name='profilepic'
                        id="profilepic"
                        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div className="my-2">
                    <label htmlFor="coverpic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cover Picture</label>
                    <input
                        value={form.coverpic || ''}
                        onChange={handleChange}
                        type="text"
                        name='coverpic'
                        id="coverpic"
                        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                {/* input razorpay id */}
                <div className="my-2">
                    <label htmlFor="razorpayid" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razorpay ID</label>
                    <input
                        value={form.razorpayid || ''}
                        onChange={handleChange}
                        type="text"
                        name='razorpayid'
                        id="razorpayid"
                        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>

                {/* input for razorpay secret */}
                <div className="my-2">
                    <label htmlFor="razorpaysecret" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razorpay Secret</label>
                    <input
                        value={form.razorpaysecret || ''}
                        onChange={handleChange}
                        type="text"
                        name='razorpaysecret'
                        id="razorpaysecret"
                        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>

            </form>
        </div>
    );
};

export default DashboardPage;
