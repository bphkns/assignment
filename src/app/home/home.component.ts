import { Component, OnInit } from '@angular/core';

import { trigger, transition, style, animate, animateChild } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('MyInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-in-out',
          style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('3s ease-out', style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
