interface IEditUserDTO {
  id: string
  name: string
  email: string
  role: string
  birthDate: Date
  updated_at?: Date
  lastLogin?: Date
}

export { IEditUserDTO }
