this.updateCurrencyValue('brl', 'BRL').subscribe(
  value => this.currencyForm.patchValue({ usd: value }, { emitEvent: false })
);

this.updateCurrencyValue('usd', 'USD').subscribe(
  value => this.currencyForm.patchValue({ brl: value }, { emitEvent: false })
);

private updateCurrencyValue(controlName: string, currency: string): Observable<number> {
  const control = this.currencyForm.get(controlName);

  return control.valueChanges.pipe(
    filter(value => !!value),
    debounceTime(200),
    distinctUntilChanged(),
    switchMap((value: number) => this.currencyService.getExchangeRate(currency, 'USD').pipe(
      map(rate => value / rate),
      catchError(error => {
        console.error(`Error getting exchange rate for ${currency}`, error);
        // mostrar mensagem de erro para o usuário ou tentar novamente após algum tempo
        return of(null); // retornar um observable vazio para continuar o fluxo do pipe
      })
    )),
    distinctUntilChanged()
  );
}
