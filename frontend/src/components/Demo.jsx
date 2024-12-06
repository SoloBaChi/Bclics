

const DemoCard = ({
    title,
    thumbnail,
    url,
    id
}) => {
  return (
    <div style={{width:"450px", height:"450px", borderRadius:"8px"}}>
        <div className="card-contents">
            <div className="img-container">
                <img src={url} alt="" />
            </div>
            <p>{title}</p>
        </div>
    </div>
  )
}

export default DemoCard