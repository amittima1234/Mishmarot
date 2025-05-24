import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import ShiftsTable from "../ShiftTable/ShiftsTable";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

function Dashboard() {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();
	const handleHomeRedirect = () => {
		navigate(`/`);
	};

	useEffect(() => {
		fetch(`${apiUrl}/api/user`, { credentials: "include" }) // 👈 sends cookies
			.then((res) => {
				if (!res.ok) throw new Error("Not logged in");
				return res.json();
			})
			.then((data) => setUser(data))
			.catch((err) => console.error(err));
	}, []);

	if (!user) return <div>טוען...</div>;

	return (
		<div className={styles.shiftsTableContainer}>
			<div className="text-xl">
				ברוך הבא, <strong>{user.name}</strong>!
			</div>
			<ShiftsTable />
			<button
				onClick={handleHomeRedirect}
				className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
			>
				לעבור לדף הבית
			</button>
		</div>
	);
}

export default Dashboard;
