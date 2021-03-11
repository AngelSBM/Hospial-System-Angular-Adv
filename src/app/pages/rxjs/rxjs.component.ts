import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnDestroy{

  intervalSubs: Subscription;

  constructor() {

    // this.retornaObservable().pipe(
    //   retry(2)
    // ).subscribe(
    //   valor => console.log('Subs:', valor),
    //   (error) => console.warn('Error: ', error ),
    //   () => console.info('Obs terminado')
            
    // );

    this.intervalSubs = this.retornaIntervalo()
      .subscribe( console.log )
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }


  retornaIntervalo(): Observable<number> {

    return interval(500)
          .pipe(
            map( valor => valor + 1 ),
            filter( valor => (valor % 2 == 0) ? true : false ),
          )

  }

  retornaObservable(): Observable<number>{
   return new Observable<number>( observer => {

      let i = -1;

      const intervalo = setInterval( () => {

        i++;
        observer.next(i);

        if( i === 4 ){
          clearInterval( intervalo );
          observer.complete();
        }

        if( i === 2 ){
          console.log('i = 2... error');
          observer.error('I llegó al valor de 2');
        }

      }, 1000 );

    } );

  }

}
