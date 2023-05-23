import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-time-cards',
  templateUrl: './time-cards.component.html',
  styleUrls: ['./time-cards.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class TimeCardsComponent {
  @Input() time = 0;

  /**
   * Get the hour part of the time.
   */
  get hours(): number {
    return Math.floor(this.time / 3600);
  }

  /**
   * Get the minute part of the time.
   */
  get minutes(): number {
    return Math.floor((this.time % 3600) / 60);
  }

  /**
   * Get the second part of the time.
   */
  get seconds(): number {
    return this.time % 60;
  }
}
