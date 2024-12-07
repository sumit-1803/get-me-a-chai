// app/success-page/page.js
"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
const router = useRouter();

return (
    <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
            <h1 className="text-3xl font-bold text-[#3730a3] mb-6">Thank You for Donating!</h1>
            <p className="text-lg text-gray-700 mb-6">
                Your generous contribution helps us make a difference. We truly appreciate your support!
            </p>
            
            <div className="space-x-4">
                <Link href="/dashboard">
                    <p className="inline-block bg-[#3730a3] text-white px-6 py-2 rounded-lg hover:bg-[#3910a3] transition duration-300">
                        Go to Dashboard
                    </p>
                </Link>
                <button
                    onClick={() => router.back()}
                    className="inline-block bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
                >
                    Go Back
                </button>
            </div>
        </div>
    </div>
);
}
