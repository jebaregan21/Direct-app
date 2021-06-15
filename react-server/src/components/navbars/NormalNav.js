function NormalNav(props){
    return (
        <div class="row p-0 m-0 bg-dark fixed-top">
        <div class="col-12 p-0 m-0">
            <div class="d-block bg-dark text-light p-0 m-0">
                <div class="d-md-flex flex-row justify-content-center mt-1 p-0 m-0">
                    <div class="col-md-4">
                        <div class="d-flex flex-row justify-content-evenly">
                            <div class="p-2 pb-2 mb-1 fw-bold text-light fs-4">Direct</div>
                            <div class="p-2 mt-1 text-light "> <a class="linkdisable " href="/">Home</a>
                            </div>
                            <div class={(props.active==='mycourses')?'p-2 mt-1 text-light bg-secondary mb-2':"p-2 mt-1 text-light"}> <a class="linkdisable" href="/mycourses">My Courses</a> </div>
                            <div class={(props.active==='profile')?'p-2 mt-1 text-light bg-secondary mb-2':"p-2 mt-1 text-light"}> <a class="linkdisable" href={`/profile/${props.userId}`}>Profile</a> </div>
                        </div>
                    </div>
                    <div class="col-md-5 mt-1">
                        
                    </div>
                    <div class="col-md-3">
                        <div class="d-flex flex-row justify-content-evenly">
                        <div class="dropdown text-center">
                                <a class="p-2 mt-1 me-3 linkdisable dropdown-toggle" type="button"
                                    id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    {props.firstName}
                                </a>
                                <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                                    <li><a class="dropdown-item " href="/settings">Account Settings</a></li>
                                    <li><a class="dropdown-item" href="" onClick={props.logout}>Logout</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default NormalNav
