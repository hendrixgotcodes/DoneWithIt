
let _userObject = null

const set = (object)=>{

    // if((typeof object) !== "object" || (typeof object) !==null){
    //     throw new Error("User object must be of type object")
    // }

    // _userObject = object
    console.log(typeof object);

}

const get = ()=>{

    if((typeof _userObject) !== "object"){
        return null
    }

    const copyOfUserObject = {..._userObject}

    return copyOfUserObject

}

const reset = ()=>{

    _userObject = null

}

export default {

    get,
    set,
    reset

}