import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[cardStyle]'
}) export class CardStyleDirective {
    @HostBinding('style.background-color') bgColor: any; 
    constructor() {}

    @HostListener('mouseenter') onMouseEnter(){
        this.bgColor = '#f5f5dc';
    }

    @HostListener('mouseleave') onMouseLeave(){
        this.bgColor = null;
    }
}