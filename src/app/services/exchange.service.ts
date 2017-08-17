import { Injectable } from '@angular/core';
import { CONFIG } from '../shared/config';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Rate } from "../model/rate";
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

let srvEUR = CONFIG.baseUrls.EUR;
let srvUSD = CONFIG.baseUrls.USD;

@Injectable()
export class ExchangeService {

    rate: Rate;
    childrates: any;
    result: Rate[];

    constructor(private _http: Http) {
        this.childrates = [];
    }

    private getHeaders() {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        return headers;
    }

    getExchangeUSDtoEUR(): Promise<Rate[]> {
        return this._http
            .get(`${srvEUR}`)
            .toPromise()
            .then((response: Response) => this.toRate(response.json()))
    }

    getExchangeUSDtoANY(): Promise<Rate[]> {
        return this._http
            .get(`${srvUSD}`)
            .toPromise()
            .then((response: Response) => this.toRate(response.json()))
    }

    toRate(r: any): Rate[] {
        this.result = [];
        let person = <Rate>({
            base: r.base,
            date: r.date,
            rates: []
        });
        Object.keys(r.rates).forEach(function (key) {
            person.rates.push({ childbase: key, exchange: r.rates[key] });
        });
        this.result.push(person);
        return this.result;
    }

}

