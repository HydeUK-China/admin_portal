export function fetchReq(path, method, param){
    const options = {
      method: method || 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: param || null
    }
    return fetch(path, options)
      .then(res => res.json())
      .then(res =>
        { 
          if(res.success){
            return res.data
          } else {
            console.log("fetch failed")
            return { message: res.msg}
          }
        })
      .catch(e => console.error(e));
  }

  