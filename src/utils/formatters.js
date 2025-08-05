/** @format */

// Format currency with optional decimal places
export const formatCurrency = (value, decimals = 4) => {
	if (isNaN(value)) return "0";
	return parseFloat(value).toFixed(decimals);
};

// Format date from timestamp or ISO string
export const formatDate = dateString => {
	if (!dateString) return "";

	const date = new Date(dateString);
	if (isNaN(date.getTime())) return dateString;

	return date.toLocaleString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
};

// Truncate long strings (like addresses) with ellipsis
export const truncateString = (str, start = 6, end = 4) => {
	if (!str || str.length <= start + end) return str;
	return `${str.slice(0, start)}...${str.slice(-end)}`;
};

// Format TOKO balance with proper units
export const formatTokenBalance = balance => {
	if (balance >= 1000000) {
		return `${(balance / 1000000).toFixed(2)}M TOKO`;
	}
	if (balance >= 1000) {
		return `${(balance / 1000).toFixed(2)}K TOKO`;
	}
	return `${formatCurrency(balance)} TOKO`;
};

export const formatNumber = number => {
	if (number == typeof Number) {
		number.toFixed(4);
	}
};

export const formatTimestamp = timestamp => {
	const time = new Date(timestamp);
	if (isNaN(time.getTime())) return timestamp;

	return time.toLocaleString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
	});
};

export const truncate = (str, n) => {
	return str.length > n ? str.substr(0, n - 1) + "..." : str;
};

export const formatCompact = (str, start = 6, end = 4) => {
	return `${str.substring(0, start)}...${str.substring(str.length - end)}`;
};
