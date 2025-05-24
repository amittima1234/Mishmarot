const apiUrl = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
	const handleLogin = () => {
		window.location.href = `${apiUrl}/auth/google`;
	};

	return (
		<button
			onClick={handleLogin}
			className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
		>
			התחברות עם - Google
		</button>
	);
};

export default Login;
