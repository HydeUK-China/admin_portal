export function fetchReq(path, opt = {}) {
  const options = {
    method: opt.method || 'POST',
    headers: opt.headers || {
      'Content-Type': 'application/json',
    },
    body: opt.body || null
  }
  return fetch(path, options)
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        return (res.data)
      } else {
        throw (res.msg || res)
      }
    })
}

export function fetchStream(path, opt = {}) {
  const options = {
    method: opt.method || 'POST',
    headers: opt.headers || {
      'Content-Type': 'application/json',
    },
    body: opt.body || null
  }
  return fetch(path, options)
    .then(res => res.blob())
}

export function isLoggedIn() {
  return localStorage.getItem('token');
}

export function login(token) {
  localStorage.setItem('token', token);
}

export function logout() {
  // Clear user token and profile data from localStorage
  localStorage.removeItem('token');
}