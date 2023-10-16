let apiUrl
const apiUrls = {
    
	production: 'https://employeeapi-04a2.onrender.com',
	development: 'http://localhost:8000',
}

if (window.location.hostname === 'localhost') {
	apiUrl = apiUrls.development
} else {
	apiUrl = apiUrls.production
}

export default apiUrl
