export class Sign {
  type: string
  timeEmitted: Date
  patient: string
  value: number
  danger: number // 0 -> none, 1 -> moderate, 2 -> high

  constructor(
    type: string,
    timeEmitted: Date,
    patient: string,
    value: number,
    danger: number // 0 -> none, 1 -> moderate, 2 -> high
  ) {
    this.type = type
    this.timeEmitted = timeEmitted
    this.patient = patient
    this.value = value
    this.danger = danger
  }
}
