import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-container',
  imports: [],
  templateUrl: './input-container.html',
  styleUrl: './input-container.css',
})
export class InputContainer implements OnInit {
  @Input() label!: string;
  @Input() placeholder!: string;

  constructor() {

  }

  ngOnInit() {
  }
}
