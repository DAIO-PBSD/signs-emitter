import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Sign } from './model/sign';
import { SignService } from './service/sign.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'signs-emitter'

  emitting = false

  id = new FormControl('')
  type = new FormControl('')
  low = new FormControl('')
  extremelyLow = new FormControl('')
  high = new FormControl('')
  extremelyHigh = new FormControl('')

  constructor(private signService: SignService) {}

  randomRange(l: number, h: number) {
    return Math.random() * (h - l) + l
  }

  async emit() {
    this.emitting = true
    let patientID = this.id.value
    let signType = this.type.value
    let eL = parseInt(this.extremelyLow.value)
    let mL = parseInt(this.low.value)
    let mH = parseInt(this.high.value)
    let eH = parseInt(this.extremelyHigh.value)
    while (this.emitting) {
      let random = Math.random()
      let value: number
      let danger: number
      if (random < 0.05) {
        value = this.randomRange(0, eL)
        danger = 2
      }
      else if (random < 0.15) {
        value = this.randomRange(eL, mL)
        danger = 1
      }
      else if (random < 0.85) {
        value = this.randomRange(mL, mH)
        danger = 0
      }
      else if (random < 0.95) {
        value = this.randomRange(mH, eH)
        danger = 1
      }
      else {
        value = this.randomRange(eH, 2*eH)
        danger = 2
      }

      let sign = new Sign(signType, new Date(), patientID, value, danger)
      this.signService.sendSign(sign)

      await this.delay(1000)
    }
  }

  stop() {
    this.emitting = false
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
