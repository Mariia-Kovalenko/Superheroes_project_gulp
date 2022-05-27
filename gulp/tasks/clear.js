"use strict";

import del from "del";

//configuration
import  path from "../config/path.js";

//clearing dist
export default () => {
    return(del(path.root));
};


//module.exports = clear;