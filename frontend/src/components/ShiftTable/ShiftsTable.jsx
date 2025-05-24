import styles from "./ShiftsTable.module.css";

const numWeeks = 4;

function ShiftsTable() {
	const drivers = ["דני", "רוני", "יוסי", "שרה", "מיכל"];

	const fullDayNames = [
		"ראשון",
		"שני",
		"שלישי",
		"רביעי",
		"חמישי",
		"שישי",
		"שבת",
	];

	const getWeekDates = (weekOffset = 0) => {
		const now = new Date();
		const dayOfWeek = now.getDay();
		const sunday = new Date(now);
		sunday.setDate(now.getDate() - dayOfWeek + weekOffset * 7);
		return Array.from({ length: 7 }, (_, i) => {
			const d = new Date(sunday);
			d.setDate(sunday.getDate() + i);
			return d;
		});
	};

	const weekHeaderClasses = [
		styles.weekHeaderFuchsia,
		styles.weekHeaderCyan,
		styles.weekHeaderGreen,
		styles.weekHeaderYellow,
	];

	return (
		<div className={styles.pageBg}>
			<h1 className={styles.title}>מערכת משמרות</h1>
			{Array.from({ length: numWeeks }, (_, weekIdx) => {
				const weekDates = getWeekDates(weekIdx);
				const first = weekDates[0];
				const last = weekDates[6];
				const weekTitle = `${first.getDate()}.${
					first.getMonth() + 1
				} - ${last.getDate()}.${last.getMonth() + 1}`;
				// צבע שונה לכל שבוע
				const weekContainerClass =
					styles.weekContainer +
					" " +
					styles["weekContainer" + ((weekIdx % 4) + 1)];

				return (
					<div key={weekIdx} className={weekContainerClass} dir="rtl">
						<div
							className={weekHeaderClasses[weekIdx % weekHeaderClasses.length]}
						>
							{weekTitle}
						</div>
						<div className={styles.tableWrap}>
							<table className={styles.shiftsTable}>
								<thead>
									<tr>
										<th></th>
										<th></th>
										{fullDayNames.map((day, i) => {
											const date = weekDates[i];
											const month = date.getMonth() + 1;
											const dayNum = date.getDate();
											// צבע שונה לכל יום
											const dayColClass = styles["dayCol" + i];
											return (
												<th key={day} className={dayColClass}>
													<div className={styles.dayHeader}>
														{fullDayNames[i]}
													</div>
													<div
														className={styles.dateHeader}
													>{`${dayNum}.${month}`}</div>
												</th>
											);
										})}
									</tr>
								</thead>
								<tbody>
									{/* משמרת טלפונית */}
									<tr>
										<td className={styles.phoneMain} rowSpan={2}>
											משמרת טלפונית
										</td>
										<td className={styles.phoneDay}>כונן יום</td>
										{fullDayNames.map((day, j) => (
											<td
												key={`phone-day-${weekIdx}-${day}`}
												className={`${styles.phoneDay} ${styles["dayCol" + j]}`}
											>
												<select className={styles.select}>
													<option value="">בחר כונן</option>
													{drivers.map((driver) => (
														<option key={driver} value={driver}>
															{driver}
														</option>
													))}
												</select>
											</td>
										))}
									</tr>
									<tr>
										<td className={styles.phoneNight}>כונן לילה</td>
										{fullDayNames.map((day, j) => (
											<td
												key={`phone-night-${weekIdx}-${day}`}
												className={`${styles.phoneNight} ${
													styles["dayCol" + j]
												}`}
											>
												<select className={styles.select}>
													<option value="">בחר כונן</option>
													{drivers.map((driver) => (
														<option key={driver} value={driver}>
															{driver}
														</option>
													))}
												</select>
											</td>
										))}
									</tr>
									{/* משמרת פיזית */}
									<tr>
										<td className={styles.physMain} rowSpan={2}>
											משמרת פיזית
										</td>
										<td className={styles.physDay}>כונן יום</td>
										{fullDayNames.map((day, j) => (
											<td
												key={`phys-day-${weekIdx}-${day}`}
												className={`${styles.physDay} ${styles["dayCol" + j]}`}
											>
												<select className={styles.select}>
													<option value="">בחר כונן</option>
													{drivers.map((driver) => (
														<option key={driver} value={driver}>
															{driver}
														</option>
													))}
												</select>
											</td>
										))}
									</tr>
									<tr>
										<td className={styles.physNight}>כונן לילה</td>
										{fullDayNames.map((day, j) => (
											<td
												key={`phys-night-${weekIdx}-${day}`}
												className={`${styles.physNight} ${
													styles["dayCol" + j]
												}`}
											>
												<select className={styles.select}>
													<option value="">בחר כונן</option>
													{drivers.map((driver) => (
														<option key={driver} value={driver}>
															{driver}
														</option>
													))}
												</select>
											</td>
										))}
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default ShiftsTable;
