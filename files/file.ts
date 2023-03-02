this.bindCurrencyControlChanges('paymentCurrency');
this.bindCurrencyControlChanges('receiveCurrency');

bindCurrencyControlChanges(controlName: string) {
  const control = this.form.get(controlName);
  if (control) {
    control.valueChanges.pipe(
      filter((value) => !!value),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() =>
        this._getUpdatedTokenPrice().pipe(
          tap((offer) => {
            const targetControlName =
              controlName === 'paymentCurrency'
                ? 'receiveCurrency'
                : 'paymentCurrency';
            const targetControl = this.form.get(targetControlName);
            if (targetControl) {
              targetControl.patchValue(offer.receive.value, {
                emitEvent: false
              });
            }
          }),
          catchError((error) => {
            return of(null);
          })
        )
      )
    ).subscribe();
  }
}
