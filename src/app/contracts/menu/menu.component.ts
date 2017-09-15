import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Output() selected: EventEmitter<number> = new EventEmitter();
  all: boolean;
  laws: Array<boolean>;

  constructor() {
    this.all = true;
    this.laws = [false, false, false, false, false, false];
    if (localStorage.getItem('menuItem')) {
      this.all = false;
      this.laws[Number.parseInt(localStorage.getItem('menuItem'))] = true;
    }
  }

  ngOnInit() {
  }

  onTypeSelect(item: number): void {
    this.all = false;
    this.laws[item] = true;
    localStorage.setItem('menuItem', item + '');
  }

  onBack(item: number): void {
    this.all = true;
    this.laws[item] = false;
    localStorage.removeItem('menuItem');
  }

  onSelect(item: number): void {
    localStorage.removeItem('menuItem');
    this.selected.emit(item);
  }

}
