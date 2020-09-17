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

export function getRole() {
  return localStorage.getItem('role');
}

export function setRole(role) {
  localStorage.setItem('role', role);
}

export function removeRole() {
  // Clear user token and profile data from localStorage
  localStorage.removeItem('role');
}