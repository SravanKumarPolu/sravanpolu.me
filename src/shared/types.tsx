export enum SelectedPage {
  Home = "home",
  Setting = "setting",
  Login = "login",
  Report = "report",
  Pomodoro = "Pomodoro",
  Long = "long",
  ShortBreak = "ShortBreak",
  ContactUs = "ContactUs",
  LongBreak = "LongBreak",
}
export interface BenefitType {
  icon: JSX.Element;
  title: String;
  description: String;
}
export interface ClassType {
  name: string;
  description?: string;
  image: string;
  src?: string;
}
