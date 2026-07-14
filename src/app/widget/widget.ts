import { Component, Input } from '@angular/core';

@Component({
  selector: 'widget',
  imports: [],
  templateUrl: './widget.html',
  styleUrl: './widget.css',
})
export class Widget {
  @Input() date!: string;
  @Input() newFeatures?: string[];
  @Input() bugFixes?: string[];

  constructor() {

  }
}
