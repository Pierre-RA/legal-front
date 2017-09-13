import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Output() selected: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSelect(item: number): void {
    this.selected.emit(item);
  }

}
