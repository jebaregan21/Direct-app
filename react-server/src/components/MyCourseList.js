import domain from '../domain'
function MyCourseList(props){
    return (
        <div class="row pd-5 justify-content-center" style={{marginTop:'4%',marginBottom:'5%'}}>
            {(props.admin===true)?
                <div class="bg-dark  fixed-bottom ">
                <div class="row m-3">
                    <div class="col text-center  ">
                        <a href="/create/course"
                            class="col p-2 pe-3 linkdisable  text-light  border border-2 border-light rounded-pill fw-bold fs-5">
                            <i class="fs-5 fas fa-plus-circle  "></i>&nbsp; Add a new Course
                        </a>
                    </div>
                </div>
            </div>
            :
            null
            }

            {(props.courses!==null && props.courses!==undefined)?
                props.courses.map(course =>{
                    return (
                        <div class="col-9 m-1 card p-1 mt-3">
                        <div class="row">
                            <div class="col-lg-4 col-md-5">
                                <div class=" card-img text-center">
                                    <img style={{minHeight: '230px'}} class="img-fluid rounded img-thumbnail "
                                        src={`${domain}/cimage/${course._id}.jpg`} alt=""/>
                                </div>
                            </div>
                            <div class="col-lg-8 col-md-7 m-0 p-0 ">
                                <div class="card-body m-0 p-0 p-2 me-3">
                                    <div class="text-center ">
                                        <h5 class="p-1  fw-bold bg-dark  rounded text-light ">{course.title}</h5>
                                    </div>
                                    <div class="m-1 mt-2">
                                        <div class="card-title ">By <a href={`/profile/${course.lecturer}`}>{course.lecturerName}</a></div>
                                        <div class="card-text">{course.description.substring(0,300)}<a href={`/course/${course._id}`}>view more..</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    )
                })
                :
            <h5 class="mt-5">No courses found</h5>
            }
            
        </div>
    )
}
export default MyCourseList