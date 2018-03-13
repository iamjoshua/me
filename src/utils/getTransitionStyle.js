const getTransitionStyles = timeout => {
  return {
    entering: {
      opacity: 0,
    },
    entered: {
      transition: `all ${timeout}ms ease-in-out`,
      opacity: 1,
      marginTop: 0
    },
    exiting: {
      transition: `all ${timeout}ms ease-in-out`,
      opacity: 0,
      marginTop: 100

    },
  }
}

const getTransitionStyle = ({ timeout, status }) =>
  getTransitionStyles(timeout)[status]

export default getTransitionStyle
