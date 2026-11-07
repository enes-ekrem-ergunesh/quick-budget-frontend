export interface PydanticDetailsJson{
  0: {
    input: string
    msg: string
    type: string
  }
}

export interface ApiResponseJson{
  detail: string | PydanticDetailsJson
}