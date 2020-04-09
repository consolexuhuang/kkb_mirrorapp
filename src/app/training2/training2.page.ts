import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-training2',
  templateUrl: './training2.page.html',
  styleUrls: ['./training2.page.scss'],
})
export class Training2Page implements OnInit {

  constructor() { }
  videoSrc: string = 'https://img.cdn.powerpower.net/vid2.mp4'
  // videoSrc2: string = 'http://img.cdn.powerpower.net/vid2.mp4'

  ngOnInit() {
  }

}
