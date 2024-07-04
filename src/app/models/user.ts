export interface User {
  userId: string;
  username: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  work: string;
  birthday: string;
  country: string;
  registerday: string;
  profileImageUrl: string;
  bannerUrl: string;
}

export function getDefaultUser(): User {
  return {
    userId: '',
    username: '',
    name: '',
    lastname: '',
    email: '',
    phone: '',
    work: '',
    birthday: '',
    country: '',
    registerday: '',
    profileImageUrl: '',
    bannerUrl: '',
  };
}
