import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { CurrencyService } from './currency.service';

@Component({
  selector: 'app-currency-converter',
  template: `
    <form [formGroup]="currencyForm">
      <input type="number" placeholder="BRL" formControlName="brl" />
      <input type="number" placeholder="USD" formControlName="usd" />
    </form>
  `,
})
export class CurrencyConverterComponent {
  currencyForm = new FormGroup({
    brl: new FormControl(),
    usd: new FormControl(),
  });

  constructor(private currencyService: CurrencyService) {
    this.currencyForm
      .get('brl')
      .valueChanges.pipe(
        debounceTime(200),
        switchMap((value: number) =>
          this.currencyService.getExchangeRate('BRL', 'USD').pipe(
            // convert BRL to USD
            tap((rate) =>
              this.currencyForm.patchValue(
                { usd: value / rate },
                { emitEvent: false }
              )
            )
          )
        )
      )
      .subscribe();

    this.currencyForm
      .get('usd')
      .valueChanges.pipe(
        debounceTime(200),
        switchMap((value: number) =>
          this.currencyService.getExchangeRate('USD', 'BRL').pipe(
            // convert USD to BRL
            tap((rate) =>
              this.currencyForm.patchValue(
                { brl: value * rate },
                { emitEvent: false }
              )
            )
          )
        )
      )
      .subscribe();
  }
}

// ***

// Arquivo service:

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(private http: HttpClient) {}

  getExchangeRate(fromCurrency: string, toCurrency: string) {
    const url = `https://api.cambio.com.br/v1/${fromCurrency}/${toCurrency}/buy`;
    return this.http.get<number>(url);
  }
}
