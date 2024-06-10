import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IconService } from '../../services/icons.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="icon" [innerHtml]="icon"></div>
  `,

})
export class IconComponent implements OnInit {
    @Input() iconName: string | undefined;
    icon: SafeResourceUrl | null = null;

    constructor(private iconService: IconService, private sanitizer: DomSanitizer) {}

    ngOnInit(): void {
        console.log('IconComponen Namet', this.iconName);    
        if (this.iconName) {
            this.icon = this.iconService.getIcon(this.iconName);
            console.log('IconComponent', this.icon);
        }
    }
}
