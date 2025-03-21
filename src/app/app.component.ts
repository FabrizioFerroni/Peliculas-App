import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './shared/components/menu/menu.component';
import { NgToastModule, ToasterPosition } from 'ng-angular-popup';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, NgToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  position: ToasterPosition = ToasterPosition.TOP_RIGHT;
  constructor() {}

  ngOnInit(): void {
    initFlowbite();
  }
}
