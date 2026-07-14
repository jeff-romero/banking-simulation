import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { patchNotes } from '../../patch-note-data';

@Injectable({
  providedIn: 'root',
})
export class WidgetService implements OnInit {
  patchNotes: any[] = [];
  patchNotesSubject = new BehaviorSubject<any[]>(this.patchNotes);

  constructor() {
    this.getPatchNotes();
  }

  ngOnInit(): void {
    this.getPatchNotes();
  }

  getPatchNotes(): Observable<any[]> {
    this.patchNotesSubject.next(patchNotes);
    return this.patchNotesSubject;
  }
}
