import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CatFact } from './models/cat-fact';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'http-client-example';

  isCatVisible = true;
  isLoadingCat = true;
  catFact: CatFact;
  catFactAsync: Observable<CatFact>;

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {}

  public ngOnInit(): void {
    this.loadCatFacts();
    this.loadCatFactsAsync();
  }

  public loadCatFactsAsync(): void {
    setInterval(() => {
      this.isLoadingCat = true;
      this.catFactAsync = this.httpClient
        .get<CatFact>('http://cat-fact.herokuapp.com/facts/random')
        .pipe(tap(() => (this.isLoadingCat = false)));
    }, 5000);
  }

  public loadCatFacts(): void {
    setTimeout(() => {
      this.httpClient
        .get<CatFact>('http://cat-fact.herokuapp.com/facts/random')
        .subscribe((data: CatFact) => {
          this.catFact = data;
          this.snackBar.open('Cat fact loaded', 'OK', {
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            duration: 2000,
          });
        });
    }, 2000);
  }
}
