import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Read } from './model/read';
import { SignService } from './service/sign.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'signs-emitter'

  emitting: String = null

  id = new FormControl('')
  signName = new FormControl('')
  low = new FormControl('')
  extremelyLow = new FormControl('')
  high = new FormControl('')
  extremelyHigh = new FormControl('')

  delayTime = new FormControl('')

  constructor(private signService: SignService) {}

  randomRange(l: number, h: number) {
    return Math.random() * (h - l) + l
  }

  async emitNormal() {
    this.emitting = "normal"
    let patientID = this.id.value
    let signType = this.signName.value
    let mL = parseInt(this.low.value)
    let mH = parseInt(this.high.value)
    while (this.emitting == "normal") {
      let value: number = this.randomRange(mL + 0.0001, mH)

      let sign = new Read(signType, new Date(), patientID, value)
      this.signService.sendSign(sign)

      await this.delay()
    }
  }

  async emitWarning() {
    this.emitting = "warning"
    let patientID = this.id.value
    let signType = this.signName.value
    let mH = parseInt(this.high.value)
    let eH = parseInt(this.extremelyHigh.value)
    while (this.emitting == "warning") {
      let value: number = this.randomRange(mH, eH)

      let sign = new Read(signType, new Date(), patientID, value)
      this.signService.sendSign(sign)

      await this.delay()
    }
  }

  async emitDanger() {
    this.emitting = "danger"
    let patientID = this.id.value
    let signType = this.signName.value
    let eH = parseInt(this.extremelyHigh.value)
    while (this.emitting == "danger") {
      let value: number = this.randomRange(eH, 2*eH)

      let sign = new Read(signType, new Date(), patientID, value)
      this.signService.sendSign(sign)

      await this.delay()
    }
  }

  stopNormal() {
    if (this.emitting == "normal")
      this.emitting = null
  }

  stopWarning() {
    if (this.emitting == "warning")
      this.emitting = null
  }

  stopDanger() {
    if (this.emitting == "danger")
      this.emitting = null
  }

  delay() {
    let delayMs = this.delayTime.value * 1000
    return new Promise( resolve => setTimeout(resolve, delayMs) );
  }
}
