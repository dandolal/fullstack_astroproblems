export const problems_background = {
    margin: 'auto',

    width: '70%',

    top: '10vh',
    height: '85vh',

    background: 'grey',
    opacity: '0.75',
    borderRadius: '20px'
}

export const problem_card_style= {
    ':focus':{
        borderBottom: '2px solid black'
    },
    opacity: '1',
    margin: 'auto',
    marginTop: '20px',
    background: 'green',
    width: '70%',
    // height: '20',
    borderRadius: '10px'
}

export const button_style= {
    textDecoration: 'none',
    outline: 'none',
    display: 'inline-block',
    padding: '20px 30px',
    margin: '10px 20px',
    borderRadius: '10px',
    backgroundImage: 'linear-gradient(to right, #9EEFE1 0%, #4830F0 51%, #9EEFE1 100%))',
    backgroundSize: '200% auto',
    fontFamily: 'Montserrat',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    color: 'white',
    boxShadow: '0 0 20px rgba(0,0,0,.1)',
    transition: '.5s',
    ':hover':{
        backgroundPosition: 'right center'
    }
}
