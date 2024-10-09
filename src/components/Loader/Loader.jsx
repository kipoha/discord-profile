import './Loader.css'

const Loader = ({loading}) => {
    return (
        <div className={`loader ${loading ? '' : 'hidden'}`}>
            <div className="spinner"></div>
        </div>
    )
}
export default Loader