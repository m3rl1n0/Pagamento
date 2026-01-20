export interface PaymentService {
  id: string;
  name: string;
  logo: string;
  link: string;
  buttonText: string;
  colorClass: string;
  isIban?: boolean;
}
