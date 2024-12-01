import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[btnStyle]'
}) export class ButtonStyleDirective {
    @HostBinding('style.background-color') bgColor: any; 
    @HostBinding('style.color') color:any;
    constructor() {}

    @HostListener('mouseenter') onMouseEnter(){
        this.bgColor = 'rgb(41, 32, 96)';
        this.color = 'white'
    }

    @HostListener('mouseleave') onMouseLeave(){
        this.bgColor = null;
        this.color = null;
    }
}