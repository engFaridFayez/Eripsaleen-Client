export interface User {
  id: number;
  username: string;
  full_name: string;
  first_name: string;
  last_name: string;
  joined_date:Date;
  image: string;
  phone: string;
  role: string;
  is_staff: boolean;
  is_active:boolean;
  is_superuser: boolean;

}

export interface AuthState {
  user: User | null;
  selectedUser: User | null;
  access: string | null;
  refresh: string | null;

  users: User[];

  loading: boolean;
  error: string | null;
}
