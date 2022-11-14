

export const catchError = (e) => {
  if (e?.response?.data?.message) {
    const { message } = e.response.data
//? Why this message doesn't use
    //! write error method
    message.forEach((i) => {
      const { msg } = i

    })
  } else {

  }
}
