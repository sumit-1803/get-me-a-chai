import { getProviders, signIn } from 'next-auth/react';

export default function SignIn({ providers }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  {Object.values(providers).map((provider) => (
    <button
      key={provider.name}
      className="px-6 py-2 my-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      onClick={() => signIn(provider.id)}
    >
      Sign in with {provider.name}
    </button>
  ))}
</div>

  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
