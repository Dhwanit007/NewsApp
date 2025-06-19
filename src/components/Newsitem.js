import React from 'react'


const Newsitem =(props)=> {
    let {title, description, imageUrl, newsUrl, date, author, source} = props;
    return (
      <div className='my-3'>
        <div className="card" >
          <div className="container">
          <span className="badge rounded-pill bg-danger" style={{display:'flex' , justifyContent:'flex-end' , position:'absolute' , right:'0'}}> {source}</span>
          </div>
            <img src={imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className='card-text'><small className='text-muted'>Published on: {new Date(date).toGMTString()} by {author}</small></p>
                <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-sm btn-primary">Read More</a>
            </div>
        </div>
      </div>
    )
}

export default Newsitem