

export const catchError = (e) => {
  if (e?.response?.data?.message) {
    const { message } = e.response.data

    message.forEach((i) => {
      const { msg } = i

    })
  } else {

  }
}
