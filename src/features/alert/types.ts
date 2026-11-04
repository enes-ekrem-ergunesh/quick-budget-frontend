export type AlertIcon = "info" | "success" | "danger"

export interface AlertBody{
  icon: AlertIcon
  title: string
  description: string
  ttl: number
}