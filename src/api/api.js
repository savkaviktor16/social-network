import * as axios from "axios";

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '7aabdc48-0c6e-4a9a-ba7d-a183ee608963'
  },
  withCredentials: true
});

export const userAPI = {
  getUsersAPI(currentPage, pageSize, searchTerm = '', isFriend = '') {
    return instance.get('users?page=' + currentPage + '&count=' + pageSize + '&term=' + searchTerm + '&friend=' + isFriend)
        .then(response => response.data);
  },

  getProfileAPI(userId) {
    return instance.get('profile/' + userId)
        .then(response => response.data);
  },

  getFollowAPI(userId, method) {
    return instance({
      method,
      url: 'follow/' + userId
    }).then(response => response.data);
  },

  setStatusAPI(status) {
    return instance({
      method: 'PUT',
      url: 'profile/status',
      data: {status: status}
    }).then(response => response.data);
  },

  getStatusAPI(userId) {
    return instance.get('profile/status/' + userId)
        .then(response => response.data);
  },

  setPhotoAPI(file) {
    return instance({
      method: 'PUT',
      url: 'profile/photo',
      data: file
    }).then(response => response.data);
  },

  setProfileAPI(profile) {
    return instance({
      method: 'PUT',
      url: 'profile',
      data: profile
    }).then(response => response.data);
  }
}

export const AuthAPI = {
  getAuthAPI() {
    return instance.get('auth/me')
        .then(response => response.data);
  },

  authLoginAPI(email, password, rememberMe, captcha) {
    return instance({
      method: 'POST',
      url: 'auth/login',
      data: {email, password, rememberMe, captcha}
    }).then(response => response.data);
  },

  authLogoutAPI() {
    return instance.delete('auth/login')
        .then(response => response.data);
  },

  authCaptchaAPI() {
    return instance.get('security/get-captcha-url')
        .then(response => response.data);
  }
}
