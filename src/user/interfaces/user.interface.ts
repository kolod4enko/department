export interface IGettingUser {
  _id: string,
  name: string,
  email: string,
  phone: string,
  department: IGettingDept[],
}

interface IGettingDept {
  _id: string,
  name: string,
}
