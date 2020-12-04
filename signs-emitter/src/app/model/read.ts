export class Read {
  signName: string
  timeEmitted: Date
  patientID: string
  value: number

  constructor(
    signName: string,
    timeEmitted: Date,
    patientID: string,
    value: number
  ) {
    this.signName = signName
    this.timeEmitted = timeEmitted
    this.patientID = patientID
    this.value = value
  }
}
