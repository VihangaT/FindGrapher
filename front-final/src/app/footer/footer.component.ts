import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  gotoLinkedIN(): void {
    window.open('http://www.linkedin.com/in/vihanga-thathsara-kaluarchchi-liyanage-45a74740/', 'blank', '', true);
  }


  gotoFacebook(): void {
    window.open('https://www.facebook.com/vihanga.t.liyanage/', 'blank', '', true);
  }

  gotoTwitter(): void {
    window.open('https://twitter.com/VihangaT/', 'blank', '', true);
  }


  ngOnInit() {
  }

}
