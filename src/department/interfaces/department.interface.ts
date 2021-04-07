export interface IGettingDept {
  _id: string,
  name: string,
  users: IGettingUsers[],
}

interface IGettingUsers {
  _id: string,
  name: string,
}
