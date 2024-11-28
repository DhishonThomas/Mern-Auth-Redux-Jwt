

export const checkvalidateData = (email:string,password:string,name:string|null) => {
    console.log("email,password,name",email,password,name)
const nameCurrentValue = name===null?"":name

    const emailValidate=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    const passwordValidate=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(password)
    const nameValidate = /^[a-zA-Z' -]{2,30}$/.test(nameCurrentValue);


if(name!==null){
    if(!nameValidate) return "Name is not valid"
}

    if(!emailValidate) return "Email ID is not valid "
    if(!passwordValidate) return "Password is not valid"

    return null
}
