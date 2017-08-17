import { Component, OnInit, Input, AfterContentChecked } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ExchangeService } from './services/exchange.service';
import { Rate } from "./model/rate";
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  rates: Rate[];
  divisas: any[];
  frmExchange: FormGroup;
  isValidFormSubmitted: boolean;

  constructor(fb: FormBuilder, private exchangeService: ExchangeService) {
    this.isValidFormSubmitted = null;
    this.frmExchange = fb.group({
      'currency': [null, Validators.required],
      'amount': [null, Validators.required]
    });
  }

  onFormSubmit() {
    this.isValidFormSubmitted = false;
    if (this.frmExchange.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    console.log(this.frmExchange.get('currency').value);
    console.log(this.frmExchange.get('amount').value);
  }

  setDefaultValues() {
    this.frmExchange.patchValue({ currency: 'EUR', amount: '' });
  }

  ngOnInit(): any {
    this.setDefaultValues();

    this.exchangeService.getExchangeUSDtoANY().then(data => {
      this.rates = data;
      this.divisas = data[0].rates;
    }).catch(error => {
      console.log(error);
      return Observable.of<Rate[]>([]);
    });

  }
}
