define(['lib/axios.min'], (axios) => {
  return (data) => {
    const service = axios.create({
      baseURL: data.url,
      method: data.method,
      timeout: 8000
    })

    // request拦截器
    service.interceptors.request.use(config => {
      // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJFeHBpcmVzVXRjIjoiXC9EYXRlKDQ2NjA3ODkyMzY3OTUpXC8iLCJVc2VySWQiOiIzN2ZiM2QyZDNhNjQ0MGZiYjg4Njc2MGZiMGYyNzMzMSIsIlJvbGVJZCI6IiIsIlR5cGUiOjF9.KkbRqEj7r7TAcaH6k2xOyEs5CHEdiqBHCnDR3ReV58Y'
      //   if (token) {
      config.headers = {
        // 'Authorization': `Token ${token}`,
        'content-type': 'application/json'
      } // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
      // }
      config.data = data.data
      config.transformRequest = [
        function (data) {
          let ret = "";
          for (let it in data) {
            ret +=
              encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
          }
          return ret;
        }
      ];
      return config
    }, error => {
      // Do something with request error
      return Promise.reject(error)
    })

    // respone拦截器
    service.interceptors.response.use(
      response => response,
      error => {
        return Promise.reject(error)
      }
    )
    return service()
  }
})