// module.exports = (form) => form.map(category => {
//   const questions = category.questions
//     .map(question => {
//       const answers = question.answers
//         .map(answer => answer.get())
//         .sort((a, b) => a.index > b.index)

//       return { ...question.get(), answers }
//     })
//     .sort((a, b) => a.index > b.index)

//   return { ...category.get(), questions }
// })

module.exports = form => form.map(category => {
  const questions = category.questions
    .map(question => {
      const answers = question.answers
        .map(answer => answer.get())
        .sort((a, b) => a.index > b.index)

      return { ...question.get(), answers }
    })
    .sort((a, b) => a.index > b.index)

  return { ...category.get(), questions }
}).sort((a, b) => a.index > b.index);