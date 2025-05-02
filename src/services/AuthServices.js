const API_URL = 'http://localhost:8000/api/v1/users';

const getAuthHeaders = () => {
  const token = localStorage.getItem('jwtToken');
  return token
      ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
      : { 'Content-Type': 'application/json' };
};

const fetchRequest = async (url, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${url}`, {
      ...options,
      headers: getAuthHeaders(),
    });

    const contentType = response.headers.get('content-type');

    if (!response.ok) {
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        const message =
            errorData.message || errorData.error || errorData.msg || 'Įvyko klaida';

        console.error('Klaidos atsakymas iš serverio:', errorData); // Debug
        throw new Error(message);
      } else {
        const text = await response.text();
        throw new Error(text || `HTTP klaida: ${response.status}`);
      }
    }

    return await response.json();

  } catch (err) {
    console.error('Užklausos klaida:', err.message);
    throw err;
  }
};

// Prisijungimas
export const login = async (name, password) => {
  const res = await fetchRequest('/login', {
    method: 'POST',
    body: JSON.stringify({ name, password }),
  });

  const userData = res.data; // <- tai kur POSTMAN parodė viską

  if (userData.token) {
    localStorage.setItem('jwtToken', userData.token);
  }

  if (userData.id) {
    localStorage.setItem('userId', userData.id);
  }

  return userData;
};




export const createUser = async (userData) => {
  const data = await fetchRequest('/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
  });

  if (data.token) {
    localStorage.setItem('jwtToken', data.token);
  }
  if (data.id) {
    localStorage.setItem('userId', data.id);
  }

  return data;
};


// Atsijungimas
export const logout = () => {
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('userId');
};
