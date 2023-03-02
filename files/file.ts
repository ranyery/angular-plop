this.bindCurrencyControlChanges('paymentCurrency', 'receiveCurrency', 'receive.value');
this.bindCurrencyControlChanges('receiveCurrency', 'paymentCurrency', 'payment.value');

private bindCurrencyControlChanges(controlName: string, otherControlName: string, offerProperty: string): void {
  this.form.get(controlName)?.valueChanges.pipe(
    filter(value => !!value),
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(() =>
      this._getUpdatedTokenPrice().pipe(
        tap(offer =>
          this.form.patchValue(
            { [otherControlName]: offer[offerProperty] },
            { emitEvent: false }
          )
        ),
        catchError(error => of(null))
      )
    )
  ).subscribe();
}



this.form
  .get('paymentCurrency')!
  .valueChanges.pipe(
    filter((value) => !!value),
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(() =>
      this._getUpdatedTokenPrice().pipe(
        tap((offer) =>
          this.form.patchValue(
            { receiveCurrency: offer.receive.value },
            { emitEvent: false }
          ),
        ),
        catchError(error => {
          return of(null);
        })
      )
  )

this.form
.get('receiveCurrency')!
.valueChanges.pipe(
  filter((value) => !!value),
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(() =>
    this._getUpdatedTokenPrice().pipe(
      tap((offer) =>
        this.form.patchValue(
          { paymentCurrency: offer.receive.value },
          { emitEvent: false }
        ),
      ),
      catchError(error => {
        return of(null);
      })
    )
)
