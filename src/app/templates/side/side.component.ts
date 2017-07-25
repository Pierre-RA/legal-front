import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'template-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss']
})
export class SideComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
