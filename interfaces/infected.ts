export interface Infected {
  name: string
  confirmedByCount: number //Number of survivors who flagged this user
  confirmedByNames: Array<string> //Names of survivors who flagged this
}
