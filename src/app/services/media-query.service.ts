import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root',
})
export class MediaQueryService {
  constructor(
    private breakpoint: BreakpointObserver,
  ) {
    breakpoint.observe([
      '(min-width:320px)',
      '(min-width:480px)',
      '(min-width: 576px)',
      '(min-width: 768px)',
      '(min-width: 992px)',
      '(min-width: 1200px)',
    ]).subscribe((res) => {
      // console.log({...res.breakpoints});
      // console.log({xssm: this.isMobile, md: this.isTablet, lg: this.isDesktop, xl: this.isLargeDesktop});
    });
  }

  get isMobile() {
    return (this.isSmartphone || this.isTablet) && !this.isDesktop;
  }

  get isSmartphone() {
    return this.breakpoint.isMatched('(min-width: 576px)') || this.breakpoint.isMatched('(min-width: 480px)')
      || this.breakpoint.isMatched('(min-width: 320px)');
  }

  get isTablet() {
    return this.breakpoint.isMatched('(min-width: 768px)');
  }

  get isDesktop() {
    return this.isLargeDesktop || this.isExtraLargeDesktop;
  }

  get isLargeDesktop() {
    return this.breakpoint.isMatched('(min-width: 992px)');
  }

  get isExtraLargeDesktop() {
    return this.breakpoint.isMatched('(min-width: 1200px)');
  }
}
