import { useRouter } from 'next/router';

export default function ErrorPage() {
  const router = useRouter();
  const { error } = router.query;

  const errorMessages = {
    OAuthAccountNotLinked: 'Please sign in with the account originally used to register.',
    AccessDenied: 'You do not have access to this page.',
    Configuration: 'There is an issue with the server configuration.',
    // Add other error codes as needed
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Authentication Error</h1>
      <p>{errorMessages[error] || 'An unknown error occurred.'}</p>
      {/* <a href="/api/auth/signin" style={{ color: 'blue' }}>Go back to Sign In</a> */}
    </div>
  );
}
