export interface User {
  id: number | string;
  userName: string;
  displayName: string;
  password?: string;
  roles: string[];
  location: string;
}
