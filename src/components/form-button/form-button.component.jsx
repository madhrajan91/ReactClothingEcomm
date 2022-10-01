import './form-button.component.scss'

const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted'
}
const FormButton = ({children, style, ... otherProps}) => {
    return (
        <button className={`button-container ${BUTTON_TYPE_CLASSES[style]}`} {...otherProps}>
            {children}
        </button>
    )
}

export default FormButton;