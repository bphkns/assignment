import { animate, group, query, style, transition, trigger, animateChild } from '@angular/animations';


export const slideInAnimation =
    trigger('routeAnimations', [
        transition('* => Home', [
            query(':enter, :leave',
                style({ position: 'relative' }),
                { optional: true }),
            group([
                query(':enter', [
                    style({ opacity: 0 }),
                    animate('1s ease-in-out',
                        style({ opacity: 1 }))
                ], { optional: true }),
                query(':leave', [
                    style({ transform: 'translateX(0%)' }),
                    animate('1s ease-in-out',
                        style({ transform: 'translateX(-100%)' }))
                ], { optional: true }),
                query(':enter', animateChild()),
            ])
        ]),
    ]);

