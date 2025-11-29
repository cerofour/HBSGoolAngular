export interface User {
  userId: number;
  name: string;
  fatherLastname: string;
  motherLastname: string;
  dni: string;
  cellphone: string;
  email: string;
  active: boolean;
  password?: string;
  rol: string;
}