export default async function checkError(response: Response) {
  const resData = await response.json()
  const error = new Error()
  error.message = resData.message
  return error
}