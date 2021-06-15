import domain from '../domain'
function CourseList(props){
    return (
        <div>
            {(props.courses!==null&&props.courses!==undefined&&props.courses.length!==0)?
            <div class="col-md-10 offset-md-2 mt-5">
            <div class="row justify-content-center pt-4 p-0 m-0">
            {props.courses.map(course=>{
                    return(
                    
                            <div class="col-11 card p-1 mt-3">
                                <div class="row">
                                    <div class="col-lg-4 col-md-5 align-self-center ">
                                        <div class=" card-img text-center">
                                            <img style={{minHeight: "230px"}} class="img-fluid rounded img-thumbnail" src={`${domain}/cimage/${course._id}.jpg`} alt={`${course.title}`}/>
                                        </div>
                                    </div>
                                    <div class="col-lg-8 col-md-7 m-0 p-0">
                                        <div class="card-body m-0 p-0 p-2 me-3">
                                            <div class="text-center ">
                                            <h5 class="p-1  fw-bold bg-dark rounded text-light ">{course.title}</h5></div>
                                            <div class="m-1 mt-2">
                                            <div class="card-title ">By <a href={`/profile/${course.lecturer}`}>{course.lecturerName}</a></div>
                                            <div class="card-text">{course.description.substring(0,350)}<a class="float-right" href={`/course/${course._id}`}>view more..</a>
                                            </div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                )})}
                    </div>
                    </div>
                :
                <h5>No Courses found</h5>
            }
        </div>
    )
}

export default CourseList