import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
    selector: 'circular-progress',
    standalone: true,
    imports: [CommonModule],
    template: `
        <svg class="progress-ring w-full h-full">
          <circle class="progress-ring__circle"
                  stroke="#d4d4d8"
                  stroke-width="4"
                  fill="transparent"
                  r="48"  
                  cx="50"
                  cy="50"
                  [attr.stroke-dasharray]="circumference + ' ' + circumference"
                  [ngStyle]="{'stroke-dashoffset': strokeDashoffset}">
          </circle>
        </svg>
        <ng-content></ng-content>
      
    `,
    styles: [`
        :host {
            --stroke-color: yellow; /* Default color */
            display: block;
            position: relative;
            width: 100px;
            height: 100px;
        }

        .progress-ring__circle {
            transition: stroke-dashoffset 0.35s linear;
            transform: rotate(-90deg);
            transform-origin: 50% 50%;
        }
    `]
})
export class CircularProgressComponent implements OnInit, OnDestroy, OnChanges {
  @Input() duration = 10; // Duration in seconds
  @Input() strokeColor = 'blue'; // Color of the stroke
  @Input() start = false
  // Event emitter for when the progress is complete
  @Output() complete = new EventEmitter<boolean>(); 

  percent = 0;
  intervalId: any;
  circumference = 2 * Math.PI * 48; // Circumference based on radius of 48px
  get strokeDashoffset() {
    // Update dashoffset to decrease from full circumference to 0
    return this.circumference - (this.percent / 100 * this.circumference);
  }

  ngOnInit() {
    document.documentElement.style.setProperty('--stroke-color', this.strokeColor);
    // this.startTimer();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['start'] && changes['start'].currentValue) {
      this.startTimer();
    }
  
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  startTimer() {
    const step = 100 / (this.duration * 10); // Change step calculation for smoother animation
    this.intervalId = setInterval(() => {
      this.percent += step;
      if (this.percent >= 100) {
        clearInterval(this.intervalId);
        this.percent = 100; // Ensure it completes at 100%
        this.complete.emit(true);
      }
    }, 100); // Update interval to 100ms for smoother animation
  }
}
