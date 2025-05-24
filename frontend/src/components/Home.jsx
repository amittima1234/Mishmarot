import { useEffect, useState } from "react";
import "../index.css"; // Ensure global styles are imported
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

function Home() {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();
	const handleLogout = () => {
		fetch(`${apiUrl}/api/logout`, {
			method: "post",
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		}).then(() => {
			window.location.reload();
		});
	};

	useEffect(() => {
		fetch(`${apiUrl}/api/user`, {
			credentials: "include",
		})
			.then((res) => {
				if (!res.ok) throw new Error("Not logged in");
				return res.json();
			})
			.then((data) => setUser(data))
			.catch(() => {
				navigate("/login"); // 👈 redirect to login if not logged in
			});
	}, []);

	if (!user) return <div>טוען...</div>;

	return (
		<>
			<div className="p-6 text-lg">
				ברוך שובך, <strong>{user.name}</strong>!
			</div>
			<button
				onClick={handleLogout}
				className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
			>
				התנתקות
			</button>
		</>
	);
}

export default Home;
