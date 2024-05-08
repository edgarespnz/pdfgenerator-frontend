import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/dev.environment';
import { GetPrizesResponse } from 'src/app/interfaces/prizes/GetPrizesResponse.interface';
import { Prize } from 'src/app/interfaces/prizes/Prize.interface';

@Injectable({
  providedIn: 'root'
})
export class PrizeService {

  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  getPrizes(): Observable<GetPrizesResponse> {
    return this.http.get<GetPrizesResponse>(this.API_URL + 'prizes');
  }

  createPrize(prize: Prize): Observable<Prize>{
    return this.http.post<Prize>(this.API_URL + 'prize', {
      name: prize.name,
      description: prize.description,
      image_url: prize.image_url,
      quantity: prize.quantity,
      active: prize.active,
    });
  }
}
