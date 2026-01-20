import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentService } from './payment-service.interface';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Pagamento');
  protected showNotification = signal(false);

  protected readonly paymentServices = signal<PaymentService[]>([
    {
      id: 'revolut',
      name: 'Revolut',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Revolut_logo.svg',
      link: 'https://revolut.me/magomerlo',
      buttonText: 'Versa la tua quota',
      colorClass: 'revolut-btn'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg',
      link: 'https://paypal.me/gipo',
      buttonText: 'Versa la tua quota',
      colorClass: 'paypal-btn'
    },
    {
      id: 'satispay',
      name: 'Satispay',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Logo_di_Satispay.svg',
      link: 'https://www.satispay.com/app/match/link/user/S6Y-CON--61BDF020-3269-43F1-B231-BFD3211D462D',
      buttonText: 'Versa la tua quota',
      colorClass: 'satispay-btn'
    },
    {
      id: 'widiba',
      name: 'Bonifico',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Banca_Widiba.png',
      link: '',
      buttonText: 'Copia IBAN',
      colorClass: 'widiba-btn',
      isIban: true
    }
  ]);

  protected copyIBAN(): void {
    const iban = 'IT13Z0344214239000031050713';

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(iban).then(() => {
        this.displayNotification();
      }).catch(() => {
        this.fallbackCopyIBAN(iban);
      });
    } else {
      this.fallbackCopyIBAN(iban);
    }
  }

  private fallbackCopyIBAN(iban: string): void {
    const textArea = document.createElement('textarea');
    textArea.value = iban;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand('copy');
      this.displayNotification();
    } catch (err) {
      console.error('Errore nella copia:', err);
    }

    document.body.removeChild(textArea);
  }

  private displayNotification(): void {
    this.showNotification.set(true);
    setTimeout(() => {
      this.showNotification.set(false);
    }, 3000);
  }
}
