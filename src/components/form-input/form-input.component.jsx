import './form-input.component.scss'

const FormInput = ({labelName, name, value, type, onChange}) => {
    return (
        <div className="group">
            <input className='form-input'
            type={type}
            name={name}
            value={value}
            required
            onChange={onChange}
            />
            {{labelName} && (
            <label className={`${value.length? 'shrink' : ''} form-input-label`}>
                {labelName}
            </label>
            )}
            
        </div>
    )
}

export default FormInput