interface ICreateUserWithProject {
  name: string
  email: string
  role: string
  password: string
  birthDate: Date
  projectName: string
  projectColor: string
  projectDescription: string
}

export { ICreateUserWithProject }
