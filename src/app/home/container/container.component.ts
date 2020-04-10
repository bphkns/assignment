import { Component, OnInit } from '@angular/core';
import { IconService } from 'src/app/icon.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {

  constructor(private iconService: IconService) { }

  date = new Date();

  ngOnInit(): void {
    this.iconService.registerIcons();
  }

}
